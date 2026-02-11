// ============================================================================
// 04-functions.ts -- Reusable Blocks of Code
// ============================================================================
//
// HOW TO RUN THIS FILE:
//   ts-node 04-functions.ts
//
// WHAT YOU WILL LEARN:
//   - What a function is and why it exists
//   - How to declare functions with typed parameters
//   - How to specify return types
//   - Arrow functions (a shorter way to write functions)
//   - Optional parameters
//   - Default parameters
//   - Rest parameters
//   - Function overloading (briefly)
//
// PREREQUISITE: You should have completed 01, 02, and 03 first.
//
// ============================================================================

// ============================================================================
// SECTION 1: What is a Function?
// ============================================================================

// A function is a REUSABLE block of code that does a specific task.
//
// Real-world analogy: A function is like a RECIPE.
//
//   Recipe: "Make a Sandwich"
//   Ingredients needed (INPUTS): bread, meat, cheese
//   Steps: put meat on bread, put cheese on meat, put bread on top
//   Result (OUTPUT): a sandwich
//
//   Once you write the recipe, you can use it over and over.
//   You don't rewrite the steps every time you want a sandwich.
//
// In code:
//   Function name: "makeSandwich"
//   Parameters (INPUTS): bread type, meat type, cheese type
//   Code inside: the steps to combine them
//   Return value (OUTPUT): the finished sandwich description

console.log("--- SECTION 1: What is a Function? ---");

// Here is a simple function:

function sayHello(): void {
  //  ^^^^^^^^^  ^^    ^^^^
  //  |          |     |
  //  |          |     "void" = this function returns NOTHING (it just prints)
  //  |          Empty parentheses = this function needs NO inputs
  //  The name of the function
  console.log("Hello, World!");
}

// IMPORTANT: Defining a function does NOT run it.
// The code above is just the RECIPE. To actually MAKE the sandwich, you must CALL it:

sayHello(); // This CALLS (runs) the function. Prints: Hello, World!
sayHello(); // You can call it as many times as you want. Prints: Hello, World!

console.log(""); // Empty line for spacing

// ============================================================================
// SECTION 2: Functions with Parameters (Inputs)
// ============================================================================

// Most functions need INPUTS to do their job.
// These inputs are called "parameters."
//
// In TypeScript, you must specify the TYPE of each parameter.
// This ensures no one passes the wrong kind of data to your function.

console.log("--- SECTION 2: Functions with Parameters ---");

// This function takes TWO parameters: a name (string) and an age (number)
function greetPerson(name: string, age: number): void {
  //                  ^^^^^^^^^^^^  ^^^^^^^^^^^
  //                  Parameter 1    Parameter 2
  //                  Must be text   Must be a number
  console.log(`Hello, ${name}! You are ${age} years old.`);
}

greetPerson("Alice", 30);   // Prints: Hello, Alice! You are 30 years old.
greetPerson("Bob", 25);     // Prints: Hello, Bob! You are 25 years old.

// What if you pass the wrong type?
// Uncomment to see the error:
// greetPerson(42, "Alice");
// ERROR! Argument of type 'number' is not assignable to parameter of type 'string'.

// What if you forget a parameter?
// Uncomment to see the error:
// greetPerson("Alice");
// ERROR! Expected 2 arguments, but got 1.

console.log(""); // Empty line for spacing

// ============================================================================
// SECTION 3: Functions with Return Values (Outputs)
// ============================================================================

// Some functions GIVE BACK a value. This is called "returning" a value.
//
// Analogy: A calculator function.
//   You give it two numbers (inputs).
//   It gives you back the sum (output).
//
// Instead of "void" (which means no output), you write the TYPE of the output.

console.log("--- SECTION 3: Return Values ---");

// This function takes two numbers and RETURNS their sum (a number):
function add(a: number, b: number): number {
  //                                ^^^^^^
  //                                The RETURN TYPE: this function gives back a number
  return a + b;  // "return" sends the result back to whoever called this function
}

// When a function returns something, you can STORE the result in a variable:
let sum: number = add(5, 3); // add(5, 3) returns 8, which gets stored in "sum"
console.log("5 + 3 =", sum); // Prints: 5 + 3 = 8

// You can also use the return value directly (without storing it):
console.log("10 + 20 =", add(10, 20)); // Prints: 10 + 20 = 30

// More examples of functions with return values:

function multiply(a: number, b: number): number {
  return a * b;
}

function isEven(num: number): boolean {
  // Returns true if the number is even, false if odd
  // The "%" operator gives the REMAINDER of division.
  // If a number divided by 2 has remainder 0, it is even.
  return num % 2 === 0;
  // "===" means "is equal to" (use three equals signs in TypeScript/JavaScript)
}

function getFullName(firstName: string, lastName: string): string {
  return `${firstName} ${lastName}`;
}

