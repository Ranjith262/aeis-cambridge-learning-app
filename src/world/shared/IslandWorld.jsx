import { useMemo, useState, useCallback, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Mascot, { pickLine } from '../../components/Mascot'
import Celebration from '../../components/Celebration'
import ShortAnswerInput from '../../components/ShortAnswerInput'

export default function IslandWorld({
  title,
  emoji,
  blurb,
  gradient,
  generateSession,
  parentLine,
  renderLab,
  renderCinemaVisual,
  cinemaBeats,
  onGoHome,
}) {
  const [phase, setPhase] = useState('enter')
  const [sessionKey, setSessionKey] = useState(0)
  const [idx, setIdx] = useState(0)
  const [answers, setAnswers] = useState({})
  const [celebrate, setCelebrate] = useState(false)
  const [beat, setBeat] = useState(0)
  const [playing, setPlaying] = useState(true)

  const questions = useMemo(() => generateSession(8), [sessionKey, generateSession])
  const q = questions[idx]
  const beats = cinemaBeats || []
  const b = beats[beat] || { title, speech: blurb }
  const lastBeat = beat >= Math.max(beats.length - 1, 0)

  useEffect(() => {
    if (phase !== 'cinema' || !playing || lastBeat || beats.length === 0) return
    const t = setTimeout(() => setBeat((x) => x + 1), 3000)
    return () => clearTimeout(t)
  }, [phase, beat, playing, lastBeat, beats.length])

  const select = useCallback(
    (id, option) => {
      if (!q || answers[id] != null) return
      const ok =
        String(option).trim().toLowerCase() === String(q.correctAnswer).trim().toLowerCase()
      setAnswers((a) => ({ ...a, [id]: option }))
      if (ok) {
        setCelebrate(true)
        setTimeout(() => setCelebrate(false), 850)
      }
    },
    [q, answers]
  )

  const correctCount = questions.filter(
    (item) =>
      answers[item.id] != null &&
      String(answers[item.id]).trim().toLowerCase() === String(item.correctAnswer).trim().toLowerCase()
  ).length

  return (
    <div className="min-h-screen overflow-x-hidden" style={{ background: gradient }}>
      <Celebration show={celebrate} seed={idx + correctCount} />
      <div className="max-w-lg mx-auto px-4 py-5 pb-20">
        <button type="button" onClick={onGoHome} className="pastel-btn px-3 py-2 bg-white/90 text-sm mb-4 border border-black/5">
          ← Kingdom
        </button>

        <AnimatePresence mode="wait">
          {phase === 'enter' && (
            <motion.div key="e" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="text-center">
              <div className="text-6xl mb-3">{emoji}</div>
              <h1 className="text-3xl font-black text-ink mb-2">{title}</h1>
              <p className="text-sm text-ink/70 mb-5">{blurb}</p>
              <Mascot mood="happy" message={pickLine('welcome', 1)} className="justify-center mb-5" />
              <button
                type="button"
                onClick={() => { setBeat(0); setPlaying(true); setPhase('cinema') }}
                className="w-full pastel-btn py-4 bg-ink text-white font-bold mb-2"
              >
                Start the story
              </button>
              <button type="button" onClick={() => setPhase('lab')} className="w-full pastel-btn py-3 bg-white text-ink text-sm border border-black/5">
                Skip to lab
              </button>
            </motion.div>
          )}

          {phase === 'cinema' && (
            <motion.div key="c" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div className="flex gap-1 mb-3">
                {beats.map((_, i) => (
                  <div key={i} className={`h-1.5 flex-1 rounded-full ${i <= beat ? 'bg-success' : 'bg-white/50'}`} />
                ))}
              </div>
              <h2 className="text-xl font-bold text-ink mb-2">{b.title}</h2>
              <div className="flex gap-3 mb-3">
                <div className="text-4xl">🧭</div>
                <div className="flex-1 rounded-2xl bg-white/90 px-3 py-2 text-sm font-medium shadow-sm">{b.speech}</div>
              </div>
              {renderCinemaVisual?.(b.visual || b)}
              <div className="flex gap-2 mt-4">
                <button type="button" className="pastel-btn flex-1 py-3 bg-white/80 text-sm" onClick={() => setPlaying((p) => !p)}>
                  {playing && !lastBeat ? 'Pause' : 'Play'}
                </button>
                {!lastBeat ? (
                  <button type="button" className="pastel-btn flex-1 py-3 bg-ink text-white text-sm" onClick={() => { setPlaying(false); setBeat((x) => x + 1) }}>
                    Next
                  </button>
                ) : (
                  <button type="button" className="pastel-btn flex-1 py-3 bg-success text-white text-sm font-bold" onClick={() => setPhase('lab')}>
                    I understand!
                  </button>
                )}
              </div>
            </motion.div>
          )}

          {phase === 'lab' && (
            <motion.div key="lab" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <h2 className="text-2xl font-bold text-ink mb-1">Practice lab</h2>
              <p className="text-sm text-ink/60 mb-4">Explore, then try fresh questions.</p>
              {renderLab?.()}
              <button
                type="button"
                className="w-full mt-6 pastel-btn py-4 bg-ink text-white font-bold"
                onClick={() => {
                  setSessionKey((k) => k + 1)
                  setIdx(0)
                  setAnswers({})
                  setPhase('practice')
                }}
              >
                Practise with new questions
              </button>
            </motion.div>
          )}

          {phase === 'practice' && q && (
            <motion.div key={q.id} initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }}>
              <p className="text-xs text-muted mb-2">{idx + 1}/{questions.length} · {q.skillId}</p>
              {q.cinema && renderCinemaVisual?.(q.cinema)}
              <div className="pastel-card p-4 my-3 font-semibold text-ink">{q.question}</div>
              {q.format === 'short_answer' ? (
                <ShortAnswerInput question={q} selectedAnswer={answers[q.id]} onSelect={select} disabled={answers[q.id] != null} />
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
                        : q.explanation
                    }
                  />
                  <button
                    type="button"
                    className="w-full mt-3 pastel-btn py-3 bg-ink text-white text-sm font-bold"
                    onClick={() => (idx >= questions.length - 1 ? setPhase('done') : setIdx((i) => i + 1))}
                  >
                    {idx >= questions.length - 1 ? 'Finish' : 'Next'}
                  </button>
                </div>
              )}
            </motion.div>
          )}

          {phase === 'done' && (
            <motion.div key="done" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center">
              <div className="text-5xl mb-2">🌟</div>
              <h2 className="text-2xl font-black text-ink mb-2">Quest complete</h2>
              <p className="text-ink/70 mb-3">{correctCount}/{questions.length} correct</p>
              {parentLine && (
                <div className="pastel-card p-4 text-left text-sm mb-4">
                  <p className="font-bold mb-1">For parents</p>
                  <p>{parentLine(correctCount, questions.length)}</p>
                </div>
              )}
              <button
                type="button"
                className="w-full pastel-btn py-3 bg-ink text-white font-bold mb-2"
                onClick={() => {
                  setSessionKey((k) => k + 1)
                  setIdx(0)
                  setAnswers({})
                  setBeat(0)
                  setPhase('cinema')
                }}
              >
                New adventure
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
