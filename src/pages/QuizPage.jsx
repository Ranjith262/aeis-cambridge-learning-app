import { useState, useMemo, useCallback, useEffect } from 'react'
import { motion } from 'framer-motion'
import { shuffleQuestions } from '../utils/shuffle'
import { categories, allQuestions, getQuestionsByCategory } from '../data/questions'
import { mathCategories } from '../data/mathQuestions'
import { generateQuestions } from '../utils/dynamicQuestions'
import QuestionCard from '../components/QuestionCard'
import ScoreModal from '../components/ScoreModal'
import Mascot, { pickLine } from '../components/Mascot'
import Celebration from '../components/Celebration'
import { recordSession } from '../utils/progress'

const SESSION_SIZE = 10

function getCategoryMeta(categoryId, subject) {
  if (subject === 'math') {
    return mathCategories.find((c) => c.id === categoryId) || { name: 'Mixed Math Adventure', icon: '🧮' }
  }
  return categories.find((c) => c.id === categoryId) || { name: 'All English', icon: '📖' }
}

export default function QuizPage({ categoryId, subject, onGoHome, onTeach }) {
  const [sessionKey, setSessionKey] = useState(0)
  const [answers, setAnswers] = useState({})
  const [currentPage, setCurrentPage] = useState(0)
  const [showScore, setShowScore] = useState(false)
  const [sessionRecorded, setSessionRecorded] = useState(false)
  const [celebrate, setCelebrate] = useState(false)
  const [combo, setCombo] = useState(0)

  // Fresh dynamic questions every session for math — never a fixed bank order
  const shuffledQuestions = useMemo(() => {
    if (subject === 'math') {
      return generateQuestions(categoryId === 'all' ? 'all' : categoryId, SESSION_SIZE)
    }
    let qs =
      categoryId === 'all'
        ? allQuestions
        : getQuestionsByCategory(categoryId).map((q) => ({ ...q, category: categoryId }))
    return shuffleQuestions(qs).slice(0, SESSION_SIZE)
  }, [categoryId, subject, sessionKey])

  const totalPages = Math.max(1, Math.ceil(shuffledQuestions.length / SESSION_SIZE))
  const pageQuestions = shuffledQuestions

  const correctCount = useMemo(
    () =>
      Object.entries(answers).reduce((count, [qId, selected]) => {
        const q = shuffledQuestions.find((item) => item.id === qId)
        if (!q) return count
        const ok =
          String(selected).trim().toLowerCase() === String(q.correctAnswer).trim().toLowerCase()
        return count + (ok ? 1 : 0)
      }, 0),
    [answers, shuffledQuestions]
  )

  const totalAnswered = Object.keys(answers).length
  const progress =
    shuffledQuestions.length > 0 ? Math.round((totalAnswered / shuffledQuestions.length) * 100) : 0

  const catMeta = getCategoryMeta(categoryId, subject)

  const handleSelect = useCallback(
    (questionId, option) => {
      setAnswers((prev) => {
        if (prev[questionId] != null) return prev
        const q = shuffledQuestions.find((item) => item.id === questionId)
        const ok =
          q &&
          String(option).trim().toLowerCase() === String(q.correctAnswer).trim().toLowerCase()
        if (ok) {
          setCombo((c) => c + 1)
          setCelebrate(true)
          setTimeout(() => setCelebrate(false), 900)
        } else {
          setCombo(0)
        }
        return { ...prev, [questionId]: option }
      })
    },
    [shuffledQuestions]
  )

  const handleReset = () => {
    setAnswers({})
    setCurrentPage(0)
    setShowScore(false)
    setSessionRecorded(false)
    setCombo(0)
    setSessionKey((k) => k + 1) // brand-new generated set
  }

  const openScore = () => {
    if (!sessionRecorded && totalAnswered > 0) {
      recordSession({
        topicId: categoryId === 'all' ? `all_${subject}` : categoryId,
        correct: correctCount,
        total: totalAnswered,
      })
      setSessionRecorded(true)
    }
    setShowScore(true)
  }

  // Auto-prompt score when all answered
  useEffect(() => {
    if (totalAnswered === shuffledQuestions.length && shuffledQuestions.length > 0 && !showScore) {
      // light delay so last celebration plays
      const t = setTimeout(() => openScore(), 600)
      return () => clearTimeout(t)
    }
  }, [totalAnswered, shuffledQuestions.length]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      className="relative z-10 min-h-screen px-4 md:px-8 py-6 pb-16"
    >
      <Celebration show={celebrate} seed={combo + totalAnswered} />

      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between gap-3 mb-4 flex-wrap">
          <button
            type="button"
            onClick={onGoHome}
            className="pastel-btn px-4 py-2 bg-white shadow-card text-ink text-sm border border-black/5"
          >
            ← Kingdom
          </button>
          {onTeach && subject === 'math' && (
            <button
              type="button"
              onClick={onTeach}
              className="pastel-btn px-3 py-2 bg-peach/50 text-ink text-xs border border-peach"
            >
              Teach me
            </button>
          )}
          <div className="text-center flex-1">
            <div className="text-lg font-bold text-ink">
              {catMeta.icon} {catMeta.name}
            </div>
            <div className="text-xs text-muted">
              {subject === 'math' ? 'Fresh questions · generated for you' : 'Practice'}
              {' · '}
              {totalAnswered}/{shuffledQuestions.length}
              {combo >= 2 && <span className="text-success font-bold"> · 🔥 x{combo}</span>}
            </div>
          </div>
        </div>

        <div className="pastel-card p-3 mb-5">
          <div className="flex justify-between text-xs text-muted mb-1">
            <span>Quest progress</span>
            <span>{progress}%</span>
          </div>
          <div className="h-2.5 rounded-full bg-soft overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-success"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.4 }}
            />
          </div>
        </div>

        <div className="mb-4">
          <Mascot
            mood={combo >= 3 ? 'celebrate' : combo >= 1 ? 'happy' : 'encourage'}
            size="sm"
            message={
              combo >= 3
                ? `Amazing streak of ${combo}!`
                : pickLine(combo >= 1 ? 'correct' : 'encourage', currentPage + combo)
            }
          />
        </div>

        <div className="space-y-4 mb-8">
          {pageQuestions.map((question, idx) => (
            <QuestionCard
              key={`${sessionKey}-${question.id}`}
              question={question}
              index={idx}
              questionNumber={idx + 1}
              selectedAnswer={answers[question.id] || null}
              onSelect={handleSelect}
            />
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            type="button"
            onClick={openScore}
            disabled={totalAnswered === 0}
            className="flex-1 py-4 pastel-btn bg-ink text-white font-bold text-base disabled:opacity-40 shadow-soft"
          >
            View score ({totalAnswered} answered)
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="flex-1 py-4 pastel-btn bg-mint/60 text-ink font-bold text-base border border-mint"
          >
            ✨ New adventure (new questions)
          </button>
        </div>
      </div>

      {showScore && (
        <ScoreModal
          correctCount={correctCount}
          totalAnswered={totalAnswered}
          totalQuestions={shuffledQuestions.length}
          onTryAgain={handleReset}
          onGoHome={onGoHome}
        />
      )}
    </motion.div>
  )
}
