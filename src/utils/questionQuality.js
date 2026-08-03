/**
 * Hard quality gate — invalid items never enter quiz or mock.
 */

function norm(s) {
  return String(s ?? '')
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase()
}

function isBondPair(s) {
  return /^\d+\s*\+\s*\d+$/.test(norm(s).replace(/\s/g, ' '))
}

function pairParts(s) {
  const m = String(s)
    .replace(/\s+/g, ' ')
    .trim()
    .match(/^(\d+)\s*\+\s*(\d+)$/)
  if (!m) return null
  return [Number(m[1]), Number(m[2])]
}

/** True if a and b are the same pair (order ignored) */
function samePair(a, b) {
  const pa = pairParts(a)
  const pb = pairParts(b)
  if (!pa || !pb) return norm(a) === norm(b)
  return (pa[0] === pb[0] && pa[1] === pb[1]) || (pa[0] === pb[1] && pa[1] === pb[0])
}

/**
 * Validate + sanitize a question. Returns null if unusable.
 */
export function gateQuestion(raw) {
  if (!raw || typeof raw.question !== 'string' || !raw.question.trim()) return null
  if (raw.correctAnswer == null || String(raw.correctAnswer).trim() === '') return null

  const q = {
    ...raw,
    question: raw.question.trim(),
    correctAnswer: String(raw.correctAnswer).trim(),
    id: raw.id || `g_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
    category: raw.category || 'general',
    format: raw.format || (raw.options ? 'mcq' : 'short_answer'),
  }

  if (q.format === 'short_answer' || !q.options) {
    q.format = 'short_answer'
    delete q.options
    return q
  }

  // MCQ path
  let options = (q.options || []).map((o) => String(o).trim()).filter(Boolean)

  // Unique by normalized text; for a+b pairs, unique by unordered pair
  const kept = []
  for (const o of options) {
    const dup = kept.some((k) => samePair(k, o) || norm(k) === norm(o))
    if (!dup) kept.push(o)
  }
  options = kept

  // Ensure correct is present (match pair-aware)
  const hasCorrect = options.some((o) => samePair(o, q.correctAnswer) || norm(o) === norm(q.correctAnswer))
  if (!hasCorrect) options.unshift(q.correctAnswer)

  // Normalize correctAnswer to the option string we keep
  const match = options.find((o) => samePair(o, q.correctAnswer) || norm(o) === norm(q.correctAnswer))
  if (match) q.correctAnswer = match

  // Count how many options equal the correct answer (must be exactly 1)
  const correctHits = options.filter((o) => samePair(o, q.correctAnswer) || norm(o) === norm(q.correctAnswer))
  if (correctHits.length !== 1) {
    // keep only first correct, drop other hits
    const one = correctHits[0]
    options = options.filter((o) => !(samePair(o, one) || norm(o) === norm(one)) || o === one)
    // ensure only one
    const seen = new Set()
    options = options.filter((o) => {
      if (samePair(o, one) || norm(o) === norm(one)) {
        if (seen.has('correct')) return false
        seen.add('correct')
        return true
      }
      return true
    })
  }

  // Need at least 3 options ideally, 4 preferred; if < 2 fail
  if (options.length < 2) return null

  // Pad only with clearly wrong placeholders that won't match correct
  let pad = 0
  while (options.length < 4 && pad < 6) {
    pad++
    const filler = `__${pad}_${Math.floor(Math.random() * 90 + 10)}`
    if (!options.some((o) => norm(o) === norm(filler))) options.push(filler)
  }
  // Prefer not to ship placeholders — if we had to pad with __ reject weak items for mock
  const hasPlaceholder = options.some((o) => String(o).startsWith('__'))
  if (hasPlaceholder) {
    // still allow for practice but mark weak
    q._weak = true
  }

  // Shuffle options
  options = [...options].sort(() => Math.random() - 0.5).slice(0, 4)

  // Final single-correct check
  const hits = options.filter((o) => samePair(o, q.correctAnswer) || norm(o) === norm(q.correctAnswer))
  if (hits.length !== 1) return null

  q.options = options
  q.format = 'mcq'
  return q
}

export function stemKey(q) {
  return norm(q?.question || '').replace(/\d+/g, '#')
}

/** Collect n gated unique questions from a factory */
export function collectUnique(factory, n, { allowWeak = false } = {}) {
  const out = []
  const seen = new Set()
  let guard = 0
  while (out.length < n && guard < n * 50) {
    guard++
    let raw
    try {
      raw = factory()
    } catch {
      continue
    }
    const q = gateQuestion(raw)
    if (!q) continue
    if (!allowWeak && q._weak) continue
    const k = stemKey(q)
    if (!k || seen.has(k)) continue
    seen.add(k)
    out.push(q)
  }
  return out
}
