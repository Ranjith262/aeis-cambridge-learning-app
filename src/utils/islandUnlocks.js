import { pvMasteryPct } from '../world/placeValue/pvLearner'

const KEY = 'aeis_island_visits_v1'

export function markIslandVisit(id) {
  try {
    const data = JSON.parse(localStorage.getItem(KEY) || '{}')
    data[id] = (data[id] || 0) + 1
    localStorage.setItem(KEY, JSON.stringify(data))
  } catch {}
}

export function getVisits() {
  try {
    return JSON.parse(localStorage.getItem(KEY) || '{}')
  } catch {
    return {}
  }
}

/**
 * Soft unlock progression for 7–8yo motivation without hard walls early on.
 * Everything starts available; “recommended” order is shown via badges.
 * Optional soft-lock only if parent enables later — for now all unlocked, with mastery badges.
 */
export function getIslandStatus() {
  const pv = pvMasteryPct()
  const visits = getVisits()
  return {
    numbersTo100: { unlocked: true, world: 'placeValue', label: 'Place Value' },
    numberBonds: { unlocked: true, world: 'bonds', label: 'Bonds' },
    addition: { unlocked: true, world: 'addition', label: 'Addition' },
    subtraction: { unlocked: true, world: 'subtraction', label: 'Subtraction' },
    money: { unlocked: true, world: 'money', label: 'Money' },
    time: { unlocked: true, world: 'time', label: 'Time' },
    shapesAndPatterns: { unlocked: true, world: null, label: 'Shapes' },
    measurement: { unlocked: true, world: null, label: 'Measure' },
    wordProblems: { unlocked: true, world: null, label: 'Stories' },
    pictureGraphs: { unlocked: true, world: null, label: 'Graphs' },
    _meta: { pvMastery: pv, visits },
  }
}

/** Map category id → dedicated world page key */
export const CATEGORY_TO_WORLD = {
  numbersTo100: 'placeValue',
  numberBonds: 'bonds',
  addition: 'addition',
  subtraction: 'subtraction',
  money: 'money',
  time: 'time',
}
