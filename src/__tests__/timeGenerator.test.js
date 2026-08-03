import { describe, it, expect } from 'vitest'
import { generateTimeSession, generateTimeQuestion } from '../world/time/timeGenerator'

describe('MOE-aligned time generator', () => {
  it('session has diverse stems', () => {
    const s = generateTimeSession(10)
    expect(s.length).toBe(10)
    const stems = s.map((q) => q.question.replace(/\d+/g, '#'))
    const unique = new Set(stems)
    expect(unique.size).toBeGreaterThanOrEqual(6)
  })
  it('covers multiple skill ids across many draws', () => {
    const skills = new Set()
    for (let i = 0; i < 40; i++) skills.add(generateTimeQuestion().skillId)
    expect(skills.size).toBeGreaterThanOrEqual(4)
  })
  it('every item has explanation and correct option', () => {
    for (let i = 0; i < 20; i++) {
      const q = generateTimeQuestion()
      expect(q.correctAnswer).toBeTruthy()
      expect(q.explanation).toBeTruthy()
      if (q.options) expect(q.options).toContain(q.correctAnswer)
    }
  })
})
