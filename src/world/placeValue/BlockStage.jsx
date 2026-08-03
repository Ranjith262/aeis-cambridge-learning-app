import { motion } from 'framer-motion'

/**
 * Phase 1 teaching stage — “3D-like” rods and cubes with depth (CSS).
 * Meaningful motion: ones can highlight bundling into a ten.
 */
export default function BlockStage({
  tens = 0,
  ones = 0,
  mode = 'show', // show | bundle
  highlightOnes = false,
}) {
  const t = Math.min(9, Math.max(0, tens))
  const o = Math.min(20, Math.max(0, ones))

  return (
    <div
      className="relative rounded-2xl p-4 sm:p-6 overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #E8F6FF 0%, #D4F0E8 55%, #C8E6C9 100%)',
        minHeight: 200,
        perspective: 800,
      }}
    >
      {/* ground plane */}
      <div
        className="absolute left-4 right-4 bottom-4 h-16 rounded-[50%]"
        style={{
          background: 'radial-gradient(ellipse, rgba(76,175,80,0.35), transparent 70%)',
          transform: 'rotateX(60deg)',
        }}
      />

      <div className="relative z-10 flex flex-wrap items-end justify-center gap-4 sm:gap-6 min-h-[160px]">
        {/* Tens rods */}
        <div className="flex flex-col items-center gap-1">
          <span className="text-[10px] font-bold uppercase tracking-wide text-ink/60">Tens</span>
          <div className="flex gap-2 items-end">
            {Array.from({ length: t }).map((_, i) => (
              <motion.div
                key={`t-${i}`}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: i * 0.08, type: 'spring', stiffness: 260, damping: 18 }}
                className="relative w-7 h-28 rounded-md"
                style={{
                  background: 'linear-gradient(90deg, #039BE5 0%, #29B6F6 45%, #0277BD 100%)',
                  boxShadow: '4px 6px 0 #01579B, 0 10px 20px rgba(1,87,155,0.25)',
                  transform: 'rotateX(8deg) rotateY(-12deg)',
                }}
                aria-hidden
              >
                {Array.from({ length: 10 }).map((__, j) => (
                  <div
                    key={j}
                    className="absolute left-0.5 right-0.5 h-px bg-white/30"
                    style={{ top: `${(j + 1) * 9.5}%` }}
                  />
                ))}
              </motion.div>
            ))}
            {t === 0 && <div className="text-xs text-ink/40">—</div>}
          </div>
        </div>

        {/* Ones cubes */}
        <div className="flex flex-col items-center gap-1">
          <span className="text-[10px] font-bold uppercase tracking-wide text-ink/60">Ones</span>
          <div className="flex flex-wrap gap-1.5 max-w-[140px] content-end min-h-[112px] items-end">
            {Array.from({ length: o }).map((_, i) => (
              <motion.div
                key={`o-${i}`}
                initial={{ scale: 0 }}
                animate={{
                  scale: 1,
                  y: mode === 'bundle' && i < 10 ? -8 : 0,
                  boxShadow:
                    highlightOnes && i < 10
                      ? '0 0 0 2px #FFD54F, 3px 4px 0 #F9A825'
                      : '3px 4px 0 #F9A825',
                }}
                transition={{ delay: 0.05 * i, type: 'spring', stiffness: 300, damping: 16 }}
                className="w-6 h-6 rounded-sm"
                style={{
                  background: 'linear-gradient(135deg, #FFEE58 0%, #FBC02D 60%, #F9A825 100%)',
                  transform: 'rotateX(10deg) rotateY(-15deg)',
                }}
                aria-hidden
              />
            ))}
            {o === 0 && <div className="text-xs text-ink/40">—</div>}
          </div>
        </div>
      </div>

      <p className="relative z-10 text-center mt-3 text-sm font-bold text-ink">
        {t} ten{t !== 1 ? 's' : ''} + {o} one{o !== 1 ? 's' : ''} ={' '}
        <span className="text-success text-lg">{t * 10 + o}</span>
      </p>
    </div>
  )
}
