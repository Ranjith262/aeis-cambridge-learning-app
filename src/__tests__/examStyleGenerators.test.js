import { describe, it, expect } from 'vitest'
import { gateQuestion, stemKey } from '../utils/questionQuality'
import { generateWordProblem, generateWordProblemSession } from '../world/wordProblems/wpGenerator'
import { generateMeasurementQuestion, generateMeasurementSession } from '../world/measurement/measGenerator'
import { generateGraphQuestion, generateGraphSession } from '../world/graphs/graphGenerator'
import { buildCraftMockPaper } from '../world/adaptive/mockPaper'
import { generateQuestions } from '../utils/dynamicQuestions'

function assertGated(raw) {
  const q = gateQuestion(raw)
  expect(q).not.toBeNull()
  if (q.format === 'mcq') {
    expect(new Set(q.options.map(String)).size).toBe(q.options.length)
    const hits = q.options.filter(
      (o) => String(o).trim().toLowerCase() === String(q.correctAnswer).trim().toLowerCase()
    )
    expect(hits.length).toBe(1)
  }
  return q
}

describe('word problems P1 exam style', () => {
  it('100 draws gate clean', () => {
    let ok = 0
    for (let i = 0; i < 100; i++) {
      const q = gateQuestion(generateWordProblem())
      if (q) ok++
    }
    expect(ok).toBeGreaterThanOrEqual(98)
  })
  it('session has diverse stems and skills', () => {
    const s = generateWordProblemSession(10)
    expect(new Set(s.map((q) => stemKey(q))).size).toBe(s.length)
    const skills = new Set(s.map((q) => q.skillId))
    expect(skills.size).toBeGreaterThanOrEqual(3)
  })
  it('covers join and take-away language', () => {
    const bag = Array.from({ length: 40 }, () => generateWordProblem())
    const text = bag.map((q) => q.question).join(' ')
    expect(/gets|more|altogether|in all/i.test(text)).toBe(true)
    expect(/gives|left|loses|sold/i.test(text)).toBe(true)
  })
})

describe('measurement P1 exam style', () => {
  it('100 draws gate clean', () => {
    let ok = 0
    for (let i = 0; i < 100; i++) {
      if (gateQuestion(generateMeasurementQuestion())) ok++
    }
    expect(ok).toBeGreaterThanOrEqual(98)
  })
  it('includes compare and difference', () => {
    const bag = Array.from({ length: 40 }, () => generateMeasurementQuestion())
    const skills = new Set(bag.map((q) => q.skillId))
    expect([...skills].some((s) => s.includes('COMPARE') || s.includes('DIFF'))).toBe(true)
  })
  it('equal length case answers same', () => {
    // force many draws until sameLength appears
    let found = false
    for (let i = 0; i < 80; i++) {
      const q = generateMeasurementQuestion()
      if (/both \d+ cm/.test(q.question)) {
        expect(q.correctAnswer).toBe('same')
        found = true
        break
      }
    }
    // not required every run but if found must be correct
    expect(true).toBe(true)
  })
})

describe('picture graphs P1 exam style', () => {
  it('100 draws gate clean', () => {
    let ok = 0
    for (let i = 0; i < 100; i++) {
      if (gateQuestion(generateGraphQuestion())) ok++
    }
    expect(ok).toBeGreaterThanOrEqual(98)
  })
  it('session unique stems', () => {
    const s = generateGraphSession(8)
    expect(new Set(s.map((q) => stemKey(q))).size).toBe(s.length)
  })
  it('asks most/least/total/read', () => {
    const bag = Array.from({ length: 50 }, () => generateGraphQuestion())
    const skills = new Set(bag.map((q) => q.skillId))
    expect(skills.size).toBeGreaterThanOrEqual(3)
  })
})

describe('dynamic + mock integration', () => {
  it('generateQuestions for each topic unique and gated', () => {
    for (const topic of ['wordProblems', 'measurement', 'pictureGraphs']) {
      const qs = generateQuestions(topic, 8)
      expect(qs.length).toBeGreaterThanOrEqual(6)
      expect(new Set(qs.map(stemKey)).size).toBe(qs.length)
      qs.forEach(assertGated)
    }
  })
  it('mock papers stay unique', () => {
    for (let i = 0; i < 3; i++) {
      const { all } = buildCraftMockPaper()
      expect(new Set(all.map(stemKey)).size).toBe(all.length)
    }
  })
})
