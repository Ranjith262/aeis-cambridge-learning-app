import { useState, useMemo, useCallback } from 'react'
import { motion } from 'framer-motion'
import { shuffleQuestions } from '../utils/shuffle'
import { categories, allQuestions, getQuestionsByCategory } from '../data/questions'
import { mathCategories, allMathQuestions, getMathQuestionsByCategory } from '../data/mathQuestions'
import QuestionCard from '../components/QuestionCard'
import ScoreModal from '../components/ScoreModal'
import Mascot, { pickLine } from '../components/Mascot'
import { recordSession } from '../utils/progress'

const QUESTIONS_PER_PAGE = 8

function getCategoryMeta(categoryId, subject) {
  if (subject === 'math') {
    return (
      mathCategories.find((c) => c.id === categoryId) || {
        name: 'All Maths',
        icon: '🧮',
      }
    )
  }
  return (
    categories.find((c) => c.id === categoryId) || {
      name: 'All English',
      icon: '📖',
    }
  )
}

export default function QuizPage({ categoryId, subject, onGoHome }) {
  const [answers, setAnswers] = useState({})
  const [currentPage, setCurrentPage] = useState(0)
  const [showScore, setShowScore] = useState(false)
  const [sessionRecorded, setSessionRecorded] = useState(false)

  const shuffledQuestions = useMemo(() => {
    let qs
    if (categoryId === 'all') {
      qs = subject === 'math' ? allMathQuestions : allQuestions
    } else {
      qs =
        subject === 'math'
          ? getMathQuestionsByCategory(categoryId)
          : getQuestionsByCategory(categoryId).map((q) => ({ ...q, category: categoryId }))
    }
    return shuffleQuestions(qs)
  }, [categoryId, subject])

  const totalPages = Math.max(1, Math.ceil(shuffledQuestions.length / QUESTIONS_PER_PAGE))
  const pageQuestions = shuffledQuestions.slice(
    currentPage * QUESTIONS_PER_PAGE,
    (currentPage + 1) * QUESTIONS_PER_PAGE
  )

  const correctCount = useMemo(
    () =>
      Object.entries(answers).reduce((count, [qId, selected]) => {
        const q = shuffledQuestions.find((item) => item.id === qId)
        return count + (q && selected === q.correctAnswer ? 1 : 0)
      }, 0),
    [answers, shuffledQuestions]
  )

  const totalAnswered = Object.keys(answers).length
  const progress =
    shuffledQuestions.length > 0
      ? Math.round((totalAnswered / shuffledQuestions.length) * 100)
      : 0

  const catMeta = getCategoryMeta(categoryId, subject)

  const handleSelect = useCallback((questionId, option) => {
    setAnswers((prev) => ({ ...prev, [questionId]: option }))
  }, [])

  const handlePageChange = (page) => {
    if (page < 0 || page >= totalPages) return
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleReset = () => {
    setAnswers({})
    setCurrentPage(0)
    setShowScore(false)
    setSessionRecorded(false)
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

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      className="relative z-10 min-h-screen px-4 md:px-8 py-6 pb-16"
    >
      <div className="max-w-3xl mx-auto">
        {/* Top bar */}
        <div className="flex items-center justify-between gap-3 mb-4">
          <button
            type="button"
            onClick={onGoHome}
            className="pastel-btn px-4 py-2 bg-white shadow-card text-ink text-sm border border-black/5"
          >
            ← Kingdom
          </button>
          <div className="text-center">
            <div className="text-lg font-bold text-ink">
              {catMeta.icon} {catMeta.name}
            </div>
            <div className="text-xs text-muted">
              {totalAnswered}/{shuffledQuestions.length} answered
            </div>
          </div>
          <div className="w-20" />
        </div>

        {/* Progress */}
        <div className="pastel-card p-3 mb-5">
          <div className="flex justify-between text-xs text-muted mb-1">
            <span>Progress</span>
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
          <Mascot mood="encourage" size="sm" message={pickLine('encourage', currentPage)} />
        </div>

        {/* Questions */}
        <div className="space-y-4 mb-8">
          {pageQuestions.map((question, idx) => (
            <QuestionCard
              key={question.id}
              question={question}
              index={idx}
              questionNumber={currentPage * QUESTIONS_PER_PAGE + idx + 1}
              selectedAnswer={answers[question.id] || null}
              onSelect={handleSelect}
            />
          ))}
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-center gap-2 mb-6 flex-wrap">
          <button
            type="button"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 0}
            className="pastel-btn px-4 py-2 bg-white text-ink text-sm border border-black/5 disabled:opacity-30"
          >
            ← Prev
          </button>
          {Array.from({ length: totalPages }, (_, i) => i).map((pg) => (
            <button
              key={pg}
              type="button"
              onClick={() => handlePageChange(pg)}
              className={`pastel-btn px-3.5 py-2 text-sm font-medium ${
                pg === currentPage
                  ? 'bg-ink text-white'
                  : 'bg-white text-muted border border-black/5'
              }`}
            >
              {pg + 1}
            </button>
          ))}
          <button
            type="button"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage >= totalPages - 1}
            className="pastel-btn px-4 py-2 bg-white text-ink text-sm border border-black/5 disabled:opacity-30"
          >
            Next →
          </button>
        </div>

        <button
          type="button"
          onClick={openScore}
          disabled={totalAnswered === 0}
          className="w-full py-4 pastel-btn bg-ink text-white font-bold text-base disabled:opacity-40 shadow-soft"
        >
          View score ({totalAnswered} answered)
        </button>
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
