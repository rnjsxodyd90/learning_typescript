// ============================================================================
// 03-classes.ts -- Blueprints That DO Things
// ============================================================================
//
// HOW TO RUN THIS FILE:
//   ts-node 03-classes.ts
//
// WHAT YOU WILL LEARN:
//   - What a class is and how it differs from an interface
//   - The constructor (how objects are created)
//   - Properties (data the object holds)
//   - Methods (actions the object can perform)
//   - Access modifiers: public, private, protected
//   - Inheritance (one class building on another)
//
// PREREQUISITE: You should have completed 01 and 02 first.
//
// ============================================================================

// ============================================================================
// SECTION 1: What is a Class?
// ============================================================================

// Remember interfaces? An interface says "an object must LOOK like this."
// But an interface is ONLY a description. It cannot DO anything.
//
// A CLASS says "an object must look like this AND can DO these things."
//
// Real-world analogy:
//
//   INTERFACE = A car specification sheet
//     "Must have 4 wheels, an engine, and a steering wheel."
//     (Just a description on paper -- it is not an actual car.)
//
//   CLASS = A car FACTORY
//     "Here is the blueprint for building a car. It will have 4 wheels,
//      an engine, and a steering wheel. AND it can start(), stop(), and honk()."
//     (The factory can actually BUILD real cars from this blueprint.)
//
//   OBJECT = An actual car that was built by the factory
//     "This specific red Toyota with license plate ABC-1234."
//     (A real thing, created from the class blueprint.)

console.log("--- SECTION 1: What is a Class? ---");
console.log("An interface = a description (no code).");
console.log("A class = a blueprint with code (data + actions).");
console.log("An object = a real thing created from the class.");

console.log(""); // Empty line for spacing

// ============================================================================
// SECTION 2: Your First Class
// ============================================================================

console.log("--- SECTION 2: Your First Class ---");

// Let's create a simple class for a "Dog":

class Dog {
  // ---- PROPERTIES ----
  // Properties are the DATA that every Dog object will hold.
  // Think of them as the fields on an ID card for the dog.

  name: string;    // Every dog has a name (text)
  breed: string;   // Every dog has a breed (text)
  age: number;     // Every dog has an age (number)

  // ---- CONSTRUCTOR ----
  // The constructor is a special function that runs WHEN a new Dog is created.
  // It "constructs" (builds) the object and sets its initial values.
  //
  // Think of it like filling out the adoption paperwork when you get a new dog.
  // You MUST provide the name, breed, and age at the time of creation.

  constructor(name: string, breed: string, age: number) {
    // "this" refers to THE OBJECT BEING CREATED right now.
    // "this.name" means "this dog's name property"
    // "name" (without "this.") is the value passed into the constructor
    this.name = name;     // Set this dog's name to the name we received
    this.breed = breed;   // Set this dog's breed to the breed we received
    this.age = age;       // Set this dog's age to the age we received
  }

  // ---- METHODS ----
  // Methods are ACTIONS (functions) that the object can perform.
  // A dog can bark, fetch, and introduce itself.

  bark(): void {
    // "void" means this method does not return any value -- it just does something.
    console.log(`${this.name} says: Woof! Woof!`);
  }

  fetch(item: string): void {
    // This method takes a parameter (what to fetch)
    console.log(`${this.name} fetches the ${item}!`);
  }

  describe(): string {
    // This method RETURNS a string (gives back a value).
    // "string" after the colon means "this method gives back text."
    return `${this.name} is a ${this.age}-year-old ${this.breed}.`;
  }
}

// Now let's CREATE actual Dog objects using the class:
// The "new" keyword tells TypeScript: "Use the Dog class to build a new object."

let dog1: Dog = new Dog("Buddy", "Golden Retriever", 3);
// This calls the constructor with name="Buddy", breed="Golden Retriever", age=3

let dog2: Dog = new Dog("Max", "German Shepherd", 5);
// This calls the constructor with name="Max", breed="German Shepherd", age=5

// Use the properties:
console.log("Dog 1 name:", dog1.name);   // Prints: Dog 1 name: Buddy
console.log("Dog 2 breed:", dog2.breed); // Prints: Dog 2 breed: German Shepherd

