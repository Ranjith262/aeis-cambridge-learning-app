import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import BlockStage from './BlockStage'

/**
 * Procedural concept cinema for place value — adapts to tens/ones in the lesson.
 */
const BEATS = (ctx) => {
  const { tens, ones, n } = ctx
  return [
    {
      title: 'Meet the number',
      speech: `Today we explore ${n}. Numbers hide in tens and ones!`,
      tens: 0,
      ones: 0,
      mode: 'show',
    },
    {
      title: 'Ones are small cubes',
      speech: `Here are ${ones || 4} ones. Each cube is one.`,
      tens: 0,
      ones: ones || 4,
      mode: 'show',
      highlightOnes: true,
    },
    {
      title: 'The magic bundle',
      speech: 'When we have 10 ones, they become 1 ten rod. Snap!',
      tens: 1,
      ones: Math.max(0, (ones || 4) > 10 ? (ones || 4) - 10 : 0),
      mode: 'bundle',
      highlightOnes: true,
    },
    {
      title: 'Build the number',
      speech: `${n} is ${tens} ten${tens !== 1 ? 's' : ''} and ${ones} one${ones !== 1 ? 's' : ''}.`,
      tens,
      ones,
      mode: 'show',
    },
    {
      title: 'You are ready',
      speech: 'Remember: the left digit is tens. The right digit is ones. Let’s try!',
      tens,
      ones,
      mode: 'show',
    },
  ]
}

export default function PvCinema({ tens = 3, ones = 4, onDone, onSkip }) {
  const n = tens * 10 + ones
  const beats = BEATS({ tens, ones, n })
  const [i, setI] = useState(0)
  const [playing, setPlaying] = useState(true)
  const beat = beats[i]
  const last = i >= beats.length - 1

  useEffect(() => {
    if (!playing || last) return
    const t = setTimeout(() => setI((x) => x + 1), 3200)
    return () => clearTimeout(t)
  }, [i, playing, last])

  return (
    <div className="w-full max-w-lg mx-auto">
      <div className="flex gap-1 mb-3">
        {beats.map((_, idx) => (
          <div key={idx} className={`h-1.5 flex-1 rounded-full ${idx <= i ? 'bg-success' : 'bg-white/50'}`} />
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.35 }}
        >
          <h2 className="text-xl font-bold text-ink mb-2">{beat.title}</h2>
          <div className="flex gap-3 items-start mb-3">
            <motion.div
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-4xl"
            >
              🧭
            </motion.div>
            <div className="flex-1 rounded-2xl bg-white/90 px-3 py-2 text-sm font-medium text-ink shadow-sm border border-white">
              {beat.speech}
            </div>
          </div>
          <BlockStage
            tens={beat.tens}
            ones={beat.ones}
            mode={beat.mode}
            highlightOnes={beat.highlightOnes}
          />
        </motion.div>
      </AnimatePresence>

      <div className="flex gap-2 mt-4">
        <button
          type="button"
          className="pastel-btn flex-1 py-3 bg-white/80 text-ink text-sm"
          onClick={() => setPlaying((p) => !p)}
        >
          {playing && !last ? 'Pause' : 'Play'}
        </button>
        {!last ? (
          <button
            type="button"
            className="pastel-btn flex-1 py-3 bg-ink text-white text-sm"
            onClick={() => {
              setPlaying(false)
              setI((x) => x + 1)
            }}
          >
            Next
          </button>
        ) : (
          <button type="button" className="pastel-btn flex-1 py-3 bg-success text-white text-sm font-bold" onClick={onDone}>
            I understand!
          </button>
        )}
      </div>
      {onSkip && (
        <button type="button" className="w-full mt-2 text-xs text-ink/50" onClick={onSkip}>
          Skip intro
        </button>
      )}
    </div>
  )
}
