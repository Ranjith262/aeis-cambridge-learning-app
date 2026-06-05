/**
 * Smart explanation engine for AEIS Cambridge Learning App.
 * Rule-based pattern matching with priority ordering.
 * Priority: embedded fields > rule engine > generic fallback
 */

const PRAISE = [
  { text: 'Brilliant!', emoji: '🌟' },
  { text: 'Well done!', emoji: '🎉' },
  { text: 'Super!', emoji: '✨' },
  { text: 'Excellent!', emoji: '🚀' },
  { text: 'You got it!', emoji: '💯' },
  { text: 'Awesome!', emoji: '🌈' },
  { text: 'Great job!', emoji: '👏' },
  { text: 'Smart thinking!', emoji: '🧠' },
  { text: 'Fantastic!', emoji: '⭐' },
  { text: 'Way to go!', emoji: '🏆' },
]

/**
 * Get deterministic praise for a question based on position and ID.
 * @param {number} seed
 * @returns {{ text: string, emoji: string }}
 */
export function getPraise(seed) {
  return PRAISE[Math.abs(seed) % PRAISE.length]
}

// Rule definitions — first match wins
const RULES = [
  // BE verbs
  {
    test: (q) => {
      const opts = q.options.join(' ').toLowerCase()
      return /\b(is|are|am)\b/.test(opts) && /\b(is|are|am)\b/.test(q.correctAnswer.toLowerCase())
    },
    build: (q) => ({
      explain: `"Is" is for one person or thing. "Are" is for more than one. "Am" goes with "I".`,
      example: `👉 "She is happy." "They are friends." "I am ready."`,
    }),
  },
  // Verb agreement (walks vs walk)
  {
    test: (q) => {
      const qText = q.question.toLowerCase()
      return (
        qText.includes('___') &&
        q.options.some((o) => o.endsWith('s')) &&
        q.options.some((o) => !o.endsWith('s'))
      )
    },
    build: (q) => ({
      explain: `Add "-s" to the verb when talking about one person (he, she, it).`,
      example: `👉 "She ${q.correctAnswer}." "They ${q.correctAnswer.replace(/s$/, '')}."`,
    }),
  },
  // Articles a/an/the
  {
    test: (q) => {
      const opts = q.options.map((o) => o.toLowerCase())
      return opts.some((o) => ['a', 'an', 'the'].includes(o))
    },
    build: (q) => {
      const ans = q.correctAnswer.toLowerCase()
      if (ans === 'an') {
        return {
          explain: `Use "an" before words that start with a vowel sound (a, e, i, o, u).`,
          example: `👉 "an apple", "an elephant", "an umbrella"`,
        }
      }
      if (ans === 'a') {
        return {
          explain: `Use "a" before words that start with a consonant sound.`,
          example: `👉 "a cat", "a ball", "a dog"`,
        }
      }
      return {
        explain: `Use "the" when talking about a specific thing both speaker and listener know.`,
        example: `👉 "Please close the door." "The sun is bright."`,
      }
    },
  },
  // Prepositions
  {
    test: (q) => {
      const opts = q.options.map((o) => o.toLowerCase())
      const preps = ['in', 'on', 'at', 'under', 'behind', 'between', 'above', 'below', 'by', 'over']
      return opts.some((o) => preps.includes(o))
    },
    build: (q) => ({
      explain: `"${q.correctAnswer}" tells us WHERE something is located.`,
      example: `👉 The book is ${q.correctAnswer} the table.`,
    }),
  },
  // Question words
  {
    test: (q) => {
      const opts = q.options.map((o) => o.toLowerCase())
      return opts.some((o) => ['what', 'where', 'when', 'who', 'why', 'how'].includes(o))
    },
    build: (q) => {
      const map = {
        what: 'things or actions',
        where: 'places',
        when: 'time',
        who: 'people',
        why: 'reasons',
        how: 'the way something is done',
      }
      const ans = q.correctAnswer.toLowerCase()
      return {
        explain: `"${q.correctAnswer}" asks about ${map[ans] || 'something specific'}.`,
        example: `👉 "${q.correctAnswer} is your name?" — asking about a person or thing!`,
      }
    },
  },
  // Do/Does
  {
    test: (q) => {
      const opts = q.options.map((o) => o.toLowerCase())
      return opts.includes('do') && opts.includes('does')
    },
    build: (q) => ({
      explain: `Use "does" with he, she, or it. Use "do" with I, you, we, or they.`,
      example: `👉 "She ${q.correctAnswer} her homework." "They do their homework."`,
    }),
  },
  // Have/Has
  {
    test: (q) => {
      const opts = q.options.map((o) => o.toLowerCase())
      return opts.includes('have') && opts.includes('has')
    },
    build: (q) => ({
      explain: `Use "has" with he, she, or it. Use "have" with I, you, we, or they.`,
      example: `👉 "She has a cat." "They have a dog."`,
    }),
  },
  // Opposites
  {
    test: (q) => /opposite/i.test(q.question),
    build: (q) => ({
      explain: `The opposite of a word means the complete reverse!`,
      example: `👉 The answer "${q.correctAnswer}" is the opposite here. Try to use both words in a sentence!`,
    }),
  },
  // Rhyming
  {
    test: (q) => /rhym/i.test(q.question),
    build: (q) => ({
      explain: `Rhyming words end with the same sound!`,
      example: `👉 "${q.correctAnswer}" ends with the same sound. Try singing them: they sound the same at the end!`,
    }),
  },
  // Spelling
  {
    test: (q) => /spell|correct spelling/i.test(q.question),
    build: (q) => ({
      explain: `"${q.correctAnswer}" is the correct spelling. Look at each letter carefully!`,
      example: `👉 Remember: "${q.correctAnswer}". Try writing it three times to remember!`,
    }),
  },
  // Math counting
  {
    test: (q) => q.category === 'counting' || /how many|count/i.test(q.question),
    build: (q) => ({
      explain: `Count each item one by one. The answer is ${q.correctAnswer}!`,
      example: `👉 Point to each one and count out loud: 1, 2, 3...`,
    }),
  },
  // Math addition
  {
    test: (q) => {
      return (
        q.category === 'addition' ||
        /\+|plus|altogether|total/i.test(q.question)
      )
    },
    build: (q) => ({
      explain: `Addition means putting numbers together to make a bigger number. The answer is ${q.correctAnswer}!`,
      example: `👉 Use your fingers or draw dots to count on!`,
    }),
  },
  // Math subtraction
  {
    test: (q) => {
      return (
        q.category === 'subtraction' ||
        /−|-|minus|subtract|take away/i.test(q.question)
      )
    },
    build: (q) => ({
      explain: `Subtraction means taking away to get a smaller number. The answer is ${q.correctAnswer}!`,
      example: `👉 Count down from the bigger number!`,
    }),
  },
  // Colours
  {
    test: (q) => /colou?r/i.test(q.question),
    build: (q) => ({
      explain: `"${q.correctAnswer}" is the correct colour here!`,
      example: `👉 Look around you — can you find something that colour right now?`,
    }),
  },
  // Animals
  {
    test: (q) => /animal|dog|cat|bird|fish|lion|tiger|elephant|rabbit|cow|horse/i.test(q.question),
    build: (q) => ({
      explain: `The answer is "${q.correctAnswer}".`,
      example: `👉 Think about where this animal lives and what it eats!`,
    }),
  },
  // Body parts
  {
    test: (q) => /eye|ear|nose|mouth|hand|foot|feet|leg|arm|head/i.test(q.question),
    build: (q) => ({
      explain: `"${q.correctAnswer}" is the body part that helps with this!`,
      example: `👉 Point to your ${q.correctAnswer.toLowerCase()} right now!`,
    }),
  },
  // Generic fill-in-blank
  {
    test: (q) => q.question.includes('___'),
    build: (q) => ({
      explain: `"${q.correctAnswer}" fits perfectly in the blank to complete the sentence.`,
      example: `👉 Read the sentence aloud with "${q.correctAnswer}" in the gap!`,
    }),
  },
]

/**
 * Get explanation for a question using priority rules.
 * @param {Object} question
 * @returns {string}
 */
export function getExplanation(question) {
  // Priority 1: embedded explanation
  if (question.explanation) return question.explanation

  // Priority 2: rule engine
  for (const rule of RULES) {
    if (rule.test(question)) {
      return rule.build(question).explain
    }
  }

  // Fallback
  return `The answer is "${question.correctAnswer}". Read the question again — you'll see how it fits!`
}

/**
 * Get example for a question.
 * @param {Object} question
 * @returns {string}
 */
export function getExample(question) {
  // Priority 1: embedded example
  if (question.example) return question.example

  // Priority 2: rule engine
  for (const rule of RULES) {
    if (rule.test(question)) {
      return rule.build(question).example
    }
  }

  // Fallback
  return `Try using "${question.correctAnswer}" in your own sentence today!`
}
