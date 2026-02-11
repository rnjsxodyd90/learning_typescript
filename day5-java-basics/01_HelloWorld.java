/*
 * =============================================================================
 * 01 - HELLO WORLD: Your First Java Program
 * =============================================================================
 *
 * GOAL: Understand the basic structure of every Java program.
 *
 * In JavaScript, you can just write:
 *     console.log("Hello World");
 * and run it with: node file.js
 *
 * In Java, you MUST wrap everything in a class. There is no "loose" code.
 *
 * To compile and run this file:
 *     javac 01_HelloWorld.java
 *     java HelloWorld
 *
 * =============================================================================
 */

// ---- THE MOST BASIC JAVA PROGRAM ----

// "public" = this class is accessible from anywhere.
// "class"  = we are defining a class (a container for code).
// "HelloWorld" = the name of the class.
//     RULE: The filename MUST match the public class name.
//     This file is saved as "01_HelloWorld.java" but the class is "HelloWorld".
//     (Java allows the filename prefix, but the class name is what matters when running.)

public class HelloWorld {

    // ---- THE MAIN METHOD: WHERE YOUR PROGRAM STARTS ----

    // Every Java program that you want to RUN needs this exact method.
    // Let's break down every single word:
    //
    //   public  --> accessible from outside this class (the JVM needs to call it)
    //   static  --> belongs to the CLASS, not to an instance/object
    //              (the JVM calls this without creating an object first)
    //   void    --> this method returns NOTHING (no return value)
    //   main    --> the special name Java looks for as the starting point
    //   String[] args --> an array of strings; these are command-line arguments
    //                     (like process.argv in Node.js)
    //
    // In JavaScript/TypeScript, there is no "main" function. Code just runs
    // top to bottom. In Java, the JVM specifically looks for this method.

    public static void main(String[] args) {

        // ---- PRINTING TO THE CONSOLE ----

        // JavaScript:  console.log("Hello, World!");
        // Java:        System.out.println("Hello, World!");
        //
        // Breaking it down:
        //   System     --> a built-in class that Java provides
        //   out        --> a static field of System; it's the "standard output" stream
        //   println    --> a method that prints a line (with a newline at the end)
        //   "Hello, World!" --> a String literal (must use double quotes!)
        //
        // NOTE: Java uses DOUBLE QUOTES for strings. Single quotes are for single
        //       characters only (the char type). This is different from JavaScript
        //       where single and double quotes are interchangeable.

        System.out.println("Hello, World!");

        // ---- MORE PRINTING EXAMPLES ----

        // println = print + newline (moves to next line after printing)
        System.out.println("This is on line 1");
        System.out.println("This is on line 2");

        // print = print WITHOUT a newline (stays on the same line)
        System.out.print("This stays ");
        System.out.print("on the same line");
        System.out.println(); // just prints an empty newline

        // printf = formatted printing (like template literals in JS)
        // JavaScript: console.log(`My name is ${name} and I am ${age} years old.`);
        // Java:       System.out.printf("My name is %s and I am %d years old.%n", name, age);
        //
        //   %s = string placeholder
        //   %d = integer placeholder
        //   %f = decimal number placeholder
        //   %.2f = decimal with 2 decimal places
        //   %n = newline (platform-independent)
        String name = "Alex";
        int age = 25;
        double gpa = 3.75;
        System.out.printf("Name: %s, Age: %d, GPA: %.2f%n", name, age, gpa);

        // ---- STRING CONCATENATION ----

        // JavaScript: "Hello " + name  (same in Java!)
        // Java also uses + to concatenate strings:
        System.out.println("Hello, " + name + "! You are " + age + " years old.");

        // Java automatically converts int/double to String when you use +
        // with a String. This is called "string concatenation".

        // ---- COMMENTS ----

        // Single-line comment (you're reading one right now!)

        /* Multi-line comment
           can span
           multiple lines */

        /**
         * Javadoc comment - used to generate documentation.
         * You'll see these above classes and methods in real code.
         * Similar to JSDoc in JavaScript.
         */

        // ---- THAT'S IT! ----

        System.out.println();
        System.out.println("=== Summary ===");
        System.out.println("1. Every Java program needs a class");
        System.out.println("2. Every runnable program needs: public static void main(String[] args)");
        System.out.println("3. System.out.println() is your console.log()");
        System.out.println("4. Semicolons are REQUIRED after every statement");
        System.out.println("5. Strings use DOUBLE QUOTES only");
    }
}

/*
 * =============================================================================
 * EXPECTED OUTPUT:
 * =============================================================================
 * Hello, World!
 * This is on line 1
 * This is on line 2
 * This stays on the same line
 * Name: Alex, Age: 25, GPA: 3.75
 * Hello, Alex! You are 25 years old.
 *
 * === Summary ===
 * 1. Every Java program needs a class
 * 2. Every runnable program needs: public static void main(String[] args)
 * 3. System.out.println() is your console.log()
 * 4. Semicolons are REQUIRED after every statement
 * 5. Strings use DOUBLE QUOTES only
 * =============================================================================
 *
 * COMPARISON CHEAT SHEET:
 *
 * JavaScript                      Java
 * --------------------------      ----------------------------
 * console.log("hi")               System.out.println("hi")
 * // comment                      // comment
 * 'single' or "double"            "double quotes ONLY"
 * function myFunc() {}            public void myFunc() {}
 * node file.js                    javac File.java && java File
 *
 * =============================================================================
 */
