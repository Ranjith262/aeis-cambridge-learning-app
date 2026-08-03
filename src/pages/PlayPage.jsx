import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import InteractiveTenFrame from '../components/InteractiveTenFrame'
import InteractivePlaceValue from '../components/InteractivePlaceValue'
import Celebration from '../components/Celebration'
import Mascot, { pickLine } from '../components/Mascot'

const GAMES = [
  { id: 'tenframe', title: 'Fill the Ten-Frame', emoji: '🔟', blurb: 'Tap dots to make a number' },
  { id: 'place', title: 'Build the Number', emoji: '🧱', blurb: 'Tens and ones blocks' },
]

export default function PlayPage({ onGoHome }) {
  const [game, setGame] = useState(null)
  const [wins, setWins] = useState(0)
  const [round, setRound] = useState(0)
  const [celebrate, setCelebrate] = useState(false)

  const target = useMemo(() => 3 + Math.floor(Math.random() * 8), [round, game])
  const placeTarget = useMemo(() => 10 + Math.floor(Math.random() * 89), [round, game])

  const onWin = () => {
    setCelebrate(true)
    setWins((w) => w + 1)
    setTimeout(() => {
      setCelebrate(false)
      setRound((r) => r + 1)
    }, 900)
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="relative z-10 min-h-screen px-4 py-6 max-w-lg mx-auto pb-16">
      <Celebration show={celebrate} seed={wins} />
      <button type="button" onClick={onGoHome} className="pastel-btn px-4 py-2 bg-white shadow-card text-sm mb-4 border border-black/5">
        ← Kingdom
      </button>
      <h1 className="text-3xl font-bold text-ink mb-1">Play & Learn</h1>
      <p className="text-muted text-sm mb-4">Hands-on games · fresh targets every round</p>
      <Mascot
        mood={wins > 0 ? 'happy' : 'idle'}
        message={wins ? `Wins: ${wins}! ${pickLine('correct', wins)}` : pickLine('encourage', 1)}
        className="mb-6"
      />

      {!game && (
        <div className="grid gap-3">
          {GAMES.map((g) => (
            <button key={g.id} type="button" onClick={() => { setGame(g.id); setRound(0) }} className="pastel-card p-4 text-left island-card">
              <div className="text-2xl mb-1">{g.emoji}</div>
              <div className="font-bold text-ink">{g.title}</div>
              <div className="text-xs text-muted">{g.blurb}</div>
            </button>
          ))}
        </div>
      )}

      {game === 'tenframe' && (
        <div>
          <button type="button" className="text-sm text-muted mb-3" onClick={() => setGame(null)}>← All games</button>
          <InteractiveTenFrame key={`tf-${round}`} target={target} onSuccess={onWin} />
          <button type="button" className="mt-4 w-full pastel-btn py-2 bg-soft text-ink text-sm" onClick={() => setRound((r) => r + 1)}>
            New number
          </button>
        </div>
      )}

      {game === 'place' && (
        <div>
          <button type="button" className="text-sm text-muted mb-3" onClick={() => setGame(null)}>← All games</button>
          <InteractivePlaceValue key={`pv-${round}`} target={placeTarget} onSuccess={onWin} />
          <button type="button" className="mt-4 w-full pastel-btn py-2 bg-soft text-ink text-sm" onClick={() => setRound((r) => r + 1)}>
            New number
          </button>
        </div>
      )}
    </motion.div>
  )
}
