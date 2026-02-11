/*
 * =============================================================================
 * 03 - CONTROL FLOW: Conditionals and Loops
 * =============================================================================
 *
 * GOAL: Learn if/else, switch, for loops, while loops in Java.
 *
 * GOOD NEWS: If you know JavaScript control flow, Java is almost identical!
 * The syntax is 95% the same. A few small differences are noted below.
 *
 * To compile and run:
 *     javac 03_ControlFlow.java
 *     java ControlFlow
 *
 * =============================================================================
 */

public class ControlFlow {

    public static void main(String[] args) {

        System.out.println("=== JAVA CONTROL FLOW ===");
        System.out.println();

        // =====================================================================
        // SECTION 1: IF / ELSE IF / ELSE
        // =====================================================================
        // This is EXACTLY the same as JavaScript. No differences.

        System.out.println("--- If / Else ---");

        int temperature = 72;

        // JavaScript:
        //   if (temperature > 80) {
        //       console.log("It's hot!");
        //   }
        //
        // Java: EXACTLY the same syntax!

        if (temperature > 80) {
            System.out.println("It's hot!");
        } else if (temperature > 60) {
            System.out.println("It's pleasant.");
        } else if (temperature > 40) {
            System.out.println("It's cool.");
        } else {
            System.out.println("It's cold!");
        }

        // ---- Comparison operators (same as JavaScript) ----
        // ==  equal to (for primitives)
        // !=  not equal to
        // >   greater than
        // <   less than
        // >=  greater than or equal to
        // <=  less than or equal to

        // ---- Logical operators (same as JavaScript) ----
        // &&  AND
        // ||  OR
        // !   NOT

        int age = 25;
        boolean hasLicense = true;

        if (age >= 16 && hasLicense) {
            System.out.println("You can drive!");
        }

        if (age < 13 || age > 65) {
            System.out.println("Discount ticket!");
        } else {
            System.out.println("Regular ticket.");
        }

        // ---- Ternary operator (same as JavaScript) ----
        // JavaScript: let status = age >= 18 ? "adult" : "minor";
        // Java:       String status = age >= 18 ? "adult" : "minor";

        String status = age >= 18 ? "adult" : "minor";
        System.out.println("Status: " + status);

        System.out.println();

        // =====================================================================
        // SECTION 2: SWITCH STATEMENT
        // =====================================================================

        System.out.println("--- Switch Statement ---");

        // ---- Traditional switch (same as JavaScript) ----

        String day = "MONDAY";

        switch (day) {
            case "MONDAY":
            case "TUESDAY":
            case "WEDNESDAY":
            case "THURSDAY":
            case "FRIDAY":
                System.out.println(day + " is a weekday.");
                break; // DON'T forget break! (same "gotcha" as JavaScript)
            case "SATURDAY":
            case "SUNDAY":
                System.out.println(day + " is a weekend day.");
                break;
            default:
                System.out.println("Invalid day.");
                break;
        }

        // ---- Enhanced switch (Java 14+) ----
        // This is BETTER -- no need for break statements!
        // Uses arrow syntax (->), similar to JavaScript arrow functions in concept.

        String dayType = switch (day) {
            case "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY" -> "Weekday";
            case "SATURDAY", "SUNDAY" -> "Weekend";
            default -> "Invalid";
        };

        System.out.println(day + " is a: " + dayType);

        // Another example with int:
        int month = 3;
        String monthName = switch (month) {
            case 1  -> "January";
            case 2  -> "February";
            case 3  -> "March";
            case 4  -> "April";
            case 5  -> "May";
            case 6  -> "June";
            case 7  -> "July";
            case 8  -> "August";
            case 9  -> "September";
            case 10 -> "October";
            case 11 -> "November";
            case 12 -> "December";
            default -> "Invalid month";
        };

        System.out.println("Month " + month + " is " + monthName);

        System.out.println();

        // =====================================================================
        // SECTION 3: FOR LOOP (Traditional)
        // =====================================================================
        // EXACTLY the same as JavaScript.

        System.out.println("--- For Loop (Traditional) ---");

        // JavaScript: for (let i = 0; i < 5; i++) { console.log(i); }
        // Java:       for (int i = 0; i < 5; i++) { System.out.println(i); }

        for (int i = 1; i <= 5; i++) {
            System.out.println("Count: " + i);
        }

        // Counting backwards:
        System.out.print("Countdown: ");
        for (int i = 5; i >= 1; i--) {
            System.out.print(i + " ");
        }
        System.out.println("Go!");

        System.out.println();

        // =====================================================================
        // SECTION 4: ENHANCED FOR LOOP (for-each)
        // =====================================================================
        // This is like JavaScript's for...of loop.

        System.out.println("--- Enhanced For Loop (for-each) ---");

        // First, let's create an array (we'll learn more about arrays later):
        String[] fruits = {"Apple", "Banana", "Cherry", "Date", "Elderberry"};

        // JavaScript: for (const fruit of fruits) { console.log(fruit); }
        // Java:       for (String fruit : fruits) { System.out.println(fruit); }
        //
        // Notice: Java uses COLON (:) instead of "of"
        //         Java requires the TYPE (String) before the variable name

        System.out.println("Fruits:");
        for (String fruit : fruits) {
            System.out.println("  - " + fruit);
        }

        // Works with number arrays too:
        int[] scores = {95, 87, 73, 100, 68};
        int sum = 0;
        for (int score : scores) {
            sum += score;
        }
        System.out.println("Total score: " + sum);
        System.out.println("Average: " + (sum / scores.length));

        System.out.println();

        // =====================================================================
        // SECTION 5: WHILE LOOP
        // =====================================================================
        // Same as JavaScript.

        System.out.println("--- While Loop ---");

        int counter = 1;
        while (counter <= 5) {
            System.out.println("While count: " + counter);
            counter++;
        }

        // ---- Do-While Loop ----
        // Executes at least once, then checks the condition.
        // Same as JavaScript.

        System.out.println();
        System.out.println("--- Do-While Loop ---");

        int num = 1;
        do {
            System.out.println("Do-while: " + num);
            num++;
        } while (num <= 3);

        System.out.println();

        // =====================================================================
        // SECTION 6: BREAK AND CONTINUE
        // =====================================================================
        // Same as JavaScript.

        System.out.println("--- Break and Continue ---");

        // break = exit the loop entirely
        System.out.print("Break example: ");
        for (int i = 1; i <= 10; i++) {
            if (i == 6) {
                break; // stop the loop when i reaches 6
            }
            System.out.print(i + " ");
        }
        System.out.println();

        // continue = skip the rest of THIS iteration, go to next
        System.out.print("Continue example (skip 3 and 7): ");
        for (int i = 1; i <= 10; i++) {
            if (i == 3 || i == 7) {
                continue; // skip printing 3 and 7
            }
            System.out.print(i + " ");
        }
        System.out.println();

        System.out.println();

        // =====================================================================
        // SECTION 7: NESTED LOOPS
        // =====================================================================

        System.out.println("--- Nested Loops ---");

        // Multiplication table (3x3):
        System.out.println("Multiplication Table:");
        for (int i = 1; i <= 3; i++) {
            for (int j = 1; j <= 3; j++) {
                System.out.printf("%d x %d = %2d   ", i, j, i * j);
            }
            System.out.println(); // newline after each row
        }

        System.out.println();

        // =====================================================================
        // SECTION 8: ARRAYS (QUICK INTRO)
        // =====================================================================
        // We need arrays for the exercises below.

        System.out.println("--- Arrays (Quick Intro) ---");

        // JavaScript: let numbers = [1, 2, 3, 4, 5];
        // Java:       int[] numbers = {1, 2, 3, 4, 5};
        //
        // KEY DIFFERENCE: Java arrays have a FIXED SIZE.
        // Once created, you cannot add or remove elements.
        // (Use ArrayList for a resizable list -- covered in 06_Collections.java)

        int[] numbers = {10, 20, 30, 40, 50};

        // Access by index (same as JavaScript):
        System.out.println("First element: " + numbers[0]);
        System.out.println("Last element: " + numbers[numbers.length - 1]);

        // Modify by index:
        numbers[2] = 999;
        System.out.println("Modified element: " + numbers[2]);

        // Array length:
        // JavaScript: numbers.length   (property, no parentheses)
        // Java:       numbers.length   (field, no parentheses -- same for arrays!)
        // BUT:        "hello".length() (method, WITH parentheses -- for Strings!)
        System.out.println("Array length: " + numbers.length);

        // Creating an empty array of a specific size:
        int[] emptyArray = new int[5]; // creates [0, 0, 0, 0, 0]
        System.out.print("Empty int array: ");
        for (int n : emptyArray) {
            System.out.print(n + " ");
        }
        System.out.println();

        System.out.println();

        // =====================================================================
        // EXERCISES
        // =====================================================================

        System.out.println("========================================");
        System.out.println("EXERCISE 1: Print even numbers from 1 to 20");
        System.out.println("========================================");

        // Use a for loop and an if statement to print only even numbers.
        // Hint: A number is even if (number % 2 == 0).

        // SOLUTION:
        System.out.print("Even numbers: ");
        for (int i = 1; i <= 20; i++) {
            if (i % 2 == 0) {
                System.out.print(i + " ");
            }
        }
        System.out.println();

        System.out.println();
        System.out.println("========================================");
        System.out.println("EXERCISE 2: FizzBuzz (Classic Interview Question!)");
        System.out.println("========================================");

        // Print numbers 1 to 20. But:
        //   - If divisible by 3, print "Fizz" instead
        //   - If divisible by 5, print "Buzz" instead
        //   - If divisible by both 3 and 5, print "FizzBuzz" instead

        // SOLUTION:
        for (int i = 1; i <= 20; i++) {
            if (i % 3 == 0 && i % 5 == 0) {
                System.out.println(i + ": FizzBuzz");
            } else if (i % 3 == 0) {
                System.out.println(i + ": Fizz");
            } else if (i % 5 == 0) {
                System.out.println(i + ": Buzz");
            } else {
                System.out.println(i + ": " + i);
            }
        }

        System.out.println();
        System.out.println("========================================");
        System.out.println("EXERCISE 3: Find the max in an array");
        System.out.println("========================================");

        // Given this array, find and print the maximum value.
        int[] values = {23, 67, 12, 89, 45, 3, 78, 56};

        // SOLUTION:
        int max = values[0]; // start by assuming the first element is the max
        for (int value : values) {
            if (value > max) {
                max = value;
            }
        }
        System.out.println("Values: 23, 67, 12, 89, 45, 3, 78, 56");
        System.out.println("Maximum value: " + max);
    }
}

/*
 * =============================================================================
 * CONTROL FLOW COMPARISON CHEAT SHEET:
 *
 * JavaScript                              Java
 * ---------------------------------       ---------------------------------
 * if (x > 5) { }                         if (x > 5) { }         (same!)
 * else if (x > 3) { }                    else if (x > 3) { }    (same!)
 * else { }                               else { }                (same!)
 * for (let i = 0; i < 5; i++) {}         for (int i = 0; i < 5; i++) {}
 * for (const item of array) {}           for (Type item : array) {}
 * while (condition) {}                    while (condition) {}    (same!)
 * switch (x) { case 1: ... break; }      switch (x) { case 1: ... break; }
 * x > 5 ? "yes" : "no"                   x > 5 ? "yes" : "no"   (same!)
 *
 * =============================================================================
 */
