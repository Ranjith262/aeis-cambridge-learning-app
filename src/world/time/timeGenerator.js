/**
 * AEIS / MOE Primary 1 Time — researched item bank generator
 * Covers: o'clock, half past, 5-minute intervals, a.m./p.m., duration (1h / ½h),
 * hand positions, digital↔description, daily routines, before/after.
 * Avoids trivial repetitive stems; each item has pedagogical purpose.
 */

const rand = (a, b) => Math.floor(Math.random() * (b - a + 1)) + a
const pick = (arr) => arr[Math.floor(Math.random() * arr.length)]
let seq = 0
const uid = () => `tm_${Date.now().toString(36)}_${++seq}_${Math.random().toString(36).slice(2, 5)}`

const HOURS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
const NAMES = ['Mei', 'Tom', 'Siti', 'Raj', 'Aisha', 'Ken', 'Nora', 'Wei']

function shuffle(a) {
  return [...a].sort(() => Math.random() - 0.5)
}

function fmt(h, m) {
  return `${h}:${String(m).padStart(2, '0')}`
}

function nextHour(h) {
  return h === 12 ? 1 : h + 1
}

function prevHour(h) {
  return h === 1 ? 12 : h - 1
}

/** Minute hand number on clock face for minutes */
function minuteHandNumber(m) {
  return m / 5 // 0→12 treated as 12, 5→1, 30→6, etc.
}

function optionsUnique(correct, distractors) {
  const s = new Set([String(correct)])
  for (const d of distractors) {
    if (s.size >= 4) break
    if (d != null && String(d) !== String(correct)) s.add(String(d))
  }
  while (s.size < 4) s.add(`opt_${s.size}_${rand(1, 99)}`)
  return shuffle([...s]).slice(0, 4)
}

// —— Item families ——

function itemOclockWrite() {
  const h = pick(HOURS)
  const correct = fmt(h, 0)
  return {
    id: uid(),
    skillId: 'TIME_OCLOCK',
    category: 'time',
    format: 'mcq',
    difficulty: 1,
    question: `The short hand points to ${h} and the long hand points to 12. What time is it?`,
    options: optionsUnique(correct, [fmt(h, 30), fmt(nextHour(h), 0), fmt(h, 15), `${h} o'clock`]),
    correctAnswer: correct,
    explanation: `Long hand on 12 means o'clock. Short hand on ${h} means ${h}:00.`,
    cinema: { hour: h, minute: 0 },
  }
}

function itemOclockPhrase() {
  const h = pick(HOURS.filter((x) => x <= 11))
  const correct = `${h} o'clock`
  return {
    id: uid(),
    skillId: 'TIME_OCLOCK',
    category: 'time',
    format: 'mcq',
    difficulty: 1,
    question: `How do we say the time ${fmt(h, 0)}?`,
    options: optionsUnique(correct, [`half past ${h}`, `${h}:30`, `half past ${nextHour(h)}`, `${nextHour(h)} o'clock`]),
    correctAnswer: correct,
    explanation: `${fmt(h, 0)} is said “${h} o'clock”.`,
    cinema: { hour: h, minute: 0 },
  }
}

function itemHalfPastWrite() {
  const h = pick(HOURS.filter((x) => x <= 11))
  const correct = fmt(h, 30)
  return {
    id: uid(),
    skillId: 'TIME_HALF',
    category: 'time',
    format: 'mcq',
    difficulty: 2,
    question: `It is half past ${h}. Which digital time matches?`,
    options: optionsUnique(correct, [fmt(h, 0), fmt(nextHour(h), 0), fmt(h, 15), fmt(nextHour(h), 30)]),
    correctAnswer: correct,
    explanation: `Half past ${h} means ${h}:30. The long hand is on 6.`,
    cinema: { hour: h, minute: 30 },
  }
}

function itemHalfPastHands() {
  const h = pick(HOURS.filter((x) => x <= 11))
  return {
    id: uid(),
    skillId: 'TIME_HALF',
    category: 'time',
    format: 'mcq',
    difficulty: 2,
    question: `At half past ${h}, where does the long hand point?`,
    options: optionsUnique('6', ['12', '3', '9', String(h)]),
    correctAnswer: '6',
    explanation: `Half past → long hand on 6 (30 minutes). Short hand is halfway between ${h} and ${nextHour(h)}.`,
    cinema: { hour: h, minute: 30 },
  }
}

function itemFiveMinutes() {
  // P1 2021: time to 5 minutes
  const h = pick(HOURS.filter((x) => x <= 11))
  const m = pick([5, 10, 15, 20, 25, 35, 40, 45, 50, 55])
  const correct = fmt(h, m)
  const hand = m / 5
  const handLabel = hand === 0 ? '12' : String(hand)
  return {
    id: uid(),
    skillId: 'TIME_5MIN',
    category: 'time',
    format: 'mcq',
    difficulty: 3,
    question: `The short hand is near ${h}. The long hand points to ${handLabel}. What time is it?`,
    options: optionsUnique(correct, [
      fmt(h, m === 5 ? 10 : 5),
      fmt(h, 0),
      fmt(h, 30),
      fmt(nextHour(h), m),
    ]),
    correctAnswer: correct,
    explanation: `Long hand on ${handLabel} means ${m} minutes. Time is ${correct}.`,
    cinema: { hour: h, minute: m },
  }
}

