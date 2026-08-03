import { describe, it, expect } from 'vitest'
import { generateAddSession } from '../world/addition/addGenerator'
import { generateSubSession } from '../world/subtraction/subGenerator'

describe('Addition/Subtraction generators', () => {
  it('add session unique ids and answers', () => {
    const s = generateAddSession(10)
    expect(new Set(s.map((q) => q.id)).size).toBe(10)
    s.forEach((q) => {
      expect(q.correctAnswer).toBeTruthy()
      expect(q.cinema.sum).toBeDefined()
    })
  })
  it('sub session diffs non-negative', () => {
    const s = generateSubSession(10)
    s.forEach((q) => {
      expect(Number(q.cinema.diff)).toBeGreaterThanOrEqual(0)
      expect(q.cinema.a).toBeGreaterThanOrEqual(q.cinema.b)
    })
  })
  it('batches differ', () => {
    const a = generateAddSession(6).map((q) => q.question).join('|')
    const b = generateAddSession(6).map((q) => q.question).join('|')
    expect(a).not.toBe(b)
  })
})
