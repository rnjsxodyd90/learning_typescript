# Day 5: Java Basics - From Zero to Interview-Ready

## What is Java?

Java is a programming language created by Sun Microsystems in 1995 (now owned by Oracle).
It is one of the most widely used programming languages in the world.

Where Java is used:
- Android apps (most Android apps are written in Java or Kotlin, which runs on the same platform)
- Backend web services (Spring Boot is Java's equivalent of Express.js or NestJS)
- Enterprise software (banks, insurance companies, government systems)
- Big data tools (Hadoop, Spark)
- Desktop applications

Java's motto: **"Write Once, Run Anywhere"** -- the same compiled program runs on
Windows, Mac, and Linux without changes.

---

## Java vs JavaScript: COMPLETELY Different Languages

This confuses everyone. Despite the name, Java and JavaScript are **completely different
languages**. The name similarity is a marketing decision from the 1990s, nothing more.

| Feature              | Java                          | JavaScript / TypeScript         |
|----------------------|-------------------------------|---------------------------------|
| Type system          | Statically typed, COMPILED    | JS: dynamic; TS: static, TRANSPILED |
| Runs on              | JVM (Java Virtual Machine)    | Browser or Node.js              |
| Entry point          | `public static void main()`   | Just start writing code         |
| File extension       | `.java`                       | `.js` / `.ts`                   |
| Compilation          | `javac` compiles to bytecode  | TS: `tsc` transpiles to JS      |
| Semicolons           | **Required** (no exceptions)  | Optional in JS, required in TS by convention |
| OOP style            | Class-based, everything is a class | Prototype-based (classes are sugar) |
| Package manager      | Maven / Gradle                | npm / yarn                      |
| Main web framework   | Spring Boot                   | Express / NestJS / Next.js      |

---

## How Java Works: The Compilation Process

```
   You write          Compiler          JVM runs it
  HelloWorld.java  -->  javac  -->  HelloWorld.class  -->  java  -->  Output!
   (source code)                    (bytecode)
```

Step by step:

1. You write code in a `.java` file (plain text, human-readable).
2. You run `javac HelloWorld.java` -- this COMPILES your code into BYTECODE.
   - Bytecode is a `.class` file. It is NOT human-readable.
   - If your code has errors, the compiler catches them HERE, before you ever run it.
3. You run `java HelloWorld` -- this starts the JVM which RUNS the bytecode.
   - Notice: no `.class` extension when running! Just the class name.

**Why this matters compared to TypeScript:**

- TypeScript: `.ts` --> `tsc` --> `.js` --> Node.js runs the `.js`
  - TypeScript is TRANSPILED (converted from one text format to another text format).
- Java: `.java` --> `javac` --> `.class` --> JVM runs the `.class`
  - Java is COMPILED (converted from text to bytecode, a binary format).
  - The compiler catches MORE errors at compile time than TypeScript does.

---

## How to Install Java

You need the **JDK** (Java Development Kit), not just the JRE (Java Runtime Environment).
The JDK includes the compiler (`javac`) AND the runtime (`java`).

### Step 1: Download JDK 17 (LTS)

Go to: **https://adoptium.net/**

- JDK 17 is a Long-Term Support (LTS) version -- safe for production, widely used.
- Download the installer for your operating system.
- Run the installer. Accept defaults.

### Step 2: Verify Installation

Open a terminal (Command Prompt on Windows, Terminal on Mac/Linux) and run:

```bash
java -version
```

You should see something like:
```
openjdk version "17.0.x" 2022-xx-xx
```

Then check the compiler:
```bash
javac -version
```

You should see:
```
javac 17.0.x
```

If both commands work, you are ready.

### Step 3: Compile and Run Your First Program

```bash
# 1. Navigate to this folder
cd C:\Users\rnjsx\Documents\interview-prep\day5-java-basics

# 2. Compile (creates 01_HelloWorld.class... but wait, filenames!)
#    Actually, Java class names can't start with a number.
#    The files in this tutorial use number prefixes for ordering,
#    but the CLASS names inside don't have numbers.
#    So you compile with:
javac 01_HelloWorld.java

# 3. Run (use the CLASS name, not the file name)
java HelloWorld
```

---

## Key Concepts to Remember

1. **Every `.java` file must have exactly one public class.**
2. **The filename MUST match the public class name** (plus `.java`).
   - File: `HelloWorld.java` contains `public class HelloWorld`
   - NOTE: Our tutorial files have number prefixes (like `01_HelloWorld.java`).
     To compile them, you may need to rename them or compile without the prefix.
     The class names inside are what Java cares about.
3. **Everything lives inside a class.** No loose functions floating around like in JS.
4. **The entry point is `public static void main(String[] args)`.** Every runnable
   program needs this exact method signature.
5. **Semicolons are mandatory.** Every statement ends with `;`.
6. **Curly braces define blocks**, just like JavaScript.
7. **Java is CASE SENSITIVE.** `String` and `string` are different things.

---

## File Guide

| File | Topic | Key Takeaway |
|------|-------|--------------|
| `01_HelloWorld.java` | First program | Class structure, main method, printing |
| `02_Variables.java` | Variables and types | Primitive types, String, final, var |
| `03_ControlFlow.java` | If/else, loops | Same as JS but with enhanced for loop |
| `04_Classes.java` | OOP basics | Classes, constructors, methods, access |
| `05_Interfaces.java` | Interfaces | Contracts, implements, default methods |
| `06_Collections.java` | Lists and Maps | ArrayList, HashMap, generics |
| `07_Exercises.java` | Practice problems | 10 exercises with hints |

Work through them in order. Each file is compilable and runnable.

---

## Compilation Quick Reference

```bash
# Compile a single file
javac MyFile.java

# Run a compiled class
java MyClassName

# Compile all java files in current directory
javac *.java

# If your class is in a package (you'll learn this later)
java com.example.MyClass
```

---

## Common Beginner Mistakes

1. **Forgetting semicolons** -- Java will refuse to compile.
2. **Filename doesn't match class name** -- `HelloWorld.java` must contain `public class HelloWorld`.
3. **Running with `.class` extension** -- Use `java HelloWorld`, NOT `java HelloWorld.class`.
4. **Using `==` to compare Strings** -- Use `.equals()` instead. This is a classic interview question!
5. **Forgetting `static` on main** -- The signature must be `public static void main(String[] args)`.
6. **Not importing classes** -- Unlike JS, you need `import java.util.ArrayList;` etc.

Good luck! Work through each file, type the code yourself, and experiment.
