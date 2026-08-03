import { useMemo, useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { mathCategories, getTotalMathQuestionCount } from '../data/mathQuestions'
import { categories, getTotalQuestionCount } from '../data/questions'
import Mascot, { pickLine } from '../components/Mascot'
import MathKingdomMap from '../components/MathKingdomMap'
import {
  getActiveProfile,
  getTopicMastery,
  loadPrefs,
  savePrefs,
  applyPrefsToDocument,
  getDueTopics,
  readinessScore,
} from '../utils/progress'

const PASTEL_ISLAND = [
  'bg-sky/40', 'bg-mint/50', 'bg-peach/50', 'bg-butter/60', 'bg-coral/40',
  'bg-sky/30', 'bg-mint/40', 'bg-peach/40', 'bg-butter/50', 'bg-coral/30',
]

export default function HomePage({ onStartQuiz, onTeach, onMock, onReview, onParent }) {
  const [activeSubject, setActiveSubject] = useState('math')
  const [profile, setProfile] = useState(null)
  const [showSettings, setShowSettings] = useState(false)
  const [prefs, setPrefs] = useState(() => loadPrefs())
  const dueCount = getDueTopics().length
  const readiness = readinessScore()

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
    return mathCategories.find((c) => c.id === id) || null
  }, [profile])

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
      className="relative z-10 min-h-screen px-4 md:px-8 lg:px-12 py-6 pb-20"
    >
      <div className="flex items-start justify-between gap-4 mb-4">
        <div>
          <p className="text-sm font-semibold text-muted uppercase tracking-wide">AEIS Primary · Math Ready</p>
          <h1 className="text-3xl md:text-4xl font-bold text-ink mt-1">Math Kingdom</h1>
          <p className="text-muted mt-1 text-sm">Learn · Practise · Mock · Grow</p>
        </div>
        <button
          type="button"
          onClick={() => setShowSettings((s) => !s)}
          className="pastel-btn px-3 py-2 bg-white shadow-card text-ink text-sm border border-black/5"
        >
          Settings
        </button>
      </div>

      {showSettings && (
        <div className="pastel-card p-4 mb-4 max-w-md">
          <h3 className="font-bold text-ink mb-3">Accessibility</h3>
          <div className="space-y-2 text-sm">
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
                />
                {label}
              </label>
            ))}
          </div>
        </div>
      )}

      <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
        <Mascot mood="happy" size="lg" message={pickLine('welcome', profile?.totalAttempted || 0)} />
        <div className="flex flex-wrap gap-2">
          <div className="pastel-card px-3 py-2 text-center min-w-[72px]">
            <div className="text-lg font-bold text-ink">{currentTotal}+</div>
            <div className="text-[10px] text-muted">Questions</div>
          </div>
          <div className="pastel-card px-3 py-2 text-center min-w-[72px]">
            <div className="text-lg font-bold text-success">{readiness}%</div>
            <div className="text-[10px] text-muted">Readiness</div>
          </div>
          <div className="pastel-card px-3 py-2 text-center min-w-[72px]">
            <div className="text-lg font-bold text-ink">{overallPct != null ? `${overallPct}%` : '—'}</div>
            <div className="text-[10px] text-muted">Accuracy</div>
          </div>
          <div className="pastel-card px-3 py-2 text-center min-w-[72px]">
            <div className="text-lg font-bold text-ink">{profile?.streak || 0}</div>
            <div className="text-[10px] text-muted">Streak</div>
          </div>
        </div>
      </div>

      {/* Main action hub */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        <button type="button" onClick={onMock} className="pastel-card p-4 text-left island-card border-2 border-ink/10">
          <div className="text-2xl mb-1">📋</div>
          <div className="font-bold text-ink text-sm">Mock Exam</div>
          <div className="text-xs text-muted">Timed AEIS-style paper</div>
        </button>
        <button type="button" onClick={onReview} className="pastel-card p-4 text-left island-card border-2 border-mint/50">
          <div className="text-2xl mb-1">🌸</div>
          <div className="font-bold text-ink text-sm">Review Garden</div>
          <div className="text-xs text-muted">{dueCount ? `${dueCount} due today` : 'Spaced review'}</div>
        </button>
        <button
          type="button"
          onClick={() => onTeach(weakTopic?.id || 'numbersTo100')}
          className="pastel-card p-4 text-left island-card border-2 border-peach/50"
        >
          <div className="text-2xl mb-1">📚</div>
          <div className="font-bold text-ink text-sm">Teach Me First</div>
          <div className="text-xs text-muted">CPA concept lessons</div>
        </button>
        <button type="button" onClick={onParent} className="pastel-card p-4 text-left island-card border-2 border-sky/50">
          <div className="text-2xl mb-1">👨‍👩‍👧</div>
          <div className="font-bold text-ink text-sm">Parents</div>
          <div className="text-xs text-muted">Progress & tips</div>
        </button>
      </div>

      {weakTopic && isMath && (
        <button
          type="button"
          onClick={() => onStartQuiz(weakTopic.id, 'math')}
          className="w-full md:w-auto mb-6 pastel-card px-5 py-4 flex items-center gap-4 text-left border-2 border-mint/60"
        >
          <span className="text-3xl">🎯</span>
          <div>
            <div className="text-xs font-semibold text-success uppercase tracking-wide">Today&apos;s Quest</div>
            <div className="font-bold text-ink">Practise {weakTopic.name}</div>
          </div>
        </button>
      )}

      <div className="flex gap-2 mb-4">
        <button
          type="button"
          onClick={() => setActiveSubject('math')}
          className={`pastel-btn px-5 py-2 text-sm ${isMath ? 'bg-ink text-white' : 'bg-white text-ink border border-black/5'}`}
        >
          Math Kingdom
        </button>
        <button
          type="button"
          onClick={() => setActiveSubject('english')}
          className={`pastel-btn px-5 py-2 text-sm ${!isMath ? 'bg-ink text-white' : 'bg-white text-ink border border-black/5'}`}
        >
          English (bonus)
        </button>
      </div>

      <h2 className="text-lg font-bold text-ink mb-3">{isMath ? 'Explore the Math Kingdom map' : 'English topics'}</h2>
      {isMath ? (
        <div className="mb-4">
          <MathKingdomMap onSelectTopic={(id) => onStartQuiz(id, 'math')} onTeach={onTeach} />
        </div>
      ) : (
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {currentCategories.map((cat, i) => {
          return (
            <div key={cat.id} className={`island-card pastel-card p-3 ${PASTEL_ISLAND[i % PASTEL_ISLAND.length]}`}>
              <button type="button" onClick={() => onStartQuiz(cat.id, 'english')} className="w-full text-left">
                <div className="text-2xl mb-1">{cat.icon}</div>
                <div className="font-bold text-ink text-xs leading-snug">{cat.name}</div>
                <div className="text-[10px] text-muted">{cat.count} q</div>
              </button>
            </div>
          )
        })}
      </div>
      )}

      <div className="mt-6">
        <button
          type="button"
          onClick={() => onStartQuiz('all', isMath ? 'math' : 'english')}
          className="pastel-btn px-6 py-3 bg-ink text-white text-sm shadow-soft"
        >
          Mixed practice (all topics)
        </button>
      </div>

      <p className="mt-10 text-center text-xs text-muted">
        Progress saved on this device · AEIS P2 Math preparation
      </p>
    </motion.div>
  )
}
