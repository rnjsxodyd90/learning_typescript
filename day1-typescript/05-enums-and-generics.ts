// ============================================================================
// 05-enums-and-generics.ts -- Named Constants and Flexible Types
// ============================================================================
//
// HOW TO RUN THIS FILE:
//   ts-node 05-enums-and-generics.ts
//
// WHAT YOU WILL LEARN:
//   - What enums are and why they are useful
//   - String enums vs numeric enums
//   - What generics are (the concept, kept simple)
//   - How to use generics in functions, interfaces, and classes
//
// PREREQUISITE: You should have completed 01 through 04 first.
//
// ============================================================================

// ============================================================================
// SECTION 1: What is an Enum?
// ============================================================================

// An enum (short for "enumeration") is a set of NAMED CONSTANTS.
//
// Real-world analogy: Traffic lights.
//   A traffic light can be: RED, YELLOW, or GREEN.
//   Not "kinda red" or "bluish green." ONLY those three exact options.
//
// Without enums, you might use plain strings:
//   let light = "red";
//   But what if someone types "Red", "RED", or "rede" (typo)?
//   Bugs! Bugs everywhere!
//
// With enums, TypeScript gives you a fixed menu of choices.
// If you try to use something not on the menu, TypeScript stops you.

console.log("--- SECTION 1: What is an Enum? ---");

// Here is how you create an enum:

enum TrafficLight {
  Red,       // Automatically gets the value 0
  Yellow,    // Automatically gets the value 1
  Green      // Automatically gets the value 2
}

// Now use it:
let currentLight: TrafficLight = TrafficLight.Green;
// "currentLight" can ONLY be TrafficLight.Red, TrafficLight.Yellow, or TrafficLight.Green.
// You CANNOT set it to something random like "purple."

console.log("Current light:", currentLight);         // Prints: Current light: 2
console.log("Current light name:", TrafficLight[currentLight]); // Prints: Current light name: Green

// Use it in an if statement:
if (currentLight === TrafficLight.Green) {
  console.log("Go!");
} else if (currentLight === TrafficLight.Yellow) {
  console.log("Slow down!");
} else if (currentLight === TrafficLight.Red) {
  console.log("Stop!");
}
// Prints: Go!

console.log(""); // Empty line for spacing

// ============================================================================
// SECTION 2: Numeric Enums (Default)
// ============================================================================

// By default, TypeScript assigns NUMBERS to each enum value, starting from 0.
// You can also SET the numbers yourself.

console.log("--- SECTION 2: Numeric Enums ---");

// Default numbering (starts from 0):
enum Direction {
  Up,      // 0
  Down,    // 1
  Left,    // 2
  Right    // 3
}

console.log("Up =", Direction.Up);       // Prints: Up = 0
console.log("Down =", Direction.Down);   // Prints: Down = 1
console.log("Left =", Direction.Left);   // Prints: Left = 2
console.log("Right =", Direction.Right); // Prints: Right = 3

// Custom numbering:
enum HttpStatus {
  OK = 200,               // HTTP 200 = success
  NotFound = 404,          // HTTP 404 = page not found
  ServerError = 500        // HTTP 500 = server broke
}

console.log("OK status:", HttpStatus.OK);              // Prints: OK status: 200
console.log("Not found status:", HttpStatus.NotFound); // Prints: Not found status: 404

// Use it in a function:
function handleResponse(status: HttpStatus): void {
  switch (status) {
    // "switch" is like a series of if/else statements.
    // It checks the value and runs the matching case.
    case HttpStatus.OK:
      console.log("Success! Everything worked.");
      break; // "break" exits the switch block
    case HttpStatus.NotFound:
      console.log("Error: Page not found.");
      break;
    case HttpStatus.ServerError:
      console.log("Error: Server had a problem.");
      break;
  }
}

handleResponse(HttpStatus.OK);        // Prints: Success! Everything worked.
handleResponse(HttpStatus.NotFound);  // Prints: Error: Page not found.

console.log(""); // Empty line for spacing

