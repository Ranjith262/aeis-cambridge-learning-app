import { useState, useMemo, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import { shuffleQuestions } from '../utils/shuffle'
import { allMathQuestions, mathCategories } from '../data/mathQuestions'
import { recordMock } from '../utils/progress'
import { toShortAnswer } from '../utils/shortAnswer'
import Mascot, { pickLine } from '../components/Mascot'
import ShortAnswerInput from '../components/ShortAnswerInput'

/** AEIS-style composition: 29 MCQ + 17 short-answer */
const MCQ_COUNT = 29
const SA_COUNT = 17
const TIME_LIMIT_SEC = 30 * 60 // 30 min for combined paper feel

function buildPaper() {
  const byCat = {}
  allMathQuestions.forEach((q) => {
    if (!byCat[q.category]) byCat[q.category] = []
    byCat[q.category].push({ ...q })
  })
  const cats = Object.keys(byCat)
  const pickAcross = (n, preferNumericSa = false) => {
    const picks = []
    let i = 0
    const pool = cats.map((c) => [...(byCat[c] || [])])
    while (picks.length < n) {
      let found = false
      for (let t = 0; t < cats.length && picks.length < n; t++) {
        const idx = (i + t) % cats.length
        const arr = pool[idx]
        if (!arr.length) continue
        // prefer items with numeric answers for SA
        let qIdx = 0
        if (preferNumericSa) {
          const ni = arr.findIndex((q) => /^\$?\d+/.test(String(q.correctAnswer)))
          qIdx = ni >= 0 ? ni : 0
        }
        const [q] = arr.splice(qIdx, 1)
        picks.push(q)
        found = true
      }
      if (!found) break
      i++
    }
    return picks
  }

  const mcq = pickAcross(MCQ_COUNT, false).map((q) => ({ ...q, format: 'mcq' }))
  const saRaw = pickAcross(SA_COUNT, true)
  const sa = saRaw.map((q) => {
    const converted = toShortAnswer(q)
    return converted || { ...q, format: 'short_answer', id: `sa_${q.id}`, options: undefined }
  })

  // Part 1 MCQ then Part 2 SA (still shuffle within parts for non-fixed order)
  return [...shuffleQuestions(mcq), ...shuffleQuestions(sa)]
}

export default function MockExamPage({ onGoHome }) {
  const [started, setStarted] = useState(false)
  const [timed, setTimed] = useState(true)
  const [secondsLeft, setSecondsLeft] = useState(TIME_LIMIT_SEC)
  const [answers, setAnswers] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [startTs, setStartTs] = useState(null)

  const paper = useMemo(() => buildPaper(), [])
  const mcqPart = paper.filter((q) => q.format !== 'short_answer')
  const saPart = paper.filter((q) => q.format === 'short_answer')

  const normalize = (a, b) =>
    String(a ?? '')
      .trim()
      .toLowerCase() ===
    String(b ?? '')
      .trim()
      .toLowerCase()

  const submit = useCallback(() => {
    if (submitted) return
    let correct = 0
    const byTopic = {}
    paper.forEach((q) => {
      const ok = normalize(answers[q.id], q.correctAnswer)
      if (ok) correct++
      if (!byTopic[q.category]) byTopic[q.category] = { correct: 0, total: 0 }
      byTopic[q.category].total++
      if (ok) byTopic[q.category].correct++
    })
    const scorePct = paper.length ? Math.round((correct / paper.length) * 100) : 0
    recordMock({
      scorePct,
      correct,
      total: paper.length,
      byTopic,
      durationSec: startTs ? Math.round((Date.now() - startTs) / 1000) : 0,
    })
    setSubmitted(true)
  }, [answers, paper, startTs, submitted])

  useEffect(() => {
    if (!started || !timed || submitted) return
    if (secondsLeft <= 0) {
      submit()
      return
    }
    const t = setTimeout(() => setSecondsLeft((s) => s - 1), 1000)
    return () => clearTimeout(t)
  }, [started, timed, secondsLeft, submitted, submit])

  const correctCount = paper.filter((q) => normalize(answers[q.id], q.correctAnswer)).length
  const mm = String(Math.floor(secondsLeft / 60)).padStart(2, '0')
  const ss = String(secondsLeft % 60).padStart(2, '0')

  if (!started) {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="relative z-10 min-h-screen px-4 py-8 max-w-lg mx-auto">
        <button type="button" onClick={onGoHome} className="pastel-btn px-4 py-2 bg-white shadow-card text-sm mb-6 border border-black/5">
          ← Kingdom
        </button>
        <h1 className="text-3xl font-bold text-ink mb-2">AEIS-Style Mock Paper</h1>
        <p className="text-muted mb-2">
          <strong>{MCQ_COUNT} multiple-choice</strong> + <strong>{SA_COUNT} short-answer</strong> questions
        </p>
        <p className="text-muted text-sm mb-6">
          Mixed Primary 1 Math topics · Optional 30-minute timer · Randomised each attempt
        </p>
        <Mascot mood="encourage" message="Read carefully. Show working on short answers if you can!" className="mb-6" />
        <label className="flex items-center gap-3 mb-6 text-ink">
          <input type="checkbox" checked={timed} onChange={(e) => setTimed(e.target.checked)} />
          Timed mode (30 minutes)
        </label>
        <button
          type="button"
          onClick={() => {
            setStartTs(Date.now())
            setStarted(true)
          }}
          className="w-full pastel-btn py-4 bg-ink text-white font-bold"
        >
          Start mock exam
        </button>
      </motion.div>
    )
  }

  if (submitted) {
    const scorePct = paper.length ? Math.round((correctCount / paper.length) * 100) : 0
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="relative z-10 min-h-screen px-4 py-8 max-w-lg mx-auto pb-16">
        <h1 className="text-2xl font-bold text-ink mb-2">Mock results</h1>
        <Mascot mood={scorePct >= 70 ? 'celebrate' : 'encourage'} message={pickLine('complete', correctCount)} className="mb-4" />
        <div className="pastel-card p-6 text-center mb-4">
          <div className="text-4xl font-bold text-success">{scorePct}%</div>
          <div className="text-muted">
            {correctCount} / {paper.length} correct
          </div>
          <div className="text-xs text-muted mt-1">
            MCQ {mcqPart.filter((q) => normalize(answers[q.id], q.correctAnswer)).length}/{mcqPart.length} · SA{' '}
            {saPart.filter((q) => normalize(answers[q.id], q.correctAnswer)).length}/{saPart.length}
          </div>
        </div>
        <h2 className="font-bold text-ink mb-2">By topic</h2>
        <div className="space-y-2 mb-6">
          {mathCategories.map((c) => {
            const qs = paper.filter((q) => q.category === c.id)
            if (!qs.length) return null
            const ok = qs.filter((q) => normalize(answers[q.id], q.correctAnswer)).length
            return (
              <div key={c.id} className="pastel-card px-3 py-2 flex justify-between text-sm">
                <span>
                  {c.icon} {c.name}
                </span>
                <span className="font-semibold">
                  {ok}/{qs.length}
                </span>
              </div>
            )
          })}
        </div>
        <button type="button" onClick={onGoHome} className="w-full pastel-btn py-3 bg-ink text-white">
          Back to Kingdom
        </button>
      </motion.div>
    )
  }

  const renderQuestion = (q, displayNum) => (
    <div key={q.id} className="pastel-card p-4">
      <p className="text-sm font-medium text-ink mb-3">
        <span className="text-muted mr-2">{displayNum}.</span>
        {q.question}
        {q.format === 'short_answer' && (
          <span className="ml-2 text-[10px] font-bold uppercase bg-butter px-1.5 py-0.5 rounded">Short answer</span>
        )}
      </p>
      {q.format === 'short_answer' ? (
        <ShortAnswerInput
          question={q}
          selectedAnswer={answers[q.id]}
          onSelect={(id, val) => setAnswers((a) => ({ ...a, [id]: val }))}
          disabled={false}
        />
      ) : (
        <div className="grid gap-2">
          {(q.options || []).map((opt) => (
            <button
              key={opt}
              type="button"
              onClick={() => setAnswers((a) => ({ ...a, [q.id]: opt }))}
              className={`option-btn text-left px-3 py-2 rounded-xl border-2 text-sm ${
                answers[q.id] === opt ? 'border-ink bg-mint/40 font-semibold' : 'border-black/5 bg-soft/40'
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  )

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="relative z-10 min-h-screen px-4 py-6 pb-28 max-w-2xl mx-auto">
      <div className="sticky top-0 z-10 pastel-card px-4 py-3 mb-4 flex justify-between items-center">
        <span className="text-sm font-semibold text-ink">Mock · 29 MCQ + 17 SA</span>
        <span className={`font-mono font-bold ${secondsLeft < 60 && timed ? 'text-coral' : 'text-ink'}`}>
          {timed ? `${mm}:${ss}` : 'Untimed'}
        </span>
        <span className="text-sm text-muted">
          {Object.keys(answers).length}/{paper.length}
        </span>
      </div>

      <h2 className="font-bold text-ink mb-2">Part 1 — Multiple choice</h2>
      <div className="space-y-4 mb-8">{mcqPart.map((q, i) => renderQuestion(q, i + 1))}</div>

      <h2 className="font-bold text-ink mb-2">Part 2 — Short answers</h2>
      <p className="text-xs text-muted mb-3">Type the answer. Working is optional but helpful.</p>
      <div className="space-y-4">{saPart.map((q, i) => renderQuestion(q, mcqPart.length + i + 1))}</div>

      <div className="fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-cream via-cream to-transparent">
        <button type="button" onClick={submit} className="w-full max-w-2xl mx-auto block pastel-btn py-4 bg-ink text-white font-bold">
          Submit mock exam
        </button>
      </div>
    </motion.div>
  )
}
