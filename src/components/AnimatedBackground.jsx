import { useMemo } from 'react'

const COLORS = ['#667eea', '#764ba2', '#f093fb', '#4facfe', '#43e97b', '#fa709a']

export default function AnimatedBackground() {
  const shapes = useMemo(() => {
    return Array.from({ length: 8 }, (_, i) => ({
      id: i,
      width: 100 + (i * 37) % 300,
      height: 100 + (i * 37) % 300,
      left: (i * 13.7) % 100,
      top: (i * 17.3) % 100,
      color: COLORS[i % COLORS.length],
      delay: (i * 1.1) % 5,
      duration: 8 + (i * 2.3) % 14,
    }))
  }, [])

  const stars = useMemo(() => {
    return Array.from({ length: 50 }, (_, i) => ({
      id: i,
      size: 2 + (i * 0.06) % 3,
      left: (i * 2.1 + i * 0.7) % 100,
      top: (i * 1.9 + i * 1.3) % 100,
      delay: (i * 0.1) % 5,
    }))
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Animated gradient background */}
      <div className="animated-gradient-bg absolute inset-0" />

      {/* Floating gradient shapes */}
      {shapes.map((shape) => (
        <div
          key={shape.id}
          className="floating-shape"
          style={{
            width: shape.width,
            height: shape.height,
            left: `${shape.left}%`,
            top: `${shape.top}%`,
            background: shape.color,
            animationDelay: `${shape.delay}s`,
            animationDuration: `${shape.duration}s`,
          }}
        />
      ))}

      {/* Twinkling stars */}
      {stars.map((star) => (
        <div
          key={star.id}
          className="star"
          style={{
            width: star.size,
            height: star.size,
            left: `${star.left}%`,
            top: `${star.top}%`,
            animationDelay: `${star.delay}s`,
          }}
        />
      ))}
    </div>
  )
}
