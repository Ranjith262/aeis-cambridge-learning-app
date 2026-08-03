import { motion } from 'framer-motion'
import { mathCategories } from '../data/mathQuestions'
import { getSrsCards, getDueTopics } from '../utils/progress'
import { growthStage } from '../utils/srs'
import Mascot, { pickLine } from '../components/Mascot'

const FLOWERS = ['🌱', '🌿', '🌷', '🌸', '🌻']

export default function ReviewGardenPage({ onReviewTopic, onGoHome }) {
  const cards = getSrsCards()
  const due = getDueTopics()

  const mastered = mathCategories.filter((c) => {
    const card = cards[c.id]
    return card && growthStage(card) >= 3
  })
  const growing = mathCategories.filter((c) => {
    const card = cards[c.id]
    return card && growthStage(card) > 0 && growthStage(card) < 3
  })
  const seeds = mathCategories.filter((c) => !cards[c.id] || growthStage(cards[c.id]) === 0)

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative z-10 min-h-screen px-4 md:px-8 py-6 pb-16 max-w-3xl mx-auto overflow-x-clip"
    >
      <button type="button" onClick={onGoHome} className="pastel-btn px-4 py-2 bg-white shadow-card text-sm mb-4 border border-black/5">
        ← Kingdom
      </button>
      <h1 className="text-3xl font-bold text-ink mb-1">Review Garden</h1>
      <p className="text-muted mb-4">Flowers bloom when you review on time — water what is due!</p>
      <Mascot mood="happy" message={due.length ? `You have ${due.length} plant(s) to water today.` : pickLine('welcome', 2)} className="mb-6" />

      {due.length > 0 && (
        <div className="pastel-card p-4 mb-6 border-2 border-mint/50">
          <h2 className="font-bold text-ink mb-2">💧 Due for review</h2>
          <div className="flex flex-wrap gap-2">
            {due.map((tid) => {
              const cat = mathCategories.find((c) => c.id === tid)
              return (
                <button
                  key={tid}
                  type="button"
                  onClick={() => onReviewTopic(tid)}
                  className="pastel-btn px-4 py-2 bg-mint/70 text-ink text-sm"
                >
                  Water {cat?.icon} {cat?.name || tid}
                </button>
              )
            })}
          </div>
        </div>
      )}

      <div className="pastel-card p-4 mb-4">
        <h2 className="font-bold text-ink mb-3">Mastered</h2>
        <div className="flex flex-wrap gap-3">
          {mastered.length === 0 && <p className="text-sm text-muted">Keep practising — flowers will bloom here.</p>}
          {mastered.map((cat) => (
            <div key={cat.id} className="text-center">
              <div className="text-3xl">{FLOWERS[4]}</div>
              <div className="text-[10px] font-semibold text-ink max-w-[64px]">{cat.name}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="pastel-card p-4 mb-4">
        <h2 className="font-bold text-ink mb-3">Growing</h2>
        <div className="flex flex-wrap gap-3">
          {growing.length === 0 && <p className="text-sm text-muted">Reviews will appear here.</p>}
          {growing.map((cat) => {
            const stage = growthStage(cards[cat.id])
            return (
              <button key={cat.id} type="button" onClick={() => onReviewTopic(cat.id)} className="text-center">
                <div className="text-3xl">{FLOWERS[stage]}</div>
                <div className="text-[10px] font-semibold text-ink max-w-[64px]">{cat.name}</div>
              </button>
            )
          })}
        </div>
      </div>

      <div className="pastel-card p-4">
        <h2 className="font-bold text-ink mb-3">Seeds (not planted yet)</h2>
        <div className="flex flex-wrap gap-3">
          {seeds.map((cat) => (
            <button key={cat.id} type="button" onClick={() => onReviewTopic(cat.id)} className="text-center opacity-80">
              <div className="text-3xl">🌱</div>
              <div className="text-[10px] font-semibold text-ink max-w-[64px]">{cat.name}</div>
            </button>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
