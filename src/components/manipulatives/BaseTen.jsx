/** Visual place-value blocks for tens and ones */
export default function BaseTen({ tens = 0, ones = 0, label }) {
  const t = Math.min(9, Math.max(0, Number(tens) || 0))
  const o = Math.min(9, Math.max(0, Number(ones) || 0))
  return (
    <div className="pastel-card p-4" aria-label={label || `${t} tens and ${o} ones`}>
      <p className="text-xs font-semibold text-muted mb-2">{label || 'Base-ten blocks'}</p>
      <div className="flex flex-wrap gap-3 items-end">
        <div>
          <div className="text-[10px] text-muted mb-1">Tens ({t})</div>
          <div className="flex gap-1">
            {Array.from({ length: t }).map((_, i) => (
              <div key={i} className="w-5 h-16 rounded bg-sky flex flex-col justify-between p-0.5">
                {Array.from({ length: 10 }).map((__, j) => (
                  <div key={j} className="h-1 bg-white/50 rounded-sm" />
                ))}
              </div>
            ))}
            {t === 0 && <div className="text-muted text-xs">—</div>}
          </div>
        </div>
        <div>
          <div className="text-[10px] text-muted mb-1">Ones ({o})</div>
          <div className="flex gap-1 flex-wrap max-w-[100px]">
            {Array.from({ length: o }).map((_, i) => (
              <div key={i} className="w-4 h-4 rounded bg-mint" />
            ))}
            {o === 0 && <div className="text-muted text-xs">—</div>}
          </div>
        </div>
      </div>
      <p className="mt-2 text-sm font-bold text-ink">
        {t * 10 + o} <span className="font-normal text-muted">= {t} tens + {o} ones</span>
      </p>
    </div>
  )
}
