/*
 * =============================================================================
 * 06 - COLLECTIONS: ArrayList and HashMap
 * =============================================================================
 *
 * GOAL: Understand Java's most commonly used collections and how they compare
 *       to JavaScript arrays and objects.
 *
 * In JavaScript, you use:
 *   - Arrays:   let items = ["a", "b", "c"];    (dynamic size, any type)
 *   - Objects:  let map = { key: "value" };      (key-value pairs)
 *   - Map:      let map = new Map();             (key-value pairs, any key type)
 *
 * In Java, you use:
 *   - ArrayList<T>:   like JavaScript arrays (dynamic size, typed)
 *   - HashMap<K,V>:   like JavaScript Map (key-value pairs, typed)
 *
 * Java arrays (int[]) have FIXED size. Collections are resizable.
 *
 * GENERICS: The <String>, <Integer>, etc. in angle brackets is called "generics."
 * It tells Java what TYPE the collection holds.
 *   - JavaScript: let names = [];        (holds anything)
 *   - TypeScript:  let names: string[] = []; (typed, but compiled away)
 *   - Java:        ArrayList<String> names = new ArrayList<>(); (typed, enforced)
 *
 * To compile and run:
 *     javac 06_Collections.java
 *     java Collections
 *
 * =============================================================================
 */

// You must IMPORT collection classes. They're not available by default.
// This is like: import { ArrayList } from 'java.util';  (if Java used JS syntax)
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;        // The interface that ArrayList implements
import java.util.Map;         // The interface that HashMap implements
import java.util.Collections; // Utility class with sort, reverse, etc.

public class Collections {

