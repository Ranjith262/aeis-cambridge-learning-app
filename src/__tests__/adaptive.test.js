import { describe, it, expect, beforeEach } from 'vitest'
import {
  recordAdaptiveResult,
  isFragile,
  rankSkillsForPractice,
  loadAdaptive,
} from '../world/adaptive/learnerModel'
import { buildSmartQuest } from '../world/adaptive/smartQuest'

beforeEach(() => {
  localStorage.clear()
})

describe('adaptive model', () => {
  it('marks fragile after weak recent window', () => {
    for (let i = 0; i < 4; i++) recordAdaptiveResult('ADD_BASIC', false)
    expect(isFragile('ADD_BASIC')).toBe(true)
  })
  it('ranks fragile skills first', () => {
    recordAdaptiveResult('ADD_BASIC', false)
    recordAdaptiveResult('ADD_BASIC', false)
    recordAdaptiveResult('ADD_BASIC', false)
    recordAdaptiveResult('PV_BUILD', true)
    recordAdaptiveResult('PV_BUILD', true)
    recordAdaptiveResult('PV_BUILD', true)
    const ranked = rankSkillsForPractice(['PV_BUILD', 'ADD_BASIC'])
    expect(ranked[0]).toBe('ADD_BASIC')
  })
})

describe('smart quest', () => {
  it('builds math session of requested length', () => {
    const q = buildSmartQuest({ domain: 'math', count: 10 })
    expect(q.length).toBe(10)
    q.forEach((item) => {
      expect(item.correctAnswer).toBeTruthy()
      expect(item.question).toBeTruthy()
    })
  })
  it('builds english session', () => {
    const q = buildSmartQuest({ domain: 'english', count: 6 })
    expect(q.length).toBe(6)
  })
})
