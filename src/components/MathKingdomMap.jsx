import { motion } from 'framer-motion'
import { mathCategories } from '../data/mathQuestions'
import { getTopicMastery } from '../utils/progress'

/** Island positions on the illustrated map (percent) */
const POSITIONS = [
  { x: 12, y: 58 },
  { x: 28, y: 32 },
  { x: 48, y: 48 },
  { x: 65, y: 28 },
  { x: 82, y: 52 },
  { x: 18, y: 78 },
  { x: 40, y: 70 },
  { x: 58, y: 78 },
  { x: 75, y: 70 },
  { x: 88, y: 78 },
]

const FILL = [
  '#A0D2EB', '#A8E6CF', '#FFD3B6', '#FFF5BA', '#FFAAA5',
  '#B5EAD7', '#C7CEEA', '#E2F0CB', '#FFDAC1', '#F8B195',
]

export default function MathKingdomMap({ onSelectTopic, onTeach }) {
  return (
    <div
      className="relative w-full rounded-2xl overflow-hidden border border-black/5 shadow-soft"
      style={{ minHeight: 360 }}
    >
      {/* Illustrated backdrop — never capture clicks */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden
      >
        <defs>
          <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#A0D2EB" />
            <stop offset="55%" stopColor="#E8F6F0" />
            <stop offset="100%" stopColor="#A8E6CF" />
          </linearGradient>
          <linearGradient id="hill1" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#7BC9A6" />
            <stop offset="100%" stopColor="#5BB88F" />
          </linearGradient>
        </defs>
        <rect width="100" height="100" fill="url(#skyGrad)" />
        <circle cx="88" cy="14" r="8" fill="#FFF5BA" opacity="0.95" />
        <circle cx="88" cy="14" r="11" fill="#FFF5BA" opacity="0.25" />
        <ellipse cx="18" cy="18" rx="10" ry="4" fill="white" opacity="0.7" />
        <ellipse cx="24" cy="16" rx="6" ry="3.5" fill="white" opacity="0.7" />
        <ellipse cx="55" cy="12" rx="9" ry="3.5" fill="white" opacity="0.55" />
        <ellipse cx="20" cy="95" rx="40" ry="28" fill="url(#hill1)" />
        <ellipse cx="70" cy="100" rx="45" ry="30" fill="#6FCF97" opacity="0.85" />
        <ellipse cx="50" cy="105" rx="55" ry="22" fill="#82E0AA" opacity="0.7" />
        <path
          d="M10 70 Q25 55 40 65 T70 55 T95 75"
          fill="none"
          stroke="#F5E6C8"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray="2 1.5"
          opacity="0.9"
        />
        <g transform="translate(78,38)">
          <rect x="0" y="8" width="14" height="14" fill="#FFEAA7" stroke="#2D3436" strokeWidth="0.4" />
          <polygon points="0,8 7,-2 14,8" fill="#FFAAA5" />
          <rect x="5" y="14" width="4" height="8" fill="#636E72" />
          <rect x="-3" y="4" width="4" height="10" fill="#FFEAA7" stroke="#2D3436" strokeWidth="0.3" />
          <rect x="13" y="4" width="4" height="10" fill="#FFEAA7" stroke="#2D3436" strokeWidth="0.3" />
        </g>
      </svg>

      {/* Islands — position wrapper is static; motion only on inner circle so transform never fights centering */}
      {mathCategories.map((cat, i) => {
        const pos = POSITIONS[i] || { x: 50, y: 50 }
        const mastery = getTopicMastery(cat.id)
        const bloom = mastery != null && mastery >= 80

        return (
          <div
            key={cat.id}
            className="absolute z-10"
            style={{
              left: `${pos.x}%`,
              top: `${pos.y}%`,
              transform: 'translate(-50%, -50%)',
            }}
          >
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                onSelectTopic?.(cat.id)
              }}
              className="flex flex-col items-center cursor-pointer bg-transparent border-0 p-2 -m-2 touch-manipulation"
              style={{ WebkitTapHighlightColor: 'transparent' }}
              title={`Practise ${cat.name}`}
              aria-label={`Practise ${cat.name}`}
            >
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.92 }}
                transition={{ type: 'spring', stiffness: 400, damping: 22 }}
                className={`w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center text-2xl shadow-card border-2 pointer-events-none ${
                  bloom ? 'border-success ring-2 ring-success/30' : 'border-white/80'
                }`}
                style={{ background: FILL[i % FILL.length] }}
              >
                <span aria-hidden>{cat.icon}</span>
              </motion.div>
              <span className="mt-1 px-1.5 py-0.5 rounded-md bg-white/95 text-[9px] md:text-[10px] font-bold text-ink max-w-[80px] text-center leading-tight shadow-sm pointer-events-none">
                {cat.name}
              </span>
              {mastery != null && (
                <span className="text-[9px] font-semibold text-ink/70 bg-white/90 rounded px-1 mt-0.5 pointer-events-none">
                  {mastery}%
                </span>
              )}
            </button>

            {onTeach && (
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  onTeach(cat.id)
                }}
                className="mt-0.5 mx-auto block text-[9px] font-semibold text-ink/80 underline bg-white/80 rounded px-1.5 py-0.5"
              >
                Teach
              </button>
            )}
          </div>
        )
      })}

      <div className="absolute bottom-2 left-3 z-10 text-[10px] text-ink/60 bg-white/80 px-2 py-0.5 rounded pointer-events-none">
        Tap an island to practise
      </div>
    </div>
  )
}
