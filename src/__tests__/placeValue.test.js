import { describe, it, expect } from 'vitest'
import { generatePlaceValueQuestion, generatePlaceValueSession } from '../world/placeValue/pvGenerator'

describe('Phase 1 Place Value generator', () => {
  it('always returns skillId and correctAnswer', () => {
    for (let i = 0; i < 20; i++) {
      const q = generatePlaceValueQuestion()
      expect(q.skillId).toBeTruthy()
      expect(q.correctAnswer).toBeTruthy()
      expect(q.question).toBeTruthy()
      expect(q.cinema).toBeTruthy()
    }
  })

  it('PV_BUILD answers match tens*10+ones', () => {
    for (let i = 0; i < 15; i++) {
      const q = generatePlaceValueQuestion('PV_BUILD')
      expect(q.skillId).toBe('PV_BUILD')
      const n = Number(q.correctAnswer)
      expect(n).toBe(q.cinema.n)
      expect(q.options).toContain(String(n))
    }
  })

  it('session has unique ids', () => {
    const s = generatePlaceValueSession(12)
    expect(new Set(s.map((q) => q.id)).size).toBe(12)
  })

  it('sessions differ across calls', () => {
    const a = generatePlaceValueSession(8).map((q) => q.question).join('|')
    const b = generatePlaceValueSession(8).map((q) => q.question).join('|')
    expect(a).not.toBe(b)
  })
})
