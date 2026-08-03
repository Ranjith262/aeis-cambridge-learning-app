/**
 * MOE P1 Picture Graphs:
 * read counts, most/least, compare two categories, total,
 * scale of 1 (one picture = 1 object).
 */
const rand = (a, b) => Math.floor(Math.random() * (b - a + 1)) + a
const pick = (arr) => arr[Math.floor(Math.random() * arr.length)]
let seq = 0
const uid = () => `pg_${Date.now().toString(36)}_${++seq}_${Math.random().toString(36).slice(2, 5)}`

const THEMES = [
  {
    title: 'Favourite fruit',
    items: [
      { name: 'apples', emoji: '🍎' },
      { name: 'bananas', emoji: '🍌' },
      { name: 'oranges', emoji: '🍊' },
    ],
  },
  {
    title: 'Pets in class',
    items: [
      { name: 'dogs', emoji: '🐶' },
      { name: 'cats', emoji: '🐱' },
      { name: 'rabbits', emoji: '🐰' },
    ],
  },
  {
    title: 'Stickers collected',
    items: [
      { name: 'stars', emoji: '⭐' },
      { name: 'hearts', emoji: '❤️' },
      { name: 'smiles', emoji: '😊' },
    ],
  },
]

function shuffle(a) {
  return [...a].sort(() => Math.random() - 0.5)
}

function numOpts(correct, wrongs) {
  const s = new Set([String(correct)])
  for (const w of wrongs) {
    if (w == null || Number(w) < 0) continue
    if (String(w) === String(correct)) continue
    s.add(String(w))
  }
  let g = 0
  while (s.size < 4 && g++ < 20) {
    const j = Number(correct) + rand(-6, 8)
    if (j >= 0 && j !== Number(correct)) s.add(String(j))
  }
  const rest = shuffle([...s].filter((x) => x !== String(correct)))
  return shuffle([String(correct), ...rest]).slice(0, 4)
}

function buildData() {
  const theme = pick(THEMES)
  const counts = theme.items.map((it) => ({
    ...it,
    count: rand(1, 8),
  }))
  // ensure not all equal for most/least questions
  if (counts.every((c) => c.count === counts[0].count)) {
    counts[0].count = Math.min(8, counts[0].count + 2)
  }
  return { theme, counts }
}

function row(counts) {
  return counts.map((c) => `${c.emoji.repeat(c.count)} ${c.name}: ${c.count}`).join(' · ')
}

function readOne() {
  const { theme, counts } = buildData()
  const target = pick(counts)
  return {
    id: uid(),
    skillId: 'GRAPH_READ',
    category: 'pictureGraphs',
    format: 'mcq',
    question: `Picture graph (${theme.title}). Each picture = 1. ${row(counts)}. How many ${target.name}?`,
    options: numOpts(target.count, counts.map((c) => c.count).concat([target.count + 1])),
    correctAnswer: String(target.count),
    explanation: `Count the pictures for ${target.name}: ${target.count}.`,
  }
}

function most() {
  const { theme, counts } = buildData()
  const max = Math.max(...counts.map((c) => c.count))
  const winners = counts.filter((c) => c.count === max)
  const correct = winners[0].name
  return {
    id: uid(),
    skillId: 'GRAPH_MOST',
    category: 'pictureGraphs',
    format: 'mcq',
    question: `Picture graph (${theme.title}). ${row(counts)}. Which has the most?`,
    options: shuffle(counts.map((c) => c.name)),
    correctAnswer: correct,
    explanation: `${correct} has the most (${max}).`,
  }
}

function least() {
  const { theme, counts } = buildData()
  const min = Math.min(...counts.map((c) => c.count))
  const winners = counts.filter((c) => c.count === min)
  const correct = winners[0].name
  return {
    id: uid(),
    skillId: 'GRAPH_LEAST',
    category: 'pictureGraphs',
    format: 'mcq',
    question: `Picture graph (${theme.title}). ${row(counts)}. Which has the least?`,
    options: shuffle(counts.map((c) => c.name)),
    correctAnswer: correct,
    explanation: `${correct} has the least (${min}).`,
  }
}

function total() {
  const { theme, counts } = buildData()
  const sum = counts.reduce((a, c) => a + c.count, 0)
  return {
    id: uid(),
    skillId: 'GRAPH_TOTAL',
    category: 'pictureGraphs',
    format: 'mcq',
    question: `Picture graph (${theme.title}). ${row(counts)}. How many in total?`,
    options: numOpts(sum, [sum + 1, sum - 1, counts[0].count, counts[1].count]),
    correctAnswer: String(sum),
    explanation: `Add all categories: ${counts.map((c) => c.count).join(' + ')} = ${sum}.`,
  }
}

function compare() {
  const { theme, counts } = buildData()
  const a = counts[0]
  const b = counts[1]
  const diff = Math.abs(a.count - b.count)
  const moreName = a.count >= b.count ? a.name : b.name
  return {
    id: uid(),
    skillId: 'GRAPH_COMPARE',
    category: 'pictureGraphs',
    format: 'mcq',
    question: `Picture graph (${theme.title}). ${row(counts)}. How many more ${moreName} than ${a.count >= b.count ? b.name : a.name}?`,
    options: numOpts(diff, [diff + 1, a.count + b.count, a.count, b.count]),
    correctAnswer: String(diff),
    explanation: `Difference: ${Math.max(a.count, b.count)} − ${Math.min(a.count, b.count)} = ${diff}.`,
  }
}

function saRead() {
  const { theme, counts } = buildData()
  const target = pick(counts)
  return {
    id: uid(),
    skillId: 'GRAPH_READ_SA',
    category: 'pictureGraphs',
    format: 'short_answer',
    question: `Graph (${theme.title}): ${row(counts)}. How many ${target.name}? (number only)`,
    correctAnswer: String(target.count),
    explanation: `${target.name}: ${target.count}.`,
  }
}

const FAMILIES = [readOne, readOne, most, least, total, compare, saRead]

export function generateGraphQuestion() {
  return pick(FAMILIES)()
}

export function generateGraphSession(n = 8) {
  const out = []
  const seen = new Set()
  let g = 0
  while (out.length < n && g++ < n * 20) {
    const q = generateGraphQuestion()
    const key = q.question.replace(/\d+/g, '#').slice(0, 60)
    if (seen.has(key)) continue
    seen.add(key)
    out.push(q)
  }
  while (out.length < n) out.push(generateGraphQuestion())
  return out
}