// Call the methods:
dog1.bark();                              // Prints: Buddy says: Woof! Woof!
dog2.bark();                              // Prints: Max says: Woof! Woof!
dog1.fetch("ball");                       // Prints: Buddy fetches the ball!
dog2.fetch("stick");                      // Prints: Max fetches the stick!

let description: string = dog1.describe(); // Get the description string back
console.log(description);                   // Prints: Buddy is a 3-year-old Golden Retriever.

console.log(""); // Empty line for spacing

// ============================================================================
// SECTION 3: A Car Class (More Detailed Example)
// ============================================================================

console.log("--- SECTION 3: Car Class ---");

class Car {
  // Properties:
  make: string;        // The manufacturer (Toyota, Honda, etc.)
  model: string;       // The model name (Camry, Civic, etc.)
  year: number;        // The year it was made
  speed: number;       // Current speed in mph (starts at 0)
  isRunning: boolean;  // Is the engine on?

  // Constructor: creates a new car
  constructor(make: string, model: string, year: number) {
    this.make = make;
    this.model = model;
    this.year = year;
    this.speed = 0;        // Every new car starts at 0 mph
    this.isRunning = false; // Every new car starts with the engine off
  }

  // Method: start the engine
  start(): void {
    if (this.isRunning) {
      // If the car is already running, tell the user
      console.log(`${this.make} ${this.model} is already running.`);
    } else {
      // If the car is off, turn it on
      this.isRunning = true; // Change the property to true
      console.log(`${this.make} ${this.model} engine started! Vroom!`);
    }
  }

  // Method: stop the engine
  stop(): void {
    if (!this.isRunning) {
      // "!" means NOT. "!this.isRunning" means "if the car is NOT running"
      console.log(`${this.make} ${this.model} is already stopped.`);
    } else {
      this.isRunning = false;
      this.speed = 0; // When you stop the engine, speed goes to 0
      console.log(`${this.make} ${this.model} engine stopped.`);
    }
  }

  // Method: accelerate (go faster)
  accelerate(amount: number): void {
    if (!this.isRunning) {
      console.log("Start the engine first!");
      return; // "return" exits the method immediately -- nothing else runs
    }
    this.speed = this.speed + amount; // Increase speed by the given amount
    console.log(`${this.make} ${this.model} accelerates to ${this.speed} mph.`);
  }

  // Method: brake (slow down)
  brake(amount: number): void {
    this.speed = this.speed - amount; // Decrease speed by the given amount
    if (this.speed < 0) {
      this.speed = 0; // Speed can't go below 0
    }
    console.log(`${this.make} ${this.model} slows to ${this.speed} mph.`);
  }

  // Method: get a summary of the car
  getInfo(): string {
    return `${this.year} ${this.make} ${this.model} | Speed: ${this.speed} mph | Engine: ${this.isRunning ? "On" : "Off"}`;
  }
}

// Create a car and use it:
let myCar: Car = new Car("Toyota", "Camry", 2023);
console.log(myCar.getInfo());      // 2023 Toyota Camry | Speed: 0 mph | Engine: Off

myCar.accelerate(30);              // Start the engine first!
myCar.start();                     // Toyota Camry engine started! Vroom!
myCar.accelerate(30);              // Toyota Camry accelerates to 30 mph.
myCar.accelerate(25);              // Toyota Camry accelerates to 55 mph.
myCar.brake(15);                   // Toyota Camry slows to 40 mph.
console.log(myCar.getInfo());      // 2023 Toyota Camry | Speed: 40 mph | Engine: On
myCar.stop();                      // Toyota Camry engine stopped.
console.log(myCar.getInfo());      // 2023 Toyota Camry | Speed: 0 mph | Engine: Off

console.log(""); // Empty line for spacing

// ============================================================================
// SECTION 4: Access Modifiers (public, private, protected)
// ============================================================================

// Access modifiers control WHO can see and use a property or method.
//
// Think of it like rooms in a building:
//
//   PUBLIC    = The lobby. ANYONE can walk in. (Default in TypeScript)
//   PRIVATE   = The vault. ONLY people inside the building can access it.
//              (Only code inside the class can use it.)
//   PROTECTED = The employee break room. People in THIS building AND
//              branch offices can access it.
//              (The class itself AND classes that extend it can use it.)