function itemDurationHour() {
  const h = pick([1, 2, 3, 4, 5, 6, 7, 8, 9])
  const start = fmt(h, 0)
  const end = fmt(nextHour(h), 0)
  return {
    id: uid(),
    skillId: 'TIME_DURATION',
    category: 'time',
    format: 'mcq',
    difficulty: 2,
    question: `A show starts at ${start} and ends at ${end}. How long is the show?`,
    options: optionsUnique('1 hour', ['30 minutes', '2 hours', '15 minutes', '1 minute']),
    correctAnswer: '1 hour',
    explanation: `From ${start} to ${end} is 1 whole hour.`,
    cinema: { hour: h, minute: 0 },
  }
}

function itemDurationHalf() {
  const h = pick([1, 2, 3, 4, 5, 6, 7, 8, 9])
  return {
    id: uid(),
    skillId: 'TIME_DURATION',
    category: 'time',
    format: 'mcq',
    difficulty: 2,
    question: `School break starts at ${fmt(h, 0)} and ends at ${fmt(h, 30)}. How long is the break?`,
    options: optionsUnique('30 minutes', ['1 hour', '15 minutes', '2 hours', '5 minutes']),
    correctAnswer: '30 minutes',
    explanation: `From ${h}:00 to ${h}:30 is half an hour (30 minutes).`,
    cinema: { hour: h, minute: 30 },
  }
}

function itemLater() {
  const h = pick([1, 2, 3, 4, 5, 6, 7, 8])
  const mode = pick(['hour', 'half'])
  if (mode === 'hour') {
    const correct = fmt(nextHour(h), 0)
    return {
      id: uid(),
      skillId: 'TIME_DURATION',
      category: 'time',
      format: 'mcq',
      difficulty: 2,
      question: `It is ${fmt(h, 0)} now. What time will it be in 1 hour?`,
      options: optionsUnique(correct, [fmt(h, 30), fmt(h, 0), fmt(nextHour(nextHour(h)), 0), fmt(prevHour(h), 0)]),
      correctAnswer: correct,
      explanation: `${fmt(h, 0)} + 1 hour = ${correct}.`,
      cinema: { hour: nextHour(h), minute: 0 },
    }
  }
  const correct = fmt(h, 30)
  return {
    id: uid(),
    skillId: 'TIME_DURATION',
    category: 'time',
    format: 'mcq',
    difficulty: 2,
    question: `It is ${fmt(h, 0)} now. What time will it be in half an hour?`,
    options: optionsUnique(correct, [fmt(nextHour(h), 0), fmt(h, 0), fmt(h, 15), fmt(nextHour(h), 30)]),
    correctAnswer: correct,
    explanation: `Half an hour after ${fmt(h, 0)} is ${correct}.`,
    cinema: { hour: h, minute: 30 },
  }
}

function itemAmPm() {
  const events = [
    { text: 'eating breakfast', correct: 'a.m.', wrong: 'p.m.' },
    { text: 'going to bed at night', correct: 'p.m.', wrong: 'a.m.' },
    { text: 'having lunch at school', correct: 'p.m.', wrong: 'a.m.' },
    { text: 'watching the sunrise', correct: 'a.m.', wrong: 'p.m.' },
    { text: 'doing homework after dinner', correct: 'p.m.', wrong: 'a.m.' },
    { text: 'brushing teeth before school in the morning', correct: 'a.m.', wrong: 'p.m.' },
  ]
  const e = pick(events)
  const h = e.correct === 'a.m.' ? pick([6, 7, 8, 9]) : pick([1, 2, 6, 7, 8])
  return {
    id: uid(),
    skillId: 'TIME_AMPM',
    category: 'time',
    format: 'mcq',
    difficulty: 2,
    question: `${pick(NAMES)} is ${e.text}. Is this more likely in the a.m. or the p.m.?`,
    options: optionsUnique(e.correct, [e.wrong, 'noon only', 'never', 'both always']),
    correctAnswer: e.correct,
    explanation: `${e.text} usually happens in the ${e.correct}. a.m. = morning; p.m. = afternoon/evening.`,
    cinema: { hour: h, minute: 0 },
  }
}

