// ============================================================================
//
//   05 - ANGULAR PIPES (Formatting Data for Display)
//
//   This is a TEACHING FILE. Read it top to bottom.
//   It is not meant to be run directly. It is meant to teach you.
//
// ============================================================================


// ============================================================================
//  SECTION 1: WHAT IS A PIPE?
// ============================================================================

// A pipe TRANSFORMS data before displaying it in the template.
// It does NOT change the original data — it only changes how it LOOKS.
//
// ANALOGY: Water Pipes
//
//   Imagine water flowing through a pipe.
//   The water (data) goes IN one end.
//   The pipe changes something about it (filters, heats, etc.).
//   The changed water comes OUT the other end.
//   But the water in the source (your data) is unchanged.
//
// REAL EXAMPLE:
//
//   You have a price: 19.99 (just a number)
//   You want to DISPLAY it as: $19.99 (formatted as currency)
//   A pipe does this transformation.
//
//   You have a date: 2024-03-15T10:30:00 (ugly raw format)
//   You want to DISPLAY it as: Mar 15, 2024 (human-readable)
//   A pipe does this transformation.
//
// The SYNTAX for using a pipe in a template is the | symbol:
//
//   {{ value | pipeName }}
//
// That vertical bar | is called the "pipe" character.
// You read it as: "value PIPED THROUGH pipeName"

import { Component, Pipe, PipeTransform } from '@angular/core';


// ============================================================================
//  SECTION 2: BUILT-IN PIPES — THE ONES YOU WILL ACTUALLY USE
// ============================================================================

@Component({
  selector: 'app-pipe-demo',
  template: `
    <!-- ============================================================ -->
    <!--  UPPERCASE PIPE                                               -->
    <!-- ============================================================ -->

    <!-- Transforms text to ALL UPPERCASE -->

    <p>{{ 'hello world' | uppercase }}</p>
    <!-- Displays: HELLO WORLD -->

    <p>{{ name | uppercase }}</p>
    <!-- If name = 'john', displays: JOHN -->


    <!-- ============================================================ -->
    <!--  LOWERCASE PIPE                                               -->
    <!-- ============================================================ -->

    <!-- Transforms text to all lowercase -->

    <p>{{ 'HELLO WORLD' | lowercase }}</p>
    <!-- Displays: hello world -->

    <p>{{ name | lowercase }}</p>
    <!-- If name = 'JOHN', displays: john -->


    <!-- ============================================================ -->
    <!--  TITLECASE PIPE                                               -->
    <!-- ============================================================ -->

    <!-- Capitalizes the first letter of each word -->

    <p>{{ 'hello world' | titlecase }}</p>
    <!-- Displays: Hello World -->

    <p>{{ 'john doe' | titlecase }}</p>
    <!-- Displays: John Doe -->


    <!-- ============================================================ -->
    <!--  CURRENCY PIPE  (Very commonly used!)                         -->
    <!-- ============================================================ -->

    <!-- Formats a number as currency -->

    <p>{{ 19.99 | currency }}</p>
    <!-- Displays: $19.99 (USD by default) -->

    <p>{{ price | currency }}</p>
    <!-- If price = 999.50, displays: $999.50 -->

    <!-- You can specify different currencies: -->
    <p>{{ price | currency:'EUR' }}</p>
    <!-- Displays: EUR999.50 (or with Euro symbol depending on locale) -->

    <p>{{ price | currency:'GBP' }}</p>
    <!-- Displays: the price in British Pounds -->

    <p>{{ price | currency:'INR' }}</p>
    <!-- Displays: the price in Indian Rupees -->

    <!-- You can also control the symbol display: -->
    <p>{{ price | currency:'USD':'symbol' }}</p>
    <!-- Displays: $999.50 -->

    <p>{{ price | currency:'USD':'code' }}</p>
    <!-- Displays: USD999.50 -->


    <!-- ============================================================ -->
    <!--  DATE PIPE  (Very commonly used!)                             -->
    <!-- ============================================================ -->

    <!-- Formats a date into a human-readable string -->

    <p>{{ today | date }}</p>
    <!-- Displays something like: Mar 15, 2024 -->

    <p>{{ today | date:'short' }}</p>
    <!-- Displays: 3/15/24, 10:30 AM -->

    <p>{{ today | date:'medium' }}</p>
    <!-- Displays: Mar 15, 2024, 10:30:00 AM -->

    <p>{{ today | date:'long' }}</p>
    <!-- Displays: March 15, 2024 at 10:30:00 AM GMT-5 -->

    <p>{{ today | date:'full' }}</p>
    <!-- Displays: Friday, March 15, 2024 at 10:30:00 AM GMT-05:00 -->

    <!-- Custom date formats: -->
    <p>{{ today | date:'yyyy-MM-dd' }}</p>
    <!-- Displays: 2024-03-15 -->

    <p>{{ today | date:'MM/dd/yyyy' }}</p>
    <!-- Displays: 03/15/2024 -->

    <p>{{ today | date:'dd MMM yyyy' }}</p>
    <!-- Displays: 15 Mar 2024 -->

    <p>{{ today | date:'EEEE' }}</p>
    <!-- Displays: Friday (day of the week) -->

    <p>{{ today | date:'h:mm a' }}</p>
    <!-- Displays: 10:30 AM (just the time) -->


    <!-- ============================================================ -->
    <!--  DECIMAL / NUMBER PIPE                                        -->
    <!-- ============================================================ -->

    <!-- Formats a number with decimal places -->

    <p>{{ 3.14159 | number }}</p>
    <!-- Displays: 3.142 (3 decimal places by default) -->

    <p>{{ 3.14159 | number:'1.2-2' }}</p>
    <!-- Displays: 3.14 -->
    <!-- '1.2-2' means: at least 1 digit before decimal,
         at least 2 and at most 2 digits after decimal -->

    <p>{{ 1000000 | number }}</p>
    <!-- Displays: 1,000,000 (adds commas!) -->

    <p>{{ 0.75 | number:'1.0-0' }}</p>
    <!-- Displays: 1 (rounded, no decimals) -->


    <!-- ============================================================ -->
    <!--  PERCENT PIPE                                                 -->
    <!-- ============================================================ -->

    <!-- Formats a number as a percentage -->

    <p>{{ 0.75 | percent }}</p>
    <!-- Displays: 75% -->

    <p>{{ 0.256 | percent:'1.0-0' }}</p>
    <!-- Displays: 26% (rounded) -->

    <p>{{ 0.256 | percent:'1.1-1' }}</p>
    <!-- Displays: 25.6% (one decimal place) -->


    <!-- ============================================================ -->
    <!--  JSON PIPE  (Useful for debugging!)                           -->
    <!-- ============================================================ -->

    <!-- Displays an object as a JSON string -->
    <!-- Very useful when debugging to see what data looks like -->

    <pre>{{ user | json }}</pre>
    <!-- Displays:
         {
           "name": "John",
           "age": 25,
           "email": "john@example.com"
         }
    -->


    <!-- ============================================================ -->
    <!--  SLICE PIPE                                                   -->
    <!-- ============================================================ -->

    <!-- Takes a portion of an array or string -->

    <p>{{ 'Hello World' | slice:0:5 }}</p>
    <!-- Displays: Hello (characters 0 through 4) -->

    <p>{{ 'Hello World' | slice:6 }}</p>
    <!-- Displays: World (from character 6 to the end) -->

    <!-- Works with arrays too: -->
    <!-- <li *ngFor="let item of items | slice:0:3"> -->
    <!-- Shows only the first 3 items -->
  `
})
class PipeDemoComponent {
  name: string = 'john doe';
  price: number = 999.50;
  today: Date = new Date();
  user = {
    name: 'John',
    age: 25,
    email: 'john@example.com'
  };
}


