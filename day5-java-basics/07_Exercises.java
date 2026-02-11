/*
 * =============================================================================
 * 07 - EXERCISES: 10 Practice Problems
 * =============================================================================
 *
 * These 10 exercises cover everything from the previous lessons.
 * Each exercise has:
 *   - A description of what to build
 *   - Hints
 *   - Expected output
 *   - A complete solution
 *
 * TRY to solve each one yourself BEFORE looking at the solution.
 * Comment out solutions and write your own code, then compare.
 *
 * To compile and run:
 *     javac 07_Exercises.java
 *     java Exercises
 *
 * =============================================================================
 */

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

// =========================================================================
// EXERCISE 1: Book Class
// =========================================================================
// Create a Book class with:
//   - Private fields: title (String), author (String), price (double), pages (int)
//   - Constructor that sets all fields
//   - Getters for all fields
//   - toString() that returns a nice string
//   - isLongBook() method that returns true if pages > 300
//
// HINT: Follow the same pattern as the Product class in 04_Classes.java.
//
// Expected output:
//   Book{title='Clean Code', author='Robert Martin', price=$34.99, pages=464}
//   Is Clean Code a long book? true

class Book {
    private String title;
    private String author;
    private double price;
    private int pages;

    public Book(String title, String author, double price, int pages) {
        this.title = title;
        this.author = author;
        this.price = price;
        this.pages = pages;
    }

    public String getTitle() { return title; }
    public String getAuthor() { return author; }
    public double getPrice() { return price; }
    public int getPages() { return pages; }

    public boolean isLongBook() {
        return pages > 300;
    }

    @Override
    public String toString() {
        return String.format("Book{title='%s', author='%s', price=$%.2f, pages=%d}",
            title, author, price, pages);
    }
}


// =========================================================================
// EXERCISE 2: Reviewable Interface
// =========================================================================
// Create a Reviewable interface with:
//   - double getAverageRating();
//   - String getReviewSummary();
//
// Then create a ReviewableBook class that:
//   - Extends the Book concept (has title, author, etc.)
//   - Implements Reviewable
//   - Has a list of ratings (ArrayList<Integer>)
//   - getAverageRating() calculates the average of all ratings
//   - getReviewSummary() returns "title by author - rating/5.0 (N reviews)"
//
// HINT: To calculate average, sum all ratings and divide by the count.
//
// Expected output:
//   Java in Action by Raoul-Gabriel - 4.3/5.0 (3 reviews)

interface Reviewable {
    double getAverageRating();
    String getReviewSummary();
}

class ReviewableBook implements Reviewable {
    private String title;
    private String author;
    private double price;
    private List<Integer> ratings;

    public ReviewableBook(String title, String author, double price) {
        this.title = title;
        this.author = author;
        this.price = price;
        this.ratings = new ArrayList<>();
    }

    public void addRating(int rating) {
        if (rating >= 1 && rating <= 5) {
            ratings.add(rating);
        } else {
            System.out.println("Rating must be between 1 and 5!");
        }
    }

    public String getTitle() { return title; }
    public String getAuthor() { return author; }

    @Override
    public double getAverageRating() {
        if (ratings.isEmpty()) {
            return 0.0;
        }
        int sum = 0;
        for (int rating : ratings) {
            sum += rating;
        }
        return (double) sum / ratings.size();
    }

    @Override
    public String getReviewSummary() {
        return String.format("%s by %s - %.1f/5.0 (%d reviews)",
            title, author, getAverageRating(), ratings.size());
    }

    @Override
    public String toString() {
        return getReviewSummary();
    }
}


