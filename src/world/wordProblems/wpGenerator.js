/**
 * Singapore MOE P1-style word problems.
 * Structures: join, take-away, compare (how many more/fewer),
 * two-step light (within 20/100), part-whole.
 * Numbers stay within P1 band; language stays age-appropriate.
 */
const rand = (a, b) => Math.floor(Math.random() * (b - a + 1)) + a
const pick = (arr) => arr[Math.floor(Math.random() * arr.length)]
let seq = 0
const uid = () => `wp_${Date.now().toString(36)}_${++seq}_${Math.random().toString(36).slice(2, 5)}`

const NAMES = ['Mei', 'Tom', 'Siti', 'Raj', 'Aisha', 'Ken', 'Nora', 'Wei', 'Alya', 'Sam']
const THINGS = [
  'stickers', 'marbles', 'apples', 'pencils', 'shells', 'cards',
  'books', 'stars', 'balloons', 'erasers',
]
const PLACES = ['school', 'the shop', 'home', 'the park', 'the library']

function shuffle(a) {
  return [...a].sort(() => Math.random() - 0.5)
}

function numOpts(correct, wrongs) {
  const s = new Set([String(correct)])
  for (const w of wrongs) {
    if (w == null || Number(w) < 0) continue
    if (String(w) === String(correct)) continue
    s.add(String(w))
  }
  let g = 0
  while (s.size < 4 && g++ < 20) {
    const j = Number(correct) + rand(-6, 8)
    if (j >= 0 && j !== Number(correct)) s.add(String(j))
  }
  const rest = shuffle([...s].filter((x) => x !== String(correct)))
  return shuffle([String(correct), ...rest]).slice(0, 4)
}

/** Join: A has x, gets y more */
function join() {
  const name = pick(NAMES)
  const thing = pick(THINGS)
  const a = rand(4, 35)
  const b = rand(2, 25)
  const sum = a + b
  if (sum > 100) return join()
  return {
    id: uid(),
    skillId: 'WP_JOIN',
    category: 'wordProblems',
    format: 'mcq',
    question: `${name} has ${a} ${thing}. ${name} gets ${b} more ${thing}. How many ${thing} does ${name} have now?`,
    options: numOpts(sum, [sum + 1, sum - 1, a, b, Math.abs(a - b)]),
    correctAnswer: String(sum),
    explanation: `Join the groups: ${a} + ${b} = ${sum}.`,
  }
}

/** Take away */
function takeAway() {
  const name = pick(NAMES)
  const thing = pick(THINGS)
  const a = rand(12, 50)
  const b = rand(2, a - 2)
  const left = a - b
  return {
    id: uid(),
    skillId: 'WP_TAKE',
    category: 'wordProblems',
    format: 'mcq',
    question: `${name} has ${a} ${thing}. ${name} gives ${b} ${thing} away. How many ${thing} are left?`,
    options: numOpts(left, [left + 1, left - 1, a + b, b, a]),
    correctAnswer: String(left),
    explanation: `Start with ${a}, take away ${b}: ${a} − ${b} = ${left}.`,
  }
}

/** Compare: how many more */
function howManyMore() {
  const name1 = pick(NAMES)
  let name2 = pick(NAMES)
  while (name2 === name1) name2 = pick(NAMES)
  const thing = pick(THINGS)
  const bigger = rand(15, 45)
  const smaller = rand(5, bigger - 3)
  const diff = bigger - smaller
  return {
    id: uid(),
    skillId: 'WP_COMPARE',
    category: 'wordProblems',
    format: 'mcq',
    question: `${name1} has ${bigger} ${thing}. ${name2} has ${smaller} ${thing}. How many more ${thing} does ${name1} have than ${name2}?`,
    options: numOpts(diff, [diff + 1, bigger + smaller, smaller, bigger]),
    correctAnswer: String(diff),
    explanation: `Compare: ${bigger} − ${smaller} = ${diff} more.`,
  }
}

/** How many fewer */
function howManyFewer() {
  const name1 = pick(NAMES)
  let name2 = pick(NAMES)
  while (name2 === name1) name2 = pick(NAMES)
  const thing = pick(THINGS)
  const bigger = rand(15, 40)
  const smaller = rand(4, bigger - 2)
  const diff = bigger - smaller
  return {
    id: uid(),
    skillId: 'WP_COMPARE',
    category: 'wordProblems',
    format: 'mcq',
    question: `${name1} has ${smaller} ${thing}. ${name2} has ${bigger} ${thing}. How many fewer ${thing} does ${name1} have?`,
    options: numOpts(diff, [diff + 1, bigger + smaller, smaller, bigger]),
    correctAnswer: String(diff),
    explanation: `${name1} has ${diff} fewer because ${bigger} − ${smaller} = ${diff}.`,
  }
}

