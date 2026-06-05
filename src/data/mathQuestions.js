const mathQuestions = {
 
  // ═══════════════════════════════════════════════════════════════

  // TOPIC 1: NUMBERS TO 100

  // Covers: counting, number names, comparing, ordering,

  //         place value (tens & ones), number patterns

  // ═══════════════════════════════════════════════════════════════

  numbersTo100: [

    // --- Counting objects ---

    {id:"n1",question:"Count the apples: 🍎🍎🍎🍎🍎🍎🍎",options:["5","6","7","8"],correctAnswer:"7",explanation:"Count each apple: 1, 2, 3, 4, 5, 6, 7!",example:"Point to each one as you count."},

    {id:"n2",question:"Count the stars: ⭐⭐⭐⭐⭐⭐⭐⭐⭐",options:["7","8","9","10"],correctAnswer:"9",explanation:"Count carefully: 1 to 9. There are 9 stars!",example:"Touch each star as you say a number."},

    {id:"n3",question:"How many fingers do you have on both hands?",options:["5","8","10","12"],correctAnswer:"10",explanation:"5 fingers on each hand: 5 + 5 = 10.",example:"Hold up both hands and count: 10 fingers!"},

    {id:"n4",question:"Count: 🐟🐟🐟🐟🐟🐟🐟🐟🐟🐟🐟🐟",options:["10","11","12","13"],correctAnswer:"12",explanation:"Count each fish: there are 12 in total.",example:"12 is one dozen — like a dozen eggs!"},
 
    // --- Place value (tens and ones) ---

    {id:"n5",question:"The number 14 has ___ ten(s) and ___ ones.",options:["1 ten 4 ones","4 tens 1 one","1 ten 0 ones","0 tens 14 ones"],correctAnswer:"1 ten 4 ones",explanation:"14 = 1 group of ten + 4 single ones.",example:"Think of 14 as one bundle of 10 sticks and 4 loose sticks."},

    {id:"n6",question:"What number is 3 tens and 5 ones?",options:["53","35","8","305"],correctAnswer:"35",explanation:"3 tens = 30, plus 5 ones = 35.",example:"Like 3 packets of 10 sweets + 5 more = 35 sweets."},

    {id:"n7",question:"In the number 27, the digit '2' stands for:",options:["2 ones","2 tens","20 ones","2 hundreds"],correctAnswer:"2 tens",explanation:"The '2' is in the tens place, so it means 2 tens (or 20).",example:"27 = 20 + 7. The 2 means twenty!"},

    {id:"n8",question:"What number is 6 tens?",options:["6","16","60","600"],correctAnswer:"60",explanation:"6 tens = 6 × 10 = 60.",example:"Think of 6 bundles of 10 pencils = 60 pencils."},

    {id:"n9",question:"How many tens and ones in 50?",options:["5 tens 0 ones","0 tens 50 ones","50 tens 0 ones","5 tens 5 ones"],correctAnswer:"5 tens 0 ones",explanation:"50 = 5 tens and 0 ones. It's exactly 5 groups of ten.",example:"Like 5 rows of 10 chairs = 50 chairs."},

    {id:"n10",question:"What number is 8 tens and 3 ones?",options:["38","83","11","803"],correctAnswer:"83",explanation:"8 tens = 80, plus 3 ones = 83.",example:"80 + 3 = 83. Easy!"},

    {id:"n11",question:"The digit '9' in 92 is in the ___ place.",options:["ones","tens","hundreds","thousands"],correctAnswer:"tens",explanation:"In 92, the 9 is on the left — that's the tens place (= 90).",example:"92 means 90 + 2. The 9 stands for 9 tens."},
 
    // --- Comparing numbers ---

    {id:"n12",question:"Which number is greater: 34 or 28?",options:["28","34","They are equal","Cannot tell"],correctAnswer:"34",explanation:"34 > 28 because 3 tens is more than 2 tens.",example:"Compare tens first: 3 tens beats 2 tens."},

    {id:"n13",question:"Which is the smallest number?",options:["19","9","91","29"],correctAnswer:"9",explanation:"9 is a single-digit number — smaller than all the two-digit numbers.",example:"9 < 19 < 29 < 91."},

    {id:"n14",question:"Arrange from smallest to greatest: 15, 8, 42",options:["8, 15, 42","15, 8, 42","42, 15, 8","8, 42, 15"],correctAnswer:"8, 15, 42",explanation:"8 is smallest, then 15, then 42 is greatest.",example:"Think of a number line: 8 comes first, then 15, then 42."},

    {id:"n15",question:"Which number is less than 50?",options:["55","67","49","72"],correctAnswer:"49",explanation:"49 < 50. All the others are more than 50.",example:"49 is just 1 less than 50."},

    {id:"n16",question:"Which sign goes in the box: 36 ☐ 63?",options:[">","<","=","×"],correctAnswer:"<",explanation:"36 is less than 63. 3 tens < 6 tens.",example:"< means 'is less than'. 36 < 63."},

    {id:"n17",question:"Which is the greatest number?",options:["78","87","68","76"],correctAnswer:"87",explanation:"87 has 8 tens — more than all the others.",example:"Compare tens digits: 8 > 7 > 6."},
 
    // --- Ordering numbers ---

    {id:"n18",question:"What number comes just after 39?",options:["38","40","41","30"],correctAnswer:"40",explanation:"After 39 comes 40. We go from thirty-nine to forty!",example:"Count: 38, 39, 40!"},

    {id:"n19",question:"What number comes just before 60?",options:["61","50","59","58"],correctAnswer:"59",explanation:"The number just before 60 is 59.",example:"Count backwards: 60, 59. Before 60 is 59!"},

    {id:"n20",question:"What number is between 45 and 47?",options:["44","46","48","50"],correctAnswer:"46",explanation:"46 is right between 45 and 47.",example:"45, 46, 47 — like stepping stones!"},

    {id:"n21",question:"What number comes after 99?",options:["98","100","90","999"],correctAnswer:"100",explanation:"After 99 comes 100! That's one hundred.",example:"99 + 1 = 100. A big milestone!"},

    {id:"n22",question:"What is 1 more than 76?",options:["75","77","86","67"],correctAnswer:"77",explanation:"1 more than 76 is 77. Just add 1!",example:"76 + 1 = 77."},

    {id:"n23",question:"What is 1 less than 30?",options:["31","20","29","39"],correctAnswer:"29",explanation:"1 less than 30 is 29.",example:"30 - 1 = 29."},
 
    // --- Number patterns ---

    {id:"n24",question:"What comes next? 2, 4, 6, 8, ___",options:["9","10","11","12"],correctAnswer:"10",explanation:"This is skip counting by 2. After 8 comes 10.",example:"2, 4, 6, 8, 10 — count by twos!"},

    {id:"n25",question:"What comes next? 5, 10, 15, 20, ___",options:["21","24","25","30"],correctAnswer:"25",explanation:"Skip counting by 5. After 20 comes 25.",example:"5, 10, 15, 20, 25 — count by fives!"},

    {id:"n26",question:"What comes next? 10, 20, 30, 40, ___",options:["41","45","50","60"],correctAnswer:"50",explanation:"Skip counting by 10. After 40 comes 50.",example:"10, 20, 30, 40, 50 — count by tens!"},

    {id:"n27",question:"Complete the pattern: 3, 6, 9, ___, 15",options:["10","11","12","13"],correctAnswer:"12",explanation:"Skip counting by 3: 3, 6, 9, 12, 15.",example:"Add 3 each time: 9 + 3 = 12."},

    {id:"n28",question:"What is the missing number? 22, 24, ___, 28, 30",options:["25","26","27","23"],correctAnswer:"26",explanation:"Count by 2: 22, 24, 26, 28, 30.",example:"24 + 2 = 26."},

    {id:"n29",question:"Complete: 45, 50, 55, ___",options:["56","58","60","65"],correctAnswer:"60",explanation:"Skip count by 5: 45, 50, 55, 60!",example:"Add 5 each time: 55 + 5 = 60."},
 
    // --- Odd and Even ---

    {id:"n30",question:"Which number is even?",options:["3","7","8","11"],correctAnswer:"8",explanation:"Even numbers can be split into 2 equal groups. 8 = 4 + 4.",example:"Even numbers end in 0, 2, 4, 6, or 8."},

    {id:"n31",question:"Which number is odd?",options:["4","6","10","5"],correctAnswer:"5",explanation:"Odd numbers cannot be split into 2 equal groups. 5 = 2 + 3 (not equal!).",example:"Odd numbers end in 1, 3, 5, 7, or 9."},

  ],
 
  // ═══════════════════════════════════════════════════════════════

  // TOPIC 2: ADDITION (within 20, then within 100 no regrouping)

  // ═══════════════════════════════════════════════════════════════

  addition: [

    // --- Addition within 10 ---

    {id:"a1",question:"3 + 4 = ?",options:["6","7","8","9"],correctAnswer:"7",explanation:"3 + 4 = 7. Count on from 3: four, five, six, seven!",example:"🖐️ Show 3 fingers, then 4 more = 7 fingers."},

    {id:"a2",question:"5 + 5 = ?",options:["8","9","10","11"],correctAnswer:"10",explanation:"5 + 5 = 10. Two hands together!",example:"✋✋ 5 fingers + 5 fingers = 10."},

    {id:"a3",question:"2 + 6 = ?",options:["6","7","8","9"],correctAnswer:"8",explanation:"2 + 6 = 8. Start at 6, count 2 more: 7, 8.",example:"Counting on is quick: 6… 7, 8!"},

    {id:"a4",question:"0 + 9 = ?",options:["0","1","8","9"],correctAnswer:"9",explanation:"Adding 0 means nothing changes. 0 + 9 = 9.",example:"If you have 0 sweets and get 9, you have 9."},

    {id:"a5",question:"7 + 3 = ?",options:["9","10","11","12"],correctAnswer:"10",explanation:"7 + 3 = 10. They are number bonds of 10!",example:"7 and 3 are best friends — together they make 10."},
 
    // --- Addition within 20 ---

    {id:"a6",question:"8 + 5 = ?",options:["12","13","14","15"],correctAnswer:"13",explanation:"8 + 5 = 13. Make 10 first: 8 + 2 = 10, then 3 more = 13.",example:"Break 5 into 2 + 3. Then 8 + 2 = 10, 10 + 3 = 13!"},

    {id:"a7",question:"9 + 6 = ?",options:["14","15","16","17"],correctAnswer:"15",explanation:"9 + 6 = 15. Make 10: 9 + 1 = 10, then 5 more = 15.",example:"Take 1 from 6 and give to 9: 10 + 5 = 15."},

    {id:"a8",question:"7 + 8 = ?",options:["13","14","15","16"],correctAnswer:"15",explanation:"7 + 8 = 15. Make 10: 7 + 3 = 10, then 5 more = 15.",example:"Or think: 8 + 7 → 8 + 2 = 10, plus 5 = 15."},

    {id:"a9",question:"6 + 6 = ?",options:["10","11","12","13"],correctAnswer:"12",explanation:"6 + 6 = 12. Double 6!",example:"Doubles are easy: 6 + 6 = 12, like 2 groups of 6."},

    {id:"a10",question:"9 + 9 = ?",options:["16","17","18","19"],correctAnswer:"18",explanation:"9 + 9 = 18. Double 9!",example:"Double 9: think of 10 + 10 = 20, minus 2 = 18."},

    {id:"a11",question:"4 + 9 = ?",options:["11","12","13","14"],correctAnswer:"13",explanation:"4 + 9 = 13. Give 1 from 4 to 9: 10 + 3 = 13.",example:"Making tens: 9 + 1 = 10, plus 3 left = 13."},

    {id:"a12",question:"8 + 8 = ?",options:["14","15","16","17"],correctAnswer:"16",explanation:"8 + 8 = 16. Double 8!",example:"Think: 8 + 8 is the same as 10 + 6 = 16."},

    {id:"a13",question:"7 + 4 = ?",options:["10","11","12","13"],correctAnswer:"11",explanation:"7 + 4 = 11. Add 3 to make 10, then 1 more.",example:"7 + 3 = 10, then + 1 = 11."},

    {id:"a14",question:"5 + 8 = ?",options:["12","13","14","15"],correctAnswer:"13",explanation:"5 + 8 = 13. Think: 8 + 2 = 10, plus 3 = 13.",example:"Start from the bigger number (8) and count up 5."},

    {id:"a15",question:"6 + 9 = ?",options:["14","15","16","17"],correctAnswer:"15",explanation:"6 + 9 = 15. Make 10: 9 + 1 = 10, plus 5 = 15.",example:"Give 1 from 6 to 9 → 10 + 5 = 15."},
 
    // --- Addition within 100 (no regrouping) ---

    {id:"a16",question:"23 + 14 = ?",options:["33","36","37","41"],correctAnswer:"37",explanation:"Add tens: 20 + 10 = 30. Add ones: 3 + 4 = 7. Total: 37.",example:"Tens together, ones together: 30 + 7 = 37."},

    {id:"a17",question:"45 + 32 = ?",options:["67","72","77","87"],correctAnswer:"77",explanation:"40 + 30 = 70. 5 + 2 = 7. Total: 77.",example:"Add tens first, then ones: 70 + 7 = 77."},

    {id:"a18",question:"51 + 26 = ?",options:["67","71","76","77"],correctAnswer:"77",explanation:"50 + 20 = 70. 1 + 6 = 7. Total: 77.",example:"Separate tens and ones, then combine."},

    {id:"a19",question:"30 + 40 = ?",options:["34","60","70","80"],correctAnswer:"70",explanation:"3 tens + 4 tens = 7 tens = 70.",example:"Just add the tens: 30 + 40 = 70."},

    {id:"a20",question:"62 + 25 = ?",options:["77","82","85","87"],correctAnswer:"87",explanation:"60 + 20 = 80. 2 + 5 = 7. Total: 87.",example:"Keep tens and ones separate, then put together."},

    {id:"a21",question:"What is 10 more than 53?",options:["43","54","63","73"],correctAnswer:"63",explanation:"10 more means add 10. 53 + 10 = 63.",example:"Just change the tens digit: 53 → 63."},

    {id:"a22",question:"What is 10 more than 87?",options:["77","88","97","107"],correctAnswer:"97",explanation:"87 + 10 = 97. Add 1 to the tens place.",example:"The tens digit goes up by 1: 87 → 97."},

  ],
 
  // ═══════════════════════════════════════════════════════════════

  // TOPIC 3: SUBTRACTION (within 20, then within 100)

  // ═══════════════════════════════════════════════════════════════

  subtraction: [

    // --- Within 10 ---

    {id:"s1",question:"8 - 3 = ?",options:["4","5","6","7"],correctAnswer:"5",explanation:"8 - 3 = 5. Take 3 away from 8.",example:"Hold up 8 fingers, put 3 down = 5 left."},

    {id:"s2",question:"10 - 4 = ?",options:["4","5","6","7"],correctAnswer:"6",explanation:"10 - 4 = 6. Start at 10, count back 4.",example:"10, 9, 8, 7, 6. The answer is 6!"},

    {id:"s3",question:"7 - 7 = ?",options:["0","1","7","14"],correctAnswer:"0",explanation:"7 - 7 = 0. Take everything away = nothing left!",example:"If you have 7 apples and eat all 7, you have 0."},

    {id:"s4",question:"9 - 0 = ?",options:["0","1","8","9"],correctAnswer:"9",explanation:"Subtracting 0 means nothing is taken away. 9 stays!",example:"If you have 9 toys and lose 0, you still have 9."},

    {id:"s5",question:"6 - 2 = ?",options:["3","4","5","6"],correctAnswer:"4",explanation:"6 - 2 = 4. Count back: 6, 5, 4.",example:"6 birds on a tree, 2 fly away → 4 left."},
 
    // --- Within 20 ---

    {id:"s6",question:"15 - 8 = ?",options:["5","6","7","8"],correctAnswer:"7",explanation:"15 - 8 = 7. Subtract 5 first (15-5=10), then 3 more (10-3=7).",example:"Break 8 into 5 + 3. Then 15 - 5 = 10, 10 - 3 = 7."},

    {id:"s7",question:"13 - 6 = ?",options:["6","7","8","9"],correctAnswer:"7",explanation:"13 - 6 = 7. Subtract 3 first (13-3=10), then 3 more (10-3=7).",example:"13 - 3 = 10, 10 - 3 = 7. Use tens!"},

    {id:"s8",question:"16 - 9 = ?",options:["5","6","7","8"],correctAnswer:"7",explanation:"16 - 9 = 7. Think: 9 + ? = 16. 9 + 7 = 16!",example:"Or subtract 6 first: 16 - 6 = 10, then - 3 = 7."},

    {id:"s9",question:"18 - 9 = ?",options:["7","8","9","10"],correctAnswer:"9",explanation:"18 - 9 = 9. Half of 18!",example:"Doubles fact: 9 + 9 = 18, so 18 - 9 = 9."},

    {id:"s10",question:"14 - 7 = ?",options:["5","6","7","8"],correctAnswer:"7",explanation:"14 - 7 = 7. Double fact: 7 + 7 = 14!",example:"If 7 + 7 = 14, then 14 - 7 must be 7."},

    {id:"s11",question:"11 - 5 = ?",options:["4","5","6","7"],correctAnswer:"6",explanation:"11 - 5 = 6. Go to 10 first: 11 - 1 = 10, then 10 - 4 = 6.",example:"Or count up from 5: 5, 6, 7, 8, 9, 10, 11 — that's 6 jumps!"},

    {id:"s12",question:"20 - 8 = ?",options:["10","11","12","13"],correctAnswer:"12",explanation:"20 - 8 = 12. Take 8 away from 20.",example:"20 is 2 tens. Take 8 from one ten: 10 - 8 = 2, plus the other 10 = 12."},

    {id:"s13",question:"17 - 9 = ?",options:["6","7","8","9"],correctAnswer:"8",explanation:"17 - 9 = 8. Think: 9 + 8 = 17!",example:"Subtract 7: 17 - 7 = 10, then - 2 = 8."},
 
    // --- Within 100 (no regrouping) ---

    {id:"s14",question:"56 - 23 = ?",options:["23","33","35","43"],correctAnswer:"33",explanation:"50 - 20 = 30. 6 - 3 = 3. Total: 33.",example:"Subtract tens from tens, ones from ones."},

    {id:"s15",question:"89 - 45 = ?",options:["34","44","54","64"],correctAnswer:"44",explanation:"80 - 40 = 40. 9 - 5 = 4. Total: 44.",example:"Tens: 8 - 4 = 4 tens. Ones: 9 - 5 = 4 ones. Answer: 44."},

    {id:"s16",question:"77 - 34 = ?",options:["33","41","43","47"],correctAnswer:"43",explanation:"70 - 30 = 40. 7 - 4 = 3. Total: 43.",example:"Subtract each place separately."},

    {id:"s17",question:"98 - 56 = ?",options:["32","42","44","52"],correctAnswer:"42",explanation:"90 - 50 = 40. 8 - 6 = 2. Total: 42.",example:"Take away tens, then take away ones."},

    {id:"s18",question:"What is 10 less than 65?",options:["45","55","64","75"],correctAnswer:"55",explanation:"10 less means subtract 10. 65 - 10 = 55.",example:"The tens digit goes down by 1: 65 → 55."},

    {id:"s19",question:"What is 10 less than 40?",options:["30","39","41","50"],correctAnswer:"30",explanation:"40 - 10 = 30.",example:"4 tens minus 1 ten = 3 tens = 30."},

  ],
 
  // ═══════════════════════════════════════════════════════════════

  // TOPIC 4: NUMBER BONDS

  // (parts and whole — critical for Singapore Math)

  // ═══════════════════════════════════════════════════════════════

  numberBonds: [

    {id:"nb1",question:"What are the number bonds of 10? 7 + ___ = 10",options:["2","3","4","5"],correctAnswer:"3",explanation:"7 + 3 = 10. Seven and three are number bonds of 10!",example:"Think: what goes with 7 to make 10? It's 3."},

    {id:"nb2",question:"6 + ___ = 10",options:["3","4","5","6"],correctAnswer:"4",explanation:"6 + 4 = 10. Six and four make ten!",example:"Hold up 6 fingers. How many more to make 10? Count: 4!"},

    {id:"nb3",question:"___ + 2 = 10",options:["6","7","8","9"],correctAnswer:"8",explanation:"8 + 2 = 10. Eight needs 2 more to make 10.",example:"Think: 10 - 2 = 8. So 8 + 2 = 10."},

    {id:"nb4",question:"5 + ___ = 10",options:["3","4","5","6"],correctAnswer:"5",explanation:"5 + 5 = 10. Five and five — two equal parts!",example:"Both hands: 5 + 5 = 10 fingers."},

    {id:"nb5",question:"___ + 9 = 10",options:["0","1","2","3"],correctAnswer:"1",explanation:"1 + 9 = 10. Nine only needs 1 more!",example:"9 is so close to 10, just add 1."},

    {id:"nb6",question:"What are the two parts of 8? 3 + ___ = 8",options:["4","5","6","7"],correctAnswer:"5",explanation:"3 + 5 = 8. Three and five make eight.",example:"The number bond: 8 can be split into 3 and 5."},

    {id:"nb7",question:"___ + 4 = 7",options:["2","3","4","5"],correctAnswer:"3",explanation:"3 + 4 = 7. The missing part is 3!",example:"Think: 7 - 4 = 3. So 3 + 4 = 7."},

    {id:"nb8",question:"9 + ___ = 15",options:["5","6","7","8"],correctAnswer:"6",explanation:"9 + 6 = 15. The missing number is 6.",example:"What plus 9 makes 15? Count up from 9: 10, 11, 12, 13, 14, 15 = 6 jumps."},

    {id:"nb9",question:"___ + 7 = 12",options:["4","5","6","7"],correctAnswer:"5",explanation:"5 + 7 = 12. Five is the missing part.",example:"12 - 7 = 5. So 5 + 7 = 12."},

    {id:"nb10",question:"8 + ___ = 14",options:["4","5","6","7"],correctAnswer:"6",explanation:"8 + 6 = 14. Six is the missing addend.",example:"14 - 8 = 6. Check: 8 + 6 = 14 ✓"},

    {id:"nb11",question:"Which pair makes 10?",options:["4 and 5","3 and 8","6 and 4","2 and 9"],correctAnswer:"6 and 4",explanation:"6 + 4 = 10. They are a number bond of 10!",example:"Number bonds of 10: 1+9, 2+8, 3+7, 4+6, 5+5."},

    {id:"nb12",question:"14 = 8 + ___",options:["4","5","6","7"],correctAnswer:"6",explanation:"14 = 8 + 6. Break 14 into 8 and 6.",example:"Think subtraction: 14 - 8 = 6."},

    {id:"nb13",question:"Which makes 20? 13 + ___",options:["5","6","7","8"],correctAnswer:"7",explanation:"13 + 7 = 20.",example:"What does 13 need to reach 20? Count up: 7!"},

    {id:"nb14",question:"11 = ___ + 6",options:["4","5","6","7"],correctAnswer:"5",explanation:"5 + 6 = 11.",example:"11 - 6 = 5. So 11 = 5 + 6."},

    {id:"nb15",question:"___ + 8 = 16",options:["6","7","8","9"],correctAnswer:"8",explanation:"8 + 8 = 16. It's a double!",example:"Double 8: 8 + 8 = 16."},

  ],
 
  // ═══════════════════════════════════════════════════════════════

  // TOPIC 5: SHAPES & PATTERNS

  // ═══════════════════════════════════════════════════════════════

  shapesAndPatterns: [

    // --- 2D shapes ---

    {id:"sp1",question:"How many sides does a triangle have?",options:["2","3","4","5"],correctAnswer:"3",explanation:"A triangle has 3 sides. 'Tri' means three!",example:"Think: a slice of pizza is shaped like a triangle — 3 straight edges."},

    {id:"sp2",question:"How many sides does a square have?",options:["3","4","5","6"],correctAnswer:"4",explanation:"A square has 4 sides, all the same length.",example:"A window pane, a cracker, a tile — all squares with 4 equal sides."},

    {id:"sp3",question:"How many corners does a rectangle have?",options:["2","3","4","5"],correctAnswer:"4",explanation:"A rectangle has 4 corners (also called vertices).",example:"Think of a book or a door — they have 4 corners."},

    {id:"sp4",question:"Which shape has NO sides and NO corners?",options:["Triangle","Square","Circle","Rectangle"],correctAnswer:"Circle",explanation:"A circle is perfectly round — no straight sides, no corners!",example:"A coin, a clock face, a pizza — all circles."},

    {id:"sp5",question:"A shape has 4 sides but they are NOT all equal. It is a ___.",options:["Square","Triangle","Circle","Rectangle"],correctAnswer:"Rectangle",explanation:"A rectangle has 4 sides but opposite sides are equal, not all 4.",example:"A rectangle is like a stretched square — longer on two sides."},

    {id:"sp6",question:"How many sides does a hexagon have?",options:["4","5","6","7"],correctAnswer:"6",explanation:"A hexagon has 6 sides. 'Hex' means six!",example:"A honeycomb cell is a hexagon — bees love this shape!"},

    {id:"sp7",question:"Which shape has 5 sides?",options:["Square","Pentagon","Hexagon","Octagon"],correctAnswer:"Pentagon",explanation:"A pentagon has 5 sides. 'Penta' means five.",example:"Think of a star's outline — the outside makes a pentagon shape."},
 
    // --- 3D shapes ---

    {id:"sp8",question:"A ball is shaped like a ___.",options:["Circle","Sphere","Cube","Cylinder"],correctAnswer:"Sphere",explanation:"A ball is a sphere — round in all directions, not flat.",example:"A football, marble, orange — all spheres! A circle is flat."},

    {id:"sp9",question:"A dice/box is shaped like a ___.",options:["Sphere","Cone","Cube","Cylinder"],correctAnswer:"Cube",explanation:"A cube has 6 square faces, all the same size.",example:"A dice, a Rubik's cube, a sugar cube — all cubes."},

    {id:"sp10",question:"An ice cream cone is shaped like a ___.",options:["Sphere","Cone","Cube","Cylinder"],correctAnswer:"Cone",explanation:"A cone has a circle at the bottom and a point at the top.",example:"Party hats and traffic cones are cone-shaped!"},

    {id:"sp11",question:"A can of drink is shaped like a ___.",options:["Sphere","Cone","Cube","Cylinder"],correctAnswer:"Cylinder",explanation:"A cylinder has 2 circles (top & bottom) and a curved side.",example:"Tin cans, cups, log shapes — all cylinders!"},

    {id:"sp12",question:"How many faces does a cube have?",options:["4","5","6","8"],correctAnswer:"6",explanation:"A cube has 6 faces — top, bottom, front, back, left, right.",example:"Count the faces of a dice: 1, 2, 3, 4, 5, 6 dots = 6 faces!"},
 
    // --- Patterns ---

    {id:"sp13",question:"What comes next? 🔴🔵🔴🔵🔴___",options:["🔴","🔵","🟢","🟡"],correctAnswer:"🔵",explanation:"The pattern repeats: red, blue, red, blue. Next is blue!",example:"AB AB AB — it keeps repeating."},

    {id:"sp14",question:"What comes next? △○□△○□△___",options:["△","○","□","★"],correctAnswer:"○",explanation:"The pattern is triangle, circle, square (repeats). After △ comes ○.",example:"ABC ABC ABC — the pattern repeats every 3."},

    {id:"sp15",question:"What comes next? 🟡🟡🔴🟡🟡🔴🟡🟡___",options:["🟡","🔴","🔵","🟢"],correctAnswer:"🔴",explanation:"Pattern: yellow, yellow, red (AAB). After 2 yellows comes red!",example:"AAB AAB AAB — every third one is red."},

    {id:"sp16",question:"Complete: 1, 4, 7, 10, ___",options:["11","12","13","14"],correctAnswer:"13",explanation:"Add 3 each time: 1, 4, 7, 10, 13.",example:"The rule is +3: 10 + 3 = 13."},

    {id:"sp17",question:"Which does NOT belong? 🔺🔺🔺⭕",options:["First shape","Second shape","Third shape","Fourth shape"],correctAnswer:"Fourth shape",explanation:"The circle (⭕) doesn't belong — all others are triangles!",example:"3 triangles and 1 circle — the circle is the odd one out."},

    {id:"sp18",question:"How many triangles? △□△△□△△□",options:["3","4","5","6"],correctAnswer:"5",explanation:"Count only the triangles: there are 5 triangles.",example:"Skip the squares, count triangles: 1, 2, 3, 4, 5!"},

  ],

 
  // ═══════════════════════════════════════════════════════════════

  // TOPIC 6: MEASUREMENT (Length & Mass)

  // ═══════════════════════════════════════════════════════════════

  measurement: [

    // --- Length (comparison) ---

    {id:"m1",question:"Which is LONGER: a pencil or a bus?",options:["Pencil","Bus","Same","Cannot tell"],correctAnswer:"Bus",explanation:"A bus is much longer than a pencil. Buses are many metres long!",example:"A pencil is about 18 cm. A bus is about 12 metres!"},

    {id:"m2",question:"Which is SHORTER: your thumb or your arm?",options:["Thumb","Arm","Same","Cannot tell"],correctAnswer:"Thumb",explanation:"Your thumb is much shorter than your arm.",example:"Your thumb is about 5 cm, but your arm is about 50 cm!"},

    {id:"m3",question:"Which is the TALLEST?",options:["A cat","A man","A tree","A chair"],correctAnswer:"A tree",explanation:"Trees are taller than people, and people are taller than cats and chairs.",example:"A tree can be 10-20 metres tall!"},

    {id:"m4",question:"About how many paper clips long is a crayon?",options:["2","5","10","20"],correctAnswer:"5",explanation:"A crayon is about 5 paper clips long (about 9 cm).",example:"Line up paper clips next to a crayon — about 5 will fit!"},

    {id:"m5",question:"Your book is about ___ hand-spans long.",options:["1","2","5","10"],correctAnswer:"2",explanation:"A typical school book is about 2 hand-spans long.",example:"Place your hand on the book and see how many times it fits!"},
 
    // --- Mass (comparison) ---

    {id:"m6",question:"Which is HEAVIER: a watermelon or an apple?",options:["Apple","Watermelon","Same","Cannot tell"],correctAnswer:"Watermelon",explanation:"A watermelon is much heavier than an apple.",example:"Hold one in each hand — the watermelon weighs much more!"},

    {id:"m7",question:"Which is LIGHTER: a feather or a book?",options:["Feather","Book","Same","Cannot tell"],correctAnswer:"Feather",explanation:"A feather is very light — much lighter than a book.",example:"A feather floats down slowly because it's so light!"},

    {id:"m8",question:"Which is the heaviest?",options:["A pencil","A chair","A paper clip","A rubber band"],correctAnswer:"A chair",explanation:"A chair is much heavier than all the other small items.",example:"You can hold a pencil easily, but you need two hands for a chair!"},

    {id:"m9",question:"If a book balances 5 erasers on a scale, how heavy is the book?",options:["1 eraser","5 erasers","10 erasers","50 erasers"],correctAnswer:"5 erasers",explanation:"If they balance, they weigh the same: the book = 5 erasers.",example:"When a balance is level, both sides weigh the same!"},

    {id:"m10",question:"A bag of rice is heavier than a bag of cotton. Which needs more strength to carry?",options:["Rice","Cotton","Same","Cannot tell"],correctAnswer:"Rice",explanation:"Heavier things need more strength to carry!",example:"Rice is heavy because it's dense. Cotton is fluffy and light."},

  ],
 
  // ═══════════════════════════════════════════════════════════════

  // TOPIC 7: TIME

  // (hours, half-hours, days of the week, months)

  // ═══════════════════════════════════════════════════════════════

  time: [

    // --- Reading clocks ---

    {id:"t1",question:"The short hand points to 3 and the long hand points to 12. What time is it?",options:["12 o'clock","3 o'clock","6 o'clock","9 o'clock"],correctAnswer:"3 o'clock",explanation:"When the long hand is at 12 and short hand at 3, it's 3 o'clock.",example:"The short hand tells the hour. Pointing at 3 = 3 o'clock!"},

    {id:"t2",question:"The short hand points to 7 and the long hand points to 12. What time is it?",options:["12 o'clock","5 o'clock","7 o'clock","9 o'clock"],correctAnswer:"7 o'clock",explanation:"Long hand at 12, short hand at 7 = 7 o'clock.",example:"This is when many children have dinner!"},

    {id:"t3",question:"The short hand is between 4 and 5, and the long hand points to 6. What time is it?",options:["4 o'clock","5 o'clock","Half past 4","Half past 6"],correctAnswer:"Half past 4",explanation:"Long hand at 6 means 'half past'. Short hand between 4 and 5 = half past 4.",example:"Half past means 30 minutes past the hour. 4:30!"},

    {id:"t4",question:"What time do most children wake up for school?",options:["12 o'clock","3 o'clock","7 o'clock","10 o'clock"],correctAnswer:"7 o'clock",explanation:"Most children wake up around 7 o'clock for school!",example:"7 AM is a common time to get ready for school in Singapore."},

    {id:"t5",question:"Which is later: 2 o'clock or 5 o'clock?",options:["2 o'clock","5 o'clock","Same time","Cannot tell"],correctAnswer:"5 o'clock",explanation:"5 o'clock comes after 2 o'clock, so it's later.",example:"Time moves forward: 2, 3, 4, 5. Five is later."},

    {id:"t6",question:"How many hours are there in one day?",options:["12","20","24","30"],correctAnswer:"24",explanation:"One full day has 24 hours (12 hours daytime + 12 hours nighttime).",example:"The clock goes around twice: 12 + 12 = 24 hours in a day."},
 
    // --- Days of the week ---

    {id:"t7",question:"How many days are in one week?",options:["5","6","7","10"],correctAnswer:"7",explanation:"One week has 7 days.",example:"Mon, Tue, Wed, Thu, Fri, Sat, Sun = 7 days."},

    {id:"t8",question:"What day comes after Wednesday?",options:["Tuesday","Thursday","Friday","Monday"],correctAnswer:"Thursday",explanation:"The days go: Monday, Tuesday, Wednesday, Thursday...",example:"Wed → Thu. Think: W-Th, like 'with'."},

    {id:"t9",question:"What day comes before Saturday?",options:["Sunday","Monday","Friday","Thursday"],correctAnswer:"Friday",explanation:"Friday comes just before Saturday.",example:"The weekend starts after Friday!"},

    {id:"t10",question:"If today is Monday, what day is it tomorrow?",options:["Sunday","Tuesday","Wednesday","Saturday"],correctAnswer:"Tuesday",explanation:"The day after Monday is Tuesday.",example:"Mon → Tue → Wed → Thu → Fri → Sat → Sun."},
 
    // --- Months ---

    {id:"t11",question:"How many months are in one year?",options:["7","10","12","24"],correctAnswer:"12",explanation:"One year has 12 months.",example:"Jan, Feb, Mar, Apr, May, Jun, Jul, Aug, Sep, Oct, Nov, Dec = 12!"},

    {id:"t12",question:"Which month comes after March?",options:["February","April","May","June"],correctAnswer:"April",explanation:"After March comes April.",example:"March, April, May — spring months!"},

    {id:"t13",question:"Which is the first month of the year?",options:["March","December","January","June"],correctAnswer:"January",explanation:"January is month number 1 — the start of a new year!",example:"New Year's Day is on 1 January."},

    {id:"t14",question:"Which month comes before December?",options:["January","October","November","September"],correctAnswer:"November",explanation:"November comes right before December.",example:"November is month 11, December is month 12."},

    {id:"t15",question:"If today is a Saturday, what day was yesterday?",options:["Sunday","Friday","Thursday","Monday"],correctAnswer:"Friday",explanation:"The day before Saturday is Friday.",example:"Yesterday means one day back: Sat → Fri."},

  ],
 
  // ═══════════════════════════════════════════════════════════════

  // TOPIC 8: MONEY (Singapore dollars & cents)

  // ═══════════════════════════════════════════════════════════════

  money: [

    {id:"mo1",question:"How many cents are in $1 (one dollar)?",options:["10 cents","50 cents","100 cents","200 cents"],correctAnswer:"100 cents",explanation:"$1 = 100 cents. One dollar equals one hundred cents!",example:"100 one-cent coins make exactly $1."},

    {id:"mo2",question:"Which coin is worth MORE: 20¢ or 50¢?",options:["20¢","50¢","Same","Cannot tell"],correctAnswer:"50¢",explanation:"50 cents is more than 20 cents.",example:"50¢ can buy more things than 20¢."},

    {id:"mo3",question:"You have two 50¢ coins. How much money do you have?",options:["50¢","$1","$1.50","$2"],correctAnswer:"$1",explanation:"50¢ + 50¢ = 100¢ = $1.",example:"Two fifty-cent coins make exactly one dollar!"},

    {id:"mo4",question:"A rubber costs 30¢. You pay with 50¢. What is your change?",options:["10¢","20¢","30¢","50¢"],correctAnswer:"20¢",explanation:"Change = 50¢ - 30¢ = 20¢.",example:"You pay more than the price, so you get coins back!"},

    {id:"mo5",question:"A pencil costs 40¢ and an eraser costs 20¢. How much for both?",options:["20¢","40¢","60¢","80¢"],correctAnswer:"60¢",explanation:"40¢ + 20¢ = 60¢.",example:"Add the two prices together to find the total."},

    {id:"mo6",question:"You have $1. A drink costs 70¢. How much change?",options:["20¢","30¢","40¢","70¢"],correctAnswer:"30¢",explanation:"$1 = 100¢. Change = 100¢ - 70¢ = 30¢.",example:"100 - 70 = 30. You get 30 cents back!"},

    {id:"mo7",question:"Which set of coins makes 50¢?",options:["5 × 10¢","3 × 10¢","2 × 10¢","4 × 10¢"],correctAnswer:"5 × 10¢",explanation:"5 ten-cent coins = 5 × 10 = 50 cents.",example:"Count by tens: 10, 20, 30, 40, 50!"},

    {id:"mo8",question:"A book costs $2. You have $5. How much change will you get?",options:["$2","$3","$5","$7"],correctAnswer:"$3",explanation:"$5 - $2 = $3 change.",example:"Give $5, the book is $2, you get $3 back."},

    {id:"mo9",question:"Sam has $1 and buys a snack for 45¢. How much is left?",options:["45¢","55¢","65¢","$1"],correctAnswer:"55¢",explanation:"$1 = 100¢. 100¢ - 45¢ = 55¢ left.",example:"100 - 45 = 55. Sam still has 55 cents."},

    {id:"mo10",question:"Three 20¢ coins = ___",options:["40¢","50¢","60¢","80¢"],correctAnswer:"60¢",explanation:"3 × 20¢ = 60¢.",example:"Count by twenties: 20, 40, 60!"},

    {id:"mo11",question:"A toy car costs $4 and a toy plane costs $5. How much for both?",options:["$7","$8","$9","$10"],correctAnswer:"$9",explanation:"$4 + $5 = $9.",example:"$4 + $5 = $9 altogether."},

    {id:"mo12",question:"You save 10¢ every day for a week (7 days). How much do you save?",options:["50¢","60¢","70¢","80¢"],correctAnswer:"70¢",explanation:"7 × 10¢ = 70¢.",example:"Day 1: 10¢, Day 2: 20¢, ... Day 7: 70¢!"},

  ],
 
  // ═══════════════════════════════════════════════════════════════

  // TOPIC 9: WORD PROBLEMS (multi-step, comparison, real-life)

  // ═══════════════════════════════════════════════════════════════

  wordProblems: [

    // --- Adding & subtracting stories ---

    {id:"w1",question:"Tom has 8 marbles. He wins 5 more. How many marbles does he have now?",options:["11","12","13","14"],correctAnswer:"13",explanation:"8 + 5 = 13. Tom now has more marbles!",example:"Started with 8, got 5 more: 8 + 5 = 13."},

    {id:"w2",question:"Sara had 15 stickers. She gave 7 to her friend. How many does she have left?",options:["6","7","8","9"],correctAnswer:"8",explanation:"15 - 7 = 8. Sara shared her stickers.",example:"15 stickers take away 7 = 8 left."},

    {id:"w3",question:"A bus has 12 passengers. 5 get off at the next stop. How many are still on the bus?",options:["5","6","7","8"],correctAnswer:"7",explanation:"12 - 5 = 7 passengers remaining.",example:"12 people minus 5 who left = 7 still riding."},

    {id:"w4",question:"There are 9 boys and 8 girls in a class. How many children altogether?",options:["15","16","17","18"],correctAnswer:"17",explanation:"9 + 8 = 17 children in the class.",example:"Count all students: boys + girls = 17."},

    {id:"w5",question:"Ali had 20 crayons. He lost 6. How many does he have now?",options:["12","13","14","15"],correctAnswer:"14",explanation:"20 - 6 = 14. Ali still has plenty of crayons.",example:"20 take away 6 = 14 crayons left."},
 
    // --- Comparison word problems ---

    {id:"w6",question:"Mei has 9 sweets. Jun has 5 sweets. How many MORE sweets does Mei have?",options:["3","4","5","14"],correctAnswer:"4",explanation:"9 - 5 = 4. Mei has 4 more than Jun.",example:"Compare by subtracting: 9 - 5 = 4 more."},

    {id:"w7",question:"A red ribbon is 12 cm. A blue ribbon is 8 cm. How much LONGER is the red ribbon?",options:["3 cm","4 cm","5 cm","6 cm"],correctAnswer:"4 cm",explanation:"12 - 8 = 4. The red ribbon is 4 cm longer.",example:"Find the difference: 12 - 8 = 4 cm."},

    {id:"w8",question:"Ben has 6 books. Kai has 3 more books than Ben. How many books does Kai have?",options:["3","6","9","12"],correctAnswer:"9",explanation:"6 + 3 = 9. Kai has 3 more than Ben's 6.",example:"'More than' means add: 6 + 3 = 9 books for Kai."},

    {id:"w9",question:"Lily is 7 years old. Her brother is 4 years younger. How old is her brother?",options:["3","4","5","11"],correctAnswer:"3",explanation:"7 - 4 = 3. Her brother is 3 years old.",example:"'Younger' means subtract: 7 - 4 = 3 years old."},

    {id:"w10",question:"Siti picked 11 flowers. Ravi picked 7 flowers. How many FEWER flowers did Ravi pick?",options:["3","4","5","18"],correctAnswer:"4",explanation:"11 - 7 = 4. Ravi picked 4 fewer flowers.",example:"Fewer = difference: 11 - 7 = 4."},
 
    // --- Multi-step / combining operations ---

    {id:"w11",question:"There are 5 red apples, 3 green apples, and 4 yellow apples. How many apples in total?",options:["8","10","12","14"],correctAnswer:"12",explanation:"5 + 3 + 4 = 12. Add all three groups!",example:"5 + 3 = 8, then 8 + 4 = 12 apples."},

    {id:"w12",question:"Mom baked 16 cookies. The family ate 9 in the morning. How many are left for the afternoon?",options:["5","6","7","8"],correctAnswer:"7",explanation:"16 - 9 = 7 cookies left for later.",example:"16 cookies, eat 9 = 7 saved for afternoon tea!"},

    {id:"w13",question:"A farmer has 8 ducks and 6 chickens. 3 ducks run away. How many animals are left?",options:["9","10","11","12"],correctAnswer:"11",explanation:"Total first: 8 + 6 = 14. Then 14 - 3 = 11.",example:"14 animals minus 3 that ran away = 11 left."},

    {id:"w14",question:"You have 10 red beads and 10 blue beads. You give away 4 blue beads. How many beads left?",options:["14","16","18","20"],correctAnswer:"16",explanation:"10 + 10 = 20 total. 20 - 4 = 16 left.",example:"20 beads, give 4 away = 16 remaining."},

    {id:"w15",question:"A box has 18 pencils. 6 are red and the rest are blue. How many are blue?",options:["10","11","12","13"],correctAnswer:"12",explanation:"18 - 6 = 12 blue pencils.",example:"Total minus red = blue: 18 - 6 = 12."},
 
    // --- Money word problems ---

    {id:"w16",question:"A ruler costs 50¢ and a pencil costs 30¢. How much for both?",options:["60¢","70¢","80¢","90¢"],correctAnswer:"80¢",explanation:"50¢ + 30¢ = 80¢.",example:"Add both prices: 50 + 30 = 80 cents."},

    {id:"w17",question:"David has $1. He buys a drink for 60¢. How much change does he get?",options:["30¢","40¢","50¢","60¢"],correctAnswer:"40¢",explanation:"$1 = 100¢. 100¢ - 60¢ = 40¢.",example:"He pays 100 cents, the drink costs 60, change = 40 cents."},

    {id:"w18",question:"Emma saves 20¢ each day. How much will she have after 5 days?",options:["60¢","80¢","$1","$1.20"],correctAnswer:"$1",explanation:"5 × 20¢ = 100¢ = $1.",example:"20, 40, 60, 80, 100 — that's $1 after 5 days!"},
 
    // --- Time word problems ---

    {id:"w19",question:"School starts at 8 o'clock and ends at 2 o'clock. How many hours is the school day?",options:["4 hours","5 hours","6 hours","7 hours"],correctAnswer:"6 hours",explanation:"From 8 to 2: count 8→9→10→11→12→1→2 = 6 hours.",example:"Count on your fingers: 9, 10, 11, 12, 1, 2 = 6 hours."},

    {id:"w20",question:"Mei wakes up at 7 o'clock. She takes 1 hour to get ready. What time does she leave home?",options:["7 o'clock","8 o'clock","9 o'clock","6 o'clock"],correctAnswer:"8 o'clock",explanation:"7 o'clock + 1 hour = 8 o'clock.",example:"One hour after 7 is 8. She leaves at 8!"},
 
    // --- Measurement word problems ---

    {id:"w21",question:"A stick is 12 paper clips long. Another is 8 paper clips long. How much longer is the first?",options:["3","4","5","6"],correctAnswer:"4",explanation:"12 - 8 = 4 paper clips longer.",example:"Find the difference: the first stick is 4 paper clips longer."},

    {id:"w22",question:"Ravi's bag has 3 books (heavy) and 1 pencil case (light). Mei's bag has 5 books. Whose bag is heavier?",options:["Ravi's","Mei's","Same","Cannot tell"],correctAnswer:"Mei's",explanation:"5 books is heavier than 3 books + a light pencil case.",example:"More books = heavier bag. Mei has 5 books vs Ravi's 3."},
 
    // --- Pattern / logic word problems ---

    {id:"w23",question:"On Monday Ali reads 2 pages. Each day he reads 2 more pages than the day before. How many pages on Wednesday?",options:["4","5","6","8"],correctAnswer:"6",explanation:"Mon: 2, Tue: 4, Wed: 6. Each day +2 more.",example:"2, 4, 6 — the pattern increases by 2."},

    {id:"w24",question:"Every 2nd seat in a row is red. The rest are blue. In a row of 10 seats, how many are red?",options:["3","4","5","6"],correctAnswer:"5",explanation:"Seats 2, 4, 6, 8, 10 are red = 5 red seats.",example:"Count the even positions: 2, 4, 6, 8, 10 = 5."},

    {id:"w25",question:"A group of children stands in a line. Tom is 4th from the front and 6th from the back. How many children are in the line?",options:["7","8","9","10"],correctAnswer:"9",explanation:"4 + 6 - 1 = 9 (subtract 1 because Tom is counted twice).",example:"Count: 3 in front of Tom + Tom + 5 behind Tom = 9."},

  ],
 
  // ═══════════════════════════════════════════════════════════════

  // TOPIC 10: PICTURE GRAPHS & DATA

  // ═══════════════════════════════════════════════════════════════

  pictureGraphs: [

    {id:"pg1",question:"🍎🍎🍎🍎 🍊🍊🍊 🍇🍇🍇🍇🍇 — Which fruit has the MOST?",options:["Apple","Orange","Grape","Same"],correctAnswer:"Grape",explanation:"Count: Apples=4, Oranges=3, Grapes=5. Grapes have the most!",example:"5 > 4 > 3. Grapes win!"},

    {id:"pg2",question:"🍎🍎🍎🍎 🍊🍊🍊 🍇🍇🍇🍇🍇 — How many fruits in total?",options:["10","11","12","13"],correctAnswer:"12",explanation:"4 + 3 + 5 = 12 fruits altogether.",example:"Add all groups: 4 apples + 3 oranges + 5 grapes = 12."},

    {id:"pg3",question:"🍎🍎🍎🍎 🍊🍊🍊 🍇🍇🍇🍇🍇 — How many MORE grapes than oranges?",options:["1","2","3","4"],correctAnswer:"2",explanation:"Grapes: 5, Oranges: 3. Difference: 5 - 3 = 2.",example:"Grapes have 2 more than oranges."},

    {id:"pg4",question:"Boys who like football: ⚽⚽⚽⚽⚽⚽. Girls: ⚽⚽⚽⚽. How many children like football?",options:["4","6","8","10"],correctAnswer:"10",explanation:"6 boys + 4 girls = 10 children like football.",example:"Add boys and girls: 6 + 4 = 10."},

    {id:"pg5",question:"Sunny days: ☀️☀️☀️☀️☀️. Rainy days: 🌧️🌧️🌧️. Cloudy days: ☁️☁️. How many days counted?",options:["8","9","10","12"],correctAnswer:"10",explanation:"5 + 3 + 2 = 10 days recorded.",example:"Sunny 5 + Rainy 3 + Cloudy 2 = 10 days."},

    {id:"pg6",question:"Sunny days: ☀️☀️☀️☀️☀️. Rainy days: 🌧️🌧️🌧️. Which type of weather happened LEAST?",options:["Sunny","Rainy","Cloudy","Same"],correctAnswer:"Cloudy",explanation:"Cloudy: 2 days — the smallest number.",example:"2 < 3 < 5. Cloudy happened least."},

    {id:"pg7",question:"A class voted: Cat🐱🐱🐱🐱🐱🐱, Dog🐶🐶🐶🐶🐶🐶🐶🐶, Fish🐟🐟🐟. Which pet is MOST popular?",options:["Cat","Dog","Fish","Same"],correctAnswer:"Dog",explanation:"Dog: 8 votes, Cat: 6, Fish: 3. Dog wins!",example:"8 > 6 > 3. More children voted for dog."},

    {id:"pg8",question:"Cat🐱🐱🐱🐱🐱🐱, Dog🐶🐶🐶🐶🐶🐶🐶🐶, Fish🐟🐟🐟. How many MORE votes for Dog than Fish?",options:["3","4","5","6"],correctAnswer:"5",explanation:"Dog: 8, Fish: 3. Difference: 8 - 3 = 5.",example:"Dog has 5 more votes than Fish."},

  ],

};

