/*
 * =============================================================================
 * 05 - INTERFACES: Contracts and Abstraction
 * =============================================================================
 *
 * GOAL: Understand what interfaces are, why they matter, and how to use them.
 *
 * WHAT IS AN INTERFACE?
 * An interface is a CONTRACT. It says "any class that implements me MUST
 * provide these methods." It defines WHAT a class should do, not HOW.
 *
 * Think of it like a job description:
 *   - "Must be able to print a report" (the contract)
 *   - HOW you print it is up to you (the implementation)
 *
 * TYPESCRIPT vs JAVA INTERFACES:
 *
 * TypeScript interface:                    Java interface:
 *   interface Printable {                    interface Printable {
 *     print(): string;                         String print();
 *   }                                        }
 *
 * TypeScript interfaces are COMPILE-TIME ONLY (erased after compilation).
 * Java interfaces are REAL -- they exist at runtime and can be used for
 * type checking, casting, and polymorphism.
 *
 * Java interfaces can also have:
 *   - default methods (methods WITH a body that implementing classes inherit)
 *   - static methods
 *   - constants
 * TypeScript interfaces cannot have any of these.
 *
 * To compile and run:
 *     javac 05_Interfaces.java
 *     java Interfaces
 *
 * =============================================================================
 */

// =====================================================================
// INTERFACE 1: Printable
// =====================================================================
// A simple interface that says: "Any class that implements me must have
// a printDetails() method that returns a String."

interface Printable {

    // This is an ABSTRACT method -- no body, just a signature.
    // Any class that "implements Printable" MUST provide this method.
    // Note: interface methods are public by default (no need to write "public").

    String printDetails();

    // ---- DEFAULT METHOD (Java 8+) ----
    // A method with a body inside an interface! Classes inherit this automatically
    // but can override it if they want.
    //
    // TypeScript interfaces CANNOT do this. This is a Java-only feature.

    default String printHeader() {
        return "====== " + printDetails() + " ======";
    }
}

// =====================================================================
// INTERFACE 2: Discountable
// =====================================================================
// Another interface. A class can implement MULTIPLE interfaces!
// (Java doesn't support multiple inheritance of classes, but it DOES
//  support multiple interfaces. This is a common interview question!)

interface Discountable {

    double applyDiscount(double percentage);

    // A constant in an interface. All interface fields are automatically
    // public, static, and final.
    double MAX_DISCOUNT = 0.50; // 50% maximum discount
}

// =====================================================================
// INTERFACE 3: Searchable (for the exercise)
// =====================================================================

interface Searchable {
    boolean matchesSearch(String query);
}

// =====================================================================
// CLASS: StoreProduct implements Printable, Discountable, Searchable
// =====================================================================
// A class can implement multiple interfaces by listing them with commas.
//
// JavaScript: class StoreProduct extends SomeClass { }
//             (JS has no "implements" keyword)
// TypeScript: class StoreProduct implements Printable, Discountable { }
//             (TS has implements but only for type checking)
// Java:       class StoreProduct implements Printable, Discountable { }
//             (Java enforces implementation at compile time AND runtime)

class StoreProduct implements Printable, Discountable, Searchable {

    private String name;
    private double price;
    private String category;

    public StoreProduct(String name, double price, String category) {
        this.name = name;
        this.price = price;
        this.category = category;
    }

    public String getName() { return name; }
    public double getPrice() { return price; }
    public String getCategory() { return category; }

    // ---- IMPLEMENTING Printable ----
    // We MUST provide printDetails() because we said "implements Printable."
    // If we forget, the compiler will give an error.

    @Override
    public String printDetails() {
        return String.format("%s ($%.2f) [%s]", name, price, category);
    }

    // We inherit printHeader() from Printable (the default method).
    // We don't HAVE to override it, but we can if we want.

    // ---- IMPLEMENTING Discountable ----
    // We MUST provide applyDiscount() because we said "implements Discountable."

    @Override
    public double applyDiscount(double percentage) {
        // Ensure the discount doesn't exceed the maximum
        if (percentage > MAX_DISCOUNT) {
            percentage = MAX_DISCOUNT;
            System.out.println("  (Discount capped at " + (MAX_DISCOUNT * 100) + "%)");
        }
        double discount = price * percentage;
        price -= discount;
        return discount;
    }

    // ---- IMPLEMENTING Searchable ----
    // We MUST provide matchesSearch().

    @Override
    public boolean matchesSearch(String query) {
        String lowerQuery = query.toLowerCase();
        return name.toLowerCase().contains(lowerQuery)
            || category.toLowerCase().contains(lowerQuery);
    }

    @Override
    public String toString() {
        return printDetails(); // reuse our Printable method
    }
}

