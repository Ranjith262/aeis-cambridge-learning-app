export default function NumberLine({ from = 0, to = 20, marks = [], highlight }) {
  const start = Number(from)
  const end = Number(to)
  const span = Math.max(1, end - start)
  return (
    <div className="pastel-card p-4 overflow-x-auto">
      <p className="text-xs font-semibold text-muted mb-3">Number line</p>
      <div className="relative h-12 min-w-[280px]">
        <div className="absolute left-2 right-2 top-6 h-1 bg-ink/30 rounded" />
        {Array.from({ length: span + 1 }).map((_, i) => {
          const val = start + i
          const left = `${(i / span) * 100}%`
          const isHi = highlight === val || marks.includes(val)
          return (
            <div key={val} className="absolute top-3" style={{ left, transform: 'translateX(-50%)' }}>
              <div className={`w-0.5 h-3 mx-auto ${isHi ? 'bg-success' : 'bg-ink/40'}`} />
              <div className={`text-[10px] mt-1 text-center ${isHi ? 'font-bold text-success' : 'text-muted'}`}>
                {val}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
