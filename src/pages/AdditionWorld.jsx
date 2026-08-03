import { useState } from 'react'
import IslandWorld from '../world/shared/IslandWorld'
import { generateAddSession } from '../world/addition/addGenerator'
import { BarModel, NumberLine } from '../components/manipulatives'

export default function AdditionWorld({ onGoHome }) {
  const [a, setA] = useState(7)
  const [b, setB] = useState(5)

  const cinemaBeats = [
    { title: 'Joining groups', speech: 'Addition means putting groups together.', visual: { a: 3, b: 2, sum: 5 } },
    { title: 'Count on', speech: 'Start at the bigger number, then count on.', visual: { a: 8, b: 3, sum: 11 } },
    { title: 'Make ten', speech: '8 + 5 → 8 + 2 = 10, then +3 = 13. Magic!', visual: { a: 8, b: 5, sum: 13 } },
    { title: 'Your turn', speech: 'You are ready to join numbers like a champion.', visual: { a: 6, b: 6, sum: 12 } },
  ]

  const visual = (v) => {
    if (!v) return null
    const x = v.a ?? a
    const y = v.b ?? b
    const sum = v.sum ?? x + y
    return (
      <div className="space-y-2">
        <BarModel parts={[{ value: x, color: '#A8E6CF' }, { value: y, color: '#FFD3B6' }]} total={sum} label="Parts to whole" />
        <NumberLine from={0} to={Math.max(20, sum + 2)} marks={[x, sum]} highlight={sum} />
      </div>
    )
  }

  return (
    <IslandWorld
      title="Addition Island"
      emoji="➕"
      blurb="Join groups, count on, and make ten — strategies that make addition feel easy."
      gradient="linear-gradient(165deg, #E8F5E9 0%, #E3F2FD 50%, #FFF8E1 100%)"
      generateSession={generateAddSession}
      cinemaBeats={cinemaBeats}
      renderCinemaVisual={visual}
      renderLab={() => (
        <div>
          {visual({ a, b, sum: a + b })}
          <div className="grid grid-cols-2 gap-3 mt-4">
            <div className="pastel-card p-3">
              <p className="text-xs font-bold text-muted mb-2">First group</p>
              <div className="flex gap-2">
                <button type="button" className="pastel-btn flex-1 py-2 bg-mint/40" onClick={() => setA((n) => Math.max(1, n - 1))}>−</button>
                <button type="button" className="pastel-btn flex-1 py-2 bg-mint/70" onClick={() => setA((n) => Math.min(20, n + 1))}>+</button>
              </div>
            </div>
            <div className="pastel-card p-3">
              <p className="text-xs font-bold text-muted mb-2">Second group</p>
              <div className="flex gap-2">
                <button type="button" className="pastel-btn flex-1 py-2 bg-peach/40" onClick={() => setB((n) => Math.max(1, n - 1))}>−</button>
                <button type="button" className="pastel-btn flex-1 py-2 bg-peach/70" onClick={() => setB((n) => Math.min(20, n + 1))}>+</button>
              </div>
            </div>
          </div>
          <p className="text-center font-bold text-ink mt-3 text-lg">{a} + {b} = {a + b}</p>
        </div>
      )}
      parentLine={(c, t) =>
        c / t >= 0.8
          ? 'Addition strategies look strong. Try “make ten” with fingers at home for 5 minutes.'
          : 'Practise joining two small groups of objects. Ask: how many altogether?'
      }
      onGoHome={onGoHome}
    />
  )
}
