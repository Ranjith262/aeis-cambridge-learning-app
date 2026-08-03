import { describe, it, expect } from 'vitest'
import { buildCraftMockPaper } from '../world/adaptive/mockPaper'

function stemKey(q) {
  return String(q.question).toLowerCase().replace(/\d+/g, '#').replace(/\s+/g, ' ').trim()
}

describe('mock paper uniqueness', () => {
  it('has no duplicate stems in one paper', () => {
    for (let trial = 0; trial < 5; trial++) {
      const { all } = buildCraftMockPaper()
      const keys = all.map(stemKey)
      expect(new Set(keys).size).toBe(keys.length)
      expect(all.length).toBe(29 + 17)
    }
  })
})
