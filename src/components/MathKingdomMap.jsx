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
    <div className="relative w-full rounded-2xl overflow-hidden border border-black/5 shadow-soft" style={{ minHeight: 340 }}>
      {/* Illustrated backdrop */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden>
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
        {/* Sun */}
        <circle cx="88" cy="14" r="8" fill="#FFF5BA" opacity="0.95" />
        <circle cx="88" cy="14" r="11" fill="#FFF5BA" opacity="0.25" />
        {/* Clouds */}
        <ellipse cx="18" cy="18" rx="10" ry="4" fill="white" opacity="0.7" />
        <ellipse cx="24" cy="16" rx="6" ry="3.5" fill="white" opacity="0.7" />
        <ellipse cx="55" cy="12" rx="9" ry="3.5" fill="white" opacity="0.55" />
        {/* Hills */}
        <ellipse cx="20" cy="95" rx="40" ry="28" fill="url(#hill1)" />
        <ellipse cx="70" cy="100" rx="45" ry="30" fill="#6FCF97" opacity="0.85" />
        <ellipse cx="50" cy="105" rx="55" ry="22" fill="#82E0AA" opacity="0.7" />
        {/* Path */}
        <path
          d="M10 70 Q25 55 40 65 T70 55 T95 75"
          fill="none"
          stroke="#F5E6C8"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray="2 1.5"
          opacity="0.9"
        />
        {/* Castle on the far hill */}
        <g transform="translate(78,38)">
          <rect x="0" y="8" width="14" height="14" fill="#FFEAA7" stroke="#2D3436" strokeWidth="0.4" />
          <polygon points="0,8 7,-2 14,8" fill="#FFAAA5" />
          <rect x="5" y="14" width="4" height="8" fill="#636E72" />
          <rect x="-3" y="4" width="4" height="10" fill="#FFEAA7" stroke="#2D3436" strokeWidth="0.3" />
          <rect x="13" y="4" width="4" height="10" fill="#FFEAA7" stroke="#2D3436" strokeWidth="0.3" />
        </g>
      </svg>

      {/* Islands */}
      {mathCategories.map((cat, i) => {
        const pos = POSITIONS[i] || { x: 50, y: 50 }
        const mastery = getTopicMastery(cat.id)
        const bloom = mastery != null && mastery >= 80
        return (
          <motion.button
            key={cat.id}
            type="button"
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onSelectTopic?.(cat.id)}
            className="absolute flex flex-col items-center -translate-x-1/2 -translate-y-1/2 group"
            style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
            title={cat.name}
          >
            <div
              className={`w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center text-2xl shadow-card border-2 ${
                bloom ? 'border-success ring-2 ring-success/30' : 'border-white/80'
              }`}
              style={{ background: FILL[i % FILL.length] }}
            >
              {cat.icon}
            </div>
            <span className="mt-1 px-1.5 py-0.5 rounded-md bg-white/90 text-[9px] md:text-[10px] font-bold text-ink max-w-[72px] text-center leading-tight shadow-sm">
              {cat.name}
            </span>
            {mastery != null && (
              <span className="text-[9px] font-semibold text-ink/70 bg-white/80 rounded px-1 mt-0.5">
                {mastery}%
              </span>
            )}
            {onTeach && (
              <span
                role="link"
                tabIndex={0}
                onClick={(e) => {
                  e.stopPropagation()
                  onTeach(cat.id)
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.stopPropagation()
                    onTeach(cat.id)
                  }
                }}
                className="opacity-0 group-hover:opacity-100 text-[9px] text-ink underline mt-0.5"
              >
                Teach
              </span>
            )}
          </motion.button>
        )
      })}

      <div className="absolute bottom-2 left-3 text-[10px] text-ink/60 bg-white/70 px-2 py-0.5 rounded">
        Tap an island to practise
      </div>
    </div>
  )
}