// =========================================================================
// EXERCISE 3: BankAccount Class
// =========================================================================
// Create a BankAccount class with:
//   - Private fields: accountHolder (String), balance (double)
//   - Constructor that takes accountHolder and initialBalance
//   - deposit(double amount) - adds to balance, prints confirmation
//   - withdraw(double amount) - subtracts from balance IF sufficient funds
//   - getBalance() - returns current balance
//   - toString()
//
// HINT: In withdraw(), check if amount <= balance before subtracting.
//
// Expected output:
//   Deposited $500.00. New balance: $1500.00
//   Withdrew $200.00. New balance: $1300.00
//   Insufficient funds! Balance: $1300.00, Attempted: $5000.00

class BankAccount {
    private String accountHolder;
    private double balance;

    public BankAccount(String accountHolder, double initialBalance) {
        this.accountHolder = accountHolder;
        this.balance = initialBalance;
    }

    public void deposit(double amount) {
        if (amount <= 0) {
            System.out.println("Deposit amount must be positive!");
            return;
        }
        balance += amount;
        System.out.printf("Deposited $%.2f. New balance: $%.2f%n", amount, balance);
    }

    public void withdraw(double amount) {
        if (amount <= 0) {
            System.out.println("Withdrawal amount must be positive!");
            return;
        }
        if (amount > balance) {
            System.out.printf("Insufficient funds! Balance: $%.2f, Attempted: $%.2f%n",
                balance, amount);
            return;
        }
        balance -= amount;
        System.out.printf("Withdrew $%.2f. New balance: $%.2f%n", amount, balance);
    }

    public double getBalance() { return balance; }
    public String getAccountHolder() { return accountHolder; }

    @Override
    public String toString() {
        return String.format("BankAccount{holder='%s', balance=$%.2f}",
            accountHolder, balance);
    }
}


// =========================================================================
// EXERCISE 4: Payable Interface with Multiple Implementations
// =========================================================================
// Create a Payable interface with:
//   - double calculatePay();
//   - String getPaymentDescription();
//
// Create two classes that implement it:
//   - SalariedEmployee: has name and annualSalary; calculatePay = annualSalary / 12
//   - FreelanceWorker: has name, hourlyRate, hoursWorked; calculatePay = rate * hours
//
// HINT: This demonstrates polymorphism -- both types can be treated as Payable.
//
// Expected output:
//   Processing payroll:
//     Alice (Salaried): $7083.33
//     Bob (Freelance): $4800.00
//     Charlie (Salaried): $5416.67
//   Total payroll: $17300.00

interface Payable {
    double calculatePay();
    String getPaymentDescription();
}

class SalariedEmployee implements Payable {
    private String name;
    private double annualSalary;

    public SalariedEmployee(String name, double annualSalary) {
        this.name = name;
        this.annualSalary = annualSalary;
    }

    @Override
    public double calculatePay() {
        return annualSalary / 12.0;
    }

    @Override
    public String getPaymentDescription() {
        return String.format("%s (Salaried): $%.2f", name, calculatePay());
    }
}

class FreelanceWorker implements Payable {
    private String name;
    private double hourlyRate;
    private int hoursWorked;

    public FreelanceWorker(String name, double hourlyRate, int hoursWorked) {
        this.name = name;
        this.hourlyRate = hourlyRate;
        this.hoursWorked = hoursWorked;
    }

    @Override
    public double calculatePay() {
        return hourlyRate * hoursWorked;
    }

    @Override
    public String getPaymentDescription() {
        return String.format("%s (Freelance): $%.2f", name, calculatePay());
    }
}


// =========================================================================
// EXERCISE 5: ArrayList of Custom Objects
// =========================================================================
// Create a list of Book objects and:
//   - Add 5 books
//   - Find and print the most expensive book
//   - Print all books over 300 pages
//   - Calculate the total cost of all books
//
// HINT: Loop through the list, keep track of max price so far.
//
// Expected output:
//   Most expensive: Design Patterns ($49.99)
//   Books over 300 pages:
//     Clean Code (464 pages)
//     Design Patterns (416 pages)
//     Effective Java (412 pages)
//   Total cost: $179.95

// (Solution implemented in main method below)


