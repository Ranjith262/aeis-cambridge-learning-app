import { useState } from 'react'

/**
 * Simple short-answer input for numeric / short text answers.
 * Used in practice when question.format === 'short_answer'
 */
export default function ShortAnswerInput({ question, selectedAnswer, onSelect, disabled }) {
  const [value, setValue] = useState(selectedAnswer || '')
  const [working, setWorking] = useState('')

  const submit = () => {
    if (disabled || !value.trim()) return
    onSelect(question.id, value.trim())
  }

  const isAnswered = selectedAnswer != null
  const isCorrect =
    isAnswered &&
    String(selectedAnswer).trim().toLowerCase() === String(question.correctAnswer).trim().toLowerCase()

  return (
    <div className="space-y-3">
      <label className="block text-xs font-semibold text-muted">Your answer</label>
      <input
        type="text"
        inputMode="numeric"
        value={isAnswered ? selectedAnswer : value}
        disabled={isAnswered || disabled}
        onChange={(e) => setValue(e.target.value)}
        className="w-full px-4 py-3 rounded-xl border-2 border-black/10 text-ink font-semibold"
        placeholder="Type your answer"
      />
      <label className="block text-xs font-semibold text-muted">Working (optional)</label>
      <textarea
        value={working}
        disabled={isAnswered || disabled}
        onChange={(e) => setWorking(e.target.value)}
        rows={2}
        className="w-full px-4 py-2 rounded-xl border border-black/10 text-sm text-ink"
        placeholder="Show steps if you like"
      />
      {!isAnswered && (
        <button type="button" onClick={submit} className="pastel-btn px-5 py-2 bg-ink text-white text-sm">
          Check answer
        </button>
      )}
      {isAnswered && (
        <p className={`text-sm font-semibold ${isCorrect ? 'text-success' : 'text-coral'}`}>
          {isCorrect ? 'Correct!' : `Correct answer: ${question.correctAnswer}`}
        </p>
      )}
    </div>
  )
}
