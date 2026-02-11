/*
 * =============================================================================
 * 04 - CLASSES: Object-Oriented Programming Basics
 * =============================================================================
 *
 * GOAL: Understand classes, objects, constructors, methods, and access modifiers.
 *
 * CLASSES IN JAVA vs JAVASCRIPT:
 *
 * JavaScript classes are "syntactic sugar" over prototype-based inheritance.
 * Java classes are the REAL DEAL -- everything in Java revolves around classes.
 * In Java, you literally cannot write code outside of a class.
 *
 * JavaScript:                        Java:
 *   class Product {                    public class Product {
 *     constructor(name, price) {         private String name;
 *       this.name = name;                private double price;
 *       this.price = price;
 *     }                                  public Product(String name, double price) {
 *                                          this.name = name;
 *     getInfo() {                          this.price = price;
 *       return `${this.name}`;           }
 *     }
 *   }                                   public String getInfo() {
 *                                          return this.name;
 *                                        }
 *                                      }
 *
 * KEY DIFFERENCES:
 * 1. Java fields must be declared with types BEFORE the constructor.
 * 2. Java has access modifiers (public, private, protected) -- JS doesn't
 *    (JS has # for private, but it's newer and different).
 * 3. Java methods must declare their return type.
 * 4. Java uses getters/setters as methods by convention (not get/set keywords).
 *
 * NOTE: This file has multiple classes. Java allows multiple classes in one file,
 * but only ONE can be public, and it must match the filename.
 *
 * To compile and run:
 *     javac 04_Classes.java
 *     java Classes
 *
 * =============================================================================
 */

// ---- THE PRODUCT CLASS ----
// This is a complete, real-world example of a Java class.

class Product {

    // ---- FIELDS (also called instance variables or properties) ----
    // These are the DATA that each Product object will hold.
    //
    // "private" means only this class can directly access these fields.
    // This is called ENCAPSULATION -- hiding internal data from outside.
    // In JavaScript, you'd just do this.name = name in the constructor.
    // In Java, you declare fields separately, with types and access modifiers.

    private String name;
    private double price;
    private int quantity;

    // ---- CONSTRUCTOR ----
    // Called when you create a new object: new Product("Laptop", 999.99, 5)
    //
    // JavaScript:  constructor(name, price, quantity) { this.name = name; ... }
    // Java:        public Product(String name, double price, int quantity) { ... }
    //
    // Notice:
    // - No "function" keyword
    // - The constructor name MUST match the class name
    // - Parameters have types
    // - "this" refers to the current object (same concept as JavaScript)

    public Product(String name, double price, int quantity) {
        this.name = name;       // this.name = the field; name = the parameter
        this.price = price;
        this.quantity = quantity;
    }

    // ---- OVERLOADED CONSTRUCTOR ----
    // Java lets you have MULTIPLE constructors with different parameters.
    // This is called "constructor overloading." JavaScript cannot do this.

    public Product(String name, double price) {
        this(name, price, 0); // calls the other constructor with quantity = 0
    }

    // ---- GETTERS ----
    // Since fields are private, we provide public methods to READ them.
    // This is a Java CONVENTION. In JavaScript, you might use get name() { }.
    // In Java, you write a method called getName().
    //
    // Convention:
    //   - Getter: getFieldName()
    //   - For boolean: isFieldName() (e.g., isActive())

    public String getName() {
        return this.name;
    }

    public double getPrice() {
        return this.price;
    }

    public int getQuantity() {
        return this.quantity;
    }

    // ---- SETTERS ----
    // Public methods to WRITE/MODIFY the private fields.
    // Convention: setFieldName(newValue)
    //
    // Setters let you add VALIDATION -- this is why we don't make fields public.

    public void setName(String name) {
        // "void" means this method returns nothing
        this.name = name;
    }

    public void setPrice(double price) {
        if (price < 0) {
            System.out.println("Error: Price cannot be negative!");
            return; // exit the method without changing anything
        }
        this.price = price;
    }

    public void setQuantity(int quantity) {
        if (quantity < 0) {
            System.out.println("Error: Quantity cannot be negative!");
            return;
        }
        this.quantity = quantity;
    }

    // ---- METHODS ----
    // Regular methods that perform actions or calculations.
    //
    // JavaScript:  getTotalValue() { return this.price * this.quantity; }
    // Java:        public double getTotalValue() { return this.price * this.quantity; }
    //
    // Notice: Java methods MUST declare their return type (double in this case).
    // If a method returns nothing, use "void".

    public double getTotalValue() {
        return this.price * this.quantity;
    }

    public boolean isInStock() {
        return this.quantity > 0;
    }

