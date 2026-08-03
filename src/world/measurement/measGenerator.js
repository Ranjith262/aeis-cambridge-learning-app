/**
 * MOE P1 Measurement (length focus):
 * compare longer/shorter/taller, difference in cm, order lengths,
 * simple non-standard unit counts, choose appropriate unit language.
 */
const rand = (a, b) => Math.floor(Math.random() * (b - a + 1)) + a
const pick = (arr) => arr[Math.floor(Math.random() * arr.length)]
let seq = 0
const uid = () => `me_${Date.now().toString(36)}_${++seq}_${Math.random().toString(36).slice(2, 5)}`

const OBJECTS = ['pencil', 'ribbon', 'stick', 'book', 'rope', 'ruler', 'straw', 'leaf']
const TALL = ['tree', 'child', 'plant', 'bottle', 'tower of blocks']

function shuffle(a) {
  return [...a].sort(() => Math.random() - 0.5)
}

function opts(correct, wrongs) {
  const s = new Set([String(correct)])
  wrongs.forEach((w) => {
    if (w != null && String(w) !== String(correct)) s.add(String(w))
  })
  while (s.size < 4) s.add(String(rand(1, 50)) + (String(correct).includes('cm') ? ' cm' : ''))
  return shuffle([...s]).slice(0, 4)
}

function longer() {
  let a = rand(8, 40)
  let b = rand(5, 35)
  while (a === b) b = rand(5, 40)
  const longer = Math.max(a, b)
  const shorter = Math.min(a, b)
  const obj = pick(OBJECTS)
  return {
    id: uid(),
    skillId: 'MEAS_COMPARE',
    category: 'measurement',
    format: 'mcq',
    question: `Which is longer: a ${obj} of ${a} cm or a ${obj} of ${b} cm?`,
    options: opts(`${longer} cm`, [`${shorter} cm`, 'same', `${a + b} cm`]),
    correctAnswer: `${longer} cm`,
    explanation: `${longer} cm is longer than ${shorter} cm.`,
  }
}

function shorter() {
  let a = rand(8, 40)
  let b = rand(5, 35)
  while (a === b) b = rand(5, 40)
  const shorter = Math.min(a, b)
  const longer = Math.max(a, b)
  const obj = pick(OBJECTS)
  return {
    id: uid(),
    skillId: 'MEAS_COMPARE',
    category: 'measurement',
    format: 'mcq',
    question: `Which is shorter: ${a} cm or ${b} cm?`,
    options: opts(`${shorter} cm`, [`${longer} cm`, 'same', `${Math.abs(a - b)} cm`]),
    correctAnswer: `${shorter} cm`,
    explanation: `${shorter} cm is shorter than ${longer} cm.`,
  }
}

function difference() {
  let a = rand(15, 45)
  let b = rand(5, a - 3)
  const diff = a - b
  const obj = pick(OBJECTS)
  return {
    id: uid(),
    skillId: 'MEAS_DIFF',
    category: 'measurement',
    format: 'mcq',
    question: `A ${obj} is ${a} cm long. Another is ${b} cm long. How much longer is the first ${obj}?`,
    options: opts(`${diff} cm`, [`${diff + 1} cm`, `${a + b} cm`, `${b} cm`, `${a} cm`]),
    correctAnswer: `${diff} cm`,
    explanation: `${a} − ${b} = ${diff} cm longer.`,
  }
}

function order() {
  const x = rand(5, 15)
  const y = x + rand(3, 10)
  const z = y + rand(3, 12)
  return {
    id: uid(),
    skillId: 'MEAS_ORDER',
    category: 'measurement',
    format: 'mcq',
    question: `Order from shortest to longest: ${y} cm, ${x} cm, ${z} cm`,
    options: shuffle([
      `${x}, ${y}, ${z}`,
      `${z}, ${y}, ${x}`,
      `${y}, ${x}, ${z}`,
      `${x}, ${z}, ${y}`,
    ]),
    correctAnswer: `${x}, ${y}, ${z}`,
    explanation: `Smallest to biggest: ${x} cm, then ${y} cm, then ${z} cm.`,
  }
}

function taller() {
  let a = rand(80, 150)
  let b = rand(70, 140)
  while (a === b) b = rand(70, 150)
  const taller = Math.max(a, b)
  const obj = pick(TALL)
  return {
    id: uid(),
    skillId: 'MEAS_COMPARE',
    category: 'measurement',
    format: 'mcq',
    question: `Which is taller: ${a} cm or ${b} cm?`,
    options: opts(`${taller} cm`, [`${Math.min(a, b)} cm`, 'same', `${a + b} cm`]),
    correctAnswer: `${taller} cm`,
    explanation: `${taller} cm is taller (greater height).`,
  }
}

function paperClips() {
  // non-standard units (P1 style)
  const n = rand(3, 12)
  const obj = pick(OBJECTS)
  return {
    id: uid(),
    skillId: 'MEAS_UNIT',
    category: 'measurement',
    format: 'mcq',
    question: `A ${obj} is about ${n} paper clips long. Another ${obj} is about ${n + 2} paper clips long. Which ${obj} is longer?`,
    options: opts(`the one ${n + 2} paper clips long`, [
      `the one ${n} paper clips long`,
      'same length',
      'cannot tell',
    ]),
    correctAnswer: `the one ${n + 2} paper clips long`,
    explanation: `More paper clips means longer when the same unit is used.`,
  }
}

function sameLength() {
  const a = rand(10, 30)
  const obj = pick(OBJECTS)
  return {
    id: uid(),
    skillId: 'MEAS_COMPARE',
    category: 'measurement',
    format: 'mcq',
    question: `Two ${obj}s are both ${a} cm long. Which is longer?`,
    options: opts('same', [`${a} cm`, `${a + 1} cm`, 'cannot tell']),
    correctAnswer: 'same',
    explanation: `Both are ${a} cm — they are the same length.`,
  }
}

function saDiff() {
  const a = rand(20, 50)
  const b = rand(5, a - 4)
  return {
    id: uid(),
    skillId: 'MEAS_DIFF_SA',
    category: 'measurement',
    format: 'short_answer',
    question: `A rope is ${a} cm. A piece cut off is ${b} cm. How many cm of rope are left?`,
    correctAnswer: String(a - b),
    explanation: `${a} − ${b} = ${a - b} cm left.`,
  }
}

const FAMILIES = [longer, shorter, difference, order, taller, paperClips, sameLength, saDiff]

export function generateMeasurementQuestion() {
  return pick(FAMILIES)()
}

export function generateMeasurementSession(n = 8) {
  const out = []
  const seen = new Set()
  let g = 0
  while (out.length < n && g++ < n * 20) {
    const q = generateMeasurementQuestion()
    const key = q.question.replace(/\d+/g, '#')
    if (seen.has(key)) continue
    seen.add(key)
    out.push(q)
  }
  while (out.length < n) out.push(generateMeasurementQuestion())
  return out
}
