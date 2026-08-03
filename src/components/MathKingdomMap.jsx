import { mathCategories } from '../data/mathQuestions'
import { getTopicMastery } from '../utils/progress'
import { CATEGORY_TO_WORLD } from '../utils/islandUnlocks'

/**
 * Illustrated Math Kingdom — castle-island layout inspired by product mockups.
 * No Framer drag transforms on the shell (prevents shake when scrolling/dragging).
 */
const POSITIONS = [
  { x: 14, y: 42 },
  { x: 36, y: 28 },
  { x: 58, y: 38 },
  { x: 78, y: 26 },
  { x: 88, y: 48 },
  { x: 22, y: 68 },
  { x: 44, y: 62 },
  { x: 64, y: 72 },
  { x: 80, y: 68 },
  { x: 50, y: 88 },
]

export default function MathKingdomMap({ onSelectTopic, onTeach, onOpenWorld }) {
  return (
    <div className="kingdom-map-shell rounded-2xl border border-black/5 shadow-soft" style={{ minHeight: 380 }}>
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden
      >
        <defs>
          <linearGradient id="water" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#B8E0F0" />
            <stop offset="100%" stopColor="#7EC8E3" />
          </linearGradient>
          <linearGradient id="skyK" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FFF6E8" />
            <stop offset="45%" stopColor="#E3F4FC" />
            <stop offset="100%" stopColor="#B8E0F0" />
          </linearGradient>
        </defs>
        <rect width="100" height="100" fill="url(#skyK)" />
        {/* Water base */}
        <ellipse cx="50" cy="78" rx="70" ry="40" fill="url(#water)" />
        <ellipse cx="30" cy="85" rx="25" ry="8" fill="#A8D8EA" opacity="0.5" />
        <ellipse cx="70" cy="90" rx="30" ry="7" fill="#A8D8EA" opacity="0.4" />
        {/* Clouds */}
        <ellipse cx="16" cy="12" rx="8" ry="3.5" fill="white" opacity="0.85" />
        <ellipse cx="20" cy="11" rx="5" ry="3" fill="white" opacity="0.85" />
        <ellipse cx="72" cy="10" rx="9" ry="3.5" fill="white" opacity="0.7" />
        <ellipse cx="90" cy="16" rx="6" ry="2.5" fill="white" opacity="0.6" />
        {/* Soft sun */}
        <circle cx="88" cy="14" r="6" fill="#FFE9A8" />
        {/* Bridges / paths between islands */}
        <path d="M20 50 Q35 55 42 48" stroke="#E8D4A8" strokeWidth="1.2" fill="none" strokeDasharray="1.5 1" opacity="0.8" />
        <path d="M48 45 Q60 50 70 40" stroke="#E8D4A8" strokeWidth="1.2" fill="none" strokeDasharray="1.5 1" opacity="0.8" />
        <path d="M30 70 Q45 75 55 68" stroke="#E8D4A8" strokeWidth="1.2" fill="none" strokeDasharray="1.5 1" opacity="0.8" />
      </svg>

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
            {/* Island plate */}
            <button
              type="button"
              onClick={() => {
                const world = CATEGORY_TO_WORLD[cat.id]
                if (world && onOpenWorld) onOpenWorld(world)
                else onSelectTopic?.(cat.id)
              }}
              className="relative flex flex-col items-center border-0 bg-transparent p-1 cursor-pointer touch-manipulation"
              style={{ WebkitTapHighlightColor: 'transparent' }}
              aria-label={`Open ${cat.name}`}
            >
              {/* Castle card — mockup style */}
              <div
                className={`relative w-[4.5rem] sm:w-20 rounded-2xl bg-white shadow-md border-2 overflow-hidden ${
                  bloom ? 'border-success' : 'border-white'
                }`}
              >
                <div className="h-10 sm:h-12 bg-gradient-to-b from-sky/40 to-mint/30 flex items-end justify-center pb-0.5">
                  <span className="text-2xl sm:text-3xl leading-none drop-shadow-sm">{cat.icon}</span>
                </div>
                <div className="px-1 py-1 bg-white text-center">
                  <div className="text-[9px] sm:text-[10px] font-bold text-ink leading-tight line-clamp-2">
                    {cat.name}
                  </div>
                  {mastery != null && (
                    <div className="mt-0.5 h-1 rounded-full bg-soft overflow-hidden">
                      <div className="h-full bg-success rounded-full" style={{ width: `${mastery}%` }} />
                    </div>
                  )}
                </div>
                {/* tiny flag */}
                <div className="absolute top-1 right-1 text-[10px]">🚩</div>
              </div>
              {/* Green island base */}
              <div className="w-16 h-3 -mt-0.5 rounded-full bg-gradient-to-b from-green-400 to-green-600 opacity-90 shadow-sm" />
            </button>
            {onTeach && (
              <button
                type="button"
                onClick={() => onTeach(cat.id)}
                className="mt-1 mx-auto block text-[9px] font-bold text-ink/70 bg-white/90 rounded-full px-2 py-0.5 shadow-sm touch-manipulation"
              >
                Teach
              </button>
            )}
          </div>
        )
      })}

      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-10 text-[10px] text-ink/70 bg-white/85 px-3 py-1 rounded-full pointer-events-none shadow-sm">
        Tap a castle island to practise
      </div>
    </div>
  )
}