function itemRoutine() {
  const h = pick([7, 8, 9])
  const name = pick(NAMES)
  return {
    id: uid(),
    skillId: 'TIME_OCLOCK',
    category: 'time',
    format: 'mcq',
    difficulty: 2,
    question: `${name} leaves home at ${h} o'clock for school. Which time is that on a digital clock?`,
    options: optionsUnique(fmt(h, 0), [fmt(h, 30), fmt(nextHour(h), 0), fmt(h, 15), fmt(prevHour(h), 0)]),
    correctAnswer: fmt(h, 0),
    explanation: `${h} o'clock is written ${fmt(h, 0)}.`,
    cinema: { hour: h, minute: 0 },
  }
}

function itemBeforeAfter() {
  const h = pick([3, 4, 5, 6, 7, 8, 9])
  const correct = fmt(prevHour(h), 0)
  return {
    id: uid(),
    skillId: 'TIME_COMPARE',
    category: 'time',
    format: 'mcq',
    difficulty: 2,
    question: `Which time comes just before ${h} o'clock?`,
    options: optionsUnique(correct, [fmt(nextHour(h), 0), fmt(h, 30), fmt(h, 0), fmt(prevHour(h), 30)]),
    correctAnswer: correct,
    explanation: `Just before ${h}:00 is ${correct}.`,
    cinema: { hour: prevHour(h), minute: 0 },
  }
}

function itemShortHand() {
  const h = pick(HOURS.filter((x) => x <= 11))
  return {
    id: uid(),
    skillId: 'TIME_OCLOCK',
    category: 'time',
    format: 'mcq',
    difficulty: 1,
    question: `At ${h} o'clock, the short hand points to:`,
    options: optionsUnique(String(h), ['12', '6', String(nextHour(h)), String(prevHour(h))]),
    correctAnswer: String(h),
    explanation: `At ${h} o'clock the short (hour) hand points to ${h}. The long hand points to 12.`,
    cinema: { hour: h, minute: 0 },
  }
}

function itemWhichIsLater() {
  const h = pick([2, 3, 4, 5, 6, 7, 8])
  const a = fmt(h, 0)
  const b = fmt(h, 30)
  return {
    id: uid(),
    skillId: 'TIME_COMPARE',
    category: 'time',
    format: 'mcq',
    difficulty: 2,
    question: `Which time is later in the day: ${a} or ${b}?`,
    options: optionsUnique(b, [a, 'same time', fmt(prevHour(h), 0), fmt(nextHour(h), 0)]),
    correctAnswer: b,
    explanation: `${b} is 30 minutes after ${a}, so ${b} is later.`,
    cinema: { hour: h, minute: 30 },
  }
}

function itemQuarterInformal() {
  // still P1-friendly: 15 minutes past without requiring "quarter" vocabulary as only answer
  const h = pick(HOURS.filter((x) => x <= 11))
  const correct = fmt(h, 15)
  return {
    id: uid(),
    skillId: 'TIME_5MIN',
    category: 'time',
    format: 'mcq',
    difficulty: 3,
    question: `The long hand points to 3. The short hand is just past ${h}. What time is it?`,
    options: optionsUnique(correct, [fmt(h, 30), fmt(h, 0), fmt(h, 45), fmt(nextHour(h), 15)]),
    correctAnswer: correct,
    explanation: `Long hand on 3 means 15 minutes. Time is ${correct}.`,
    cinema: { hour: h, minute: 15 },
  }
}

const FAMILIES = [
  itemOclockWrite,
  itemOclockPhrase,
  itemHalfPastWrite,
  itemHalfPastHands,
  itemFiveMinutes,
  itemDurationHour,
  itemDurationHalf,
  itemLater,
  itemAmPm,
  itemRoutine,
  itemBeforeAfter,
  itemShortHand,
  itemWhichIsLater,
  itemQuarterInformal,
]

export function generateTimeQuestion(preferSkill) {
  let pool = FAMILIES
  if (preferSkill === 'TIME_HALF') pool = [itemHalfPastWrite, itemHalfPastHands, itemDurationHalf]
  if (preferSkill === 'TIME_OCLOCK') pool = [itemOclockWrite, itemOclockPhrase, itemShortHand, itemRoutine]
  if (preferSkill === 'TIME_5MIN') pool = [itemFiveMinutes, itemQuarterInformal]
  if (preferSkill === 'TIME_DURATION') pool = [itemDurationHour, itemDurationHalf, itemLater]
  if (preferSkill === 'TIME_AMPM') pool = [itemAmPm]
  return pick(pool)()
}

/**
 * Session with diversity: rotate families so kids don't see the same stem 8 times.
 */
export function generateTimeSession(n = 8) {
  const order = shuffle(FAMILIES)
  const out = []
  const seenQ = new Set()
  let i = 0
  let guard = 0
  while (out.length < n && guard < n * 12) {
    guard++
    const q = order[i % order.length]()
    i++
    // de-dupe near-identical stems
    const key = q.question.replace(/\d+/g, '#').slice(0, 60)
    if (seenQ.has(key) && guard < n * 8) continue
    seenQ.add(key)
    out.push(q)
  }
  while (out.length < n) out.push(generateTimeQuestion())
  return out
}