// ============================================================================
// SECTION 3: String Enums (More Readable)
// ============================================================================

// String enums use STRING values instead of numbers.
// They are MORE READABLE in logs and debugging.
// INTERVIEW TIP: Most real-world projects prefer string enums.

console.log("--- SECTION 3: String Enums ---");

enum Color {
  Red = "RED",
  Green = "GREEN",
  Blue = "BLUE",
  Yellow = "YELLOW"
}

let favoriteColor: Color = Color.Blue;
console.log("Favorite color:", favoriteColor); // Prints: Favorite color: BLUE
// Much more readable than printing "2"!

enum OrderStatus {
  Pending = "PENDING",
  Processing = "PROCESSING",
  Shipped = "SHIPPED",
  Delivered = "DELIVERED",
  Cancelled = "CANCELLED"
}

// Real-world example: an order tracking system
interface Order {
  orderId: number;
  item: string;
  status: OrderStatus; // Status MUST be one of the OrderStatus values
}

let myOrder: Order = {
  orderId: 12345,
  item: "TypeScript Handbook",
  status: OrderStatus.Shipped // Can only be a valid OrderStatus
};

console.log(`Order #${myOrder.orderId}: ${myOrder.item}`);
console.log(`Status: ${myOrder.status}`);
// Prints:
//   Order #12345: TypeScript Handbook
//   Status: SHIPPED

// Change the status:
myOrder.status = OrderStatus.Delivered;
console.log(`Updated status: ${myOrder.status}`);
// Prints: Updated status: DELIVERED

// Uncomment to see the error:
// myOrder.status = "LOST"; // ERROR! "LOST" is not a valid OrderStatus

console.log(""); // Empty line for spacing

// ============================================================================
// SECTION 4: Enums in Practice (Day of Week Example)
// ============================================================================

console.log("--- SECTION 4: Practical Enum Example ---");

enum DayOfWeek {
  Monday = "MONDAY",
  Tuesday = "TUESDAY",
  Wednesday = "WEDNESDAY",
  Thursday = "THURSDAY",
  Friday = "FRIDAY",
  Saturday = "SATURDAY",
  Sunday = "SUNDAY"
}

function isWeekend(day: DayOfWeek): boolean {
  // Returns true if the day is Saturday or Sunday
  return day === DayOfWeek.Saturday || day === DayOfWeek.Sunday;
  // "||" means OR. "Is it Saturday OR Sunday?"
}

function getDayMessage(day: DayOfWeek): string {
  if (isWeekend(day)) {
    return `${day} is a weekend day. Relax!`;
  } else {
    return `${day} is a weekday. Time to work!`;
  }
}

console.log(getDayMessage(DayOfWeek.Monday));   // MONDAY is a weekday. Time to work!
console.log(getDayMessage(DayOfWeek.Saturday)); // SATURDAY is a weekend day. Relax!
console.log(getDayMessage(DayOfWeek.Friday));   // FRIDAY is a weekday. Time to work!

console.log(""); // Empty line for spacing

// ============================================================================
// SECTION 5: What are Generics? (The Concept)
// ============================================================================

// Generics are a way to make code FLEXIBLE about what types it works with.
//
// Real-world analogy: A SHIPPING BOX.
//
//   A shipping box does not care what is inside it.
//   It could hold books, shoes, electronics -- anything.
//   But once you label a specific box "BOOKS", that particular box holds books.
//
//   A generic is like the DESIGN for a box:
//     "This box can hold items of type T" (where T is decided later)
//
//   When you actually USE the box:
//     Box<string>  --> this particular box holds strings
//     Box<number>  --> this particular box holds numbers
//     Box<Product> --> this particular box holds Product objects
//
// The <T> is called a "type parameter." T is just a placeholder name.
// By convention, we often use T, but you could call it anything (like <ItemType>).

console.log("--- SECTION 5: What are Generics? ---");
console.log("Generics = code that works with ANY type, decided later.");
console.log("Think of it as a shipping box -- you choose what goes inside.");

console.log(""); // Empty line for spacing

