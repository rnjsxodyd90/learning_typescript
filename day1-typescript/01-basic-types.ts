// ============================================================================
// 01-basic-types.ts -- Your Very First TypeScript File (INTERACTIVE VERSION)
// ============================================================================
//
// HOW TO RUN THIS FILE:
//   Open your terminal, navigate to this folder, and type:
//   tsx 01-basic-types.ts
//
// WHAT YOU WILL LEARN:
//   - What a "variable" is
//   - The difference between "let" and "const"
//   - The basic types: string, number, boolean
//   - Why types matter
//   - What arrays are
//   - How to use "console.log" to see output
//
// ============================================================================

import * as readline from "readline";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function ask(question: string): Promise<string> {
  return new Promise((resolve) => {
    rl.question(question, (answer) => resolve(answer.trim()));
  });
}

function colorGreen(text: string): string {
  return `\x1b[32m${text}\x1b[0m`;
}
function colorRed(text: string): string {
  return `\x1b[31m${text}\x1b[0m`;
}
function colorYellow(text: string): string {
  return `\x1b[33m${text}\x1b[0m`;
}
function colorCyan(text: string): string {
  return `\x1b[36m${text}\x1b[0m`;
}

let score = 0;
let totalQuestions = 0;

async function quiz(question: string, correctAnswer: string, hint?: string): Promise<void> {
  totalQuestions++;
  console.log("");
  const answer = await ask(colorCyan(`  QUIZ: ${question}\n  > `));
  if (answer.toLowerCase() === correctAnswer.toLowerCase()) {
    score++;
    console.log(colorGreen(`  CORRECT! ✓`));
  } else {
    console.log(colorRed(`  Not quite. The answer is: ${correctAnswer}`));
    if (hint) console.log(colorYellow(`  Remember: ${hint}`));
  }
}

async function predict(code: string, correctOutput: string, explanation: string): Promise<void> {
  totalQuestions++;
  console.log("");
  console.log(colorCyan("  PREDICT THE OUTPUT:"));
  console.log(`  ${colorYellow(code)}`);
  const answer = await ask(colorCyan("  What will this print? > "));
  if (answer.toLowerCase() === correctOutput.toLowerCase()) {
    score++;
    console.log(colorGreen(`  CORRECT! It prints: ${correctOutput}`));
  } else {
    console.log(colorRed(`  Answer: ${correctOutput}`));
    console.log(colorYellow(`  Why: ${explanation}`));
  }
}

async function pause(): Promise<void> {
  await ask(colorYellow("\n  Press Enter to continue..."));
}

