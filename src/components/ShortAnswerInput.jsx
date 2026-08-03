import { useState, useEffect } from 'react'

/**
 * Short-answer input. hideFeedback = exam mode (no correct reveal until paper ends).
 */
export default function ShortAnswerInput({
  question,
  selectedAnswer,
  onSelect,
  disabled,
  hideFeedback = false,
}) {
  const [value, setValue] = useState(selectedAnswer || '')
  const [working, setWorking] = useState('')

  useEffect(() => {
    setValue(selectedAnswer || '')
  }, [selectedAnswer, question?.id])

  const submit = () => {
    if (disabled || !value.trim()) return
    onSelect(question.id, value.trim())
  }

  const isAnswered = selectedAnswer != null
  const isCorrect =
    isAnswered &&
    String(selectedAnswer).trim().toLowerCase() === String(question.correctAnswer).trim().toLowerCase()

  // Exam mode: allow changing until paper submit — parent controls disabled
  const locked = hideFeedback ? false : isAnswered

  return (
    <div className="space-y-3">
      <label className="block text-xs font-semibold text-muted">Your answer</label>
      <input
        type="text"
        inputMode="text"
        value={hideFeedback ? value : locked ? selectedAnswer : value}
        disabled={(!hideFeedback && locked) || disabled}
        onChange={(e) => {
          setValue(e.target.value)
          if (hideFeedback) {
            // live-store optional: only on button
          }
        }}
        className="w-full px-4 py-3 rounded-xl border-2 border-black/10 text-ink font-semibold"
        placeholder="Type your answer"
      />
      <label className="block text-xs font-semibold text-muted">Working (optional)</label>
      <textarea
        value={working}
        disabled={(!hideFeedback && locked) || disabled}
        onChange={(e) => setWorking(e.target.value)}
        rows={2}
        className="w-full px-4 py-2 rounded-xl border border-black/10 text-sm text-ink"
        placeholder="Show steps if you like"
      />
      {hideFeedback ? (
        <button
          type="button"
          onClick={() => {
            if (!value.trim()) return
            onSelect(question.id, value.trim())
          }}
          className="pastel-btn px-5 py-2 bg-ink text-white text-sm"
        >
          {isAnswered ? 'Update answer' : 'Save answer'}
        </button>
      ) : (
        !isAnswered && (
          <button type="button" onClick={submit} className="pastel-btn px-5 py-2 bg-ink text-white text-sm">
            Check answer
          </button>
        )
      )}
      {isAnswered && !hideFeedback && (
        <p className={`text-sm font-semibold ${isCorrect ? 'text-success' : 'text-coral'}`}>
          {isCorrect ? 'Correct!' : `Correct answer: ${question.correctAnswer}`}
        </p>
      )}
      {isAnswered && hideFeedback && (
        <p className="text-xs text-ink/50">Answer saved</p>
      )}
    </div>
  )
}
