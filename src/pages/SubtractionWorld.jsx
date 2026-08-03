import { useState } from 'react'
import IslandWorld from '../world/shared/IslandWorld'
import { generateSubSession } from '../world/subtraction/subGenerator'
import { BarModel, NumberLine } from '../components/manipulatives'

export default function SubtractionWorld({ onGoHome }) {
  const [whole, setWhole] = useState(12)
  const [take, setTake] = useState(5)

  const cinemaBeats = [
    { title: 'Taking away', speech: 'Subtraction means starting with a whole and removing a part.', visual: { a: 10, b: 3, diff: 7 } },
    { title: 'Count back', speech: 'Start at the whole, count back the take-away number.', visual: { a: 15, b: 4, diff: 11 } },
    { title: 'What is left?', speech: 'The leftover is the answer — the other part of the whole.', visual: { a: 9, b: 2, diff: 7 } },
    { title: 'Ready', speech: 'You can take away with confidence now!', visual: { a: 14, b: 6, diff: 8 } },
  ]

  const visual = (v) => {
    const a = v?.a ?? whole
    const b = v?.b ?? take
    const diff = v?.diff ?? Math.max(0, a - b)
    return (
      <div className="space-y-2">
        <BarModel
          parts={[
            { value: diff, color: '#A8E6CF' },
            { value: b, color: '#FFAAA5' },
          ]}
          total={a}
          label="Whole and parts"
        />
        <NumberLine from={0} to={Math.max(20, a + 2)} marks={[diff, a]} highlight={diff} />
      </div>
    )
  }

  return (
    <IslandWorld
      title="Subtraction Island"
      emoji="➖"
      blurb="Take away, count back, and see what is left — subtraction as a story."
      gradient="linear-gradient(165deg, #FBE9E7 0%, #FFF3E0 45%, #E8F5E9 100%)"
      generateSession={generateSubSession}
      cinemaBeats={cinemaBeats}
      renderCinemaVisual={visual}
      renderLab={() => (
        <div>
          {visual({ a: whole, b: take, diff: Math.max(0, whole - take) })}
          <div className="grid grid-cols-2 gap-3 mt-4">
            <div className="pastel-card p-3">
              <p className="text-xs font-bold text-muted mb-2">Whole</p>
              <div className="flex gap-2">
                <button type="button" className="pastel-btn flex-1 py-2 bg-soft" onClick={() => setWhole((n) => Math.max(take, n - 1))}>−</button>
                <button type="button" className="pastel-btn flex-1 py-2 bg-mint/50" onClick={() => setWhole((n) => Math.min(30, n + 1))}>+</button>
              </div>
            </div>
            <div className="pastel-card p-3">
              <p className="text-xs font-bold text-muted mb-2">Take away</p>
              <div className="flex gap-2">
                <button type="button" className="pastel-btn flex-1 py-2 bg-soft" onClick={() => setTake((n) => Math.max(0, n - 1))}>−</button>
                <button type="button" className="pastel-btn flex-1 py-2 bg-coral/40" onClick={() => setTake((n) => Math.min(whole, n + 1))}>+</button>
              </div>
            </div>
          </div>
          <p className="text-center font-bold text-ink mt-3 text-lg">
            {whole} − {take} = {whole - take}
          </p>
        </div>
      )}
      parentLine={(c, t) =>
        c / t >= 0.8
          ? 'Subtraction is settling well. Play “how many left?” with snacks or toys.'
          : 'Use a story: we had ___, we gave away ___, how many left? Act it out.'
      }
      onGoHome={onGoHome}
    />
  )
}
