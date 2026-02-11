/*
 * =============================================================================
 * 02 - VARIABLES AND DATA TYPES
 * =============================================================================
 *
 * GOAL: Understand Java's type system, variables, and how they compare to
 *       JavaScript/TypeScript.
 *
 * THE BIG DIFFERENCE:
 *   JavaScript:  let age = 25;        // type is inferred, can change to anything
 *   TypeScript:  let age: number = 25; // type is declared, enforced at compile time
 *   Java:        int age = 25;         // type is declared, enforced AND compiled
 *
 * Java has TWO categories of types:
 *   1. PRIMITIVE TYPES - simple values stored directly in memory (fast, small)
 *   2. REFERENCE TYPES - objects stored as references/pointers (like JS objects)
 *
 * To compile and run:
 *     javac 02_Variables.java
 *     java Variables
 *
 * =============================================================================
 */

public class Variables {

    public static void main(String[] args) {

        System.out.println("=== JAVA VARIABLES AND DATA TYPES ===");
        System.out.println();

        // =====================================================================
        // SECTION 1: PRIMITIVE TYPES
        // =====================================================================
        // Java has 8 primitive types. In JavaScript, you only have "number"
        // for all numbers. Java splits numbers into many types.

        System.out.println("--- Primitive Types ---");

        // ---- INTEGER TYPES (whole numbers, no decimals) ----

        byte smallNumber = 127;          // 8 bits, range: -128 to 127
        short mediumNumber = 32000;      // 16 bits, range: -32,768 to 32,767
        int normalNumber = 2000000000;   // 32 bits, range: about -2.1 billion to 2.1 billion
        long bigNumber = 9000000000L;    // 64 bits, HUGE range. NOTE the "L" suffix!

        // NOTE: int is the DEFAULT and most commonly used integer type.
        // You'll use int 95% of the time. Use long for very large numbers.
        // byte and short are rarely used in everyday code.

        // In JavaScript: let num = 42;       (just "number", handles everything)
        // In TypeScript:  let num: number = 42; (still just "number")
        // In Java:        int num = 42;       (specifically an integer)

        System.out.println("byte:  " + smallNumber);
        System.out.println("short: " + mediumNumber);
        System.out.println("int:   " + normalNumber);
        System.out.println("long:  " + bigNumber);

        // ---- DECIMAL TYPES (numbers with decimal points) ----

        float decimal1 = 3.14f;          // 32 bits, less precise. NOTE the "f" suffix!
        double decimal2 = 3.14159265;    // 64 bits, more precise. DEFAULT for decimals.

        // NOTE: double is the DEFAULT and most commonly used decimal type.
        // float requires an "f" suffix, otherwise Java thinks it's a double.

        System.out.println("float:  " + decimal1);
        System.out.println("double: " + decimal2);

        // ---- BOOLEAN TYPE ----

        boolean isJavaFun = true;        // only true or false (same as JavaScript!)
        boolean isHard = false;

        // JavaScript: let isJavaFun = true;     (same concept)
        // TypeScript:  let isJavaFun: boolean = true;  (same concept)
        // Java:        boolean isJavaFun = true;  (same concept, different keyword)

        System.out.println("isJavaFun: " + isJavaFun);
        System.out.println("isHard: " + isHard);

        // ---- CHARACTER TYPE ----

        char letter = 'A';              // SINGLE character, uses SINGLE QUOTES
        char digit = '7';
        char symbol = '@';

        // IMPORTANT: char uses SINGLE quotes. String uses DOUBLE quotes.
        // In JavaScript, 'A' and "A" are both strings. In Java, they are different types!
        //   'A' = char (a primitive, single character)
        //   "A" = String (an object, even though it's one character)

        System.out.println("char letter: " + letter);
        System.out.println("char digit:  " + digit);

        System.out.println();

        // =====================================================================
        // SECTION 2: REFERENCE TYPES (OBJECTS)
        // =====================================================================

        System.out.println("--- Reference Types ---");

        // ---- STRING ----
        // String is NOT a primitive! It's a class (an object).
        // Notice the capital "S" -- all class names start with uppercase in Java.
        // But Java treats it specially, so it FEELS like a primitive.

        String firstName = "Alex";       // double quotes ALWAYS
        String lastName = "Johnson";
        String fullName = firstName + " " + lastName; // concatenation with +

        // JavaScript: let firstName = "Alex";
        // TypeScript:  let firstName: string = "Alex";  (lowercase 's')
        // Java:        String firstName = "Alex";        (uppercase 'S' -- it's a class!)

        System.out.println("fullName: " + fullName);
        System.out.println("Length: " + fullName.length()); // note: .length() is a METHOD (with parentheses)
        // In JavaScript: fullName.length (property, no parentheses)
        // In Java:       fullName.length() (method, WITH parentheses)

        // Common String methods (similar to JavaScript):
        System.out.println("Uppercase: " + fullName.toUpperCase());
        System.out.println("Lowercase: " + fullName.toLowerCase());
        System.out.println("Contains 'Alex': " + fullName.contains("Alex"));
        System.out.println("Starts with 'A': " + fullName.startsWith("A"));
        System.out.println("Substring(0,4): " + fullName.substring(0, 4)); // like JS .slice(0, 4)
        System.out.println("Index of 'J': " + fullName.indexOf("J"));
        System.out.println("Trimmed: " + "  hello  ".trim());

        // ---- COMPARING STRINGS: USE .equals(), NOT == ----
        // THIS IS A CLASSIC INTERVIEW QUESTION!
        //
        // In JavaScript:  "hello" === "hello"  --> true (works fine)
        // In Java:         "hello" == "hello"   --> might work, might NOT!
        //
        // == in Java compares REFERENCES (memory addresses), not values.
        // .equals() compares the actual CONTENT of the strings.

        String str1 = "hello";
        String str2 = "hello";
        String str3 = new String("hello"); // explicitly creating a new object

        System.out.println();
        System.out.println("--- String Comparison (INTERVIEW QUESTION!) ---");
        System.out.println("str1 == str2: " + (str1 == str2));           // true (same string pool reference)
        System.out.println("str1 == str3: " + (str1 == str3));           // FALSE! different objects
        System.out.println("str1.equals(str3): " + str1.equals(str3));   // true! same content

        // RULE: ALWAYS use .equals() to compare strings in Java.

        System.out.println();

        // =====================================================================
        // SECTION 3: DECLARING VARIABLES
        // =====================================================================

        System.out.println("--- Variable Declaration ---");

        // Method 1: Declare and assign at the same time
        int score = 100;

        // Method 2: Declare first, assign later
        int total;
        total = 200;

        // Method 3: Declare multiple variables of the same type
        int x = 1, y = 2, z = 3;

        System.out.println("score: " + score + ", total: " + total);
        System.out.println("x: " + x + ", y: " + y + ", z: " + z);

        // =====================================================================
        // SECTION 4: final KEYWORD (like const in JavaScript)
        // =====================================================================

        System.out.println();
        System.out.println("--- final keyword (like const) ---");

        // JavaScript: const PI = 3.14159;  // cannot be reassigned
        // Java:       final double PI = 3.14159;  // cannot be reassigned

        final double PI = 3.14159;
        final String COMPANY_NAME = "Sura Steel";
        final int MAX_RETRIES = 3;

        // PI = 3.0; // ERROR! Cannot reassign a final variable.

        // Convention: final variables (constants) use UPPER_SNAKE_CASE.
        // This is the same convention as JavaScript/TypeScript.

        System.out.println("PI: " + PI);
        System.out.println("Company: " + COMPANY_NAME);
        System.out.println("Max retries: " + MAX_RETRIES);

        // =====================================================================
        // SECTION 5: var KEYWORD (Type Inference - Java 10+)
        // =====================================================================

        System.out.println();
        System.out.println("--- var keyword (type inference) ---");

        // Starting with Java 10, you can use "var" and let the compiler
        // figure out the type. This is similar to TypeScript's type inference.

        // JavaScript: let message = "Hello";    (always inferred)
        // TypeScript:  let message = "Hello";    (inferred as string)
        // Java:        var message = "Hello";    (inferred as String)

        var message = "Hello, Java!";        // compiler knows this is String
        var count = 42;                       // compiler knows this is int
        var price = 19.99;                    // compiler knows this is double
        var isActive = true;                  // compiler knows this is boolean

        System.out.println("message (var): " + message);
        System.out.println("count (var): " + count);
        System.out.println("price (var): " + price);
        System.out.println("isActive (var): " + isActive);

        // NOTE: var can ONLY be used for local variables (inside methods).
        // You CANNOT use var for class fields, method parameters, or return types.
        // var MUST be initialized when declared:
        //   var something;  // ERROR! Compiler can't infer the type.

        // =====================================================================
        // SECTION 6: TYPE CONVERSION / CASTING
        // =====================================================================

        System.out.println();
        System.out.println("--- Type Conversion / Casting ---");

        // ---- Widening (automatic, safe: small type -> big type) ----
        int myInt = 100;
        long myLong = myInt;       // int -> long (automatic, no data loss)
        double myDouble = myInt;   // int -> double (automatic, no data loss)

        System.out.println("int to long: " + myLong);
        System.out.println("int to double: " + myDouble);  // prints 100.0

        // ---- Narrowing (manual, risky: big type -> small type) ----
        double bigDecimal = 9.78;
        int rounded = (int) bigDecimal;  // MUST cast explicitly with (int)
        // This TRUNCATES (cuts off decimal), does NOT round!

        System.out.println("double to int: " + rounded);  // prints 9, NOT 10!

        // ---- String to Number ----
        // JavaScript: parseInt("42")  or  Number("42")
        // Java:       Integer.parseInt("42")  or  Double.parseDouble("3.14")

        String numberText = "42";
        int parsed = Integer.parseInt(numberText);
        System.out.println("Parsed int: " + parsed);

        String decimalText = "3.14";
        double parsedDouble = Double.parseDouble(decimalText);
        System.out.println("Parsed double: " + parsedDouble);

        // ---- Number to String ----
        // JavaScript: String(42)  or  42.toString()  or  "" + 42
        // Java:       String.valueOf(42)  or  Integer.toString(42)  or  "" + 42

        int number = 42;
        String asString = String.valueOf(number);
        String alsoString = "" + number; // quick trick, same as JavaScript
        System.out.println("Number as String: " + asString);

        // =====================================================================
        // SECTION 7: PRIMITIVE WRAPPER CLASSES
        // =====================================================================

        System.out.println();
        System.out.println("--- Wrapper Classes ---");

        // Each primitive has an object version (wrapper class):
        //   int     -> Integer
        //   double  -> Double
        //   boolean -> Boolean
        //   char    -> Character
        //   long    -> Long
        //   float   -> Float
        //
        // Why? Sometimes you need an object, not a primitive.
        // For example, ArrayList can only hold objects, not primitives.
        // Java auto-converts between them (autoboxing/unboxing).

        Integer wrappedInt = 42;         // autoboxing: int -> Integer
        int unwrapped = wrappedInt;      // unboxing: Integer -> int

        // Useful methods on wrapper classes:
        System.out.println("Max int value: " + Integer.MAX_VALUE);     // 2,147,483,647
        System.out.println("Min int value: " + Integer.MIN_VALUE);
        System.out.println("Max double: " + Double.MAX_VALUE);

        // =====================================================================
        // SECTION 8: DEFAULT VALUES
        // =====================================================================

        System.out.println();
        System.out.println("--- Quick Reference ---");
        System.out.println("Primitive defaults (for class fields, not local variables):");
        System.out.println("  int     -> 0");
        System.out.println("  double  -> 0.0");
        System.out.println("  boolean -> false");
        System.out.println("  char    -> '\\u0000' (null character)");
        System.out.println("  String  -> null (not \"\" -- it's null!)");
        System.out.println();
        System.out.println("NOTE: Local variables (inside methods) have NO default value.");
        System.out.println("You MUST initialize them before use, or the compiler will error.");

        // =====================================================================
        // EXERCISE
        // =====================================================================

        System.out.println();
        System.out.println("========================================");
        System.out.println("EXERCISE: Person Variables");
        System.out.println("========================================");

        // TODO: Declare the following variables for a person:
        //   - name (String)
        //   - age (int)
        //   - height in meters (double)
        //   - isStudent (boolean)
        //   - initial (char) - first letter of their name
        //
        // Then print them all out in a nice format using printf.
        //
        // SOLUTION (uncomment to test):

        String personName = "Jordan";
        int personAge = 22;
        double personHeight = 1.75;
        boolean personIsStudent = true;
        char personInitial = 'J';

        System.out.printf("Name: %s%n", personName);
        System.out.printf("Age: %d%n", personAge);
        System.out.printf("Height: %.2f meters%n", personHeight);
        System.out.printf("Student: %b%n", personIsStudent);
        System.out.printf("Initial: %c%n", personInitial);

        // BONUS: Try using var for all of these and see that it still works!
    }
}

/*
 * =============================================================================
 * TYPE COMPARISON CHEAT SHEET:
 *
 * TypeScript             Java
 * -------------------    --------------------
 * number                 int, long, float, double  (Java has many number types)
 * string                 String                    (capital S, it's a class!)
 * boolean                boolean                   (same concept)
 * N/A                    char                      (single character, JS has no char)
 * any                    Object                    (can hold anything)
 * undefined              N/A                       (Java has no undefined)
 * null                   null                      (similar but only for objects)
 * const x = 5            final int x = 5           (final = const)
 * let x = 5              var x = 5                 (or int x = 5)
 *
 * =============================================================================
 */
