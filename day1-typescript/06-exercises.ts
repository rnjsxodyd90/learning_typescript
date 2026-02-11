// ============================================================================
// 06-exercises.ts -- 10 Practice Exercises (Putting It All Together)
// ============================================================================
//
// HOW TO RUN THIS FILE:
//   ts-node 06-exercises.ts
//
// INSTRUCTIONS:
//   - Each exercise has a description, hints, and expected output.
//   - Write your code under each "// YOUR CODE HERE:" comment.
//   - Run the file after each exercise to check your work.
//   - If you get stuck, re-read the relevant tutorial file.
//   - Each exercise builds on what you learned in files 01 through 05.
//
// DIFFICULTY SCALE:
//   [EASY]      = You just learned this. You can do it.
//   [MEDIUM]    = Combines a couple of concepts. Think a little.
//   [CHALLENGE] = Combines several concepts. Push yourself.
//
// ============================================================================

console.log("==============================================");
console.log("  TYPESCRIPT EXERCISES -- FINAL PRACTICE SET  ");
console.log("==============================================");
console.log("");

// ============================================================================
// EXERCISE 1: Variable Basics [EASY]
// ============================================================================
// Concepts tested: let, const, string, number, boolean, console.log
//
// Create the following variables:
//   1. A constant called "appName" of type string, set to "TaskMaster"
//   2. A variable called "version" of type number, set to 2.5
//   3. A variable called "isReleased" of type boolean, set to true
//   4. An array called "features" of type string[], with at least 3 feature names
//
// Then print them all using a template literal like this:
//   "[appName] v[version] - Released: [isReleased]"
//   "Features: [feature1], [feature2], [feature3]"
//
// Expected output (your values may differ for features):
//   TaskMaster v2.5 - Released: true
//   Features: Dark Mode, Notifications, Cloud Sync
// ============================================================================

console.log("--- Exercise 1: Variable Basics ---");

// YOUR CODE HERE:


console.log(""); // spacing

// ============================================================================
// EXERCISE 2: Interface Creation [EASY]
// ============================================================================
// Concepts tested: interfaces, optional properties, objects
//
// Create an interface called "Recipe" with:
//   - name: string (required)
//   - servings: number (required)
//   - prepTimeMinutes: number (required)
//   - isVegetarian: boolean (required)
//   - notes: string (OPTIONAL)
//
// Create TWO Recipe objects:
//   1. One WITH the notes field
//   2. One WITHOUT the notes field
//
// Print each recipe like this:
//   "[name] - Serves [servings], Prep: [prepTime] mins, Vegetarian: [yes/no]"
//   If notes exist, also print: "Notes: [notes]"
//
// Expected output (example):
//   Pasta Carbonara - Serves 4, Prep: 25 mins, Vegetarian: No
//   Garden Salad - Serves 2, Prep: 10 mins, Vegetarian: Yes
//   Notes: Use fresh lettuce
// ============================================================================

console.log("--- Exercise 2: Interface Creation ---");

// YOUR CODE HERE:


console.log(""); // spacing

// ============================================================================
// EXERCISE 3: Functions with Types [EASY]
// ============================================================================
// Concepts tested: functions, typed parameters, return types
//
// Write THREE functions:
//
// 1. "calculateArea" -- takes width (number) and height (number), returns number
//    Returns the area (width * height)
//
// 2. "isOldEnoughToDrive" -- takes age (number), returns boolean
//    Returns true if age >= 16, false otherwise
//
// 3. "formatPrice" -- takes price (number), returns string
//    Returns the price formatted like "$9.99"
//    HINT: use price.toFixed(2) to ensure 2 decimal places
//
// Test each function and print the results.
//
// Expected output:
//   Area of 5x3: 15
//   Can a 15-year-old drive? false
//   Can an 18-year-old drive? true
//   Formatted price: $49.90
// ============================================================================

console.log("--- Exercise 3: Functions with Types ---");

// YOUR CODE HERE:


console.log(""); // spacing

// ============================================================================
// EXERCISE 4: Arrow Functions and Array Methods [MEDIUM]
// ============================================================================
// Concepts tested: arrow functions, .map(), .filter()
//
// Given this array of numbers: [12, 5, 8, 130, 44, 3, 77, 19]
//
// 1. Use .filter() to create a new array with only numbers GREATER than 10
// 2. Use .map() on the filtered array to create strings like "Value: [number]"
// 3. Use .forEach() to print each string
//
// All callback functions MUST be arrow functions.
//
// Expected output:
//   Value: 12
//   Value: 130
//   Value: 44
//   Value: 77
//   Value: 19
// ============================================================================

