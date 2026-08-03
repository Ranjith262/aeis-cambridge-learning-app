import { describe, it, expect } from 'vitest'
import { generateMoneyQuestion, generateMoneySession } from '../world/money/moneyGenerator'

describe('money generator integrity', () => {
  it('never marks unequal compare when values are equal', () => {
    for (let i = 0; i < 80; i++) {
      const q = generateMoneyQuestion()
      const m = q.question.match(/worth more:\s*(\d+)¢ or (\d+)¢/i)
      if (m && m[1] === m[2]) {
        expect(q.correctAnswer).toBe('same')
        expect(q.options).toContain('same')
      }
      if (m && m[1] !== m[2]) {
        expect(q.correctAnswer).not.toBe('same')
        const greater = Math.max(Number(m[1]), Number(m[2]))
        expect(q.correctAnswer).toBe(`${greater}¢`)
      }
    }
  })
  it('session items have valid answers', () => {
    const s = generateMoneySession(10)
    s.forEach((q) => {
      expect(q.correctAnswer).toBeTruthy()
      if (q.options) expect(q.options).toContain(q.correctAnswer)
    })
  })
})
