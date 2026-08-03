/**
 * Phase 4 — Cross-skill adaptive learner model (local-first)
 * Tracks attempts, accuracy, recent window, fragility, stamina.
 */

const KEY = 'aeis_adaptive_v1'
const RECENT = 8 // recent window for fragile detection

const defaultState = () => ({
  skills: {}, // skillId -> { attempts, correct, recent: [0|1,...], lastAt }
  sessions: 0,
  totalCorrect: 0,
  totalAttempts: 0,
  lastSessionAt: null,
  stamina: { minutesApprox: 0, sessionsToday: 0, day: null },
})

export function loadAdaptive() {
  try {
    return { ...defaultState(), ...JSON.parse(localStorage.getItem(KEY) || '{}') }
  } catch {
    return defaultState()
  }
}

function save(state) {
  localStorage.setItem(KEY, JSON.stringify(state))
  return state
}

function todayKey() {
  return new Date().toISOString().slice(0, 10)
}

export function recordAdaptiveResult(skillId, correct) {
  if (!skillId) return loadAdaptive()
  const s = loadAdaptive()
  const day = todayKey()
  if (s.stamina.day !== day) {
    s.stamina = { minutesApprox: 0, sessionsToday: 0, day }
  }

  const row = s.skills[skillId] || { attempts: 0, correct: 0, recent: [], lastAt: null }
  row.attempts += 1
  if (correct) row.correct += 1
  row.recent = [...(row.recent || []), correct ? 1 : 0].slice(-RECENT)
  row.lastAt = Date.now()
  s.skills[skillId] = row

  s.totalAttempts += 1
  if (correct) s.totalCorrect += 1
  s.lastSessionAt = Date.now()
  return save(s)
}

export function endAdaptiveSession(minutesApprox = 5) {
  const s = loadAdaptive()
  const day = todayKey()
  if (s.stamina.day !== day) {
    s.stamina = { minutesApprox: 0, sessionsToday: 0, day }
  }
  s.sessions += 1
  s.stamina.sessionsToday += 1
  s.stamina.minutesApprox += minutesApprox
  return save(s)
}

export function skillAccuracy(skillId) {
  const row = loadAdaptive().skills[skillId]
  if (!row || !row.attempts) return null
  return row.correct / row.attempts
}

/** Fragile: recent window accuracy < 0.5 with at least 3 samples */
export function isFragile(skillId) {
  const row = loadAdaptive().skills[skillId]
  if (!row || (row.recent || []).length < 3) return false
  const r = row.recent
  const acc = r.reduce((a, b) => a + b, 0) / r.length
  return acc < 0.5
}

export function listFragileSkills() {
  const s = loadAdaptive()
  return Object.keys(s.skills).filter(isFragile)
}

/** Priority queue: fragile first, then lowest accuracy, then least practiced */
export function rankSkillsForPractice(skillIds) {
  const s = loadAdaptive()
  return [...skillIds].sort((a, b) => {
    const fa = isFragile(a) ? 0 : 1
    const fb = isFragile(b) ? 0 : 1
    if (fa !== fb) return fa - fb
    const ra = s.skills[a]
    const rb = s.skills[b]
    const aa = ra && ra.attempts ? ra.correct / ra.attempts : 0.5
    const ab = rb && rb.attempts ? rb.correct / rb.attempts : 0.5
    if (aa !== ab) return aa - ab
    const ta = ra?.attempts || 0
    const tb = rb?.attempts || 0
    return ta - tb
  })
}

export function adaptiveSummary() {
  const s = loadAdaptive()
  const fragile = listFragileSkills()
  const overall =
    s.totalAttempts > 0 ? Math.round((s.totalCorrect / s.totalAttempts) * 100) : null
  const tired = s.stamina.sessionsToday >= 4 || s.stamina.minutesApprox >= 40
  return {
    overall,
    sessions: s.sessions,
    fragile,
    tired,
    sessionsToday: s.stamina.sessionsToday,
    parentLine: parentAdaptiveLine(overall, fragile, tired),
  }
}

function parentAdaptiveLine(overall, fragile, tired) {
  if (overall == null) return 'Start any island — the app will learn where your child needs support.'
  if (tired) return 'Plenty of practice today. A short break helps memory more than another long session.'
  if (fragile.length) {
    return `Worth a gentle revisit: ${fragile.slice(0, 3).join(', ')}. Keep it playful and short.`
  }
  if (overall >= 80) return `Overall looking strong (~${overall}%). Mix topics so skills stay flexible.`
  return `Steady progress (~${overall}%). Focus on one fragile skill at a time.`
}

/** Math skill ids used across islands */
export const MATH_SKILL_POOL = [
  'PV_BUILD',
  'PV_READ',
  'PV_TENS_ONES',
  'PV_COMPARE',
  'BONDS_10',
  'BONDS_20',
  'ADD_BASIC',
  'ADD_MAKE10',
  'ADD_DOUBLE',
  'ADD_WORD',
  'SUB_BASIC',
  'SUB_WORD',
  'MONEY_SUM',
  'TIME_OCLOCK',
  'TIME_HALF',
]

export const ENGLISH_SKILL_POOL = [
  'VOCAB_SCENE',
  'SENT_BUILD',
  'READ_QUEST',
  'GRAM_NOTICE',
  'PHON_PATTERN',
]
