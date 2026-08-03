import { useState } from 'react'
import IslandWorld from '../world/shared/IslandWorld'
import { generateTimeSession } from '../world/time/timeGenerator'
import { ClockFace } from '../components/manipulatives'

export default function TimeWorld({ onGoHome }) {
  const [hour, setHour] = useState(3)
  const [minute, setMinute] = useState(0)

  const cinemaBeats = [
    { title: 'Two hands', speech: 'Short hand = hours. Long hand = minutes.', visual: { hour: 3, minute: 0 } },
    { title: "O'clock", speech: 'When the long hand is on 12, we say o’clock.', visual: { hour: 4, minute: 0 } },
    { title: 'Half past', speech: 'When the long hand is on 6, it is half past.', visual: { hour: 4, minute: 30 } },
    { title: 'Ready', speech: 'You can read o’clock and half past!', visual: { hour: 7, minute: 0 } },
  ]

  const visual = (v) => (
    <ClockFace hour={v?.hour ?? hour} minute={v?.minute ?? minute} />
  )

  return (
    <IslandWorld
      title="Time Island"
      emoji="🕐"
      blurb="Read o’clock and half past — clocks that make sense."
      gradient="linear-gradient(165deg, #E3F2FD 0%, #F3E5F5 50%, #FFF8E1 100%)"
      generateSession={generateTimeSession}
      cinemaBeats={cinemaBeats}
      renderCinemaVisual={visual}
      renderLab={() => (
        <div>
          {visual({ hour, minute })}
          <div className="grid grid-cols-2 gap-3 mt-4">
            <div className="pastel-card p-3">
              <p className="text-xs font-bold text-muted mb-2">Hour</p>
              <div className="flex gap-2">
                <button type="button" className="pastel-btn flex-1 py-2 bg-soft" onClick={() => setHour((h) => (h <= 1 ? 12 : h - 1))}>−</button>
                <button type="button" className="pastel-btn flex-1 py-2 bg-sky/50" onClick={() => setHour((h) => (h >= 12 ? 1 : h + 1))}>+</button>
              </div>
            </div>
            <div className="pastel-card p-3">
              <p className="text-xs font-bold text-muted mb-2">Minute</p>
              <div className="flex gap-2">
                <button type="button" className="pastel-btn flex-1 py-2 bg-soft" onClick={() => setMinute(0)}>:00</button>
                <button type="button" className="pastel-btn flex-1 py-2 bg-peach/50" onClick={() => setMinute(30)}>:30</button>
              </div>
            </div>
          </div>
          <p className="text-center font-bold text-lg mt-3">
            {hour}:{minute === 0 ? '00' : '30'} {minute === 0 ? "o'clock" : `half past ${hour}`}
          </p>
        </div>
      )}
      parentLine={(c, t) =>
        c / t >= 0.8
          ? 'Clock reading is on track. Point to a real clock at home at o’clock and half past.'
          : 'Practice only o’clock first. Long hand on 12. Then introduce half past.'
      }
      onGoHome={onGoHome}
    />
  )
}