    public static void main(String[] args) {

        System.out.println("=== JAVA COLLECTIONS ===");
        System.out.println();

        // =====================================================================
        // SECTION 1: ArrayList BASICS
        // =====================================================================
        // ArrayList is Java's equivalent of JavaScript arrays.
        // It's resizable, ordered, and allows duplicates.

        System.out.println("--- ArrayList Basics ---");

        // Creating an ArrayList:
        //
        // JavaScript: let fruits = [];
        // TypeScript:  let fruits: string[] = [];
        // Java:        ArrayList<String> fruits = new ArrayList<>();
        //
        // The <String> is a GENERIC -- it says "this list holds Strings."
        // The <> on the right side is called the "diamond operator" -- Java
        // infers the type from the left side. You could also write:
        //   ArrayList<String> fruits = new ArrayList<String>();
        //
        // IMPORTANT: Generics only work with OBJECT types, not primitives!
        //   ArrayList<int>  --> ERROR! "int" is a primitive.
        //   ArrayList<Integer> --> CORRECT! "Integer" is the wrapper class.

        ArrayList<String> fruits = new ArrayList<>();

        // ---- Adding elements ----
        // JavaScript: fruits.push("Apple");
        // Java:       fruits.add("Apple");

        fruits.add("Apple");
        fruits.add("Banana");
        fruits.add("Cherry");
        fruits.add("Date");
        fruits.add("Elderberry");

        System.out.println("Fruits: " + fruits);
        // Output: [Apple, Banana, Cherry, Date, Elderberry]
        // Java's ArrayList.toString() automatically formats nicely!

        // ---- Getting elements ----
        // JavaScript: fruits[0]
        // Java:       fruits.get(0)  (you CANNOT use [] with ArrayList!)

        System.out.println("First fruit: " + fruits.get(0));
        System.out.println("Last fruit: " + fruits.get(fruits.size() - 1));

        // ---- Size ----
        // JavaScript: fruits.length
        // Java:       fruits.size()   (it's a method, not a property!)

        System.out.println("Number of fruits: " + fruits.size());

        // ---- Setting elements ----
        // JavaScript: fruits[1] = "Blueberry";
        // Java:       fruits.set(1, "Blueberry");

        fruits.set(1, "Blueberry");
        System.out.println("After set(1, Blueberry): " + fruits);

        // ---- Inserting at a specific index ----
        // JavaScript: fruits.splice(2, 0, "Coconut");
        // Java:       fruits.add(2, "Coconut");

        fruits.add(2, "Coconut");
        System.out.println("After add(2, Coconut): " + fruits);

        // ---- Removing elements ----
        // JavaScript: fruits.splice(index, 1);  (remove by index)
        //             fruits.filter(f => f !== "Apple"); (remove by value)
        // Java:       fruits.remove(2);          (remove by index)
        //             fruits.remove("Apple");    (remove by value)

        fruits.remove(2); // removes "Coconut" (the element at index 2)
        System.out.println("After remove(2): " + fruits);

        fruits.remove("Date"); // removes the first occurrence of "Date"
        System.out.println("After remove(Date): " + fruits);

        // ---- Checking if element exists ----
        // JavaScript: fruits.includes("Apple");
        // Java:       fruits.contains("Apple");

        System.out.println("Contains Apple? " + fruits.contains("Apple"));
        System.out.println("Contains Mango? " + fruits.contains("Mango"));

        // ---- Finding index ----
        // JavaScript: fruits.indexOf("Cherry");
        // Java:       fruits.indexOf("Cherry");  (same name!)

        System.out.println("Index of Cherry: " + fruits.indexOf("Cherry"));

        // ---- Checking if empty ----
        System.out.println("Is empty? " + fruits.isEmpty());

        System.out.println();

        // =====================================================================
        // SECTION 2: ITERATING OVER ArrayList
        // =====================================================================

        System.out.println("--- Iterating Over ArrayList ---");

        // Method 1: Enhanced for loop (most common, like JS for...of)
        // JavaScript: for (const fruit of fruits) { console.log(fruit); }
        // Java:       for (String fruit : fruits) { ... }

        System.out.println("Method 1 - Enhanced for loop:");
        for (String fruit : fruits) {
            System.out.println("  " + fruit);
        }

        // Method 2: Traditional for loop (when you need the index)
        System.out.println("Method 2 - Traditional for loop:");
        for (int i = 0; i < fruits.size(); i++) {
            System.out.println("  [" + i + "] " + fruits.get(i));
        }

        // Method 3: forEach with lambda (Java 8+, like JS .forEach())
        // JavaScript: fruits.forEach(fruit => console.log(fruit));
        // Java:       fruits.forEach(fruit -> System.out.println(fruit));
        //
        // NOTE: Java uses -> (arrow), JavaScript uses => (fat arrow).

        System.out.println("Method 3 - forEach with lambda:");
        fruits.forEach(fruit -> System.out.println("  " + fruit));

        System.out.println();

        // =====================================================================
        // SECTION 3: ArrayList WITH NUMBERS
        // =====================================================================

        System.out.println("--- ArrayList with Numbers ---");

        // Remember: use Integer (wrapper class), not int (primitive)!
        ArrayList<Integer> numbers = new ArrayList<>();
        numbers.add(42);
        numbers.add(17);
        numbers.add(93);
        numbers.add(8);
        numbers.add(55);

        System.out.println("Numbers: " + numbers);

        // ---- Sorting ----
        // JavaScript: numbers.sort((a, b) => a - b);
        // Java:       Collections.sort(numbers);

        java.util.Collections.sort(numbers);
        System.out.println("Sorted: " + numbers);

        // Reverse sort:
        java.util.Collections.sort(numbers, java.util.Collections.reverseOrder());
        System.out.println("Reverse sorted: " + numbers);

        // ---- Sum (using a loop) ----
        int sum = 0;
        for (int num : numbers) {
            sum += num;
        }
        System.out.println("Sum: " + sum);

        // ---- Min and Max ----
        System.out.println("Min: " + java.util.Collections.min(numbers));
        System.out.println("Max: " + java.util.Collections.max(numbers));

        System.out.println();

        // =====================================================================
        // SECTION 4: List INTERFACE (Best Practice)
        // =====================================================================

        System.out.println("--- List Interface (Best Practice) ---");

        // In professional Java code, you'll often see:
        //   List<String> names = new ArrayList<>();
        // instead of:
        //   ArrayList<String> names = new ArrayList<>();
        //
        // Why? "Program to the interface, not the implementation."
        // This means you use List (the interface) as the type, and
        // ArrayList (the implementation) as the constructor.
        // This way, you can switch to LinkedList later without changing
        // all your variable types.
        //
        // TypeScript equivalent: using an interface as the type.
        //   const items: Printable[] = [new Product(...)];

        List<String> names = new ArrayList<>();
        names.add("Alice");
        names.add("Bob");
        names.add("Charlie");
        System.out.println("Names (List interface): " + names);

        System.out.println();

        // =====================================================================
        // SECTION 5: HashMap BASICS
        // =====================================================================
        // HashMap is Java's equivalent of JavaScript objects/Maps.
        // It stores KEY-VALUE pairs.

        System.out.println("--- HashMap Basics ---");

        // Creating a HashMap:
        //
        // JavaScript: let ages = { "Alice": 25, "Bob": 30 };
        //    or:      let ages = new Map();
        // Java:       HashMap<String, Integer> ages = new HashMap<>();
        //
        // <String, Integer> means: keys are Strings, values are Integers.

        HashMap<String, Integer> ages = new HashMap<>();

        // ---- Adding key-value pairs ----
        // JavaScript: ages["Alice"] = 25;  or  ages.set("Alice", 25);
        // Java:       ages.put("Alice", 25);

        ages.put("Alice", 25);
        ages.put("Bob", 30);
        ages.put("Charlie", 35);
        ages.put("Diana", 28);

        System.out.println("Ages: " + ages);
        // NOTE: HashMap does NOT maintain insertion order!
        // If you need order, use LinkedHashMap.

        // ---- Getting values ----
        // JavaScript: ages["Alice"]  or  ages.get("Alice")
        // Java:       ages.get("Alice")

        System.out.println("Alice's age: " + ages.get("Alice"));

        // ---- Getting with default value ----
        // JavaScript: ages.get("Unknown") ?? 0
        // Java:       ages.getOrDefault("Unknown", 0)

        System.out.println("Unknown's age: " + ages.getOrDefault("Unknown", 0));

        // ---- Checking if key exists ----
        // JavaScript: "Alice" in ages  or  ages.has("Alice")
        // Java:       ages.containsKey("Alice")

        System.out.println("Has Alice? " + ages.containsKey("Alice"));
        System.out.println("Has Eve? " + ages.containsKey("Eve"));

        // ---- Checking if value exists ----
        System.out.println("Has age 30? " + ages.containsValue(30));

        // ---- Removing ----
        // JavaScript: delete ages["Bob"]  or  ages.delete("Bob")
        // Java:       ages.remove("Bob")

        ages.remove("Bob");
        System.out.println("After removing Bob: " + ages);

        // ---- Size ----
        System.out.println("Number of entries: " + ages.size());

        System.out.println();

        // =====================================================================
        // SECTION 6: ITERATING OVER HashMap
        // =====================================================================

        System.out.println("--- Iterating Over HashMap ---");

        // Recreate with fresh data:
        Map<String, Double> prices = new HashMap<>();
        prices.put("Laptop", 999.99);
        prices.put("Phone", 699.99);
        prices.put("Tablet", 449.99);
        prices.put("Watch", 299.99);

        // Method 1: Iterate over keys
        System.out.println("Method 1 - Keys:");
        for (String key : prices.keySet()) {
            System.out.println("  " + key + ": $" + prices.get(key));
        }

        // Method 2: Iterate over values only
        System.out.println("Method 2 - Values only:");
        for (Double price : prices.values()) {
            System.out.println("  $" + price);
        }

        // Method 3: Iterate over key-value pairs (entries)
        // This is the most common and efficient way.
        //
        // JavaScript: for (const [key, value] of map.entries()) { }
        // Java:       for (Map.Entry<K,V> entry : map.entrySet()) { }

        System.out.println("Method 3 - Entries (most common):");
        for (Map.Entry<String, Double> entry : prices.entrySet()) {
            System.out.println("  " + entry.getKey() + " => $" + entry.getValue());
        }

        // Method 4: forEach with lambda (Java 8+)
        // JavaScript: map.forEach((value, key) => console.log(key, value));
        // Java:       map.forEach((key, value) -> System.out.println(key + ": " + value));
        // NOTE: Java's order is (key, value). JavaScript Map's forEach is (value, key)!

        System.out.println("Method 4 - forEach lambda:");
        prices.forEach((key, value) ->
            System.out.printf("  %s => $%.2f%n", key, value));

        System.out.println();

        // =====================================================================
        // SECTION 7: REAL-WORLD EXAMPLE - Product Inventory
        // =====================================================================

        System.out.println("--- Real-World Example: Product Inventory ---");

        // A list of product objects using a simple inner approach.
        // Let's use HashMap to represent products (before we had a Product class).

        List<Map<String, Object>> inventory = new ArrayList<>();

        // Creating product maps:
        Map<String, Object> product1 = new HashMap<>();
        product1.put("name", "Laptop");
        product1.put("price", 999.99);
        product1.put("quantity", 5);
        inventory.add(product1);

        Map<String, Object> product2 = new HashMap<>();
        product2.put("name", "Phone");
        product2.put("price", 699.99);
        product2.put("quantity", 10);
        inventory.add(product2);

        Map<String, Object> product3 = new HashMap<>();
        product3.put("name", "Tablet");
        product3.put("price", 449.99);
        product3.put("quantity", 3);
        inventory.add(product3);

        Map<String, Object> product4 = new HashMap<>();
        product4.put("name", "Watch");
        product4.put("price", 299.99);
        product4.put("quantity", 8);
        inventory.add(product4);

        // Print all products:
        System.out.println("Full inventory:");
        for (Map<String, Object> product : inventory) {
            System.out.printf("  %s - $%.2f (qty: %d)%n",
                product.get("name"),
                product.get("price"),
                product.get("quantity"));
        }

        System.out.println();

        // =====================================================================
        // SECTION 8: USEFUL ArrayList OPERATIONS
        // =====================================================================

        System.out.println("--- Useful ArrayList Operations ---");

        List<String> colors = new ArrayList<>();
        colors.add("Red");
        colors.add("Blue");
        colors.add("Green");
        colors.add("Red");     // duplicates are allowed!
        colors.add("Yellow");

        System.out.println("Colors: " + colors);

        // Clear all elements:
        // colors.clear();

        // Create from existing list:
        List<String> colorsCopy = new ArrayList<>(colors);
        System.out.println("Copy: " + colorsCopy);

        // Sublist (like JavaScript slice):
        // JavaScript: colors.slice(1, 3);
        // Java:       colors.subList(1, 3);
        List<String> subset = colors.subList(1, 3);
        System.out.println("Subset (1 to 3): " + subset);

        // Convert array to ArrayList:
        // JavaScript: not needed, arrays are dynamic
        // Java:       new ArrayList<>(List.of(...))
        List<String> fromArray = new ArrayList<>(List.of("A", "B", "C"));
        System.out.println("From array: " + fromArray);

        // Create an unmodifiable list (like Object.freeze in JS):
        List<String> immutable = List.of("X", "Y", "Z");
        System.out.println("Immutable: " + immutable);
        // immutable.add("W"); // ERROR! Cannot modify.

        System.out.println();

        // =====================================================================
        // SECTION 9: GENERICS QUICK EXPLANATION
        // =====================================================================

        System.out.println("--- Generics (Quick Explanation) ---");
        System.out.println();
        System.out.println("Java generics are like TypeScript generics:");
        System.out.println();
        System.out.println("  TypeScript: Array<string>  or  string[]");
        System.out.println("  Java:       ArrayList<String>");
        System.out.println();
        System.out.println("  TypeScript: Map<string, number>");
        System.out.println("  Java:       HashMap<String, Integer>");
        System.out.println();
        System.out.println("The type in <angle brackets> tells Java what the");
        System.out.println("collection holds. This prevents you from accidentally");
        System.out.println("putting the wrong type in.");
        System.out.println();
        System.out.println("Without generics (BAD, old Java):");
        System.out.println("  ArrayList list = new ArrayList(); // holds Object, unsafe");
        System.out.println();
        System.out.println("With generics (GOOD, modern Java):");
        System.out.println("  ArrayList<String> list = new ArrayList<>(); // type-safe!");

        System.out.println();

        // =====================================================================
        // EXERCISE
        // =====================================================================

        System.out.println("========================================");
        System.out.println("EXERCISE: Product Catalog with Filtering");
        System.out.println("========================================");
        System.out.println();
        System.out.println("Create an ArrayList of product names and prices.");
        System.out.println("Filter and print only products under $500.");
        System.out.println();

        // SOLUTION:

        // Using parallel lists (simple approach):
        List<String> productNames = new ArrayList<>(
            List.of("Laptop", "Mouse", "Keyboard", "Monitor", "Webcam", "Headphones"));
        List<Double> productPrices = new ArrayList<>(
            List.of(999.99, 29.99, 79.99, 449.99, 69.99, 149.99));

        System.out.println("All products:");
        for (int i = 0; i < productNames.size(); i++) {
            System.out.printf("  %s: $%.2f%n", productNames.get(i), productPrices.get(i));
        }

        System.out.println();
        System.out.println("Products under $500:");
        for (int i = 0; i < productNames.size(); i++) {
            if (productPrices.get(i) < 500.0) {
                System.out.printf("  %s: $%.2f%n", productNames.get(i), productPrices.get(i));
            }
        }

        // BETTER SOLUTION using HashMap:
        System.out.println();
        System.out.println("Same thing with HashMap:");

        Map<String, Double> catalog = new HashMap<>();
        catalog.put("Laptop", 999.99);
        catalog.put("Mouse", 29.99);
        catalog.put("Keyboard", 79.99);
        catalog.put("Monitor", 449.99);
        catalog.put("Webcam", 69.99);
        catalog.put("Headphones", 149.99);

        System.out.println("Products under $500 (HashMap):");
        catalog.forEach((name, price) -> {
            if (price < 500.0) {
                System.out.printf("  %s: $%.2f%n", name, price);
            }
        });
    }
}

