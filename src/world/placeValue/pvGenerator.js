/**
 * Phase 1 — Place Value generator (infinite surface, fixed deep structure)
 * Skills: PV_TENS_ONES, PV_BUILD, PV_READ, COMPARE (light)
 */

const rand = (a, b) => Math.floor(Math.random() * (b - a + 1)) + a
const pick = (arr) => arr[Math.floor(Math.random() * arr.length)]
let seq = 0
const uid = () => `pv_${Date.now().toString(36)}_${++seq}`

function distractors(correct, pool) {
  const set = new Set([String(correct)])
  for (const p of pool) {
    if (set.size >= 4) break
    if (p != null && String(p) !== String(correct)) set.add(String(p))
  }
  while (set.size < 4) set.add(String(rand(0, 99)))
  return [...set].sort(() => Math.random() - 0.5)
}

export function generatePlaceValueQuestion(skillHint) {
  const skill = skillHint || pick(['PV_BUILD', 'PV_READ', 'PV_TENS_ONES', 'PV_COMPARE'])
  const tens = rand(1, 9)
  const ones = rand(0, 9)
  const n = tens * 10 + ones

  if (skill === 'PV_BUILD') {
    return {
      id: uid(),
      skillId: 'PV_BUILD',
      category: 'numbersTo100',
      format: 'mcq',
      question: `What number is ${tens} ten${tens > 1 ? 's' : ''} and ${ones} one${ones !== 1 ? 's' : ''}?`,
      options: distractors(n, [ones * 10 + tens, tens + ones, tens * 100 + ones, n + 10, n - 1]),
      correctAnswer: String(n),
      explanation: `${tens} tens = ${tens * 10}. ${tens * 10} + ${ones} = ${n}.`,
      example: 'Push ones into groups of ten when you can.',
      cinema: { tens, ones, n, aha: 'build' },
      cpaStage: 'abstract',
    }
  }

  if (skill === 'PV_READ') {
    const place = pick(['tens', 'ones'])
    const correct = place === 'tens' ? tens : ones
    return {
      id: uid(),
      skillId: 'PV_READ',
      category: 'numbersTo100',
      format: 'mcq',
      question: `In the number ${n}, which digit is in the ${place} place?`,
      options: distractors(correct, [tens, ones, n, tens + ones]),
      correctAnswer: String(correct),
      explanation:
        place === 'tens'
          ? `The tens digit is ${tens}. It means ${tens * 10}.`
          : `The ones digit is ${ones}.`,
      example: `${n} = ${tens * 10} + ${ones}.`,
      cinema: { tens, ones, n, aha: 'read', place },
      cpaStage: 'abstract',
    }
  }

  if (skill === 'PV_COMPARE') {
    let a = rand(10, 99)
    let b = rand(10, 99)
    if (a === b) b = a + pick([-7, 7, 10, -10])
    const greater = Math.max(a, b)
    return {
      id: uid(),
      skillId: 'PV_COMPARE',
      category: 'numbersTo100',
      format: 'mcq',
      question: `Which number is greater, ${a} or ${b}?`,
      options: distractors(greater, [a, b, Math.min(a, b), greater + 1]),
      correctAnswer: String(greater),
      explanation: `Compare tens first. ${greater} is greater.`,
      example: 'The number with more tens is usually larger.',
      cinema: { tens: Math.floor(greater / 10), ones: greater % 10, n: greater, aha: 'compare', a, b },
      cpaStage: 'pictorial',
    }
  }

  // PV_TENS_ONES default
  return {
    id: uid(),
    skillId: 'PV_TENS_ONES',
    category: 'numbersTo100',
    format: 'mcq',
    question: `The number ${n} has how many tens and ones?`,
    options: distractors(`${tens} tens ${ones} ones`, [
      `${ones} tens ${tens} ones`,
      `${tens} tens 0 ones`,
      `0 tens ${n} ones`,
      `${tens + 1} tens ${ones} ones`,
    ]),
    correctAnswer: `${tens} tens ${ones} ones`,
    explanation: `${n} = ${tens} tens and ${ones} ones because ${tens * 10} + ${ones} = ${n}.`,
    example: '10 ones make 1 ten.',
    cinema: { tens, ones, n, aha: 'bundle' },
    cpaStage: 'concrete',
  }
}

export function generatePlaceValueSession(count = 8) {
  const skills = ['PV_TENS_ONES', 'PV_BUILD', 'PV_READ', 'PV_COMPARE']
  return Array.from({ length: count }, (_, i) => generatePlaceValueQuestion(skills[i % skills.length]))
}
