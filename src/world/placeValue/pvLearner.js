/** Minimal learner model for Place Value slice */
const KEY = 'aeis_pv_learner_v1'

const defaultModel = () => ({
  attempts: 0,
  correct: 0,
  bySkill: {},
  lastAha: null,
  streak: 0,
})

export function loadPvLearner() {
  try {
    return { ...defaultModel(), ...JSON.parse(localStorage.getItem(KEY) || '{}') }
  } catch {
    return defaultModel()
  }
}

export function recordPvResult(skillId, ok) {
  const m = loadPvLearner()
  m.attempts += 1
  if (ok) {
    m.correct += 1
    m.streak += 1
  } else m.streak = 0
  const s = m.bySkill[skillId] || { attempts: 0, correct: 0 }
  s.attempts += 1
  if (ok) s.correct += 1
  m.bySkill[skillId] = s
  m.lastAha = skillId
  localStorage.setItem(KEY, JSON.stringify(m))
  return m
}

export function pvMasteryPct() {
  const m = loadPvLearner()
  if (!m.attempts) return null
  return Math.round((m.correct / m.attempts) * 100)
}

export function pvParentLine() {
  const m = loadPvLearner()
  if (!m.attempts) return 'Your child has not started Place Value Island yet.'
  const pct = Math.round((m.correct / m.attempts) * 100)
  if (pct >= 80) return `Place value is strong (${pct}% on recent tries). Try building numbers with blocks at home.`
  if (pct >= 50) return `Place value is growing (${pct}%). Practise “10 ones make 1 ten” with household objects.`
  return `Place value needs gentle support (${pct}%). Use ten sticks and loose ones for 5 minutes today.`
}
