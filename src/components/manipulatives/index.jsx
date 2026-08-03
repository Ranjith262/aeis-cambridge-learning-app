import BaseTen from './BaseTen'
import TenFrame from './TenFrame'
import NumberLine from './NumberLine'
import BarModel from './BarModel'
import ClockFace from './ClockFace'
import CoinTray from './CoinTray'

/** Pick a helpful visual from topic + optional numbers in the question text */
export function ManipulativeFor({ topicId, question }) {
  const text = question?.question || ''
  const nums = (text.match(/\b\d+\b/g) || []).map(Number).filter((n) => n <= 100)

  if (topicId === 'numbersTo100' || topicId === 'numberBonds') {
    const n = nums[0] ?? 23
    return <BaseTen tens={Math.floor(n / 10)} ones={n % 10} label={`Seeing ${n}`} />
  }
  if (topicId === 'addition' || topicId === 'subtraction') {
    if (nums.length >= 2) {
      return (
        <BarModel
          parts={[
            { value: nums[0], color: '#A8E6CF' },
            { value: nums[1], color: '#FFD3B6' },
          ]}
          total={topicId === 'addition' ? nums[0] + nums[1] : undefined}
          label={topicId === 'addition' ? 'Parts to whole' : 'Whole and parts'}
        />
      )
    }
    return <TenFrame filled={nums[0] ?? 7} />
  }
  if (topicId === 'time') {
    return <ClockFace hour={nums[0] ?? 3} minute={nums[1] ?? 0} />
  }
  if (topicId === 'money') {
    return <CoinTray amountCents={nums[0] ?? 35} />
  }
  if (topicId === 'measurement' || topicId === 'wordProblems') {
    return <NumberLine from={0} to={Math.max(20, ...(nums.length ? nums : [20]))} marks={nums.slice(0, 3)} highlight={nums[0]} />
  }
  if (topicId === 'shapesAndPatterns') {
    return (
      <div className="pastel-card p-4">
        <p className="text-xs font-semibold text-muted mb-2">Shapes</p>
        <div className="flex gap-3 text-3xl">🔺 ⬛ ⬤ ⭐</div>
        <p className="text-sm text-ink mt-2">Count sides and corners carefully.</p>
      </div>
    )
  }
  if (topicId === 'pictureGraphs') {
    return (
      <div className="pastel-card p-4">
        <p className="text-xs font-semibold text-muted mb-2">Picture graph tip</p>
        <p className="text-sm text-ink">Count each picture. Compare: which has more? How many more?</p>
      </div>
    )
  }
  return <TenFrame filled={nums[0] ?? 5} label="Count with a ten frame" />
}

export { BaseTen, TenFrame, NumberLine, BarModel, ClockFace, CoinTray }
