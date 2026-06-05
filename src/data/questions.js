const questions = {

  vocabulary: [

    { id: "v1", question: "What is the colour of the sky?", options: ["Red", "Blue", "Green", "Yellow"], correctAnswer: "Blue" },

    { id: "v2", question: "Which animal says 'meow'?", options: ["Dog", "Cat", "Bird", "Fish"], correctAnswer: "Cat" },

    { id: "v3", question: "Which one is a fruit?", options: ["Carrot", "Apple", "Rice", "Bread"], correctAnswer: "Apple" },

    { id: "v4", question: "What do we use to write?", options: ["Spoon", "Pencil", "Plate", "Shoe"], correctAnswer: "Pencil" },

    { id: "v5", question: "Which animal lives in water?", options: ["Cat", "Dog", "Fish", "Bird"], correctAnswer: "Fish" },

    { id: "v6", question: "What colour is a banana?", options: ["Red", "Blue", "Yellow", "Green"], correctAnswer: "Yellow" },

    { id: "v7", question: "Which one can fly?", options: ["Dog", "Cat", "Bird", "Fish"], correctAnswer: "Bird" },

    { id: "v8", question: "What do we wear on our feet?", options: ["Hat", "Gloves", "Shoes", "Scarf"], correctAnswer: "Shoes" },

    { id: "v9", question: "Which one is a vegetable?", options: ["Apple", "Carrot", "Mango", "Grape"], correctAnswer: "Carrot" },

    { id: "v10", question: "What do we drink when thirsty?", options: ["Sand", "Water", "Stone", "Paper"], correctAnswer: "Water" },

    { id: "v11", question: "Which animal has a long neck?", options: ["Cat", "Dog", "Giraffe", "Fish"], correctAnswer: "Giraffe" },

    { id: "v12", question: "What do we use to cut paper?", options: ["Pencil", "Scissors", "Ruler", "Eraser"], correctAnswer: "Scissors" },

    { id: "v13", question: "Which season is very cold?", options: ["Summer", "Winter", "Spring", "Autumn"], correctAnswer: "Winter" },

    { id: "v14", question: "What do we use to see?", options: ["Ears", "Nose", "Eyes", "Mouth"], correctAnswer: "Eyes" },

    { id: "v15", question: "Which one is the biggest?", options: ["Ant", "Cat", "Elephant", "Dog"], correctAnswer: "Elephant" },

    { id: "v16", question: "What is the shape of a ball?", options: ["Square", "Triangle", "Circle", "Rectangle"], correctAnswer: "Circle" },

    { id: "v17", question: "Where do we go to buy food?", options: ["Library", "School", "Market", "Park"], correctAnswer: "Market" },

    { id: "v18", question: "Which one is a body part?", options: ["Chair", "Hand", "Table", "Book"], correctAnswer: "Hand" },

    { id: "v19", question: "What do we use to hear?", options: ["Eyes", "Nose", "Ears", "Mouth"], correctAnswer: "Ears" },

    { id: "v20", question: "Which animal gives us milk?", options: ["Cat", "Cow", "Dog", "Fish"], correctAnswer: "Cow" },

    { id: "v21", question: "What colour are leaves?", options: ["Red", "Blue", "Yellow", "Green"], correctAnswer: "Green" },

    { id: "v22", question: "Which one is hot?", options: ["Ice cream", "Fire", "Water", "Snow"], correctAnswer: "Fire" },

    { id: "v23", question: "Where do fish live?", options: ["Tree", "Sky", "Water", "Ground"], correctAnswer: "Water" },

    { id: "v24", question: "What do we use to smell?", options: ["Eyes", "Nose", "Ears", "Hands"], correctAnswer: "Nose" },

    { id: "v25", question: "Which day comes after Monday?", options: ["Sunday", "Tuesday", "Wednesday", "Friday"], correctAnswer: "Tuesday" },

    { id: "v26", question: "What do bees make?", options: ["Milk", "Honey", "Bread", "Butter"], correctAnswer: "Honey" },

    { id: "v27", question: "Which one is a flower?", options: ["Potato", "Rose", "Onion", "Carrot"], correctAnswer: "Rose" },

    { id: "v28", question: "What falls from clouds when it rains?", options: ["Snow", "Sand", "Water", "Leaves"], correctAnswer: "Water" },

    { id: "v29", question: "Which animal has feathers?", options: ["Dog", "Cat", "Bird", "Fish"], correctAnswer: "Bird" },

    { id: "v30", question: "What do we sleep on?", options: ["Table", "Chair", "Bed", "Floor"], correctAnswer: "Bed" },

    { id: "v31", question: "Which one is round?", options: ["Book", "Ball", "Box", "Ruler"], correctAnswer: "Ball" },

    { id: "v32", question: "What do we eat for breakfast?", options: ["Stones", "Bread", "Paper", "Pencils"], correctAnswer: "Bread" },

    { id: "v33", question: "Which animal hops?", options: ["Fish", "Snake", "Rabbit", "Worm"], correctAnswer: "Rabbit" },

    { id: "v34", question: "What is the opposite of 'up'?", options: ["Left", "Right", "Down", "Side"], correctAnswer: "Down" },

    { id: "v35", question: "Which one is soft?", options: ["Rock", "Pillow", "Table", "Glass"], correctAnswer: "Pillow" },

    { id: "v36", question: "What do we carry books in?", options: ["Basket", "Bag", "Box", "Bucket"], correctAnswer: "Bag" },

    { id: "v37", question: "Which one is a baby cat?", options: ["Puppy", "Kitten", "Calf", "Chick"], correctAnswer: "Kitten" },

    { id: "v38", question: "What gives us light at night?", options: ["Sun", "Moon", "Cloud", "Rain"], correctAnswer: "Moon" },

    { id: "v39", question: "Which one is sweet?", options: ["Lemon", "Candy", "Salt", "Chilli"], correctAnswer: "Candy" },

    { id: "v40", question: "What do we use to open a door?", options: ["Spoon", "Key", "Pen", "Brush"], correctAnswer: "Key" },

    { id: "v41", question: "Which one is a baby dog?", options: ["Kitten", "Puppy", "Lamb", "Cub"], correctAnswer: "Puppy" },

    { id: "v42", question: "What do we wear when it rains?", options: ["Sunglasses", "Raincoat", "Shorts", "Sandals"], correctAnswer: "Raincoat" },

    { id: "v43", question: "Which one has wheels?", options: ["Chair", "Table", "Car", "Bed"], correctAnswer: "Car" },

    { id: "v44", question: "Where does a bird live?", options: ["Kennel", "Nest", "Stable", "Pond"], correctAnswer: "Nest" },

    { id: "v45", question: "What do plants need to grow?", options: ["Books", "Water", "Toys", "Shoes"], correctAnswer: "Water" },

    { id: "v46", question: "Which one is a tool?", options: ["Cake", "Hammer", "Flower", "Doll"], correctAnswer: "Hammer" },

    { id: "v47", question: "What do we use to brush our teeth?", options: ["Comb", "Toothbrush", "Spoon", "Pen"], correctAnswer: "Toothbrush" },

    { id: "v48", question: "Which animal has stripes?", options: ["Cat", "Dog", "Zebra", "Cow"], correctAnswer: "Zebra" },

    { id: "v49", question: "What do we put letters in?", options: ["Bin", "Postbox", "Basket", "Drawer"], correctAnswer: "Postbox" },

    { id: "v50", question: "Which one tells us the time?", options: ["Mirror", "Clock", "Window", "Door"], correctAnswer: "Clock" },

    { id: "v51", question: "What do we use to comb our hair?", options: ["Brush", "Fork", "Ruler", "Pencil"], correctAnswer: "Brush" },

    { id: "v52", question: "Which one is a musical instrument?", options: ["Chair", "Drum", "Plate", "Cup"], correctAnswer: "Drum" },

    { id: "v53", question: "What do we use to eat soup?", options: ["Fork", "Knife", "Spoon", "Chopsticks"], correctAnswer: "Spoon" },

    { id: "v54", question: "Which one is a planet?", options: ["Moon", "Star", "Earth", "Cloud"], correctAnswer: "Earth" },

    { id: "v55", question: "What do we breathe?", options: ["Water", "Air", "Sand", "Smoke"], correctAnswer: "Air" },

    { id: "v56", question: "Which one is the fastest?", options: ["Snail", "Turtle", "Cheetah", "Cow"], correctAnswer: "Cheetah" },

    { id: "v57", question: "Where do we go to learn?", options: ["Market", "School", "Hospital", "Cinema"], correctAnswer: "School" },

    { id: "v58", question: "Which one floats on water?", options: ["Stone", "Coin", "Leaf", "Key"], correctAnswer: "Leaf" },

    { id: "v59", question: "What do we celebrate on our birthday?", options: ["Getting older", "New Year", "Christmas", "Easter"], correctAnswer: "Getting older" },

    { id: "v60", question: "Which one is a sport?", options: ["Cooking", "Swimming", "Sleeping", "Reading"], correctAnswer: "Swimming" },

  ],
 
  grammar: [

    { id: "g1", question: "Choose the correct word: The cat ___ on the mat.", options: ["sit", "sits", "sitting", "sat"], correctAnswer: "sits" },

    { id: "g2", question: "Choose the correct word: She ___ to school every day.", options: ["go", "goes", "going", "went"], correctAnswer: "goes" },

    { id: "g3", question: "Choose the correct word: I ___ a book now.", options: ["read", "reads", "am reading", "reading"], correctAnswer: "am reading" },

    { id: "g4", question: "Choose the correct word: ___ apple is red.", options: ["A", "An", "The", "This"], correctAnswer: "The" },

    { id: "g5", question: "Choose the correct word: He ___ a good boy.", options: ["is", "are", "am", "be"], correctAnswer: "is" },

    { id: "g6", question: "Choose the correct word: They ___ playing in the park.", options: ["is", "are", "am", "was"], correctAnswer: "are" },

    { id: "g7", question: "Choose the correct word: I ___ happy today.", options: ["is", "are", "am", "be"], correctAnswer: "am" },

    { id: "g8", question: "Choose the correct word: The dog ___ loudly.", options: ["bark", "barks", "barking", "barked"], correctAnswer: "barks" },

    { id: "g9", question: "Choose the correct word: We ___ to the zoo yesterday.", options: ["go", "goes", "went", "going"], correctAnswer: "went" },

    { id: "g10", question: "Choose the correct word: She ___ a beautiful dress.", options: ["have", "has", "having", "had"], correctAnswer: "has" },

    { id: "g11", question: "Choose the correct word: The birds ___ in the sky.", options: ["fly", "flies", "flying", "flew"], correctAnswer: "fly" },

    { id: "g12", question: "Choose the correct word: My father ___ a car.", options: ["drive", "drives", "driving", "drove"], correctAnswer: "drives" },

    { id: "g13", question: "Choose the correct word: ___ you like ice cream?", options: ["Do", "Does", "Is", "Are"], correctAnswer: "Do" },

    { id: "g14", question: "Choose the correct word: She ___ not like spinach.", options: ["do", "does", "is", "are"], correctAnswer: "does" },

    { id: "g15", question: "Choose the correct word: The children ___ in the garden.", options: ["play", "plays", "playing", "played"], correctAnswer: "play" },

    { id: "g16", question: "Choose the correct word: I can ___ a bicycle.", options: ["ride", "rides", "riding", "rode"], correctAnswer: "ride" },

    { id: "g17", question: "Choose the correct word: There ___ a cat on the roof.", options: ["is", "are", "am", "be"], correctAnswer: "is" },

    { id: "g18", question: "Choose the correct word: There ___ many books on the table.", options: ["is", "are", "am", "was"], correctAnswer: "are" },

    { id: "g19", question: "Choose the correct word: The baby ___ crying.", options: ["is", "are", "am", "were"], correctAnswer: "is" },

    { id: "g20", question: "Choose the correct word: My mother ___ dinner every evening.", options: ["cook", "cooks", "cooking", "cooked"], correctAnswer: "cooks" },

    { id: "g21", question: "Fill in the blank: I ___ a student.", options: ["am", "is", "are", "be"], correctAnswer: "am" },

    { id: "g22", question: "Fill in the blank: The sun ___ in the east.", options: ["rise", "rises", "rising", "rose"], correctAnswer: "rises" },

    { id: "g23", question: "Fill in the blank: ___ elephant is big.", options: ["A", "An", "The", "These"], correctAnswer: "An" },

    { id: "g24", question: "Fill in the blank: She ___ to music every day.", options: ["listen", "listens", "listening", "listened"], correctAnswer: "listens" },

    { id: "g25", question: "Fill in the blank: They ___ football on Sundays.", options: ["play", "plays", "playing", "played"], correctAnswer: "play" },

    { id: "g26", question: "Which sentence is correct?", options: ["He go to school.", "He goes to school.", "He going to school.", "He gone to school."], correctAnswer: "He goes to school." },

    { id: "g27", question: "Which sentence is correct?", options: ["She are happy.", "She is happy.", "She am happy.", "She be happy."], correctAnswer: "She is happy." },

    { id: "g28", question: "Which sentence is correct?", options: ["I has a pen.", "I have a pen.", "I having a pen.", "I am have a pen."], correctAnswer: "I have a pen." },

    { id: "g29", question: "Choose the correct word: The flowers ___ beautiful.", options: ["is", "are", "am", "was"], correctAnswer: "are" },

    { id: "g30", question: "Choose the correct word: He ___ his homework every night.", options: ["do", "does", "doing", "did"], correctAnswer: "does" },

    { id: "g31", question: "Choose: My sister and I ___ twins.", options: ["is", "am", "are", "was"], correctAnswer: "are" },

    { id: "g32", question: "Choose: The cat ___ under the table.", options: ["is", "are", "am", "were"], correctAnswer: "is" },

    { id: "g33", question: "Choose: ___ book is on the desk.", options: ["A", "An", "The", "These"], correctAnswer: "The" },

    { id: "g34", question: "Choose: She ___ her teeth every morning.", options: ["brush", "brushes", "brushing", "brushed"], correctAnswer: "brushes" },

    { id: "g35", question: "Choose: The boys ___ running fast.", options: ["is", "are", "am", "was"], correctAnswer: "are" },

    { id: "g36", question: "Choose: I ___ not like spiders.", options: ["do", "does", "am", "is"], correctAnswer: "do" },

    { id: "g37", question: "Choose: ___ she your friend?", options: ["Is", "Are", "Am", "Do"], correctAnswer: "Is" },

    { id: "g38", question: "Choose: We ___ going to the park.", options: ["is", "am", "are", "was"], correctAnswer: "are" },

    { id: "g39", question: "Choose: He ___ a new toy.", options: ["want", "wants", "wanting", "wanted"], correctAnswer: "wants" },

    { id: "g40", question: "Choose: The bird ___ a worm.", options: ["catch", "catches", "catching", "caught"], correctAnswer: "catches" },

    { id: "g41", question: "Choose the correct word: ___ is your name?", options: ["What", "Where", "When", "Who"], correctAnswer: "What" },

    { id: "g42", question: "Choose: ___ do you live?", options: ["What", "Where", "When", "Who"], correctAnswer: "Where" },

    { id: "g43", question: "Choose: ___ is your birthday?", options: ["What", "Where", "When", "Who"], correctAnswer: "When" },

    { id: "g44", question: "Choose: ___ is your teacher?", options: ["What", "Where", "When", "Who"], correctAnswer: "Who" },

    { id: "g45", question: "Choose: She put the book ___ the table.", options: ["in", "on", "under", "behind"], correctAnswer: "on" },

    { id: "g46", question: "Choose: The cat is hiding ___ the bed.", options: ["in", "on", "above", "under"], correctAnswer: "under" },

    { id: "g47", question: "Choose: We go to school ___ the morning.", options: ["in", "on", "at", "by"], correctAnswer: "in" },

    { id: "g48", question: "Choose: My birthday is ___ June.", options: ["in", "on", "at", "by"], correctAnswer: "in" },

    { id: "g49", question: "Choose: The picture is ___ the wall.", options: ["in", "on", "under", "behind"], correctAnswer: "on" },

    { id: "g50", question: "Choose: She is standing ___ the door.", options: ["between", "behind", "above", "under"], correctAnswer: "behind" },

    { id: "g51", question: "Choose: I go to bed ___ 9 o'clock.", options: ["in", "on", "at", "by"], correctAnswer: "at" },

    { id: "g52", question: "Choose: The ball is ___ the box.", options: ["in", "on", "at", "by"], correctAnswer: "in" },

    { id: "g53", question: "Choose: He sits ___ me in class.", options: ["next to", "above", "under", "behind"], correctAnswer: "next to" },

    { id: "g54", question: "Choose: I ___ like chocolate very much.", options: ["does", "do", "am", "is"], correctAnswer: "do" },

    { id: "g55", question: "Choose the plural: one cat, two ___", options: ["cat", "cats", "cates", "catties"], correctAnswer: "cats" },

    { id: "g56", question: "Choose the plural: one box, two ___", options: ["box", "boxs", "boxes", "boxies"], correctAnswer: "boxes" },

    { id: "g57", question: "Choose the plural: one child, two ___", options: ["childs", "childes", "children", "child"], correctAnswer: "children" },

    { id: "g58", question: "Choose the plural: one fish, two ___", options: ["fishs", "fishes", "fish", "fishies"], correctAnswer: "fish" },

    { id: "g59", question: "Choose the plural: one tooth, two ___", options: ["tooths", "teeth", "toothes", "teeths"], correctAnswer: "teeth" },

    { id: "g60", question: "Choose: This is ___ umbrella.", options: ["a", "an", "the", "these"], correctAnswer: "an" },

    { id: "g61", question: "Choose: I saw ___ orange cat.", options: ["a", "an", "the", "these"], correctAnswer: "an" },

    { id: "g62", question: "Choose: She has ___ new bag.", options: ["a", "an", "the", "some"], correctAnswer: "a" },

    { id: "g63", question: "Choose: He is ___ honest boy.", options: ["a", "an", "the", "some"], correctAnswer: "an" },

    { id: "g64", question: "Choose: ___ sun is very bright.", options: ["A", "An", "The", "Some"], correctAnswer: "The" },

    { id: "g65", question: "Choose: She gave ___ a present.", options: ["I", "me", "my", "mine"], correctAnswer: "me" },

    { id: "g66", question: "Choose: ___ is my book.", options: ["This", "These", "Those", "Them"], correctAnswer: "This" },

    { id: "g67", question: "Choose: ___ are my friends.", options: ["This", "That", "These", "It"], correctAnswer: "These" },

    { id: "g68", question: "Choose: The toy belongs to ___.", options: ["he", "him", "his", "he's"], correctAnswer: "him" },

    { id: "g69", question: "Choose: ___ bag is this? It is mine.", options: ["Who", "Whose", "Which", "What"], correctAnswer: "Whose" },

    { id: "g70", question: "Choose: She is taller ___ her brother.", options: ["then", "than", "that", "this"], correctAnswer: "than" },

  ],
 
  opposites: [

    { id: "o1", question: "What is the opposite of 'big'?", options: ["Tall", "Small", "Fast", "Happy"], correctAnswer: "Small" },

    { id: "o2", question: "What is the opposite of 'hot'?", options: ["Warm", "Cold", "Cool", "Wet"], correctAnswer: "Cold" },

    { id: "o3", question: "What is the opposite of 'happy'?", options: ["Glad", "Sad", "Mad", "Bad"], correctAnswer: "Sad" },

    { id: "o4", question: "What is the opposite of 'fast'?", options: ["Quick", "Slow", "Small", "Big"], correctAnswer: "Slow" },

    { id: "o5", question: "What is the opposite of 'tall'?", options: ["Big", "Long", "Short", "Small"], correctAnswer: "Short" },

    { id: "o6", question: "What is the opposite of 'light'?", options: ["Bright", "Dark", "White", "Soft"], correctAnswer: "Dark" },

    { id: "o7", question: "What is the opposite of 'old'?", options: ["New", "Young", "Baby", "Fresh"], correctAnswer: "Young" },

    { id: "o8", question: "What is the opposite of 'open'?", options: ["Shut", "Close", "Lock", "Stop"], correctAnswer: "Close" },

    { id: "o9", question: "What is the opposite of 'soft'?", options: ["Hard", "Strong", "Tough", "Rough"], correctAnswer: "Hard" },

    { id: "o10", question: "What is the opposite of 'clean'?", options: ["Messy", "Dirty", "Dark", "Old"], correctAnswer: "Dirty" },

    { id: "o11", question: "What is the opposite of 'wet'?", options: ["Cold", "Hot", "Dry", "Warm"], correctAnswer: "Dry" },

    { id: "o12", question: "What is the opposite of 'full'?", options: ["Hungry", "Empty", "Small", "Thin"], correctAnswer: "Empty" },

    { id: "o13", question: "What is the opposite of 'loud'?", options: ["Soft", "Quiet", "Silent", "Calm"], correctAnswer: "Quiet" },

    { id: "o14", question: "What is the opposite of 'day'?", options: ["Dark", "Night", "Evening", "Sleep"], correctAnswer: "Night" },

    { id: "o15", question: "What is the opposite of 'thick'?", options: ["Small", "Light", "Thin", "Short"], correctAnswer: "Thin" },

    { id: "o16", question: "What is the opposite of 'push'?", options: ["Pull", "Stop", "Move", "Run"], correctAnswer: "Pull" },

    { id: "o17", question: "What is the opposite of 'cry'?", options: ["Smile", "Laugh", "Talk", "Sing"], correctAnswer: "Laugh" },

    { id: "o18", question: "What is the opposite of 'buy'?", options: ["Give", "Sell", "Take", "Keep"], correctAnswer: "Sell" },

    { id: "o19", question: "What is the opposite of 'begin'?", options: ["Stop", "End", "Finish", "Close"], correctAnswer: "End" },

    { id: "o20", question: "What is the opposite of 'come'?", options: ["Run", "Walk", "Go", "Move"], correctAnswer: "Go" },

    { id: "o21", question: "What is the opposite of 'love'?", options: ["Like", "Hate", "Angry", "Sad"], correctAnswer: "Hate" },

    { id: "o22", question: "What is the opposite of 'give'?", options: ["Keep", "Take", "Have", "Hold"], correctAnswer: "Take" },

    { id: "o23", question: "What is the opposite of 'near'?", options: ["Close", "Far", "Away", "Gone"], correctAnswer: "Far" },

    { id: "o24", question: "What is the opposite of 'good'?", options: ["Wrong", "Bad", "Evil", "Mean"], correctAnswer: "Bad" },

    { id: "o25", question: "What is the opposite of 'right'?", options: ["Bad", "Wrong", "Left", "Down"], correctAnswer: "Wrong" },

    { id: "o26", question: "What is the opposite of 'strong'?", options: ["Small", "Thin", "Weak", "Soft"], correctAnswer: "Weak" },

    { id: "o27", question: "What is the opposite of 'rich'?", options: ["Sad", "Poor", "Hungry", "Small"], correctAnswer: "Poor" },

    { id: "o28", question: "What is the opposite of 'easy'?", options: ["Hard", "Difficult", "Tough", "Long"], correctAnswer: "Difficult" },

    { id: "o29", question: "What is the opposite of 'inside'?", options: ["Away", "Outside", "Far", "There"], correctAnswer: "Outside" },

    { id: "o30", question: "What is the opposite of 'asleep'?", options: ["Awake", "Alert", "Active", "Up"], correctAnswer: "Awake" },

  ],
 
  rhyming: [

    { id: "r1", question: "Which word rhymes with 'cat'?", options: ["Dog", "Hat", "Cup", "Sun"], correctAnswer: "Hat" },

    { id: "r2", question: "Which word rhymes with 'dog'?", options: ["Cat", "Log", "Run", "Pen"], correctAnswer: "Log" },

    { id: "r3", question: "Which word rhymes with 'cake'?", options: ["Cup", "Lake", "Dog", "Sun"], correctAnswer: "Lake" },

    { id: "r4", question: "Which word rhymes with 'bed'?", options: ["Red", "Big", "Cup", "Hat"], correctAnswer: "Red" },

    { id: "r5", question: "Which word rhymes with 'fun'?", options: ["Fan", "Sun", "Fin", "Fog"], correctAnswer: "Sun" },

    { id: "r6", question: "Which word rhymes with 'ball'?", options: ["Bell", "Bull", "Tall", "Bill"], correctAnswer: "Tall" },

    { id: "r7", question: "Which word rhymes with 'day'?", options: ["Dog", "Dig", "Play", "Dip"], correctAnswer: "Play" },

    { id: "r8", question: "Which word rhymes with 'fish'?", options: ["Wish", "Fast", "Frog", "Fox"], correctAnswer: "Wish" },

    { id: "r9", question: "Which word rhymes with 'ring'?", options: ["Rang", "Rung", "Sing", "Run"], correctAnswer: "Sing" },

    { id: "r10", question: "Which word rhymes with 'moon'?", options: ["Man", "Spoon", "Mine", "More"], correctAnswer: "Spoon" },

    { id: "r11", question: "Which word rhymes with 'tree'?", options: ["Try", "Bee", "Two", "Tie"], correctAnswer: "Bee" },

    { id: "r12", question: "Which word rhymes with 'book'?", options: ["Back", "Cook", "Bike", "Bark"], correctAnswer: "Cook" },

    { id: "r13", question: "Which word rhymes with 'pen'?", options: ["Pan", "Pin", "Ten", "Pun"], correctAnswer: "Ten" },

    { id: "r14", question: "Which word rhymes with 'pig'?", options: ["Peg", "Pug", "Big", "Pag"], correctAnswer: "Big" },

    { id: "r15", question: "Which word rhymes with 'star'?", options: ["Step", "Car", "Stop", "Stir"], correctAnswer: "Car" },

    { id: "r16", question: "Which word rhymes with 'king'?", options: ["Ring", "Rang", "Kong", "Kung"], correctAnswer: "Ring" },

    { id: "r17", question: "Which word rhymes with 'coat'?", options: ["Cat", "Cut", "Boat", "Cot"], correctAnswer: "Boat" },

    { id: "r18", question: "Which word rhymes with 'night'?", options: ["Not", "Neat", "Light", "Net"], correctAnswer: "Light" },

    { id: "r19", question: "Which word rhymes with 'train'?", options: ["Trim", "Rain", "Tram", "True"], correctAnswer: "Rain" },

    { id: "r20", question: "Which word rhymes with 'house'?", options: ["Horse", "Mouse", "Hose", "Has"], correctAnswer: "Mouse" },

    { id: "r21", question: "Which word rhymes with 'man'?", options: ["Men", "Can", "Min", "Mon"], correctAnswer: "Can" },

    { id: "r22", question: "Which word rhymes with 'make'?", options: ["Mike", "Muck", "Bake", "Mock"], correctAnswer: "Bake" },

    { id: "r23", question: "Which word rhymes with 'car'?", options: ["Cup", "Far", "Core", "Cur"], correctAnswer: "Far" },

    { id: "r24", question: "Which word rhymes with 'hop'?", options: ["Hip", "Hap", "Stop", "Hup"], correctAnswer: "Stop" },

    { id: "r25", question: "Which word rhymes with 'glad'?", options: ["Good", "Sad", "Glide", "Gold"], correctAnswer: "Sad" },

    { id: "r26", question: "Which word rhymes with 'ship'?", options: ["Shop", "Chip", "Shape", "Sheep"], correctAnswer: "Chip" },

    { id: "r27", question: "Which word rhymes with 'sand'?", options: ["Send", "Hand", "Sound", "Sad"], correctAnswer: "Hand" },

    { id: "r28", question: "Which word rhymes with 'duck'?", options: ["Dark", "Luck", "Dock", "Dick"], correctAnswer: "Luck" },

    { id: "r29", question: "Which word rhymes with 'fox'?", options: ["Fix", "Box", "Fax", "Fog"], correctAnswer: "Box" },

    { id: "r30", question: "Which word rhymes with 'bee'?", options: ["Bay", "Bow", "See", "Buy"], correctAnswer: "See" },

  ],
 
  numbers: [

    { id: "n1", question: "How many legs does a dog have?", options: ["2", "4", "6", "8"], correctAnswer: "4" },

    { id: "n2", question: "What comes after the number 7?", options: ["6", "9", "8", "5"], correctAnswer: "8" },

    { id: "n3", question: "How much money is shown? (A $10 note)", options: ["$5", "$10", "$20", "$50"], correctAnswer: "$10", hasImage: true, imageType: "money" },

    { id: "n4", question: "What is 2 + 3?", options: ["4", "5", "6", "7"], correctAnswer: "5" },

    { id: "n5", question: "What is 5 + 1?", options: ["4", "5", "6", "7"], correctAnswer: "6" },

    { id: "n6", question: "How many fingers do we have on one hand?", options: ["3", "4", "5", "6"], correctAnswer: "5" },

    { id: "n7", question: "What number comes before 10?", options: ["7", "8", "9", "11"], correctAnswer: "9" },

    { id: "n8", question: "What is 3 + 3?", options: ["5", "6", "7", "8"], correctAnswer: "6" },

    { id: "n9", question: "How many days are in a week?", options: ["5", "6", "7", "8"], correctAnswer: "7" },

    { id: "n10", question: "What is 4 + 2?", options: ["5", "6", "7", "8"], correctAnswer: "6" },

    { id: "n11", question: "What is 10 - 3?", options: ["5", "6", "7", "8"], correctAnswer: "7" },

    { id: "n12", question: "What is 1 + 1?", options: ["1", "2", "3", "4"], correctAnswer: "2" },

    { id: "n13", question: "What is 8 - 2?", options: ["4", "5", "6", "7"], correctAnswer: "6" },

    { id: "n14", question: "How many months in a year?", options: ["10", "11", "12", "13"], correctAnswer: "12" },

    { id: "n15", question: "What is 5 + 5?", options: ["8", "9", "10", "11"], correctAnswer: "10" },

    { id: "n16", question: "What number comes after 19?", options: ["18", "20", "21", "17"], correctAnswer: "20" },

    { id: "n17", question: "What is 7 + 2?", options: ["8", "9", "10", "11"], correctAnswer: "9" },

    { id: "n18", question: "What is 9 - 4?", options: ["3", "4", "5", "6"], correctAnswer: "5" },

    { id: "n19", question: "How many sides does a triangle have?", options: ["2", "3", "4", "5"], correctAnswer: "3" },

    { id: "n20", question: "What is 6 + 3?", options: ["7", "8", "9", "10"], correctAnswer: "9" },

    { id: "n21", question: "What is the biggest: 5, 9, 3, 7?", options: ["5", "9", "3", "7"], correctAnswer: "9" },

    { id: "n22", question: "What is the smallest: 8, 2, 6, 4?", options: ["8", "2", "6", "4"], correctAnswer: "2" },

    { id: "n23", question: "What is 10 - 5?", options: ["3", "4", "5", "6"], correctAnswer: "5" },

    { id: "n24", question: "How many sides does a square have?", options: ["3", "4", "5", "6"], correctAnswer: "4" },

    { id: "n25", question: "What is 2 + 2 + 2?", options: ["4", "5", "6", "7"], correctAnswer: "6" },

    { id: "n26", question: "What is half of 10?", options: ["3", "4", "5", "6"], correctAnswer: "5" },

    { id: "n27", question: "Which number is bigger: 15 or 12?", options: ["12", "15", "Same", "Neither"], correctAnswer: "15" },

    { id: "n28", question: "What is 3 + 4?", options: ["5", "6", "7", "8"], correctAnswer: "7" },

    { id: "n29", question: "What is 8 + 2?", options: ["9", "10", "11", "12"], correctAnswer: "10" },

    { id: "n30", question: "Count: 2, 4, 6, ___?", options: ["7", "8", "9", "10"], correctAnswer: "8" },

    { id: "n31", question: "Count: 5, 10, 15, ___?", options: ["16", "18", "20", "25"], correctAnswer: "20" },

    { id: "n32", question: "What is 7 - 3?", options: ["2", "3", "4", "5"], correctAnswer: "4" },

    { id: "n33", question: "How many wheels does a bicycle have?", options: ["1", "2", "3", "4"], correctAnswer: "2" },

    { id: "n34", question: "What is 4 + 4?", options: ["6", "7", "8", "9"], correctAnswer: "8" },

    { id: "n35", question: "What is 6 - 1?", options: ["3", "4", "5", "6"], correctAnswer: "5" },

    { id: "n36", question: "How many eyes do we have?", options: ["1", "2", "3", "4"], correctAnswer: "2" },

    { id: "n37", question: "What is 9 + 1?", options: ["8", "9", "10", "11"], correctAnswer: "10" },

    { id: "n38", question: "What is 5 - 2?", options: ["1", "2", "3", "4"], correctAnswer: "3" },

    { id: "n39", question: "Count: 1, 3, 5, ___?", options: ["6", "7", "8", "9"], correctAnswer: "7" },

    { id: "n40", question: "What is 6 + 4?", options: ["8", "9", "10", "11"], correctAnswer: "10" },

    { id: "n41", question: "What is double 4?", options: ["6", "7", "8", "9"], correctAnswer: "8" },

    { id: "n42", question: "What is 10 - 7?", options: ["2", "3", "4", "5"], correctAnswer: "3" },

    { id: "n43", question: "What is 3 + 5?", options: ["6", "7", "8", "9"], correctAnswer: "8" },

    { id: "n44", question: "Which is less: 6 or 9?", options: ["6", "9", "Same", "Neither"], correctAnswer: "6" },

    { id: "n45", question: "What is 7 + 3?", options: ["8", "9", "10", "11"], correctAnswer: "10" },

    { id: "n46", question: "What is double 3?", options: ["5", "6", "7", "8"], correctAnswer: "6" },

    { id: "n47", question: "Count backwards: 10, 9, 8, ___?", options: ["6", "7", "5", "4"], correctAnswer: "7" },

    { id: "n48", question: "What is 2 + 7?", options: ["7", "8", "9", "10"], correctAnswer: "9" },

    { id: "n49", question: "What is 11 - 5?", options: ["4", "5", "6", "7"], correctAnswer: "6" },

    { id: "n50", question: "How many corners does a rectangle have?", options: ["2", "3", "4", "5"], correctAnswer: "4" },

  ],

 
  comprehension: [

    { id: "c1", question: "Tom has a red ball. What colour is Tom's ball?", options: ["Blue", "Green", "Red", "Yellow"], correctAnswer: "Red" },

    { id: "c2", question: "Sara likes to eat apples. What does Sara like to eat?", options: ["Oranges", "Apples", "Bananas", "Grapes"], correctAnswer: "Apples" },

    { id: "c3", question: "The cat is sleeping on the sofa. Where is the cat?", options: ["On the bed", "On the sofa", "On the floor", "On the table"], correctAnswer: "On the sofa" },

    { id: "c4", question: "It is raining outside. What is the weather like?", options: ["Sunny", "Windy", "Rainy", "Snowy"], correctAnswer: "Rainy" },

    { id: "c5", question: "Mum baked a cake for my birthday. Why did Mum bake a cake?", options: ["For dinner", "For school", "For my birthday", "For fun"], correctAnswer: "For my birthday" },

    { id: "c6", question: "The boy is running fast. What is the boy doing?", options: ["Walking", "Running", "Jumping", "Sitting"], correctAnswer: "Running" },

    { id: "c7", question: "Lisa has three dolls. How many dolls does Lisa have?", options: ["1", "2", "3", "4"], correctAnswer: "3" },

    { id: "c8", question: "Dad drives to work every morning. When does Dad drive to work?", options: ["Every night", "Every morning", "Every evening", "Every Sunday"], correctAnswer: "Every morning" },

    { id: "c9", question: "The flowers in the garden are pink. What colour are the flowers?", options: ["Red", "Blue", "Pink", "White"], correctAnswer: "Pink" },

    { id: "c10", question: "Ben goes to school by bus. How does Ben go to school?", options: ["By car", "By train", "By bus", "By walking"], correctAnswer: "By bus" },

    { id: "c11", question: "My dog likes to play with a ball. What does my dog play with?", options: ["A stick", "A ball", "A bone", "A toy"], correctAnswer: "A ball" },

    { id: "c12", question: "The baby is crying because she is hungry. Why is the baby crying?", options: ["She is tired", "She is hungry", "She is cold", "She is bored"], correctAnswer: "She is hungry" },

    { id: "c13", question: "We went to the zoo and saw elephants. What did we see at the zoo?", options: ["Dogs", "Cats", "Elephants", "Fish"], correctAnswer: "Elephants" },

    { id: "c14", question: "Grandma gave me a book for Christmas. What did Grandma give me?", options: ["A toy", "A book", "A dress", "Money"], correctAnswer: "A book" },

    { id: "c15", question: "The children are playing in the park. Where are the children?", options: ["At school", "At home", "In the park", "In the car"], correctAnswer: "In the park" },

    { id: "c16", question: "Ali is seven years old. How old is Ali?", options: ["Five", "Six", "Seven", "Eight"], correctAnswer: "Seven" },

    { id: "c17", question: "She is wearing a blue dress. What is she wearing?", options: ["A red shirt", "A blue dress", "A green skirt", "A yellow hat"], correctAnswer: "A blue dress" },

    { id: "c18", question: "The bird is singing on the tree. Where is the bird?", options: ["On the roof", "On the tree", "In the cage", "On the ground"], correctAnswer: "On the tree" },

    { id: "c19", question: "Peter's favourite food is pizza. What is Peter's favourite food?", options: ["Burger", "Rice", "Pizza", "Noodles"], correctAnswer: "Pizza" },

    { id: "c20", question: "Mother is cooking fish for dinner. What is Mother cooking?", options: ["Chicken", "Fish", "Rice", "Soup"], correctAnswer: "Fish" },

    { id: "c21", question: "The shop closes at 9 pm. When does the shop close?", options: ["8 pm", "9 pm", "10 pm", "7 pm"], correctAnswer: "9 pm" },

    { id: "c22", question: "Jane walks to school with her sister. Who does Jane walk with?", options: ["Her brother", "Her friend", "Her sister", "Her mother"], correctAnswer: "Her sister" },

    { id: "c23", question: "The boy is sad because he lost his toy. Why is the boy sad?", options: ["He is tired", "He lost his toy", "He is sick", "He is hungry"], correctAnswer: "He lost his toy" },

    { id: "c24", question: "We have art class on Wednesday. When do we have art class?", options: ["Monday", "Tuesday", "Wednesday", "Thursday"], correctAnswer: "Wednesday" },

    { id: "c25", question: "The cat caught a mouse. What did the cat catch?", options: ["A bird", "A fish", "A mouse", "A ball"], correctAnswer: "A mouse" },

    { id: "c26", question: "Amy brings her lunch to school. What does Amy bring?", options: ["Her books", "Her lunch", "Her toys", "Her bag"], correctAnswer: "Her lunch" },

    { id: "c27", question: "It is very hot today. We should drink more ___.", options: ["Milk", "Juice", "Water", "Tea"], correctAnswer: "Water" },

    { id: "c28", question: "Tim cannot see well. He needs to wear ___.", options: ["A hat", "Glasses", "Gloves", "A scarf"], correctAnswer: "Glasses" },

    { id: "c29", question: "It is dark outside. It must be ___.", options: ["Morning", "Afternoon", "Night", "Noon"], correctAnswer: "Night" },

    { id: "c30", question: "She is putting on her raincoat. She is going out in the ___.", options: ["Sun", "Rain", "Wind", "Snow"], correctAnswer: "Rain" },

    { id: "c31", question: "The teacher asked the children to be quiet. The children should ___.", options: ["Run", "Shout", "Stop talking", "Go home"], correctAnswer: "Stop talking" },

    { id: "c32", question: "Lina is at the library. She is probably ___.", options: ["Swimming", "Reading", "Cooking", "Playing"], correctAnswer: "Reading" },

    { id: "c33", question: "He is carrying an umbrella. The sky is probably ___.", options: ["Clear", "Cloudy", "Blue", "Starry"], correctAnswer: "Cloudy" },

    { id: "c34", question: "Mum told me to clean my room. My room is probably ___.", options: ["Big", "Small", "Messy", "Empty"], correctAnswer: "Messy" },

    { id: "c35", question: "She put on her gloves and scarf. The weather is probably ___.", options: ["Hot", "Warm", "Cold", "Rainy"], correctAnswer: "Cold" },

    { id: "c36", question: "He is blowing out candles on a cake. It is his ___.", options: ["School day", "Birthday", "Holiday", "Bedtime"], correctAnswer: "Birthday" },

    { id: "c37", question: "The plants are dry. They need ___.", options: ["Food", "Water", "Light", "Music"], correctAnswer: "Water" },

    { id: "c38", question: "She is yawning. She is probably ___.", options: ["Hungry", "Tired", "Happy", "Angry"], correctAnswer: "Tired" },

    { id: "c39", question: "He is waving goodbye. He is probably ___.", options: ["Coming", "Leaving", "Eating", "Sleeping"], correctAnswer: "Leaving" },

    { id: "c40", question: "The dog is wagging its tail. It is probably ___.", options: ["Scared", "Sad", "Happy", "Sick"], correctAnswer: "Happy" },

  ],
 
  spelling: [

    { id: "s1", question: "Which word is spelled correctly?", options: ["Skool", "School", "Shcool", "Scool"], correctAnswer: "School" },

    { id: "s2", question: "Which word is spelled correctly?", options: ["Frend", "Freind", "Friend", "Frind"], correctAnswer: "Friend" },

    { id: "s3", question: "Which word is spelled correctly?", options: ["Becuz", "Becuase", "Because", "Becouse"], correctAnswer: "Because" },

    { id: "s4", question: "Which word is spelled correctly?", options: ["Peple", "Pepole", "People", "Poeple"], correctAnswer: "People" },

    { id: "s5", question: "Which word is spelled correctly?", options: ["Butiful", "Beautiful", "Beautful", "Beutiful"], correctAnswer: "Beautiful" },

    { id: "s6", question: "Which word is spelled correctly?", options: ["Animel", "Animale", "Animal", "Anmial"], correctAnswer: "Animal" },

    { id: "s7", question: "Which word is spelled correctly?", options: ["Wether", "Weather", "Wheather", "Weathre"], correctAnswer: "Weather" },

    { id: "s8", question: "Which word is spelled correctly?", options: ["Tomorow", "Tomorrow", "Tommorow", "Toomorrow"], correctAnswer: "Tomorrow" },

    { id: "s9", question: "Which word is spelled correctly?", options: ["Famliy", "Family", "Famaly", "Fammily"], correctAnswer: "Family" },

    { id: "s10", question: "Which word is spelled correctly?", options: ["Techer", "Teecher", "Teacher", "Teachar"], correctAnswer: "Teacher" },

    { id: "s11", question: "Which word is spelled correctly?", options: ["Libary", "Library", "Liberry", "Librarey"], correctAnswer: "Library" },

    { id: "s12", question: "Which word is spelled correctly?", options: ["Chidren", "Childern", "Children", "Chilren"], correctAnswer: "Children" },

    { id: "s13", question: "Which word is spelled correctly?", options: ["Diffrent", "Different", "Differnt", "Diferent"], correctAnswer: "Different" },

    { id: "s14", question: "Which word is spelled correctly?", options: ["Togather", "Together", "Togethr", "Togeter"], correctAnswer: "Together" },

    { id: "s15", question: "Which word is spelled correctly?", options: ["Colur", "Colour", "Coulor", "Coler"], correctAnswer: "Colour" },

    { id: "s16", question: "Which word is spelled correctly?", options: ["Mondey", "Monday", "Munday", "Mondy"], correctAnswer: "Monday" },

    { id: "s17", question: "Which word is spelled correctly?", options: ["Hapiness", "Happyness", "Happiness", "Happines"], correctAnswer: "Happiness" },

    { id: "s18", question: "Which word is spelled correctly?", options: ["Brekfast", "Breakfast", "Brakefast", "Breckfast"], correctAnswer: "Breakfast" },

    { id: "s19", question: "Which word is spelled correctly?", options: ["Storng", "Stronge", "Strong", "Strung"], correctAnswer: "Strong" },

    { id: "s20", question: "Which word is spelled correctly?", options: ["Elefant", "Elephent", "Elephant", "Elephunt"], correctAnswer: "Elephant" },

    { id: "s21", question: "Which word is spelled correctly?", options: ["Gaden", "Garden", "Graden", "Gardan"], correctAnswer: "Garden" },

    { id: "s22", question: "Which word is spelled correctly?", options: ["Kichen", "Kitchen", "Kitchin", "Kitcen"], correctAnswer: "Kitchen" },

    { id: "s23", question: "Which word is spelled correctly?", options: ["Febuary", "February", "Feburary", "Februry"], correctAnswer: "February" },

    { id: "s24", question: "Which word is spelled correctly?", options: ["Wensday", "Wednessday", "Wednesday", "Wednsday"], correctAnswer: "Wednesday" },

    { id: "s25", question: "Which word is spelled correctly?", options: ["Enuff", "Enough", "Enought", "Enogh"], correctAnswer: "Enough" },

    { id: "s26", question: "Which word is spelled correctly?", options: ["Playgound", "Playgrond", "Playground", "Playgrund"], correctAnswer: "Playground" },

    { id: "s27", question: "Which word is spelled correctly?", options: ["Butterfly", "Buterfly", "Butterflie", "Butterflye"], correctAnswer: "Butterfly" },

    { id: "s28", question: "Which word is spelled correctly?", options: ["Dinosuar", "Dinosaur", "Dinasour", "Dinosaure"], correctAnswer: "Dinosaur" },

    { id: "s29", question: "Which word is spelled correctly?", options: ["Sandwitch", "Sandwhich", "Sandwich", "Sandwish"], correctAnswer: "Sandwich" },

    { id: "s30", question: "Which word is spelled correctly?", options: ["Umbrela", "Umbrella", "Umbralla", "Umberella"], correctAnswer: "Umbrella" },

  ],
 
  sentenceCompletion: [

    { id: "sc1", question: "I am ___ because I got a new toy.", options: ["sad", "happy", "angry", "tired"], correctAnswer: "happy" },

    { id: "sc2", question: "We use a ___ to keep dry in the rain.", options: ["hat", "coat", "umbrella", "bag"], correctAnswer: "umbrella" },

    { id: "sc3", question: "The sun comes up in the ___.", options: ["evening", "night", "afternoon", "morning"], correctAnswer: "morning" },

    { id: "sc4", question: "Please ___ the door when you leave.", options: ["open", "close", "break", "push"], correctAnswer: "close" },

    { id: "sc5", question: "She ___ her hands before eating.", options: ["claps", "washes", "holds", "waves"], correctAnswer: "washes" },

    { id: "sc6", question: "The ___ shines brightly in the day.", options: ["moon", "star", "sun", "lamp"], correctAnswer: "sun" },

    { id: "sc7", question: "We sleep in our ___ at night.", options: ["kitchen", "bathroom", "bedroom", "garden"], correctAnswer: "bedroom" },

    { id: "sc8", question: "Birds build ___ in trees.", options: ["houses", "nests", "holes", "caves"], correctAnswer: "nests" },

    { id: "sc9", question: "A ___ helps us see in the dark.", options: ["umbrella", "torch", "mirror", "window"], correctAnswer: "torch" },

    { id: "sc10", question: "We wear a ___ on our head.", options: ["shoe", "glove", "hat", "belt"], correctAnswer: "hat" },

    { id: "sc11", question: "A doctor works in a ___.", options: ["school", "shop", "hospital", "park"], correctAnswer: "hospital" },

    { id: "sc12", question: "We cross the road at the ___.", options: ["bridge", "zebra crossing", "garden", "market"], correctAnswer: "zebra crossing" },

    { id: "sc13", question: "Mum uses a ___ to cook food.", options: ["bed", "stove", "chair", "shelf"], correctAnswer: "stove" },

    { id: "sc14", question: "We put food in the ___ to keep it cold.", options: ["oven", "cupboard", "fridge", "drawer"], correctAnswer: "fridge" },

    { id: "sc15", question: "We use a ___ to tell the time.", options: ["mirror", "clock", "phone", "radio"], correctAnswer: "clock" },

    { id: "sc16", question: "He was thirsty so he drank some ___.", options: ["bread", "rice", "water", "cake"], correctAnswer: "water" },

    { id: "sc17", question: "She was cold so she put on a ___.", options: ["dress", "skirt", "jacket", "sandal"], correctAnswer: "jacket" },

    { id: "sc18", question: "The sky is ___ at night.", options: ["blue", "white", "dark", "red"], correctAnswer: "dark" },

    { id: "sc19", question: "We ___ our teeth in the morning.", options: ["wash", "comb", "brush", "clean"], correctAnswer: "brush" },

    { id: "sc20", question: "A ___ delivers letters to our home.", options: ["teacher", "doctor", "postman", "driver"], correctAnswer: "postman" },

    { id: "sc21", question: "We read books in the ___.", options: ["kitchen", "library", "bathroom", "garage"], correctAnswer: "library" },

    { id: "sc22", question: "Fish can ___ in the water.", options: ["fly", "run", "swim", "jump"], correctAnswer: "swim" },

    { id: "sc23", question: "We use ___ to stick things together.", options: ["water", "glue", "paint", "ink"], correctAnswer: "glue" },

    { id: "sc24", question: "The ___ gives us milk, eggs and bread.", options: ["zoo", "school", "farm", "hospital"], correctAnswer: "farm" },

    { id: "sc25", question: "She ___ a picture with crayons.", options: ["wrote", "drew", "sang", "built"], correctAnswer: "drew" },

    { id: "sc26", question: "We should say ___ when someone helps us.", options: ["sorry", "please", "thank you", "hello"], correctAnswer: "thank you" },

    { id: "sc27", question: "A ___ puts out fires.", options: ["policeman", "fireman", "postman", "fisherman"], correctAnswer: "fireman" },

    { id: "sc28", question: "We look both ways before crossing the ___.", options: ["bridge", "river", "road", "park"], correctAnswer: "road" },

    { id: "sc29", question: "Mother told me not to ___ with my food.", options: ["eat", "cook", "play", "share"], correctAnswer: "play" },

    { id: "sc30", question: "We must ___ in line and wait for our turn.", options: ["run", "queue", "jump", "push"], correctAnswer: "queue" },

    { id: "sc31", question: "The ___ is barking loudly.", options: ["cat", "bird", "dog", "fish"], correctAnswer: "dog" },

    { id: "sc32", question: "She is ___ a letter to her grandmother.", options: ["reading", "writing", "drawing", "singing"], correctAnswer: "writing" },

    { id: "sc33", question: "He ___ up early every morning.", options: ["wakes", "sleeps", "eats", "plays"], correctAnswer: "wakes" },

    { id: "sc34", question: "The farmer grows ___ in his field.", options: ["toys", "books", "vegetables", "animals"], correctAnswer: "vegetables" },

    { id: "sc35", question: "We use a ___ to measure things.", options: ["pen", "ruler", "brush", "string"], correctAnswer: "ruler" },

    { id: "sc36", question: "The nurse helps ___ people.", options: ["happy", "sick", "rich", "young"], correctAnswer: "sick" },

    { id: "sc37", question: "We fly a ___ on a windy day.", options: ["ball", "kite", "plane", "bird"], correctAnswer: "kite" },

    { id: "sc38", question: "She ___ her homework after school.", options: ["plays", "does", "throws", "breaks"], correctAnswer: "does" },

    { id: "sc39", question: "The ___ drives the bus.", options: ["teacher", "driver", "cook", "pilot"], correctAnswer: "driver" },

    { id: "sc40", question: "We must ___ our hands before meals.", options: ["clap", "wave", "wash", "hide"], correctAnswer: "wash" },

  ],

 
  wordMeaning: [

    { id: "wm1", question: "What does 'gigantic' mean?", options: ["Very small", "Very big", "Very fast", "Very slow"], correctAnswer: "Very big" },

    { id: "wm2", question: "What does 'tiny' mean?", options: ["Very big", "Very tall", "Very small", "Very long"], correctAnswer: "Very small" },

    { id: "wm3", question: "What does 'gloomy' mean?", options: ["Happy", "Bright", "Dark and sad", "Funny"], correctAnswer: "Dark and sad" },

    { id: "wm4", question: "What does 'joyful' mean?", options: ["Angry", "Sad", "Scared", "Very happy"], correctAnswer: "Very happy" },

    { id: "wm5", question: "What does 'swift' mean?", options: ["Very fast", "Very slow", "Very big", "Very tall"], correctAnswer: "Very fast" },

    { id: "wm6", question: "What does 'chilly' mean?", options: ["Hot", "Warm", "Cold", "Wet"], correctAnswer: "Cold" },

    { id: "wm7", question: "What does 'furious' mean?", options: ["Happy", "Very angry", "Tired", "Scared"], correctAnswer: "Very angry" },

    { id: "wm8", question: "What does 'brave' mean?", options: ["Scared", "Not afraid", "Sad", "Tired"], correctAnswer: "Not afraid" },

    { id: "wm9", question: "What does 'enormous' mean?", options: ["Very small", "Very loud", "Very big", "Very thin"], correctAnswer: "Very big" },

    { id: "wm10", question: "What does 'exhausted' mean?", options: ["Very happy", "Very tired", "Very angry", "Very hungry"], correctAnswer: "Very tired" },

    { id: "wm11", question: "What does 'elderly' mean?", options: ["Young", "Old", "Strong", "Small"], correctAnswer: "Old" },

    { id: "wm12", question: "What does 'delicious' mean?", options: ["Very bad", "Very tasty", "Very hot", "Very cold"], correctAnswer: "Very tasty" },

    { id: "wm13", question: "What does 'gentle' mean?", options: ["Rough", "Soft and kind", "Loud", "Fast"], correctAnswer: "Soft and kind" },

    { id: "wm14", question: "What does 'clever' mean?", options: ["Silly", "Smart", "Slow", "Lazy"], correctAnswer: "Smart" },

    { id: "wm15", question: "What does 'terrified' mean?", options: ["Very happy", "Very brave", "Very scared", "Very tired"], correctAnswer: "Very scared" },

    { id: "wm16", question: "What does 'ancient' mean?", options: ["Very new", "Very old", "Very big", "Very small"], correctAnswer: "Very old" },

    { id: "wm17", question: "What does 'filthy' mean?", options: ["Very clean", "Very dirty", "Very bright", "Very dark"], correctAnswer: "Very dirty" },

    { id: "wm18", question: "What does 'generous' mean?", options: ["Mean", "Likes to give", "Shy", "Lazy"], correctAnswer: "Likes to give" },

    { id: "wm19", question: "What does 'curious' mean?", options: ["Angry", "Sleepy", "Wanting to know", "Lazy"], correctAnswer: "Wanting to know" },

    { id: "wm20", question: "What does 'soggy' mean?", options: ["Very dry", "Very wet", "Very hot", "Very hard"], correctAnswer: "Very wet" },

    { id: "wm21", question: "What does 'fierce' mean?", options: ["Gentle", "Wild and strong", "Small", "Quiet"], correctAnswer: "Wild and strong" },

    { id: "wm22", question: "What does 'miserable' mean?", options: ["Very happy", "Very sad", "Very excited", "Very funny"], correctAnswer: "Very sad" },

    { id: "wm23", question: "What does 'shy' mean?", options: ["Loud", "Brave", "Quiet and nervous", "Angry"], correctAnswer: "Quiet and nervous" },

    { id: "wm24", question: "What does 'tasty' mean?", options: ["Looks nice", "Smells bad", "Nice to eat", "Very big"], correctAnswer: "Nice to eat" },

    { id: "wm25", question: "What does 'weary' mean?", options: ["Very happy", "Very tired", "Very cold", "Very hot"], correctAnswer: "Very tired" },

    { id: "wm26", question: "What does 'gleaming' mean?", options: ["Dirty", "Dark", "Shining brightly", "Wet"], correctAnswer: "Shining brightly" },

    { id: "wm27", question: "What does 'rapid' mean?", options: ["Slow", "Very quick", "Heavy", "Light"], correctAnswer: "Very quick" },

    { id: "wm28", question: "What does 'damp' mean?", options: ["Very dry", "A little wet", "Very hot", "Very cold"], correctAnswer: "A little wet" },

    { id: "wm29", question: "What does 'gust' mean?", options: ["A flash of light", "A burst of wind", "A drop of rain", "A loud sound"], correctAnswer: "A burst of wind" },

    { id: "wm30", question: "What does 'tremble' mean?", options: ["To laugh", "To shake", "To run", "To hide"], correctAnswer: "To shake" },

  ],
 
  punctuation: [

    { id: "p1", question: "Which sentence has correct punctuation?", options: ["i like cats", "I like cats.", "I like cats", "i like cats."], correctAnswer: "I like cats." },

    { id: "p2", question: "Which sentence has correct punctuation?", options: ["What is your name", "what is your name?", "What is your name?", "What Is Your Name"], correctAnswer: "What is your name?" },

    { id: "p3", question: "What goes at the end of a question?", options: ["Full stop (.)", "Question mark (?)", "Comma (,)", "Exclamation (!)"], correctAnswer: "Question mark (?)" },

    { id: "p4", question: "What goes at the end of a statement?", options: ["Full stop (.)", "Question mark (?)", "Comma (,)", "Exclamation (!)"], correctAnswer: "Full stop (.)" },

    { id: "p5", question: "Which word should start with a capital letter?", options: ["dog", "table", "monday", "happy"], correctAnswer: "monday" },

    { id: "p6", question: "Which sentence is correct?", options: ["she is nice.", "She is nice.", "she is nice", "She Is Nice"], correctAnswer: "She is nice." },

    { id: "p7", question: "What mark shows excitement?", options: ["Full stop (.)", "Question mark (?)", "Comma (,)", "Exclamation mark (!)"], correctAnswer: "Exclamation mark (!)" },

    { id: "p8", question: "Which needs a capital letter?", options: ["chair", "cat", "james", "run"], correctAnswer: "james" },

    { id: "p9", question: "Which sentence is correct?", options: ["Help! Shouted Tom.", "help! shouted tom.", "\"Help!\" shouted Tom.", "\"help!\" Shouted Tom."], correctAnswer: "\"Help!\" shouted Tom." },

    { id: "p10", question: "Where does the comma go? 'I like apples bananas and grapes.'", options: ["After 'like'", "After 'apples' and 'bananas'", "After 'and'", "After 'grapes'"], correctAnswer: "After 'apples' and 'bananas'" },

    { id: "p11", question: "Which is correct?", options: ["the cat sat.", "The cat sat.", "The Cat Sat.", "THE CAT SAT."], correctAnswer: "The cat sat." },

    { id: "p12", question: "A person's name should start with a ___.", options: ["small letter", "capital letter", "number", "full stop"], correctAnswer: "capital letter" },

    { id: "p13", question: "Which sentence is correct?", options: ["wow!", "Wow!", "wow", "WOW"], correctAnswer: "Wow!" },

    { id: "p14", question: "Which needs a capital letter?", options: ["pencil", "singapore", "running", "purple"], correctAnswer: "singapore" },

    { id: "p15", question: "The first word of a sentence starts with a ___.", options: ["number", "full stop", "capital letter", "small letter"], correctAnswer: "capital letter" },

    { id: "p16", question: "Which is correct?", options: ["I am 7 years old", "I am 7 years old.", "i am 7 years old.", "i am 7 years old"], correctAnswer: "I am 7 years old." },

    { id: "p17", question: "Which is correct?", options: ["Do you like ice cream.", "Do you like ice cream?", "do you like ice cream?", "Do you like ice cream"], correctAnswer: "Do you like ice cream?" },

    { id: "p18", question: "Which needs a full stop?", options: ["What time is it", "How are you", "I have a cat", "Where is Tom"], correctAnswer: "I have a cat" },

    { id: "p19", question: "Which is correct?", options: ["Im happy.", "I'm happy.", "im happy.", "i'm happy."], correctAnswer: "I'm happy." },

    { id: "p20", question: "Which word always has a capital letter?", options: ["she", "I", "he", "we"], correctAnswer: "I" },

  ],
 
  vocabulary2: [

    { id: "v2_1", question: "Which word means the same as 'quick'?", options: ["Slow", "Fast", "Tall", "Short"], correctAnswer: "Fast" },

    { id: "v2_2", question: "Which word means the same as 'begin'?", options: ["End", "Stop", "Start", "Close"], correctAnswer: "Start" },

    { id: "v2_3", question: "Which word means the same as 'glad'?", options: ["Sad", "Happy", "Angry", "Tired"], correctAnswer: "Happy" },

    { id: "v2_4", question: "Which word means the same as 'shut'?", options: ["Open", "Close", "Break", "Fix"], correctAnswer: "Close" },

    { id: "v2_5", question: "Which word means the same as 'large'?", options: ["Small", "Thin", "Big", "Short"], correctAnswer: "Big" },

    { id: "v2_6", question: "Which word means the same as 'ill'?", options: ["Happy", "Sick", "Strong", "Well"], correctAnswer: "Sick" },

    { id: "v2_7", question: "Which word means the same as 'afraid'?", options: ["Brave", "Happy", "Scared", "Angry"], correctAnswer: "Scared" },

    { id: "v2_8", question: "Which word means the same as 'under'?", options: ["Above", "Over", "Below", "Beside"], correctAnswer: "Below" },

    { id: "v2_9", question: "Which word means the same as 'shout'?", options: ["Whisper", "Yell", "Sing", "Talk"], correctAnswer: "Yell" },

    { id: "v2_10", question: "Which word means the same as 'pretty'?", options: ["Ugly", "Beautiful", "Plain", "Boring"], correctAnswer: "Beautiful" },

    { id: "v2_11", question: "Which word means the same as 'repair'?", options: ["Break", "Fix", "Throw", "Cut"], correctAnswer: "Fix" },

    { id: "v2_12", question: "Which word means the same as 'skinny'?", options: ["Fat", "Thin", "Tall", "Short"], correctAnswer: "Thin" },

    { id: "v2_13", question: "Which word means the same as 'grin'?", options: ["Cry", "Frown", "Smile", "Yawn"], correctAnswer: "Smile" },

    { id: "v2_14", question: "Which word means the same as 'leap'?", options: ["Walk", "Run", "Jump", "Crawl"], correctAnswer: "Jump" },

    { id: "v2_15", question: "Which word means the same as 'correct'?", options: ["Wrong", "Right", "Bad", "Slow"], correctAnswer: "Right" },

    { id: "v2_16", question: "Which word means the same as 'pal'?", options: ["Enemy", "Stranger", "Friend", "Teacher"], correctAnswer: "Friend" },

    { id: "v2_17", question: "Which word means the same as 'spotless'?", options: ["Dirty", "Clean", "Old", "New"], correctAnswer: "Clean" },

    { id: "v2_18", question: "Which word means the same as 'wealthy'?", options: ["Poor", "Rich", "Sad", "Hungry"], correctAnswer: "Rich" },

    { id: "v2_19", question: "Which word means the same as 'gaze'?", options: ["Listen", "Touch", "Look", "Smell"], correctAnswer: "Look" },

    { id: "v2_20", question: "Which word means the same as 'naughty'?", options: ["Good", "Polite", "Bad", "Kind"], correctAnswer: "Bad" },

    { id: "v2_21", question: "A baby cow is called a ___.", options: ["Puppy", "Kitten", "Calf", "Lamb"], correctAnswer: "Calf" },

    { id: "v2_22", question: "A baby sheep is called a ___.", options: ["Puppy", "Kitten", "Calf", "Lamb"], correctAnswer: "Lamb" },

    { id: "v2_23", question: "A group of fish is called a ___.", options: ["Flock", "Herd", "Pack", "School"], correctAnswer: "School" },

    { id: "v2_24", question: "A group of birds is called a ___.", options: ["Flock", "Herd", "Pack", "School"], correctAnswer: "Flock" },

    { id: "v2_25", question: "A person who bakes bread is a ___.", options: ["Farmer", "Baker", "Teacher", "Driver"], correctAnswer: "Baker" },

    { id: "v2_26", question: "A person who flies a plane is a ___.", options: ["Driver", "Sailor", "Pilot", "Captain"], correctAnswer: "Pilot" },

    { id: "v2_27", question: "We get wool from a ___.", options: ["Cow", "Sheep", "Goat", "Hen"], correctAnswer: "Sheep" },

    { id: "v2_28", question: "We get eggs from a ___.", options: ["Cow", "Sheep", "Dog", "Hen"], correctAnswer: "Hen" },

    { id: "v2_29", question: "A place where we borrow books is a ___.", options: ["Shop", "School", "Library", "Hospital"], correctAnswer: "Library" },

    { id: "v2_30", question: "A place where planes take off is an ___.", options: ["Station", "Airport", "Port", "Park"], correctAnswer: "Airport" },

    { id: "v2_31", question: "Which is NOT a colour?", options: ["Red", "Orange", "Table", "Blue"], correctAnswer: "Table" },

    { id: "v2_32", question: "Which is NOT a day of the week?", options: ["Monday", "March", "Friday", "Sunday"], correctAnswer: "March" },

    { id: "v2_33", question: "Which is NOT a month?", options: ["June", "April", "Thursday", "December"], correctAnswer: "Thursday" },

    { id: "v2_34", question: "Which does NOT belong in a kitchen?", options: ["Plate", "Spoon", "Pillow", "Cup"], correctAnswer: "Pillow" },

    { id: "v2_35", question: "Which is NOT a pet?", options: ["Cat", "Dog", "Shark", "Hamster"], correctAnswer: "Shark" },

    { id: "v2_36", question: "Which cannot swim?", options: ["Duck", "Fish", "Cat", "Whale"], correctAnswer: "Cat" },

    { id: "v2_37", question: "Which is NOT a shape?", options: ["Circle", "Square", "Green", "Triangle"], correctAnswer: "Green" },

    { id: "v2_38", question: "Which is NOT a transport?", options: ["Bus", "Train", "Chair", "Car"], correctAnswer: "Chair" },

    { id: "v2_39", question: "Which one is NOT food?", options: ["Bread", "Rice", "Shoe", "Noodles"], correctAnswer: "Shoe" },

    { id: "v2_40", question: "Which cannot fly?", options: ["Eagle", "Penguin", "Sparrow", "Parrot"], correctAnswer: "Penguin" },

  ],
 
  grammar2: [

    { id: "g2_1", question: "Choose: He ___ to the market yesterday.", options: ["go", "goes", "went", "going"], correctAnswer: "went" },

    { id: "g2_2", question: "Choose: She ___ playing now.", options: ["is", "was", "are", "were"], correctAnswer: "is" },

    { id: "g2_3", question: "Choose: They ___ here last week.", options: ["come", "comes", "came", "coming"], correctAnswer: "came" },

    { id: "g2_4", question: "Choose: I ___ a good dream last night.", options: ["have", "has", "had", "having"], correctAnswer: "had" },

    { id: "g2_5", question: "Choose: She ___ her lunch already.", options: ["eat", "eats", "ate", "has eaten"], correctAnswer: "has eaten" },

    { id: "g2_6", question: "Choose: We ___ go to school tomorrow.", options: ["will", "was", "is", "are"], correctAnswer: "will" },

    { id: "g2_7", question: "Choose: The dog ___ at the cat yesterday.", options: ["bark", "barks", "barked", "barking"], correctAnswer: "barked" },

    { id: "g2_8", question: "Choose: She can ___ very fast.", options: ["runs", "ran", "running", "run"], correctAnswer: "run" },

    { id: "g2_9", question: "Choose: They ___ not finish their work yet.", options: ["do", "did", "have", "has"], correctAnswer: "have" },

    { id: "g2_10", question: "Choose: He always ___ his homework.", options: ["do", "does", "did", "done"], correctAnswer: "does" },

    { id: "g2_11", question: "Choose: ___ you coming to the party?", options: ["Is", "Am", "Are", "Was"], correctAnswer: "Are" },

    { id: "g2_12", question: "Choose: She ___ to sing every morning.", options: ["like", "likes", "liked", "liking"], correctAnswer: "likes" },

    { id: "g2_13", question: "Choose: I ___ seen that movie before.", options: ["have", "has", "had", "having"], correctAnswer: "have" },

    { id: "g2_14", question: "Choose: The baby ___ now.", options: ["sleep", "sleeps", "is sleeping", "slept"], correctAnswer: "is sleeping" },

    { id: "g2_15", question: "Choose: My mother ___ me a story last night.", options: ["tell", "tells", "told", "telling"], correctAnswer: "told" },

    { id: "g2_16", question: "Choose: We should ___ kind to others.", options: ["is", "am", "are", "be"], correctAnswer: "be" },

    { id: "g2_17", question: "Choose: He ___ football every Saturday.", options: ["play", "plays", "played", "playing"], correctAnswer: "plays" },

    { id: "g2_18", question: "Choose: ___ you help me, please?", options: ["Do", "Can", "Is", "Are"], correctAnswer: "Can" },

    { id: "g2_19", question: "Choose: She ___ not want to go.", options: ["do", "does", "is", "are"], correctAnswer: "does" },

    { id: "g2_20", question: "Choose: I ___ to the park every evening.", options: ["go", "goes", "went", "going"], correctAnswer: "go" },

    { id: "g2_21", question: "Choose: Tom and Jerry ___ friends.", options: ["is", "am", "are", "was"], correctAnswer: "are" },

    { id: "g2_22", question: "Choose: My bag is ___ than yours.", options: ["big", "bigger", "biggest", "more big"], correctAnswer: "bigger" },

    { id: "g2_23", question: "Choose: She is the ___ girl in class.", options: ["tall", "taller", "tallest", "more tall"], correctAnswer: "tallest" },

    { id: "g2_24", question: "Choose: This book is ___ than that one.", options: ["good", "better", "best", "more good"], correctAnswer: "better" },

    { id: "g2_25", question: "Choose: He runs ___ than me.", options: ["fast", "faster", "fastest", "more fast"], correctAnswer: "faster" },

    { id: "g2_26", question: "Choose: I like ___ and swimming.", options: ["read", "reading", "reads", "to reads"], correctAnswer: "reading" },

    { id: "g2_27", question: "Choose: She asked me ___ I was okay.", options: ["if", "is", "that", "what"], correctAnswer: "if" },

    { id: "g2_28", question: "Choose: I will come ___ it does not rain.", options: ["but", "if", "so", "because"], correctAnswer: "if" },

    { id: "g2_29", question: "Choose: He was late ___ he missed the bus.", options: ["so", "but", "if", "because"], correctAnswer: "because" },

    { id: "g2_30", question: "Choose: I am hungry ___ I want to eat.", options: ["but", "because", "so", "if"], correctAnswer: "so" },

  ],
 
  readingClues: [

    { id: "rc1", question: "The boy put on his swimming trunks. He is going to the ___.", options: ["Library", "Pool", "School", "Market"], correctAnswer: "Pool" },

    { id: "rc2", question: "She picked up a spoon and bowl. She wants to eat ___.", options: ["Soup", "Bread", "Cake", "Pizza"], correctAnswer: "Soup" },

    { id: "rc3", question: "He packed his bag with books. He is going to ___.", options: ["The park", "School", "The beach", "The zoo"], correctAnswer: "School" },

    { id: "rc4", question: "Mum lit the candles on the cake. It is someone's ___.", options: ["Holiday", "Birthday", "Bedtime", "Lunchtime"], correctAnswer: "Birthday" },

    { id: "rc5", question: "She is holding a watering can near the plants. She wants to ___.", options: ["Cook", "Clean", "Water them", "Eat"], correctAnswer: "Water them" },

    { id: "rc6", question: "He put stamps on the envelope. He wants to ___ a letter.", options: ["Read", "Write", "Post", "Open"], correctAnswer: "Post" },

    { id: "rc7", question: "The girl has a paintbrush and paper. She wants to ___.", options: ["Write", "Paint", "Cook", "Sew"], correctAnswer: "Paint" },

    { id: "rc8", question: "Father is holding a fishing rod. He is going ___.", options: ["Shopping", "Fishing", "Swimming", "Running"], correctAnswer: "Fishing" },

    { id: "rc9", question: "She is wearing a helmet and knee pads. She is going ___.", options: ["Swimming", "Cycling", "Cooking", "Reading"], correctAnswer: "Cycling" },

    { id: "rc10", question: "The boy is holding a bat and ball. He wants to play ___.", options: ["Football", "Tennis", "Cricket", "Chess"], correctAnswer: "Cricket" },

    { id: "rc11", question: "Grandma is holding knitting needles and wool. She is ___.", options: ["Cooking", "Knitting", "Reading", "Cleaning"], correctAnswer: "Knitting" },

    { id: "rc12", question: "The man is wearing a white coat and has a stethoscope. He is a ___.", options: ["Teacher", "Chef", "Doctor", "Fireman"], correctAnswer: "Doctor" },

    { id: "rc13", question: "She is standing in front of a blackboard. She is a ___.", options: ["Nurse", "Teacher", "Cook", "Driver"], correctAnswer: "Teacher" },

    { id: "rc14", question: "He is wearing a tall white hat and an apron. He is a ___.", options: ["Doctor", "Policeman", "Chef", "Pilot"], correctAnswer: "Chef" },

    { id: "rc15", question: "The lady is scanning books. She works in a ___.", options: ["Hospital", "Library", "Kitchen", "Garden"], correctAnswer: "Library" },

    { id: "rc16", question: "The leaves are falling. It is ___.", options: ["Spring", "Summer", "Autumn", "Winter"], correctAnswer: "Autumn" },

    { id: "rc17", question: "There is snow on the ground. It is ___.", options: ["Spring", "Summer", "Autumn", "Winter"], correctAnswer: "Winter" },

    { id: "rc18", question: "Flowers are blooming everywhere. It is ___.", options: ["Spring", "Summer", "Autumn", "Winter"], correctAnswer: "Spring" },

    { id: "rc19", question: "The ice cream is melting fast. It must be very ___.", options: ["Cold", "Hot", "Rainy", "Windy"], correctAnswer: "Hot" },

    { id: "rc20", question: "The kite is flying high. It must be very ___.", options: ["Cold", "Hot", "Rainy", "Windy"], correctAnswer: "Windy" },

    { id: "rc21", question: "She is putting on sunscreen. She is going to the ___.", options: ["Library", "Beach", "School", "Market"], correctAnswer: "Beach" },

    { id: "rc22", question: "He is lining up with a tray. He is in the ___.", options: ["Classroom", "Canteen", "Garden", "Library"], correctAnswer: "Canteen" },

    { id: "rc23", question: "She is trying on shoes. She is at the ___.", options: ["Library", "School", "Shop", "Park"], correctAnswer: "Shop" },

    { id: "rc24", question: "The audience is clapping. The show has ___.", options: ["Started", "Ended", "Stopped", "Paused"], correctAnswer: "Ended" },

    { id: "rc25", question: "He is blowing his nose. He probably has a ___.", options: ["Headache", "Cold", "Fever", "Cut"], correctAnswer: "Cold" },

    { id: "rc26", question: "She is smiling and jumping. She is very ___.", options: ["Sad", "Angry", "Happy", "Tired"], correctAnswer: "Happy" },

    { id: "rc27", question: "He is frowning and stamping his feet. He is ___.", options: ["Happy", "Angry", "Excited", "Sleepy"], correctAnswer: "Angry" },

    { id: "rc28", question: "Her eyes are red and she is sniffling. She has been ___.", options: ["Laughing", "Crying", "Running", "Eating"], correctAnswer: "Crying" },

    { id: "rc29", question: "He is stretching and yawning. He is feeling ___.", options: ["Hungry", "Excited", "Sleepy", "Angry"], correctAnswer: "Sleepy" },

    { id: "rc30", question: "She is rubbing her tummy. She is probably ___.", options: ["Tired", "Cold", "Hungry", "Scared"], correctAnswer: "Hungry" },

    { id: "rc31", question: "He brought an umbrella. He thinks it will ___.", options: ["Be sunny", "Rain", "Snow", "Be windy"], correctAnswer: "Rain" },

    { id: "rc32", question: "She is packing a suitcase. She is going on a ___.", options: ["Trip", "Walk", "Run", "Diet"], correctAnswer: "Trip" },

    { id: "rc33", question: "The alarm clock is ringing. It is time to ___.", options: ["Sleep", "Eat", "Wake up", "Play"], correctAnswer: "Wake up" },

    { id: "rc34", question: "She is setting the table with plates and cups. It is time for ___.", options: ["Sleep", "A meal", "School", "Play"], correctAnswer: "A meal" },

    { id: "rc35", question: "He is turning off the light. It is time to ___.", options: ["Wake up", "Eat", "Sleep", "Play"], correctAnswer: "Sleep" },

  ],

};

