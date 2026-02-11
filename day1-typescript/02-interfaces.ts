// ============================================================================
// 02-interfaces.ts -- Blueprints for Objects
// ============================================================================
//
// HOW TO RUN THIS FILE:
//   ts-node 02-interfaces.ts
//
// WHAT YOU WILL LEARN:
//   - What an "object" is
//   - What an "interface" is (a blueprint/shape for an object)
//   - How to create and use interfaces
//   - Optional properties (the ? symbol)
//   - Using interfaces with functions
//
// PREREQUISITE: You should have completed 01-basic-types.ts first.
//
// ============================================================================

// ============================================================================
// SECTION 1: What is an Object?
// ============================================================================

// In the last file, we learned about simple types: string, number, boolean.
// But real-world things are not just a single value.
//
// A PERSON is not just a name (string). A person has:
//   - a name (string)
//   - an age (number)
//   - an email (string)
//
// An "object" lets us group related values together under one name.
// Think of it like a FORM or an ID CARD with multiple fields.

console.log("--- SECTION 1: What is an Object? ---");

// Here is an object with NO type safety (bad practice, but let's see it first):
let person1 = {
  name: "Alice",   // the "name" field holds the string "Alice"
  age: 30,         // the "age" field holds the number 30
  email: "alice@example.com" // the "email" field holds this string
};

// To access a value inside an object, use a DOT (.) followed by the field name:
console.log("Name:", person1.name);   // Prints: Name: Alice
console.log("Age:", person1.age);     // Prints: Age: 30
console.log("Email:", person1.email); // Prints: Email: alice@example.com

// The problem: TypeScript INFERRED the types here, but what if we make a typo later?
// What if we create a second person and forget the email field?
// We need a BLUEPRINT that says "every person MUST have these fields."
// That blueprint is called an INTERFACE.

console.log(""); // Empty line for spacing

// ============================================================================
// SECTION 2: What is an Interface?
// ============================================================================

// An INTERFACE is a blueprint that describes the SHAPE of an object.
//
// Real-world analogy: Think of a job application form.
//   The form DEFINES what fields must be filled in:
//     - Full Name: ___________
//     - Phone Number: ___________
//     - Years of Experience: ___________
//
//   The form itself is the INTERFACE.
//   Each completed form (with actual data) is an OBJECT.
//
// The interface does NOT hold any data itself.
// It just says "any object that claims to be this type MUST have these fields."

console.log("--- SECTION 2: Interfaces ---");

// Here is how you create an interface:

interface Person {        // "interface" keyword tells TypeScript: "this is a blueprint"
  name: string;           // Every Person MUST have a "name" that is a string
  age: number;            // Every Person MUST have an "age" that is a number
  email: string;          // Every Person MUST have an "email" that is a string
}

// Now let's create objects that follow this blueprint:

let person2: Person = {   // ": Person" means "this object must match the Person interface"
  name: "Bob",            // Required -- must be a string
  age: 25,                // Required -- must be a number
  email: "bob@test.com"   // Required -- must be a string
};

console.log("Person 2:", person2.name, "is", person2.age, "years old");
// Prints: Person 2: Bob is 25 years old

let person3: Person = {
  name: "Carol",
  age: 35,
  email: "carol@test.com"
};

console.log("Person 3:", person3.name, "is", person3.age, "years old");
// Prints: Person 3: Carol is 35 years old

// What happens if you FORGET a required field?
// Uncomment the next block to see the error:
//
// let person4: Person = {
//   name: "Dave",
//   age: 40
//   // ERROR! Property 'email' is missing in type but required in type 'Person'
// };

// What happens if you add an EXTRA field that is not in the interface?
// Uncomment the next block to see the error:
//
// let person5: Person = {
//   name: "Eve",
//   age: 28,
//   email: "eve@test.com",
//   phone: "555-1234"  // ERROR! 'phone' does not exist in type 'Person'
// };

console.log(""); // Empty line for spacing

// ============================================================================
// SECTION 3: Optional Properties (the ? symbol)
// ============================================================================

// Sometimes a field is NOT required. Not everyone has a middle name, for example.
// In TypeScript, you use a QUESTION MARK (?) after the property name to make it optional.
//
// Real-world analogy: On that job application form, some fields say "(optional)"
// next to them. You can fill them in or leave them blank.

console.log("--- SECTION 3: Optional Properties ---");

interface Employee {
  firstName: string;          // Required -- everyone has a first name
  lastName: string;           // Required -- everyone has a last name
  middleName?: string;        // OPTIONAL -- the ? means this can be left out
  age: number;                // Required
  department?: string;        // OPTIONAL -- maybe they have not been assigned yet
}

// This is VALID -- we left out middleName and department (they are optional):
let employee1: Employee = {
  firstName: "John",
  lastName: "Smith",
  age: 28
};

