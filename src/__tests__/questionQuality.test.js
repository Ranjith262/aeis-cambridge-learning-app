import { describe, it, expect } from 'vitest'
import { gateQuestion, stemKey } from '../utils/questionQuality'
import { buildCraftMockPaper } from '../world/adaptive/mockPaper'
import { generateBondQuestion } from '../world/bonds/bondsGenerator'
import { generateMoneyQuestion } from '../world/money/moneyGenerator'
import { generateQuestions } from '../utils/dynamicQuestions'
import { generateTimeQuestion } from '../world/time/timeGenerator'
import { generateAddQuestion } from '../world/addition/addGenerator'
import { generateShapeQuestion } from '../world/shapes/shapesGenerator'

describe('gateQuestion', () => {
  it('rejects empty', () => {
    expect(gateQuestion(null)).toBeNull()
    expect(gateQuestion({ question: '', correctAnswer: '1' })).toBeNull()
  })

  it('dedupes bond commutative options to single correct', () => {
    const q = gateQuestion({
      question: 'Which pair makes 10?',
      correctAnswer: '7 + 3',
      options: ['7 + 3', '3 + 7', '4 + 7', '3 + 8'],
      format: 'mcq',
      category: 'numberBonds',
    })
    expect(q).not.toBeNull()
    const hits = q.options.filter(
      (o) => o === '7 + 3' || o === '3 + 7' || o.replace(/\s/g, '') === '7+3' || o.replace(/\s/g, '') === '3+7'
    )
    // only one of the pair family should remain
    expect(hits.length).toBe(1)
    expect(q.options.filter((o, i, a) => a.indexOf(o) === i).length).toBe(q.options.length)
  })
})

describe('generators integrity', () => {
  const gens = [
    generateBondQuestion,
    generateMoneyQuestion,
    generateTimeQuestion,
    generateAddQuestion,
    generateShapeQuestion,
  ]
  it('95%+ draws pass gate with unique options and single correct', () => {
    for (const gen of gens) {
      let ok = 0
      for (let i = 0; i < 100; i++) {
        const q = gateQuestion(gen())
        if (!q) continue
        ok++
        if (q.format === 'mcq') {
          expect(new Set(q.options.map((o) => String(o).trim())).size).toBe(q.options.length)
          const hits = q.options.filter(
            (o) => String(o).trim().toLowerCase() === String(q.correctAnswer).trim().toLowerCase()
          )
          expect(hits.length).toBe(1)
        }
      }
      expect(ok).toBeGreaterThanOrEqual(95)
    }
  })
})

describe('mock paper', () => {
  it('no duplicate stems across 3 papers', () => {
    for (let t = 0; t < 3; t++) {
      const { all } = buildCraftMockPaper()
      const keys = all.map(stemKey)
      expect(new Set(keys).size).toBe(keys.length)
      all.forEach((q) => {
        const g = gateQuestion(q)
        expect(g).not.toBeNull()
      })
    }
  })
})

describe('generateQuestions unique', () => {
  it('returns unique stems', () => {
    const qs = generateQuestions('all', 15)
    const keys = qs.map(stemKey)
    expect(new Set(keys).size).toBe(keys.length)
  })
})
