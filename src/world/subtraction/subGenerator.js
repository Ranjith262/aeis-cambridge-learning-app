/**
 * MOE P1 Subtraction: take-away, count back, missing part, word problems, within 20/100.
 */
const rand = (a, b) => Math.floor(Math.random() * (b - a + 1)) + a
const pick = (arr) => arr[Math.floor(Math.random() * arr.length)]
const NAMES = ['Mei', 'Aisha', 'Tom', 'Raj', 'Siti', 'Ken', 'Nora']
const THINGS = ['apples', 'stickers', 'marbles', 'stars', 'pencils', 'shells']
let seq = 0
const uid = () => `sub_${Date.now().toString(36)}_${++seq}_${Math.random().toString(36).slice(2, 5)}`

function shuffle(a) {
  return [...a].sort(() => Math.random() - 0.5)
}
function opts(c, extras) {
  const s = new Set([String(c)])
  extras.forEach((e) => {
    if (e != null && Number(e) >= 0 && String(e) !== String(c)) s.add(String(e))
  })
  while (s.size < 4) s.add(String(Math.max(0, Number(c) + rand(-4, 6))))
  return shuffle([...s]).slice(0, 4)
}

function basic() {
  const a = rand(8, 30)
  const b = rand(1, a - 1)
  const diff = a - b
  return {
    id: uid(), skillId: 'SUB_BASIC', category: 'subtraction', format: 'mcq',
    question: `${a} − ${b} = ?`,
    options: opts(diff, [diff + 1, diff - 1, a + b, b]),
    correctAnswer: String(diff),
    explanation: `${a} − ${b} = ${diff}. Count back ${b} from ${a}.`,
    cinema: { a, b, diff },
  }
}

function word() {
  const name = pick(NAMES)
  const thing = pick(THINGS)
  const a = rand(10, 30)
  const b = rand(1, a - 1)
  const diff = a - b
  return {
    id: uid(), skillId: 'SUB_WORD', category: 'subtraction', format: 'mcq',
    question: `${name} has ${a} ${thing} and gives away ${b}. How many are left?`,
    options: opts(diff, [diff + 1, a + b, b, a]),
    correctAnswer: String(diff),
    explanation: `Start with ${a}, take away ${b}: ${diff} left.`,
    cinema: { a, b, diff },
  }
}

function missing() {
  const whole = rand(10, 25)
  const part = rand(1, whole - 1)
  const other = whole - part
  return {
    id: uid(), skillId: 'SUB_MISSING', category: 'subtraction', format: 'mcq',
    question: `${whole} − ___ = ${part}`,
    options: opts(other, [other + 1, other - 1, whole, part]),
    correctAnswer: String(other),
    explanation: `${whole} − ${other} = ${part}.`,
    cinema: { a: whole, b: other, diff: part },
  }
}

function sa() {
  const a = rand(10, 40)
  const b = rand(1, a - 1)
  const diff = a - b
  return {
    id: uid(), skillId: 'SUB_SA', category: 'subtraction', format: 'short_answer',
    question: `${a} − ${b} = ?`,
    correctAnswer: String(diff),
    explanation: `${a} − ${b} = ${diff}.`,
    cinema: { a, b, diff },
  }
}

function compareDiff() {
  const a = rand(12, 30)
  const b = rand(5, a - 1)
  const diff = a - b
  return {
    id: uid(), skillId: 'SUB_WORD', category: 'subtraction', format: 'mcq',
    question: `How many more is ${a} than ${b}?`,
    options: opts(diff, [diff + 1, a + b, b, a]),
    correctAnswer: String(diff),
    explanation: `Difference: ${a} − ${b} = ${diff}.`,
    cinema: { a, b, diff },
  }
}

const FAMILIES = [basic, word, missing, sa, compareDiff]

export function generateSubQuestion() {
  return pick(FAMILIES)()
}

export function generateSubSession(n = 8) {
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