console.log("Employee 1:", employee1.firstName, employee1.lastName);
// Prints: Employee 1: John Smith
console.log("Middle name:", employee1.middleName);
// Prints: Middle name: undefined  (because we did not provide it)

// This is ALSO valid -- we included the optional fields:
let employee2: Employee = {
  firstName: "Jane",
  lastName: "Doe",
  middleName: "Marie",     // Optional but we chose to include it
  age: 32,
  department: "Engineering" // Optional but we chose to include it
};

console.log("Employee 2:", employee2.firstName, employee2.middleName, employee2.lastName);
// Prints: Employee 2: Jane Marie Doe
console.log("Department:", employee2.department);
// Prints: Department: Engineering

// BEST PRACTICE: Check if an optional property exists before using it
if (employee1.department) {
  // This code only runs if department has a value (not undefined)
  console.log("Dept:", employee1.department);
} else {
  console.log("Employee 1 has no department assigned yet.");
  // Prints: Employee 1 has no department assigned yet.
}

console.log(""); // Empty line for spacing

// ============================================================================
// SECTION 4: Interfaces with Functions
// ============================================================================

// Interfaces become REALLY powerful when you use them with functions.
//
// Remember: a function is a reusable block of code that does something.
// (We will learn functions in detail in file 04, but here is a quick preview.)
//
// By using an interface as a function parameter type, you guarantee that
// the function will ALWAYS receive the right kind of data.

console.log("--- SECTION 4: Interfaces with Functions ---");

// This interface describes what a "product" looks like:
interface Product {
  name: string;       // What is the product called?
  price: number;      // How much does it cost?
  inStock: boolean;   // Is it available right now?
}

// This function takes a Product and prints its details.
// "product: Product" means the parameter MUST match the Product interface.
function displayProduct(product: Product): void {
  // "void" means this function does NOT return anything -- it just prints.
  console.log(`Product: ${product.name}`);
  console.log(`  Price: $${product.price}`);
  console.log(`  In Stock: ${product.inStock ? "Yes" : "No"}`);
  // The "? :" above is a "ternary operator" -- a shortcut for if/else:
  // condition ? "value if true" : "value if false"
}

// Create some products:
let laptop: Product = {
  name: "MacBook Pro",
  price: 1999.99,
  inStock: true
};

let phone: Product = {
  name: "iPhone 15",
  price: 999,
  inStock: false
};

// Use the function:
displayProduct(laptop);
// Prints:
//   Product: MacBook Pro
//     Price: $1999.99
//     In Stock: Yes

displayProduct(phone);
// Prints:
//   Product: iPhone 15
//     Price: $999
//     In Stock: No

// What if we try to pass something that does NOT match the Product interface?
// Uncomment to see the error:
//
// displayProduct({ name: "Pen" });
// ERROR! Property 'price' is missing. Property 'inStock' is missing.

// This is the POWER of interfaces:
// The function is GUARANTEED to receive valid data. No surprises. No crashes.

console.log(""); // Empty line for spacing

// ============================================================================
// SECTION 5: Nesting Interfaces (Interfaces inside Interfaces)
// ============================================================================

// Objects can contain OTHER objects. Interfaces handle this naturally.
//
// Real-world analogy: A shipping label has an ADDRESS on it.
// The address itself is a structured object (street, city, zip code).

console.log("--- SECTION 5: Nested Interfaces ---");

// First, define what an Address looks like:
interface Address {
  street: string;    // e.g., "123 Main St"
  city: string;      // e.g., "Springfield"
  state: string;     // e.g., "IL"
  zipCode: string;   // e.g., "62704" (string because some zip codes start with 0)
}

// Then, define a Customer that HAS an address:
interface Customer {
  name: string;
  email: string;
  address: Address;  // This is a NESTED interface -- Address is used inside Customer
}

// Create a customer with a full address:
let customer1: Customer = {
  name: "Sarah Johnson",
  email: "sarah@example.com",
  address: {                    // This inner object must match the Address interface
    street: "456 Oak Avenue",
    city: "Portland",
    state: "OR",
    zipCode: "97201"
  }
};

console.log("Customer:", customer1.name);
console.log("Lives at:", customer1.address.street); // Access nested properties with dots
console.log("City:", customer1.address.city, customer1.address.state);
// Prints:
//   Customer: Sarah Johnson
//   Lives at: 456 Oak Avenue
//   City: Portland OR

console.log(""); // Empty line for spacing

// ============================================================================
// SECTION 6: Arrays of Interfaces
// ============================================================================

// You can have an ARRAY (list) of objects that all follow the same interface.
// This is EXTREMELY common in real applications.
// Think of it: a list of users, a list of products, a list of orders.

