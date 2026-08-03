/**
 * Phase 3 — English generators for ages 7–8 (AEIS-aware, not grammar drill dumps)
 * Skills: VOCAB_SCENE, SENT_BUILD, READ_QUEST, GRAM_NOTICE, PHON_PATTERN
 */

const rand = (a, b) => Math.floor(Math.random() * (b - a + 1)) + a
const pick = (arr) => arr[Math.floor(Math.random() * arr.length)]
let seq = 0
const uid = (p) => `${p}_${Date.now().toString(36)}_${++seq}`

const VOCAB = [
  { word: 'enormous', meaning: 'very big', scene: 'The elephant is enormous.', wrong: ['very small', 'very soft', 'very quiet'] },
  { word: 'tiny', meaning: 'very small', scene: 'The ant is tiny.', wrong: ['very big', 'very loud', 'very fast'] },
  { word: 'happy', meaning: 'feeling good', scene: 'She smiles when she is happy.', wrong: ['feeling sad', 'feeling angry', 'feeling tired'] },
  { word: 'brave', meaning: 'not afraid', scene: 'The brave child tried the new slide.', wrong: ['sleepy', 'hungry', 'noisy'] },
  { word: 'whisper', meaning: 'speak very softly', scene: 'Please whisper in the library.', wrong: ['shout', 'run', 'jump'] },
  { word: 'delicious', meaning: 'tastes very good', scene: 'The mango was delicious.', wrong: ['tastes bad', 'looks dark', 'feels cold'] },
  { word: 'rapid', meaning: 'very fast', scene: 'The rapid train left the station.', wrong: ['very slow', 'very old', 'very quiet'] },
  { word: 'gentle', meaning: 'kind and soft', scene: 'He gave the kitten a gentle pat.', wrong: ['rough', 'loud', 'heavy'] },
]

const SENTENCES = [
  { words: ['The', 'cat', 'sits', 'on', 'the', 'mat'], correct: 'The cat sits on the mat.', distractors: ['Cat the sits mat on the.', 'The sits cat on mat the.'] },
  { words: ['Tom', 'kicks', 'the', 'ball'], correct: 'Tom kicks the ball.', distractors: ['Kicks Tom the ball.', 'The ball kicks Tom.'] },
  { words: ['Birds', 'fly', 'in', 'the', 'sky'], correct: 'Birds fly in the sky.', distractors: ['Fly birds the in sky.', 'Sky the birds fly in.'] },
  { words: ['She', 'reads', 'a', 'book'], correct: 'She reads a book.', distractors: ['Reads she a book.', 'A book reads she.'] },
  { words: ['We', 'play', 'in', 'the', 'park'], correct: 'We play in the park.', distractors: ['Play we park the in.', 'In park we the play.'] },
]

const PASSAGES = [
  {
    text: 'Mei has a red balloon. The wind pushes it up. Mei smiles and holds the string tightly.',
    q: 'What colour is Mei’s balloon?',
    answer: 'red',
    options: ['red', 'blue', 'green', 'yellow'],
    why: 'The first sentence says the balloon is red.',
  },
  {
    text: 'Tom packs his bag for school. He puts in a book, a pencil, and a water bottle. Then he puts on his shoes.',
    q: 'What does Tom put in his bag?',
    answer: 'a book, a pencil, and a water bottle',
    options: ['a book, a pencil, and a water bottle', 'only shoes', 'a balloon', 'nothing'],
    why: 'The second sentence lists what goes in the bag.',
  },
  {
    text: 'It is raining. Siti opens her yellow umbrella. She walks carefully so she does not splash.',
    q: 'Why does Siti open her umbrella?',
    answer: 'It is raining',
    options: ['It is raining', 'She is hungry', 'She lost her shoes', 'It is sunny'],
    why: 'The first sentence tells us it is raining.',
  },
  {
    text: 'Ken sees a small bird on the fence. The bird sings a sweet song. Ken listens and feels calm.',
    q: 'Where is the bird?',
    answer: 'on the fence',
    options: ['on the fence', 'in a cage', 'under a car', 'in the water'],
    why: 'The first sentence says the bird is on the fence.',
  },
]

