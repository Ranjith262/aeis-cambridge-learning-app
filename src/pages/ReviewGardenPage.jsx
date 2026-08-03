import { useState } from 'react'
import { motion } from 'framer-motion'
import { mathCategories } from '../data/mathQuestions'
import { getSrsCards, getDueTopics } from '../utils/progress'
import { growthStage } from '../utils/srs'
import Mascot, { pickLine } from '../components/Mascot'

const FLOWERS = ['🌱', '🌿', '🌷', '🌸', '🌻']
const QUALITY = [
  { id: 1, label: 'Again', emoji: '😫', color: 'bg-[#C4784A] text-white' },
  { id: 2, label: 'Hard', emoji: '😮', color: 'bg-[#9B59B6] text-white' },
  { id: 3, label: 'Good', emoji: '🙂', color: 'bg-[#27AE60] text-white' },
  { id: 4, label: 'Easy', emoji: '😌', color: 'bg-[#2980B9] text-white' },
]

export default function ReviewGardenPage({ onReviewTopic, onGoHome }) {
  const cards = getSrsCards()
  const due = getDueTopics()
  const [activeDue, setActiveDue] = useState(due[0] || null)
  const [msg, setMsg] = useState('')

  const mastered = mathCategories.filter((c) => {
    const card = cards[c.id]
    return card && growthStage(card) >= 3
  })
  const growing = mathCategories.filter((c) => {
    const card = cards[c.id]
    return card && growthStage(card) > 0 && growthStage(card) < 3
  })

  const rate = (q) => {
    setMsg(
      q === 4
        ? 'Blooming! This skill can rest longer.'
        : q === 3
          ? 'Good care — come back soon.'
          : q === 2
            ? 'Needs more water — practise this island.'
            : 'Let’s revisit the story on this island.'
    )
    if (activeDue && onReviewTopic && q <= 2) {
      setTimeout(() => onReviewTopic(activeDue), 600)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="relative z-10 min-h-screen pb-28 overflow-x-clip"
      style={{
        background:
          'linear-gradient(180deg, #E8F8FF 0%, #F0FFF4 40%, #FFF5F7 100%), radial-gradient(circle at 20% 80%, rgba(255,182,193,0.35), transparent 40%)',
      }}
    >
      {/* decorative blooms */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-40 text-4xl">
        <span className="absolute top-20 left-4">🌸</span>
        <span className="absolute top-32 right-8">🌼</span>
        <span className="absolute bottom-40 left-10">🌺</span>
        <span className="absolute bottom-24 right-6">🌷</span>
      </div>

      <div className="page-wrap pt-5 relative">
        <button
          type="button"
          onClick={onGoHome}
          className="w-10 h-10 rounded-full bg-white shadow-sm border border-black/5 flex items-center justify-center mb-4"
          aria-label="Back"
        >
          ←
        </button>

        <h1 className="text-3xl sm:text-4xl font-black text-ink text-center mb-6">Review Garden</h1>

        <Mascot
          mood="happy"
          message={due.length ? `Water ${due.length} plant(s) today!` : pickLine('welcome', 3)}
          className="justify-center mb-5"
          size="sm"
        />

        {/* Mastered */}
        <div className="rounded-3xl bg-white/95 shadow-sm border border-white p-4 mb-4">
          <h2 className="font-bold text-ink mb-3">Mastered</h2>
          <div className="flex flex-wrap gap-3 items-end min-h-[48px]">
            {mastered.length === 0 && <p className="text-sm text-ink/50">Flowers will bloom here as you master skills.</p>}
            {mastered.map((cat) => (
              <div key={cat.id} className="text-center">
                <div className="text-3xl">{FLOWERS[4]}</div>
                <div className="text-[9px] font-semibold text-ink max-w-[56px] leading-tight">{cat.name}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Due for review */}
        <div className="rounded-3xl bg-white/95 shadow-sm border border-white p-4 mb-4">
          <h2 className="font-bold text-ink mb-3">Due for Review</h2>
          <div className="flex flex-wrap gap-3 items-end mb-3 min-h-[48px]">
            {due.length === 0 && (
              <>
                <span className="text-2xl">🌱</span>
                <span className="text-2xl">🌱</span>
                <span className="text-2xl">🌿</span>
                <p className="text-sm text-ink/50 w-full">Nothing due — practise islands to plant more seeds.</p>
              </>
            )}
            {due.map((tid) => {
              const cat = mathCategories.find((c) => c.id === tid)
              const stage = cards[tid] ? growthStage(cards[tid]) : 0
              return (
                <button
                  key={tid}
                  type="button"
                  onClick={() => setActiveDue(tid)}
                  className={`text-center rounded-xl p-1 ${activeDue === tid ? 'ring-2 ring-success' : ''}`}
                >
                  <div className="text-3xl">{FLOWERS[stage] || '🌱'}</div>
                  <div className="text-[9px] font-semibold text-ink max-w-[56px] leading-tight">{cat?.name || tid}</div>
                </button>
              )
            })}
          </div>
          {growing.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-2 border-t border-black/5">
              {growing.map((cat) => (
                <button key={cat.id} type="button" onClick={() => onReviewTopic?.(cat.id)} className="text-center">
                  <div className="text-2xl">{FLOWERS[growthStage(cards[cat.id])]}</div>
                  <div className="text-[9px] text-ink/70">{cat.name}</div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Quality ratings — mockup style */}
        <p className="text-center text-xs text-ink/50 mb-2">How did this skill feel?</p>
        <div className="grid grid-cols-2 gap-2 mb-3">
          {QUALITY.map((q) => (
            <button
              key={q.id}
              type="button"
              onClick={() => rate(q.id)}
              className={`${q.color} rounded-2xl py-3 px-3 font-bold text-sm flex items-center justify-center gap-2 shadow-sm`}
            >
              <span className="text-lg">{q.emoji}</span>
              {q.label}
            </button>
          ))}
        </div>
        {msg && <p className="text-center text-sm font-semibold text-ink mb-3">{msg}</p>}

        {activeDue && (
          <button
            type="button"
            onClick={() => onReviewTopic?.(activeDue)}
            className="w-full py-3 rounded-full bg-ink text-white font-bold text-sm shadow-md"
          >
            Practise selected skill
          </button>
        )}
      </div>
    </motion.div>
  )
}