    public void restock(int additionalQuantity) {
        this.quantity += additionalQuantity;
        System.out.println("Restocked " + this.name + ". New quantity: " + this.quantity);
    }

    // ---- toString() METHOD ----
    // This is a special method. When you print an object with System.out.println(),
    // Java automatically calls toString() to get a string representation.
    //
    // JavaScript: [Symbol.toPrimitive]() or toString()
    // Java:       toString() -- this is much more commonly used in Java.
    //
    // @Override tells the compiler "I'm replacing the default toString() from Object."
    // This is optional but good practice.

    @Override
    public String toString() {
        return "Product{name='" + name + "', price=" + price + ", qty=" + quantity + "}";
    }
}

// ---- ACCESS MODIFIERS REFERENCE ----
// (This is a non-public helper class in the same file for demonstration)

class AccessModifierExample {
    // public    --> accessible from ANYWHERE
    // private   --> accessible ONLY within this class
    // protected --> accessible within this class AND subclasses (and same package)
    // (default) --> accessible within the same PACKAGE (no keyword = package-private)
    //
    // JavaScript has no equivalent except the newer #private syntax.
    //
    // Rule of thumb:
    //   - Fields: almost always private
    //   - Methods: public if part of the API, private if helper methods
    //   - Classes: public if other classes need to use them

    public String publicField = "Anyone can see me";
    private String privateField = "Only this class can see me";
    protected String protectedField = "This class and subclasses";
    String packageField = "Same package only (no keyword)";
}

// ---- STATIC MEMBERS ----
// "static" means the field or method belongs to the CLASS, not to instances.
// Like a shared variable for all objects of that class.

class MathHelper {

    // Static field: shared across all instances
    public static final double PI = 3.14159265;

    // Static method: can be called without creating an object
    // JavaScript: static add(a, b) { return a + b; }
    // Java:       public static int add(int a, int b) { return a + b; }

    public static int add(int a, int b) {
        return a + b;
    }

    public static double circleArea(double radius) {
        return PI * radius * radius;
    }
}


// ---- THE MAIN CLASS (Entry Point) ----

public class Classes {