console.log("4 * 7 =", multiply(4, 7));         // Prints: 4 * 7 = 28
console.log("Is 10 even?", isEven(10));           // Prints: Is 10 even? true
console.log("Is 7 even?", isEven(7));             // Prints: Is 7 even? false
console.log("Full name:", getFullName("John", "Doe")); // Prints: Full name: John Doe

console.log(""); // Empty line for spacing

// ============================================================================
// SECTION 4: Arrow Functions (A Shorter Way to Write Functions)
// ============================================================================

// Arrow functions are just a SHORTER SYNTAX for writing functions.
// They use "=>" (which looks like an arrow) instead of the "function" keyword.
//
// They do the same thing -- they are just written differently.
// Arrow functions are VERY common in modern TypeScript/JavaScript.

console.log("--- SECTION 4: Arrow Functions ---");

// Regular function:
function addRegular(a: number, b: number): number {
  return a + b;
}

// Same thing as an arrow function:
const addArrow = (a: number, b: number): number => {
  return a + b;
};
// Note: We use "const" because the function itself should not change.
// The "=>" is the arrow. Everything after it is the function body.

// Even SHORTER arrow function (one-liner):
// When the function body is just a single "return" statement,
// you can remove the { } and the "return" keyword:
const addShort = (a: number, b: number): number => a + b;
// This is the same as: const addShort = (a, b) => { return a + b; }

console.log("Regular:", addRegular(3, 4)); // Prints: Regular: 7
console.log("Arrow:", addArrow(3, 4));     // Prints: Arrow: 7
console.log("Short:", addShort(3, 4));     // Prints: Short: 7

// More arrow function examples:

const square = (n: number): number => n * n;
// Takes a number, returns it multiplied by itself (squared)
console.log("5 squared:", square(5)); // Prints: 5 squared: 25

const greet = (name: string): string => `Hello, ${name}!`;
// Takes a name, returns a greeting string
console.log(greet("World")); // Prints: Hello, World!

const isPositive = (n: number): boolean => n > 0;
// Takes a number, returns true if it is greater than 0
console.log("Is 5 positive?", isPositive(5));   // Prints: Is 5 positive? true
console.log("Is -3 positive?", isPositive(-3)); // Prints: Is -3 positive? false

// Arrow functions with no parameters:
const getTimestamp = (): string => new Date().toLocaleString();
// Returns the current date and time as a string
console.log("Current time:", getTimestamp());

console.log(""); // Empty line for spacing

// ============================================================================
// SECTION 5: Optional Parameters (the ? symbol)
// ============================================================================

// Sometimes a function parameter is NOT required.
// You make it optional by adding a ? after the parameter name.
//
// RULE: Optional parameters must come AFTER required parameters.
// You can't have: (optional?, required) -- that does not work.
// It must be: (required, optional?)

console.log("--- SECTION 5: Optional Parameters ---");

function createUser(name: string, email: string, phone?: string): void {
  //                                              ^^^^^^^^^^^^^^
  //                                              The ? makes phone optional
  console.log(`Name: ${name}`);
  console.log(`Email: ${email}`);

  // Since phone is optional, it might be undefined (not provided).
  // We should CHECK before using it:
  if (phone) {
    // This runs only if phone has a value (is not undefined)
    console.log(`Phone: ${phone}`);
  } else {
    // This runs if phone was not provided
    console.log("Phone: Not provided");
  }
  console.log("---");
}

// Call with all 3 arguments:
createUser("Alice", "alice@test.com", "555-1234");
// Prints:
//   Name: Alice
//   Email: alice@test.com
//   Phone: 555-1234
//   ---

// Call with only 2 arguments (phone is optional, so this is fine):
createUser("Bob", "bob@test.com");
// Prints:
//   Name: Bob
//   Email: bob@test.com
//   Phone: Not provided
//   ---

console.log(""); // Empty line for spacing

// ============================================================================
// SECTION 6: Default Parameters
// ============================================================================

// Default parameters are like optional parameters, but instead of being
// undefined when not provided, they use a DEFAULT value that you specify.
//
// Analogy: At a coffee shop, if you don't specify a size, they give you "Medium."
// The default size is "Medium."

console.log("--- SECTION 6: Default Parameters ---");

function orderCoffee(type: string, size: string = "Medium", extras: string = "none"): void {
  //                               ^^^^^^^^^^^^^^^^^^^        ^^^^^^^^^^^^^^^^^^^^
  //                               Default: "Medium"          Default: "none"
  //                               if not provided             if not provided
  console.log(`Order: ${size} ${type}, extras: ${extras}`);
}

// Provide all arguments:
orderCoffee("Latte", "Large", "extra shot");
// Prints: Order: Large Latte, extras: extra shot

// Skip the optional ones (use defaults):
orderCoffee("Cappuccino");
// Prints: Order: Medium Cappuccino, extras: none