// ============================================================================
// SECTION 6: Generic Functions
// ============================================================================

// WITHOUT generics, you'd need to write separate functions for each type:
//   function getFirstString(arr: string[]): string { return arr[0]; }
//   function getFirstNumber(arr: number[]): number { return arr[0]; }
//   function getFirstBoolean(arr: boolean[]): boolean { return arr[0]; }
//
// That is a lot of repetition! They all do the SAME thing.
//
// WITH generics, you write it ONCE:

console.log("--- SECTION 6: Generic Functions ---");

function getFirst<T>(arr: T[]): T {
  //              ^^ ^^^^^^  ^
  //              |  |       |
  //              |  |       Returns a value of type T
  //              |  Takes an array of type T
  //              T is a "type parameter" -- a placeholder for a real type
  return arr[0]; // Return the first item in the array
}

// When you CALL the function, TypeScript figures out what T is:

let firstFruit: string = getFirst<string>(["apple", "banana", "cherry"]);
//                                ^^^^^^^^
//                                We tell TypeScript: T is "string" here
console.log("First fruit:", firstFruit); // Prints: First fruit: apple

let firstScore: number = getFirst<number>([95, 87, 72, 100]);
//                                ^^^^^^^^
//                                We tell TypeScript: T is "number" here
console.log("First score:", firstScore); // Prints: First score: 95

// You can often SKIP the <type> because TypeScript can INFER it:
let firstFlag = getFirst([true, false, true]); // TypeScript knows T is "boolean"
console.log("First flag:", firstFlag); // Prints: First flag: true

// Another generic function example:
function getLastItem<T>(arr: T[]): T {
  // Returns the LAST item in an array
  return arr[arr.length - 1];
  // arr.length is the total count. Subtract 1 because arrays start at index 0.
}

console.log("Last color:", getLastItem(["red", "green", "blue"])); // Prints: Last color: blue
console.log("Last number:", getLastItem([10, 20, 30]));            // Prints: Last number: 30

// Generic function with TWO type parameters:
function makePair<A, B>(first: A, second: B): [A, B] {
  //              ^^^^
  //              Two type parameters: A and B (they can be different types)
  return [first, second]; // Returns a "tuple" (a fixed-size array with specific types)
}

let pair1 = makePair("hello", 42);       // A=string, B=number
let pair2 = makePair(true, "world");     // A=boolean, B=string

console.log("Pair 1:", pair1); // Prints: Pair 1: [ 'hello', 42 ]
console.log("Pair 2:", pair2); // Prints: Pair 2: [ true, 'world' ]

console.log(""); // Empty line for spacing

// ============================================================================
// SECTION 7: Generic Interfaces
// ============================================================================

// Interfaces can be generic too. This is VERY common in real-world TypeScript.

console.log("--- SECTION 7: Generic Interfaces ---");

// A generic interface for an API response:
// When your app talks to a server, the response usually has:
//   - a "data" field (which could be ANYTHING -- a user, a product, a list, etc.)
//   - a "success" flag
//   - an optional "error" message

interface ApiResponse<T> {
  //                 ^^^
  //                 T is a placeholder for whatever type "data" will be
  data: T;            // The actual data -- its type is determined when we use the interface
  success: boolean;   // Did the request succeed?
  error?: string;     // Optional error message
}

// Now use it with DIFFERENT types for "data":

// An API response where the data is a string:
let messageResponse: ApiResponse<string> = {
  data: "Welcome to the API!",
  success: true
};
console.log("Message:", messageResponse.data); // Prints: Message: Welcome to the API!

// An API response where the data is a number:
let countResponse: ApiResponse<number> = {
  data: 42,
  success: true
};
console.log("Count:", countResponse.data); // Prints: Count: 42

// An API response where the data is an array of strings:
let namesResponse: ApiResponse<string[]> = {
  data: ["Alice", "Bob", "Carol"],
  success: true
};
console.log("Names:", namesResponse.data); // Prints: Names: [ 'Alice', 'Bob', 'Carol' ]

