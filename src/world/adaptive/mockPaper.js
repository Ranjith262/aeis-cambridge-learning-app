/**
 * AEIS-style mock paper — unique stems only, balanced topics.
 */
import { generatePlaceValueQuestion } from '../placeValue/pvGenerator'
import { generateBondQuestion } from '../bonds/bondsGenerator'
import { generateAddQuestion } from '../addition/addGenerator'
import { generateSubQuestion } from '../subtraction/subGenerator'
import { generateMoneyQuestion } from '../money/moneyGenerator'
import { generateTimeQuestion } from '../time/timeGenerator'
import { generateShapeQuestion } from '../shapes/shapesGenerator'
import { generateQuestions } from '../../utils/dynamicQuestions'
import { shuffleArray } from '../../utils/shuffle'

export const MCQ_COUNT = 29
export const SA_COUNT = 17

function stemKey(q) {
  return String(q?.question || '')
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .replace(/\d+/g, '#')
    .trim()
}

const FACTORIES = [
  generatePlaceValueQuestion,
  generateBondQuestion,
  generateAddQuestion,
  generateSubQuestion,
  generateMoneyQuestion,
  generateTimeQuestion,
  generateShapeQuestion,
  () => generateQuestions('wordProblems', 1)[0],
  () => generateQuestions('pictureGraphs', 1)[0],
  () => generateQuestions('measurement', 1)[0],
]

function collectUnique(count, preferMcq) {
  const out = []
  const seen = new Set()
  let guard = 0
  while (out.length < count && guard < count * 40) {
    guard++
    const factory = FACTORIES[out.length % FACTORIES.length]
    let q
    try {
      q = factory()
    } catch {
      q = generateAddQuestion()
    }
    if (!q || q.correctAnswer == null || !q.question) continue
    const key = stemKey(q)
    if (!key || seen.has(key)) continue
    if (preferMcq && (!q.options || q.options.length < 2)) {
      // try to only take MCQ for part A
      if (guard < count * 25) continue
    }
    if (!preferMcq && q.options && q.options.length >= 2) {
      // strip to SA style later
    }
    seen.add(key)
    out.push({ ...q, id: q.id || `q_${out.length}_${Date.now()}` })
  }
  // fill gaps with addition if needed
  while (out.length < count) {
    const q = generateAddQuestion()
    const key = stemKey(q) + '_' + out.length
    if (seen.has(stemKey(q))) {
      q.question = `${q.question} (set ${out.length + 1})`
    }
    seen.add(stemKey(q))
    out.push(q)
  }
  return out
}

function toMcq(q) {
  if (q.options && q.options.length >= 2) return { ...q, format: 'mcq' }
  // cannot force MCQ without options — regenerate add
  const alt = generateAddQuestion()
  return { ...alt, format: 'mcq' }
}

function toSa(q) {
  const { options, ...rest } = q
  return {
    ...rest,
    id: `sa_${q.id}`,
    format: 'short_answer',
    options: undefined,
  }
}