console.log("--- Exercise 4: Arrow Functions and Array Methods ---");

const rawNumbers: number[] = [12, 5, 8, 130, 44, 3, 77, 19];

// YOUR CODE HERE:


console.log(""); // spacing

// ============================================================================
// EXERCISE 5: Class with Methods [MEDIUM]
// ============================================================================
// Concepts tested: classes, constructor, methods, public/private
//
// Create a class called "Student" with:
//   - PUBLIC property: name (string)
//   - PUBLIC property: grade (number, 1-12)
//   - PRIVATE property: grades (number array, starts empty)
//
//   - Constructor that takes name and grade
//   - Method "addGrade(score: number)" that adds a score to the grades array
//   - Method "getAverage(): number" that returns the average of all grades
//     HINT: Sum all grades and divide by the number of grades.
//     If there are no grades, return 0.
//   - Method "getReport(): string" that returns:
//     "[name] (Grade [grade]) - Average: [average]"
//
// Create a student, add 3 grades (85, 92, 78), and print the report.
//
// Expected output:
//   Alice (Grade 10) - Average: 85
// ============================================================================

console.log("--- Exercise 5: Class with Methods ---");

// YOUR CODE HERE:


console.log(""); // spacing

// ============================================================================
// EXERCISE 6: Enums in Practice [MEDIUM]
// ============================================================================
// Concepts tested: string enums, interfaces, functions
//
// Create a string enum called "PaymentMethod" with:
//   CreditCard = "CREDIT_CARD"
//   DebitCard = "DEBIT_CARD"
//   Cash = "CASH"
//   PayPal = "PAYPAL"
//
// Create an interface called "Payment" with:
//   - amount: number
//   - method: PaymentMethod
//   - description: string
//
// Write a function "processPayment(payment: Payment): string" that:
//   - If amount <= 0, return "Invalid payment amount"
//   - If method is Cash and amount > 500, return "Cash payments over $500 not accepted"
//   - Otherwise, return "Processed $[amount] via [method] for [description]"
//
// Test with 3 different payments.
//
// Expected output:
//   Processed $49.99 via CREDIT_CARD for Monthly subscription
//   Cash payments over $500 not accepted
//   Processed $25.00 via PAYPAL for Book purchase
// ============================================================================

console.log("--- Exercise 6: Enums in Practice ---");

// YOUR CODE HERE:


console.log(""); // spacing

// ============================================================================
// EXERCISE 7: Interface + Class Together [MEDIUM]
// ============================================================================
// Concepts tested: interfaces, classes, implements
//
// Create an interface called "Describable" with:
//   - describe(): string
//
// Create an interface called "Priceable" with:
//   - getPrice(): number
//
// Create a class called "MenuItem" that implements BOTH interfaces.
// The class should have:
//   - name (string)
//   - price (number)
//   - category (string)
//   - Constructor that takes name, price, and category
//   - describe() returns: "[name] ([category]) - $[price]"
//   - getPrice() returns the price
//
// Create 3 menu items, store them in an array, and print each description.
// Also calculate and print the total price.
//
// Expected output:
//   Burger (Main Course) - $12.99
//   Fries (Side) - $4.99
//   Soda (Drink) - $2.50
//   Total: $20.48
// ============================================================================

console.log("--- Exercise 7: Interface + Class Together ---");

// YOUR CODE HERE:


console.log(""); // spacing

// ============================================================================
// EXERCISE 8: Inheritance [MEDIUM]
// ============================================================================
// Concepts tested: classes, extends, super, method overriding
//
// Create a base class called "Vehicle" with:
//   - make (string)
//   - model (string)
//   - year (number)
//   - Constructor that takes make, model, year
//   - Method "getInfo(): string" returns "[year] [make] [model]"
//
// Create a child class called "ElectricVehicle" that extends Vehicle with:
//   - batteryCapacity (number, in kWh)
//   - Constructor that takes make, model, year, batteryCapacity
//     (remember to call super!)
//   - Override getInfo() to return "[year] [make] [model] (Electric - [battery]kWh)"
//   - Add a method "getRange(): number" that returns batteryCapacity * 4
//     (rough estimate: 4 miles per kWh)
//
// Create one regular Vehicle and one ElectricVehicle. Print their info.
//
// Expected output:
//   2023 Toyota Camry
//   2024 Tesla Model 3 (Electric - 75kWh)
//   Estimated range: 300 miles
// ============================================================================

console.log("--- Exercise 8: Inheritance ---");

// YOUR CODE HERE:


console.log(""); // spacing

