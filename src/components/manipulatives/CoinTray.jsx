const COINS = [
  { value: 1, label: '1¢', color: '#CD7F32' },
  { value: 5, label: '5¢', color: '#C0C0C0' },
  { value: 10, label: '10¢', color: '#FFD700' },
  { value: 20, label: '20¢', color: '#E8E8E8' },
  { value: 50, label: '50¢', color: '#B87333' },
  { value: 100, label: '$1', color: '#FFD3B6' },
]

export default function CoinTray({ amountCents = 0 }) {
  let left = Math.max(0, Number(amountCents) || 0)
  const used = []
  ;[100, 50, 20, 10, 5, 1].forEach((v) => {
    while (left >= v) {
      used.push(v)
      left -= v
    }
  })
  return (
    <div className="pastel-card p-4">
      <p className="text-xs font-semibold text-muted mb-2">Coins (SGD)</p>
      <div className="flex flex-wrap gap-2">
        {used.map((v, i) => {
          const c = COINS.find((x) => x.value === v)
          return (
            <div
              key={i}
              className="w-10 h-10 rounded-full flex items-center justify-center text-[10px] font-bold border border-ink/20"
              style={{ background: c?.color || '#eee' }}
            >
              {c?.label}
            </div>
          )
        })}
        {used.length === 0 && <span className="text-muted text-sm">0¢</span>}
      </div>
      <p className="mt-2 text-sm font-bold text-ink">
        {amountCents >= 100 ? `$${(amountCents / 100).toFixed(2)}` : `${amountCents}¢`}
      </p>
    </div>
  )
}
