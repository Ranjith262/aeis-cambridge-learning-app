export default function SoftBackground() {
  return (
    <div
      className="fixed inset-0 -z-10 pastel-page pointer-events-none overflow-hidden"
      aria-hidden
    >
      <div className="absolute top-16 left-8 w-40 h-40 rounded-full bg-mint/30 blur-3xl" />
      <div className="absolute top-40 right-12 w-52 h-52 rounded-full bg-peach/25 blur-3xl" />
      <div className="absolute bottom-24 left-1/3 w-48 h-48 rounded-full bg-sky/30 blur-3xl" />
      <div className="absolute bottom-10 right-1/4 w-36 h-36 rounded-full bg-butter/40 blur-3xl" />
    </div>
  )
}
