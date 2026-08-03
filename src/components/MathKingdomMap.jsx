import { mathCategories } from '../data/mathQuestions'
import { getTopicMastery } from '../utils/progress'
import { CATEGORY_TO_WORLD } from '../utils/islandUnlocks'

/**
 * Kid-clear Math Kingdom: one island = one big tappable card.
 * No overlapping SVG pile — every topic is obvious.
 */
function MiniCastle({ color = '#E74C3C' }) {
  return (
    <svg viewBox="0 0 64 56" className="w-14 h-12 mx-auto" aria-hidden>
      <ellipse cx="32" cy="50" rx="28" ry="8" fill="#6FCF97" />
      <rect x="18" y="22" width="28" height="26" rx="2" fill="#FFF8E7" stroke="#D4A574" strokeWidth="1.5" />
      <rect x="8" y="30" width="12" height="18" rx="1" fill="#FFF8E7" stroke="#D4A574" strokeWidth="1.2" />
      <rect x="44" y="30" width="12" height="18" rx="1" fill="#FFF8E7" stroke="#D4A574" strokeWidth="1.2" />
      <polygon points="18,22 32,8 46,22" fill={color} />
      <polygon points="8,30 14,18 20,30" fill={color} />
      <polygon points="44,30 50,18 56,30" fill={color} />
      <rect x="28" y="36" width="8" height="12" rx="1" fill="#A67C52" />
      <line x1="32" y1="8" x2="32" y2="2" stroke="#2D3436" strokeWidth="1.5" />
      <polygon points="32,2 42,6 32,10" fill="#F1C40F" />
    </svg>
  )
}

const ROOF = ['#E74C3C', '#E67E22', '#9B59B6', '#3498DB', '#1ABC9C', '#F39C12', '#E91E63', '#00BCD4', '#8BC34A', '#FF5722']

export default function MathKingdomMap({ onSelectTopic, onTeach, onOpenWorld }) {
  const open = (catId) => {
    const world = CATEGORY_TO_WORLD[catId]
    if (world && onOpenWorld) onOpenWorld(world)
    else onSelectTopic?.(catId)
  }

  return (
    <div
      className="rounded-3xl border border-[#B8E0F0] shadow-soft overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #FFF6E8 0%, #D6F0FA 42%, #7EC8E3 100%)',
      }}
    >
      {/* Sky decorations */}
      <div className="relative px-3 pt-4 pb-2">
        <div className="flex justify-between items-start mb-2 px-1">
          <span className="text-2xl opacity-80" aria-hidden>
            ☁️
          </span>
          <span className="text-2xl" aria-hidden>
            ☀️
          </span>
          <span className="text-2xl opacity-70" aria-hidden>
            ☁️
          </span>
        </div>
        <p className="text-center text-sm font-black text-ink mb-1">Math Kingdom</p>
        <p className="text-center text-[11px] text-ink/60 mb-3">Pick one island — each castle is one topic</p>

        {/* Clear grid: one card per topic */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pb-3">
          {mathCategories.map((cat, i) => {
            const mastery = getTopicMastery(cat.id)
            const bloom = mastery != null && mastery >= 80
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => open(cat.id)}
                className={`relative rounded-2xl bg-white/95 border-2 p-3 text-center shadow-sm transition active:scale-95 touch-manipulation ${
                  bloom ? 'border-emerald-400 ring-2 ring-emerald-200' : 'border-white'
                }`}
                style={{ minHeight: 120 }}
                aria-label={`Open ${cat.name}`}
              >
                <MiniCastle color={ROOF[i % ROOF.length]} />
                <div className="mt-1 text-2xl leading-none" aria-hidden>
                  {cat.icon}
                </div>
                <div className="mt-1 text-xs font-bold text-ink leading-tight px-0.5">{cat.name}</div>
                {mastery != null ? (
                  <div className="mt-1.5 h-1.5 rounded-full bg-gray-100 overflow-hidden mx-2">
                    <div
                      className="h-full rounded-full bg-emerald-400"
                      style={{ width: `${mastery}%` }}
                    />
                  </div>
                ) : (
                  <div className="mt-1 text-[9px] text-ink/40 font-medium">New</div>
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
                    className="mt-1 inline-block text-[9px] font-semibold text-sky-600 underline"
                  >
                    Teach me
                  </span>
                )}
              </button>
            )
          })}
        </div>
      </div>

      {/* Water band */}
      <div
        className="h-8 w-full"
        style={{ background: 'linear-gradient(180deg, #5BB8D9 0%, #3A9BC1 100%)' }}
        aria-hidden
      />
    </div>
  )
}
