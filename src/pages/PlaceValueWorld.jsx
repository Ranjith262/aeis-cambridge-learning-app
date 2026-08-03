import { useMemo, useState, useCallback, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import PvCinema from '../world/placeValue/PvCinema'
import BlockStage from '../world/placeValue/BlockStage'
import { generatePlaceValueSession } from '../world/placeValue/pvGenerator'
import { recordPvResult, pvMasteryPct, pvParentLine, loadPvLearner } from '../world/placeValue/pvLearner'
import Celebration from '../components/Celebration'
import Mascot, { pickLine } from '../components/Mascot'
import { markIslandVisit } from '../utils/islandUnlocks'
import { recordAdaptiveResult } from '../world/adaptive/learnerModel'

/**
 * Phase 1 vertical slice — Place Value Island
 * Cinema → Build lab → Adaptive practice → Parent line
 */
export default function PlaceValueWorld({ onGoHome }) {
  const [phase, setPhase] = useState('enter') // enter | cinema | lab | practice | done
  const [sessionKey, setSessionKey] = useState(0)
  const [idx, setIdx] = useState(0)
  const [answers, setAnswers] = useState({})
  const [celebrate, setCelebrate] = useState(false)
  const [labTens, setLabTens] = useState(2)
  const [labOnes, setLabOnes] = useState(5)
  const [learner, setLearner] = useState(() => loadPvLearner())
  useEffect(() => { markIslandVisit('placeValue') }, [])

  const questions = useMemo(() => generatePlaceValueSession(8), [sessionKey])
  const q = questions[idx]
  const mastery = pvMasteryPct()

  const demoTens = 3
  const demoOnes = 4

  const select = useCallback(
    (option) => {
      if (!q || answers[q.id] != null) return
      const ok = String(option) === String(q.correctAnswer)
      setAnswers((a) => ({ ...a, [q.id]: option }))
      const m = recordPvResult(q.skillId, ok)
      recordAdaptiveResult(q.skillId, ok)
      setLearner({ ...m })
      if (ok) {
        setCelebrate(true)
        setTimeout(() => setCelebrate(false), 900)
      }
    },
    [q, answers]
  )

  const nextQ = () => {
    if (idx >= questions.length - 1) setPhase('done')
    else setIdx((i) => i + 1)
  }

  const correctCount = questions.filter((item) => answers[item.id] === item.correctAnswer).length

  return (
    <div
      className="min-h-screen overflow-x-clip"
      style={{
        background: 'linear-gradient(165deg, #FFF8E7 0%, #E3F2FD 40%, #E8F5E9 100%)',
      }}
    >
      <Celebration show={celebrate} seed={idx + correctCount} />

      <div className="max-w-lg mx-auto px-4 py-5 pb-20">
        <div className="flex items-center justify-between mb-4">
          <button
            type="button"
            onClick={onGoHome}
            className="pastel-btn px-3 py-2 bg-white/90 text-sm shadow-sm border border-black/5"
          >
            ← Kingdom
          </button>
          <div className="text-xs font-bold uppercase tracking-wide text-ink/50">Place Value Island</div>
          <div className="text-sm font-bold text-success">{mastery != null ? `${mastery}%` : '—'}</div>
        </div>

        <AnimatePresence mode="wait">
          {phase === 'enter' && (
            <motion.div
              key="enter"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="text-center"
            >
              <p className="text-xs font-bold uppercase tracking-wide text-ink/40 mb-2">Concept Mastery · Place Value</p>
              <h1 className="text-2xl sm:text-3xl font-black text-ink mb-3">Primary 1 Place Value</h1>
              {/* CPA track */}
              <div className="flex items-center justify-center gap-1 mb-1 px-2">
                <div className="flex-1 h-2 rounded-full bg-emerald-400" />
                <span className="w-6 h-6 rounded-full bg-emerald-400 text-white text-[10px] font-bold flex items-center justify-center">+</span>
                <div className="flex-1 h-2 rounded-full bg-emerald-300" />
                <span className="w-6 h-6 rounded-full bg-emerald-300 text-white text-[10px] font-bold flex items-center justify-center">+</span>
                <div className="flex-1 h-2 rounded-full bg-emerald-200" />
                <span className="w-6 h-6 rounded-full bg-emerald-500 text-white text-[10px] font-bold flex items-center justify-center">›</span>
              </div>
              <div className="flex justify-between text-[10px] font-semibold text-ink/50 mb-5 px-1">
                <span>Concrete</span><span>Pictorial</span><span>Abstract</span>
              </div>
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="text-7xl mb-3"
              >
                🦸‍♂️
              </motion.div>
              <p className="text-ink/70 mb-6 text-sm leading-relaxed">
                Captain Number says: <strong>10 ones become 1 ten!</strong>
              </p>
              <Mascot mood="happy" message="I'll show you the magic bundle: 10 ones become 1 ten!" className="justify-center mb-6" />
              <button
                type="button"
                onClick={() => setPhase('cinema')}
                className="w-full pastel-btn py-4 bg-ink text-white font-bold text-base shadow-lg"
              >
                Start the story
              </button>
              <button
                type="button"
                onClick={() => setPhase('lab')}
                className="w-full mt-3 pastel-btn py-3 bg-white text-ink text-sm border border-black/5"
              >
                Skip to building lab
              </button>
            </motion.div>
          )}

          {phase === 'cinema' && (
            <motion.div key="cinema" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <PvCinema
                tens={demoTens}
                ones={demoOnes}
                onDone={() => setPhase('lab')}
                onSkip={() => setPhase('lab')}
              />
            </motion.div>
          )}

          {phase === 'lab' && (
            <motion.div key="lab" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
              <h2 className="text-2xl font-bold text-ink mb-1">Building lab</h2>
              <p className="text-sm text-ink/60 mb-4">Add tens and ones. Feel how the number grows.</p>
              <BlockStage tens={labTens} ones={labOnes} />
              <div className="grid grid-cols-2 gap-3 mt-4">
                <div className="pastel-card p-3">
                  <p className="text-xs font-bold text-muted mb-2">Tens</p>
                  <div className="flex gap-2">
                    <button type="button" className="pastel-btn flex-1 py-2 bg-sky/40" onClick={() => setLabTens((t) => Math.max(0, t - 1))}>−</button>
                    <button type="button" className="pastel-btn flex-1 py-2 bg-sky/60" onClick={() => setLabTens((t) => Math.min(9, t + 1))}>+</button>
                  </div>
                </div>
                <div className="pastel-card p-3">
                  <p className="text-xs font-bold text-muted mb-2">Ones</p>
                  <div className="flex gap-2">
                    <button type="button" className="pastel-btn flex-1 py-2 bg-butter/50" onClick={() => setLabOnes((o) => Math.max(0, o - 1))}>−</button>
                    <button type="button" className="pastel-btn flex-1 py-2 bg-butter" onClick={() => setLabOnes((o) => Math.min(20, o + 1))}>+</button>
                  </div>
                </div>
              </div>
              {labOnes >= 10 && (
                <p className="text-center text-sm font-semibold text-success mt-3">
                  Hint: 10 ones can become 1 ten!
                </p>
              )}
              <button
                type="button"
                onClick={() => {
                  setIdx(0)
                  setAnswers({})
                  setSessionKey((k) => k + 1)
                  setPhase('practice')
                }}
                className="w-full mt-6 pastel-btn py-4 bg-ink text-white font-bold"
              >
                Practise with new questions
              </button>
            </motion.div>
          )}

          {phase === 'practice' && q && (
            <motion.div key={`pq-${q.id}`} initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }}>
              <div className="flex justify-between text-xs text-muted mb-2">
                <span>
                  Question {idx + 1} / {questions.length}
                </span>
                <span className="font-mono">{q.skillId}</span>
              </div>
              <div className="h-2 rounded-full bg-white/60 mb-4 overflow-hidden">
                <div
                  className="h-full bg-success rounded-full transition-all"
                  style={{ width: `${((idx + (answers[q.id] != null ? 1 : 0)) / questions.length) * 100}%` }}
                />
              </div>

              {q.cinema && (
                <div className="mb-3">
                  <BlockStage tens={q.cinema.tens} ones={q.cinema.ones} />
                </div>
              )}

              <div className="pastel-card p-4 mb-3">
                <p className="font-semibold text-ink leading-relaxed">{q.question}</p>
              </div>

              <div className="grid gap-2">
                {(q.options || []).map((opt) => {
                  const answered = answers[q.id] != null
                  const isCorrect = opt === q.correctAnswer
                  const selected = answers[q.id] === opt
                  let cls = 'option-btn w-full text-left px-4 py-3 rounded-xl border-2 text-sm font-medium '
                  if (!answered) cls += 'border-black/5 bg-white text-ink'
                  else if (isCorrect) cls += 'border-success bg-mint/40'
                  else if (selected) cls += 'border-coral bg-coral/30'
                  else cls += 'border-transparent bg-white/50 text-muted'
                  return (
                    <button key={opt} type="button" disabled={answered} onClick={() => select(opt)} className={cls}>
                      {opt}
                    </button>
                  )
                })}
              </div>

              {answers[q.id] != null && (
                <div className="mt-4 pastel-card p-3 bg-white/80">
                  <Mascot
                    size="sm"
                    mood={answers[q.id] === q.correctAnswer ? 'happy' : 'thinking'}
                    message={
                      answers[q.id] === q.correctAnswer
                        ? pickLine('correct', idx)
                        : `The answer is ${q.correctAnswer}. ${q.explanation}`
                    }
                  />
                  <button type="button" onClick={nextQ} className="w-full mt-3 pastel-btn py-3 bg-ink text-white text-sm font-bold">
                    {idx >= questions.length - 1 ? 'Finish' : 'Next'}
                  </button>
                </div>
              )}
            </motion.div>
          )}

          {phase === 'done' && (
            <motion.div key="done" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} className="text-center">
              <div className="text-5xl mb-3">🌟</div>
              <h2 className="text-2xl font-black text-ink mb-2">Island quest complete</h2>
              <p className="text-ink/70 mb-4">
                You got <strong>{correctCount}</strong> of <strong>{questions.length}</strong> on this adventure.
              </p>
              <div className="pastel-card p-4 text-left text-sm text-ink mb-4">
                <p className="font-bold mb-1">For parents</p>
                <p className="text-ink/80">{pvParentLine()}</p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setSessionKey((k) => k + 1)
                  setIdx(0)
                  setAnswers({})
                  setPhase('cinema')
                }}
                className="w-full pastel-btn py-3 bg-ink text-white font-bold mb-2"
              >
                New adventure (new questions)
              </button>
              <button type="button" onClick={onGoHome} className="w-full pastel-btn py-3 bg-white text-ink border border-black/5">
                Back to Kingdom
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