// ============================================================================
//  SECTION 3: CHAINING PIPES
// ============================================================================

// You can use MULTIPLE pipes on the same value.
// They execute LEFT to RIGHT.

@Component({
  selector: 'app-chain-demo',
  template: `
    <!-- First formats as date, THEN makes it uppercase -->
    <p>{{ today | date:'full' | uppercase }}</p>
    <!-- Displays: FRIDAY, MARCH 15, 2024 AT 10:30:00 AM GMT-05:00 -->

    <!-- First slices the string, THEN makes it uppercase -->
    <p>{{ 'hello world' | slice:0:5 | uppercase }}</p>
    <!-- Displays: HELLO -->
  `
})
class ChainDemoComponent {
  today: Date = new Date();
}

// Think of chaining as a pipeline (hence the name "pipe"):
//   data --> pipe 1 --> pipe 2 --> final display
//
// The output of pipe 1 becomes the input of pipe 2.


// ============================================================================
//  SECTION 4: A REALISTIC EXAMPLE — Product Card
// ============================================================================

// Here is how pipes are used in a real-world component:

@Component({
  selector: 'app-product-card',
  template: `
    <div class="product-card">
      <h2>{{ product.name | titlecase }}</h2>
      <p class="price">{{ product.price | currency:'USD' }}</p>
      <p class="date">Added: {{ product.dateAdded | date:'mediumDate' }}</p>
      <p class="description">{{ product.description | slice:0:100 }}...</p>
      <p class="rating">Rating: {{ product.rating | percent }}</p>
    </div>

    <!--
      WITHOUT pipes, you would see:
        laptop pro
        1299.99
        2024-03-15T10:30:00.000Z
        This is a really long description that goes on and on...
        0.92

      WITH pipes, you see:
        Laptop Pro
        $1,299.99
        Mar 15, 2024
        This is a really long description that goes on and on and on and on an...
        92%

      Much better for the user!
    -->
  `
})
class ProductCardComponent {
  product = {
    name: 'laptop pro',
    price: 1299.99,
    dateAdded: new Date('2024-03-15'),
    description: 'This is a really long description that goes on and on and on and on and on and on and on and on and on',
    rating: 0.92
  };
}


