import { useMemo, useState, useCallback, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { buildSmartQuest } from '../world/adaptive/smartQuest'
import {
  recordAdaptiveResult,
  endAdaptiveSession,
  adaptiveSummary,
  listFragileSkills,
} from '../world/adaptive/learnerModel'
import Mascot, { pickLine } from '../components/Mascot'
import Celebration from '../components/Celebration'
import ShortAnswerInput from '../components/ShortAnswerInput'

export default function SmartQuestPage({ onGoHome }) {
  const [domain, setDomain] = useState(null) // math | english | mixed
  const [phase, setPhase] = useState('pick') // pick | run | done
  const [key, setKey] = useState(0)
  const [idx, setIdx] = useState(0)
  const [answers, setAnswers] = useState({})
  const [celebrate, setCelebrate] = useState(false)
  const [summary, setSummary] = useState(() => adaptiveSummary())

  const questions = useMemo(
    () => (domain ? buildSmartQuest({ domain, count: 10 }) : []),
    [domain, key]
  )
  const q = questions[idx]
  const fragile = listFragileSkills()

  const select = useCallback(
    (id, option) => {
      if (!q || answers[id] != null) return
      const ok =
        String(option).trim().toLowerCase() === String(q.correctAnswer).trim().toLowerCase()
      setAnswers((a) => ({ ...a, [id]: option }))
      recordAdaptiveResult(q.adaptiveSkill || q.skillId, ok)
      if (ok) {
        setCelebrate(true)
        setTimeout(() => setCelebrate(false), 800)
      }
    },
    [q, answers]
  )

  const correctCount = questions.filter(
    (item) =>
      answers[item.id] != null &&
      String(answers[item.id]).trim().toLowerCase() ===
        String(item.correctAnswer).trim().toLowerCase()
  ).length

  const finish = () => {
    endAdaptiveSession(6)
    setSummary(adaptiveSummary())
    setPhase('done')
  }

  return (
    <div
      className="min-h-screen overflow-x-hidden"
      style={{ background: 'linear-gradient(165deg, #E8F5E9 0%, #FFF3E0 45%, #E3F2FD 100%)' }}
    >
      <Celebration show={celebrate} seed={idx + correctCount} />
      <div className="max-w-lg mx-auto px-4 py-5 pb-20">
        <button type="button" onClick={onGoHome} className="pastel-btn px-3 py-2 bg-white text-sm mb-4 border border-black/5">
          ← Kingdom
        </button>

        <AnimatePresence mode="wait">
          {phase === 'pick' && (
            <motion.div key="pick" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
              <h1 className="text-3xl font-black text-ink mb-1">Smart Quest</h1>
              <p className="text-sm text-ink/70 mb-4">
                Adaptive practice — focuses on skills that need love, interleaved so learning sticks.
              </p>
              <Mascot
                mood="thinking"
                message={
                  fragile.length
                    ? `I’ll prioritise: ${fragile.slice(0, 2).join(', ')}…`
                    : 'I’ll mix skills so your brain stays flexible!'
                }
                className="mb-4"
              />
              {summary.overall != null && (
                <div className="pastel-card p-3 text-sm mb-4">
                  Overall adaptive accuracy: <strong>{summary.overall}%</strong>
                  {summary.tired && <span className="text-coral"> · Rest suggested soon</span>}
                </div>
              )}
              <div className="grid gap-3">
                {[
                  { id: 'math', emoji: '🧮', title: 'Math Smart Quest', blurb: 'Weak math skills first' },
                  { id: 'english', emoji: '🦊', title: 'English Smart Quest', blurb: 'Word Harbour adaptive mix' },
                  { id: 'mixed', emoji: '🌈', title: 'Mixed Smart Quest', blurb: 'Math + English interleaved' },
                ].map((d) => (
                  <button
                    key={d.id}
                    type="button"
                    className="pastel-card p-4 text-left island-card"
                    onClick={() => {
                      setDomain(d.id)
                      setKey((k) => k + 1)
                      setIdx(0)
                      setAnswers({})
                      setPhase('run')
                    }}
                  >
                    <div className="text-2xl mb-1">{d.emoji}</div>
                    <div className="font-bold text-ink">{d.title}</div>
                    <div className="text-xs text-muted">{d.blurb}</div>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {phase === 'run' && q && (
            <motion.div key={q.id} initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }}>
              <div className="flex justify-between text-xs text-muted mb-2">
                <span>
                  {idx + 1}/10 · adaptive
                </span>
                <span className="font-mono">{q.adaptiveSkill || q.skillId}</span>
              </div>
              <div className="h-2 rounded-full bg-white/70 mb-3 overflow-hidden">
                <div
                  className="h-full bg-success transition-all"
                  style={{ width: `${((idx + (answers[q.id] != null ? 1 : 0)) / 10) * 100}%` }}
                />
              </div>
              <div className="pastel-card p-4 mb-3">
                <p className="font-semibold text-ink whitespace-pre-line text-sm leading-relaxed">{q.question}</p>
              </div>
              {q.format === 'short_answer' ? (
                <ShortAnswerInput
                  question={q}
                  selectedAnswer={answers[q.id]}
                  onSelect={select}
                  disabled={answers[q.id] != null}
                />
              ) : (
                <div className="grid gap-2">
                  {(q.options || []).map((opt) => {
                    const answered = answers[q.id] != null
                    const isC = String(opt) === String(q.correctAnswer)
                    const sel = String(answers[q.id]) === String(opt)
                    let cls = 'option-btn w-full text-left px-4 py-3 rounded-xl border-2 text-sm font-medium '
                    if (!answered) cls += 'bg-white border-black/5'
                    else if (isC) cls += 'bg-mint/40 border-success'
                    else if (sel) cls += 'bg-coral/30 border-coral'
                    else cls += 'bg-white/40 border-transparent text-muted'
                    return (
                      <button key={opt} type="button" disabled={answered} onClick={() => select(q.id, opt)} className={cls}>
                        {opt}
                      </button>
                    )
                  })}
                </div>
              )}
              {answers[q.id] != null && (
                <div className="mt-4">
                  <Mascot
                    size="sm"
                    mood={
                      String(answers[q.id]).trim().toLowerCase() === String(q.correctAnswer).trim().toLowerCase()
                        ? 'happy'
                        : 'thinking'
                    }
                    message={
                      String(answers[q.id]).trim().toLowerCase() === String(q.correctAnswer).trim().toLowerCase()
                        ? pickLine('correct', idx)
                        : q.explanation || `Answer: ${q.correctAnswer}`
                    }
                  />
                  <button
                    type="button"
                    className="w-full mt-3 pastel-btn py-3 bg-ink text-white text-sm font-bold"
                    onClick={() => (idx >= questions.length - 1 ? finish() : setIdx((i) => i + 1))}
                  >
                    {idx >= questions.length - 1 ? 'Finish' : 'Next'}
                  </button>
                </div>
              )}
            </motion.div>
          )}

          {phase === 'done' && (
            <motion.div key="done" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center">
              <div className="text-5xl mb-2">🎯</div>
              <h2 className="text-2xl font-black text-ink mb-2">Smart Quest complete</h2>
              <p className="mb-3">
                {correctCount}/{questions.length} correct this run
              </p>
              <div className="pastel-card p-4 text-left text-sm mb-4">
                <p className="font-bold mb-1">Coach notes</p>
                <p>{summary.parentLine}</p>
                {summary.fragile?.length > 0 && (
                  <p className="mt-2 text-muted">Fragile skills: {summary.fragile.slice(0, 5).join(', ')}</p>
                )}
              </div>
              <button
                type="button"
                className="w-full pastel-btn py-3 bg-ink text-white font-bold mb-2"
                onClick={() => {
                  setKey((k) => k + 1)
                  setIdx(0)
                  setAnswers({})
                  setPhase('run')
                }}
              >
                Another Smart Quest
              </button>
              <button type="button" className="w-full pastel-btn py-3 bg-white border border-black/5 mb-2" onClick={() => setPhase('pick')}>
                Change domain
              </button>
              <button type="button" className="w-full pastel-btn py-3 bg-white border border-black/5" onClick={onGoHome}>
                Kingdom
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
