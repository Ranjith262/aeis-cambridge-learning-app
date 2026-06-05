import { describe, it, expect } from 'vitest'
import { shuffleArray, shuffleOptions, shuffleQuestions } from '../utils/shuffle'

describe('shuffleArray', () => {
  it('returns an array of the same length', () => {
    const input = [1, 2, 3, 4, 5]
    const result = shuffleArray(input)
    expect(result).toHaveLength(input.length)
  })

  it('contains all the same elements', () => {
    const input = ['a', 'b', 'c', 'd']
    const result = shuffleArray(input)
    expect(result.sort()).toEqual(input.sort())
  })

  it('does not mutate the original array', () => {
    const input = [1, 2, 3]
    const original = [...input]
    shuffleArray(input)
    expect(input).toEqual(original)
  })

  it('handles an empty array', () => {
    expect(shuffleArray([])).toEqual([])
  })

  it('handles a single element array', () => {
    expect(shuffleArray([42])).toEqual([42])
  })

  it('returns different ordering over multiple runs (probabilistic)', () => {
    const input = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    const results = new Set(Array.from({ length: 20 }, () => shuffleArray(input).join(',')))
    // Very unlikely all 20 shuffles produce the same order
    expect(results.size).toBeGreaterThan(1)
  })
})

describe('shuffleOptions', () => {
  const mockQuestion = {
    id: 'q1',
    question: 'What is 1 + 1?',
    options: ['1', '2', '3', '4'],
    correctAnswer: '2',
  }

  it('returns a new question object', () => {
    const result = shuffleOptions(mockQuestion)
    expect(result).not.toBe(mockQuestion)
  })

  it('preserves all question fields except options order', () => {
    const result = shuffleOptions(mockQuestion)
    expect(result.id).toBe(mockQuestion.id)
    expect(result.question).toBe(mockQuestion.question)
    expect(result.correctAnswer).toBe(mockQuestion.correctAnswer)
  })

  it('keeps all original options (same elements)', () => {
    const result = shuffleOptions(mockQuestion)
    expect(result.options.sort()).toEqual(mockQuestion.options.sort())
  })

  it('does not change the correctAnswer value', () => {
    const result = shuffleOptions(mockQuestion)
    expect(result.options).toContain(result.correctAnswer)
    expect(result.correctAnswer).toBe('2')
  })
})

describe('shuffleQuestions', () => {
  const mockQuestions = [
    { id: 'q1', question: 'Q1', options: ['A', 'B', 'C', 'D'], correctAnswer: 'A' },
    { id: 'q2', question: 'Q2', options: ['W', 'X', 'Y', 'Z'], correctAnswer: 'X' },
    { id: 'q3', question: 'Q3', options: ['P', 'Q', 'R', 'S'], correctAnswer: 'Q' },
  ]

  it('returns the same number of questions', () => {
    const result = shuffleQuestions(mockQuestions)
    expect(result).toHaveLength(mockQuestions.length)
  })

  it('preserves all question IDs', () => {
    const result = shuffleQuestions(mockQuestions)
    const ids = result.map((q) => q.id).sort()
    const originalIds = mockQuestions.map((q) => q.id).sort()
    expect(ids).toEqual(originalIds)
  })

  it('correct answers remain correct after shuffling options', () => {
    const result = shuffleQuestions(mockQuestions)
    result.forEach((q) => {
      expect(q.options).toContain(q.correctAnswer)
    })
  })

  it('does not mutate original questions array', () => {
    const original = JSON.stringify(mockQuestions)
    shuffleQuestions(mockQuestions)
    expect(JSON.stringify(mockQuestions)).toBe(original)
  })
})
