export default function BarModel({ parts = [], total, label }) {
  const sum = parts.reduce((a, p) => a + (Number(p.value) || 0), 0) || 1
  return (
    <div className="pastel-card p-4">
      <p className="text-xs font-semibold text-muted mb-2">{label || 'Bar model'}</p>
      <div className="flex h-10 rounded-lg overflow-hidden border border-ink/10">
        {parts.map((p, i) => (
          <div
            key={i}
            className="flex items-center justify-center text-xs font-bold text-ink"
            style={{
              width: `${((Number(p.value) || 0) / sum) * 100}%`,
              background: p.color || ['#A8E6CF', '#FFD3B6', '#A0D2EB', '#FFF5BA'][i % 4],
            }}
          >
            {p.value}
          </div>
        ))}
      </div>
      {total != null && <p className="mt-2 text-sm text-ink">Total: <strong>{total}</strong></p>}
    </div>
  )
}