const GRAMMAR = [
  {
    q: 'Choose the correct sentence.',
    correct: 'The dogs are running.',
    options: ['The dogs are running.', 'The dogs is running.', 'The dogs am running.', 'The dogs be running.'],
    why: '“Dogs” is plural, so we use “are”.',
  },
  {
    q: 'Choose the correct sentence.',
    correct: 'She walks to school.',
    options: ['She walks to school.', 'She walk to school.', 'She walking to school.', 'She walkeds to school.'],
    why: 'With “she”, the verb often ends with -s: walks.',
  },
  {
    q: 'Which word is a naming word (noun)?',
    correct: 'apple',
    options: ['apple', 'run', 'happy', 'quickly'],
    why: 'An apple is a thing we can name.',
  },
  {
    q: 'Which word is an action word (verb)?',
    correct: 'jump',
    options: ['jump', 'blue', 'soft', 'table'],
    why: 'Jump is something you do.',
  },
]

const PHONICS = [
  { q: 'Which word rhymes with “cat”?', correct: 'hat', options: ['hat', 'dog', 'sun', 'pen'], why: 'Cat and hat both end with the “at” sound.' },
  { q: 'Which word begins with the same sound as “sun”?', correct: 'sock', options: ['sock', 'moon', 'ball', 'tree'], why: 'Sun and sock both begin with /s/.' },
  { q: 'How many sounds do you hear in “dog”?', correct: '3', options: ['3', '1', '2', '4'], why: 'd-o-g — three sounds.' },
  { q: 'Which word has the long “ee” sound?', correct: 'tree', options: ['tree', 'bed', 'hot', 'cup'], why: 'Tree has the long ee sound.' },
]

function shuffle(arr) {
  return [...arr].sort(() => Math.random() - 0.5)
}

export function generateVocabQuestion() {
  const v = pick(VOCAB)
  return {
    id: uid('voc'),
    skillId: 'VOCAB_SCENE',
    subject: 'english',
    format: 'mcq',
    question: `In this sentence: “${v.scene}” — what does “${v.word}” mean?`,
    options: shuffle([v.meaning, ...v.wrong]),
    correctAnswer: v.meaning,
    explanation: v.why || `“${v.word}” means ${v.meaning}.`,
    cinema: { word: v.word, scene: v.scene, meaning: v.meaning },
  }
}

export function generateSentenceQuestion() {
  const s = pick(SENTENCES)
  return {
    id: uid('sent'),
    skillId: 'SENT_BUILD',
    subject: 'english',
    format: 'mcq',
    question: `Which sentence is in the correct order? (Words: ${s.words.join(' · ')})`,
    options: shuffle([s.correct, ...s.distractors, s.words.slice().reverse().join(' ')]).slice(0, 4),
    correctAnswer: s.correct,
    explanation: `A clear sentence: ${s.correct}`,
    cinema: { correct: s.correct, words: s.words },
  }
}

export function generateReadingQuestion() {
  const p = pick(PASSAGES)
  return {
    id: uid('read'),
    skillId: 'READ_QUEST',
    subject: 'english',
    format: 'mcq',
    question: `Read:\n\n“${p.text}”\n\n${p.q}`,
    options: shuffle(p.options),
    correctAnswer: p.answer,
    explanation: p.why,
    cinema: { text: p.text, q: p.q },
  }
}

export function generateGrammarQuestion() {
  const g = pick(GRAMMAR)
  return {
    id: uid('gram'),
    skillId: 'GRAM_NOTICE',
    subject: 'english',
    format: 'mcq',
    question: g.q,
    options: shuffle(g.options),
    correctAnswer: g.correct,
    explanation: g.why,
    cinema: { focus: g.correct },
  }
}

export function generatePhonicsQuestion() {
  const p = pick(PHONICS)
  return {
    id: uid('phon'),
    skillId: 'PHON_PATTERN',
    subject: 'english',
    format: 'mcq',
    question: p.q,
    options: shuffle(p.options),
    correctAnswer: p.correct,
    explanation: p.why,
    cinema: { focus: p.correct },
  }
}

const ALL = [
  generateVocabQuestion,
  generateSentenceQuestion,
  generateReadingQuestion,
  generateGrammarQuestion,
  generatePhonicsQuestion,
]

export function generateEnglishSession(n = 8, skill = 'all') {
  const map = {
    vocab: generateVocabQuestion,
    sentence: generateSentenceQuestion,
    reading: generateReadingQuestion,
    grammar: generateGrammarQuestion,
    phonics: generatePhonicsQuestion,
    all: null,
  }
  if (skill !== 'all' && map[skill]) {
    return Array.from({ length: n }, () => map[skill]())
  }
  return Array.from({ length: n }, (_, i) => ALL[i % ALL.length]())
}
