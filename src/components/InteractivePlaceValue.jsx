import { useState } from 'react'
import { motion } from 'framer-motion'

/** Drag-free place value builder: add tens / ones to match a target */
export default function InteractivePlaceValue({ target = 34, onSuccess }) {
  const [tens, setTens] = useState(0)
  const [ones, setOnes] = useState(0)
  const value = tens * 10 + ones
  const [msg, setMsg] = useState('')

  const check = () => {
    if (value === target) {
      setMsg('You built it!')
      onSuccess?.()
    } else {
      setMsg(`You made ${value}. Target is ${target}.`)
    }
  }

  return (
    <div className="pastel-card p-5">
      <p className="font-bold text-ink mb-1">Build the number {target}</p>
      <p className="text-xs text-muted mb-3">Add tens and ones</p>
      <div className="flex gap-6 justify-center mb-3">
        <div>
          <p className="text-xs text-muted mb-1">Tens ({tens})</p>
          <div className="flex gap-1 mb-2 min-h-[64px]">
            {Array.from({ length: tens }).map((_, i) => (
              <motion.div key={i} layout className="w-5 h-14 rounded bg-sky" />
            ))}
          </div>
          <div className="flex gap-1">
            <button type="button" className="pastel-btn px-2 py-1 bg-sky/50 text-sm" onClick={() => setTens((t) => Math.min(9, t + 1))}>+</button>
            <button type="button" className="pastel-btn px-2 py-1 bg-soft text-sm" onClick={() => setTens((t) => Math.max(0, t - 1))}>-</button>
          </div>
        </div>
        <div>
          <p className="text-xs text-muted mb-1">Ones ({ones})</p>
          <div className="flex flex-wrap gap-1 mb-2 max-w-[80px] min-h-[64px]">
            {Array.from({ length: ones }).map((_, i) => (
              <motion.div key={i} layout className="w-4 h-4 rounded bg-mint" />
            ))}
          </div>
          <div className="flex gap-1">
            <button type="button" className="pastel-btn px-2 py-1 bg-mint/50 text-sm" onClick={() => setOnes((o) => Math.min(9, o + 1))}>+</button>
            <button type="button" className="pastel-btn px-2 py-1 bg-soft text-sm" onClick={() => setOnes((o) => Math.max(0, o - 1))}>-</button>
          </div>
        </div>
      </div>
      <p className="text-center text-lg font-bold text-ink mb-2">{value}</p>
      <div className="flex justify-center gap-2">
        <button type="button" onClick={() => { setTens(0); setOnes(0); setMsg('') }} className="pastel-btn px-3 py-1.5 bg-soft text-sm">Reset</button>
        <button type="button" onClick={check} className="pastel-btn px-4 py-1.5 bg-ink text-white text-sm">Check</button>
      </div>
      {msg && <p className="text-center text-sm font-semibold mt-2">{msg}</p>}
    </div>
  )
}
