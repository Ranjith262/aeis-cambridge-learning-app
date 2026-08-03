/**
 * AEIS mock paper — gated unique questions only.
 */
import { generatePlaceValueQuestion } from '../placeValue/pvGenerator'
import { generateBondQuestion } from '../bonds/bondsGenerator'
import { generateAddQuestion } from '../addition/addGenerator'
import { generateSubQuestion } from '../subtraction/subGenerator'
import { generateMoneyQuestion } from '../money/moneyGenerator'
import { generateTimeQuestion } from '../time/timeGenerator'
import { generateShapeQuestion } from '../shapes/shapesGenerator'
import { generateQuestions } from '../../utils/dynamicQuestions'
import { gateQuestion, stemKey, collectUnique } from '../../utils/questionQuality'
import { shuffleArray } from '../../utils/shuffle'

export const MCQ_COUNT = 29
export const SA_COUNT = 17

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
  () => generateQuestions('numbersTo100', 1)[0],
]

function rotateFactory(i) {
  return FACTORIES[i % FACTORIES.length]
}

function collectPaperItems(need, preferFormat) {
  const out = []
  const seen = new Set()
  let i = 0
  let guard = 0
  while (out.length < need && guard < need * 60) {
    guard++
    let raw
    try {
      raw = rotateFactory(i++)()
    } catch {
      raw = generateAddQuestion()
    }
    const q = gateQuestion(raw)
    if (!q) continue
    if (preferFormat === 'mcq' && q.format !== 'mcq') continue
    if (preferFormat === 'sa') {
      // convert to SA
      const sa = {
        ...q,
        id: `sa_${q.id}`,
        format: 'short_answer',
        options: undefined,
      }
      const k = stemKey(sa)
      if (seen.has(k)) continue
      seen.add(k)
      out.push(sa)
      continue
    }
    const k = stemKey(q)
    if (seen.has(k)) continue
    seen.add(k)
    out.push(q)
  }
  return out
}

export function buildCraftMockPaper() {
  const mcq = collectPaperItems(MCQ_COUNT, 'mcq')
  // Fill MCQ if short
  let fill = 0
  while (mcq.length < MCQ_COUNT && fill < 80) {
    fill++
    const q = gateQuestion(generateAddQuestion()) || gateQuestion(generateTimeQuestion())
    if (!q || q.format !== 'mcq') continue
    const k = stemKey(q)
    if (mcq.some((x) => stemKey(x) === k)) continue
    mcq.push(q)
  }

  const saSeen = new Set(mcq.map(stemKey))
  const sa = []
  let g = 0
  while (sa.length < SA_COUNT && g < SA_COUNT * 50) {
    g++
    const raw = rotateFactory(g)()
    const q = gateQuestion(raw)
    if (!q) continue
    const saQ = {
      ...q,
      id: `sa_${q.id}_${sa.length}`,
      format: 'short_answer',
      options: undefined,
    }
    const k = stemKey(saQ)
    if (saSeen.has(k)) continue
    saSeen.add(k)
    sa.push(saQ)
  }

  const all = [...mcq.slice(0, MCQ_COUNT), ...sa.slice(0, SA_COUNT)]
  // Final uniqueness
  const final = []
  const fSeen = new Set()
  for (const q of all) {
    const k = stemKey(q)
    if (fSeen.has(k)) continue
    fSeen.add(k)
    final.push(q)
  }

  return {
    mcq: final.filter((q) => q.format !== 'short_answer').slice(0, MCQ_COUNT),
    sa: final.filter((q) => q.format === 'short_answer').slice(0, SA_COUNT),
    all: final.slice(0, MCQ_COUNT + SA_COUNT),
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
    if (!byTopic[cat]) byTopic[cat] = { correct: 0, total: 0 }
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