console.log("--- SECTION 4: Access Modifiers ---");

class BankAccount {
  // PUBLIC: Anyone can see the account holder's name
  public ownerName: string;

  // PRIVATE: Only the BankAccount class itself can access the balance.
  // You can't just reach in and change someone's bank balance from outside!
  private balance: number;

  // PROTECTED: The class and its children (subclasses) can access this.
  // We will see "children/subclasses" in Section 5.
  protected accountType: string;

  constructor(ownerName: string, initialBalance: number, accountType: string) {
    this.ownerName = ownerName;
    this.balance = initialBalance;
    this.accountType = accountType;
  }

  // PUBLIC method: anyone can call this to deposit money
  public deposit(amount: number): void {
    if (amount <= 0) {
      console.log("Deposit amount must be positive!");
      return;
    }
    this.balance = this.balance + amount; // We CAN access 'balance' here -- we are INSIDE the class
    console.log(`Deposited $${amount}. New balance: $${this.balance}`);
  }

  // PUBLIC method: anyone can call this to withdraw money
  public withdraw(amount: number): void {
    if (amount > this.balance) {
      console.log("Insufficient funds!");
      return;
    }
    this.balance = this.balance - amount;
    console.log(`Withdrew $${amount}. New balance: $${this.balance}`);
  }

  // PUBLIC method: anyone can call this to CHECK the balance (but not change it directly)
  public getBalance(): number {
    return this.balance; // Returns the balance value
  }
}

let account: BankAccount = new BankAccount("Alice", 1000, "Savings");

// PUBLIC property -- accessible from outside:
console.log("Account owner:", account.ownerName); // Works fine!

// PUBLIC methods -- accessible from outside:
account.deposit(500);   // Deposited $500. New balance: $1500
account.withdraw(200);  // Withdrew $200. New balance: $1300
console.log("Current balance:", account.getBalance()); // Current balance: 1300

// PRIVATE property -- NOT accessible from outside:
// Uncomment to see the error:
// console.log(account.balance);
// ERROR! Property 'balance' is private and only accessible within class 'BankAccount'.

// PROTECTED property -- NOT accessible from outside:
// Uncomment to see the error:
// console.log(account.accountType);
// ERROR! Property 'accountType' is protected and only accessible within class 'BankAccount' and its subclasses.

// WHY use private?
// Because you want to CONTROL how the data is changed.
// You don't want someone to do: account.balance = 999999999;
// Instead, they must use deposit() and withdraw(), which have RULES (like checking for sufficient funds).

console.log(""); // Empty line for spacing

// ============================================================================
// SECTION 5: Constructor Shorthand
// ============================================================================

// Writing out properties AND then assigning them in the constructor is repetitive.
// TypeScript has a SHORTHAND: put the access modifier (public/private/protected)
// directly in the constructor parameters, and TypeScript creates the properties for you.

console.log("--- SECTION 5: Constructor Shorthand ---");

// LONG way (what we have been doing):
class PersonLong {
  name: string;
  age: number;

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }
}

// SHORT way (same result, less code):
class PersonShort {
  // By putting "public" in the constructor, TypeScript automatically:
  // 1. Creates the property
  // 2. Assigns the value
  // No need to write "this.name = name" -- it is done for you!
  constructor(
    public name: string,   // Automatically creates a public "name" property
    public age: number     // Automatically creates a public "age" property
  ) {
    // Constructor body is empty! Everything is handled by the shorthand above.
  }
}

let shortPerson: PersonShort = new PersonShort("Dave", 40);
console.log("Name:", shortPerson.name); // Prints: Name: Dave
console.log("Age:", shortPerson.age);   // Prints: Age: 40

// This shorthand works with private and protected too:
class SecretAgent {
  constructor(
    public codeName: string,    // Anyone can see the code name
    private realName: string,   // Only the class itself can see the real name
    protected agency: string    // The class and its subclasses can see the agency
  ) {}

