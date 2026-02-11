# Day 1: TypeScript Tutorial -- From Absolute Zero to Interview Ready

## What is TypeScript?

Imagine you are writing a recipe. You could just scribble anything on a napkin and
hope for the best. OR you could use a proper recipe template that tells you:

- "Put the INGREDIENT NAME here"
- "Put the COOKING TIME (in minutes) here"
- "Put the TEMPERATURE (a number) here"

If you accidentally write "hot" where the temperature number should go, the template
catches your mistake BEFORE you ruin dinner.

**TypeScript is that template for JavaScript.**

JavaScript is the language that makes websites interactive (buttons, animations,
forms, etc.). TypeScript is JavaScript with a safety net. It adds "types" -- labels
that tell your code what kind of data to expect.

### JavaScript (no safety net):
```javascript
let age = 25;       // looks fine
age = "twenty-five" // JavaScript says "sure, whatever" -- BIG PROBLEM later
```

### TypeScript (with safety net):
```typescript
let age: number = 25;       // age MUST be a number
age = "twenty-five"         // TypeScript says "STOP! age must be a number!" -- error caught EARLY
```

## Why Does TypeScript Exist?

JavaScript was invented in 1995 in just 10 DAYS. It was designed for tiny scripts
on web pages. Now it runs entire applications (Netflix, Uber, Airbnb). The problem?
JavaScript is too flexible. It lets you make mistakes that only show up when your
app is running (and your users are watching).

TypeScript was created by Microsoft in 2012 to fix this. It catches mistakes while
you are WRITING code, not while your users are USING your app.

**Key fact for interviews:** TypeScript is a "superset" of JavaScript. That means
ALL JavaScript code is valid TypeScript code. TypeScript just adds extra features
on top.

## How to Set Up TypeScript on Your Computer

### Step 1: Install Node.js

Node.js lets you run JavaScript (and TypeScript) outside of a web browser.

1. Go to https://nodejs.org
2. Download the LTS (Long Term Support) version
3. Install it (just click Next, Next, Next)
4. Open your terminal/command prompt and verify:

```bash
node --version
```

You should see something like `v20.x.x` (the exact number does not matter).

### Step 2: Install TypeScript and ts-node

Open your terminal/command prompt and run this ONE command:

```bash
npm install -g typescript ts-node
```

What does this do?
- `npm` = Node Package Manager (a tool that installs JavaScript/TypeScript tools)
- `install` = "please install this thing"
- `-g` = "globally" (available everywhere on your computer, not just one folder)
- `typescript` = the TypeScript compiler (translates .ts files into .js files)
- `ts-node` = a shortcut tool that lets you RUN .ts files directly

### Step 3: Verify It Worked

```bash
tsc --version
ts-node --version
```

Both should print a version number. If they do, you are ready.

## How to Run the Tutorial Files

Each `.ts` file in this folder can be run directly using ts-node.

Open your terminal, navigate to this folder, and run:

```bash
ts-node 01-basic-types.ts
ts-node 02-interfaces.ts
ts-node 03-classes.ts
ts-node 04-functions.ts
ts-node 05-enums-and-generics.ts
ts-node 06-exercises.ts
```

## What is a Terminal/Command Prompt?

If you have never used one before:

- **Windows:** Press `Win + R`, type `cmd`, press Enter. Or search for "Terminal".
- **Mac:** Press `Cmd + Space`, type `Terminal`, press Enter.
- **VS Code** (recommended code editor): Press `` Ctrl + ` `` to open the built-in terminal.

To navigate to this folder in the terminal:

```bash
cd C:\Users\rnjsx\Documents\interview-prep\day1-typescript
```

## Recommended Code Editor

Download **Visual Studio Code** (VS Code) from https://code.visualstudio.com

It is free, and it has AMAZING TypeScript support built in. It will underline errors
in red as you type, just like a spell checker in Word.

## File Order -- Follow This Path

| Order | File                        | What You Will Learn                        |
|-------|-----------------------------|--------------------------------------------|
| 1     | 01-basic-types.ts           | Variables, strings, numbers, booleans      |
| 2     | 02-interfaces.ts            | Blueprints for objects                     |
| 3     | 03-classes.ts               | Blueprints for creating things             |
| 4     | 04-functions.ts             | Reusable blocks of code                    |
| 5     | 05-enums-and-generics.ts    | Named constants and flexible types         |
| 6     | 06-exercises.ts             | Practice everything you learned            |

## Interview Tips

1. **"TypeScript is a superset of JavaScript"** -- memorize this phrase, interviewers love it.
2. **"Types catch bugs at compile time, not runtime"** -- this is THE reason TypeScript exists.
3. **"Interfaces define the shape of an object"** -- a very common interview question.
4. **Know the difference between `let` and `const`** -- `let` can change, `const` cannot.
5. **Know what `public`, `private`, and `protected` mean** -- access modifiers in classes.

## Glossary of Terms You Will See

| Term          | Simple Meaning                                                    |
|---------------|-------------------------------------------------------------------|
| Variable      | A labeled box that stores a value                                 |
| Type          | A label that says what KIND of value a variable holds             |
| String        | Text (words, sentences) -- always in quotes                       |
| Number        | Any number (1, 3.14, -42)                                        |
| Boolean       | True or false -- that is it, only two options                     |
| Array         | A list of things                                                  |
| Interface     | A blueprint that describes what an object should look like        |
| Class         | A blueprint for creating objects with data AND actions            |
| Function      | A reusable block of code that does something                      |
| Compile       | Translating TypeScript into JavaScript                            |
| Runtime       | When the program is actually running                              |
| Compile time  | When TypeScript is checking your code BEFORE it runs              |
| Parameter     | An input that a function expects to receive                       |
| Return type   | What kind of value a function gives back                          |
| Enum          | A set of named constants (like a menu of fixed choices)           |
| Generic       | A way to make code flexible about what type it works with         |

Good luck! Take it one file at a time. There is no rush.
