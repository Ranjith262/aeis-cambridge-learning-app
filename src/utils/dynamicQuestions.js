/**
 * Procedural AEIS P1 Math question generator.
 * Every call produces fresh numbers, contexts, and distractors — never a fixed set.
 */

import { shuffleArray } from './shuffle'

let _seq = 0
const uid = (prefix) => `${prefix}_${Date.now().toString(36)}_${++_seq}_${Math.random().toString(36).slice(2, 7)}`

const rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min
const pick = (arr) => arr[Math.floor(Math.random() * arr.length)]

const NAMES = ['Mei', 'Aisha', 'Tom', 'Raj', 'Siti', 'Ken', 'Nora', 'Ali', 'Emma', 'Wei']
const THINGS = ['apples', 'stars', 'stickers', 'marbles', 'pencils', 'cookies', 'shells', 'beads']
const EMOJI = ['🍎', '⭐', '🌟', '🔵', '✏️', '🍪', '🐚', '🟢']

function mcq(correct, extras, count = 4) {
  const set = new Set([String(correct)])
  for (const e of extras) {
    if (set.size >= count) break
    if (e != null && e !== correct && Number(e) >= 0) set.add(String(e))
  }
  while (set.size < count) {
    const n = Number(correct)
    const jitter = n + rand(-8, 12)
    if (jitter >= 0 && jitter !== n) set.add(String(jitter))
    else set.add(String(rand(0, 99)))
  }
  return shuffleArray([...set]).slice(0, count)
}

function explainAdd(a, b) {
  return {
    explanation: `${a} + ${b} = ${a + b}. Count on from ${a}: ${Array.from({ length: b }, (_, i) => a + i + 1).join(', ')}.`,
    example: `Make 10 if you can: think of bonds that help.`,
  }
}

function explainSub(a, b) {
  return {
    explanation: `${a} − ${b} = ${a - b}. Count back ${b} from ${a}.`,
    example: `Or think: what plus ${b} makes ${a}?`,
  }
}

