import { describe, it, expect } from 'vitest'
import { getExplanation, getExample, getPraise } from '../utils/explanations'

const makeQuestion = (overrides = {}) => ({
  id: 'test1',
  question: 'Test question?',
  options: ['A', 'B', 'C', 'D'],
  correctAnswer: 'A',
  category: 'vocabulary',
  ...overrides,
})

describe('getExplanation', () => {
  it('returns embedded explanation when available', () => {
    const q = makeQuestion({ explanation: 'Custom math explanation!' })
    expect(getExplanation(q)).toBe('Custom math explanation!')
  })

  it('returns rule-based explanation for BE verb questions', () => {
    const q = makeQuestion({
      question: 'He ___ a student.',
      options: ['is', 'are', 'am', 'be'],
      correctAnswer: 'is',
    })
    const result = getExplanation(q)
    expect(result).toContain('"Is"')
  })

  it('returns rule-based explanation for article questions', () => {
    const q = makeQuestion({
      question: 'I saw ___ orange.',
      options: ['a', 'an', 'the', 'some'],
      correctAnswer: 'an',
    })
    const result = getExplanation(q)
    expect(result).toContain('vowel')
  })

  it('returns rule-based explanation for opposite questions', () => {
    const q = makeQuestion({
      question: "What is the opposite of 'big'?",
      options: ['Small', 'Large', 'Huge', 'Tall'],
      correctAnswer: 'Small',
    })
    const result = getExplanation(q)
    expect(result).toContain('opposite')
  })

  it('returns rule-based explanation for rhyming questions', () => {
    const q = makeQuestion({
      question: "Which word rhymes with 'cat'?",
      options: ['Dog', 'Hat', 'Cup', 'Sun'],
      correctAnswer: 'Hat',
    })
    const result = getExplanation(q)
    expect(result).toContain('Rhyming')
  })

  it('returns rule-based explanation for spelling questions', () => {
    const q = makeQuestion({
      question: 'Which word is spelled correctly?',
      options: ['Skool', 'School', 'Shcool', 'Scool'],
      correctAnswer: 'School',
    })
    const result = getExplanation(q)
    expect(result).toContain('School')
  })

  it('returns fallback explanation when no rules match', () => {
    const q = makeQuestion({
      question: 'Random unmatchable question',
      options: ['X', 'Y', 'Z', 'W'],
      correctAnswer: 'X',
      category: 'unknown',
    })
    const result = getExplanation(q)
    expect(result).toContain('X')
    expect(typeof result).toBe('string')
    expect(result.length).toBeGreaterThan(0)
  })

  it('returns a string for any input', () => {
    const q = makeQuestion()
    expect(typeof getExplanation(q)).toBe('string')
  })
})

describe('getExample', () => {
  it('returns embedded example when available', () => {
    const q = makeQuestion({ example: 'Try this at home!' })
    expect(getExample(q)).toBe('Try this at home!')
  })

  it('returns a string for any input', () => {
    const q = makeQuestion()
    expect(typeof getExample(q)).toBe('string')
    expect(getExample(q).length).toBeGreaterThan(0)
  })

  it('returns fallback example when no rules match', () => {
    const q = makeQuestion({
      question: 'Random question no rules',
      options: ['P', 'Q', 'R', 'S'],
      correctAnswer: 'P',
      category: 'zzz',
    })
    const result = getExample(q)
    expect(result).toContain('P')
  })
})

describe('getPraise', () => {
  it('returns an object with text and emoji', () => {
    const result = getPraise(0)
    expect(result).toHaveProperty('text')
    expect(result).toHaveProperty('emoji')
  })

  it('returns different values for different seeds', () => {
    const results = new Set(Array.from({ length: 10 }, (_, i) => getPraise(i).text))
    expect(results.size).toBeGreaterThan(1)
  })

  it('is deterministic for same seed', () => {
    expect(getPraise(5).text).toBe(getPraise(5).text)
    expect(getPraise(99).emoji).toBe(getPraise(99).emoji)
  })

  it('handles large seed values', () => {
    const result = getPraise(999999)
    expect(result).toHaveProperty('text')
    expect(result).toHaveProperty('emoji')
  })

  it('handles negative seeds gracefully', () => {
    const result = getPraise(-3)
    expect(result).toHaveProperty('text')
  })

  it('returns valid text from praise list', () => {
    const validTexts = [
      'Brilliant!', 'Well done!', 'Super!', 'Excellent!', 'You got it!',
      'Awesome!', 'Great job!', 'Smart thinking!', 'Fantastic!', 'Way to go!',
    ]
    for (let i = 0; i < 10; i++) {
      expect(validTexts).toContain(getPraise(i).text)
    }
  })
})