// ═══════════════════════════════════════════════════════════════

// EXPORTS

// ═══════════════════════════════════════════════════════════════
 
// Flatten all math questions with category labels

export const allMathQuestions = Object.entries(mathQuestions).flatMap(([category, items]) =>

  items.map(q => ({ ...q, category, subject: 'math' }))

);
 
export const mathCategories = [

  { id: 'numbersTo100', name: 'Numbers (1-100)', icon: '🔢', color: 'from-blue-400 to-cyan-500', count: mathQuestions.numbersTo100.length },

  { id: 'addition', name: 'Addition', icon: '➕', color: 'from-green-400 to-emerald-500', count: mathQuestions.addition.length },

  { id: 'subtraction', name: 'Subtraction', icon: '➖', color: 'from-orange-400 to-red-500', count: mathQuestions.subtraction.length },

  { id: 'numberBonds', name: 'Number Bonds', icon: '🔗', color: 'from-purple-400 to-pink-500', count: mathQuestions.numberBonds.length },

  { id: 'shapesAndPatterns', name: 'Shapes & Patterns', icon: '🔺', color: 'from-indigo-400 to-blue-500', count: mathQuestions.shapesAndPatterns.length },

  { id: 'measurement', name: 'Measurement', icon: '📏', color: 'from-teal-400 to-green-500', count: mathQuestions.measurement.length },

  { id: 'time', name: 'Time & Calendar', icon: '🕐', color: 'from-amber-400 to-yellow-500', count: mathQuestions.time.length },

  { id: 'money', name: 'Money (SGD)', icon: '💰', color: 'from-yellow-400 to-orange-500', count: mathQuestions.money.length },

  { id: 'wordProblems', name: 'Word Problems', icon: '📝', color: 'from-rose-400 to-red-500', count: mathQuestions.wordProblems.length },

  { id: 'pictureGraphs', name: 'Picture Graphs', icon: '📊', color: 'from-fuchsia-400 to-purple-500', count: mathQuestions.pictureGraphs.length },

];
 
export function getMathQuestionsByCategory(categoryId) {

  return (mathQuestions[categoryId] || []).map(q => ({ ...q, category: categoryId, subject: 'math' }));

}
 
export function getTotalMathQuestionCount() {

  return allMathQuestions.length;

}