// ============================================================================
// EXERCISE 9: Generics [CHALLENGE]
// ============================================================================
// Concepts tested: generic functions, generic interfaces
//
// Part A: Write a generic function called "wrapInArray" that:
//   - Takes a single value of any type T
//   - Returns an array containing just that value: [value]
//   Example: wrapInArray(5) returns [5], wrapInArray("hi") returns ["hi"]
//
// Part B: Write a generic function called "getProperty" that:
//   - Takes an object of type T and a key of type keyof T
//   - Returns the value at that key
//   HINT: "keyof T" means "any valid property name of T"
//   Example: getProperty({name: "Alice", age: 30}, "name") returns "Alice"
//
// Part C: Create a generic interface "Result<T>" with:
//   - success: boolean
//   - data: T (if success is true)
//   - error: string (optional, if success is false)
//
//   Create a success Result<number> and a failure Result<string>.
//
// Expected output:
//   Wrapped number: [42]
//   Wrapped string: ["hello"]
//   Name property: Alice
//   Success result: 100
//   Error result: Something went wrong
// ============================================================================

console.log("--- Exercise 9: Generics ---");

// YOUR CODE HERE:


console.log(""); // spacing

// ============================================================================
// EXERCISE 10: Putting It ALL Together [CHALLENGE]
// ============================================================================
// Concepts tested: EVERYTHING from files 01-05
//
// Build a simple LIBRARY SYSTEM:
//
// 1. Create a string enum "Genre" with at least 3 genres
//    (e.g., Fiction, NonFiction, Science, History)
//
// 2. Create an interface "Book" with:
//    - title: string
//    - author: string
//    - year: number
//    - genre: Genre
//    - isAvailable: boolean
//
// 3. Create a class "Library" with:
//    - PRIVATE property: books (Book array, starts empty)
//    - Method "addBook(book: Book): void" -- adds a book to the library
//    - Method "getAvailableBooks(): Book[]" -- returns only available books
//    - Method "searchByGenre(genre: Genre): Book[]" -- returns books of that genre
//    - Method "borrowBook(title: string): string" -- finds the book by title,
//      sets isAvailable to false, and returns "Borrowed: [title]"
//      If already borrowed, return "[title] is not available"
//      If not found, return "Book not found: [title]"
//    - Method "returnBook(title: string): string" -- finds the book by title,
//      sets isAvailable to true, and returns "Returned: [title]"
//    - Method "getSummary(): string" -- returns:
//      "Library has [total] books ([available] available, [borrowed] borrowed)"
//
// 4. Create a library, add at least 4 books, then:
//    - Print the summary
//    - Borrow a book
//    - Print the summary again
//    - Search by a genre
//    - Return the book
//    - Print the summary one more time
//
// Expected output (will vary based on your books):
//   Library has 4 books (4 available, 0 borrowed)
//   Borrowed: The Great Gatsby
//   Library has 4 books (3 available, 1 borrowed)
//   Science Fiction books: Dune, Ender's Game
//   Returned: The Great Gatsby
//   Library has 4 books (4 available, 0 borrowed)
// ============================================================================

console.log("--- Exercise 10: Library System ---");

// YOUR CODE HERE:


console.log(""); // spacing

// ============================================================================
// CONGRATULATIONS!
// ============================================================================

console.log("==============================================");
console.log("  FINISHED! YOU COMPLETED ALL 10 EXERCISES!   ");
console.log("==============================================");
console.log("");
console.log("What you have learned:");
console.log("  1. Basic types (string, number, boolean)");
console.log("  2. Variables (let vs const)");
console.log("  3. Arrays and how to use them");
console.log("  4. Interfaces (blueprints for objects)");
console.log("  5. Functions (regular, arrow, optional/default params)");
console.log("  6. Classes (constructor, methods, public/private/protected)");
console.log("  7. Inheritance (extends, super)");
console.log("  8. Enums (named constants)");
console.log("  9. Generics (flexible, reusable code)");
console.log("  10. Combining everything into a real-world example");
console.log("");
console.log("NEXT STEPS:");
console.log("  - Review any exercises you found difficult.");
console.log("  - Try modifying the exercises to add new features.");
console.log("  - Move on to Day 2 for HTML/CSS fundamentals.");
console.log("  - Practice typing out code from memory -- do not just read it.");
console.log("");
console.log("INTERVIEW TIP:");
console.log("  Be ready to write TypeScript code on a whiteboard or in a");
console.log("  coding challenge. Practice writing WITHOUT autocomplete.");
console.log("  The exercises above are similar to what you might be asked.");
