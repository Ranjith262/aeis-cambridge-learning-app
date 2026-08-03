import { describe, it, expect } from 'vitest'
import { defaultCard, reviewCard, isDue, growthStage } from '../utils/srs'

describe('SRS', () => {
  it('creates a default card due now', () => {
    const c = defaultCard('addition')
    expect(c.topicId).toBe('addition')
    expect(isDue(c)).toBe(true)
  })

  it('schedules further out after a good review', () => {
    const c = defaultCard('addition')
    const next = reviewCard(c, 2)
    expect(next.reps).toBe(1)
    expect(next.dueAt).toBeGreaterThan(Date.now())
    expect(next.intervalIndex).toBeGreaterThanOrEqual(1)
  })

  it('resets interval on failure', () => {
    let c = defaultCard('addition')
    c = reviewCard(c, 3)
    c = reviewCard(c, 0)
    expect(c.intervalIndex).toBe(0)
    expect(c.lapses).toBe(1)
  })

  it('maps growth stages', () => {
    expect(growthStage(null)).toBe(0)
    expect(growthStage({ reps: 2, intervalIndex: 2 })).toBe(2)
  })
})
