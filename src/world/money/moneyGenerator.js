/**
 * MOE P1 Money (SGD): coins 5¢, 10¢, 20¢, 50¢, $1; counting cents; simple totals;
 * compare values; make an amount; change ideas at P1 level.
 * NEVER asks "which is more" when values are equal without correctAnswer = same.
 */

const rand = (a, b) => Math.floor(Math.random() * (b - a + 1)) + a
const pick = (arr) => arr[Math.floor(Math.random() * arr.length)]
const COINS = [5, 10, 20, 50]
const NAMES = ['Mei', 'Tom', 'Siti', 'Raj', 'Aisha', 'Ken']
let seq = 0
const uid = () => `mo_${Date.now().toString(36)}_${++seq}_${Math.random().toString(36).slice(2, 5)}`

function shuffle(a) {
  return [...a].sort(() => Math.random() - 0.5)
}

function opts(correct, distractors) {
  const s = new Set([String(correct)])
  for (const d of distractors) {
    if (d == null || d === '') continue
    if (String(d) === String(correct)) continue
    s.add(String(d))
    if (s.size >= 4) break
  }
  let guard = 0
  while (s.size < 4 && guard++ < 20) {
    const n = rand(5, 100)
    const cand = String(correct).includes('¢') ? `${n}¢` : String(n)
    if (cand !== String(correct)) s.add(cand)
  }
  return shuffle([...s]).slice(0, 4)
}

function twoDifferentCoins() {
  let a = pick(COINS)
  let b = pick(COINS)
  let tries = 0
  while (a === b && tries++ < 10) b = pick(COINS)
  if (a === b) b = COINS.find((c) => c !== a) || 10
  return [a, b]
}

function itemSum() {
  const [c1, c2] = [pick(COINS), pick(COINS)]
  const total = c1 + c2
  return {
    id: uid(),
    skillId: 'MONEY_SUM',
    category: 'money',
    format: 'mcq',
    question: `What is the total of a ${c1}¢ coin and a ${c2}¢ coin?`,
    options: opts(`${total}¢`, [`${c1}¢`, `${c2}¢`, `${total + 10}¢`, `${Math.abs(c1 - c2)}¢`, `${total + 5}¢`]),
    correctAnswer: `${total}¢`,
    explanation: `${c1} + ${c2} = ${total} cents.`,
    cinema: { c1, c2, total },
  }
}

function itemSumThree() {
  const coins = [pick(COINS), pick(COINS), pick(COINS)]
  const total = coins.reduce((a, b) => a + b, 0)
  return {
    id: uid(),
    skillId: 'MONEY_SUM',
    category: 'money',
    format: 'mcq',
    question: `Add: ${coins[0]}¢ + ${coins[1]}¢ + ${coins[2]}¢ = ?`,
    options: opts(`${total}¢`, [`${total + 10}¢`, `${total - 5}¢`, `${coins[0] + coins[1]}¢`, `${coins[2]}¢`]),
    correctAnswer: `${total}¢`,
    explanation: `${coins.join(' + ')} = ${total} cents.`,
    cinema: { c1: coins[0], c2: coins[1], total },
  }
}

function itemWordBuy() {
  const name = pick(NAMES)
  const price = pick([15, 25, 30, 35, 40, 45, 55, 60, 70])
  const [c1, c2] = twoDifferentCoins()
  // ensure can discuss paying
  const paid = c1 + c2
  return {
    id: uid(),
    skillId: 'MONEY_WORD',
    category: 'money',
    format: 'mcq',
    question: `${name} has a ${c1}¢ coin and a ${c2}¢ coin. How much money does ${name} have in all?`,
    options: opts(`${paid}¢`, [`${c1}¢`, `${c2}¢`, `${paid + 10}¢`, `${Math.abs(c1 - c2)}¢`]),
    correctAnswer: `${paid}¢`,
    explanation: `${c1} + ${c2} = ${paid} cents.`,
    cinema: { c1, c2, total: paid },
  }
}

function itemCompare() {
  const [a, b] = twoDifferentCoins()
  const greater = Math.max(a, b)
  const lesser = Math.min(a, b)
  return {
    id: uid(),
    skillId: 'MONEY_COMPARE',
    category: 'money',
    format: 'mcq',
    question: `Which coin is worth more: ${a}¢ or ${b}¢?`,
    options: opts(`${greater}¢`, [`${lesser}¢`, 'same', `${a + b}¢`]),
    correctAnswer: `${greater}¢`,
    explanation: `${greater}¢ is worth more than ${lesser}¢.`,
    cinema: { c1: a, c2: b, total: a + b },
  }
}