/*
 * =============================================================================
 * COLLECTIONS COMPARISON CHEAT SHEET:
 *
 * JavaScript                              Java
 * ----------------------------------      ----------------------------------
 * let arr = [];                           ArrayList<Type> list = new ArrayList<>();
 * arr.push("item");                       list.add("item");
 * arr[0]                                  list.get(0)
 * arr.length                              list.size()
 * arr.includes("item")                    list.contains("item")
 * arr.indexOf("item")                     list.indexOf("item")
 * arr.splice(i, 1)                        list.remove(i)
 * arr.filter(x => x > 5)                  (use a loop or streams)
 * for (const x of arr) {}                 for (Type x : list) {}
 * arr.forEach(x => ...)                   list.forEach(x -> ...)
 * arr.sort((a,b) => a-b)                  Collections.sort(list)
 *
 * let obj = {};                           HashMap<K,V> map = new HashMap<>();
 * obj["key"] = "val";                     map.put("key", "val");
 * obj["key"]                              map.get("key")
 * "key" in obj                            map.containsKey("key")
 * delete obj["key"]                       map.remove("key")
 * Object.keys(obj)                        map.keySet()
 * Object.values(obj)                      map.values()
 * Object.entries(obj)                     map.entrySet()
 * for (const [k,v] of map) {}            for (Map.Entry<K,V> e : map.entrySet()) {}
 *
 * =============================================================================
 */