  // Public method to reveal identity (controlled access to private data)
  revealIdentity(): string {
    return `${this.codeName} is actually ${this.realName} from ${this.agency}`;
  }
}

let agent: SecretAgent = new SecretAgent("Shadow", "John Smith", "MI6");
console.log("Code name:", agent.codeName);        // Works! Code name: Shadow
console.log(agent.revealIdentity());              // Works! Shadow is actually John Smith from MI6
// console.log(agent.realName);                   // ERROR! realName is private

console.log(""); // Empty line for spacing

// ============================================================================
// SECTION 6: Inheritance (One Class Building on Another)
// ============================================================================

// Inheritance means one class can EXTEND another class.
// The new class gets ALL the properties and methods of the parent class,
// PLUS it can add its own.
//
// Real-world analogy:
//   Base class: "Vehicle" (has wheels, can move)
//   Child class: "Motorcycle" (is a Vehicle, but also has handlebars)
//   Child class: "Truck" (is a Vehicle, but also has a cargo bed)
//
// The "extends" keyword means "this class is a more specific version of that class."

console.log("--- SECTION 6: Inheritance ---");

// Parent class (also called "base class" or "superclass"):
class Animal {
  constructor(
    public name: string,
    public sound: string,
    protected legs: number // Protected so child classes can access it
  ) {}

  makeSound(): void {
    console.log(`${this.name} says: ${this.sound}!`);
  }

  describe(): void {
    console.log(`${this.name} has ${this.legs} legs.`);
  }
}

// Child class (also called "subclass" or "derived class"):
// Cat EXTENDS Animal -- it gets everything Animal has, plus more.
class Cat extends Animal {
  // Cat has an extra property: isIndoor
  isIndoor: boolean;

  constructor(name: string, isIndoor: boolean) {
    // "super" calls the PARENT'S constructor.
    // We must call super() FIRST in a child class constructor.
    // We pass the values that the Animal constructor needs.
    super(name, "Meow", 4); // All cats say "Meow" and have 4 legs
    this.isIndoor = isIndoor; // Set the Cat-specific property
  }

  // Cat has an extra method that only cats have:
  purr(): void {
    console.log(`${this.name} is purring... prrrr`);
  }
}

// Another child class:
class Snake extends Animal {
  venomous: boolean;

  constructor(name: string, venomous: boolean) {
    super(name, "Hiss", 0); // Snakes say "Hiss" and have 0 legs
    this.venomous = venomous;
  }

  slither(): void {
    console.log(`${this.name} is slithering across the ground.`);
  }
}

// Create instances:
let myCat: Cat = new Cat("Whiskers", true);
let mySnake: Snake = new Snake("Slinky", false);

// Cat has Animal's methods (inherited):
myCat.makeSound();  // Whiskers says: Meow!
myCat.describe();   // Whiskers has 4 legs.

// Cat also has its OWN methods:
myCat.purr();       // Whiskers is purring... prrrr

// Snake has Animal's methods (inherited):
mySnake.makeSound(); // Slinky says: Hiss!
mySnake.describe();  // Slinky has 0 legs.

// Snake also has its OWN methods:
mySnake.slither();   // Slinky is slithering across the ground.

console.log(""); // Empty line for spacing

// ============================================================================
// SECTION 7: Classes Implementing Interfaces
// ============================================================================

// A class can IMPLEMENT an interface. This means the class PROMISES to have
// all the properties and methods that the interface describes.
//
// The "implements" keyword enforces this promise.

console.log("--- SECTION 7: Classes Implementing Interfaces ---");

// Define an interface:
interface Printable {
  // Any class that implements Printable MUST have a print() method
  print(): void;
}

interface Saveable {
  // Any class that implements Saveable MUST have a save() method
  save(): boolean;
}

// A class can implement MULTIPLE interfaces (separated by commas):
class Document implements Printable, Saveable {
  constructor(
    public title: string,
    public content: string
  ) {}

  // We MUST implement print() because we said "implements Printable"
  print(): void {
    console.log(`--- Printing: ${this.title} ---`);
    console.log(this.content);
    console.log(`--- End of document ---`);
  }