export function buildCraftMockPaper() {
  // Collect more than needed, dedupe, then split
  const pool = collectUnique(MCQ_COUNT + SA_COUNT + 20, false)
  const seen = new Set()
  const unique = []
  for (const q of pool) {
    const k = stemKey(q)
    if (seen.has(k)) continue
    seen.add(k)
    unique.push(q)
  }

  const withOpts = shuffleArray(unique.filter((q) => q.options && q.options.length >= 2))
  const without = shuffleArray(unique.filter((q) => !q.options || q.options.length < 2))

  const mcq = []
  const mcqSeen = new Set()
  for (const q of withOpts) {
    if (mcq.length >= MCQ_COUNT) break
    const k = stemKey(q)
    if (mcqSeen.has(k)) continue
    mcqSeen.has(k) || mcqSeen.add(k)
    mcq.push(toMcq(q))
  }
  while (mcq.length < MCQ_COUNT) {
    const q = toMcq(generateAddQuestion())
    const k = stemKey(q)
    if (mcqSeen.has(k)) {
      q.question = `${q.a != null ? q.a : ''} + ${q.b != null ? q.b : ''} = ?`.trim()
      // force unique by regenerating
      const q2 = generateAddQuestion()
      const k2 = stemKey(q2)
      if (mcqSeen.has(k2)) continue
      mcqSeen.add(k2)
      mcq.push(toMcq(q2))
      continue
    }
    mcqSeen.add(k)
    mcq.push(q)
  }

  const sa = []
  const saSeen = new Set([...mcqSeen])
  const saPool = shuffleArray([...without, ...withOpts.filter((q) => !mcqSeen.has(stemKey(q)))])
  for (const q of saPool) {
    if (sa.length >= SA_COUNT) break
    const k = stemKey(q)
    if (saSeen.has(k)) continue
    saSeen.add(k)
    sa.push(toSa(q))
  }
  while (sa.length < SA_COUNT) {
    const q = generateAddQuestion()
    const k = stemKey(q)
    if (saSeen.has(k)) continue
    saSeen.add(k)
    sa.push(toSa(q))
  }

  // Final uniqueness pass across full paper
  const all = []
  const finalSeen = new Set()
  for (const q of [...mcq.slice(0, MCQ_COUNT), ...sa.slice(0, SA_COUNT)]) {
    let k = stemKey(q)
    if (finalSeen.has(k)) continue
    finalSeen.add(k)
    all.push(q)
  }
  // If we dropped dupes, refill
  while (all.length < MCQ_COUNT + SA_COUNT) {
    const q = toMcq(generateTimeQuestion())
    const k = stemKey(q)
    if (finalSeen.has(k)) continue
    finalSeen.add(k)
    all.push(q)
  }

  const finalMcq = all.filter((q) => q.format !== 'short_answer').slice(0, MCQ_COUNT)
  let finalSa = all.filter((q) => q.format === 'short_answer').slice(0, SA_COUNT)
  while (finalMcq.length < MCQ_COUNT) {
    const q = toMcq(generateAddQuestion())
    if (finalSeen.has(stemKey(q))) continue
    finalSeen.add(stemKey(q))
    finalMcq.push(q)
  }
  while (finalSa.length < SA_COUNT) {
    const q = toSa(generateSubQuestion())
    if (finalSeen.has(stemKey(q))) continue
    finalSeen.add(stemKey(q))
    finalSa.push(q)
  }

  return {
    mcq: finalMcq.slice(0, MCQ_COUNT),
    sa: finalSa.slice(0, SA_COUNT),
    all: [...finalMcq.slice(0, MCQ_COUNT), ...finalSa.slice(0, SA_COUNT)],
  }
}

export const REMEDIATION_MAP = {
  numbersTo100: { world: 'placeValue', label: 'Place Value Island', cinema: true },
  numberBonds: { world: 'bonds', label: 'Number Bonds Island', cinema: true },
  addition: { world: 'addition', label: 'Addition Island', cinema: true },
  subtraction: { world: 'subtraction', label: 'Subtraction Island', cinema: true },
  money: { world: 'money', label: 'Money Island', cinema: true },
  time: { world: 'time', label: 'Time Island', cinema: true },
  shapesAndPatterns: { world: null, label: 'Shapes practice', quiz: 'shapesAndPatterns' },
  measurement: { world: null, label: 'Measurement practice', quiz: 'measurement' },
  wordProblems: { world: null, label: 'Word problems practice', quiz: 'wordProblems' },
  pictureGraphs: { world: null, label: 'Graphs practice', quiz: 'pictureGraphs' },
}

export function diagnosePaper(paper, answers) {
  const normalize = (a, b) =>
    String(a ?? '').trim().toLowerCase() === String(b ?? '').trim().toLowerCase()
  const byTopic = {}
  let correct = 0
  paper.forEach((q) => {
    const ok = normalize(answers[q.id], q.correctAnswer)
    if (ok) correct++
    const cat = q.category || 'general'
    if (!byTopic[cat]) byTopic[cat] = { correct: 0, total: 0, skillIds: {} }
    byTopic[cat].total++
    if (ok) byTopic[cat].correct++
  })
  const weakTopics = Object.entries(byTopic)
    .map(([id, v]) => ({
      id,
      accuracy: v.total ? v.correct / v.total : 0,
      ...v,
      remediation: REMEDIATION_MAP[id] || { label: id },
    }))
    .filter((t) => t.total >= 1)
    .sort((a, b) => a.accuracy - b.accuracy)
  const scorePct = paper.length ? Math.round((correct / paper.length) * 100) : 0
  return {
    correct,
    total: paper.length,
    scorePct,
    byTopic,
    weakTopics,
    readiness:
      scorePct >= 80 ? 'strong' : scorePct >= 60 ? 'building' : scorePct >= 40 ? 'emerging' : 'needs_support',
  }
}
