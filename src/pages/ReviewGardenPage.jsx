import { motion } from 'framer-motion'
import { mathCategories } from '../data/mathQuestions'
import { getSrsCards, getDueTopics } from '../utils/progress'
import { growthStage } from '../utils/srs'
import Mascot, { pickLine } from '../components/Mascot'

const PLANTS = ['🌱', '🌿', '🌷', '🌳']

export default function ReviewGardenPage({ onReviewTopic, onGoHome }) {
  const cards = getSrsCards()
  const due = getDueTopics()

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative z-10 min-h-screen px-4 md:px-8 py-6 pb-16 max-w-3xl mx-auto"
    >
      <button type="button" onClick={onGoHome} className="pastel-btn px-4 py-2 bg-white shadow-card text-sm mb-4 border border-black/5">
        ← Kingdom
      </button>
      <h1 className="text-3xl font-bold text-ink mb-1">Review Garden 🌸</h1>
      <p className="text-muted mb-4">Plants grow when you review on time. Water the ones that are due!</p>
      <Mascot mood="happy" message={due.length ? `You have ${due.length} plant(s) to water today.` : pickLine('welcome', 2)} className="mb-6" />

      {due.length > 0 && (
        <div className="mb-6">
          <h2 className="font-bold text-ink mb-2">Due today</h2>
          <div className="flex flex-wrap gap-2">
            {due.map((tid) => {
              const cat = mathCategories.find((c) => c.id === tid)
              return (
                <button
                  key={tid}
                  type="button"
                  onClick={() => onReviewTopic(tid)}
                  className="pastel-btn px-4 py-2 bg-mint/60 text-ink text-sm border border-mint"
                >
                  Water {cat?.icon} {cat?.name || tid}
                </button>
              )
            })}
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {mathCategories.map((cat) => {
          const card = cards[cat.id]
          const stage = growthStage(card)
          const isDue = due.includes(cat.id)
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => onReviewTopic(cat.id)}
              className={`island-card pastel-card p-4 text-left ${isDue ? 'ring-2 ring-success' : ''}`}
            >
              <div className="text-4xl mb-2">{PLANTS[stage]}</div>
              <div className="font-bold text-ink text-sm">{cat.name}</div>
              <div className="text-xs text-muted mt-1">
                {card ? `Stage ${stage + 1}/4 · ${card.reps} reviews` : 'Not planted yet — practise to plant'}
              </div>
              {isDue && <div className="text-xs font-semibold text-success mt-1">Needs water</div>}
            </button>
          )
        })}
      </div>
    </motion.div>
  )
}