// ============================================================================
//  SECTION 5: CUSTOM PIPES (BRIEF — KNOW IT EXISTS)
// ============================================================================

// Angular's built-in pipes cover most common cases.
// But sometimes you need your own custom transformation.
//
// Example: A pipe that adds "ago" to a number (like "5 minutes ago").

@Pipe({
  name: 'timeAgo'   // This is the name you use in templates
})
class TimeAgoPipe implements PipeTransform {
  // Every pipe must implement the "transform" method.
  // It takes the input value and returns the transformed value.

  transform(minutes: number): string {
    if (minutes < 60) {
      return `${minutes} minutes ago`;
    } else if (minutes < 1440) {
      const hours = Math.floor(minutes / 60);
      return `${hours} hours ago`;
    } else {
      const days = Math.floor(minutes / 1440);
      return `${days} days ago`;
    }
  }
}

// Usage in a template:
//   <p>Last updated: {{ 45 | timeAgo }}</p>
//   Displays: "Last updated: 45 minutes ago"
//
//   <p>Last updated: {{ 120 | timeAgo }}</p>
//   Displays: "Last updated: 2 hours ago"
//
//   <p>Last updated: {{ 2880 | timeAgo }}</p>
//   Displays: "Last updated: 2 days ago"

// Another example: A pipe that truncates long text

@Pipe({
  name: 'truncate'
})
class TruncatePipe implements PipeTransform {
  // The second parameter (limit) has a default value of 50.
  // You can override it when using the pipe.
  transform(value: string, limit: number = 50): string {
    if (value.length <= limit) {
      return value;
    }
    return value.substring(0, limit) + '...';
  }
}

// Usage:
//   {{ longText | truncate }}        --> Truncates at 50 characters
//   {{ longText | truncate:20 }}     --> Truncates at 20 characters
//   {{ longText | truncate:100 }}    --> Truncates at 100 characters
//
// The :20 after the pipe name is how you pass arguments to custom pipes.
// We already saw this with built-in pipes like date:'short'


// ============================================================================
//  SECTION 6: PURE vs. IMPURE PIPES (BRIEF — JUST KNOW THE TERMS)
// ============================================================================

// PURE PIPE (default):
//   - Only recalculates when the INPUT VALUE changes.
//   - Fast and efficient.
//   - All built-in pipes are pure.
//
// IMPURE PIPE:
//   - Recalculates on EVERY change detection cycle (very frequently).
//   - Can be slow if the transformation is expensive.
//   - Rarely needed.
//
//   @Pipe({
//     name: 'myPipe',
//     pure: false      // <-- Makes it impure
//   })
//
// For a junior interview, just know:
//   - Pipes are PURE by default (they only run when input changes).
//   - This makes them efficient.
//   - If asked, pure pipes are preferred for performance.


// ============================================================================
//  SECTION 7: QUICK REFERENCE TABLE
// ============================================================================

// Here is a cheat sheet of the most common pipes:
//
// +------------+----------------------------+----------------------------+
// | Pipe       | Input Example              | Output Example             |
// +------------+----------------------------+----------------------------+
// | uppercase  | 'hello'                    | 'HELLO'                    |
// | lowercase  | 'HELLO'                    | 'hello'                    |
// | titlecase  | 'hello world'              | 'Hello World'              |
// | currency   | 19.99                      | '$19.99'                   |
// | date       | Date object                | 'Mar 15, 2024'             |
// | date:'short'| Date object               | '3/15/24, 10:30 AM'        |
// | number     | 1000000                    | '1,000,000'                |
// | percent    | 0.75                       | '75%'                      |
// | json       | { name: 'John' }           | '{ "name": "John" }'      |
// | slice:0:5  | 'Hello World'              | 'Hello'                    |
// +------------+----------------------------+----------------------------+
//
// The ones you will use MOST OFTEN: currency, date, uppercase/titlecase.


// ============================================================================
//  SECTION 8: KEY TAKEAWAYS
// ============================================================================

// 1. PIPES transform data for DISPLAY. They do not change the original data.
//
// 2. Syntax: {{ value | pipeName }}
//    With arguments: {{ value | pipeName:arg1:arg2 }}
//
// 3. The most used pipes: date, currency, uppercase, lowercase, titlecase.
//
// 4. You can CHAIN pipes: {{ value | pipe1 | pipe2 }}
//
// 5. Custom pipes implement PipeTransform and the transform() method.
//
// 6. Pipes are PURE by default (efficient, only recalculate when input changes).
//
// 7. INTERVIEW ANSWER for "What are pipes in Angular?":
//    "Pipes are a feature that transforms data for display in templates.
//     Angular provides built-in pipes like date, currency, and uppercase.
//     You use them with the pipe symbol (|) in template expressions.
//     You can also create custom pipes by implementing PipeTransform.
//     Pipes are pure by default, meaning they only re-execute when
//     their input value changes, making them efficient."

// Next file: 06-exercise.md
// Practice questions to test your knowledge!
