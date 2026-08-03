const rand = (a, b) => Math.floor(Math.random() * (b - a + 1)) + a
const pick = (arr) => arr[Math.floor(Math.random() * arr.length)]
const NAMES = ['Mei', 'Aisha', 'Tom', 'Raj', 'Siti', 'Ken']
const THINGS = ['apples', 'stickers', 'marbles', 'stars']
let seq = 0
const uid = () => `add_${Date.now().toString(36)}_${++seq}`

function opts(c, extras) {
  const s = new Set([String(c)])
  extras.forEach((e) => { if (e != null && e >= 0) s.add(String(e)) })
  while (s.size < 4) s.add(String(rand(0, 40)))
  return [...s].sort(() => Math.random() - 0.5).slice(0, 4)
}

export function generateAddQuestion() {
  const mode = pick(['basic', 'make10', 'double', 'word', 'sa'])
  let a = rand(1, 15)
  let b = rand(1, 15)
  if (mode === 'make10') { a = rand(5, 9); b = rand(2, 11) }
  if (mode === 'double') { a = rand(1, 10); b = a }
  if (a + b > 40) b = rand(1, 40 - a)
  const sum = a + b

  if (mode === 'sa') {
    return {
      id: uid(), skillId: 'ADD_SA', category: 'addition', format: 'short_answer',
      question: `${a} + ${b} = ?`, correctAnswer: String(sum),
      explanation: `${a} + ${b} = ${sum}.`, example: 'Count on from the larger number.',
      cinema: { a, b, sum, mode: 'basic' },
    }
  }
  if (mode === 'word') {
    const name = pick(NAMES); const thing = pick(THINGS)
    return {
      id: uid(), skillId: 'ADD_WORD', category: 'addition', format: 'mcq',
      question: `${name} has ${a} ${thing}, then gets ${b} more. How many now?`,
      options: opts(sum, [sum + 1, sum - 1, a, b]),
      correctAnswer: String(sum),
      explanation: `${a} + ${b} = ${sum}.`,
      cinema: { a, b, sum, mode: 'word' },
    }
  }
  if (mode === 'double') {
    return {
      id: uid(), skillId: 'ADD_DOUBLE', category: 'addition', format: 'mcq',
      question: `Double ${a}: ${a} + ${a} = ?`,
      options: opts(sum, [sum + 1, a, a * 3, sum - 2]),
      correctAnswer: String(sum),
      explanation: `Double ${a} is ${sum}.`,
      cinema: { a, b: a, sum, mode: 'double' },
    }
  }
  return {
    id: uid(), skillId: mode === 'make10' ? 'ADD_MAKE10' : 'ADD_BASIC',
    category: 'addition', format: 'mcq',
    question: `${a} + ${b} = ?`,
    options: opts(sum, [sum + 1, sum - 1, a + b + 10, Math.abs(a - b)]),
    correctAnswer: String(sum),
    explanation: mode === 'make10'
      ? `Make ten when you can: ${a} + ${b} = ${sum}.`
      : `${a} + ${b} = ${sum}. Count on from ${Math.max(a, b)}.`,
    cinema: { a, b, sum, mode },
  }
}

export function generateAddSession(n = 8) {
  return Array.from({ length: n }, () => generateAddQuestion())
}