    public static void main(String[] args) {

        System.out.println("=== JAVA CLASSES AND OOP ===");
        System.out.println();

        // =====================================================================
        // SECTION 1: CREATING OBJECTS
        // =====================================================================

        System.out.println("--- Creating Objects ---");

        // JavaScript: const laptop = new Product("Laptop", 999.99, 5);
        // Java:       Product laptop = new Product("Laptop", 999.99, 5);
        //
        // Notice: In Java, you must declare the TYPE of the variable.
        //         Product laptop = ... means "laptop is of type Product."

        Product laptop = new Product("Laptop", 999.99, 5);
        Product phone = new Product("Phone", 699.99, 10);
        Product tablet = new Product("Tablet", 449.99); // uses the overloaded constructor

        // Printing objects -- Java automatically calls toString()
        System.out.println(laptop);   // calls laptop.toString()
        System.out.println(phone);
        System.out.println(tablet);

        System.out.println();

        // =====================================================================
        // SECTION 2: USING GETTERS AND SETTERS
        // =====================================================================

        System.out.println("--- Getters and Setters ---");

        // Getting values:
        System.out.println("Laptop name: " + laptop.getName());
        System.out.println("Laptop price: $" + laptop.getPrice());
        System.out.println("Laptop quantity: " + laptop.getQuantity());

        // Setting values:
        laptop.setPrice(899.99);
        System.out.println("New laptop price: $" + laptop.getPrice());

        // Validation in action:
        laptop.setPrice(-100); // will print an error message and not change the price
        System.out.println("Price after invalid set: $" + laptop.getPrice()); // still 899.99

        System.out.println();

        // =====================================================================
        // SECTION 3: USING METHODS
        // =====================================================================

        System.out.println("--- Using Methods ---");

        System.out.println("Laptop total value: $" + laptop.getTotalValue());
        System.out.println("Laptop in stock: " + laptop.isInStock());
        System.out.println("Tablet in stock: " + tablet.isInStock()); // false, quantity is 0

        laptop.restock(3);
        System.out.println("Laptop after restock: " + laptop);

        System.out.println();

        // =====================================================================
        // SECTION 4: STATIC MEMBERS
        // =====================================================================

        System.out.println("--- Static Members ---");

        // Static methods are called on the CLASS, not on an object.
        // JavaScript: Math.PI, Math.random()
        // Java:       Math.PI, Math.random() -- same concept!

        System.out.println("PI: " + MathHelper.PI);
        System.out.println("2 + 3 = " + MathHelper.add(2, 3));
        System.out.println("Circle area (r=5): " + MathHelper.circleArea(5));

        // Note: You don't do "new MathHelper()" -- you use the class name directly.

        System.out.println();

        // =====================================================================
        // SECTION 5: THE this KEYWORD
        // =====================================================================

        System.out.println("--- The 'this' Keyword ---");
        System.out.println("'this' in Java refers to the current object instance.");
        System.out.println("It's used to distinguish between fields and parameters");
        System.out.println("when they have the same name.");
        System.out.println();
        System.out.println("Example: In the Product constructor:");
        System.out.println("  this.name = name;");
        System.out.println("  ^^^^^^^^^   ^^^^");
        System.out.println("  the field   the parameter");
        System.out.println();
        System.out.println("In JavaScript, 'this' can be tricky (changes based on context).");
        System.out.println("In Java, 'this' ALWAYS refers to the current object. Much simpler!");

        System.out.println();

        // =====================================================================
        // SECTION 6: WORKING WITH MULTIPLE OBJECTS
        // =====================================================================

        System.out.println("--- Working with Multiple Objects ---");

        Product[] products = {laptop, phone, tablet};

        double totalInventoryValue = 0;
        for (Product product : products) {
            System.out.printf("  %s: $%.2f x %d = $%.2f%n",
                product.getName(),
                product.getPrice(),
                product.getQuantity(),
                product.getTotalValue());
            totalInventoryValue += product.getTotalValue();
        }
        System.out.printf("Total inventory value: $%.2f%n", totalInventoryValue);

        System.out.println();

        // =====================================================================
        // EXERCISE
        // =====================================================================

        System.out.println("========================================");
        System.out.println("EXERCISE: Create an Employee Class");
        System.out.println("========================================");
        System.out.println();
        System.out.println("Create a class called Employee with:");
        System.out.println("  - Private fields: name (String), department (String),");
        System.out.println("    salary (double), yearsOfService (int)");
        System.out.println("  - Constructor that takes all four fields");
        System.out.println("  - Getters for all fields");
        System.out.println("  - Setter for salary (with validation: no negatives)");
        System.out.println("  - Method: getAnnualBonus() returns salary * 0.1 * yearsOfService");
        System.out.println("  - Method: promote(double raise) adds raise to salary");
        System.out.println("  - toString() that prints nicely");
        System.out.println();
        System.out.println("SOLUTION: See the Employee class below and its usage.");
        System.out.println();

        // ---- EXERCISE SOLUTION: Using the Employee class ----

        Employee emp1 = new Employee("Sarah Connor", "Engineering", 85000, 3);
        Employee emp2 = new Employee("John Smith", "Marketing", 72000, 7);

        System.out.println(emp1);
        System.out.println(emp2);

        System.out.printf("Sarah's annual bonus: $%.2f%n", emp1.getAnnualBonus());
        System.out.printf("John's annual bonus: $%.2f%n", emp2.getAnnualBonus());

        emp1.promote(10000);
        System.out.println("After promotion: " + emp1);
    }
}

// ---- EXERCISE SOLUTION: Employee Class ----

class Employee {

    private String name;
    private String department;
    private double salary;
    private int yearsOfService;

    public Employee(String name, String department, double salary, int yearsOfService) {
        this.name = name;
        this.department = department;
        this.salary = salary;
        this.yearsOfService = yearsOfService;
    }

    // Getters
    public String getName() { return name; }
    public String getDepartment() { return department; }
    public double getSalary() { return salary; }
    public int getYearsOfService() { return yearsOfService; }

    // Setter with validation
    public void setSalary(double salary) {
        if (salary < 0) {
            System.out.println("Error: Salary cannot be negative!");
            return;
        }
        this.salary = salary;
    }

    // Business logic methods
    public double getAnnualBonus() {
        return salary * 0.1 * yearsOfService;
    }

    public void promote(double raise) {
        this.salary += raise;
        System.out.printf("%s promoted! New salary: $%.2f%n", name, salary);
    }

    @Override
    public String toString() {
        return String.format("Employee{name='%s', dept='%s', salary=$%.2f, years=%d}",
            name, department, salary, yearsOfService);
    }
}

/*
 * =============================================================================
 * OOP COMPARISON CHEAT SHEET:
 *
 * JavaScript / TypeScript                 Java
 * ----------------------------------      ----------------------------------
 * class Product { }                       public class Product { }
 * constructor(name) { }                   public Product(String name) { }
 * this.name = name;                       private String name; (field declaration)
 *                                         this.name = name; (in constructor)
 * getInfo() { return this.name; }         public String getInfo() { return name; }
 * #privateField (JS)                      private String field;
 * static count = 0;                       private static int count = 0;
 * new Product("Laptop")                   new Product("Laptop")  (same!)
 * console.log(product)                    System.out.println(product) (calls toString)
 *
 * =============================================================================
 */