async function main() {
  console.log("============================================================");
  console.log("  WELCOME TO TYPESCRIPT -- INTERACTIVE LESSON 1");
  console.log("  Basic Types: string, number, boolean, arrays");
  console.log("============================================================");
  console.log("");
  console.log("  You'll learn by reading code, then answering questions.");
  console.log("  Don't worry about getting things wrong -- that's how you learn!");

  await pause();

  // ============================================================================
  // SECTION 1: console.log
  // ============================================================================

  console.log("\n============================================================");
  console.log("  SECTION 1: What is console.log?");
  console.log("============================================================\n");

  console.log('  "console.log" is how we PRINT things to the screen.');
  console.log('  Think of it like "say this out loud so I can see it."');
  console.log("  Everything inside the parentheses () gets printed.\n");

  console.log("  Example:");
  
  console.log('    console.log("Hello!")    -->  prints: Hello!');
  console.log('    console.log(42)          -->  prints: 42');
  console.log('    console.log(true)        -->  prints: true');

  await predict(
    'console.log("I am learning TypeScript")',
    "I am learning TypeScript",
    "console.log prints exactly what's between the quotes."
  );

  await pause();

  // ============================================================================
  // SECTION 2: Variables
  // ============================================================================

  console.log("\n============================================================");
  console.log("  SECTION 2: What is a Variable?");
  console.log("============================================================\n");

  console.log("  A variable is like a LABELED BOX.\n");
  console.log("  Imagine you have a box. You write 'myAge' on the outside.");
  console.log("  Inside the box, you put the number 25.");
  console.log("  Now whenever you say 'myAge', you get 25.\n");
  console.log("  In TypeScript, creating a variable looks like this:\n");
  console.log(colorYellow("    let myAge: number = 25;"));
  console.log("");
  console.log("  Let's break that down piece by piece:");
  console.log('    let      --> "I want to create a new variable" (a new box)');
  console.log("    myAge    --> the NAME of the variable (the label on the box)");
  console.log("    : number --> the TYPE (this box can ONLY hold numbers)");
  console.log("    = 25     --> the VALUE we are putting inside the box");
  console.log('    ;        --> end of this instruction (like a period in English)');

  await quiz(
    'In "let myAge: number = 25;", what does ": number" do?',
    "sets the type",
    "The colon followed by a type tells TypeScript what kind of value the variable can hold."
  );

  console.log("\n  Now watch what happens when we use the variable:\n");

  let myAge: number = 25;
  console.log(colorYellow("    let myAge: number = 25;"));
  console.log(`    console.log(myAge)  -->  ${myAge}`);

  myAge = 26;
  console.log(colorYellow("\n    myAge = 26;   // We can CHANGE a 'let' variable"));
  console.log(`    console.log(myAge)  -->  ${myAge}`);

  await predict(
    "let x: number = 10;\nx = x + 5;\nconsole.log(x)",
    "15",
    "x starts at 10, then x + 5 = 15 gets stored back into x."
  );

  await pause();

  // ============================================================================
  // SECTION 3: let vs const
  // ============================================================================

  console.log("\n============================================================");
  console.log("  SECTION 3: let vs const");
  console.log("============================================================\n");

  console.log("  There are TWO ways to create variables:\n");
  console.log(colorGreen("    let   = the value CAN change later   (like a whiteboard)"));
  console.log(colorRed("    const = the value can NEVER change    (like a tattoo)\n"));

  console.log("  Examples:");
  console.log(colorYellow('    let   currentCity: string = "New York";  // CAN change'));
  console.log(colorYellow("    const birthYear: number = 1999;          // can NEVER change\n"));

  let currentCity: string = "New York";
  const birthYear: number = 1999;

  console.log(`    currentCity is: ${currentCity}`);
  currentCity = "Los Angeles";
  console.log(`    After: currentCity = "Los Angeles"  -->  ${currentCity}  (allowed!)`);
  console.log(`\n    birthYear is: ${birthYear}`);
  console.log('    If we try: birthYear = 2000  -->  ERROR! Cannot change a const.');

  await quiz(
    "Which keyword would you use for someone's name that never changes: let or const?",
    "const",
    "Use 'const' when the value should never change. A name is permanent."
  );

  await quiz(
    "Which keyword for a game score that goes up: let or const?",
    "let",
    "Use 'let' when the value will change. A score changes as you play."
  );

  await pause();

  // ============================================================================
  // SECTION 4: Strings
  // ============================================================================

  console.log("\n============================================================");
  console.log("  SECTION 4: The string Type (Text)");
  console.log("============================================================\n");

  console.log('  A "string" is just TEXT. Words, sentences, names -- anything in quotes.');
  console.log('  You can use "double quotes", \'single quotes\', or `backticks`.\n');

  let firstName: string = "John";
  let lastName: string = "Doe";

  console.log(colorYellow('    let firstName: string = "John";'));
  console.log(colorYellow('    let lastName: string = "Doe";\n'));
  console.log(`    firstName is: ${firstName}`);
  console.log(`    lastName is: ${lastName}`);

  console.log("\n  SUPERPOWER: Template Literals (backticks)");
  console.log("  Backticks let you INSERT variables into text using ${variableName}\n");
  console.log(colorYellow("    `Hello, my name is ${firstName} ${lastName}!`"));
  console.log(`    Result: Hello, my name is ${firstName} ${lastName}!`);

  await predict(
    'let animal: string = "cat";\nconsole.log(`I have a ${animal}`)',
    "I have a cat",
    "${animal} gets replaced with the value of the variable: 'cat'."
  );

  console.log("\n  You can even do math inside ${}:");
  console.log(colorYellow("    `Next year I will be ${26 + 1} years old`"));
  console.log(`    Result: Next year I will be ${26 + 1} years old`);

  await predict(
    "let a: number = 3;\nlet b: number = 4;\nconsole.log(`Sum is ${a + b}`)",
    "Sum is 7",
    "${a + b} calculates 3 + 4 = 7 and inserts it into the string."
  );

  await pause();

  // ============================================================================
  // SECTION 5: Numbers
  // ============================================================================

  console.log("\n============================================================");
  console.log("  SECTION 5: The number Type");
  console.log("============================================================\n");

  console.log('  A "number" is any number: whole, decimal, or negative.');
  console.log("  Unlike some languages, TypeScript does NOT separate");
  console.log('  integers from decimals. They are ALL just "number."\n');

  let temperature: number = 72;
  let price: number = 9.99;
  let belowZero: number = -15;

  console.log(colorYellow("    let temperature: number = 72;"));
  console.log(colorYellow("    let price: number = 9.99;"));
  console.log(colorYellow("    let belowZero: number = -15;\n"));

  console.log("  Common math operators:");
  console.log("    +  addition        (5 + 3 = 8)");
  console.log("    -  subtraction     (5 - 3 = 2)");
  console.log("    *  multiplication  (5 * 3 = 15)");
  console.log("    /  division        (6 / 3 = 2)");
  console.log("    %  remainder       (7 % 3 = 1)");

  await predict(
    "let price: number = 10;\nlet quantity: number = 3;\nconsole.log(price * quantity)",
    "30",
    "10 * 3 = 30. The * operator multiplies numbers."
  );

  await predict(
    "console.log(7 % 2)",
    "1",
    "% gives the remainder. 7 / 2 = 3 remainder 1."
  );

  await pause();

  // ============================================================================
  // SECTION 6: Booleans
  // ============================================================================

  console.log("\n============================================================");
  console.log("  SECTION 6: The boolean Type (True or False)");
  console.log("============================================================\n");

  console.log('  A "boolean" can ONLY be: true or false. Nothing else.\n');
  console.log("  Real-world examples:");
  console.log("    Is the light on?        true or false");
  console.log("    Is the user logged in?  true or false");
  console.log("    Is it raining?          true or false\n");

  console.log(colorYellow("    let isLoggedIn: boolean = true;"));
  console.log(colorYellow("    let hasPermission: boolean = false;"));
  console.log(colorYellow("    let isAdult: boolean = myAge >= 18;  // 26 >= 18 is true\n"));

  console.log("  Booleans power 'if' statements -- making decisions in code:\n");
  console.log(colorYellow("    if (isLoggedIn) {"));
  console.log(colorYellow('      console.log("Welcome back!");'));
  console.log(colorYellow("    } else {"));
  console.log(colorYellow('      console.log("Please log in.");'));
  console.log(colorYellow("    }"));

  await predict(
    "let age: number = 16;\nlet canDrive: boolean = age >= 18;\nconsole.log(canDrive)",
    "false",
    "16 >= 18 is false. The person is not old enough to drive."
  );

  await quiz(
    "What are the only two values a boolean can have?",
    "true and false",
    "Boolean is the simplest type. It's always true or false."
  );

  await pause();

  // ============================================================================
  // SECTION 7: Why Types Matter
  // ============================================================================

  console.log("\n============================================================");
  console.log("  SECTION 7: WHY Do Types Matter? (INTERVIEW FAVORITE)");
  console.log("============================================================\n");

  console.log("  In plain JavaScript (no TypeScript), you could do this:\n");
  console.log(colorRed("    let price = 9.99;"));
  console.log(colorRed('    price = "free";     // JavaScript says "sure, no problem"'));
  console.log(colorRed("    let tax = price * 0.08;  // \"free\" * 0.08 = NaN -- BUG!\n"));

  console.log("  This bug only shows up WHEN THE APP IS RUNNING. Users see it.\n");

  console.log("  With TypeScript:\n");
  console.log(colorGreen("    let price: number = 9.99;"));
  console.log(colorGreen('    price = "free";     // TypeScript says "STOP! Must be a number!"'));
  console.log(colorGreen("    // Bug caught BEFORE your code ever runs!\n"));

  console.log("  INTERVIEW ANSWER:");
  console.log(colorCyan('  "TypeScript catches bugs at compile time instead of runtime,'));
  console.log(colorCyan('   which means fewer bugs in production and better developer experience."'));

  await quiz(
    "Does TypeScript catch type errors BEFORE or AFTER your code runs?",
    "before",
    'TypeScript catches errors at "compile time" -- before the code runs.'
  );

  await pause();

  // ============================================================================
  // SECTION 8: Arrays
  // ============================================================================

  console.log("\n============================================================");
  console.log("  SECTION 8: Arrays (Lists of Things)");
  console.log("============================================================\n");

  console.log("  An array is a LIST of values, stored in order.");
  console.log("  Like a shopping list: [\"milk\", \"eggs\", \"bread\"]\n");

  console.log("  In TypeScript, you tell the array what TYPE it holds:");
  console.log("    string[]   = a list of strings");
  console.log("    number[]   = a list of numbers");
  console.log("    boolean[]  = a list of booleans\n");

  let fruits: string[] = ["apple", "banana", "cherry"];
  console.log(colorYellow('    let fruits: string[] = ["apple", "banana", "cherry"];\n'));

  console.log("  IMPORTANT: Arrays start counting at 0, not 1!");
  console.log(`    fruits[0] = "${fruits[0]}"   (FIRST item)`);
  console.log(`    fruits[1] = "${fruits[1]}"  (SECOND item)`);
  console.log(`    fruits[2] = "${fruits[2]}"  (THIRD item)\n`);

  console.log("  Useful array methods:");
  console.log('    fruits.push("mango")  --> adds "mango" to the END');
  console.log("    fruits.pop()          --> removes the LAST item");
  console.log("    fruits.length         --> how many items (currently 3)");

  await predict(
    'let colors: string[] = ["red", "blue", "green"];\nconsole.log(colors[1])',
    "blue",
    "Arrays count from 0. Index 0='red', index 1='blue', index 2='green'."
  );

  await predict(
    "let nums: number[] = [10, 20, 30];\nnums.push(40);\nconsole.log(nums.length)",
    "4",
    "Started with 3 items, pushed 1 more, so length is 4."
  );

  await quiz(
    'If arr = ["a", "b", "c"], what index is "a" at?',
    "0",
    "Arrays use zero-based indexing. The first item is always at index 0."
  );

  await pause();

  // ============================================================================
  // SECTION 9: Type Inference
  // ============================================================================

  console.log("\n============================================================");
  console.log("  SECTION 9: Type Inference (TypeScript is Smart)");
  console.log("============================================================\n");

  console.log("  You do NOT always have to write the type yourself.");
  console.log("  TypeScript can FIGURE OUT the type from the value.\n");

  console.log(colorYellow('    let city = "Chicago";  // TS knows this is a string'));
  console.log(colorYellow("    let count = 42;        // TS knows this is a number"));
  console.log(colorYellow("    let active = true;     // TS knows this is a boolean\n"));

  console.log("  Even without writing ': string', TypeScript still protects you:");
  console.log(colorRed('    city = 100;  // ERROR! TS inferred city is a string.\n'));

  console.log("  TIP FOR INTERVIEWS: Write types explicitly. It shows you understand TS.");

  await quiz(
    'If you write: let x = "hello"; -- what type does TypeScript infer for x?',
    "string",
    'TypeScript sees "hello" is text, so it infers the type as string.'
  );

  await pause();

  // ============================================================================
  // SECTION 10: Special Types
  // ============================================================================

  console.log("\n============================================================");
  console.log("  SECTION 10: Special Types (undefined, null, any)");
  console.log("============================================================\n");

  console.log(colorYellow("  undefined") + " = variable exists but has NO value yet.");
  console.log("    Think: an empty box.\n");

  console.log(colorYellow("  null") + " = intentionally set to nothing.");
  console.log('    Think: empty box with a note saying "purposely empty."\n');

  console.log(colorRed("  any") + " = no type checking at all. ANYTHING goes.");
  console.log("    WARNING: Defeats the purpose of TypeScript. Avoid it!");
  console.log("    Interviewers will judge you if you overuse 'any'.\n");

  console.log("  Example:");
  console.log(colorYellow("    let mystery: any = \"hello\";"));
  console.log(colorYellow("    mystery = 42;       // No error -- any allows anything"));
  console.log(colorYellow("    mystery = true;     // Still no error -- DANGEROUS"));

  await quiz(
    "Should you use 'any' a lot in TypeScript? (yes or no)",
    "no",
    "'any' disables type checking. It defeats the whole purpose of TypeScript."
  );

  await pause();

  // ============================================================================
  // SECTION 11: Putting It All Together
  // ============================================================================

  console.log("\n============================================================");
  console.log("  SECTION 11: Putting It All Together");
  console.log("============================================================\n");

  console.log("  Let's trace through a small program step by step:\n");

  console.log(colorYellow('    const playerName: string = "Alex";'));
  console.log(colorYellow("    let playerScore: number = 0;"));
  console.log(colorYellow("    let achievements: string[] = [];"));
  console.log(colorYellow(""));
  console.log(colorYellow("    playerScore = playerScore + 100;"));
  console.log(colorYellow('    achievements.push("First Kill");'));
  console.log(colorYellow("    playerScore = playerScore + 250;"));
  console.log(colorYellow('    achievements.push("Speed Demon");'));

  await predict(
    "// After the code above...\nconsole.log(playerScore)",
    "350",
    "Score started at 0, added 100 (= 100), then added 250 (= 350)."
  );

  await predict(
    "// After the code above...\nconsole.log(achievements.length)",
    "2",
    "Two items were pushed: 'First Kill' and 'Speed Demon'."
  );

  await pause();

  // ============================================================================
  // INTERACTIVE EXERCISES
  // ============================================================================

  console.log("\n============================================================");
  console.log("  EXERCISES -- Type Your Answers!");
  console.log("============================================================\n");

  console.log("  Now let's test what you've learned.\n");

  // Exercise 1: Variable types
  totalQuestions++;
  let ex1 = await ask(colorCyan(
    "  1. What type would you use for someone's name?\n" +
    "     (string, number, or boolean)\n" +
    "     > "
  ));
  if (ex1.toLowerCase() === "string") {
    score++;
    console.log(colorGreen("  CORRECT! A name is text, so it's a string."));
  } else {
    console.log(colorRed('  The answer is: string. Names are text, and text = string.'));
  }

  // Exercise 2: Variable types
  totalQuestions++;
  let ex2 = await ask(colorCyan(
    "\n  2. What type would you use for a temperature like 72.5?\n" +
    "     (string, number, or boolean)\n" +
    "     > "
  ));
  if (ex2.toLowerCase() === "number") {
    score++;
    console.log(colorGreen("  CORRECT! Temperatures are numbers (whole or decimal)."));
  } else {
    console.log(colorRed("  The answer is: number. Any numeric value is a number in TypeScript."));
  }

  // Exercise 3: let vs const
  totalQuestions++;
  let ex3 = await ask(colorCyan(
    "\n  3. You're creating a variable for a user's email that might change.\n" +
    "     Would you use 'let' or 'const'?\n" +
    "     > "
  ));
  if (ex3.toLowerCase() === "let") {
    score++;
    console.log(colorGreen("  CORRECT! Since it might change, use 'let'."));
  } else {
    console.log(colorRed("  The answer is: let. Use 'let' when the value can change."));
  }

  // Exercise 4: Array indexing
  totalQuestions++;
  let ex4 = await ask(colorCyan(
    '\n  4. Given: let pets = ["dog", "cat", "fish"]\n' +
    '     What does pets[2] give you?\n' +
    "     > "
  ));
  if (ex4.toLowerCase() === "fish") {
    score++;
    console.log(colorGreen("  CORRECT! Index 0='dog', 1='cat', 2='fish'."));
  } else {
    console.log(colorRed("  The answer is: fish. Remember, arrays start at index 0!"));
  }

  // Exercise 5: Template literals
  totalQuestions++;
  let ex5 = await ask(colorCyan(
    '\n  5. What does this print?\n' +
    '     let fruit = "apple";\n' +
    '     console.log(`I like ${fruit}s`)\n' +
    "     > "
  ));
  if (ex5.toLowerCase() === "i like apples") {
    score++;
    console.log(colorGreen("  CORRECT! ${fruit} becomes 'apple', plus the 's' = 'I like apples'."));
  } else {
    console.log(colorRed("  The answer is: I like apples"));
    console.log(colorYellow("  ${fruit} is replaced with 'apple', and the 's' is just a regular character."));
  }

  // Exercise 6: Write actual code (conceptual)
  totalQuestions++;
  let ex6 = await ask(colorCyan(
    "\n  6. Fill in the blank to create a boolean:\n" +
    "     let isHappy: _______ = true;\n" +
    "     What goes in the blank?\n" +
    "     > "
  ));
  if (ex6.toLowerCase() === "boolean") {
    score++;
    console.log(colorGreen("  CORRECT! true/false values are booleans."));
  } else {
    console.log(colorRed("  The answer is: boolean. The value 'true' is a boolean type."));
  }

  // ============================================================================
  // FINAL SCORE
  // ============================================================================

  console.log("\n============================================================");
  console.log("  YOUR RESULTS");
  console.log("============================================================\n");

  const percentage = Math.round((score / totalQuestions) * 100);
  console.log(`  Score: ${score} / ${totalQuestions} (${percentage}%)\n`);

  if (percentage === 100) {
    console.log(colorGreen("  PERFECT SCORE! You nailed it! TypeScript basics are solid."));
  } else if (percentage >= 80) {
    console.log(colorGreen("  Great job! You've got a strong grasp of the basics."));
  } else if (percentage >= 60) {
    console.log(colorYellow("  Good effort! Review the sections you missed and try again."));
  } else {
    console.log(colorYellow("  No worries! Re-read the sections above and run this again."));
    console.log(colorYellow("  Learning takes repetition. You'll get it!"));
  }

  console.log(`\n  Tip: Run this file again to practice. Repetition builds memory.`);
  console.log("  When you feel confident, move on to: tsx 02-interfaces.ts\n");

  rl.close();
}

main();