// Flatten all questions into a single array with category labels

export const allQuestions = Object.entries(questions).flatMap(([category, items]) =>

  items.map(q => ({ ...q, category }))

);
 
export const categories = [

  { id: 'vocabulary', name: 'Vocabulary', icon: '📖', color: 'from-blue-400 to-blue-600', count: questions.vocabulary.length },

  { id: 'grammar', name: 'Grammar', icon: '✏️', color: 'from-purple-400 to-purple-600', count: questions.grammar.length },

  { id: 'opposites', name: 'Opposites', icon: '🔄', color: 'from-pink-400 to-pink-600', count: questions.opposites.length },

  { id: 'rhyming', name: 'Rhyming Words', icon: '🎵', color: 'from-yellow-400 to-orange-500', count: questions.rhyming.length },

  { id: 'numbers', name: 'Numbers & Maths', icon: '🔢', color: 'from-green-400 to-green-600', count: questions.numbers.length },

  { id: 'comprehension', name: 'Comprehension', icon: '📚', color: 'from-indigo-400 to-indigo-600', count: questions.comprehension.length },

  { id: 'spelling', name: 'Spelling', icon: '🔤', color: 'from-red-400 to-red-600', count: questions.spelling.length },

  { id: 'sentenceCompletion', name: 'Sentence Completion', icon: '📝', color: 'from-teal-400 to-teal-600', count: questions.sentenceCompletion.length },

  { id: 'wordMeaning', name: 'Word Meanings', icon: '💡', color: 'from-amber-400 to-amber-600', count: questions.wordMeaning.length },

  { id: 'punctuation', name: 'Punctuation', icon: '❗', color: 'from-rose-400 to-rose-600', count: questions.punctuation.length },

  { id: 'vocabulary2', name: 'Synonyms & Groups', icon: '🧩', color: 'from-cyan-400 to-cyan-600', count: questions.vocabulary2.length },

  { id: 'grammar2', name: 'Grammar (Advanced)', icon: '📐', color: 'from-violet-400 to-violet-600', count: questions.grammar2.length },

  { id: 'readingClues', name: 'Reading Clues', icon: '🔍', color: 'from-emerald-400 to-teal-600', count: questions.readingClues.length },

];
 
export const getQuestionsByCategory = (categoryId) => questions[categoryId] || [];

export const getTotalQuestionCount = () => allQuestions.length;
 
export default questions;