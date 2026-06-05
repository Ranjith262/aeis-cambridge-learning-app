/**
 * Fisher-Yates (Knuth) shuffle algorithm.
 * Creates a copy first to maintain immutability.
 * @param {Array} array
 * @returns {Array} shuffled copy
 */
export function shuffleArray(array) {
  const arr = [...array]
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}

/**
 * Shuffles the options within a single question.
 * correctAnswer string stays the same (matched by value, not index).
 * @param {Object} question
 * @returns {Object} new question object with shuffled options
 */
export function shuffleOptions(question) {
  return {
    ...question,
    options: shuffleArray(question.options),
  }
}

/**
 * Shuffles questions order AND options within each question.
 * Called once on quiz mount.
 * @param {Array} questions
 * @returns {Array} fully shuffled questions
 */
export function shuffleQuestions(questions) {
  const shuffled = shuffleArray(questions)
  return shuffled.map(shuffleOptions)
}
