import { useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { getExplanation, getExample, getPraise } from '../utils/explanations'

const OPTION_LETTERS = ['A', 'B', 'C', 'D']

export default function QuestionCard({ question, index, questionNumber, selectedAnswer, onSelect }) {
  const [showExplanation, setShowExplanation] = useState(false)

  const answered = !!selectedAnswer
  const isCorrectAnswer = answered && selectedAnswer === question.correctAnswer

  const praise = useMemo(
    () => getPraise(questionNumber + question.id.length),
    [questionNumber, question.id]
  )

  useEffect(() => {
    if (answered) {
      const timer = setTimeout(() => setShowExplanation(true), 400)
      return () => clearTimeout(timer)
    } else {
      setShowExplanation(false)
    }
  }, [answered])

  const getOptionStyle = (option) => {
    if (!answered) {
      return 'bg-white/5 border-white/20 text-white hover:bg-indigo-500/20 hover:border-indigo-400 cursor-pointer'
    }
    if (option === question.correctAnswer) {
      return 'bg-green-500/20 border-green-400 ring-2 ring-green-400/50 text-white cursor-default'
    }
    if (option === selectedAnswer) {
      return 'bg-red-500/20 border-red-400 ring-2 ring-red-400/50 text-white cursor-default'
    }
    return 'bg-white/5 border-white/10 text-white/30 cursor-default'
  }

  const getBadgeStyle = () => {
    if (!answered) return 'from-indigo-500 to-purple-600'
    if (isCorrectAnswer) return 'from-green-500 to-emerald-600'
    return 'from-red-500 to-rose-600'
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
      className="glass rounded-2xl p-5"
    >
      {/* Question header */}
      <div className="flex gap-3 mb-4">
        <span
          className={`flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br ${getBadgeStyle()} flex items-center justify-center text-white text-sm font-bold`}
        >
          {questionNumber}
        </span>
        <p className="text-white text-lg md:text-xl font-medium leading-snug">{question.question}</p>
      </div>

      {/* Options grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-3">
        {question.options.map((option, optIdx) => (
          <motion.button
            key={option}
            onClick={() => !answered && onSelect(question.id, option)}
            className={`option-btn w-full flex items-center gap-3 px-4 py-4 rounded-xl border transition-all text-left ${getOptionStyle(option)}`}
            whileTap={!answered ? { scale: 0.97 } : {}}
            animate={
              answered && option === question.correctAnswer
                ? { scale: [1, 1.05, 1] }
                : answered && option === selectedAnswer && option !== question.correctAnswer
                  ? { x: [0, -4, 4, -4, 4, 0] }
                  : {}
            }
            transition={
              answered && option === question.correctAnswer
                ? { type: 'spring', stiffness: 300, damping: 10 }
                : { duration: 0.3 }
            }
          >
            {/* Letter badge */}
            <span
              className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold border ${
                !answered
                  ? 'border-white/30 text-white/70'
                  : option === question.correctAnswer
                    ? 'border-green-400 text-green-300'
                    : option === selectedAnswer
                      ? 'border-red-400 text-red-300'
                      : 'border-white/10 text-white/20'
              }`}
            >
              {OPTION_LETTERS[optIdx]}
            </span>
            <span className="flex-1 text-sm md:text-base">{option}</span>
            {/* Icon */}
            {answered && option === question.correctAnswer && (
              <span className="flex-shrink-0 text-green-400">✓</span>
            )}
            {answered && option === selectedAnswer && option !== question.correctAnswer && (
              <span className="flex-shrink-0 text-red-400">✗</span>
            )}
          </motion.button>
        ))}
      </div>

      {/* Feedback panel */}
      <AnimatePresence>
        {answered && (
          <motion.div
            key="feedback"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            {isCorrectAnswer ? (
              <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4 flex items-start gap-3">
                <motion.span
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                  className="text-2xl flex-shrink-0"
                >
                  {praise.emoji}
                </motion.span>
                <div>
                  <p className="text-green-300 font-bold text-base">{praise.text}</p>
                  {showExplanation && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      <p className="text-green-200/80 text-sm mt-1">
                        📘 {getExplanation(question)}
                      </p>
                      <p className="text-green-200/60 text-sm mt-1 italic">
                        🌍 {getExample(question)}
                      </p>
                    </motion.div>
                  )}
                </div>
              </div>
            ) : (
              <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4 flex items-start gap-3">
                <span className="text-2xl flex-shrink-0">💡</span>
                <div>
                  <p className="text-amber-200 font-medium text-sm">
                    Good try! The answer is{' '}
                    <span className="underline decoration-wavy decoration-amber-400 font-bold">
                      {question.correctAnswer}
                    </span>
                  </p>
                  {showExplanation && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      <p className="text-amber-200/80 text-sm mt-1">
                        📘 {getExplanation(question)}
                      </p>
                      <p className="text-amber-200/60 text-sm mt-1 italic">
                        🌍 {getExample(question)}
                      </p>
                    </motion.div>
                  )}
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
