export default function TenFrame({ filled = 0, label }) {
  const n = Math.min(10, Math.max(0, Number(filled) || 0))
  return (
    <div className="pastel-card p-4" aria-label={label || `Ten frame with ${n}`}>
      <p className="text-xs font-semibold text-muted mb-2">{label || 'Ten frame'}</p>
      <div className="grid grid-cols-5 gap-1 w-40">
        {Array.from({ length: 10 }).map((_, i) => (
          <div
            key={i}
            className={`w-7 h-7 rounded-full border-2 border-ink/20 ${i < n ? 'bg-coral' : 'bg-white'}`}
          />
        ))}
      </div>
      <p className="mt-2 text-sm font-bold text-ink">{n} out of 10</p>
    </div>
  )
}