/** Total of two groups */
function totalTwo() {
  const thing = pick(THINGS)
  const a = rand(5, 30)
  const b = rand(5, 30)
  const sum = a + b
  if (sum > 100) return totalTwo()
  const place = pick(PLACES)
  return {
    id: uid(),
    skillId: 'WP_JOIN',
    category: 'wordProblems',
    format: 'mcq',
    question: `There are ${a} ${thing} on one shelf at ${place} and ${b} ${thing} on another shelf. How many ${thing} are there altogether?`,
    options: numOpts(sum, [sum + 1, sum - 1, a, b, Math.abs(a - b)]),
    correctAnswer: String(sum),
    explanation: `Altogether means add: ${a} + ${b} = ${sum}.`,
  }
}

/** Missing part: need N, have M */
function needMore() {
  const name = pick(NAMES)
  const thing = pick(THINGS)
  const need = rand(15, 40)
  const have = rand(3, need - 2)
  const more = need - have
  return {
    id: uid(),
    skillId: 'WP_MISSING',
    category: 'wordProblems',
    format: 'mcq',
    question: `${name} wants ${need} ${thing}. ${name} already has ${have}. How many more ${thing} does ${name} need?`,
    options: numOpts(more, [more + 1, more - 1, need + have, have]),
    correctAnswer: String(more),
    explanation: `${need} − ${have} = ${more} more needed.`,
  }
}

/** Short answer join */
function saJoin() {
  const name = pick(NAMES)
  const thing = pick(THINGS)
  const a = rand(6, 40)
  const b = rand(3, 30)
  const sum = a + b
  if (sum > 100) return saJoin()
  return {
    id: uid(),
    skillId: 'WP_JOIN_SA',
    category: 'wordProblems',
    format: 'short_answer',
    question: `${name} collects ${a} ${thing} in the morning and ${b} more in the afternoon. How many ${thing} in all?`,
    correctAnswer: String(sum),
    explanation: `${a} + ${b} = ${sum}.`,
  }
}

/** Short answer take away */
function saTake() {
  const name = pick(NAMES)
  const thing = pick(THINGS)
  const a = rand(15, 55)
  const b = rand(2, a - 2)
  const left = a - b
  return {
    id: uid(),
    skillId: 'WP_TAKE_SA',
    category: 'wordProblems',
    format: 'short_answer',
    question: `${name} baked ${a} cookies and sold ${b}. How many cookies are left?`,
    correctAnswer: String(left),
    explanation: `${a} − ${b} = ${left}.`,
  }
}

/** Within 20 — smaller numbers for early fluency */
function within20() {
  const name = pick(NAMES)
  const thing = pick(THINGS)
  const a = rand(5, 12)
  const b = rand(2, 8)
  const op = pick(['add', 'sub'])
  if (op === 'add') {
    const sum = a + b
    return {
      id: uid(),
      skillId: 'WP_JOIN',
      category: 'wordProblems',
      format: 'mcq',
      question: `${name} finds ${a} ${thing} and then finds ${b} more. How many ${thing} now?`,
      options: numOpts(sum, [sum + 1, sum - 1, a, b]),
      correctAnswer: String(sum),
      explanation: `${a} + ${b} = ${sum}.`,
    }
  }
  const total = a + b
  return {
    id: uid(),
    skillId: 'WP_TAKE',
    category: 'wordProblems',
    format: 'mcq',
    question: `${name} has ${total} ${thing} and loses ${b}. How many are left?`,
    options: numOpts(a, [a + 1, a - 1, total, b]),
    correctAnswer: String(a),
    explanation: `${total} − ${b} = ${a}.`,
  }
}

const FAMILIES = [
  join, join, takeAway, takeAway, howManyMore, howManyFewer,
  totalTwo, needMore, saJoin, saTake, within20, within20,
]

export function generateWordProblem() {
  return pick(FAMILIES)()
}

export function generateWordProblemSession(n = 8) {
  const out = []
  const seen = new Set()
  let g = 0
  while (out.length < n && g++ < n * 20) {
    const q = generateWordProblem()
    const key = q.question.replace(/\d+/g, '#').slice(0, 70)
    if (seen.has(key)) continue
    seen.add(key)
    out.push(q)
  }
  while (out.length < n) out.push(generateWordProblem())
  return out
}
