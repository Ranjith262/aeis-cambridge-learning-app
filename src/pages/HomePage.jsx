import { motion } from 'framer-motion'
import MathKingdomMap from '../components/MathKingdomMap'
import Mascot, { pickLine } from '../components/Mascot'
import { mathCategories } from '../data/mathQuestions'
import { getActiveProfile, readinessScore } from '../utils/progress'
import { adaptiveSummary } from '../world/adaptive/learnerModel'
import { CATEGORY_TO_WORLD } from '../utils/islandUnlocks'

const QUICK = [
  { id: 'numbersTo100', label: 'Numbers', icon: '➕', color: 'bg-emerald-100 text-emerald-700' },
  { id: 'addition', label: 'Addition', icon: '＋', color: 'bg-sky-100 text-sky-700' },
  { id: 'subtraction', label: 'Take away', icon: '➖', color: 'bg-orange-100 text-orange-700' },
  { id: 'shapesAndPatterns', label: 'Shapes', icon: '⭐', color: 'bg-amber-100 text-amber-700' },
  { id: 'time', label: 'Time', icon: '🕐', color: 'bg-violet-100 text-violet-700' },
  { id: 'money', label: 'Money', icon: '💰', color: 'bg-yellow-100 text-yellow-800' },
]

export default function HomePage({
  onStartQuiz,
  onTeach,
  onMock,
  onReview,
  onParent,
  onPlay,
  onPlaceValue,
  onBonds,
  onAddition,
  onSubtraction,
  onMoney,
  onTime,
  onOpenWorld,
  onEnglish,
  onSmartQuest,
}) {
  const profile = getActiveProfile()
  const readiness = readinessScore()
  const adaptive = adaptiveSummary()

  const openCat = (id) => {
    const world = CATEGORY_TO_WORLD[id]
    if (world && onOpenWorld) onOpenWorld(world)
    else onStartQuiz(id, 'math')
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="relative z-10 min-h-screen pb-24"
      style={{ background: 'linear-gradient(180deg, #FFF8EE 0%, #E8F6FC 45%, #D4EFDF 100%)' }}
    >
      <div className="page-wrap pt-4 sm:pt-6">
        {/* Top bar */}
        <div className="flex items-center justify-between mb-4 gap-2">
          <div className="flex items-center gap-2">
            <div className="w-11 h-11 rounded-full bg-white shadow-sm border border-black/5 flex items-center justify-center text-2xl">
              🧭
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wide text-ink/40">AEIS Learning World</p>
              <p className="text-sm font-bold text-ink">{profile?.name || 'Explorer'}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button type="button" onClick={onParent} className="w-10 h-10 rounded-full bg-white shadow-sm border border-black/5 text-lg" aria-label="Parent">
              👨‍👩‍👧
            </button>
            <button type="button" onClick={onEnglish} className="w-10 h-10 rounded-full bg-white shadow-sm border border-black/5 text-lg" aria-label="English">
              🦊
            </button>
          </div>
        </div>

        {/* Today's Quest banner */}
        <div className="flex justify-center mb-4">
          <div
            className="px-6 py-2 rounded-full text-center font-black text-ink text-lg sm:text-xl shadow-sm border border-[#F5D0A9]"
            style={{ background: 'linear-gradient(90deg, #FFE4B5, #FFDAB9, #FFE4B5)' }}
          >
            Today&apos;s Quest
          </div>
        </div>

        {/* Topic chips */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-4 -mx-1 px-1 scrollbar-thin">
          {QUICK.map((q) => (
            <button
              key={q.id}
              type="button"
              onClick={() => openCat(q.id)}
              className={`flex-shrink-0 flex flex-col items-center justify-center w-[4.5rem] sm:w-20 h-[4.5rem] rounded-2xl bg-white shadow-sm border border-black/5 ${q.color}`}
            >
              <span className="text-xl leading-none mb-1">{q.icon}</span>
              <span className="text-[10px] font-bold leading-tight text-center px-1">{q.label}</span>
            </button>
          ))}
        </div>

        <Mascot mood="happy" message={pickLine('welcome', 1)} className="mb-4" size="sm" />

        {/* Kingdom map */}
        <div className="mb-5">
          <MathKingdomMap
            onOpenWorld={onOpenWorld}
            onSelectTopic={(id) => onStartQuiz(id, 'math')}
            onTeach={onTeach}
          />
        </div>

        {/* Featured worlds */}
        <p className="text-xs font-bold uppercase tracking-wide text-ink/40 mb-2 px-1">Featured islands</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-5">
          {[
            { onClick: onPlaceValue, emoji: '🏰', title: 'Place Value', sub: 'Tens & ones' },
            { onClick: onBonds, emoji: '🔗', title: 'Number Bonds', sub: 'Friends of 10' },
            { onClick: onAddition, emoji: '➕', title: 'Addition', sub: 'Join groups' },
            { onClick: onSubtraction, emoji: '➖', title: 'Subtraction', sub: 'Take away' },
            { onClick: onMoney, emoji: '💰', title: 'Money', sub: 'Coins & cents' },
            { onClick: onTime, emoji: '🕐', title: 'Time', sub: "O'clock & half" },
          ].map((c) => (
            <button
              key={c.title}
              type="button"
              onClick={c.onClick}
              className="rounded-2xl bg-white p-3 text-left shadow-sm border border-black/5 island-card"
            >
              <div className="text-2xl mb-1">{c.emoji}</div>
              <div className="font-bold text-ink text-sm">{c.title}</div>
              <div className="text-[10px] text-ink/50">{c.sub}</div>
            </button>
          ))}
        </div>

        {/* Action row */}
        <div className="grid grid-cols-2 gap-3 mb-5">
          <button
            type="button"
            onClick={onSmartQuest}
            className="rounded-2xl p-4 text-left shadow-sm border-2 border-emerald-200"
            style={{ background: 'linear-gradient(135deg, #E8F5E9, #FFF8E1)' }}
          >
            <div className="text-2xl mb-1">🎯</div>
            <div className="font-black text-ink text-sm">Smart Quest</div>
            <div className="text-[10px] text-ink/60">Adaptive mix</div>
          </button>
          <button
            type="button"
            onClick={onEnglish}
            className="rounded-2xl p-4 text-left shadow-sm border-2 border-pink-200"
            style={{ background: 'linear-gradient(135deg, #FCE4EC, #E8EAF6)' }}
          >
            <div className="text-2xl mb-1">🦊</div>
            <div className="font-black text-ink text-sm">Word Harbour</div>
            <div className="text-[10px] text-ink/60">English paths</div>
          </button>
          <button type="button" onClick={onMock} className="rounded-2xl bg-white p-4 text-left shadow-sm border border-black/5">
            <div className="text-2xl mb-1">🏛️</div>
            <div className="font-black text-ink text-sm">Mock Exam</div>
            <div className="text-[10px] text-ink/60">29 + 17 paper</div>
          </button>
          <button type="button" onClick={onReview} className="rounded-2xl bg-white p-4 text-left shadow-sm border border-black/5">
            <div className="text-2xl mb-1">🌸</div>
            <div className="font-black text-ink text-sm">Review Garden</div>
            <div className="text-[10px] text-ink/60">Water due skills</div>
          </button>
          <button type="button" onClick={onPlay} className="rounded-2xl bg-white p-4 text-left shadow-sm border border-black/5">
            <div className="text-2xl mb-1">🎮</div>
            <div className="font-black text-ink text-sm">Play & Learn</div>
            <div className="text-[10px] text-ink/60">Hands-on games</div>
          </button>
          <button type="button" onClick={onParent} className="rounded-2xl bg-white p-4 text-left shadow-sm border border-black/5">
            <div className="text-2xl mb-1">📊</div>
            <div className="font-black text-ink text-sm">Parent</div>
            <div className="text-[10px] text-ink/60">Readiness {readiness}%</div>
          </button>
        </div>

        {adaptive.parentLine && (
          <div className="rounded-2xl bg-white/80 border border-emerald-100 p-3 text-xs text-ink/80 mb-4">
            <span className="font-bold text-emerald-700">Coach: </span>
            {adaptive.parentLine}
          </div>
        )}
      </div>
    </motion.div>
  )
}
