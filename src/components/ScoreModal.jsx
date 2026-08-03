import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Mascot, { pickLine } from './Mascot'

const CIRCUMFERENCE = 2 * Math.PI * 60

function getRingColor(pct) {
  if (pct >= 80) return '#00B894'
  if (pct >= 50) return '#FDCB6E'
  return '#FFAAA5'
}

function getMessage(pct) {
  if (pct >= 90) return 'Outstanding! You are Math Kingdom ready!'
  if (pct >= 70) return 'Great work — keep building your strength!'
  if (pct >= 50) return 'Solid effort. Practice makes progress!'
  return 'Every try counts. Come back and grow stronger!'
}

export default function ScoreModal({
  correctCount,
  totalAnswered,
  totalQuestions,
  onTryAgain,
  onGoHome,
}) {
  const pct = totalAnswered > 0 ? Math.round((correctCount / totalAnswered) * 100) : 0
  const [animatedOffset, setAnimatedOffset] = useState(CIRCUMFERENCE)

  useEffect(() => {
    const offset = CIRCUMFERENCE - (pct / 100) * CIRCUMFERENCE
    const t = setTimeout(() => setAnimatedOffset(offset), 100)
    return () => clearTimeout(t)
  }, [pct])

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/30 backdrop-blur-sm"
        onClick={onGoHome}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 280 }}
          className="pastel-card p-6 w-full max-w-sm text-center"
          onClick={(e) => e.stopPropagation()}
        >
          <Mascot
            mood={pct >= 70 ? 'celebrate' : 'encourage'}
            size="md"
            message={pickLine('complete', correctCount)}
            className="justify-center mb-4"
          />

          <h2 className="text-2xl font-bold text-ink mb-4">Your Score</h2>

          <div className="flex justify-center mb-4">
            <svg width="144" height="144" viewBox="0 0 144 144">
              <circle cx="72" cy="72" r="60" fill="none" stroke="#E8F5F0" strokeWidth="10" />
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
              <text x="72" y="67" textAnchor="middle" fill={getRingColor(pct)} fontSize="22" fontWeight="bold">
                {correctCount}/{totalAnswered}
              </text>
              <text x="72" y="88" textAnchor="middle" fill="#636E72" fontSize="14">
                {pct}%
              </text>
            </svg>
          </div>

          <p className="text-ink text-base mb-1 font-medium">{getMessage(pct)}</p>
          <p className="text-muted text-sm mb-6">
            {totalAnswered} of {totalQuestions} questions answered
          </p>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={onTryAgain}
              className="flex-1 py-3 pastel-btn bg-ink text-white font-semibold text-sm"
            >
              Try again
            </button>
            <button
              type="button"
              onClick={onGoHome}
              className="flex-1 py-3 pastel-btn bg-soft text-ink font-semibold text-sm border border-black/5"
            >
              Back to Kingdom
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
