import { useState, useMemo, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import { shuffleQuestions } from '../utils/shuffle'
import { allMathQuestions, mathCategories } from '../data/mathQuestions'
import { recordMock } from '../utils/progress'
import Mascot, { pickLine } from '../components/Mascot'

const MOCK_SIZE = 25
const TIME_LIMIT_SEC = 25 * 60

export default function MockExamPage({ onGoHome }) {
  const [started, setStarted] = useState(false)
  const [timed, setTimed] = useState(true)
  const [secondsLeft, setSecondsLeft] = useState(TIME_LIMIT_SEC)
  const [answers, setAnswers] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [startTs] = useState(() => Date.now())

  const paper = useMemo(() => {
    // spread across categories
    const byCat = {}
    allMathQuestions.forEach((q) => {
      if (!byCat[q.category]) byCat[q.category] = []
      byCat[q.category].push(q)
    })
    const picks = []
    const cats = Object.keys(byCat)
    let i = 0
    while (picks.length < MOCK_SIZE && cats.length) {
      const cat = cats[i % cats.length]
      if (byCat[cat].length) {
        const idx = Math.floor(Math.random() * byCat[cat].length)
        picks.push(byCat[cat].splice(idx, 1)[0])
      } else {
        cats.splice(i % cats.length, 1)
        continue
      }
      i++
    }
    return shuffleQuestions(picks)
  }, [])

  const submit = useCallback(() => {
    if (submitted) return
    let correct = 0
    const byTopic = {}
    paper.forEach((q) => {
      const ok = answers[q.id] === q.correctAnswer
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
      durationSec: Math.round((Date.now() - startTs) / 1000),
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

  const correctCount = paper.filter((q) => answers[q.id] === q.correctAnswer).length
  const mm = String(Math.floor(secondsLeft / 60)).padStart(2, '0')
  const ss = String(secondsLeft % 60).padStart(2, '0')

  if (!started) {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="relative z-10 min-h-screen px-4 py-8 max-w-lg mx-auto">
        <button type="button" onClick={onGoHome} className="pastel-btn px-4 py-2 bg-white shadow-card text-sm mb-6 border border-black/5">
          ← Kingdom
        </button>
        <h1 className="text-3xl font-bold text-ink mb-2">AEIS-Style Mock</h1>
        <p className="text-muted mb-6">
          {MOCK_SIZE} mixed Math questions · Primary 1 topics · Optional 25-minute timer
        </p>
        <Mascot mood="encourage" message="Stay calm. Read each question carefully!" className="mb-6" />
        <label className="flex items-center gap-3 mb-6 text-ink">
          <input type="checkbox" checked={timed} onChange={(e) => setTimed(e.target.checked)} />
          Timed mode (25 minutes)
        </label>
        <button
          type="button"
          onClick={() => setStarted(true)}
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
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="relative z-10 min-h-screen px-4 py-8 max-w-lg mx-auto">
        <h1 className="text-2xl font-bold text-ink mb-2">Mock results</h1>
        <Mascot mood={scorePct >= 70 ? 'celebrate' : 'encourage'} message={pickLine('complete', correctCount)} className="mb-4" />
        <div className="pastel-card p-6 text-center mb-4">
          <div className="text-4xl font-bold text-success">{scorePct}%</div>
          <div className="text-muted">{correctCount} / {paper.length} correct</div>
        </div>
        <h2 className="font-bold text-ink mb-2">By topic</h2>
        <div className="space-y-2 mb-6">
          {mathCategories.map((c) => {
            const qs = paper.filter((q) => q.category === c.id)
            if (!qs.length) return null
            const ok = qs.filter((q) => answers[q.id] === q.correctAnswer).length
            return (
              <div key={c.id} className="pastel-card px-3 py-2 flex justify-between text-sm">
                <span>{c.icon} {c.name}</span>
                <span className="font-semibold">{ok}/{qs.length}</span>
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

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="relative z-10 min-h-screen px-4 py-6 pb-24 max-w-2xl mx-auto">
      <div className="sticky top-0 z-10 pastel-card px-4 py-3 mb-4 flex justify-between items-center">
        <span className="text-sm font-semibold text-ink">Mock exam</span>
        <span className={`font-mono font-bold ${secondsLeft < 60 && timed ? 'text-coral' : 'text-ink'}`}>
          {timed ? `${mm}:${ss}` : 'Untimed'}
        </span>
        <span className="text-sm text-muted">{Object.keys(answers).length}/{paper.length}</span>
      </div>

      <div className="space-y-4">
        {paper.map((q, i) => (
          <div key={q.id} className="pastel-card p-4">
            <p className="text-sm font-medium text-ink mb-3">
              <span className="text-muted mr-2">{i + 1}.</span>
              {q.question}
            </p>
            <div className="grid gap-2">
              {q.options.map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => setAnswers((a) => ({ ...a, [q.id]: opt }))}
                  className={`option-btn text-left px-3 py-2 rounded-xl border-2 text-sm ${
                    answers[q.id] === opt
                      ? 'border-ink bg-mint/40 font-semibold'
                      : 'border-black/5 bg-soft/40'
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-cream via-cream to-transparent">
        <button
          type="button"
          onClick={submit}
          className="w-full max-w-2xl mx-auto block pastel-btn py-4 bg-ink text-white font-bold"
        >
          Submit mock exam
        </button>
      </div>
    </motion.div>
  )
}
