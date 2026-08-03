/**
 * MOE P1 Addition: within 10, within 20, within 100 (simple), make-ten, doubles,
 * word problems, missing addend — varied stems, proper distractors.
 */
const rand = (a, b) => Math.floor(Math.random() * (b - a + 1)) + a
const pick = (arr) => arr[Math.floor(Math.random() * arr.length)]
const NAMES = ['Mei', 'Aisha', 'Tom', 'Raj', 'Siti', 'Ken', 'Nora']
const THINGS = ['apples', 'stickers', 'marbles', 'stars', 'pencils', 'shells']
let seq = 0
const uid = () => `add_${Date.now().toString(36)}_${++seq}_${Math.random().toString(36).slice(2, 5)}`

function shuffle(a) {
  return [...a].sort(() => Math.random() - 0.5)
}
function opts(c, extras) {
  const s = new Set([String(c)])
  extras.forEach((e) => {
    if (e != null && Number(e) >= 0 && String(e) !== String(c)) s.add(String(e))
  })
  while (s.size < 4) s.add(String(Math.max(0, Number(c) + rand(-5, 8))))
  return shuffle([...s]).slice(0, 4)
}

function basic(max = 20) {
  const a = rand(1, max - 1)
  const b = rand(1, max - a)
  const sum = a + b
  return {
    id: uid(), skillId: 'ADD_BASIC', category: 'addition', format: 'mcq',
    question: `${a} + ${b} = ?`,
    options: opts(sum, [sum + 1, sum - 1, Math.abs(a - b), a + b + 10]),
    correctAnswer: String(sum),
    explanation: `${a} + ${b} = ${sum}. Count on from ${Math.max(a, b)}.`,
    cinema: { a, b, sum, mode: 'basic' },
  }
}

function makeTen() {
  const a = rand(5, 9)
  const b = rand(3, 12)
  const sum = a + b
  return {
    id: uid(), skillId: 'ADD_MAKE10', category: 'addition', format: 'mcq',
    question: `${a} + ${b} = ? (Try make-ten)`,
    options: opts(sum, [sum + 1, sum - 1, 10, a + b - 10]),
    correctAnswer: String(sum),
    explanation: `Make ten: ${a} needs ${10 - a} to make 10, then add the rest → ${sum}.`,
    cinema: { a, b, sum, mode: 'make10' },
  }
}

function doubles() {
  const a = rand(1, 10)
  const sum = a + a
  return {
    id: uid(), skillId: 'ADD_DOUBLE', category: 'addition', format: 'mcq',
    question: `Double ${a} means ${a} + ${a}. What is the answer?`,
    options: opts(sum, [sum + 1, a, a * 3, sum - 2]),
    correctAnswer: String(sum),
    explanation: `Double ${a} is ${sum}.`,
    cinema: { a, b: a, sum, mode: 'double' },
  }
}

function word() {
  const name = pick(NAMES)
  const thing = pick(THINGS)
  const a = rand(3, 15)
  const b = rand(2, 12)
  const sum = a + b
  return {
    id: uid(), skillId: 'ADD_WORD', category: 'addition', format: 'mcq',
    question: `${name} has ${a} ${thing}. ${name} gets ${b} more. How many ${thing} now?`,
    options: opts(sum, [sum + 1, sum - 1, a, b, Math.abs(a - b)]),
    correctAnswer: String(sum),
    explanation: `Join the groups: ${a} + ${b} = ${sum}.`,
    cinema: { a, b, sum, mode: 'word' },
  }
}

function missing() {
  const whole = rand(8, 20)
  const part = rand(1, whole - 1)
  const other = whole - part
  return {
    id: uid(), skillId: 'ADD_MISSING', category: 'addition', format: 'mcq',
    question: `${part} + ___ = ${whole}`,
    options: opts(other, [other + 1, other - 1, whole, part]),
    correctAnswer: String(other),
    explanation: `${part} + ${other} = ${whole}.`,
    cinema: { a: part, b: other, sum: whole, mode: 'basic' },
  }
}

function sa() {
  const a = rand(2, 18)
  const b = rand(2, 18)
  const sum = a + b
  return {
    id: uid(), skillId: 'ADD_SA', category: 'addition', format: 'short_answer',
    question: `${a} + ${b} = ?`,
    correctAnswer: String(sum),
    explanation: `${a} + ${b} = ${sum}.`,
    cinema: { a, b, sum, mode: 'basic' },
  }
}

function within100() {
  const a = rand(20, 60)
  const b = rand(10, 30)
  const sum = a + b
  if (sum > 100) return basic(20)
  return {
    id: uid(), skillId: 'ADD_WITHIN100', category: 'addition', format: 'mcq',
    question: `${a} + ${b} = ?`,
    options: opts(sum, [sum + 10, sum - 10, a + b - 1, Math.abs(a - b)]),
    correctAnswer: String(sum),
    explanation: `${a} + ${b} = ${sum}. Add tens, then ones.`,
    cinema: { a, b, sum, mode: 'basic' },
  }
}

const FAMILIES = [basic, makeTen, doubles, word, missing, sa, within100]

export function generateAddQuestion() {
  return pick(FAMILIES)()
}

export function generateAddSession(n = 8) {
  const order = shuffle(FAMILIES)
  const out = []
  const seen = new Set()
  let i = 0
  while (out.length < n && i < n * 10) {
    const q = order[i % order.length]()
    i++
    const key = q.question.replace(/\d+/g, '#')
    if (seen.has(key)) continue
    seen.add(key)
    out.push(q)
  }
  while (out.length < n) out.push(basic())
  return out
}
