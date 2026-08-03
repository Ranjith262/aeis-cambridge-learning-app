/** Short CPA teaching scripts per math topic */
export const teachScripts = {
  numbersTo100: {
    title: 'Numbers to 100',
    emoji: '🔢',
    steps: [
      { stage: 'Concrete', text: 'Grab sticks or counters. Make groups of 10. Leftovers are ones.', visual: 'base10' },
      { stage: 'Pictorial', text: 'Draw a rod for each ten and dots for ones. 23 is 2 rods and 3 dots.', visual: 'base10' },
      { stage: 'Abstract', text: 'In 47, the 4 means 4 tens (40). The 7 means 7 ones. 40 + 7 = 47.', visual: 'base10' },
      { stage: 'Try', text: 'Say a number out loud as tens and ones. Example: 56 → 5 tens 6 ones.', visual: 'base10' },
    ],
  },
  addition: {
    title: 'Addition',
    emoji: '➕',
    steps: [
      { stage: 'Concrete', text: 'Use fingers or counters. Put two groups together and count all.', visual: 'tenframe' },
      { stage: 'Pictorial', text: 'Draw two bars. Join them to see the whole. That is addition.', visual: 'bar' },
      { stage: 'Abstract', text: 'Make 10 when you can: 8 + 5 → 8 + 2 = 10, then +3 = 13.', visual: 'bar' },
      { stage: 'Try', text: 'Solve 7 + 6 by making 10. What do you get?', visual: 'tenframe' },
    ],
  },
  subtraction: {
    title: 'Subtraction',
    emoji: '➖',
    steps: [
      { stage: 'Concrete', text: 'Start with a group. Take some away. Count what is left.', visual: 'tenframe' },
      { stage: 'Pictorial', text: 'Draw the whole bar. Cross out the part taken away.', visual: 'bar' },
      { stage: 'Abstract', text: '15 − 7: think 15 − 5 = 10, then 10 − 2 = 8.', visual: 'numberline' },
      { stage: 'Try', text: 'What is 12 − 4? Count back on a number line.', visual: 'numberline' },
    ],
  },
  numberBonds: {
    title: 'Number Bonds',
    emoji: '🔗',
    steps: [
      { stage: 'Concrete', text: 'Split 10 counters into two groups in different ways.', visual: 'tenframe' },
      { stage: 'Pictorial', text: 'Part–part–whole: two parts join to make the whole.', visual: 'bar' },
      { stage: 'Abstract', text: 'Bonds of 10: 1+9, 2+8, 3+7, 4+6, 5+5. Memorise the friends!', visual: 'tenframe' },
      { stage: 'Try', text: 'What pairs with 6 to make 10?', visual: 'tenframe' },
    ],
  },
  shapesAndPatterns: {
    title: 'Shapes & Patterns',
    emoji: '🔺',
    steps: [
      { stage: 'Concrete', text: 'Feel a triangle, square, circle. Count sides and corners.', visual: 'shapes' },
      { stage: 'Pictorial', text: 'Draw the shape. Label sides and corners.', visual: 'shapes' },
      { stage: 'Abstract', text: 'Triangle: 3 sides. Square: 4 equal sides. Circle: no corners.', visual: 'shapes' },
      { stage: 'Try', text: 'What comes next in a pattern: circle, square, circle, square, ___?', visual: 'shapes' },
    ],
  },
  measurement: {
    title: 'Measurement',
    emoji: '📏',
    steps: [
      { stage: 'Concrete', text: 'Compare two pencils. Which is longer? Line them up at one end.', visual: 'numberline' },
      { stage: 'Pictorial', text: 'Use a ruler picture. Start at 0 when you measure.', visual: 'numberline' },
      { stage: 'Abstract', text: 'Length in cm. Estimate first, then check.', visual: 'numberline' },
      { stage: 'Try', text: 'About how many cm is your finger?', visual: 'numberline' },
    ],
  },
  time: {
    title: 'Time',
    emoji: '🕐',
    steps: [
      { stage: 'Concrete', text: 'Look at a real clock. The short hand is hours. The long hand is minutes.', visual: 'clock' },
      { stage: 'Pictorial', text: 'Watch the hands move. 12 at the top means o’clock.', visual: 'clock' },
      { stage: 'Abstract', text: '3:00 is 3 o’clock. Each number is 5 minutes for the long hand.', visual: 'clock' },
      { stage: 'Try', text: 'What time is it when the long hand is on 12 and the short hand on 4?', visual: 'clock' },
    ],
  },
  money: {
    title: 'Money (SGD)',
    emoji: '💰',
    steps: [
      { stage: 'Concrete', text: 'Sort coins: 1¢, 5¢, 10¢, 20¢, 50¢, $1.', visual: 'coins' },
      { stage: 'Pictorial', text: 'Group coins to make an amount. Prefer larger coins first.', visual: 'coins' },
      { stage: 'Abstract', text: '100 cents = $1. Count up to pay and find change.', visual: 'coins' },
      { stage: 'Try', text: 'Make 35¢ with the fewest coins you can.', visual: 'coins' },
    ],
  },
  wordProblems: {
    title: 'Word Problems',
    emoji: '📝',
    steps: [
      { stage: 'Concrete', text: 'Act out the story with counters.', visual: 'bar' },
      { stage: 'Pictorial', text: 'Draw a bar model: what is known? What is asked?', visual: 'bar' },
      { stage: 'Abstract', text: 'Write a number sentence. Check: does the answer make sense?', visual: 'bar' },
      { stage: 'Try', text: 'Read a problem twice. Underline the numbers and the question.', visual: 'bar' },
    ],
  },
  pictureGraphs: {
    title: 'Picture Graphs',
    emoji: '📊',
    steps: [
      { stage: 'Concrete', text: 'Line up real objects in rows to compare amounts.', visual: 'graph' },
      { stage: 'Pictorial', text: 'Each picture stands for 1 (or more). Count carefully.', visual: 'graph' },
      { stage: 'Abstract', text: 'Ask: most? least? how many more? how many in total?', visual: 'graph' },
      { stage: 'Try', text: 'Compare two rows: how many more does the longer row have?', visual: 'graph' },
    ],
  },
}

export function getTeachScript(topicId) {
  return teachScripts[topicId] || teachScripts.numbersTo100
}