// =========================================================================
// EXERCISE 6: HashMap Word Counter
// =========================================================================
// Given a sentence, count how many times each word appears.
// Use a HashMap<String, Integer>.
//
// HINT: Split the sentence into words with sentence.split(" ").
//       For each word, use map.getOrDefault(word, 0) + 1.
//
// Expected output for "the cat sat on the mat the cat":
//   the: 3
//   cat: 2
//   sat: 1
//   on: 1
//   mat: 1

// (Solution implemented in main method below)


// =========================================================================
// EXERCISE 7: Student Grade Calculator
// =========================================================================
// Create a Student class with:
//   - name (String)
//   - grades (ArrayList<Double>)
//   - addGrade(double grade)
//   - getAverage() - returns average of all grades
//   - getLetterGrade() - returns "A" (>=90), "B" (>=80), "C" (>=70), "D" (>=60), "F" (<60)
//
// HINT: getLetterGrade() should call getAverage() and use if/else.
//
// Expected output:
//   Alice: Average=88.67, Grade=B
//   Bob: Average=95.00, Grade=A

class Student {
    private String name;
    private List<Double> grades;

    public Student(String name) {
        this.name = name;
        this.grades = new ArrayList<>();
    }

    public void addGrade(double grade) {
        grades.add(grade);
    }

    public String getName() { return name; }

    public double getAverage() {
        if (grades.isEmpty()) return 0.0;
        double sum = 0;
        for (double grade : grades) {
            sum += grade;
        }
        return sum / grades.size();
    }

    public String getLetterGrade() {
        double avg = getAverage();
        if (avg >= 90) return "A";
        if (avg >= 80) return "B";
        if (avg >= 70) return "C";
        if (avg >= 60) return "D";
        return "F";
    }

    @Override
    public String toString() {
        return String.format("%s: Average=%.2f, Grade=%s", name, getAverage(), getLetterGrade());
    }
}


// =========================================================================
// EXERCISE 8: ShoppingCart using ArrayList and HashMap
// =========================================================================
// Create a ShoppingCart class with:
//   - items stored as a Map<String, Double> (name -> price)
//   - quantities stored as a Map<String, Integer> (name -> quantity)
//   - addItem(String name, double price, int quantity)
//   - removeItem(String name)
//   - getTotal() - calculates total cost (price * quantity for each item)
//   - printReceipt() - prints a formatted receipt
//
// HINT: Use two HashMaps, one for prices and one for quantities.
//
// Expected output:
//   ---- RECEIPT ----
//   Laptop       x2   $1999.98
//   Mouse        x3   $  89.97
//   Keyboard     x1   $  79.99
//   -----------------
//   TOTAL:       $2169.94

class ShoppingCart {
    private Map<String, Double> prices;
    private Map<String, Integer> quantities;

    public ShoppingCart() {
        prices = new HashMap<>();
        quantities = new HashMap<>();
    }

    public void addItem(String name, double price, int quantity) {
        if (prices.containsKey(name)) {
            // Item exists, add to quantity
            quantities.put(name, quantities.get(name) + quantity);
        } else {
            prices.put(name, price);
            quantities.put(name, quantity);
        }
    }

    public void removeItem(String name) {
        prices.remove(name);
        quantities.remove(name);
    }

    public double getTotal() {
        double total = 0;
        for (String item : prices.keySet()) {
            total += prices.get(item) * quantities.get(item);
        }
        return total;
    }

    public void printReceipt() {
        System.out.println("---- RECEIPT ----");
        for (String item : prices.keySet()) {
            double lineTotal = prices.get(item) * quantities.get(item);
            System.out.printf("%-12s x%d   $%7.2f%n", item, quantities.get(item), lineTotal);
        }
        System.out.println("-----------------");
        System.out.printf("TOTAL:       $%7.2f%n", getTotal());
    }
}


