/**
 * MOE P1 Shapes & Patterns — varied stems, no triangle spam.
 */
const pick = (arr) => arr[Math.floor(Math.random() * arr.length)]
const rand = (a, b) => Math.floor(Math.random() * (b - a + 1)) + a
let seq = 0
const uid = () => `sh_${Date.now().toString(36)}_${++seq}_${Math.random().toString(36).slice(2, 5)}`

function shuffle(a) {
  return [...a].sort(() => Math.random() - 0.5)
}
function opts(c, extras) {
  const s = new Set([String(c)])
  extras.forEach((e) => {
    if (e != null && String(e) !== String(c)) s.add(String(e))
  })
  while (s.size < 4) s.add(String(rand(1, 12)))
  return shuffle([...s]).slice(0, 4)
}

const SHAPES = [
  { name: 'triangle', sides: 3, corners: 3 },
  { name: 'square', sides: 4, corners: 4 },
  { name: 'rectangle', sides: 4, corners: 4 },
  { name: 'pentagon', sides: 5, corners: 5 },
  { name: 'hexagon', sides: 6, corners: 6 },
  { name: 'circle', sides: 0, corners: 0 },
]

function sides() {
  const s = pick(SHAPES.filter((x) => x.sides > 0))
  return {
    id: uid(), skillId: 'SHAPE_SIDES', category: 'shapesAndPatterns', format: 'mcq',
    question: `How many sides does a ${s.name} have?`,
    options: opts(String(s.sides), [String(s.sides + 1), String(Math.max(1, s.sides - 1)), '4', '3']),
    correctAnswer: String(s.sides),
    explanation: `A ${s.name} has ${s.sides} sides.`,
  }
}
function corners() {
  const s = pick(SHAPES.filter((x) => x.corners > 0))
  return {
    id: uid(), skillId: 'SHAPE_CORNERS', category: 'shapesAndPatterns', format: 'mcq',
    question: `How many corners does a ${s.name} have?`,
    options: opts(String(s.corners), [String(s.corners + 1), '0', '8']),
    correctAnswer: String(s.corners),
    explanation: `A ${s.name} has ${s.corners} corners.`,
  }
}
function nameFromSides() {
  const s = pick(SHAPES.filter((x) => x.sides >= 3))
  return {
    id: uid(), skillId: 'SHAPE_NAME', category: 'shapesAndPatterns', format: 'mcq',
    question: `Which shape has exactly ${s.sides} sides?`,
    options: opts(s.name, SHAPES.filter((x) => x.name !== s.name).map((x) => x.name)),
    correctAnswer: s.name,
    explanation: `A ${s.name} has ${s.sides} sides.`,
  }
}
function squareVsRect() {
  return {
    id: uid(), skillId: 'SHAPE_NAME', category: 'shapesAndPatterns', format: 'mcq',
    question: `A square is a special rectangle because:`,
    options: shuffle(['all its sides are equal', 'it has 3 sides', 'it has no corners', 'it is a circle']),
    correctAnswer: 'all its sides are equal',
    explanation: 'A square has 4 equal sides — a special rectangle.',
  }
}
function circle() {
  return {
    id: uid(), skillId: 'SHAPE_SIDES', category: 'shapesAndPatterns', format: 'mcq',
    question: `How many straight sides does a circle have?`,
    options: opts('0', ['1', '2', '4']),
    correctAnswer: '0',
    explanation: 'A circle has no straight sides.',
  }
}
function patternNext() {
  const patterns = [
    { seq: '▲ ■ ▲ ■ ▲', next: '■', opts: ['■', '▲', '●', '★'] },
    { seq: '● ● ★ ● ●', next: '★', opts: ['★', '●', '■', '▲'] },
    { seq: '1 2 1 2 1', next: '2', opts: ['2', '1', '3', '0'] },
    { seq: '○ □ ○ □ ○', next: '□', opts: ['□', '○', '△', '☆'] },
  ]
  const p = pick(patterns)
  // unique options only
  const options = shuffle([...new Set(p.opts)]).slice(0, 4)
  if (!options.includes(p.next)) options[0] = p.next
  return {
    id: uid(), skillId: 'SHAPE_PATTERN', category: 'shapesAndPatterns', format: 'mcq',
    question: `What comes next? ${p.seq} ___`,
    options,
    correctAnswer: p.next,
    explanation: `The next item in the pattern is ${p.next}.`,
  }
}
function sortSides() {
  return {
    id: uid(), skillId: 'SHAPE_COMPARE', category: 'shapesAndPatterns', format: 'mcq',
    question: `Which shape has more sides: a triangle or a hexagon?`,
    options: shuffle(['hexagon', 'triangle', 'same', 'circle']),
    correctAnswer: 'hexagon',
    explanation: 'Triangle 3 sides; hexagon 6 sides.',
  }
}

const FAMILIES = [sides, corners, nameFromSides, squareVsRect, circle, patternNext, sortSides]

export function generateShapeQuestion() {
  return pick(FAMILIES)()
}
export function generateShapeSession(n = 8) {
  const order = shuffle(FAMILIES)
  const out = []
  const seen = new Set()
  let i = 0
  while (out.length < n && i < n * 12) {
    const q = order[i % order.length]()
    i++
    const key = q.question.replace(/\d+/g, '#').toLowerCase()
    if (seen.has(key)) continue
    seen.add(key)
    out.push(q)
  }
  while (out.length < n) out.push(generateShapeQuestion())
  return out
}
