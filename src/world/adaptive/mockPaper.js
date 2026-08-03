/**
 * Phase 5 — Craft AEIS-style math mock paper from island generators.
 * Balanced coverage; MCQ + short-answer; never a fixed bank.
 */
import { generatePlaceValueQuestion } from '../placeValue/pvGenerator'
import { generateBondQuestion } from '../bonds/bondsGenerator'
import { generateAddQuestion } from '../addition/addGenerator'
import { generateSubQuestion } from '../subtraction/subGenerator'
import { generateMoneyQuestion } from '../money/moneyGenerator'
import { generateTimeQuestion } from '../time/timeGenerator'
import { generateQuestions } from '../../utils/dynamicQuestions'
import { shuffleArray } from '../../utils/shuffle'

export const MCQ_COUNT = 29
export const SA_COUNT = 17

const FACTORIES = [
  () => generatePlaceValueQuestion(),
  () => generateBondQuestion(),
  () => generateAddQuestion(),
  () => generateSubQuestion(),
  () => generateMoneyQuestion(),
  () => generateTimeQuestion(),
  () => generateQuestions('shapesAndPatterns', 1)[0],
  () => generateQuestions('wordProblems', 1)[0],
  () => generateQuestions('pictureGraphs', 1)[0],
  () => generateQuestions('measurement', 1)[0],
]

function one() {
  for (let i = 0; i < 6; i++) {
    const q = FACTORIES[Math.floor(Math.random() * FACTORIES.length)]()
    if (q && q.correctAnswer != null && q.question) return q
  }
  return generateAddQuestion()
}

function toMcq(q) {
  if (q.format === 'short_answer' || !q.options) {
    // regenerate-ish: keep as SA later
    return { ...q, format: q.options ? 'mcq' : 'short_answer' }
  }
  return { ...q, format: 'mcq' }
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
  const raw = []
  const target = MCQ_COUNT + SA_COUNT + 15
  while (raw.length < target) {
    raw.push(one())
  }

  const withOpts = shuffleArray(raw.filter((q) => q.options && q.options.length >= 2))
  const without = shuffleArray(raw.filter((q) => !q.options || q.options.length < 2))

  const mcq = withOpts.slice(0, MCQ_COUNT).map(toMcq)
  let saPool = [...without, ...withOpts.slice(MCQ_COUNT)]
  const sa = shuffleArray(saPool).slice(0, SA_COUNT).map(toSa)

  // Ensure counts
  while (mcq.length < MCQ_COUNT) {
    const q = toMcq(generateAddQuestion())
    if (q.options) mcq.push(q)
  }
  while (sa.length < SA_COUNT) {
    sa.push(toSa(generateAddQuestion()))
  }

  return {
    mcq: mcq.slice(0, MCQ_COUNT),
    sa: sa.slice(0, SA_COUNT),
    all: [...mcq.slice(0, MCQ_COUNT), ...sa.slice(0, SA_COUNT)],
  }
}

/** Map question category / skill → world page key for remediation */
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
    String(a ?? '')
      .trim()
      .toLowerCase() ===
    String(b ?? '')
      .trim()
      .toLowerCase()

  const byTopic = {}
  let correct = 0
  paper.forEach((q) => {
    const ok = normalize(answers[q.id], q.correctAnswer)
    if (ok) correct++
    const cat = q.category || 'general'
    if (!byTopic[cat]) byTopic[cat] = { correct: 0, total: 0, skillIds: {} }
    byTopic[cat].total++
    if (ok) byTopic[cat].correct++
    if (q.skillId) {
      byTopic[cat].skillIds[q.skillId] = byTopic[cat].skillIds[q.skillId] || { correct: 0, total: 0 }
      byTopic[cat].skillIds[q.skillId].total++
      if (ok) byTopic[cat].skillIds[q.skillId].correct++
    }
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
