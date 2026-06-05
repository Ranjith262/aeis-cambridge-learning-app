import { describe, it, expect } from 'vitest'
import { allQuestions, categories, getQuestionsByCategory, getTotalQuestionCount } from '../data/questions'
import {
  allMathQuestions,
  mathCategories,
  getMathQuestionsByCategory,
  getTotalMathQuestionCount,
} from '../data/mathQuestions'

describe('English questions data', () => {
  it('has questions in the allQuestions array', () => {
    expect(allQuestions.length).toBeGreaterThan(0)
  })

  it('reports total count correctly', () => {
    expect(getTotalQuestionCount()).toBe(allQuestions.length)
  })

  it('every question has required fields', () => {
    allQuestions.forEach((q) => {
      expect(q).toHaveProperty('id')
      expect(q).toHaveProperty('question')
      expect(q).toHaveProperty('options')
      expect(q).toHaveProperty('correctAnswer')
      expect(q).toHaveProperty('category')
    })
  })

  it('every question has 4 options', () => {
    allQuestions.forEach((q) => {
      expect(q.options).toHaveLength(4)
    })
  })

  it('correctAnswer is always in the options array', () => {
    allQuestions.forEach((q) => {
      expect(q.options).toContain(q.correctAnswer)
    })
  })

  it('question IDs are unique', () => {
    const ids = allQuestions.map((q) => q.id)
    const unique = new Set(ids)
    expect(unique.size).toBe(ids.length)
  })

  it('all questions have non-empty question text', () => {
    allQuestions.forEach((q) => {
      expect(q.question.trim().length).toBeGreaterThan(0)
    })
  })

  it('categories array has the required structure', () => {
    expect(categories.length).toBeGreaterThan(0)
    categories.forEach((cat) => {
      expect(cat).toHaveProperty('id')
      expect(cat).toHaveProperty('name')
      expect(cat).toHaveProperty('icon')
      expect(cat).toHaveProperty('color')
      expect(cat).toHaveProperty('count')
    })
  })

  it('getQuestionsByCategory returns questions for valid category', () => {
    const result = getQuestionsByCategory('vocabulary')
    expect(Array.isArray(result)).toBe(true)
    expect(result.length).toBeGreaterThan(0)
  })

  it('getQuestionsByCategory returns empty array for invalid category', () => {
    const result = getQuestionsByCategory('nonexistent_category')
    expect(result).toEqual([])
  })

  it('category counts match actual question counts', () => {
    categories.forEach((cat) => {
      const actual = getQuestionsByCategory(cat.id)
      expect(actual.length).toBe(cat.count)
    })
  })
})

describe('Math questions data', () => {
  it('has questions in the allMathQuestions array', () => {
    expect(allMathQuestions.length).toBeGreaterThan(0)
  })

  it('reports total count correctly', () => {
    expect(getTotalMathQuestionCount()).toBe(allMathQuestions.length)
  })

  it('every math question has required fields', () => {
    allMathQuestions.forEach((q) => {
      expect(q).toHaveProperty('id')
      expect(q).toHaveProperty('question')
      expect(q).toHaveProperty('options')
      expect(q).toHaveProperty('correctAnswer')
      expect(q).toHaveProperty('category')
      expect(q).toHaveProperty('subject')
    })
  })

  it('every math question has subject "math"', () => {
    allMathQuestions.forEach((q) => {
      expect(q.subject).toBe('math')
    })
  })

  it('every math question has explanation and example', () => {
    allMathQuestions.forEach((q) => {
      expect(q).toHaveProperty('explanation')
      expect(q).toHaveProperty('example')
      expect(q.explanation.trim().length).toBeGreaterThan(0)
      expect(q.example.trim().length).toBeGreaterThan(0)
    })
  })

  it('correctAnswer is always in options for math questions', () => {
    allMathQuestions.forEach((q) => {
      expect(q.options).toContain(q.correctAnswer)
    })
  })

  it('math question IDs are unique within each category', () => {
    mathCategories.forEach((cat) => {
      const qs = getMathQuestionsByCategory(cat.id)
      const ids = qs.map((q) => q.id)
      const unique = new Set(ids)
      expect(unique.size).toBe(ids.length)
    })
  })

  it('mathCategories array has correct structure', () => {
    expect(mathCategories.length).toBe(10)
    mathCategories.forEach((cat) => {
      expect(cat).toHaveProperty('id')
      expect(cat).toHaveProperty('name')
      expect(cat).toHaveProperty('icon')
      expect(cat).toHaveProperty('color')
      expect(cat).toHaveProperty('count')
    })
  })

  it('getMathQuestionsByCategory returns questions for valid category', () => {
    const result = getMathQuestionsByCategory('addition')
    expect(Array.isArray(result)).toBe(true)
    expect(result.length).toBeGreaterThan(0)
  })

  it('getMathQuestionsByCategory returns empty array for invalid category', () => {
    const result = getMathQuestionsByCategory('nonexistent')
    expect(result).toEqual([])
  })

  it('all math questions have 4 options', () => {
    allMathQuestions.forEach((q) => {
      expect(q.options.length).toBeGreaterThanOrEqual(2)
    })
  })
})
