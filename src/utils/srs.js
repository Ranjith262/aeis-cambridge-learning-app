/**
 * Simplified SM-2 spaced repetition for AEIS topics.
 * Intervals (days): 1 → 3 → 8 → 21 → 45
 */

const INTERVALS = [1, 3, 8, 21, 45]

export function defaultCard(topicId) {
  return {
    topicId,
    ease: 2.3,
    intervalIndex: 0,
    dueAt: Date.now(),
    reps: 0,
    lapses: 0,
  }
}

/** quality: 0 fail, 1 hard, 2 good, 3 easy */
export function reviewCard(card, quality) {
  const next = { ...card, reps: card.reps + 1 }
  if (quality === 0) {
    next.intervalIndex = 0
    next.lapses = (card.lapses || 0) + 1
    next.ease = Math.max(1.3, (card.ease || 2.3) - 0.2)
  } else {
    const bump = quality === 3 ? 2 : quality === 2 ? 1 : 0
    next.intervalIndex = Math.min(INTERVALS.length - 1, (card.intervalIndex || 0) + 1 + bump)
    next.ease = Math.min(3.0, (card.ease || 2.3) + (quality === 3 ? 0.15 : quality === 1 ? -0.05 : 0.05))
  }
  const days = INTERVALS[next.intervalIndex] || 1
  next.dueAt = Date.now() + days * 24 * 60 * 60 * 1000
  return next
}

export function isDue(card, now = Date.now()) {
  return !card || card.dueAt <= now
}

export function growthStage(card) {
  if (!card || card.reps === 0) return 0
  if (card.intervalIndex >= 3) return 3
  if (card.intervalIndex >= 2) return 2
  if (card.intervalIndex >= 1) return 1
  return 0
}
