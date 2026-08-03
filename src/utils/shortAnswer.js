/** Convert some MCQ math items into short-answer style for variety */
export function toShortAnswer(q) {
  if (!q) return null
  // Prefer questions where correct answer is numeric-looking
  const ans = String(q.correctAnswer)
  if (!/^\$?\d+/.test(ans) && !/^\d+/.test(ans)) return null
  return {
    ...q,
    id: `sa_${q.id}`,
    format: 'short_answer',
    options: undefined,
  }
}

export function mixShortAnswers(list, ratio = 0.2) {
  const out = []
  list.forEach((q, i) => {
    if (i % Math.max(2, Math.round(1 / ratio)) === 0) {
      const sa = toShortAnswer(q)
      if (sa) out.push(sa)
      else out.push(q)
    } else {
      out.push(q)
    }
  })
  return out
}
