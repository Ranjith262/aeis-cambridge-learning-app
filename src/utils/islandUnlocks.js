import { pvMasteryPct } from '../world/placeValue/pvLearner'

const KEY = 'aeis_island_visits_v1'

export function markIslandVisit(id) {
  try {
    const data = JSON.parse(localStorage.getItem(KEY) || '{}')
    data[id] = (data[id] || 0) + 1
    localStorage.setItem(KEY, JSON.stringify(data))
  } catch {}
}

export function getIslandStatus() {
  const pv = pvMasteryPct()
  let visits = {}
  try { visits = JSON.parse(localStorage.getItem(KEY) || '{}') } catch {}
  return {
    placeValue: { unlocked: true, mastery: pv },
    bonds: { unlocked: true, mastery: null },
    addition: { unlocked: pv == null || pv >= 40 || (visits.placeValue || 0) >= 1, mastery: null },
    subtraction: { unlocked: pv == null || pv >= 50 || (visits.addition || 0) >= 1, mastery: null },
  }
}
