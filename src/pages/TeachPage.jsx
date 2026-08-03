import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { getTeachScript } from '../data/teachScripts'
import { mathCategories } from '../data/mathQuestions'
import Mascot, { pickLine } from '../components/Mascot'
import { BaseTen, TenFrame, NumberLine, BarModel, ClockFace, CoinTray } from '../components/manipulatives'

function StepVisual({ kind, stepIndex }) {
  if (kind === 'base10') return <BaseTen tens={2 + (stepIndex % 3)} ones={3 + stepIndex} />
  if (kind === 'tenframe') return <TenFrame filled={5 + stepIndex} />
  if (kind === 'bar')
    return (
      <BarModel
        parts={[
          { value: 4 + stepIndex, color: '#A8E6CF' },
          { value: 6, color: '#FFD3B6' },
        ]}
        total={10 + stepIndex}
      />
    )
  if (kind === 'numberline') return <NumberLine from={0} to={20} marks={[5, 10, 15]} highlight={10} />
  if (kind === 'clock') return <ClockFace hour={3 + stepIndex} minute={stepIndex * 5} />
  if (kind === 'coins') return <CoinTray amountCents={25 + stepIndex * 10} />
  if (kind === 'shapes')
    return (
      <div className="pastel-card p-4 text-3xl flex gap-3">
        🔺 ⬛ ⬤ ⭐ 🔷
      </div>
    )
  return (
    <div className="pastel-card p-4 text-sm text-ink">
      Count the pictures. Compare rows. Find most, least, and difference.
    </div>
  )
}

export default function TeachPage({ topicId, onDone, onBack }) {
  const script = getTeachScript(topicId)
  const cat = mathCategories.find((c) => c.id === topicId)
  const [step, setStep] = useState(0)
  const current = script.steps[step]
  const isLast = step >= script.steps.length - 1

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="relative z-10 min-h-screen px-4 md:px-8 py-6 pb-20 max-w-2xl mx-auto"
    >
      <div className="flex items-center justify-between mb-4">
        <button type="button" onClick={onBack} className="pastel-btn px-4 py-2 bg-white shadow-card text-sm border border-black/5">
          ← Back
        </button>
        <div className="text-sm text-muted">
          Step {step + 1}/{script.steps.length}
        </div>
      </div>

      <h1 className="text-2xl font-bold text-ink mb-1">
        {script.emoji} Teach me: {script.title}
      </h1>
      <p className="text-muted text-sm mb-4">{cat?.name || topicId} · CPA method</p>

      <Mascot mood="thinking" message={pickLine('encourage', step)} className="mb-4" />

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="pastel-card p-5 mb-4"
        >
          <span className="inline-block text-xs font-bold uppercase tracking-wide bg-mint/50 text-ink px-2 py-1 rounded-full mb-3">
            {current.stage}
          </span>
          <p className="text-ink text-base leading-relaxed mb-4">{current.text}</p>
          <StepVisual kind={current.visual} stepIndex={step} />
        </motion.div>
      </AnimatePresence>

      <div className="flex gap-3">
        <button
          type="button"
          disabled={step === 0}
          onClick={() => setStep((s) => s - 1)}
          className="pastel-btn flex-1 py-3 bg-white border border-black/5 text-ink disabled:opacity-30"
        >
          Previous
        </button>
        {!isLast ? (
          <button
            type="button"
            onClick={() => setStep((s) => s + 1)}
            className="pastel-btn flex-1 py-3 bg-ink text-white"
          >
            Next step
          </button>
        ) : (
          <button type="button" onClick={onDone} className="pastel-btn flex-1 py-3 bg-success text-white">
            Start practice →
          </button>
        )}
      </div>
    </motion.div>
  )
}
