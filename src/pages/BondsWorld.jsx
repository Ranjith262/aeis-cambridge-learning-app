import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { generateBondSession } from '../world/bonds/bondsGenerator'
import { TenFrame } from '../components/manipulatives'
import Mascot, { pickLine } from '../components/Mascot'
import Celebration from '../components/Celebration'
import ShortAnswerInput from '../components/ShortAnswerInput'

export default function BondsWorld({ onGoHome }) {
  const [phase, setPhase] = useState('intro')
  const [key, setKey] = useState(0)
  const [idx, setIdx] = useState(0)
  const [answers, setAnswers] = useState({})
  const [cele, setCele] = useState(false)
  const questions = useMemo(() => generateBondSession(8), [key])
  const q = questions[idx]

  const select = (id, val) => {
    if (answers[id] != null) return
    const ok = String(val).trim() === String(q.correctAnswer).trim() || String(val) === String(q.correctAnswer)
    setAnswers((a) => ({ ...a, [id]: val }))
    if (ok) {
      setCele(true)
      setTimeout(() => setCele(false), 800)
    }
  }

  const correct = questions.filter((item) => {
    const a = answers[item.id]
    return a != null && String(a).trim() === String(item.correctAnswer).trim()
  }).length

  return (
    <div className="min-h-screen overflow-x-hidden px-4 py-5 pb-20" style={{ background: 'linear-gradient(160deg,#F3E5F5,#E8F5E9,#FFF8E1)' }}>
      <Celebration show={cele} seed={idx} />
      <div className="max-w-lg mx-auto">
        <button type="button" onClick={onGoHome} className="pastel-btn px-3 py-2 bg-white text-sm mb-4 border border-black/5">← Kingdom</button>

        {phase === 'intro' && (
          <div className="text-center">
            <div className="text-6xl mb-3">🔗</div>
            <h1 className="text-3xl font-black text-ink mb-2">Number Bonds Island</h1>
            <p className="text-sm text-ink/70 mb-4">Friends that join to make 10 or 20 — the secret of fast addition.</p>
            <Mascot mood="happy" message="7 and 3 are best friends. Together they make 10!" className="justify-center mb-4" />
            <TenFrame filled={7} label="Example: 7 on a ten-frame" />
            <button type="button" onClick={() => setPhase('practice')} className="w-full mt-6 pastel-btn py-4 bg-ink text-white font-bold">
              Start bond practice
            </button>
          </div>
        )}

        {phase === 'practice' && q && (
          <div>
            <p className="text-xs text-muted mb-2">{idx + 1}/{questions.length}</p>
            {q.cinema && <TenFrame filled={q.cinema.part} label={`Part: ${q.cinema.part} · Whole: ${q.cinema.whole}`} />}
            <div className="pastel-card p-4 my-3 font-semibold text-ink">{q.question}</div>
            {q.format === 'short_answer' ? (
              <ShortAnswerInput question={q} selectedAnswer={answers[q.id]} onSelect={select} disabled={answers[q.id] != null} />
            ) : (
              <div className="grid gap-2">
                {(q.options || []).map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    disabled={answers[q.id] != null}
                    onClick={() => select(q.id, opt)}
                    className={`option-btn px-4 py-3 rounded-xl border-2 text-sm text-left ${
                      answers[q.id] == null
                        ? 'bg-white border-black/5'
                        : opt === q.correctAnswer
                          ? 'bg-mint/40 border-success'
                          : answers[q.id] === opt
                            ? 'bg-coral/30 border-coral'
                            : 'bg-white/40 border-transparent text-muted'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            )}
            {answers[q.id] != null && (
              <div className="mt-4">
                <Mascot size="sm" mood={String(answers[q.id]) === String(q.correctAnswer) ? 'happy' : 'thinking'} message={q.explanation} />
                <button
                  type="button"
                  className="w-full mt-3 pastel-btn py-3 bg-ink text-white text-sm"
                  onClick={() => (idx >= questions.length - 1 ? setPhase('done') : setIdx((i) => i + 1))}
                >
                  {idx >= questions.length - 1 ? 'Finish' : 'Next'}
                </button>
              </div>
            )}
          </div>
        )}

        {phase === 'done' && (
          <div className="text-center">
            <h2 className="text-2xl font-black mb-2">Bonds quest done</h2>
            <p className="mb-4">{correct}/{questions.length} correct</p>
            <button type="button" className="w-full pastel-btn py-3 bg-ink text-white mb-2" onClick={() => { setKey((k)=>k+1); setIdx(0); setAnswers({}); setPhase('practice') }}>New questions</button>
            <button type="button" className="w-full pastel-btn py-3 bg-white border border-black/5" onClick={onGoHome}>Kingdom</button>
          </div>
        )}
      </div>
    </div>
  )
}
