/**
 * Number bonds of 10 / 20 — one correct option only; no commutative twin as distractor.
 */
const rand = (a, b) => Math.floor(Math.random() * (b - a + 1)) + a
const pick = (arr) => arr[Math.floor(Math.random() * arr.length)]
let seq = 0
const uid = () => `nb_${Date.now().toString(36)}_${++seq}_${Math.random().toString(36).slice(2, 5)}`

function shuffle(a) {
  return [...a].sort(() => Math.random() - 0.5)
}

/** Canonical pair string: smaller first to avoid 7+3 vs 3+7 chaos */
function pairLabel(a, b) {
  return `${a} + ${b}`
}

function uniqueOpts(correct, distractors) {
  const s = new Set()
  const norm = (x) => String(x).replace(/\s+/g, ' ').trim()
  s.add(norm(correct))
  for (const d of distractors) {
    const n = norm(d)
    if (!n || n === norm(correct)) continue
    // block commutative duplicate of correct for "a + b" patterns
    const m = n.match(/^(\d+)\s*\+\s*(\d+)$/)
    const c = norm(correct).match(/^(\d+)\s*\+\s*(\d+)$/)
    if (m && c) {
      const same =
        (m[1] === c[1] && m[2] === c[2]) || (m[1] === c[2] && m[2] === c[1])
      if (same) continue
    }
    s.add(n)
    if (s.size >= 4) break
  }
  let g = 0
  while (s.size < 4 && g++ < 30) {
    const x = rand(0, 9)
    const y = rand(0, 9)
    const cand = pairLabel(x, y)
    const cm = cand.match(/^(\d+)\s*\+\s*(\d+)$/)
    const c = norm(correct).match(/^(\d+)\s*\+\s*(\d+)$/)
    if (c && cm && ((cm[1] === c[1] && cm[2] === c[2]) || (cm[1] === c[2] && cm[2] === c[1]))) continue
    if (Number(cm[1]) + Number(cm[2]) === Number(c?.[1] || 0) + Number(c?.[2] || 0) && c) continue // also wrong sum same as target?
    s.add(cand)
  }
  return shuffle([...s]).slice(0, 4)
}

function uniqueNumOpts(correct, extras) {
  const s = new Set([String(correct)])
  extras.forEach((e) => {
    if (e != null && String(e) !== String(correct) && Number(e) >= 0) s.add(String(e))
  })
  while (s.size < 4) s.add(String(rand(0, 20)))
  return shuffle([...s]).slice(0, 4)
}

export function generateBondQuestion() {
  const whole = pick([10, 10, 10, 20])
  // avoid 0 and whole for nicer items sometimes, but allow
  const part = rand(1, whole - 1)
  const other = whole - part
  const kind = pick(['missing', 'pair', 'sa', 'which'])

  if (kind === 'sa') {
    return {
      id: uid(),
      skillId: 'BONDS_' + whole,
      category: 'numberBonds',
      format: 'short_answer',
      question: `${part} + ___ = ${whole}`,
      correctAnswer: String(other),
      explanation: `${part} + ${other} = ${whole}. These are a number bond of ${whole}.`,
      cinema: { whole, part, other },
    }
  }

  if (kind === 'pair' || kind === 'which') {
    const correct = pairLabel(part, other)
    // distractors that do NOT sum to whole and are not commutative twin
    const distractors = [
      pairLabel(part, other + 1),
      pairLabel(part + 1, other),
      pairLabel(Math.max(0, part - 1), other),
      pairLabel(part, Math.max(0, other - 1)),
      pairLabel(other + 1, part + 1),
      pairLabel(1, whole),
    ]
    const options = uniqueOpts(correct, distractors)
    // ensure correct is present
    if (!options.includes(correct)) {
      options[0] = correct
    }
    return {
      id: uid(),
      skillId: 'BONDS_' + whole,
      category: 'numberBonds',
      format: 'mcq',
      question: `Which pair makes ${whole}?`,
      options: shuffle(options),
      correctAnswer: correct,
      explanation: `${part} + ${other} = ${whole}. Only one correct pair is listed.`,
      cinema: { whole, part, other },
    }
  }

  return {
    id: uid(),
    skillId: 'BONDS_' + whole,
    category: 'numberBonds',
    format: 'mcq',
    question: `${part} + ___ = ${whole}`,
    options: uniqueNumOpts(other, [other + 1, other - 1, whole, part, 0]),
    correctAnswer: String(other),
    explanation: `${part} + ${other} = ${whole}.`,
    cinema: { whole, part, other },
  }
}

export function generateBondSession(n = 8) {
  const out = []
  const seen = new Set()
  let g = 0
  while (out.length < n && g++ < n * 15) {
    const q = generateBondQuestion()
    const key = q.question.replace(/\d+/g, '#')
    if (seen.has(key)) continue
    seen.add(key)
    out.push(q)
  }
  while (out.length < n) out.push(generateBondQuestion())
  return out
}