// Provide some, use default for the rest:
orderCoffee("Mocha", "Small");
// Prints: Order: Small Mocha, extras: none

// Another example with math:
function calculateTip(bill: number, tipPercent: number = 18): number {
  // If no tip percentage is provided, default to 18%
  let tip: number = bill * (tipPercent / 100);
  return tip;
}

console.log("Tip on $50 (default 18%):", calculateTip(50));     // Prints: Tip on $50 (default 18%): 9
console.log("Tip on $50 (custom 20%):", calculateTip(50, 20)); // Prints: Tip on $50 (custom 20%): 10

console.log(""); // Empty line for spacing

// ============================================================================
// SECTION 7: Rest Parameters (...args)
// ============================================================================

// What if you don't know how many arguments someone will pass?
// Use a "rest parameter" with three dots (...) to accept ANY number of arguments.
// They arrive as an ARRAY.
//
// Analogy: A moving truck. "Throw in as many boxes as you want."

console.log("--- SECTION 7: Rest Parameters ---");

function addAllNumbers(...numbers: number[]): number {
  //                   ^^^^^^^^^^^^^^^^^^^
  //                   "...numbers" means: accept any number of number arguments.
  //                   They will be collected into an array called "numbers".

  let total: number = 0;           // Start with 0
  for (let num of numbers) {       // Go through each number in the array
    total = total + num;           // Add it to the total
  }
  return total;                    // Return the final sum
}

console.log("Sum:", addAllNumbers(1, 2, 3));              // Prints: Sum: 6
console.log("Sum:", addAllNumbers(10, 20, 30, 40, 50));   // Prints: Sum: 150
console.log("Sum:", addAllNumbers(5));                    // Prints: Sum: 5

// You can have regular parameters BEFORE the rest parameter:
function introduce(greeting: string, ...names: string[]): void {
  //                ^^^^^^^^^^^^^^^^  ^^^^^^^^^^^^^^^^^^
  //                Regular param      Rest param (collects the rest)
  for (let name of names) {
    console.log(`${greeting}, ${name}!`);
  }
}

introduce("Hello", "Alice", "Bob", "Carol");
// Prints:
//   Hello, Alice!
//   Hello, Bob!
//   Hello, Carol!

console.log(""); // Empty line for spacing

// ============================================================================
// SECTION 8: Functions as Parameters (Callbacks)
// ============================================================================

// In TypeScript, functions can be passed as arguments to OTHER functions.
// This is called a "callback" -- "call this function back when you need it."
//
// This is EXTREMELY common in real-world TypeScript/JavaScript.
//
// Analogy: You order food delivery and give them your phone number.
// "Call me BACK when the food arrives." Your phone number is the callback.

console.log("--- SECTION 8: Callbacks ---");

// This function takes a number array AND a function as parameters:
function processNumbers(
  numbers: number[],                         // An array of numbers
  processor: (num: number) => number         // A function that takes a number and returns a number
): number[] {
  //         ^^^^^^^^^^^^^^^^^^^^^^^^
  //         This describes the TYPE of the callback function:
  //         It must accept a number and return a number.

  let results: number[] = [];  // Start with an empty array for results

  for (let num of numbers) {
    // Call the "processor" function on each number and store the result:
    results.push(processor(num));
  }

  return results; // Return the array of processed numbers
}

// Define some processor functions:
const double = (n: number): number => n * 2;       // Doubles a number
const triple = (n: number): number => n * 3;       // Triples a number
const addTen = (n: number): number => n + 10;      // Adds 10 to a number

let myNumbers: number[] = [1, 2, 3, 4, 5];

console.log("Original:", myNumbers);
// Prints: Original: [ 1, 2, 3, 4, 5 ]

console.log("Doubled:", processNumbers(myNumbers, double));
// Prints: Doubled: [ 2, 4, 6, 8, 10 ]

console.log("Tripled:", processNumbers(myNumbers, triple));
// Prints: Tripled: [ 3, 6, 9, 12, 15 ]

console.log("Plus 10:", processNumbers(myNumbers, addTen));
// Prints: Plus 10: [ 11, 12, 13, 14, 15 ]

// You can also pass an arrow function directly (without naming it first):
console.log("Squared:", processNumbers(myNumbers, (n) => n * n));
// Prints: Squared: [ 1, 4, 9, 16, 25 ]

console.log(""); // Empty line for spacing

// ============================================================================
// SECTION 9: Common Array Methods That Use Callbacks
// ============================================================================

// JavaScript/TypeScript arrays have built-in methods that use callback functions.
// These are used CONSTANTLY in real-world code. Let's learn the big three:
//
//   .map()    -- transform each item
//   .filter() -- keep only items that pass a test
//   .forEach() -- do something with each item (no return value)

