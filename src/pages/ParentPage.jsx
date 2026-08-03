import { motion } from 'framer-motion'
import { mathCategories } from '../data/mathQuestions'
import {
  getActiveProfile,
  getTopicMastery,
  readinessScore,
  storyOfProgress,
  loadPrefs,
  savePrefs,
  applyPrefsToDocument,
  exportProfileJson,
  importProfileJson,
  createProfile,
  listProfiles,
  switchProfile,
} from '../utils/progress'
import { useState } from 'react'

export default function ParentPage({ onGoHome }) {
  const profile = getActiveProfile()
  const readiness = readinessScore()
  const story = storyOfProgress()
  const [prefs, setPrefs] = useState(() => loadPrefs())

  const updatePref = (key, value) => {
    const next = { ...prefs, [key]: value }
    setPrefs(next)
    savePrefs(next)
    applyPrefsToDocument(next)
  }

  const weak = profile.weakSkills || []
  const tips = weak.slice(0, 2).map((tid) => {
    const cat = mathCategories.find((c) => c.id === tid)
    return cat ? `Spend 5–10 minutes on ${cat.name} with real objects or drawings.` : null
  }).filter(Boolean)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="relative z-10 min-h-screen px-4 md:px-8 py-6 pb-16 max-w-3xl mx-auto"
    >
      <button type="button" onClick={onGoHome} className="pastel-btn px-4 py-2 bg-white shadow-card text-sm mb-4 border border-black/5">
        ← Kingdom
      </button>
      <h1 className="text-3xl font-bold text-ink mb-1">Parent dashboard</h1>
      <p className="text-muted mb-6">Progress stays on this device. No login required.</p>

      <div className="grid sm:grid-cols-3 gap-3 mb-6">
        <div className="pastel-card p-4 text-center">
          <div className="text-3xl font-bold text-success">{readiness}%</div>
          <div className="text-xs text-muted">AEIS Math readiness</div>
        </div>
        <div className="pastel-card p-4 text-center">
          <div className="text-3xl font-bold text-ink">{profile.streak || 0}</div>
          <div className="text-xs text-muted">Session streak</div>
        </div>
        <div className="pastel-card p-4 text-center">
          <div className="text-3xl font-bold text-ink">{profile.totalAttempted || 0}</div>
          <div className="text-xs text-muted">Questions tried</div>
        </div>
      </div>

      <div className="pastel-card p-4 mb-6">
        <h2 className="font-bold text-ink mb-2">Story of progress</h2>
        <p className="text-sm text-ink leading-relaxed">{story}</p>
      </div>

      <h2 className="font-bold text-ink mb-2">Mastery heat-map</h2>
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 mb-6">
        {mathCategories.map((c) => {
          const m = getTopicMastery(c.id)
          const bg =
            m == null ? 'bg-soft' : m >= 80 ? 'bg-mint' : m >= 50 ? 'bg-butter' : 'bg-coral/50'
          return (
            <div key={c.id} className={`pastel-card p-2 ${bg}`}>
              <div className="text-lg">{c.icon}</div>
              <div className="text-[10px] font-semibold text-ink leading-tight">{c.name}</div>
              <div className="text-xs font-bold text-ink">{m == null ? '—' : `${m}%`}</div>
            </div>
          )
        })}
      </div>

      <div className="pastel-card p-4 mb-6">
        <h2 className="font-bold text-ink mb-2">What to do at home (≤10 min)</h2>
        {tips.length === 0 ? (
          <p className="text-sm text-muted">Keep mixed practice going — you are on track.</p>
        ) : (
          <ul className="list-disc pl-5 text-sm text-ink space-y-1">
            {tips.map((t, i) => (
              <li key={i}>{t}</li>
            ))}
          </ul>
        )}
      </div>

      {(profile.mockHistory || []).length > 0 && (
        <div className="pastel-card p-4 mb-6">
          <h2 className="font-bold text-ink mb-2">Recent mocks</h2>
          {(profile.mockHistory || []).slice(0, 5).map((m, i) => (
            <div key={i} className="flex justify-between text-sm py-1 border-b border-black/5 last:border-0">
              <span className="text-muted">{new Date(m.date).toLocaleDateString()}</span>
              <span className="font-semibold text-ink">{m.scorePct}%</span>
            </div>
          ))}
        </div>
      )}

      <div className="pastel-card p-4 mb-6 print:hidden">
        <h2 className="font-bold text-ink mb-3">Accessibility</h2>
        <div className="space-y-2 text-sm">
          {[
            ['highContrast', 'High contrast'],
            ['reducedMotion', 'Reduced motion'],
            ['dyslexiaFont', 'Dyslexia-friendly font'],
          ].map(([k, label]) => (
            <label key={k} className="flex gap-2 items-center">
              <input type="checkbox" checked={!!prefs[k]} onChange={(e) => updatePref(k, e.target.checked)} />
              {label}
            </label>
          ))}
        </div>
      </div>

      <div className="pastel-card p-4 mb-4 print:hidden">
        <h2 className="font-bold text-ink mb-2">Profiles on this device</h2>
        <div className="flex flex-wrap gap-2 mb-3">
          {listProfiles().map((pr) => (
            <button
              key={pr.id}
              type="button"
              onClick={() => { switchProfile(pr.id); window.location.reload() }}
              className="pastel-btn px-3 py-1.5 bg-soft text-ink text-xs border border-black/5"
            >
              {pr.name}
            </button>
          ))}
          <button
            type="button"
            onClick={() => {
              const n = window.prompt('Name for new profile', 'Learner')
              if (n) { createProfile(n); window.location.reload() }
            }}
            className="pastel-btn px-3 py-1.5 bg-mint/50 text-ink text-xs"
          >
            + Add profile
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => {
              const blob = new Blob([exportProfileJson()], { type: 'application/json' })
              const a = document.createElement('a')
              a.href = URL.createObjectURL(blob)
              a.download = 'aeis-progress.json'
              a.click()
            }}
            className="pastel-btn px-3 py-2 bg-white border border-black/10 text-xs"
          >
            Export progress
          </button>
          <label className="pastel-btn px-3 py-2 bg-white border border-black/10 text-xs cursor-pointer">
            Import progress
            <input
              type="file"
              accept="application/json"
              className="hidden"
              onChange={(e) => {
                const f = e.target.files?.[0]
                if (!f) return
                const reader = new FileReader()
                reader.onload = () => {
                  if (importProfileJson(String(reader.result))) window.location.reload()
                  else alert('Could not import that file')
                }
                reader.readAsText(f)
              }}
            />
          </label>
        </div>
      </div>

      <button
        type="button"
        onClick={() => window.print()}
        className="pastel-btn px-5 py-3 bg-ink text-white text-sm print:hidden"
      >
        Print / Save progress report
      </button>
    </motion.div>
  )
}
