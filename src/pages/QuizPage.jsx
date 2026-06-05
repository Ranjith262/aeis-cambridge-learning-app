import { useState, useMemo, useCallback } from 'react'
import { motion } from 'framer-motion'
import { shuffleQuestions } from '../utils/shuffle'
import { categories, allQuestions, getQuestionsByCategory } from '../data/questions'
import { mathCategories, allMathQuestions, getMathQuestionsByCategory } from '../data/mathQuestions'
import QuestionCard from '../components/QuestionCard'
import ScoreModal from '../components/ScoreModal'

const QUESTIONS_PER_PAGE = 10

function getCategoryMeta(categoryId, subject) {
  if (subject === 'math') {
    return mathCategories.find((c) => c.id === categoryId) || { name: 'All Maths', icon: '🧮', color: 'from-green-400 to-teal-500' }
  }
  return categories.find((c) => c.id === categoryId) || { name: 'All English', icon: '📖', color: 'from-blue-400 to-purple-600' }
}

function getSmartPageNumbers(currentPage, totalPages) {
  if (totalPages <= 7) return Array.from({ length: totalPages }, (_, i) => i)
  const pages = []
  const start = Math.max(0, Math.min(currentPage - 3, totalPages - 7))
  for (let i = start; i < Math.min(start + 7, totalPages); i++) pages.push(i)
  return pages
}

export default function QuizPage({ categoryId, subject, onGoHome }) {
  const [answers, setAnswers] = useState({})
  const [currentPage, setCurrentPage] = useState(0)
  const [showScore, setShowScore] = useState(false)

  // Get and shuffle questions on mount
  const shuffledQuestions = useMemo(() => {
    let qs
    if (categoryId === 'all') {
      qs = subject === 'math' ? allMathQuestions : allQuestions
    } else {
      qs = subject === 'math'
        ? getMathQuestionsByCategory(categoryId)
        : getQuestionsByCategory(categoryId).map((q) => ({ ...q, category: categoryId }))
    }
    return shuffleQuestions(qs)
  }, [categoryId, subject])

  const totalPages = Math.ceil(shuffledQuestions.length / QUESTIONS_PER_PAGE)
  const pageQuestions = shuffledQuestions.slice(
    currentPage * QUESTIONS_PER_PAGE,
    (currentPage + 1) * QUESTIONS_PER_PAGE
  )

  const correctCount = useMemo(
    () =>
      Object.entries(answers).reduce((count, [qId, selected]) => {
        const q = shuffledQuestions.find((q) => q.id === qId)
        return count + (q && selected === q.correctAnswer ? 1 : 0)
      }, 0),
    [answers, shuffledQuestions]
  )

  const totalAnswered = Object.keys(answers).length
  const progress = Math.round((totalAnswered / shuffledQuestions.length) * 100)

  const catMeta = getCategoryMeta(categoryId, subject)

  const handleSelect = useCallback((questionId, option) => {
    setAnswers((prev) => ({ ...prev, [questionId]: option }))
  }, [])

  const handleReset = useCallback(() => {
    setAnswers({})
    setCurrentPage(0)
    setShowScore(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  const handlePageChange = (page) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const pageNumbers = getSmartPageNumbers(currentPage, totalPages)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
      className="relative z-10 min-h-screen px-4 md:px-8 lg:px-16 py-6"
    >
      {/* Top bar */}
      <div className="flex items-center justify-between mb-6 max-w-4xl mx-auto">
        <button
          onClick={onGoHome}
          className="glass rounded-full px-4 py-2 text-white text-sm font-medium hover:bg-white/10 transition-colors flex items-center gap-1"
        >
          ← Back
        </button>
        <div className="glass rounded-full px-4 py-2 text-green-300 text-sm font-medium">
          ✅ {correctCount}/{totalAnswered} correct
        </div>
      </div>

      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-5">
          <div className="text-5xl mb-2">{catMeta.icon}</div>
          <h2 className="text-white font-bold text-2xl">{catMeta.name}</h2>
          <p className="text-purple-300 text-sm mt-1">
            Page {currentPage + 1} of {totalPages} · {shuffledQuestions.length} questions total
          </p>
        </div>

        {/* Progress bar */}
        <div className="glass rounded-2xl p-4 mb-6">
          <div className="flex justify-between text-sm text-purple-300 mb-2">
            <span>Progress</span>
            <span>{progress}%</span>
          </div>
          <div className="h-2 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-green-400 to-emerald-500 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        {/* Questions */}
        <div className="space-y-5 mb-8">
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
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 0}
            className="glass rounded-xl px-4 py-2 text-white text-sm disabled:opacity-30 hover:bg-white/10 transition-colors"
          >
            ← Prev
          </button>
          {pageNumbers.map((pg) => (
            <button
              key={pg}
              onClick={() => handlePageChange(pg)}
              className={`rounded-xl px-4 py-2 text-sm font-medium transition-colors ${
                pg === currentPage
                  ? 'bg-indigo-500 text-white'
                  : 'glass text-white/60 hover:text-white hover:bg-white/10'
              }`}
            >
              {pg + 1}
            </button>
          ))}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage >= totalPages - 1}
            className="glass rounded-xl px-4 py-2 text-white text-sm disabled:opacity-30 hover:bg-white/10 transition-colors"
          >
            Next →
          </button>
        </div>

        {/* View Score */}
        <button
          onClick={() => setShowScore(true)}
          disabled={totalAnswered === 0}
          className="w-full py-4 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-bold text-base disabled:opacity-40 hover:from-indigo-600 hover:to-purple-700 transition-all shadow-lg"
        >
          📊 View Score ({totalAnswered} answered)
        </button>
      </div>

      {/* Score Modal */}
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