console.log("--- SECTION 9: map, filter, forEach ---");

let prices: number[] = [10, 25, 50, 75, 100];

// .map() -- Creates a NEW array by transforming each item
// "Map each price to its discounted version (20% off)"
let discountedPrices: number[] = prices.map((price: number): number => {
  return price * 0.8; // Multiply by 0.8 to get 80% of the price (20% off)
});
console.log("Original prices:", prices);           // [ 10, 25, 50, 75, 100 ]
console.log("20% off prices:", discountedPrices);  // [ 8, 20, 40, 60, 80 ]

// .filter() -- Creates a NEW array with only the items that pass a test
// "Filter to keep only prices over $30"
let expensiveItems: number[] = prices.filter((price: number): boolean => {
  return price > 30; // Keep this item if price is greater than 30
});
console.log("Expensive items (>$30):", expensiveItems); // [ 50, 75, 100 ]

// .forEach() -- Do something with each item (does NOT create a new array)
// "Print each price"
console.log("All prices:");
prices.forEach((price: number, index: number): void => {
  // "index" is the position (0, 1, 2, ...) -- .forEach gives it to you automatically
  console.log(`  Item ${index + 1}: $${price}`);
});
// Prints:
//   All prices:
//   Item 1: $10
//   Item 2: $25
//   Item 3: $50
//   Item 4: $75
//   Item 5: $100

console.log(""); // Empty line for spacing

// ============================================================================
// SECTION 10: Interview Quick Reference
// ============================================================================

console.log("--- SECTION 10: Interview Quick Reference ---");
console.log("Q: What is the difference between a regular function and an arrow function?");
console.log("A: Arrow functions are a shorter syntax. They also handle 'this' differently");
console.log("   (arrow functions inherit 'this' from their parent scope).");
console.log("");
console.log("Q: What is a callback function?");
console.log("A: A function passed as an argument to another function, to be called later.");
console.log("");
console.log("Q: What are optional parameters?");
console.log("A: Parameters marked with ? that can be omitted when calling the function.");
console.log("   They must come AFTER required parameters.");
console.log("");
console.log("Q: What do map, filter, and forEach do?");
console.log("A: map transforms each item into a new array.");
console.log("   filter keeps only items that pass a test.");
console.log("   forEach runs a function on each item but returns nothing.");

console.log(""); // Empty line for spacing

// ============================================================================
// EXERCISES -- Your Turn!
// ============================================================================

console.log("========== EXERCISES ==========");
console.log("");

// EXERCISE 1:
// Write a function called "celsiusToFahrenheit" that:
//   - Takes a temperature in Celsius (number)
//   - Returns the temperature in Fahrenheit (number)
//   - Formula: (celsius * 9/5) + 32
//
// Test it with: 0, 100, 37
// Expected output:
//   0°C = 32°F
//   100°C = 212°F
//   37°C = 98.6°F

// Write your code here:


// EXERCISE 2:
// Write an arrow function called "countVowels" that:
//   - Takes a string
//   - Returns the number of vowels (a, e, i, o, u) in it
//
// Test it with: "Hello World", "TypeScript"
// Expected output:
//   "Hello World" has 3 vowels
//   "TypeScript" has 2 vowels
//
// HINT: You can convert the string to lowercase with .toLowerCase()
//       and check each character with a for...of loop.
//       'aeiou'.includes(char) returns true if char is a vowel.

// Write your code here:


// EXERCISE 3:
// Write a function called "findMax" that:
//   - Takes any number of arguments (use rest parameters)
//   - Returns the largest number
//
// Test it with: findMax(3, 7, 2, 9, 4) and findMax(100, 50)
// Expected output:
//   Max of [3,7,2,9,4]: 9
//   Max of [100,50]: 100
//
// HINT: You can use Math.max(...numbers) or loop through and track the largest.

// Write your code here:


// EXERCISE 4:
// Create an array of numbers: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
// Use .filter() to create an array of only EVEN numbers.
// Use .map() on the even numbers to SQUARE each one.
// Print the result.
// Expected output:
//   Even numbers: [2, 4, 6, 8, 10]
//   Even numbers squared: [4, 16, 36, 64, 100]

// Write your code here:


// EXERCISE 5:
// Write a function called "repeat" that:
//   - Takes a string, a number (how many times to repeat), and an
//     optional separator string (defaults to ", ")
//   - Returns the string repeated that many times, joined by the separator
//
// Test it: repeat("ha", 3) should return "ha, ha, ha"
// Test it: repeat("hey", 2, " - ") should return "hey - hey"
// Expected output:
//   repeat("ha", 3): ha, ha, ha
//   repeat("hey", 2, " - "): hey - hey

// Write your code here:


console.log("");
console.log("If you see your exercise output above, great job!");
console.log("Move on to 05-enums-and-generics.ts when you are ready.");