// =========================================================================
// EXERCISE 9: Method Overloading
// =========================================================================
// Create a Calculator class with overloaded "add" methods:
//   - add(int a, int b) returns int
//   - add(double a, double b) returns double
//   - add(int a, int b, int c) returns int
//   - add(String a, String b) returns String (concatenation)
//
// HINT: Method overloading means same method name, different parameter types/counts.
//       JavaScript cannot do this. Java can!
//
// Expected output:
//   add(2, 3) = 5
//   add(2.5, 3.7) = 6.2
//   add(1, 2, 3) = 6
//   add("Hello", " World") = Hello World

class Calculator {

    public static int add(int a, int b) {
        return a + b;
    }

    public static double add(double a, double b) {
        return a + b;
    }

    public static int add(int a, int b, int c) {
        return a + b + c;
    }

    public static String add(String a, String b) {
        return a + b;
    }
}


// =========================================================================
// EXERCISE 10: Putting It All Together -- Mini Inventory System
// =========================================================================
// Create a simple inventory system with:
//   - An InventoryItem class (name, category, price, quantity)
//   - An Inventory class that holds a List<InventoryItem>
//   - Methods: addItem, removeItem, getTotalValue, findByCategory, printInventory
//
// This combines: classes, interfaces, ArrayList, HashMap concepts.

interface Displayable {
    String display();
}

class InventoryItem implements Displayable {
    private String name;
    private String category;
    private double price;
    private int quantity;

    public InventoryItem(String name, String category, double price, int quantity) {
        this.name = name;
        this.category = category;
        this.price = price;
        this.quantity = quantity;
    }

    public String getName() { return name; }
    public String getCategory() { return category; }
    public double getPrice() { return price; }
    public int getQuantity() { return quantity; }

    public double getTotalValue() {
        return price * quantity;
    }

    @Override
    public String display() {
        return String.format("%-15s | %-12s | $%8.2f | qty: %3d | value: $%9.2f",
            name, category, price, quantity, getTotalValue());
    }

    @Override
    public String toString() {
        return display();
    }
}

class Inventory {
    private List<InventoryItem> items;

    public Inventory() {
        items = new ArrayList<>();
    }

    public void addItem(InventoryItem item) {
        items.add(item);
    }

    public boolean removeItem(String name) {
        for (int i = 0; i < items.size(); i++) {
            if (items.get(i).getName().equalsIgnoreCase(name)) {
                items.remove(i);
                return true;
            }
        }
        return false;
    }

    public double getTotalValue() {
        double total = 0;
        for (InventoryItem item : items) {
            total += item.getTotalValue();
        }
        return total;
    }

    public List<InventoryItem> findByCategory(String category) {
        List<InventoryItem> result = new ArrayList<>();
        for (InventoryItem item : items) {
            if (item.getCategory().equalsIgnoreCase(category)) {
                result.add(item);
            }
        }
        return result;
    }

    public void printInventory() {
        System.out.println("=".repeat(75));
        System.out.printf("%-15s | %-12s | %9s | %7s | %12s%n",
            "Name", "Category", "Price", "Qty", "Value");
        System.out.println("-".repeat(75));
        for (InventoryItem item : items) {
            System.out.println(item.display());
        }
        System.out.println("-".repeat(75));
        System.out.printf("TOTAL INVENTORY VALUE: $%.2f%n", getTotalValue());
        System.out.println("=".repeat(75));
    }
}


// =========================================================================
// MAIN CLASS: Run All Exercises
// =========================================================================

public class Exercises {

