import { useEffect, useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { BaseTen, TenFrame, NumberLine, BarModel, ClockFace, CoinTray } from './manipulatives'

/**
 * Cute "animation video" style lesson for ANY practice question.
 * Frame-by-frame storytelling with mascot + visuals — not used in mock exams.
 */

function extractNumbers(text = '') {
  return (String(text).match(/\d+/g) || []).map(Number).filter((n) => n <= 200)
}

function buildFrames(question) {
  const topic = question?.category || 'numbersTo100'
  const nums = extractNumbers(question?.question)
  const a = nums[0] ?? 7
  const b = nums[1] ?? 3
  const ans = question?.correctAnswer
  const ansNum = Number(String(ans).replace(/[^\d.-]/g, ''))
  const title = question?.question || 'Let us learn together'

  const intro = {
    caption: 'Captain Number is here to help!',
    speech: 'Watch carefully — we will solve this step by step.',
    visual: 'wave',
  }

  if (topic === 'addition' || /\+/.test(question?.question || '')) {
    return [
      intro,
      {
        caption: 'Step 1 — See the parts',
        speech: `We have ${a} and ${b}. Let's join them!`,
        visual: 'bar',
        barParts: [
          { value: a, color: '#A8E6CF' },
          { value: b, color: '#FFD3B6' },
        ],
        barTotal: a + b,
      },
      {
        caption: 'Step 2 — Count on',
        speech: `Start at ${a}, then count ${b} more.`,
        visual: 'numberline',
        lineFrom: Math.max(0, a - 2),
        lineTo: a + b + 2,
        marks: [a, a + b],
        highlight: a + b,
      },
      {
        caption: 'Step 3 — The answer',
        speech: `${a} + ${b} = ${Number.isFinite(ansNum) ? ansNum : a + b}. You did it!`,
        visual: 'celebrate',
        bigText: String(Number.isFinite(ansNum) ? ansNum : a + b),
      },
    ]
  }

  if (topic === 'subtraction' || /−|-|minus|left/i.test(question?.question || '')) {
    return [
      intro,
      {
        caption: 'Step 1 — Start with the whole',
        speech: `We begin with ${a}.`,
        visual: 'tenframe',
        filled: Math.min(10, a),
      },
      {
        caption: 'Step 2 — Take away',
        speech: `Take away ${b}. What remains?`,
        visual: 'bar',
        barParts: [
          { value: Math.max(0, a - b), color: '#A8E6CF' },
          { value: b, color: '#FFAAA5' },
        ],
        barTotal: a,
      },
      {
        caption: 'Step 3 — The answer',
        speech: `${a} − ${b} = ${Number.isFinite(ansNum) ? ansNum : a - b}. Super!`,
        visual: 'celebrate',
        bigText: String(Number.isFinite(ansNum) ? ansNum : a - b),
      },
    ]
  }

  if (topic === 'numbersTo100' || topic === 'numberBonds') {
    const n = a > 9 ? a : a * 10 + (b % 10)
    const tens = Math.floor((Number.isFinite(ansNum) && ansNum > 9 ? ansNum : n) / 10)
    const ones = (Number.isFinite(ansNum) && ansNum > 9 ? ansNum : n) % 10
    return [
      intro,
      {
        caption: 'Step 1 — Tens and ones',
        speech: 'Numbers hide in tens and ones. Watch the blocks!',
        visual: 'baseten',
        tens: Math.min(9, tens || 2),
        ones: ones || 3,
      },
      {
        caption: 'Step 2 — Group of ten',
        speech: '10 ones become 1 ten — like a magic bundle!',
        visual: 'baseten',
        tens: Math.min(9, (tens || 1) + 0),
        ones: ones || 0,
      },
      {
        caption: 'Step 3 — Remember',
        speech: question?.explanation || `Think tens first, then ones.`,
        visual: 'celebrate',
        bigText: String(ans ?? n),
      },
    ]
  }

  if (topic === 'money') {
    return [
      intro,
      {
        caption: 'Step 1 — Look at the coins',
        speech: 'We add coin values carefully.',
        visual: 'coins',
        cents: Number.isFinite(ansNum) ? ansNum : a + b,
      },
      {
        caption: 'Step 2 — Add them up',
        speech: question?.explanation || `Count the total cents.`,
        visual: 'bar',
        barParts: [
          { value: a || 10, color: '#FFF5BA' },
          { value: b || 5, color: '#FFD3B6' },
        ],
      },
      {
        caption: 'Step 3 — Total',
        speech: `The answer is ${ans ?? a + b}!`,
        visual: 'celebrate',
        bigText: String(ans ?? a + b),
      },
    ]
  }

  if (topic === 'time') {
    return [
      intro,
      {
        caption: 'Step 1 — The clock',
        speech: 'Short hand = hours. Long hand = minutes.',
        visual: 'clock',
        hour: a || 3,
        minute: b || 0,
      },
      {
        caption: 'Step 2 — Read it',
        speech: question?.explanation || 'When the long hand is on 12, it is o’clock.',
        visual: 'clock',
        hour: a || 3,
        minute: b || 0,
      },
      {
        caption: 'Step 3 — Answer',
        speech: `So the time is ${ans ?? `${a}:00`}.`,
        visual: 'celebrate',
        bigText: String(ans ?? `${a}:00`),
      },
    ]
  }

  // Generic fallback frames
  return [
    intro,
    {
      caption: 'Step 1 — Read the question',
      speech: title.length > 80 ? title.slice(0, 80) + '…' : title,
      visual: 'read',
    },
    {
      caption: 'Step 2 — Think',
      speech: question?.explanation || 'Use pictures, counting, or a number line.',
      visual: 'tenframe',
      filled: Math.min(10, a),
    },
    {
      caption: 'Step 3 — Answer',
      speech: `The correct answer is ${ans}.`,
      visual: 'celebrate',
      bigText: String(ans ?? '?'),
    },
  ]
}

function FrameVisual({ frame }) {
  if (!frame) return null
  if (frame.visual === 'baseten') return <BaseTen tens={frame.tens} ones={frame.ones} label="Place-value blocks" />
  if (frame.visual === 'tenframe') return <TenFrame filled={frame.filled ?? 5} />
  if (frame.visual === 'numberline')
    return (
      <NumberLine
        from={frame.lineFrom ?? 0}
        to={frame.lineTo ?? 20}
        marks={frame.marks || []}
        highlight={frame.highlight}
      />
    )
  if (frame.visual === 'bar')
    return <BarModel parts={frame.barParts || [{ value: 5 }, { value: 3 }]} total={frame.barTotal} />
  if (frame.visual === 'clock') return <ClockFace hour={frame.hour ?? 3} minute={frame.minute ?? 0} />
  if (frame.visual === 'coins') return <CoinTray amountCents={frame.cents ?? 35} />
  if (frame.visual === 'celebrate')
    return (
      <div className="pastel-card p-6 text-center">
        <motion.div
          animate={{ scale: [1, 1.15, 1], rotate: [0, -5, 5, 0] }}
          transition={{ duration: 0.8, repeat: Infinity, repeatDelay: 0.6 }}
          className="text-5xl font-black text-success"
        >
          {frame.bigText}
        </motion.div>
        <p className="text-sm text-muted mt-2">That’s the answer!</p>
      </div>
    )
  if (frame.visual === 'wave')
    return (
      <div className="pastel-card p-6 flex justify-center">
        <motion.div
          animate={{ rotate: [0, 15, -10, 0] }}
          transition={{ duration: 1.2, repeat: Infinity }}
          className="text-6xl"
        >
          👋
        </motion.div>
      </div>
    )
  return (
    <div className="pastel-card p-4 text-sm text-ink text-center">
      {frame.speech}
    </div>
  )
}

export default function TeachAnimation({ question, onClose, onFinished }) {
  const frames = useMemo(() => buildFrames(question), [question])
  const [idx, setIdx] = useState(0)
  const [playing, setPlaying] = useState(true)
  const frame = frames[idx]
  const isLast = idx >= frames.length - 1

  // Auto-play like a short video
  useEffect(() => {
    if (!playing || isLast) return
    const t = setTimeout(() => setIdx((i) => Math.min(i + 1, frames.length - 1)), 2800)
    return () => clearTimeout(t)
  }, [playing, idx, isLast, frames.length])

  return (
    <div className="fixed inset-0 z-[70] flex items-end sm:items-center justify-center bg-ink/40 backdrop-blur-sm p-3">
      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="w-full max-w-md pastel-card p-4 sm:p-5 max-h-[90vh] overflow-y-auto"
      >
        <div className="flex items-center justify-between mb-2">
          <p className="text-xs font-bold uppercase tracking-wide text-success">Teach me · Animation</p>
          <button type="button" onClick={onClose} className="text-sm text-muted px-2 py-1">
            Close
          </button>
        </div>

        {/* Progress pips */}
        <div className="flex gap-1 mb-3">
          {frames.map((_, i) => (
            <div
              key={i}
              className={`h-1.5 flex-1 rounded-full ${i <= idx ? 'bg-success' : 'bg-soft'}`}
            />
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.35 }}
          >
            <h3 className="text-lg font-bold text-ink mb-2">{frame?.caption}</h3>

            {/* Mini Captain */}
            <div className="flex gap-3 items-start mb-3">
              <motion.div
                animate={{ y: [0, -4, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-4xl flex-shrink-0"
              >
                🧭
              </motion.div>
              <div className="pastel-card px-3 py-2 text-sm text-ink bg-mint/20 shadow-none border border-mint/40">
                {frame?.speech}
              </div>
            </div>

            <FrameVisual frame={frame} />
          </motion.div>
        </AnimatePresence>

        <div className="flex gap-2 mt-4">
          <button
            type="button"
            disabled={idx === 0}
            onClick={() => { setPlaying(false); setIdx((i) => Math.max(0, i - 1)) }}
            className="pastel-btn flex-1 py-2.5 bg-soft text-ink text-sm disabled:opacity-30"
          >
            Back
          </button>
          {!isLast ? (
            <button
              type="button"
              onClick={() => { setPlaying(false); setIdx((i) => i + 1) }}
              className="pastel-btn flex-1 py-2.5 bg-ink text-white text-sm"
            >
              Next
            </button>
          ) : (
            <button
              type="button"
              onClick={() => {
                onFinished?.()
                onClose?.()
              }}
              className="pastel-btn flex-1 py-2.5 bg-success text-white text-sm font-bold"
            >
              I understand!
            </button>
          )}
        </div>

        <button
          type="button"
          className="w-full mt-2 text-xs text-muted"
          onClick={() => setPlaying((p) => !p)}
        >
          {playing && !isLast ? '⏸ Pause auto-play' : '▶ Auto-play frames'}
        </button>
      </motion.div>
    </div>
  )
}
