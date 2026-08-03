const rand = (a, b) => Math.floor(Math.random() * (b - a + 1)) + a
const pick = (arr) => arr[Math.floor(Math.random() * arr.length)]
const COINS = [5, 10, 20, 50]
let seq = 0
const uid = () => `mo_${Date.now().toString(36)}_${++seq}`

function opts(c, extras) {
  const s = new Set([String(c)])
  extras.forEach((e) => s.add(String(e)))
  while (s.size < 4) s.add(String(rand(5, 100)) + (String(c).includes('¢') ? '¢' : ''))
  return [...s].sort(() => Math.random() - 0.5).slice(0, 4)
}

export function generateMoneyQuestion() {
  const c1 = pick(COINS)
  const c2 = pick(COINS)
  const total = c1 + c2
  const mode = pick(['sum', 'word', 'sa', 'compare'])
  if (mode === 'sa') {
    return {
      id: uid(), skillId: 'MONEY_SA', category: 'money', format: 'short_answer',
      question: `${c1}¢ + ${c2}¢ = ? (cents)`,
      correctAnswer: String(total),
      explanation: `${c1} + ${c2} = ${total} cents.`,
      cinema: { c1, c2, total },
    }
  }
  if (mode === 'word') {
    return {
      id: uid(), skillId: 'MONEY_WORD', category: 'money', format: 'mcq',
      question: `You pay with a ${c1}¢ coin and a ${c2}¢ coin. How much is that?`,
      options: opts(`${total}¢`, [`${c1}¢`, `${c2}¢`, `${total + 10}¢`, `${Math.abs(c1 - c2)}¢`]),
      correctAnswer: `${total}¢`,
      explanation: `${c1} + ${c2} = ${total} cents.`,
      cinema: { c1, c2, total },
    }
  }
  if (mode === 'compare') {
    const a = pick(COINS); const b = pick(COINS)
    const greater = Math.max(a, b)
    return {
      id: uid(), skillId: 'MONEY_COMPARE', category: 'money', format: 'mcq',
      question: `Which is worth more: ${a}¢ or ${b}¢?`,
      options: opts(`${greater}¢`, [`${Math.min(a, b)}¢`, `${a + b}¢`, `same`]),
      correctAnswer: `${greater}¢`,
      explanation: `${greater}¢ is greater.`,
      cinema: { c1: a, c2: b, total: a + b },
    }
  }
  return {
    id: uid(), skillId: 'MONEY_SUM', category: 'money', format: 'mcq',
    question: `${c1}¢ + ${c2}¢ = ?`,
    options: opts(`${total}¢`, [`${total + 5}¢`, `${total - 5}¢`, `${c1}¢`]),
    correctAnswer: `${total}¢`,
    explanation: `${c1} + ${c2} = ${total} cents.`,
    cinema: { c1, c2, total },
  }
}

export function generateMoneySession(n = 8) {
  return Array.from({ length: n }, () => generateMoneyQuestion())
}
