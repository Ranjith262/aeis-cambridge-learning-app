import { mathCategories } from '../data/mathQuestions'
import { getTopicMastery } from '../utils/progress'
import { CATEGORY_TO_WORLD } from '../utils/islandUnlocks'

/**
 * Illustrated Math Kingdom — castle islands on water (mockup-aligned).
 */
const POS = [
  { x: 18, y: 28 },
  { x: 42, y: 22 },
  { x: 68, y: 26 },
  { x: 86, y: 38 },
  { x: 28, y: 48 },
  { x: 55, y: 52 },
  { x: 78, y: 58 },
  { x: 18, y: 72 },
  { x: 48, y: 78 },
  { x: 78, y: 78 },
]

function CastleIsland({ x, y, label, icon, mastery, onClick, onTeach }) {
  const bloom = mastery != null && mastery >= 80
  return (
    <g
      transform={`translate(${x}, ${y})`}
      style={{ cursor: 'pointer' }}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onClick?.()}
    >
      {/* island base */}
      <ellipse cx="0" cy="28" rx="36" ry="12" fill="#6FCF97" />
      <ellipse cx="0" cy="26" rx="32" ry="9" fill="#82E0AA" />
      {/* keep */}
      <rect x="-14" y="-8" width="28" height="28" rx="2" fill="#FFF8E7" stroke="#D4A574" strokeWidth="1.2" />
      <rect x="-22" y="0" width="10" height="20" rx="1" fill="#FFF8E7" stroke="#D4A574" strokeWidth="1" />
      <rect x="12" y="0" width="10" height="20" rx="1" fill="#FFF8E7" stroke="#D4A574" strokeWidth="1" />
      {/* roofs */}
      <polygon points="-14,-8 0,-22 14,-8" fill="#E74C3C" />
      <polygon points="-22,0 -17,-10 -12,0" fill="#E74C3C" />
      <polygon points="12,0 17,-10 22,0" fill="#E74C3C" />
      {/* flags */}
      <line x1="0" y1="-22" x2="0" y2="-30" stroke="#2D3436" strokeWidth="1" />
      <polygon points="0,-30 10,-26 0,-22" fill="#F1C40F" />
      {/* door */}
      <rect x="-5" y="10" width="10" height="10" rx="1" fill="#A67C52" />
      {/* icon badge */}
      <circle cx="0" cy="-2" r="9" fill="white" stroke={bloom ? '#00B894' : '#DFE6E9'} strokeWidth="1.5" />
      <text textAnchor="middle" y="3" fontSize="11">{icon}</text>
      {/* label plate */}
      <rect x="-28" y="36" width="56" height="14" rx="4" fill="white" opacity="0.95" />
      <text textAnchor="middle" y="46" fontSize="6.5" fontWeight="700" fill="#2D3436">
        {label.length > 14 ? label.slice(0, 13) + '…' : label}
      </text>
      {mastery != null && (
        <text textAnchor="middle" y="56" fontSize="5.5" fill="#00B894" fontWeight="600">
          {mastery}%
        </text>
      )}
    </g>
  )
}

export default function MathKingdomMap({ onSelectTopic, onTeach, onOpenWorld }) {
  return (
    <div className="kingdom-map-shell rounded-3xl border border-[#B8E0F0] shadow-soft bg-[#E3F6FC]">
      <svg
        viewBox="0 0 100 100"
        className="w-full h-auto"
        style={{ minHeight: 320, maxHeight: 480 }}
        role="img"
        aria-label="Math Kingdom map"
      >
        <defs>
          <linearGradient id="skyK2" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FFF6E8" />
            <stop offset="40%" stopColor="#D6F0FA" />
            <stop offset="100%" stopColor="#7EC8E3" />
          </linearGradient>
          <linearGradient id="water2" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#A8D8EA" />
            <stop offset="100%" stopColor="#5BB8D9" />
          </linearGradient>
        </defs>
        <rect width="100" height="100" fill="url(#skyK2)" />
        {/* water */}
        <ellipse cx="50" cy="70" rx="70" ry="42" fill="url(#water2)" />
        <ellipse cx="20" cy="85" rx="20" ry="6" fill="#A8D8EA" opacity="0.5" />
        <ellipse cx="75" cy="90" rx="25" ry="5" fill="#A8D8EA" opacity="0.4" />
        {/* clouds */}
        <ellipse cx="15" cy="12" rx="8" ry="3.5" fill="white" opacity="0.9" />
        <ellipse cx="20" cy="11" rx="5" ry="3" fill="white" opacity="0.9" />
        <ellipse cx="70" cy="10" rx="9" ry="3.5" fill="white" opacity="0.75" />
        <ellipse cx="88" cy="16" rx="6" ry="2.5" fill="white" opacity="0.7" />
        {/* sun */}
        <circle cx="90" cy="12" r="5" fill="#FFE9A8" />
        {/* bridges */}
        <path d="M22 35 Q35 40 40 30" stroke="#D4A574" strokeWidth="1.5" fill="none" opacity="0.7" />
        <path d="M48 30 Q58 38 65 32" stroke="#D4A574" strokeWidth="1.5" fill="none" opacity="0.7" />
        <path d="M30 55 Q42 60 52 55" stroke="#D4A574" strokeWidth="1.5" fill="none" opacity="0.7" />

        {mathCategories.map((cat, i) => {
          const pos = POS[i] || { x: 50, y: 50 }
          const mastery = getTopicMastery(cat.id)
          return (
            <CastleIsland
              key={cat.id}
              x={pos.x}
              y={pos.y}
              label={cat.name}
              icon={cat.icon}
              mastery={mastery}
              onClick={() => {
                const world = CATEGORY_TO_WORLD[cat.id]
                if (world && onOpenWorld) onOpenWorld(world)
                else onSelectTopic?.(cat.id)
              }}
            />
          )
        })}
      </svg>
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[10px] sm:text-xs text-ink/70 bg-white/90 px-3 py-1 rounded-full shadow-sm pointer-events-none">
        Tap a castle island to explore
      </div>
    </div>
  )
}
