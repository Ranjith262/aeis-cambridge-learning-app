import { motion } from 'framer-motion'

const LINES = {
  welcome: [
    "Hi! I'm Captain Number. Ready for an adventure?",
    "Let's explore the Math Kingdom together!",
    "You're going to do great today!",
  ],
  correct: [
    "Brilliant thinking!",
    "You got it — super work!",
    "Yes! That's the way!",
    "Smart move!",
    "Wonderful!",
  ],
  incorrect: [
    "Good try! Let's look together.",
    "Almost — here's a helpful tip.",
    "Mistakes help us grow. You've got this!",
    "Nice effort! Let's learn from this one.",
  ],
  encourage: [
    "Take your time — you're learning!",
    "Every question makes you stronger.",
    "I believe in you!",
  ],
  complete: [
    "Quest complete! You're a Math star!",
    "Fantastic session — well done!",
    "You practised hard. Proud of you!",
  ],
}

export function pickLine(kind, seed = 0) {
  const list = LINES[kind] || LINES.encourage
  return list[Math.abs(seed) % list.length]
}

export default function Mascot({ mood = 'idle', message, size = 'md', className = '' }) {
  const sizes = { sm: 'text-4xl', md: 'text-5xl', lg: 'text-6xl' }
  const faces = {
    idle: '🧭',
    happy: '🌟',
    thinking: '🤔',
    encourage: '💪',
    celebrate: '🎉',
  }

  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className={`flex items-start gap-3 ${className}`}
    >
      <motion.div
        className={`${sizes[size]} float-gentle select-none`}
        animate={mood === 'happy' || mood === 'celebrate' ? { rotate: [0, -8, 8, 0] } : {}}
        transition={{ duration: 0.6 }}
      >
        {faces[mood] || faces.idle}
      </motion.div>
      {message && (
        <div className="pastel-card px-4 py-3 text-sm text-ink max-w-xs relative">
          <div className="absolute -left-1.5 top-4 w-3 h-3 bg-white rotate-45 border-l border-b border-white" />
          <p className="font-medium text-ink leading-snug">{message}</p>
          <p className="text-xs text-muted mt-1">Captain Number</p>
        </div>
      )}
    </motion.div>
  )
}
