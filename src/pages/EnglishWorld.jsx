import { useMemo, useState, useCallback, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { generateEnglishSession } from '../world/english/englishGenerator'
import Mascot, { pickLine } from '../components/Mascot'
import Celebration from '../components/Celebration'
import { markIslandVisit } from '../utils/islandUnlocks'
import { recordAdaptiveResult } from '../world/adaptive/learnerModel'

const SKILLS = [
  { id: 'all', emoji: '🌟', title: 'Mixed Adventure', blurb: 'A bit of everything' },
  { id: 'vocab', emoji: '📖', title: 'Word Garden', blurb: 'Meanings in scenes' },
  { id: 'sentence', emoji: '🧩', title: 'Sentence Bridge', blurb: 'Put words in order' },
  { id: 'reading', emoji: '🗺️', title: 'Story Path', blurb: 'Short reads + meaning' },
  { id: 'phonics', emoji: '🔊', title: 'Sound Cove', blurb: 'Rhymes & sounds' },
  { id: 'grammar', emoji: '✨', title: 'Pattern Shore', blurb: 'Notice language patterns' },
]

const CINEMAS = {
  vocab: [
    { title: 'Words live in stories', speech: 'We learn new words from sentences — not lists alone.' },
    { title: 'Clues around the word', speech: 'Look at the whole sentence. What is happening?' },
    { title: 'Try the meaning', speech: 'Choose the meaning that fits the scene.' },
  ],
  sentence: [
    { title: 'Sentences have order', speech: 'Who does what? The order helps us understand.' },
    { title: 'Capital and full stop', speech: 'A sentence starts tall and ends with a stop.' },
    { title: 'Build the bridge', speech: 'Put the words in a clear order.' },
  ],
  reading: [
    { title: 'Read like a detective', speech: 'The answer is hiding in the story.' },
    { title: 'Find the proof', speech: 'Point to the words that prove your answer.' },
    { title: 'You are ready', speech: 'Short stories, big thinking!' },
  ],
  phonics: [
    { title: 'Sounds in words', speech: 'We can hear parts of words — like beats in a song.' },
    { title: 'Rhymes', speech: 'Rhyming words share the same ending sound.' },
    { title: 'Listen carefully', speech: 'Your ears are superpowers for reading.' },
  ],
  grammar: [
    { title: 'Patterns', speech: 'English has friendly patterns we can notice.' },
    { title: 'Naming and doing', speech: 'Nouns name. Verbs do.' },
    { title: 'Spot it', speech: 'Choose the sentence that sounds right.' },
  ],
  all: [
    { title: 'Welcome to Word Harbour', speech: 'Words, sentences, and stories live here together.' },
    { title: 'Little steps', speech: 'Each question is a short quest — take your time.' },
    { title: 'Let’s begin', speech: 'Captain Number’s friend, Word Fox, is cheering for you!' },
  ],
}

export default function EnglishWorld({ onGoHome }) {
  const [skill, setSkill] = useState(null)
  const [phase, setPhase] = useState('hub') // hub | cinema | practice | done
  const [beat, setBeat] = useState(0)
  const [playing, setPlaying] = useState(true)
  const [sessionKey, setSessionKey] = useState(0)
  const [idx, setIdx] = useState(0)
  const [answers, setAnswers] = useState({})
  const [celebrate, setCelebrate] = useState(false)

  useEffect(() => {
    markIslandVisit('english')
  }, [])

  const questions = useMemo(
    () => (skill ? generateEnglishSession(8, skill) : []),
    [skill, sessionKey]
  )
  const q = questions[idx]
  const beats = CINEMAS[skill] || CINEMAS.all
  const lastBeat = beat >= beats.length - 1

  useEffect(() => {
    if (phase !== 'cinema' || !playing || lastBeat) return
    const t = setTimeout(() => setBeat((b) => b + 1), 2800)
    return () => clearTimeout(t)
  }, [phase, beat, playing, lastBeat])

  const select = useCallback(
    (id, option) => {
      if (!q || answers[id] != null) return
      const ok = String(option).trim().toLowerCase() === String(q.correctAnswer).trim().toLowerCase()
      setAnswers((a) => ({ ...a, [id]: option }))
      recordAdaptiveResult(q.skillId, ok)
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
      String(answers[item.id]).trim().toLowerCase() === String(item.correctAnswer).trim().toLowerCase()
  ).length

  const startSkill = (id) => {
    setSkill(id)
    setBeat(0)
    setPlaying(true)
    setIdx(0)
    setAnswers({})
    setSessionKey((k) => k + 1)
    setPhase('cinema')
  }

  return (
    <div
      className="min-h-screen overflow-x-clip"
      style={{ background: 'linear-gradient(165deg, #FCE4EC 0%, #E8EAF6 40%, #E0F7FA 100%)' }}
    >
      <Celebration show={celebrate} seed={idx + correctCount} />
      <div className="max-w-lg mx-auto px-4 py-5 pb-20">
        <button type="button" onClick={onGoHome} className="pastel-btn px-3 py-2 bg-white/90 text-sm mb-4 border border-black/5">
          ← Kingdom
        </button>

        <AnimatePresence mode="wait">
          {phase === 'hub' && (
            <motion.div key="hub" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
              <div className="text-center mb-5">
                <div className="text-6xl mb-2">🦊</div>
                <h1 className="text-3xl font-black text-ink">Word Harbour</h1>
                <p className="text-sm text-ink/70 mt-1">English for curious 7–8 year olds — stories, sounds, and sentences</p>
              </div>
              <Mascot mood="happy" message="Words are tools. Let’s play with them!" className="justify-center mb-5" />
              <div className="grid grid-cols-2 gap-3">
                {SKILLS.map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => startSkill(s.id)}
                    className="pastel-card p-4 text-left island-card"
                  >
                    <div className="text-2xl mb-1">{s.emoji}</div>
                    <div className="font-bold text-ink text-sm">{s.title}</div>
                    <div className="text-[10px] text-muted">{s.blurb}</div>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {phase === 'cinema' && (
            <motion.div key="cin" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div className="flex gap-1 mb-3">
                {beats.map((_, i) => (
                  <div key={i} className={`h-1.5 flex-1 rounded-full ${i <= beat ? 'bg-success' : 'bg-white/50'}`} />
                ))}
              </div>
              <h2 className="text-xl font-bold text-ink mb-2">{beats[beat]?.title}</h2>
              <div className="flex gap-3 mb-4">
                <div className="text-4xl">🦊</div>
                <div className="flex-1 rounded-2xl bg-white/90 px-3 py-2 text-sm font-medium shadow-sm">
                  {beats[beat]?.speech}
                </div>
              </div>
              <div className="pastel-card p-6 text-center text-5xl">
                {SKILLS.find((s) => s.id === skill)?.emoji || '📖'}
              </div>
              <div className="flex gap-2 mt-4">
                <button type="button" className="pastel-btn flex-1 py-3 bg-white text-sm" onClick={() => setPlaying((p) => !p)}>
                  {playing && !lastBeat ? 'Pause' : 'Play'}
                </button>
                {!lastBeat ? (
                  <button type="button" className="pastel-btn flex-1 py-3 bg-ink text-white text-sm" onClick={() => { setPlaying(false); setBeat((b) => b + 1) }}>
                    Next
                  </button>
                ) : (
                  <button
                    type="button"
                    className="pastel-btn flex-1 py-3 bg-success text-white text-sm font-bold"
                    onClick={() => setPhase('practice')}
                  >
                    I understand!
                  </button>
                )}
              </div>
              <button type="button" className="w-full mt-2 text-xs text-muted" onClick={() => setPhase('practice')}>
                Skip intro
              </button>
            </motion.div>
          )}

          {phase === 'practice' && q && (
            <motion.div key={q.id} initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }}>
              <p className="text-xs text-muted mb-2">
                {idx + 1}/{questions.length} · {q.skillId}
              </p>
              <div className="pastel-card p-4 mb-3">
                <p className="font-semibold text-ink whitespace-pre-line leading-relaxed text-sm sm:text-base">{q.question}</p>
              </div>
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
              <div className="text-5xl mb-2">🌈</div>
              <h2 className="text-2xl font-black text-ink mb-2">Harbour quest complete</h2>
              <p className="text-ink/70 mb-3">
                {correctCount}/{questions.length} correct
              </p>
              <div className="pastel-card p-4 text-left text-sm mb-4">
                <p className="font-bold mb-1">For parents</p>
                <p>
                  {correctCount / questions.length >= 0.8
                    ? 'English practice went well. Read one short picture book together and ask one “why” question.'
                    : 'Keep it light: talk about new words in daily life. Short and warm beats long and hard.'}
                </p>
              </div>
              <button
                type="button"
                className="w-full pastel-btn py-3 bg-ink text-white font-bold mb-2"
                onClick={() => startSkill(skill)}
              >
                New adventure
              </button>
              <button type="button" className="w-full pastel-btn py-3 bg-white border border-black/5 mb-2" onClick={() => setPhase('hub')}>
                All English paths
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