// =====================================================================
// ANOTHER CLASS implementing the same interfaces
// =====================================================================
// This is the POWER of interfaces: different classes can implement the
// same interface in different ways.

class DigitalProduct implements Printable, Discountable {

    private String name;
    private double price;
    private String downloadUrl;

    public DigitalProduct(String name, double price, String downloadUrl) {
        this.name = name;
        this.price = price;
        this.downloadUrl = downloadUrl;
    }

    public String getName() { return name; }
    public double getPrice() { return price; }

    @Override
    public String printDetails() {
        return String.format("%s ($%.2f) [Digital - %s]", name, price, downloadUrl);
    }

    @Override
    public double applyDiscount(double percentage) {
        if (percentage > MAX_DISCOUNT) {
            percentage = MAX_DISCOUNT;
        }
        double discount = price * percentage;
        price -= discount;
        return discount;
    }

    @Override
    public String toString() {
        return printDetails();
    }
}


// =====================================================================
// MAIN CLASS
// =====================================================================

public class Interfaces {

    public static void main(String[] args) {

        System.out.println("=== JAVA INTERFACES ===");
        System.out.println();

        // =====================================================================
        // SECTION 1: BASIC USAGE
        // =====================================================================

        System.out.println("--- Creating Objects ---");

        StoreProduct laptop = new StoreProduct("Gaming Laptop", 1299.99, "Electronics");
        StoreProduct shirt = new StoreProduct("Cotton T-Shirt", 29.99, "Clothing");
        DigitalProduct ebook = new DigitalProduct("Java Mastery", 49.99, "books.example.com/java");

        System.out.println(laptop);
        System.out.println(shirt);
        System.out.println(ebook);

        System.out.println();

        // =====================================================================
        // SECTION 2: USING INTERFACE METHODS
        // =====================================================================

        System.out.println("--- Printable Interface ---");

        // Using printDetails() and the default printHeader():
        System.out.println(laptop.printDetails());
        System.out.println(laptop.printHeader()); // uses default method from interface

        System.out.println();

        System.out.println("--- Discountable Interface ---");

        System.out.printf("Laptop before discount: $%.2f%n", laptop.getPrice());
        double saved = laptop.applyDiscount(0.20); // 20% off
        System.out.printf("Saved: $%.2f%n", saved);
        System.out.printf("Laptop after discount: $%.2f%n", laptop.getPrice());

        System.out.println();

        // Trying to exceed max discount:
        System.out.println("Trying 80% discount on shirt:");
        shirt.applyDiscount(0.80); // will be capped at 50%
        System.out.printf("Shirt after capped discount: $%.2f%n", shirt.getPrice());

        System.out.println();

        // =====================================================================
        // SECTION 3: POLYMORPHISM -- THE REAL POWER OF INTERFACES
        // =====================================================================
        // This is WHY interfaces matter.
        //
        // You can use an interface type as a variable type!
        // This means you can treat DIFFERENT classes the same way,
        // as long as they implement the same interface.
        //
        // Think about it in Angular terms:
        //   - You define a service interface (e.g., DataService)
        //   - You can swap in different implementations
        //     (MockDataService, RealDataService, CachedDataService)
        //   - The rest of your code doesn't care which one it's using!

        System.out.println("--- Polymorphism (THE REAL POWER) ---");

        // Notice: the variable TYPE is "Printable" (the interface),
        // but the OBJECT is a StoreProduct or DigitalProduct.
        // This is like TypeScript:
        //   const item: Printable = new StoreProduct(...);

        Printable[] printableItems = {
            new StoreProduct("Keyboard", 79.99, "Electronics"),
            new StoreProduct("Running Shoes", 129.99, "Footwear"),
            new DigitalProduct("Music Album", 9.99, "music.example.com/album")
        };

        // We can loop through them and call printDetails() on each,
        // even though they are DIFFERENT classes!
        System.out.println("All printable items:");
        for (Printable item : printableItems) {
            System.out.println("  " + item.printDetails());
        }

        System.out.println();

        // Same with Discountable:
        Discountable[] discountableItems = {
            new StoreProduct("Monitor", 499.99, "Electronics"),
            new DigitalProduct("Online Course", 199.99, "courses.example.com/java")
        };

        System.out.println("Applying 10% discount to all discountable items:");
        for (Discountable item : discountableItems) {
            double savedAmount = item.applyDiscount(0.10);
            System.out.printf("  Saved $%.2f%n", savedAmount);
        }

        System.out.println();

        // =====================================================================
        // SECTION 4: USING INTERFACES AS METHOD PARAMETERS
        // =====================================================================
        // This is how you write flexible, reusable code.

        System.out.println("--- Interfaces as Method Parameters ---");

        StoreProduct headphones = new StoreProduct("Wireless Headphones", 199.99, "Electronics");
        StoreProduct book = new StoreProduct("Java Handbook", 39.99, "Books");

        // We can pass any Printable to this method:
        printWithBorder(headphones);
        printWithBorder(book);
        printWithBorder(ebook);

        System.out.println();

        // =====================================================================
        // SECTION 5: SEARCHABLE INTERFACE IN ACTION
        // =====================================================================

        System.out.println("--- Searchable Interface ---");

        StoreProduct[] catalog = {
            new StoreProduct("Gaming Laptop", 1299.99, "Electronics"),
            new StoreProduct("Cotton T-Shirt", 29.99, "Clothing"),
            new StoreProduct("USB Cable", 9.99, "Electronics"),
            new StoreProduct("Running Shoes", 89.99, "Footwear"),
            new StoreProduct("Laptop Stand", 49.99, "Electronics")
        };

        String searchQuery = "laptop";
        System.out.println("Searching for '" + searchQuery + "':");
        for (StoreProduct product : catalog) {
            if (product.matchesSearch(searchQuery)) {
                System.out.println("  MATCH: " + product);
            }
        }

        searchQuery = "electronics";
        System.out.println("Searching for '" + searchQuery + "':");
        for (StoreProduct product : catalog) {
            if (product.matchesSearch(searchQuery)) {
                System.out.println("  MATCH: " + product);
            }
        }

        System.out.println();

        // =====================================================================
        // WHY INTERFACES MATTER (Interview Answer)
        // =====================================================================

        System.out.println("========================================");
        System.out.println("WHY INTERFACES MATTER (Interview Answer)");
        System.out.println("========================================");
        System.out.println();
        System.out.println("1. ABSTRACTION: Define WHAT, not HOW.");
        System.out.println("   Different classes can implement the same interface differently.");
        System.out.println();
        System.out.println("2. POLYMORPHISM: Treat different objects the same way.");
        System.out.println("   A method accepting Printable works with ANY Printable class.");
        System.out.println();
        System.out.println("3. LOOSE COUPLING: Code depends on interfaces, not concrete classes.");
        System.out.println("   You can swap implementations without changing calling code.");
        System.out.println("   (This is the basis of Dependency Injection in Spring Boot!)");
        System.out.println();
        System.out.println("4. MULTIPLE INHERITANCE: A class can implement many interfaces.");
        System.out.println("   Java classes can only extend ONE class but implement MANY interfaces.");
        System.out.println();
        System.out.println("5. TESTABILITY: Mock an interface for unit testing.");
        System.out.println("   (Same concept as mocking in Jest/Jasmine)");

        System.out.println();

        // =====================================================================
        // EXERCISE
        // =====================================================================

        System.out.println("========================================");
        System.out.println("EXERCISE: Create and Use Interfaces");
        System.out.println("========================================");
        System.out.println();
        System.out.println("1. Create a 'Sortable' interface with:");
        System.out.println("   - int getSortKey(); (returns a value to sort by)");
        System.out.println();
        System.out.println("2. Make StoreProduct implement Sortable");
        System.out.println("   (getSortKey returns the price as an int)");
        System.out.println();
        System.out.println("3. Write a method that takes a Sortable[] and");
        System.out.println("   finds the item with the highest sort key.");
        System.out.println();
        System.out.println("This exercise reinforces polymorphism:");
        System.out.println("the sorting method works with ANY Sortable class,");
        System.out.println("not just StoreProduct.");
    }

    // ---- A helper method that accepts ANY Printable object ----
    // This demonstrates the power of interfaces as method parameter types.
    // It doesn't matter if it's a StoreProduct or DigitalProduct --
    // as long as it implements Printable, this method works.

    public static void printWithBorder(Printable item) {
        System.out.println("+------------------------------------+");
        System.out.println("| " + item.printDetails());
        System.out.println("+------------------------------------+");
    }
}

/*
 * =============================================================================
 * INTERFACE COMPARISON CHEAT SHEET:
 *
 * TypeScript                              Java
 * ----------------------------------      ----------------------------------
 * interface Printable {                   interface Printable {
 *   print(): string;                        String print();
 * }                                       }
 *
 * class X implements Printable { }        class X implements Printable { }
 *
 * (no default methods)                    default String helper() { return "hi"; }
 *
 * interface extends another:              interface extends another:
 *   interface A extends B { }               interface A extends B { }
 *
 * (erased at compile time)                (exists at runtime, can use instanceof)
 *
 * implements multiple:                    implements multiple:
 *   class X implements A, B { }             class X implements A, B { }
 *
 * =============================================================================
 */