console.log("--- SECTION 6: Arrays of Interfaces ---");

// Reusing our Product interface from above:
let inventory: Product[] = [  // Product[] means "an array where every item is a Product"
  { name: "Keyboard", price: 49.99, inStock: true },
  { name: "Mouse", price: 29.99, inStock: true },
  { name: "Monitor", price: 299.99, inStock: false },
  { name: "Webcam", price: 79.99, inStock: true }
];

console.log("Total products in inventory:", inventory.length);
// Prints: Total products in inventory: 4

// Loop through the array and print each product:
// "for...of" is a loop that goes through each item in an array, one at a time.
console.log("\nAll products:");
for (let item of inventory) {
  // "item" is a Product -- TypeScript knows this because the array is Product[]
  let status: string = item.inStock ? "Available" : "Out of Stock";
  console.log(`  ${item.name} - $${item.price} (${status})`);
}
// Prints:
//   All products:
//     Keyboard - $49.99 (Available)
//     Mouse - $29.99 (Available)
//     Monitor - $299.99 (Out of Stock)
//     Webcam - $79.99 (Available)

console.log(""); // Empty line for spacing

// ============================================================================
// SECTION 7: Readonly Properties
// ============================================================================

// Sometimes you want a property to be SET ONCE and then NEVER changed.
// Use the "readonly" keyword for this.
//
// Real-world analogy: Your Social Security Number is set when you are born
// and should never change.

console.log("--- SECTION 7: Readonly Properties ---");

interface UserAccount {
  readonly id: number;     // Once set, this can NEVER be changed
  username: string;        // This CAN be changed
  email: string;           // This CAN be changed
}

let user1: UserAccount = {
  id: 1001,
  username: "coolcoder42",
  email: "cool@example.com"
};

console.log("User:", user1.username, "(ID:", user1.id, ")");
// Prints: User: coolcoder42 (ID: 1001 )

user1.username = "supercoder99"; // This is fine -- username is not readonly
console.log("Updated username:", user1.username);
// Prints: Updated username: supercoder99

// Uncomment to see the error:
// user1.id = 9999; // ERROR! Cannot assign to 'id' because it is a read-only property.

console.log(""); // Empty line for spacing

// ============================================================================
// SECTION 8: Interview Quick Reference
// ============================================================================

console.log("--- SECTION 8: Interview Quick Reference ---");
console.log("Q: What is an interface in TypeScript?");
console.log("A: An interface defines the SHAPE of an object -- what properties");
console.log("   it must have and what types those properties must be.");
console.log("");
console.log("Q: Can an interface contain methods?");
console.log("A: Yes! An interface can describe function signatures too.");
console.log("   (We will see this more in 03-classes.ts and 04-functions.ts)");
console.log("");
console.log("Q: What is the difference between an interface and a class?");
console.log("A: An interface is JUST a blueprint -- it has no actual code.");
console.log("   A class is a blueprint WITH code -- it can DO things.");
console.log("   (We will learn about classes in 03-classes.ts)");

console.log(""); // Empty line for spacing

// ============================================================================
// EXERCISES -- Your Turn!
// ============================================================================

console.log("========== EXERCISES ==========");
console.log("");

// EXERCISE 1:
// Create an interface called "Book" with the following properties:
//   - title (string, required)
//   - author (string, required)
//   - pages (number, required)
//   - isRead (boolean, required)
//   - genre (string, optional)
//
// Then create a variable called "myBook" of type Book and fill it in.
// Print the book's title and author.
// Expected output: My book: [title] by [author]

// Write your code here:


// EXERCISE 2:
// Create an interface called "MovieTicket" with:
//   - movieName (string)
//   - seatNumber (string)
//   - price (number)
//   - isVIP (boolean, optional)
//
// Create an ARRAY of 3 MovieTicket objects.
// Loop through them and print each one.
// Expected output (3 lines, one per ticket):
//   Movie: [name], Seat: [seat], Price: $[price]

// Write your code here:


// EXERCISE 3:
// Create an interface called "ContactInfo" with:
//   - phone (string)
//   - email (string)
//
// Create an interface called "Student" with:
//   - name (string)
//   - grade (number)
//   - contact (ContactInfo)  <-- nested interface!
//
// Create a Student object and print their name and email.
// Expected output: Student [name] can be reached at [email]

// Write your code here:


// EXERCISE 4 (Challenge):
// Create a function called "describeBook" that takes a Book parameter
// (from Exercise 1) and prints a description like:
//   "[title]" by [author] - [pages] pages - [Read/Not Read]
// Call the function with your myBook variable.
// HINT: Look at the displayProduct function in Section 4 above.

// Write your code here:


console.log("");
console.log("If you see your exercise output above, great job!");
console.log("Move on to 03-classes.ts when you are ready.");
