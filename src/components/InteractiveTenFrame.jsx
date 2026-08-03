import { useState } from 'react'
import { motion } from 'framer-motion'

/**
 * Interactive ten-frame: child taps dots to fill, then checks a target number.
 * Used in Play mode for number sense.
 */
export default function InteractiveTenFrame({ target = 7, onSuccess }) {
  const [filled, setFilled] = useState(0)
  const [msg, setMsg] = useState('')

  const toggle = (i) => {
    // fill up to clicked index+1 for simple kid UX
    setFilled(i + 1)
    setMsg('')
  }

  const check = () => {
    if (filled === target) {
      setMsg('Perfect!')
      onSuccess?.()
    } else {
      setMsg(`You filled ${filled}. Try to make ${target}.`)
    }
  }

  return (
    <div className="pastel-card p-5">
      <p className="font-bold text-ink mb-2">Make {target} on the ten-frame</p>
      <p className="text-xs text-muted mb-3">Tap the circles to fill them</p>
      <div className="grid grid-cols-5 gap-2 w-52 mx-auto mb-4">
        {Array.from({ length: 10 }).map((_, i) => (
          <motion.button
            key={i}
            type="button"
            whileTap={{ scale: 0.9 }}
            onClick={() => toggle(i)}
            className={`w-9 h-9 rounded-full border-2 border-ink/20 ${
              i < filled ? 'bg-coral' : 'bg-white'
            }`}
            aria-label={`Dot ${i + 1}`}
          />
        ))}
      </div>
      <div className="flex gap-2 justify-center">
        <button type="button" onClick={() => { setFilled(0); setMsg('') }} className="pastel-btn px-3 py-1.5 bg-soft text-sm">
          Clear
        </button>
        <button type="button" onClick={check} className="pastel-btn px-4 py-1.5 bg-ink text-white text-sm">
          Check
        </button>
      </div>
      {msg && <p className="text-center text-sm font-semibold text-ink mt-3">{msg}</p>}
    </div>
  )
}
