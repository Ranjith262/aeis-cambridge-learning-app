import { describe, it, expect } from 'vitest'
import { generateQuestions, generateOne, DYNAMIC_TOPICS } from '../utils/dynamicQuestions'

describe('dynamicQuestions', () => {
  it('exposes all math topics', () => {
    expect(DYNAMIC_TOPICS.length).toBeGreaterThanOrEqual(8)
  })

  it('generates unique ids across a batch', () => {
    const batch = generateQuestions('addition', 15)
    const ids = batch.map((q) => q.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it('never returns empty for a known topic', () => {
    for (const t of DYNAMIC_TOPICS) {
      const q = generateOne(t)
      expect(q).toBeTruthy()
      expect(q.correctAnswer).toBeDefined()
      expect(q.question).toBeTruthy()
    }
  })

  it('produces different numbers across calls', () => {
    const a = generateQuestions('addition', 8).map((q) => q.question).join('|')
    const b = generateQuestions('addition', 8).map((q) => q.question).join('|')
    // Extremely unlikely to be identical with random numbers
    expect(a).not.toBe(b)
  })

  it('mixed all generates across categories', () => {
    const batch = generateQuestions('all', 20)
    const cats = new Set(batch.map((q) => q.category))
    expect(cats.size).toBeGreaterThan(1)
  })
})