  // We MUST implement save() because we said "implements Saveable"
  save(): boolean {
    console.log(`Saving "${this.title}"... Done!`);
    return true; // Returns true to indicate success
  }
}

let doc: Document = new Document("My Report", "This is the report content.");
doc.print();
// Prints:
//   --- Printing: My Report ---
//   This is the report content.
//   --- End of document ---

let saved: boolean = doc.save();
// Prints: Saving "My Report"... Done!
console.log("Was saved successfully?", saved); // Prints: Was saved successfully? true

console.log(""); // Empty line for spacing

// ============================================================================
// SECTION 8: Interview Quick Reference
// ============================================================================

console.log("--- SECTION 8: Interview Quick Reference ---");
console.log("Q: What is a class in TypeScript?");
console.log("A: A blueprint for creating objects. It defines both data (properties)");
console.log("   and behavior (methods). Objects are created using the 'new' keyword.");
console.log("");
console.log("Q: What is the constructor?");
console.log("A: A special method that runs when you create a new object with 'new'.");
console.log("   It sets up the initial values of the object's properties.");
console.log("");
console.log("Q: What is the difference between public, private, and protected?");
console.log("A: public = accessible from anywhere (default).");
console.log("   private = accessible ONLY inside the class itself.");
console.log("   protected = accessible inside the class AND its child classes.");
console.log("");
console.log("Q: What is inheritance?");
console.log("A: When a child class extends a parent class, it gets all the parent's");
console.log("   properties and methods, and can add its own. Use 'extends' keyword.");
console.log("");
console.log("Q: What does 'implements' do?");
console.log("A: It forces a class to follow an interface's blueprint -- the class");
console.log("   MUST have all the properties and methods the interface defines.");

console.log(""); // Empty line for spacing

// ============================================================================
// EXERCISES -- Your Turn!
// ============================================================================

console.log("========== EXERCISES ==========");
console.log("");

// EXERCISE 1:
// Create a class called "Animal2" with:
//   - Properties: name (string), species (string), sound (string)
//   - Constructor that takes name, species, and sound
//   - A method called "speak()" that prints: "[name] the [species] says [sound]!"
//
// Create 2 animals and call speak() on each.
// Expected output:
//   Rex the Dog says Woof!
//   Tweety the Bird says Tweet!

// Write your code here:


// EXERCISE 2:
// Create a class called "Calculator" with:
//   - A private property called "result" (number), initialized to 0
//   - Methods: add(n), subtract(n), multiply(n), getResult()
//   - Each math method should update the result and return the Calculator itself
//     (This allows "method chaining" -- bonus if you figure it out!)
//   - getResult() should return the current result
//
// Create a calculator and do: add 10, subtract 3, multiply 2
// Expected output:
//   Result: 14
//
// HINT: To allow chaining, each math method should return "this"

// Write your code here:


// EXERCISE 3:
// Create a base class called "Shape" with:
//   - A property called "color" (string)
//   - A method called "describe()" that prints: "This is a [color] shape."
//
// Create a child class called "Circle" that extends Shape with:
//   - An additional property called "radius" (number)
//   - A method called "getArea()" that returns Math.PI * this.radius * this.radius
//   - Override describe() to print: "This is a [color] circle with radius [radius]."
//
// Create a Circle and call describe() and getArea().
// Expected output:
//   This is a red circle with radius 5.
//   Area: 78.53981633974483
//
// HINT: Math.PI is a built-in constant that equals 3.14159...

// Write your code here:


// EXERCISE 4 (Challenge):
// Create a class called "TodoList" with:
//   - A private array of strings called "tasks"
//   - A method "addTask(task: string)" that adds a task
//   - A method "removeTask(index: number)" that removes a task by its position
//   - A method "listTasks()" that prints all tasks with their index
//
// Add 3 tasks, list them, remove one, and list again.
// Expected output:
//   Tasks:
//   0: Buy groceries
//   1: Clean the house
//   2: Walk the dog
//   After removing task 1:
//   0: Buy groceries
//   1: Walk the dog

// Write your code here:


console.log("");
console.log("If you see your exercise output above, great job!");
console.log("Move on to 04-functions.ts when you are ready.");
