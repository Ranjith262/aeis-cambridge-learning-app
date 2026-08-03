const rand = (a, b) => Math.floor(Math.random() * (b - a + 1)) + a
const pick = (arr) => arr[Math.floor(Math.random() * arr.length)]
let seq = 0
const uid = () => `tm_${Date.now().toString(36)}_${++seq}`

export function generateTimeQuestion() {
  const h = rand(1, 11)
  const mode = pick(['oclock', 'half', 'read'])
  if (mode === 'half') {
    const correct = `${h}:30`
    return {
      id: uid(), skillId: 'TIME_HALF', category: 'time', format: 'mcq',
      question: `Half past ${h} is written as:`,
      options: [correct, `${h}:00`, `${h}:15`, `${h + 1}:00`].sort(() => Math.random() - 0.5),
      correctAnswer: correct,
      explanation: `Half past ${h} is ${h}:30. Long hand on 6.`,
      cinema: { hour: h, minute: 30 },
    }
  }
  if (mode === 'read') {
    return {
      id: uid(), skillId: 'TIME_READ', category: 'time', format: 'mcq',
      question: `At ${h} o'clock, the long hand points to:`,
      options: ['12', '6', String(h), '3'].sort(() => Math.random() - 0.5),
      correctAnswer: '12',
      explanation: `At o'clock, the long hand is on 12.`,
      cinema: { hour: h, minute: 0 },
    }
  }
  const correct = `${h}:00`
  return {
    id: uid(), skillId: 'TIME_OCLOCK', category: 'time', format: 'mcq',
    question: `What time is ${h} o'clock?`,
    options: [correct, `${h}:30`, `${h + 1}:00`, `${h}:15`].sort(() => Math.random() - 0.5),
    correctAnswer: correct,
    explanation: `${h} o'clock means short hand on ${h}, long hand on 12.`,
    cinema: { hour: h, minute: 0 },
  }
}

export function generateTimeSession(n = 8) {
  return Array.from({ length: n }, () => generateTimeQuestion())
}
