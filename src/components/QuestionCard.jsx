import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { getPraise } from '../utils/explanations'
import Mascot, { pickLine } from './Mascot'
import { ManipulativeFor } from './manipulatives'
import ShortAnswerInput from './ShortAnswerInput'

export default function QuestionCard({
  question,
  index,
  questionNumber,
  selectedAnswer,
  onSelect,
}) {
  const [showExplain, setShowExplain] = useState(false)
  const isAnswered = selectedAnswer != null
  const isCorrect =
    isAnswered &&
    String(selectedAnswer).trim().toLowerCase() === String(question.correctAnswer).trim().toLowerCase()
  const praise = getPraise(questionNumber + index)

  useEffect(() => {
    if (selectedAnswer != null) setShowExplain(true)
  }, [selectedAnswer])

  const handleSelect = (option) => {
    if (isAnswered) return
    onSelect(question.id, option)
    setShowExplain(true)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04 }}
      className="pastel-card p-5"
    >
      <div className="flex items-start gap-3 mb-4">
        <span className="flex-shrink-0 w-8 h-8 rounded-full bg-mint/60 text-ink text-sm font-bold flex items-center justify-center">
          {questionNumber}
        </span>
        <p className="text-ink font-medium leading-relaxed pt-0.5">{question.question}</p>
      </div>

      {question.format === 'short_answer' || !question.options ? (
        <ShortAnswerInput
          question={question}
          selectedAnswer={selectedAnswer}
          onSelect={onSelect}
          disabled={isAnswered}
        />
      ) : (
      <div className="grid gap-2">
        {question.options.map((option) => {
          let style =
            'option-btn w-full text-left px-4 py-3 rounded-xl border-2 text-sm font-medium transition-colors '
          if (!isAnswered) {
            style += 'border-black/5 bg-soft/50 text-ink hover:border-mint hover:bg-mint/20'
          } else if (option === question.correctAnswer) {
            style += 'border-success bg-mint/40 text-ink'
          } else if (option === selectedAnswer) {
            style += 'border-coral bg-coral/30 text-ink'
          } else {
            style += 'border-transparent bg-soft/30 text-muted'
          }

          return (
            <button
              key={option}
              type="button"
              disabled={isAnswered}
              onClick={() => handleSelect(option)}
              className={style}
            >
              {option}
              {isAnswered && option === question.correctAnswer && (
                <span className="float-right">✓</span>
              )}
            </button>
          )
        })}
      </div>
      )}

      <AnimatePresence>
        {isAnswered && showExplain && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-4 overflow-hidden"
          >
            <div className={`rounded-xl p-4 ${isCorrect ? 'bg-mint/30' : 'bg-peach/40'}`}>
              <Mascot
                mood={isCorrect ? 'happy' : 'thinking'}
                size="sm"
                message={
                  isCorrect
                    ? `${praise.emoji} ${praise.text}`
                    : pickLine('incorrect', questionNumber)
                }
              />
              <div className="mt-3 text-sm text-ink space-y-1">
                {!isCorrect && (
                  <p>
                    <span className="font-semibold">Correct answer:</span> {question.correctAnswer}
                  </p>
                )}
                {question.explanation && (
                  <p>
                    <span className="font-semibold">Why:</span> {question.explanation}
                  </p>
                )}
                {question.example && (
                  <p className="text-muted">
                    <span className="font-semibold text-ink">Try this:</span> {question.example}
                  </p>
                )}
              </div>
              {!isCorrect && (
                <div className="mt-3">
                  <ManipulativeFor topicId={question.category || question.topicId} question={question} />
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
