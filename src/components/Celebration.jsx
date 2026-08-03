import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const PIECES = ['⭐', '✨', '🌟', '💫', '🎉', '🟡', '🟢', '🔵']

/** Lightweight confetti burst for correct answers / level ups */
export default function Celebration({ show, seed = 0 }) {
  const [bits, setBits] = useState([])

  useEffect(() => {
    if (!show) {
      setBits([])
      return
    }
    const next = Array.from({ length: 14 }, (_, i) => ({
      id: `${seed}-${i}`,
      emoji: PIECES[(seed + i) % PIECES.length],
      x: 10 + ((i * 17 + seed * 3) % 80),
      delay: (i % 5) * 0.05,
      rot: (i * 40) % 360,
    }))
    setBits(next)
    const t = setTimeout(() => setBits([]), 1200)
    return () => clearTimeout(t)
  }, [show, seed])

  return (
    <div className="pointer-events-none fixed inset-0 z-[60] overflow-hidden">
      <AnimatePresence>
        {bits.map((b) => (
          <motion.span
            key={b.id}
            initial={{ opacity: 1, y: '45%', x: `${b.x}vw`, scale: 0.6, rotate: 0 }}
            animate={{ opacity: 0, y: '5%', scale: 1.2, rotate: b.rot }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.1, delay: b.delay, ease: 'easeOut' }}
            className="absolute text-2xl"
          >
            {b.emoji}
          </motion.span>
        ))}
      </AnimatePresence>
    </div>
  )
}