    public static void main(String[] args) {

        System.out.println("=== JAVA EXERCISES ===");
        System.out.println();

        // ---- EXERCISE 1: Book Class ----
        System.out.println("--- Exercise 1: Book Class ---");
        Book book1 = new Book("Clean Code", "Robert Martin", 34.99, 464);
        System.out.println(book1);
        System.out.println("Is Clean Code a long book? " + book1.isLongBook());
        System.out.println();

        // ---- EXERCISE 2: Reviewable Interface ----
        System.out.println("--- Exercise 2: Reviewable Interface ---");
        ReviewableBook rb = new ReviewableBook("Java in Action", "Raoul-Gabriel", 44.99);
        rb.addRating(5);
        rb.addRating(4);
        rb.addRating(4);
        System.out.println(rb.getReviewSummary());
        System.out.println();

        // ---- EXERCISE 3: BankAccount Class ----
        System.out.println("--- Exercise 3: BankAccount Class ---");
        BankAccount account = new BankAccount("John Doe", 1000.00);
        System.out.println(account);
        account.deposit(500.00);
        account.withdraw(200.00);
        account.withdraw(5000.00);
        System.out.println();

        // ---- EXERCISE 4: Payable Interface ----
        System.out.println("--- Exercise 4: Payable Interface (Polymorphism) ---");
        List<Payable> payroll = new ArrayList<>();
        payroll.add(new SalariedEmployee("Alice", 85000));
        payroll.add(new FreelanceWorker("Bob", 60.00, 80));
        payroll.add(new SalariedEmployee("Charlie", 65000));

        System.out.println("Processing payroll:");
        double totalPayroll = 0;
        for (Payable person : payroll) {
            System.out.println("  " + person.getPaymentDescription());
            totalPayroll += person.calculatePay();
        }
        System.out.printf("Total payroll: $%.2f%n", totalPayroll);
        System.out.println();

        // ---- EXERCISE 5: ArrayList of Custom Objects ----
        System.out.println("--- Exercise 5: ArrayList of Books ---");
        List<Book> books = new ArrayList<>();
        books.add(new Book("Clean Code", "Robert Martin", 34.99, 464));
        books.add(new Book("Head First Java", "Kathy Sierra", 44.99, 688));
        books.add(new Book("Design Patterns", "Gang of Four", 49.99, 416));
        books.add(new Book("The Pragmatic Programmer", "Hunt & Thomas", 39.99, 352));
        books.add(new Book("Effective Java", "Joshua Bloch", 44.99, 412));

        // Find most expensive:
        Book mostExpensive = books.get(0);
        for (Book b : books) {
            if (b.getPrice() > mostExpensive.getPrice()) {
                mostExpensive = b;
            }
        }
        System.out.printf("Most expensive: %s ($%.2f)%n",
            mostExpensive.getTitle(), mostExpensive.getPrice());

        // Books over 300 pages:
        System.out.println("Books over 300 pages:");
        for (Book b : books) {
            if (b.isLongBook()) {
                System.out.printf("  %s (%d pages)%n", b.getTitle(), b.getPages());
            }
        }

        // Total cost:
        double totalCost = 0;
        for (Book b : books) {
            totalCost += b.getPrice();
        }
        System.out.printf("Total cost of all books: $%.2f%n", totalCost);
        System.out.println();

        // ---- EXERCISE 6: HashMap Word Counter ----
        System.out.println("--- Exercise 6: Word Counter ---");
        String sentence = "the cat sat on the mat the cat";
        String[] words = sentence.split(" ");

        Map<String, Integer> wordCount = new HashMap<>();
        for (String word : words) {
            wordCount.put(word, wordCount.getOrDefault(word, 0) + 1);
        }

        System.out.println("Sentence: \"" + sentence + "\"");
        System.out.println("Word counts:");
        for (Map.Entry<String, Integer> entry : wordCount.entrySet()) {
            System.out.println("  " + entry.getKey() + ": " + entry.getValue());
        }
        System.out.println();

        // ---- EXERCISE 7: Student Grade Calculator ----
        System.out.println("--- Exercise 7: Student Grades ---");
        Student alice = new Student("Alice");
        alice.addGrade(85.0);
        alice.addGrade(92.0);
        alice.addGrade(89.0);
        System.out.println(alice);

        Student bob = new Student("Bob");
        bob.addGrade(95.0);
        bob.addGrade(98.0);
        bob.addGrade(92.0);
        System.out.println(bob);
        System.out.println();

        // ---- EXERCISE 8: Shopping Cart ----
        System.out.println("--- Exercise 8: Shopping Cart ---");
        ShoppingCart cart = new ShoppingCart();
        cart.addItem("Laptop", 999.99, 2);
        cart.addItem("Mouse", 29.99, 3);
        cart.addItem("Keyboard", 79.99, 1);
        cart.printReceipt();
        System.out.println();

        // ---- EXERCISE 9: Method Overloading ----
        System.out.println("--- Exercise 9: Method Overloading ---");
        System.out.println("add(2, 3) = " + Calculator.add(2, 3));
        System.out.println("add(2.5, 3.7) = " + Calculator.add(2.5, 3.7));
        System.out.println("add(1, 2, 3) = " + Calculator.add(1, 2, 3));
        System.out.println("add(\"Hello\", \" World\") = " + Calculator.add("Hello", " World"));
        System.out.println();

        // ---- EXERCISE 10: Mini Inventory System ----
        System.out.println("--- Exercise 10: Inventory System ---");
        Inventory inventory = new Inventory();
        inventory.addItem(new InventoryItem("Laptop", "Electronics", 999.99, 15));
        inventory.addItem(new InventoryItem("Mouse", "Electronics", 29.99, 50));
        inventory.addItem(new InventoryItem("Desk Chair", "Furniture", 349.99, 8));
        inventory.addItem(new InventoryItem("Monitor", "Electronics", 449.99, 12));
        inventory.addItem(new InventoryItem("Bookshelf", "Furniture", 129.99, 5));
        inventory.addItem(new InventoryItem("Headphones", "Electronics", 149.99, 25));

        inventory.printInventory();

        System.out.println();
        System.out.println("Electronics items:");
        List<InventoryItem> electronics = inventory.findByCategory("Electronics");
        for (InventoryItem item : electronics) {
            System.out.println("  " + item.display());
        }

        System.out.println();
        System.out.println("========================================");
        System.out.println("CONGRATULATIONS! You've completed all 10 exercises.");
        System.out.println("========================================");
        System.out.println();
        System.out.println("Key concepts you practiced:");
        System.out.println("  1. Creating classes with fields, constructors, methods");
        System.out.println("  2. Using private/public access modifiers");
        System.out.println("  3. Implementing interfaces (contracts)");
        System.out.println("  4. Polymorphism (treating different classes uniformly)");
        System.out.println("  5. ArrayList operations (add, remove, iterate, search)");
        System.out.println("  6. HashMap operations (put, get, iterate, count)");
        System.out.println("  7. Method overloading (same name, different parameters)");
        System.out.println("  8. String manipulation and formatting");
        System.out.println("  9. Type safety and generics");
        System.out.println(" 10. Combining multiple concepts into a real system");
    }
}

/*
 * =============================================================================
 * INTERVIEW TIP:
 *
 * In a Java interview, you might be asked to:
 * 1. "Design a class for X" -> Use Exercise 1/3/10 as templates.
 * 2. "What is an interface?" -> Explain with Exercise 2/4.
 * 3. "What is polymorphism?" -> Explain with Exercise 4 (Payable).
 * 4. "How do you use collections?" -> Explain with Exercise 5/6/8.
 * 5. "What is method overloading?" -> Explain with Exercise 9.
 * 6. "What is encapsulation?" -> Private fields + public getters/setters.
 *
 * Remember:
 * - Encapsulation = private fields, public methods
 * - Inheritance = extends (class) or implements (interface)
 * - Polymorphism = same interface, different implementations
 * - Abstraction = hiding complexity behind simple interfaces
 *
 * These four are the "Pillars of OOP" -- a very common interview topic!
 * =============================================================================
 */