/** Topic generators */
const generators = {
  numbersTo100() {
    const kind = pick(['place', 'compare', 'order', 'count', 'pattern', 'even'])
    if (kind === 'place') {
      const n = rand(10, 99)
      const tens = Math.floor(n / 10)
      const ones = n % 10
      const mode = pick(['read', 'build', 'digit'])
      if (mode === 'read') {
        const correct = `${tens} tens ${ones} ones`
        return {
          id: uid('n'),
          category: 'numbersTo100',
          format: 'mcq',
          question: `The number ${n} has ___ ten(s) and ___ ones.`,
          options: mcq(correct, [
            `${ones} tens ${tens} ones`,
            `${tens} tens 0 ones`,
            `0 tens ${n} ones`,
            `${tens + 1} tens ${ones} ones`,
          ]),
          correctAnswer: correct,
          explanation: `${n} = ${tens * 10} + ${ones}. So ${tens} tens and ${ones} ones.`,
          example: `Think of ${tens} bundles of 10 and ${ones} loose ones.`,
        }
      }
      if (mode === 'build') {
        const correct = String(tens * 10 + ones)
        return {
          id: uid('n'),
          category: 'numbersTo100',
          format: 'mcq',
          question: `What number is ${tens} tens and ${ones} ones?`,
          options: mcq(correct, [ones * 10 + tens, tens + ones, tens * 100 + ones, (tens - 1) * 10 + ones]),
          correctAnswer: correct,
          explanation: `${tens} tens = ${tens * 10}, plus ${ones} ones = ${correct}.`,
          example: `${tens * 10} + ${ones} = ${correct}.`,
        }
      }
      const digit = pick(['tens', 'ones'])
      const correct = digit === 'tens' ? String(tens) : String(ones)
      return {
        id: uid('n'),
        category: 'numbersTo100',
        format: 'mcq',
        question: `In ${n}, the digit in the ${digit} place is:`,
        options: mcq(correct, [tens, ones, n, tens + ones]),
        correctAnswer: correct,
        explanation: digit === 'tens' ? `The left digit is tens: ${tens} (worth ${tens * 10}).` : `The right digit is ones: ${ones}.`,
        example: `${n} = ${tens * 10} + ${ones}.`,
      }
    }
    if (kind === 'compare') {
      let a = rand(5, 99)
      let b = rand(5, 99)
      if (a === b) b = a + pick([-3, 3, 5, -5])
      const correct = a > b ? String(a) : String(b)
      return {
        id: uid('n'),
        category: 'numbersTo100',
        format: 'mcq',
        question: `Which number is greater: ${a} or ${b}?`,
        options: mcq(correct, [a, b, Math.min(a, b) - 1, Math.max(a, b) + 1]),
        correctAnswer: correct,
        explanation: `${Math.max(a, b)} > ${Math.min(a, b)}. Compare tens first, then ones.`,
        example: `On a number line, ${Math.max(a, b)} is further right.`,
      }
    }
    if (kind === 'order') {
      const nums = shuffleArray([rand(5, 40), rand(41, 70), rand(71, 99)]).slice(0, 3)
      const sorted = [...nums].sort((x, y) => x - y)
      const correct = sorted.join(', ')
      return {
        id: uid('n'),
        category: 'numbersTo100',
        format: 'mcq',
        question: `Arrange from smallest to greatest: ${nums.join(', ')}`,
        options: shuffleArray([
          correct,
          [...sorted].reverse().join(', '),
          [sorted[1], sorted[0], sorted[2]].join(', '),
          [sorted[0], sorted[2], sorted[1]].join(', '),
        ]),
        correctAnswer: correct,
        explanation: `Smallest to greatest: ${correct}.`,
        example: `Compare tens, then ones.`,
      }
    }
    if (kind === 'pattern') {
      const step = pick([2, 5, 10, 3])
      const start = rand(1, 20)
      const seq = [start, start + step, start + 2 * step, start + 3 * step]
      const next = start + 4 * step
      return {
        id: uid('n'),
        category: 'numbersTo100',
        format: 'mcq',
        question: `What comes next? ${seq.join(', ')}, ___`,
        options: mcq(next, [next + step, next - 1, next + 1, start + 5 * step]),
        correctAnswer: String(next),
        explanation: `The pattern adds ${step} each time. ${seq[3]} + ${step} = ${next}.`,
        example: `Skip count by ${step}.`,
      }
    }
    if (kind === 'even') {
      const n = rand(2, 30)
      const even = n % 2 === 0
      const correct = even ? String(n) : String(n + 1)
      const opts = even ? [n, n + 1, n + 3, n - 1] : [n + 1, n, n + 2, n + 4]
      return {
        id: uid('n'),
        category: 'numbersTo100',
        format: 'mcq',
        question: even ? `Which number is even?` : `Which number is even?`,
        options: mcq(correct, opts),
        correctAnswer: correct,
        explanation: `Even numbers end in 0, 2, 4, 6, or 8.`,
        example: `You can share an even number into two equal groups.`,
      }
    }
    // count with emoji
    const count = rand(4, 12)
    const em = pick(EMOJI)
    return {
      id: uid('n'),
      category: 'numbersTo100',
      format: 'mcq',
      question: `Count: ${em.repeat(count)}`,
      options: mcq(count, [count - 1, count + 1, count + 2, count - 2]),
      correctAnswer: String(count),
      explanation: `Count one by one: there are ${count}.`,
      example: `Touch each picture as you say a number.`,
    }
  },

  addition() {
    const mode = pick(['basic', 'make10', 'word', 'double', 'sa'])
    if (mode === 'double') {
      const a = rand(1, 9)
      const correct = a + a
      return {
        id: uid('a'),
        category: 'addition',
        format: 'mcq',
        question: `${a} + ${a} = ?`,
        options: mcq(correct, [correct + 1, correct - 1, a, a * 3]),
        correctAnswer: String(correct),
        ...explainAdd(a, a),
        explanation: `Double ${a}: ${a} + ${a} = ${correct}.`,
        example: `Two equal groups of ${a}.`,
      }
    }
    let a = rand(1, 20)
    let b = rand(1, 20)
    if (mode === 'make10') {
      a = rand(5, 9)
      b = rand(3, 12)
    }
    if (a + b > 100) b = rand(1, 100 - a)
    const correct = a + b
    if (mode === 'sa' || Math.random() < 0.2) {
      return {
        id: uid('a'),
        category: 'addition',
        format: 'short_answer',
        question: `${a} + ${b} = ?`,
        correctAnswer: String(correct),
        ...explainAdd(a, b),
      }
    }
    if (mode === 'word') {
      const name = pick(NAMES)
      const thing = pick(THINGS)
      return {
        id: uid('a'),
        category: 'addition',
        format: 'mcq',
        question: `${name} has ${a} ${thing}. Then ${name} gets ${b} more. How many now?`,
        options: mcq(correct, [correct + 1, correct - 1, a, b, Math.abs(a - b)]),
        correctAnswer: String(correct),
        explanation: `${a} + ${b} = ${correct}.`,
        example: `Join the two groups and count all.`,
      }
    }
    return {
      id: uid('a'),
      category: 'addition',
      format: 'mcq',
      question: `${a} + ${b} = ?`,
      options: mcq(correct, [correct + 1, correct - 1, a + b + 10, Math.abs(a - b)]),
      correctAnswer: String(correct),
      ...explainAdd(a, b),
    }
  },

  subtraction() {
    let a = rand(5, 40)
    let b = rand(1, a)
    const correct = a - b
    const mode = pick(['basic', 'word', 'sa'])
    if (mode === 'sa' || Math.random() < 0.2) {
      return {
        id: uid('s'),
        category: 'subtraction',
        format: 'short_answer',
        question: `${a} − ${b} = ?`,
        correctAnswer: String(correct),
        ...explainSub(a, b),
      }
    }
    if (mode === 'word') {
      const name = pick(NAMES)
      const thing = pick(THINGS)
      return {
        id: uid('s'),
        category: 'subtraction',
        format: 'mcq',
        question: `${name} has ${a} ${thing} and gives away ${b}. How many left?`,
        options: mcq(correct, [correct + 1, correct - 1, a + b, b]),
        correctAnswer: String(correct),
        ...explainSub(a, b),
      }
    }
    return {
      id: uid('s'),
      category: 'subtraction',
      format: 'mcq',
      question: `${a} − ${b} = ?`,
      options: mcq(correct, [correct + 1, correct - 1, a + b, b]),
      correctAnswer: String(correct),
      ...explainSub(a, b),
    }
  },

  numberBonds() {
    const whole = pick([10, 10, 10, 20, 5, 8])
    const part = rand(0, whole)
    const other = whole - part
    const mode = pick(['missing', 'pair', 'sa'])
    if (mode === 'sa') {
      return {
        id: uid('nb'),
        category: 'numberBonds',
        format: 'short_answer',
        question: `${part} + ___ = ${whole}`,
        correctAnswer: String(other),
        explanation: `${part} + ${other} = ${whole}. They are number bonds of ${whole}.`,
        example: `What do you add to ${part} to make ${whole}?`,
      }
    }
    if (mode === 'pair') {
      const correct = `${part} + ${other}`
      return {
        id: uid('nb'),
        category: 'numberBonds',
        format: 'mcq',
        question: `Which pair makes ${whole}?`,
        options: shuffleArray([
          correct,
          `${part} + ${other + 1}`,
          `${part + 1} + ${other}`,
          `${Math.max(0, part - 1)} + ${other}`,
        ]),
        correctAnswer: correct,
        explanation: `${part} + ${other} = ${whole}.`,
        example: `Bonds of ${whole} are friends that join to ${whole}.`,
      }
    }
    return {
      id: uid('nb'),
      category: 'numberBonds',
      format: 'mcq',
      question: `${part} + ___ = ${whole}`,
      options: mcq(other, [other + 1, other - 1, whole, part]),
      correctAnswer: String(other),
      explanation: `${part} + ${other} = ${whole}.`,
      example: `Ten-frame: fill to ${whole}.`,
    }
  },

  shapesAndPatterns() {
    const shapes = [
      { name: 'triangle', sides: 3 },
      { name: 'square', sides: 4 },
      { name: 'rectangle', sides: 4 },
      { name: 'pentagon', sides: 5 },
      { name: 'hexagon', sides: 6 },
    ]
    const s = pick(shapes)
    if (Math.random() < 0.5) {
      return {
        id: uid('sh'),
        category: 'shapesAndPatterns',
        format: 'mcq',
        question: `How many sides does a ${s.name} have?`,
        options: mcq(s.sides, [s.sides + 1, s.sides - 1, 4, 3]),
        correctAnswer: String(s.sides),
        explanation: `A ${s.name} has ${s.sides} sides.`,
        example: `Count each side carefully once.`,
      }
    }
    const pattern = pick([
      ['🔺', '⬛', '🔺', '⬛', '🔺'],
      ['⬤', '⬤', '⭐', '⬤', '⬤'],
      ['🟦', '🟨', '🟦', '🟨', '🟦'],
    ])
    const next = pattern[0] === pattern[2] ? pattern[1] : pattern[2]
    return {
      id: uid('sh'),
      category: 'shapesAndPatterns',
      format: 'mcq',
      question: `What comes next? ${pattern.join(' ')} ___`,
      options: shuffleArray([next, '⭐', '🔺', '⬛']).slice(0, 4),
      correctAnswer: next,
      explanation: `Look at the repeating pattern to find what comes next.`,
      example: `Say the pattern out loud.`,
    }
  },

  measurement() {
    const a = rand(5, 30)
    const b = rand(5, 30)
    if (a === b) return generators.measurement()
    const longer = Math.max(a, b)
    return {
      id: uid('m'),
      category: 'measurement',
      format: 'mcq',
      question: `Which is longer: ${a} cm or ${b} cm?`,
      options: mcq(`${longer} cm`, [`${Math.min(a, b)} cm`, `${a + b} cm`, `${Math.abs(a - b)} cm`]),
      correctAnswer: `${longer} cm`,
      explanation: `${longer} cm is longer than ${Math.min(a, b)} cm.`,
      example: `The bigger number of cm means longer.`,
    }
  },

  time() {
    // Defer to richer MOE-aligned patterns (inline subset for all-topic mix)
    const h = rand(1, 12)
    const kind = pick(['hands', 'half', 'duration', 'ampm', 'five', 'later'])
    if (kind === 'half') {
      const hh = h === 12 ? 1 : h
      const correct = `${hh}:30`
      return {
        id: uid('t'),
        category: 'time',
        format: 'mcq',
        question: `Half past ${hh} matches which digital time?`,
        options: mcq(correct, [`${hh}:00`, `${hh === 12 ? 1 : hh + 1}:00`, `${hh}:15`]),
        correctAnswer: correct,
        explanation: `Half past ${hh} is ${hh}:30. Long hand on 6.`,
      }
    }
    if (kind === 'duration') {
      const hh = rand(1, 9)
      return {
        id: uid('t'),
        category: 'time',
        format: 'mcq',
        question: `A lesson starts at ${hh}:00 and ends at ${hh}:30. How long is it?`,
        options: mcq('30 minutes', ['1 hour', '15 minutes', '2 hours']),
        correctAnswer: '30 minutes',
        explanation: `From ${hh}:00 to ${hh}:30 is 30 minutes (half an hour).`,
      }
    }
    if (kind === 'ampm') {
      const correct = pick(['a.m.', 'p.m.'])
      const q = correct === 'a.m.'
        ? 'Is breakfast time usually a.m. or p.m.?'
        : 'Is bedtime at night usually a.m. or p.m.?'
      return {
        id: uid('t'),
        category: 'time',
        format: 'mcq',
        question: q,
        options: mcq(correct, ['a.m.', 'p.m.', 'noon only', 'never']),
        correctAnswer: correct,
        explanation: correct === 'a.m.' ? 'Morning times use a.m.' : 'Afternoon and evening use p.m.',
      }
    }
    if (kind === 'five') {
      const hh = rand(1, 11)
      const m = pick([5, 10, 15, 20, 25, 35, 40, 45])
      const hand = m / 5
      const correct = `${hh}:${String(m).padStart(2, '0')}`
      return {
        id: uid('t'),
        category: 'time',
        format: 'mcq',
        question: `Long hand on ${hand === 0 ? 12 : hand}, short hand near ${hh}. What time?`,
        options: mcq(correct, [`${hh}:00`, `${hh}:30`, `${hh}:${String(m + 5).padStart(2, '0')}`]),
        correctAnswer: correct,
        explanation: `Long hand shows minutes: ${m}. Time is ${correct}.`,
      }
    }
    if (kind === 'later') {
      const hh = rand(1, 10)
      const correct = `${hh === 12 ? 1 : hh + 1}:00`
      return {
        id: uid('t'),
        category: 'time',
        format: 'mcq',
        question: `It is ${hh}:00. What time is it in 1 hour?`,
        options: mcq(correct, [`${hh}:30`, `${hh}:00`, `${hh}:15`]),
        correctAnswer: correct,
        explanation: `${hh}:00 plus 1 hour is ${correct}.`,
      }
    }
    // hands
    const hh = h > 12 ? 1 : h
    return {
      id: uid('t'),
      category: 'time',
      format: 'mcq',
      question: `Short hand on ${hh}, long hand on 12. What time is it?`,
      options: mcq(`${hh}:00`, [`${hh}:30`, `${hh === 12 ? 1 : hh + 1}:00`, `${hh}:15`]),
      correctAnswer: `${hh}:00`,
      explanation: `Long hand on 12 means o'clock → ${hh}:00.`,
    }
  }

  money() {
    const coins = [5, 10, 20, 50]
    const c1 = pick(coins)
    const c2 = pick(coins)
    const total = c1 + c2
    const mode = pick(['sum', 'sa', 'word'])
    if (mode === 'sa') {
      return {
        id: uid('mo'),
        category: 'money',
        format: 'short_answer',
        question: `How many cents: ${c1}¢ + ${c2}¢ = ?`,
        correctAnswer: String(total),
        explanation: `${c1} + ${c2} = ${total} cents.`,
        example: `Group coins, then count the total.`,
      }
    }
    if (mode === 'word') {
      const name = pick(NAMES)
      return {
        id: uid('mo'),
        category: 'money',
        format: 'mcq',
        question: `${name} pays with ${c1}¢ and ${c2}¢. How much is that in all?`,
        options: mcq(`${total}¢`, [`${c1}¢`, `${c2}¢`, `${total + 10}¢`, `${Math.abs(c1 - c2)}¢`]),
        correctAnswer: `${total}¢`,
        explanation: `${c1} + ${c2} = ${total} cents.`,
        example: `Add the coin values.`,
      }
    }
    return {
      id: uid('mo'),
      category: 'money',
      format: 'mcq',
      question: `${c1}¢ + ${c2}¢ = ?`,
      options: mcq(`${total}¢`, [`${total + 5}¢`, `${total - 5}¢`, `${c1}¢`, `${c2 * 2}¢`]),
      correctAnswer: `${total}¢`,
      explanation: `${c1} + ${c2} = ${total} cents.`,
      example: `100 cents = $1.`,
    }
  },

  wordProblems() {
    const name = pick(NAMES)
    const thing = pick(THINGS)
    const op = pick(['add', 'sub'])
    if (op === 'add') {
      const a = rand(3, 25)
      const b = rand(2, 20)
      const correct = a + b
      return {
        id: uid('w'),
        category: 'wordProblems',
        format: pick(['mcq', 'short_answer']),
        question: `${name} collects ${a} ${thing} in the morning and ${b} in the afternoon. How many ${thing} in total?`,
        options: mcq(correct, [correct + 1, correct - 1, a, b]),
        correctAnswer: String(correct),
        explanation: `This is addition: ${a} + ${b} = ${correct}.`,
        example: `Draw a bar model with two parts.`,
      }
    }
    const a = rand(10, 40)
    const b = rand(1, a - 1)
    const correct = a - b
    return {
      id: uid('w'),
      category: 'wordProblems',
      format: pick(['mcq', 'short_answer']),
      question: `${name} has ${a} ${thing}. ${name} uses ${b}. How many are left?`,
      options: mcq(correct, [correct + 1, a + b, b, a]),
      correctAnswer: String(correct),
      explanation: `This is subtraction: ${a} − ${b} = ${correct}.`,
      example: `Start with the whole, take away a part.`,
    }
  },

  pictureGraphs() {
    const a = rand(2, 8)
    const b = rand(2, 8)
    const c = rand(2, 8)
    const labels = pick([
      ['🍎', '🍊', '🍇'],
      ['⚽', '🏀', '🎾'],
      ['🐶', '🐱', '🐰'],
    ])
    const most = Math.max(a, b, c)
    const mostLabel = most === a ? labels[0] : most === b ? labels[1] : labels[2]
    const mode = pick(['most', 'total', 'diff'])
    if (mode === 'total') {
      const total = a + b + c
      return {
        id: uid('pg'),
        category: 'pictureGraphs',
        format: 'mcq',
        question: `${labels[0].repeat(a)} ${labels[1].repeat(b)} ${labels[2].repeat(c)} — How many in total?`,
        options: mcq(total, [total + 1, total - 1, a + b, most]),
        correctAnswer: String(total),
        explanation: `${a} + ${b} + ${c} = ${total}.`,
        example: `Add each group.`,
      }
    }
    if (mode === 'diff') {
      const diff = Math.abs(a - b)
      return {
        id: uid('pg'),
        category: 'pictureGraphs',
        format: 'mcq',
        question: `${labels[0].repeat(a)} ${labels[1].repeat(b)} — How many more ${a >= b ? labels[0] : labels[1]} than ${a >= b ? labels[1] : labels[0]}?`,
        options: mcq(diff, [diff + 1, a + b, a, b]),
        correctAnswer: String(diff),
        explanation: `Difference: ${Math.max(a, b)} − ${Math.min(a, b)} = ${diff}.`,
        example: `Compare the two rows.`,
      }
    }
    return {
      id: uid('pg'),
      category: 'pictureGraphs',
      format: 'mcq',
      question: `${labels[0].repeat(a)} ${labels[1].repeat(b)} ${labels[2].repeat(c)} — Which has the MOST?`,
      options: shuffleArray([labels[0], labels[1], labels[2], 'Same']).slice(0, 4),
      correctAnswer: mostLabel,
      explanation: `Counts: ${labels[0]}=${a}, ${labels[1]}=${b}, ${labels[2]}=${c}. Most is ${mostLabel}.`,
      example: `Count each picture group.`,
    }
  },
}

export const DYNAMIC_TOPICS = Object.keys(generators)

/**
 * Generate a fresh batch of questions for a topic (or mixed).
 * @param {string} topicId - category id or 'all'
 * @param {number} count
 */
export function generateQuestions(topicId = 'all', count = 12) {
  const topics =
    topicId === 'all' || !generators[topicId]
      ? DYNAMIC_TOPICS
      : [topicId]

  const out = []
  for (let i = 0; i < count; i++) {
    const t = topics[i % topics.length]
    try {
      const q = generators[t]()
      if (q.format === 'short_answer') {
        delete q.options
      } else if (q.options) {
        q.options = shuffleArray(q.options.map(String))
      }
      q.subject = 'math'
      q.generated = true
      out.push(q)
    } catch {
      // skip rare generator edge cases
    }
  }
  return shuffleArray(out)
}

/**
 * Infinite session: generate next N on demand
 */
export function generateOne(topicId = 'all') {
  const list = generateQuestions(topicId, 1)
  return list[0] || generateQuestions('addition', 1)[0]
}
