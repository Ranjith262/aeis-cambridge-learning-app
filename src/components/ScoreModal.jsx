import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const CIRCUMFERENCE = 2 * Math.PI * 60 // r=60

function getEmoji(pct) {
  if (pct >= 80) return '🌟'
  if (pct >= 60) return '👍'
  return '💪'
}

function getMessage(pct) {
  if (pct >= 80) return 'Amazing work! You are a star! 🌟'
  if (pct >= 60) return 'Good job! Keep practising! 📚'
  return 'Keep trying! You can do it! 💪'
}

function getRingColor(pct) {
  if (pct >= 80) return '#10B981'  // green
  if (pct >= 60) return '#F59E0B'  // amber
  return '#EF4444'                  // red
}

export default function ScoreModal({ correctCount, totalAnswered, totalQuestions, onTryAgain, onGoHome }) {
  const [animatedOffset, setAnimatedOffset] = useState(CIRCUMFERENCE)

  const pct = totalAnswered > 0 ? Math.round((correctCount / totalAnswered) * 100) : 0

  useEffect(() => {
    const target = CIRCUMFERENCE - (pct / 100) * CIRCUMFERENCE
    const timer = setTimeout(() => setAnimatedOffset(target), 100)
    return () => clearTimeout(timer)
  }, [pct])

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
        onClick={(e) => e.target === e.currentTarget && onGoHome()}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0, y: 40 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          className="glass-white rounded-3xl p-8 max-w-sm w-full text-center shadow-2xl"
        >
          {/* Animated emoji */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 300, delay: 0.2 }}
            className="text-5xl mb-3"
          >
            {getEmoji(pct)}
          </motion.div>

          <h2 className="text-2xl font-bold text-gray-800 mb-5">Your Score</h2>

          {/* SVG Ring */}
          <div className="flex justify-center mb-4">
            <svg width="144" height="144" viewBox="0 0 144 144">
              {/* Track */}
              <circle
                cx="72"
                cy="72"
                r="60"
                fill="none"
                stroke="#e5e7eb"
                strokeWidth="10"
              />
              {/* Progress */}
              <circle
                cx="72"
                cy="72"
                r="60"
                fill="none"
                stroke={getRingColor(pct)}
                strokeWidth="10"
                strokeLinecap="round"
                strokeDasharray={CIRCUMFERENCE}
                strokeDashoffset={animatedOffset}
                transform="rotate(-90 72 72)"
                style={{ transition: 'stroke-dashoffset 1s ease-out' }}
              />
              {/* Score text */}
              <text x="72" y="67" textAnchor="middle" fill={getRingColor(pct)} fontSize="22" fontWeight="bold">
                {correctCount}/{totalAnswered}
              </text>
              <text x="72" y="88" textAnchor="middle" fill="#6b7280" fontSize="14">
                {pct}%
              </text>
            </svg>
          </div>

          {/* Message */}
          <p className="text-gray-600 text-base mb-2 font-medium">{getMessage(pct)}</p>
          <p className="text-gray-400 text-sm mb-6">
            {totalAnswered} of {totalQuestions} questions answered
          </p>

          {/* Buttons */}
          <div className="flex gap-3">
            <button
              onClick={onTryAgain}
              className="flex-1 py-3 px-4 rounded-2xl bg-indigo-500 text-white font-semibold text-sm hover:bg-indigo-600 transition-colors"
            >
              🔄 Try Again
            </button>
            <button
              onClick={onGoHome}
              className="flex-1 py-3 px-4 rounded-2xl bg-gray-100 text-gray-700 font-semibold text-sm hover:bg-gray-200 transition-colors"
            >
              🏠 Back to Topics
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
