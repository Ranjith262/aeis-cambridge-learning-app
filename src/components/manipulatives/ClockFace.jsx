export default function ClockFace({ hour = 3, minute = 0 }) {
  const h = ((Number(hour) % 12) + (Number(minute) || 0) / 60) * 30
  const m = (Number(minute) || 0) * 6
  return (
    <div className="pastel-card p-4 inline-block">
      <p className="text-xs font-semibold text-muted mb-2">Clock</p>
      <svg width="120" height="120" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="48" fill="#FFF8F0" stroke="#2D3436" strokeWidth="2" />
        {Array.from({ length: 12 }).map((_, i) => {
          const a = ((i + 1) / 12) * Math.PI * 2 - Math.PI / 2
          const x = 50 + Math.cos(a) * 38
          const y = 50 + Math.sin(a) * 38
          return (
            <text key={i} x={x} y={y} textAnchor="middle" dominantBaseline="middle" fontSize="8" fill="#2D3436">
              {i + 1}
            </text>
          )
        })}
        <line x1="50" y1="50" x2={50 + Math.sin((h * Math.PI) / 180) * 22} y2={50 - Math.cos((h * Math.PI) / 180) * 22} stroke="#2D3436" strokeWidth="3" strokeLinecap="round" />
        <line x1="50" y1="50" x2={50 + Math.sin((m * Math.PI) / 180) * 30} y2={50 - Math.cos((m * Math.PI) / 180) * 30} stroke="#00B894" strokeWidth="2" strokeLinecap="round" />
        <circle cx="50" cy="50" r="3" fill="#2D3436" />
      </svg>
      <p className="text-center text-sm font-bold text-ink mt-1">
        {hour}:{String(minute).padStart(2, '0')}
      </p>
    </div>
  )
}
