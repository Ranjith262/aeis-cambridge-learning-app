/**
 * Local progress store for AEIS P2 practice.
 * Survives refresh via localStorage. Lightweight per profile.
 */

const STORAGE_KEY = 'aeis_p2_progress_v1'
const PREFS_KEY = 'aeis_p2_prefs_v1'

const defaultProgress = () => ({
  profiles: {
    default: {
      name: 'Learner',
      topicStats: {}, // topicId -> { attempted, correct, lastScore }
      weakSkills: [],
      sessions: [], // last N sessions { date, topicId, correct, total }
      totalCorrect: 0,
      totalAttempted: 0,
      streak: 0,
      lastPlayed: null,
    },
  },
  activeProfileId: 'default',
})

export function loadProgress() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return defaultProgress()
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
  return data.profiles[data.activeProfileId] || data.profiles.default
}

export function recordSession({ topicId, correct, total }) {
  const data = loadProgress()
  const id = data.activeProfileId
  const profile = data.profiles[id] || defaultProgress().profiles.default

  const stats = profile.topicStats[topicId] || { attempted: 0, correct: 0, lastScore: 0 }
  stats.attempted += total
  stats.correct += correct
  stats.lastScore = total > 0 ? Math.round((correct / total) * 100) : 0
  profile.topicStats[topicId] = stats

  profile.totalAttempted += total
  profile.totalCorrect += correct
  profile.lastPlayed = new Date().toISOString()

  if (total > 0 && correct / total >= 0.7) {
    profile.streak = (profile.streak || 0) + 1
  } else {
    profile.streak = 0
  }

  // Track weak topics
  const pct = stats.attempted > 0 ? stats.correct / stats.attempted : 1
  if (pct < 0.65 && !profile.weakSkills.includes(topicId)) {
    profile.weakSkills = [...profile.weakSkills.filter((t) => t !== topicId), topicId].slice(-8)
  } else if (pct >= 0.8) {
    profile.weakSkills = profile.weakSkills.filter((t) => t !== topicId)
  }

  profile.sessions = [
    { date: profile.lastPlayed, topicId, correct, total },
    ...(profile.sessions || []),
  ].slice(0, 30)

  data.profiles[id] = profile
  saveProgress(data)
  return profile
}

export function getTopicMastery(topicId) {
  const profile = getActiveProfile()
  const s = profile.topicStats[topicId]
  if (!s || s.attempted === 0) return null
  return Math.round((s.correct / s.attempted) * 100)
}

export function loadPrefs() {
  try {
    const raw = localStorage.getItem(PREFS_KEY)
    if (!raw) {
      return { highContrast: false, reducedMotion: false, textScale: 'md', dyslexiaFont: false }
    }
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
