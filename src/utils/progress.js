/**
 * Local-first progress: mastery, SRS, mocks, preferences.
 */

import { defaultCard, reviewCard, isDue } from './srs'

const STORAGE_KEY = 'aeis_p2_progress_v2'
const PREFS_KEY = 'aeis_p2_prefs_v1'

const defaultProfile = () => ({
  name: 'Learner',
  topicStats: {},
  weakSkills: [],
  sessions: [],
  srsCards: {},
  mockHistory: [],
  totalCorrect: 0,
  totalAttempted: 0,
  streak: 0,
  lastPlayed: null,
  gapHints: {},
})

const defaultProgress = () => ({
  profiles: { default: defaultProfile() },
  activeProfileId: 'default',
})

export function loadProgress() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) {
      // migrate v1 if present
      const v1 = localStorage.getItem('aeis_p2_progress_v1')
      if (v1) {
        const old = JSON.parse(v1)
        const migrated = defaultProgress()
        if (old.profiles?.default) {
          migrated.profiles.default = { ...defaultProfile(), ...old.profiles.default, srsCards: {}, mockHistory: [], gapHints: {} }
        }
        saveProgress(migrated)
        return migrated
      }
      return defaultProgress()
    }
    const data = JSON.parse(raw)
    if (!data.profiles || !data.activeProfileId) return defaultProgress()
    return data
  } catch {
    return defaultProgress()
  }
}

export function saveProgress(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  } catch (e) {
    console.warn('Could not save progress', e)
  }
}

export function getActiveProfile() {
  const data = loadProgress()
  const p = data.profiles[data.activeProfileId]
  return p ? { ...defaultProfile(), ...p } : defaultProfile()
}

function updateActive(mutator) {
  const data = loadProgress()
  const id = data.activeProfileId
  const profile = { ...defaultProfile(), ...(data.profiles[id] || {}) }
  data.profiles[id] = mutator(profile)
  saveProgress(data)
  return data.profiles[id]
}

export function recordSession({ topicId, correct, total, answersMeta = [] }) {
  return updateActive((profile) => {
    const stats = profile.topicStats[topicId] || { attempted: 0, correct: 0, lastScore: 0 }
    stats.attempted += total
    stats.correct += correct
    stats.lastScore = total > 0 ? Math.round((correct / total) * 100) : 0
    profile.topicStats[topicId] = stats
    profile.totalAttempted += total
    profile.totalCorrect += correct
    profile.lastPlayed = new Date().toISOString()
    if (total > 0 && correct / total >= 0.7) profile.streak = (profile.streak || 0) + 1
    else profile.streak = 0

    const pct = stats.attempted > 0 ? stats.correct / stats.attempted : 1
    if (pct < 0.65 && !profile.weakSkills.includes(topicId)) {
      profile.weakSkills = [...profile.weakSkills.filter((t) => t !== topicId), topicId].slice(-10)
    } else if (pct >= 0.8) {
      profile.weakSkills = profile.weakSkills.filter((t) => t !== topicId)
    }

    // SRS update
    const quality = total === 0 ? 1 : correct / total >= 0.85 ? 3 : correct / total >= 0.6 ? 2 : correct / total >= 0.4 ? 1 : 0
    const card = profile.srsCards[topicId] || defaultCard(topicId)
    profile.srsCards[topicId] = reviewCard(card, quality)

    // crude gap hint from speed-ish signal if provided
    answersMeta.forEach((m) => {
      if (m.wrong && m.fast) profile.gapHints[m.topicId || topicId] = 'careless'
      else if (m.wrong) profile.gapHints[m.topicId || topicId] = 'conceptual'
    })

    profile.sessions = [
      { date: profile.lastPlayed, topicId, correct, total },
      ...(profile.sessions || []),
    ].slice(0, 40)
    return profile
  })
}

export function recordMock({ scorePct, correct, total, byTopic, durationSec }) {
  return updateActive((profile) => {
    profile.mockHistory = [
      {
        date: new Date().toISOString(),
        scorePct,
        correct,
        total,
        byTopic,
        durationSec,
      },
      ...(profile.mockHistory || []),
    ].slice(0, 20)
    // feed weak skills from mock
    Object.entries(byTopic || {}).forEach(([tid, s]) => {
      if (s.total > 0 && s.correct / s.total < 0.6) {
        if (!profile.weakSkills.includes(tid)) profile.weakSkills.push(tid)
      }
    })
    profile.weakSkills = profile.weakSkills.slice(-10)
    return profile
  })
}

export function getTopicMastery(topicId) {
  const profile = getActiveProfile()
  const s = profile.topicStats[topicId]
  if (!s || s.attempted === 0) return null
  return Math.round((s.correct / s.attempted) * 100)
}

export function getDueTopics() {
  const profile = getActiveProfile()
  return Object.values(profile.srsCards || {})
    .filter((c) => isDue(c))
    .map((c) => c.topicId)
}

export function getSrsCards() {
  return getActiveProfile().srsCards || {}
}

export function loadPrefs() {
  try {
    const raw = localStorage.getItem(PREFS_KEY)
    if (!raw) return { highContrast: false, reducedMotion: false, textScale: 'md', dyslexiaFont: false }
    return JSON.parse(raw)
  } catch {
    return { highContrast: false, reducedMotion: false, textScale: 'md', dyslexiaFont: false }
  }
}

export function savePrefs(prefs) {
  try {
    localStorage.setItem(PREFS_KEY, JSON.stringify(prefs))
  } catch {}
}

export function applyPrefsToDocument(prefs) {
  const root = document.documentElement
  root.dataset.contrast = prefs.highContrast ? 'high' : 'normal'
  root.dataset.motion = prefs.reducedMotion ? 'reduced' : 'full'
  root.dataset.text = prefs.textScale || 'md'
  root.dataset.font = prefs.dyslexiaFont ? 'dyslexia' : 'default'
}

export function readinessScore() {
  const p = getActiveProfile()
  const masteryVals = Object.values(p.topicStats || {})
  const avgMastery =
    masteryVals.length === 0
      ? 0
      : masteryVals.reduce((a, s) => a + (s.attempted ? s.correct / s.attempted : 0), 0) / masteryVals.length
  const lastMock = (p.mockHistory || [])[0]
  const mockPart = lastMock ? lastMock.scorePct / 100 : avgMastery
  return Math.round((0.4 * avgMastery + 0.6 * mockPart) * 100)
}

export function storyOfProgress() {
  const p = getActiveProfile()
  const sessions = p.sessions || []
  const mocks = p.mockHistory || []
  if (sessions.length === 0 && mocks.length === 0) {
    return 'Your adventure is just beginning. Visit an island and start practising!'
  }
  const recent = sessions.slice(0, 5)
  const totalQ = recent.reduce((a, s) => a + s.total, 0)
  const totalC = recent.reduce((a, s) => a + s.correct, 0)
  const weak = p.weakSkills?.[0]
  let text = `This week you answered ${totalQ} questions and got ${totalC} right.`
  if (p.streak > 1) text += ` Streak: ${p.streak} strong sessions!`
  if (weak) text += ` A good focus next is your weaker island.`
  if (mocks[0]) text += ` Latest mock score: ${mocks[0].scorePct}%.`
  return text
}
