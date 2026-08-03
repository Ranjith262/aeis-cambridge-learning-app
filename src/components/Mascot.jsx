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

const sizeMap = { sm: 56, md: 72, lg: 96 }

/** Animated SVG mascot — Captain Number */
function CaptainSVG({ mood, px }) {
  const brow =
    mood === 'thinking'
      ? -6
      : mood === 'happy' || mood === 'celebrate'
        ? 2
        : 0
  const mouth =
    mood === 'thinking'
      ? 'M38 62 Q50 58 62 62'
      : mood === 'encourage'
        ? 'M38 60 Q50 66 62 60'
        : 'M36 58 Q50 72 64 58'

  return (
    <motion.svg
      width={px}
      height={px}
      viewBox="0 0 100 100"
      className="select-none drop-shadow-md"
      animate={
        mood === 'celebrate'
          ? { rotate: [0, -12, 12, -8, 0], y: [0, -6, 0] }
          : mood === 'happy'
            ? { y: [0, -4, 0] }
            : mood === 'thinking'
              ? { rotate: [0, -3, 3, 0] }
              : { y: [0, -3, 0] }
      }
      transition={{
        duration: mood === 'celebrate' ? 0.7 : 2.8,
        repeat: mood === 'idle' || mood === 'encourage' ? Infinity : mood === 'celebrate' ? 1 : Infinity,
        ease: 'easeInOut',
      }}
      aria-hidden
    >
      {/* Cape */}
      <ellipse cx="50" cy="78" rx="28" ry="12" fill="#FFAAA5" opacity="0.9" />
      {/* Body */}
      <circle cx="50" cy="48" r="32" fill="#A0D2EB" />
      <circle cx="50" cy="48" r="28" fill="#C5E7F5" />
      {/* Number badge */}
      <circle cx="50" cy="52" r="12" fill="#FFF5BA" stroke="#2D3436" strokeWidth="1.5" />
      <text x="50" y="56" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#2D3436">
        #
      </text>
      {/* Eyes */}
      <circle cx="38" cy="40" r="5" fill="#2D3436" />
      <circle cx="62" cy="40" r="5" fill="#2D3436" />
      <circle cx="39.5" cy="38.5" r="1.6" fill="white" />
      <circle cx="63.5" cy="38.5" r="1.6" fill="white" />
      {/* Brows */}
      <path
        d={`M32 ${34 + brow} Q38 ${32 + brow} 44 ${34 + brow}`}
        stroke="#2D3436"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d={`M56 ${34 + brow} Q62 ${32 + brow} 68 ${34 + brow}`}
        stroke="#2D3436"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
      />
      {/* Mouth */}
      <path d={mouth} stroke="#2D3436" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      {/* Hat */}
      <path d="M28 28 Q50 8 72 28" fill="#00B894" />
      <rect x="22" y="26" width="56" height="8" rx="3" fill="#00B894" />
      <circle cx="50" cy="14" r="5" fill="#FFD3B6" />
      {/* Sparkles when celebrate/happy */}
      {(mood === 'celebrate' || mood === 'happy') && (
        <>
          <motion.circle cx="18" cy="30" r="2" fill="#FDCB6E" animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1, repeat: Infinity }} />
          <motion.circle cx="84" cy="36" r="2.5" fill="#FFAAA5" animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1.2, repeat: Infinity }} />
        </>
      )}
    </motion.svg>
  )
}

export default function Mascot({ mood = 'idle', message, size = 'md', className = '' }) {
  const px = sizeMap[size] || sizeMap.md

  return (
    <motion.div
      initial={{ scale: 0.85, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className={`flex items-start gap-3 ${className}`}
    >
      <div className="flex-shrink-0 float-gentle">
        <CaptainSVG mood={mood} px={px} />
      </div>
      {message && (
        <div className="pastel-card px-4 py-3 text-sm text-ink max-w-xs relative">
          <div className="absolute -left-1.5 top-5 w-3 h-3 bg-white rotate-45 border-l border-b border-white" />
          <p className="font-medium text-ink leading-snug">{message}</p>
          <p className="text-xs text-muted mt-1">Captain Number</p>
        </div>
      )}
    </motion.div>
  )
}
