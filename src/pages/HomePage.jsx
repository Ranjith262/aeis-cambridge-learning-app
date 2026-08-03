import { useMemo, useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { mathCategories, getTotalMathQuestionCount } from '../data/mathQuestions'
import { categories, getTotalQuestionCount } from '../data/questions'
import Mascot, { pickLine } from '../components/Mascot'
import { getActiveProfile, getTopicMastery, loadPrefs, savePrefs, applyPrefsToDocument } from '../utils/progress'

const PASTEL_ISLAND = [
  { bg: 'bg-sky/40' },
  { bg: 'bg-mint/50' },
  { bg: 'bg-peach/50' },
  { bg: 'bg-butter/60' },
  { bg: 'bg-coral/40' },
  { bg: 'bg-sky/30' },
  { bg: 'bg-mint/40' },
  { bg: 'bg-peach/40' },
  { bg: 'bg-butter/50' },
  { bg: 'bg-coral/30' },
]

export default function HomePage({ onStartQuiz }) {
  const [activeSubject, setActiveSubject] = useState('math')
  const [profile, setProfile] = useState(null)
  const [showSettings, setShowSettings] = useState(false)
  const [prefs, setPrefs] = useState(() => loadPrefs())

  useEffect(() => {
    setProfile(getActiveProfile())
    applyPrefsToDocument(loadPrefs())
  }, [])

  useEffect(() => {
    applyPrefsToDocument(prefs)
    savePrefs(prefs)
  }, [prefs])

  const isMath = activeSubject === 'math'
  const currentCategories = isMath ? mathCategories : categories
  const currentTotal = isMath ? getTotalMathQuestionCount() : getTotalQuestionCount()

  const weakTopic = useMemo(() => {
    if (!profile?.weakSkills?.length) return null
    const id = profile.weakSkills[profile.weakSkills.length - 1]
    return currentCategories.find((c) => c.id === id) || null
  }, [profile, currentCategories])

  const overallPct =
    profile && profile.totalAttempted > 0
      ? Math.round((profile.totalCorrect / profile.totalAttempted) * 100)
      : null

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.35 }}
      className="relative z-10 min-h-screen px-4 md:px-8 lg:px-12 py-6 pb-16"
    >
      <div className="flex items-start justify-between gap-4 mb-6">
        <div>
          <p className="text-sm font-semibold text-muted uppercase tracking-wide">AEIS Primary · Math Ready</p>
          <h1 className="text-3xl md:text-4xl font-bold text-ink mt-1">Math Kingdom</h1>
          <p className="text-muted mt-1 text-sm md:text-base">
            Cambridge P1 aligned · Soft practice for AEIS P2 entrance
          </p>
        </div>
        <button
          type="button"
          onClick={() => setShowSettings((s) => !s)}
          className="pastel-btn px-4 py-2 bg-white shadow-card text-ink text-sm border border-black/5"
          aria-label="Settings"
        >
          Settings
        </button>
      </div>

      {showSettings && (
        <div className="pastel-card p-4 mb-6 max-w-md">
          <h3 className="font-bold text-ink mb-3">Accessibility</h3>
          <div className="space-y-3 text-sm">
            {[
              ['highContrast', 'High contrast'],
              ['reducedMotion', 'Reduced motion'],
              ['dyslexiaFont', 'Dyslexia-friendly font'],
            ].map(([key, label]) => (
              <label key={key} className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={!!prefs[key]}
                  onChange={(e) => setPrefs((p) => ({ ...p, [key]: e.target.checked }))}
                  className="w-4 h-4"
                />
                <span>{label}</span>
              </label>
            ))}
            <label className="flex items-center gap-3">
              <span className="w-28">Text size</span>
              <select
                value={prefs.textScale}
                onChange={(e) => setPrefs((p) => ({ ...p, textScale: e.target.value }))}
                className="rounded-lg border border-black/10 px-2 py-1"
              >
                <option value="sm">Small</option>
                <option value="md">Medium</option>
                <option value="lg">Large</option>
              </select>
            </label>
          </div>
        </div>
      )}

      <div className="flex flex-col md:flex-row md:items-center gap-4 mb-8">
        <Mascot mood="happy" size="lg" message={pickLine('welcome', profile?.totalAttempted || 0)} />
        <div className="flex flex-wrap gap-3">
          <div className="pastel-card px-4 py-3 text-center min-w-[88px]">
            <div className="text-xl font-bold text-ink">{currentTotal}+</div>
            <div className="text-xs text-muted">Questions</div>
          </div>
          <div className="pastel-card px-4 py-3 text-center min-w-[88px]">
            <div className="text-xl font-bold text-ink">{currentCategories.length}</div>
            <div className="text-xs text-muted">Islands</div>
          </div>
          <div className="pastel-card px-4 py-3 text-center min-w-[88px]">
            <div className="text-xl font-bold text-success">{overallPct != null ? `${overallPct}%` : '—'}</div>
            <div className="text-xs text-muted">Accuracy</div>
          </div>
          <div className="pastel-card px-4 py-3 text-center min-w-[88px]">
            <div className="text-xl font-bold text-ink">{profile?.streak || 0}</div>
            <div className="text-xs text-muted">Streak</div>
          </div>
        </div>
      </div>

      {weakTopic && isMath && (
        <button
          type="button"
          onClick={() => onStartQuiz(weakTopic.id, 'math')}
          className="w-full md:w-auto mb-6 pastel-card px-5 py-4 flex items-center gap-4 text-left hover:shadow-soft transition-shadow border-2 border-mint/60"
        >
          <span className="text-3xl">🎯</span>
          <div>
            <div className="text-xs font-semibold text-success uppercase tracking-wide">Today&apos;s Quest</div>
            <div className="font-bold text-ink">Practise {weakTopic.name}</div>
            <div className="text-sm text-muted">A topic that needs a little extra love</div>
          </div>
        </button>
      )}

      <div className="flex gap-2 mb-5">
        <button
          type="button"
          onClick={() => setActiveSubject('math')}
          className={`pastel-btn px-5 py-2.5 text-sm ${
            isMath ? 'bg-ink text-white shadow-card' : 'bg-white text-ink border border-black/5'
          }`}
        >
          Math Kingdom
        </button>
        <button
          type="button"
          onClick={() => setActiveSubject('english')}
          className={`pastel-btn px-5 py-2.5 text-sm ${
            !isMath ? 'bg-ink text-white shadow-card' : 'bg-white text-ink border border-black/5'
          }`}
        >
          English (bonus)
        </button>
      </div>

      <h2 className="text-lg font-bold text-ink mb-3">
        {isMath ? 'Explore the islands' : 'English topics'}
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4">
        {currentCategories.map((cat, i) => {
          const mastery = isMath ? getTopicMastery(cat.id) : null
          const style = PASTEL_ISLAND[i % PASTEL_ISLAND.length]
          return (
            <motion.button
              key={cat.id}
              type="button"
              whileTap={{ scale: 0.97 }}
              onClick={() => onStartQuiz(cat.id, isMath ? 'math' : 'english')}
              className={`island-card pastel-card p-4 text-left ${style.bg} ${
                mastery != null && mastery >= 80 ? 'ring-2 ring-success/50' : ''
              }`}
            >
              <div className="text-3xl mb-2">{cat.icon}</div>
              <div className="font-bold text-ink text-sm leading-snug">{cat.name}</div>
              <div className="text-xs text-muted mt-1">{cat.count} questions</div>
              {mastery != null && (
                <div className="mt-2">
                  <div className="h-1.5 rounded-full bg-white/70 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-success transition-all"
                      style={{ width: `${mastery}%` }}
                    />
                  </div>
                  <div className="text-[10px] text-muted mt-0.5">{mastery}% mastery</div>
                </div>
              )}
            </motion.button>
          )
        })}
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={() => onStartQuiz('all', isMath ? 'math' : 'english')}
          className="pastel-btn px-6 py-3 bg-ink text-white shadow-soft text-sm"
        >
          Mixed practice (all topics)
        </button>
      </div>

      <p className="mt-10 text-center text-xs text-muted">
        Progress is saved on this device · Soft pastel practice for AEIS P2 Math
      </p>
    </motion.div>
  )
}