// An API response with an error:
let errorResponse: ApiResponse<null> = {
  data: null,
  success: false,
  error: "Something went wrong!"
};
console.log("Error:", errorResponse.error); // Prints: Error: Something went wrong!

console.log(""); // Empty line for spacing

// ============================================================================
// SECTION 8: Generic Classes
// ============================================================================

// Classes can be generic too. Here is a simple example: a "Box" that can hold anything.

console.log("--- SECTION 8: Generic Classes ---");

class Box<T> {
  //     ^^^
  //     T is the type of item this box will hold

  private item: T; // The item inside the box -- its type is T

  constructor(item: T) {
    this.item = item; // Put the item in the box
  }

  getItem(): T {
    // Returns the item (of type T) from the box
    return this.item;
  }

  replaceItem(newItem: T): void {
    // Replace the item in the box with a new item (must be the same type!)
    console.log(`Replacing item in box.`);
    this.item = newItem;
  }
}

// Create a Box that holds a string:
let stringBox: Box<string> = new Box<string>("Hello!");
console.log("String box:", stringBox.getItem()); // Prints: String box: Hello!

// Create a Box that holds a number:
let numberBox: Box<number> = new Box<number>(42);
console.log("Number box:", numberBox.getItem()); // Prints: Number box: 42

// You can replace the item (but it MUST be the same type):
stringBox.replaceItem("Goodbye!");
console.log("Updated string box:", stringBox.getItem()); // Prints: Updated string box: Goodbye!

// Uncomment to see the error:
// stringBox.replaceItem(100); // ERROR! 100 is a number, but this box holds strings.

// A more practical generic class: a Stack (Last In, First Out -- like a stack of plates)
class Stack<T> {
  private items: T[] = []; // An empty array to hold the items

  // Push: add an item to the TOP of the stack
  push(item: T): void {
    this.items.push(item); // .push() adds to the end of the array
    console.log(`  Pushed: ${item}`);
  }

  // Pop: remove and return the item from the TOP of the stack
  pop(): T | undefined {
    //      ^^^^^^^^^^^
    //      Returns T or undefined (if the stack is empty)
    if (this.items.length === 0) {
      console.log("  Stack is empty!");
      return undefined;
    }
    let item = this.items.pop(); // .pop() removes the last item
    console.log(`  Popped: ${item}`);
    return item;
  }

  // Peek: look at the top item WITHOUT removing it
  peek(): T | undefined {
    if (this.items.length === 0) {
      return undefined;
    }
    return this.items[this.items.length - 1]; // Return the last item
  }

  // Size: how many items are in the stack
  size(): number {
    return this.items.length;
  }
}

console.log("\nNumber stack:");
let numberStack: Stack<number> = new Stack<number>();
numberStack.push(10);   // Pushed: 10
numberStack.push(20);   // Pushed: 20
numberStack.push(30);   // Pushed: 30
console.log("  Top item:", numberStack.peek()); // Top item: 30
numberStack.pop();       // Popped: 30
console.log("  Size:", numberStack.size());     // Size: 2

console.log("\nString stack:");
let stringStack: Stack<string> = new Stack<string>();
stringStack.push("first");   // Pushed: first
stringStack.push("second");  // Pushed: second
stringStack.pop();            // Popped: second

console.log(""); // Empty line for spacing

// ============================================================================
// SECTION 9: When to Use Generics (Keep It Simple)
// ============================================================================

console.log("--- SECTION 9: When to Use Generics ---");
console.log("Use generics when:");
console.log("  1. You have code that works the same way for DIFFERENT types.");
console.log("  2. You want to write a reusable utility (like a Box, Stack, or API response).");
console.log("  3. You want to keep type safety WITHOUT duplicating code.");
console.log("");
console.log("Do NOT use generics when:");
console.log("  1. Your code only works with ONE specific type (just use that type).");
console.log("  2. It makes the code harder to read (simplicity wins).");

console.log(""); // Empty line for spacing

// ============================================================================
// SECTION 10: Interview Quick Reference
// ============================================================================

