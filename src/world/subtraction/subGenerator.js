const rand = (a, b) => Math.floor(Math.random() * (b - a + 1)) + a
const pick = (arr) => arr[Math.floor(Math.random() * arr.length)]
const NAMES = ['Mei', 'Aisha', 'Tom', 'Raj', 'Siti', 'Ken']
const THINGS = ['apples', 'stickers', 'marbles', 'stars']
let seq = 0
const uid = () => `sub_${Date.now().toString(36)}_${++seq}`

function opts(c, extras) {
  const s = new Set([String(c)])
  extras.forEach((e) => { if (e != null && e >= 0) s.add(String(e)) })
  while (s.size < 4) s.add(String(rand(0, 40)))
  return [...s].sort(() => Math.random() - 0.5).slice(0, 4)
}

export function generateSubQuestion() {
  let a = rand(8, 30)
  let b = rand(1, a)
  const diff = a - b
  const mode = pick(['basic', 'word', 'sa', 'countback'])

  if (mode === 'sa') {
    return {
      id: uid(), skillId: 'SUB_SA', category: 'subtraction', format: 'short_answer',
      question: `${a} − ${b} = ?`, correctAnswer: String(diff),
      explanation: `${a} − ${b} = ${diff}.`, example: 'Count back or use a number bond.',
      cinema: { a, b, diff },
    }
  }
  if (mode === 'word') {
    const name = pick(NAMES); const thing = pick(THINGS)
    return {
      id: uid(), skillId: 'SUB_WORD', category: 'subtraction', format: 'mcq',
      question: `${name} has ${a} ${thing} and gives away ${b}. How many left?`,
      options: opts(diff, [diff + 1, a + b, b, a]),
      correctAnswer: String(diff),
      explanation: `${a} − ${b} = ${diff}.`,
      cinema: { a, b, diff },
    }
  }
  return {
    id: uid(), skillId: mode === 'countback' ? 'SUB_COUNTBACK' : 'SUB_BASIC',
    category: 'subtraction', format: 'mcq',
    question: `${a} − ${b} = ?`,
    options: opts(diff, [diff + 1, diff - 1, a + b, b]),
    correctAnswer: String(diff),
    explanation: `${a} − ${b} = ${diff}. Count back ${b} from ${a}.`,
    cinema: { a, b, diff },
  }
}

export function generateSubSession(n = 8) {
  return Array.from({ length: n }, () => generateSubQuestion())
}
