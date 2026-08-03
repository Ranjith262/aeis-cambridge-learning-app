import { useState, useMemo, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { buildCraftMockPaper, diagnosePaper, MCQ_COUNT, SA_COUNT } from '../world/adaptive/mockPaper'
import { recordMock } from '../utils/progress'
import { recordAdaptiveResult, endAdaptiveSession } from '../world/adaptive/learnerModel'
import Mascot from '../components/Mascot'
import ShortAnswerInput from '../components/ShortAnswerInput'

const TIME_LIMIT_SEC = 30 * 60

function formatTime(sec) {
  const m = Math.floor(sec / 60)
  const s = sec % 60
  return `${m}:${String(s).padStart(2, '0')}`
}

/**
 * Phase 5 — Mock as craft
 * Solemn exam mode: no teaching mid-paper, timed optional, diagnostic re-entry paths.
 */
export default function MockExamPage({ onGoHome, onOpenWorld, onStartQuiz, onSmartQuest }) {
  const [paperKey, setPaperKey] = useState(0)
  const [started, setStarted] = useState(false)
  const [timed, setTimed] = useState(true)
  const [secondsLeft, setSecondsLeft] = useState(TIME_LIMIT_SEC)
  const [answers, setAnswers] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [startTs, setStartTs] = useState(null)
  const [diag, setDiag] = useState(null)
  const [part, setPart] = useState('mcq') // mcq | sa

  const { mcq, sa, all } = useMemo(() => buildCraftMockPaper(), [paperKey])
  const paper = all
  const visible = part === 'mcq' ? mcq : sa

  useEffect(() => {
    if (!started || !timed || submitted) return
    if (secondsLeft <= 0) {
      submit()
      return
    }
    const t = setTimeout(() => setSecondsLeft((s) => s - 1), 1000)
    return () => clearTimeout(t)
  }, [started, timed, secondsLeft, submitted]) // eslint-disable-line react-hooks/exhaustive-deps

  const normalize = (a, b) =>
    String(a ?? '')
      .trim()
      .toLowerCase() ===
    String(b ?? '')
      .trim()
      .toLowerCase()

  const submit = useCallback(() => {
    if (submitted) return
    const result = diagnosePaper(paper, answers)
    paper.forEach((q) => {
      const ok = normalize(answers[q.id], q.correctAnswer)
      if (q.skillId) recordAdaptiveResult(q.skillId, ok)
    })
    recordMock({
      scorePct: result.scorePct,
      correct: result.correct,
      total: result.total,
      byTopic: result.byTopic,
      durationSec: startTs ? Math.round((Date.now() - startTs) / 1000) : 0,
    })
    endAdaptiveSession(Math.max(5, startTs ? Math.round((Date.now() - startTs) / 60000) : 15))
    setDiag(result)
    setSubmitted(true)
  }, [answers, paper, startTs, submitted])

  const start = () => {
    setAnswers({})
    setSubmitted(false)
    setDiag(null)
    setSecondsLeft(TIME_LIMIT_SEC)
    setStartTs(Date.now())
    setPart('mcq')
    setStarted(true)
  }

  const answeredCount = Object.keys(answers).length

  // —— Pre-exam temple ——
  if (!started) {
    return (
      <div className="min-h-screen overflow-x-clip bg-[#F7F5F0] px-4 py-8">
        <div className="max-w-lg mx-auto">
          <button type="button" onClick={onGoHome} className="text-sm text-ink/60 mb-6">
            ← Kingdom
          </button>
          <div className="text-center mb-8">
            <div className="text-5xl mb-3">🏛️</div>
            <h1 className="text-3xl font-black text-ink tracking-tight">Mock Exam Hall</h1>
            <p className="text-sm text-ink/60 mt-2 leading-relaxed">
              A calm, fair practice paper — like the real AEIS math mood.
              <br />
              No hints during the paper. Feedback comes after you submit.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-black/5 shadow-sm p-5 mb-4 text-sm text-ink space-y-2">
            <p>
              <strong>Part A</strong> — {MCQ_COUNT} multiple choice
            </p>
            <p>
              <strong>Part B</strong> — {SA_COUNT} short answers
            </p>
            <p>
              <strong>Time</strong> — {TIME_LIMIT_SEC / 60} minutes recommended (optional timer)
            </p>
            <p className="text-ink/50 text-xs pt-2">Paper is freshly generated every attempt. Teaching islands unlock after results.</p>
          </div>

          <label className="flex items-center gap-2 text-sm text-ink mb-6 cursor-pointer">
            <input type="checkbox" checked={timed} onChange={(e) => setTimed(e.target.checked)} className="rounded" />
            Use countdown timer
          </label>

          <button type="button" onClick={start} className="w-full py-4 rounded-full bg-ink text-white font-bold text-base shadow-md">
            Begin mock paper
          </button>
          {onSmartQuest && (
            <button
              type="button"
              onClick={onSmartQuest}
              className="w-full mt-3 py-3 rounded-full bg-white border border-black/10 text-sm font-semibold text-ink"
            >
              Warm up with Smart Quest first
            </button>
          )}
        </div>
      </div>
    )
  }

  // —— Results + remediation ——
  if (submitted && diag) {
    const readinessLabel = {
      strong: 'Strong readiness',
      building: 'Building readiness',
      emerging: 'Emerging — keep practising',
      needs_support: 'Needs guided support',
    }[diag.readiness]

    return (
      <div className="min-h-screen overflow-x-clip bg-[#F7F5F0] px-4 py-8 pb-20">
        <div className="max-w-lg mx-auto">
          <h1 className="text-2xl font-black text-ink mb-1">Results</h1>
          <p className="text-sm text-ink/60 mb-4">Mock complete — here is your map forward</p>

          <div className="bg-white rounded-2xl border border-black/5 p-6 text-center mb-4">
            <div className="text-5xl font-black text-ink">{diag.scorePct}%</div>
            <p className="text-sm text-ink/70 mt-1">
              {diag.correct} / {diag.total} correct
            </p>
            <p className="text-xs font-bold uppercase tracking-wide text-success mt-3">{readinessLabel}</p>
          </div>

          <div className="bg-white rounded-2xl border border-black/5 p-4 mb-4">
            <h2 className="font-bold text-ink mb-2">Recommended islands</h2>
            <p className="text-xs text-ink/50 mb-3">Start with the weakest topics — re-watch the story, then practise.</p>
            <div className="space-y-2">
              {diag.weakTopics.slice(0, 4).map((t) => (
                <div key={t.id} className="flex items-center justify-between gap-2 rounded-xl bg-[#F7F5F0] px-3 py-2">
                  <div>
                    <div className="text-sm font-semibold text-ink">{t.remediation?.label || t.id}</div>
                    <div className="text-[10px] text-ink/50">
                      {t.correct}/{t.total} · {Math.round(t.accuracy * 100)}%
                    </div>
                  </div>
                  {t.remediation?.world && onOpenWorld ? (
                    <button
                      type="button"
                      className="text-xs font-bold px-3 py-1.5 rounded-full bg-ink text-white"
                      onClick={() => onOpenWorld(t.remediation.world)}
                    >
                      Open island
                    </button>
                  ) : t.remediation?.quiz && onStartQuiz ? (
                    <button
                      type="button"
                      className="text-xs font-bold px-3 py-1.5 rounded-full bg-ink text-white"
                      onClick={() => onStartQuiz(t.remediation.quiz, 'math')}
                    >
                      Practise
                    </button>
                  ) : null}
                </div>
              ))}
            </div>
          </div>

          <Mascot
            mood={diag.scorePct >= 70 ? 'happy' : 'encourage'}
            message={
              diag.scorePct >= 80
                ? 'Excellent composure. Keep skills warm with short Smart Quests.'
                : 'A mock is a map, not a judgement. Visit the islands that need you.'
            }
            className="mb-4"
          />

          <button
            type="button"
            className="w-full py-3 rounded-full bg-ink text-white font-bold mb-2"
            onClick={() => {
              setPaperKey((k) => k + 1)
              setStarted(false)
              setSubmitted(false)
              setDiag(null)
              setAnswers({})
            }}
          >
            New mock paper
          </button>
          {onSmartQuest && (
            <button type="button" onClick={onSmartQuest} className="w-full py-3 rounded-full bg-white border border-black/10 font-semibold text-sm mb-2">
              Adaptive Smart Quest
            </button>
          )}
          <button type="button" onClick={onGoHome} className="w-full py-3 rounded-full bg-white border border-black/10 text-sm">
            Kingdom
          </button>
        </div>
      </div>
    )
  }

  // —— In-paper ——
  return (
    <div className="min-h-screen overflow-x-clip bg-[#F7F5F0] px-4 py-4 pb-28">
      <div className="max-w-lg mx-auto">
        <div className="flex items-center justify-between mb-3 sticky top-0 bg-[#F7F5F0]/95 py-2 z-20">
          <span className="text-xs font-bold uppercase tracking-wide text-ink/50">Mock · quiet mode</span>
          {timed ? (
            <span className={`font-mono text-sm font-bold ${secondsLeft < 120 ? 'text-coral' : 'text-ink'}`}>
              {formatTime(secondsLeft)}
            </span>
          ) : (
            <span className="text-xs text-ink/40">Untimed</span>
          )}
        </div>

        <div className="flex gap-2 mb-4">
          <button
            type="button"
            onClick={() => setPart('mcq')}
            className={`flex-1 py-2 rounded-full text-xs font-bold ${part === 'mcq' ? 'bg-ink text-white' : 'bg-white text-ink border border-black/10'}`}
          >
            Part A · MCQ ({mcq.filter((q) => answers[q.id] != null).length}/{mcq.length})
          </button>
          <button
            type="button"
            onClick={() => setPart('sa')}
            className={`flex-1 py-2 rounded-full text-xs font-bold ${part === 'sa' ? 'bg-ink text-white' : 'bg-white text-ink border border-black/10'}`}
          >
            Part B · SA ({sa.filter((q) => answers[q.id] != null).length}/{sa.length})
          </button>
        </div>

        <p className="text-[10px] text-ink/40 mb-3">
          Answered {answeredCount}/{paper.length} · No teaching during the paper
        </p>

        <div className="space-y-4">
          {visible.map((q, i) => {
            const num = part === 'mcq' ? i + 1 : mcq.length + i + 1
            return (
              <div key={q.id} className="bg-white rounded-xl border border-black/5 p-4">
                <p className="text-xs font-bold text-ink/40 mb-1">Q{num}</p>
                <p className="text-sm font-medium text-ink mb-3 leading-relaxed">{q.question}</p>
                {q.format === 'short_answer' ? (
                  <ShortAnswerInput
                    question={q}
                    selectedAnswer={answers[q.id]}
                    onSelect={(id, val) => setAnswers((a) => ({ ...a, [id]: val }))}
                    disabled={false}
                    hideFeedback
                  />
                ) : (
                  <div className="grid gap-2">
                    {(q.options || []).map((opt) => {
                      const sel = String(answers[q.id]) === String(opt)
                      return (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => setAnswers((a) => ({ ...a, [q.id]: opt }))}
                          className={`text-left px-3 py-2.5 rounded-lg border text-sm ${
                            sel ? 'border-ink bg-ink/5 font-semibold' : 'border-black/10 bg-white'
                          }`}
                        >
                          {opt}
                        </button>
                      )
                    })}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-white/95 border-t border-black/5 p-3 z-30">
        <div className="max-w-lg mx-auto flex gap-2">
          <button
            type="button"
            onClick={() => {
              if (window.confirm('Submit mock paper? You cannot change answers after.')) submit()
            }}
            className="flex-1 py-3 rounded-full bg-ink text-white font-bold text-sm"
          >
            Submit paper
          </button>
        </div>
      </div>
    </div>
  )
}
