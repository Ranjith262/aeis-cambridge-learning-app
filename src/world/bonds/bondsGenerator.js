const rand = (a, b) => Math.floor(Math.random() * (b - a + 1)) + a
const pick = (arr) => arr[Math.floor(Math.random() * arr.length)]
let seq = 0
const uid = () => `nb_${Date.now().toString(36)}_${++seq}`

function opts(correct, extras) {
  const s = new Set([String(correct)])
  extras.forEach((e) => s.add(String(e)))
  while (s.size < 4) s.add(String(rand(0, 20)))
  return [...s].sort(() => Math.random() - 0.5).slice(0, 4)
}

export function generateBondQuestion() {
  const whole = pick([10, 10, 10, 20])
  const part = rand(0, whole)
  const other = whole - part
  const kind = pick(['missing', 'pair', 'sa'])
  if (kind === 'sa') {
    return {
      id: uid(),
      skillId: 'BONDS_' + whole,
      category: 'numberBonds',
      format: 'short_answer',
      question: `${part} + ___ = ${whole}`,
      correctAnswer: String(other),
      explanation: `${part} + ${other} = ${whole}. Number bond of ${whole}.`,
      cinema: { whole, part, other },
    }
  }
  if (kind === 'pair') {
    const correct = `${part} + ${other}`
    return {
      id: uid(),
      skillId: 'BONDS_' + whole,
      category: 'numberBonds',
      format: 'mcq',
      question: `Which pair makes ${whole}?`,
      options: opts(correct, [`${part}+${other + 1}`, `${part + 1}+${other}`, `${other}+${part}`]),
      correctAnswer: correct,
      explanation: `${part} + ${other} = ${whole}.`,
      cinema: { whole, part, other },
    }
  }
  return {
    id: uid(),
    skillId: 'BONDS_' + whole,
    category: 'numberBonds',
    format: 'mcq',
    question: `${part} + ___ = ${whole}`,
    options: opts(other, [other + 1, other - 1, whole, part]),
    correctAnswer: String(other),
    explanation: `${part} + ${other} = ${whole}.`,
    cinema: { whole, part, other },
  }
}

export function generateBondSession(n = 8) {
  return Array.from({ length: n }, () => generateBondQuestion())
}
