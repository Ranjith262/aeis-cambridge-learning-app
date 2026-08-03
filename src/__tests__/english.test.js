import { describe, it, expect } from 'vitest'
import { generateEnglishSession } from '../world/english/englishGenerator'

describe('English generators', () => {
  it('mixed session has unique ids', () => {
    const s = generateEnglishSession(10, 'all')
    expect(s.length).toBe(10)
    expect(new Set(s.map((q) => q.id)).size).toBe(10)
  })
  it('each skill produces valid items', () => {
    for (const skill of ['vocab', 'sentence', 'reading', 'grammar', 'phonics']) {
      const s = generateEnglishSession(5, skill)
      s.forEach((q) => {
        expect(q.correctAnswer).toBeTruthy()
        expect(q.options.length).toBeGreaterThanOrEqual(2)
        expect(q.options).toContain(q.correctAnswer)
      })
    }
  })
})
