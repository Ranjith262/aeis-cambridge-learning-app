import { rankSkillsForPractice, MATH_SKILL_POOL, ENGLISH_SKILL_POOL } from './learnerModel'
import { generatePlaceValueQuestion } from '../placeValue/pvGenerator'
import { generateBondQuestion } from '../bonds/bondsGenerator'
import { generateAddQuestion } from '../addition/addGenerator'
import { generateSubQuestion } from '../subtraction/subGenerator'
import { generateMoneyQuestion } from '../money/moneyGenerator'
import { generateTimeQuestion } from '../time/timeGenerator'
import {
  generateVocabQuestion,
  generateSentenceQuestion,
  generateReadingQuestion,
  generateGrammarQuestion,
  generatePhonicsQuestion,
} from '../english/englishGenerator'

function tryUntil(skillPrefix, gen, max = 8) {
  for (let i = 0; i < max; i++) {
    const q = gen()
    if (!skillPrefix || String(q.skillId).startsWith(skillPrefix) || q.skillId === skillPrefix) return q
  }
  return gen()
}

const MATH_FACTORIES = {
  PV_BUILD: () => tryUntil('PV_BUILD', () => generatePlaceValueQuestion('PV_BUILD')),
  PV_READ: () => tryUntil('PV_READ', () => generatePlaceValueQuestion('PV_READ')),
  PV_TENS_ONES: () => tryUntil('PV_TENS', () => generatePlaceValueQuestion('PV_TENS_ONES')),
  PV_COMPARE: () => tryUntil('PV_COMPARE', () => generatePlaceValueQuestion('PV_COMPARE')),
  BONDS_10: () => generateBondQuestion(),
  BONDS_20: () => generateBondQuestion(),
  ADD_BASIC: () => generateAddQuestion(),
  ADD_MAKE10: () => generateAddQuestion(),
  ADD_DOUBLE: () => generateAddQuestion(),
  ADD_WORD: () => generateAddQuestion(),
  SUB_BASIC: () => generateSubQuestion(),
  SUB_WORD: () => generateSubQuestion(),
  MONEY_SUM: () => generateMoneyQuestion(),
  TIME_OCLOCK: () => generateTimeQuestion(),
  TIME_HALF: () => generateTimeQuestion(),
}

const ENG_FACTORIES = {
  VOCAB_SCENE: generateVocabQuestion,
  SENT_BUILD: generateSentenceQuestion,
  READ_QUEST: generateReadingQuestion,
  GRAM_NOTICE: generateGrammarQuestion,
  PHON_PATTERN: generatePhonicsQuestion,
}

/**
 * Build an interleaved adaptive session.
 * domain: 'math' | 'english' | 'mixed'
 */
export function buildSmartQuest({ domain = 'math', count = 10 } = {}) {
  let pool =
    domain === 'english'
      ? ENGLISH_SKILL_POOL
      : domain === 'mixed'
        ? [...MATH_SKILL_POOL, ...ENGLISH_SKILL_POOL]
        : MATH_SKILL_POOL

  const ranked = rankSkillsForPractice(pool)
  // Weight front of queue more heavily (fragile / weak)
  const picks = []
  for (let i = 0; i < count; i++) {
    // 60% from top third, 40% explore rest
    const top = ranked.slice(0, Math.max(3, Math.ceil(ranked.length / 3)))
    const skill = Math.random() < 0.6 ? top[i % top.length] : ranked[i % ranked.length]
    picks.push(skill)
  }

  // Interleave: avoid 3 same skill in a row
  for (let i = 2; i < picks.length; i++) {
    if (picks[i] === picks[i - 1] && picks[i] === picks[i - 2]) {
      picks[i] = ranked[(ranked.indexOf(picks[i]) + 2) % ranked.length]
    }
  }

  return picks.map((skillId) => {
    const factory =
      MATH_FACTORIES[skillId] ||
      ENG_FACTORIES[skillId] ||
      (() => generateAddQuestion())
    const q = factory()
    return { ...q, adaptiveSkill: skillId }
  })
}
