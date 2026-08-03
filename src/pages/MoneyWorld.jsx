import { useState } from 'react'
import IslandWorld from '../world/shared/IslandWorld'
import { generateMoneySession } from '../world/money/moneyGenerator'
import { CoinTray, BarModel } from '../components/manipulatives'

export default function MoneyWorld({ onGoHome }) {
  const [c1, setC1] = useState(20)
  const [c2, setC2] = useState(10)
  const coins = [5, 10, 20, 50]

  const cinemaBeats = [
    { title: 'Coins have value', speech: 'A 20¢ coin is worth more than a 5¢ coin — not because it is bigger only, but because of its number!', visual: { c1: 20, c2: 5, total: 25 } },
    { title: 'Add coin values', speech: 'Add the numbers on the coins to find the total cents.', visual: { c1: 10, c2: 10, total: 20 } },
    { title: '100 cents', speech: '100 cents make 1 dollar. We practise cents first.', visual: { c1: 50, c2: 50, total: 100 } },
    { title: 'Ready', speech: 'You can total coins like a shopkeeper!', visual: { c1: 20, c2: 50, total: 70 } },
  ]

  const visual = (v) => {
    const x = v?.c1 ?? c1
    const y = v?.c2 ?? c2
    const total = v?.total ?? x + y
    return (
      <div className="space-y-2">
        <CoinTray amountCents={total} />
        <BarModel parts={[{ value: x, color: '#FFF5BA' }, { value: y, color: '#FFD3B6' }]} total={total} label="Coin values" />
      </div>
    )
  }

  return (
    <IslandWorld
      title="Money Island"
      emoji="💰"
      blurb="Learn coin values and add cents — shopping-ready number sense."
      gradient="linear-gradient(165deg, #FFF8E1 0%, #E8F5E9 50%, #E3F2FD 100%)"
      generateSession={generateMoneySession}
      cinemaBeats={cinemaBeats}
      renderCinemaVisual={visual}
      renderLab={() => (
        <div>
          {visual({ c1, c2, total: c1 + c2 })}
          <div className="grid grid-cols-2 gap-3 mt-4">
            <div className="pastel-card p-3">
              <p className="text-xs font-bold text-muted mb-2">Coin A</p>
              <div className="flex flex-wrap gap-1">
                {coins.map((c) => (
                  <button key={c} type="button" onClick={() => setC1(c)} className={`pastel-btn px-2 py-1 text-xs ${c1 === c ? 'bg-ink text-white' : 'bg-soft'}`}>{c}¢</button>
                ))}
              </div>
            </div>
            <div className="pastel-card p-3">
              <p className="text-xs font-bold text-muted mb-2">Coin B</p>
              <div className="flex flex-wrap gap-1">
                {coins.map((c) => (
                  <button key={c} type="button" onClick={() => setC2(c)} className={`pastel-btn px-2 py-1 text-xs ${c2 === c ? 'bg-ink text-white' : 'bg-soft'}`}>{c}¢</button>
                ))}
              </div>
            </div>
          </div>
          <p className="text-center font-bold text-lg mt-3">{c1}¢ + {c2}¢ = {c1 + c2}¢</p>
        </div>
      )}
      parentLine={(c, t) =>
        c / t >= 0.8
          ? 'Coin totals look strong. Let your child “pay” with real or play coins for small amounts.'
          : 'Sort coins by value. Ask: which is worth more? Then add two coins.'
      }
      onGoHome={onGoHome}
    />
  )
}