console.log("--- SECTION 10: Interview Quick Reference ---");
console.log("Q: What is an enum?");
console.log("A: A set of named constants. It restricts a variable to a fixed set of values.");
console.log("   Prevents typos and makes code more readable.");
console.log("");
console.log("Q: String enum vs numeric enum?");
console.log("A: Numeric enums use numbers (0, 1, 2...). String enums use readable strings.");
console.log("   String enums are more common in real projects because they are easier to debug.");
console.log("");
console.log("Q: What are generics?");
console.log("A: Generics let you write code that works with ANY type, while keeping type safety.");
console.log("   You use <T> as a placeholder for the actual type, which is decided when you use it.");
console.log("");
console.log("Q: Can you give an example of generics?");
console.log("A: Array<string> is actually a generic! It means 'an array that holds strings.'");
console.log("   Promise<number> means 'a promise that resolves to a number.'");

console.log(""); // Empty line for spacing

// ============================================================================
// EXERCISES -- Your Turn!
// ============================================================================

console.log("========== EXERCISES ==========");
console.log("");

// EXERCISE 1:
// Create a string enum called "Season" with values:
//   Spring = "SPRING", Summer = "SUMMER", Autumn = "AUTUMN", Winter = "WINTER"
//
// Write a function called "getActivity" that takes a Season and returns
// a string suggesting an activity for that season.
// Example: Spring -> "Go for a hike!", Winter -> "Build a snowman!"
//
// Test it with at least 2 seasons.
// Expected output:
//   SPRING: Go for a hike!
//   WINTER: Build a snowman!

// Write your code here:


// EXERCISE 2:
// Create a string enum called "Priority" with values:
//   Low = "LOW", Medium = "MEDIUM", High = "HIGH", Critical = "CRITICAL"
//
// Create an interface called "Task" with:
//   - title (string)
//   - priority (Priority)
//   - completed (boolean)
//
// Create an array of 3 Task objects with different priorities.
// Filter the array to show only tasks that are NOT completed.
// Print the incomplete tasks.
// Expected output (will vary based on your data):
//   Incomplete tasks:
//     [HIGH] Fix login bug
//     [CRITICAL] Update security patch

// Write your code here:


// EXERCISE 3:
// Write a generic function called "reverseArray" that:
//   - Takes an array of ANY type (use <T>)
//   - Returns a NEW array with the items in reverse order
//
// DO NOT use the built-in .reverse() method. Do it manually with a loop.
//
// Test with: [1, 2, 3, 4, 5] and ["a", "b", "c"]
// Expected output:
//   Reversed numbers: [5, 4, 3, 2, 1]
//   Reversed letters: ["c", "b", "a"]
//
// HINT: Create an empty array, loop through the original backwards,
//       and push each item into the new array.

// Write your code here:


// EXERCISE 4:
// Create a generic interface called "KeyValuePair<K, V>" with:
//   - key (of type K)
//   - value (of type V)
//
// Create 3 different KeyValuePair objects:
//   1. KeyValuePair<string, number>  (e.g., { key: "age", value: 25 })
//   2. KeyValuePair<number, string>  (e.g., { key: 1, value: "first" })
//   3. KeyValuePair<string, boolean> (e.g., { key: "active", value: true })
//
// Print each one.
// Expected output:
//   Key: age, Value: 25
//   Key: 1, Value: first
//   Key: active, Value: true

// Write your code here:


// EXERCISE 5 (Challenge):
// Create a generic class called "Registry<T>" that:
//   - Has a private array called "items" of type T[]
//   - Has a method "add(item: T)" that adds an item
//   - Has a method "getAll()" that returns all items
//   - Has a method "findBy(predicate: (item: T) => boolean)" that returns
//     all items matching a condition
//
// Use it with an interface "User" { name: string, age: number }
// Add 3 users, then findBy users older than 25.
// Expected output:
//   All users: [list of 3 users]
//   Users over 25: [matching users]

// Write your code here:


console.log("");
console.log("If you see your exercise output above, great job!");
console.log("Move on to 06-exercises.ts for the final practice set!");