function itemEqualSame() {
  // Explicit equal case — correct answer MUST be "same"
  const v = pick(COINS)
  return {
    id: uid(),
    skillId: 'MONEY_COMPARE',
    category: 'money',
    format: 'mcq',
    question: `Which is worth more: ${v}¢ or ${v}¢?`,
    options: opts('same', [`${v}¢`, `${v * 2}¢`, `${v + 5}¢`, '0¢']),
    correctAnswer: 'same',
    explanation: `Both are ${v}¢. They are worth the same.`,
    cinema: { c1: v, c2: v, total: v + v },
  }
}

function itemDollarCent() {
  return {
    id: uid(),
    skillId: 'MONEY_DOLLAR',
    category: 'money',
    format: 'mcq',
    question: `How many cents make $1?`,
    options: opts('100¢', ['10¢', '50¢', '20¢', '1000¢']),
    correctAnswer: '100¢',
    explanation: `$1 = 100 cents.`,
    cinema: { c1: 50, c2: 50, total: 100 },
  }
}

function itemCountSameCoins() {
  const coin = pick([5, 10, 20])
  const n = rand(2, 5)
  const total = coin * n
  return {
    id: uid(),
    skillId: 'MONEY_SUM',
    category: 'money',
    format: 'mcq',
    question: `What is the total of ${n} coins of ${coin}¢ each?`,
    options: opts(`${total}¢`, [`${coin}¢`, `${n}¢`, `${total + coin}¢`, `${total - coin}¢`]),
    correctAnswer: `${total}¢`,
    explanation: `${n} × ${coin}¢ = ${total}¢.`,
    cinema: { c1: coin, c2: coin, total },
  }
}

function itemSA() {
  const [c1, c2] = [pick(COINS), pick(COINS)]
  const total = c1 + c2
  return {
    id: uid(),
    skillId: 'MONEY_SA',
    category: 'money',
    format: 'short_answer',
    question: `${c1}¢ + ${c2}¢ = ? (write the number of cents only)`,
    correctAnswer: String(total),
    explanation: `${c1} + ${c2} = ${total} cents.`,
    cinema: { c1, c2, total },
  }
}

function itemEnough() {
  const price = pick([20, 30, 40, 50, 60])
  const coin = pick(COINS)
  const enough = coin >= price
  const correct = enough ? 'Yes' : 'No'
  return {
    id: uid(),
    skillId: 'MONEY_WORD',
    category: 'money',
    format: 'mcq',
    question: `A sticker costs ${price}¢. You have one ${coin}¢ coin. Can you buy the sticker?`,
    options: opts(correct, ['Yes', 'No', 'Maybe', 'Only with $1']),
    correctAnswer: correct,
    explanation: enough
      ? `${coin}¢ is enough because ${coin} ≥ ${price}.`
      : `${coin}¢ is not enough because ${coin} < ${price}.`,
    cinema: { c1: coin, c2: 0, total: coin },
  }
}

const FAMILIES = [
  itemSum,
  itemSumThree,
  itemWordBuy,
  itemCompare,
  itemEqualSame, // rare equal case handled correctly
  itemDollarCent,
  itemCountSameCoins,
  itemSA,
  itemEnough,
]

// Weight: compare-equal only ~10% of the time via pick from weighted list
const WEIGHTED = [
  itemSum,
  itemSum,
  itemSumThree,
  itemWordBuy,
  itemWordBuy,
  itemCompare,
  itemCompare,
  itemCompare,
  itemDollarCent,
  itemCountSameCoins,
  itemSA,
  itemEnough,
  itemEqualSame, // only 1 slot
]

export function generateMoneyQuestion() {
  return pick(WEIGHTED)()
}

export function generateMoneySession(n = 8) {
  const order = shuffle(FAMILIES)
  const out = []
  const seen = new Set()
  let i = 0
  let guard = 0
  while (out.length < n && guard++ < n * 15) {
    const q = order[i % order.length]()
    i++
    const key = q.question.replace(/\d+/g, '#')
    if (seen.has(key) && guard < n * 10) continue
    // Safety net: never ship broken equal-compare
    if (/worth more:\s*(\d+)¢ or \1¢/i.test(q.question) && q.correctAnswer !== 'same') {
      continue
    }
    seen.add(key)
    out.push(q)
  }
  while (out.length < n) {
    const q = itemSum()
    out.push(q)
  }
  return out
}
