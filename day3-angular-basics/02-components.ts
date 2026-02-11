// ================================================================
// DAY 3 - FILE 2: ANGULAR COMPONENTS
// ================================================================
//
// THIS FILE IS FOR READING AND LEARNING ONLY.
// You do NOT run this file. Read the comments, understand the code.
//
// Prerequisites: Read TUTORIAL.md first.
//
// ================================================================


// ============================================
// SECTION 1: What is a Component?
// ============================================

// A component is a BUILDING BLOCK of your Angular app.
// Think of it like a LEGO piece.
//
// Your web page is NOT one giant file. Instead, it is made up of
// many small, reusable pieces called components.
//
// Example: Think about Amazon.com's homepage:
//   - The navigation bar at the top = one component
//   - The search bar = one component
//   - Each product card = one component (reused many times)
//   - The shopping cart icon = one component
//   - The footer at the bottom = one component
//
// WHY use components?
//   1. REUSABILITY — Build a ProductCard component once, use it 100 times
//   2. ORGANIZATION — Each piece of the page has its own folder and files
//   3. TEAMWORK — One developer works on the header, another on the footer
//   4. MAINTENANCE — If the header breaks, you know exactly where to look
//
// Every component has THREE parts:
//   1. A TypeScript file (.ts)   — The LOGIC (what happens when you click)
//   2. An HTML file (.html)      — The TEMPLATE (what the user sees)
//   3. A CSS file (.css)         — The STYLES (how it looks)
//
// Plus optionally:
//   4. A spec file (.spec.ts)    — TESTS (checks if the component works correctly)


// ============================================
// SECTION 2: The @Component Decorator - Explained Line by Line
// ============================================

// First, we need to import "Component" from Angular's core library.
// This is like saying "I need the Component tool from Angular's toolbox."

import { Component } from '@angular/core';

// Now let's look at a basic component:

@Component({
  // ---- SELECTOR ----
  // This is the custom HTML tag name for your component.
  // Just like HTML has <div>, <p>, <h1>, you CREATE your own tag.
  //
  // With this selector, you use <app-hello> in HTML to display this component.
  // Convention: Always start with "app-" to avoid conflicts with real HTML tags.
  //
  // Examples of selectors:
  //   'app-header'        -> used as <app-header></app-header>
  //   'app-product-card'  -> used as <app-product-card></app-product-card>
  //   'app-login-form'    -> used as <app-login-form></app-login-form>
  selector: 'app-hello',

  // ---- TEMPLATE ----
  // This is the HTML that this component displays.
  // There are TWO ways to define the HTML:
  //
  // Option A: "template" (inline) — write HTML directly here (good for SHORT templates)
  // Option B: "templateUrl" — point to a separate HTML file (good for LONGER templates)
  //
  // We are using Option A here (inline):
  template: `
    <h1>Hello, {{ name }}!</h1>
    <p>Welcome to Angular.</p>
  `,
  // The backticks (`) let you write multi-line strings.
  // {{ name }} is called INTERPOLATION — it displays the value of the "name" variable.

  // ---- STYLES ----
  // This is the CSS for this component ONLY. It does NOT affect other components.
  // This is called "encapsulated styles" — each component has its own private CSS.
  //
  // There are TWO ways to define styles:
  //
  // Option A: "styles" (inline) — write CSS directly here
  // Option B: "styleUrls" — point to a separate CSS file
  //
  // We are using Option A here (inline):
  styles: [`
    h1 {
      color: blue;
      font-size: 24px;
    }
    p {
      color: gray;
    }
  `]
  // Notice: styles is an ARRAY (square brackets []) because you could have multiple
  // style strings or files. Usually you just have one.
})

// ---- THE COMPONENT CLASS ----
// The class contains the DATA and LOGIC for this component.
// "export" means other files can use this class.
// "class" is a TypeScript/JavaScript way to group data and functions together.
//
// Convention: Component class names end with "Component"
//   HelloComponent, ProductCardComponent, LoginFormComponent, etc.

export class HelloComponent {
  // This is a PROPERTY (a variable that belongs to this component).
  // It stores data. The template (HTML) can display this data using {{ name }}.
  name: string = 'Sura';

  // "string" is the TYPE — it tells TypeScript this variable holds text.
  // "= 'Sura'" is the default value.
}

// SUMMARY: A component = @Component decorator + a class
// The decorator tells Angular HOW to display it (selector, template, styles).
// The class tells Angular WHAT DATA and LOGIC it has.


// ============================================
// SECTION 3: templateUrl and styleUrls (Separate Files)
// ============================================

// In real projects, you almost ALWAYS use separate files for HTML and CSS.
// Here is what that looks like:

// @Component({
//   selector: 'app-product-list',
//   templateUrl: './product-list.component.html',    // Points to a separate HTML file
//   styleUrls: ['./product-list.component.css']      // Points to a separate CSS file
// })
// export class ProductListComponent {
//   products: string[] = ['Laptop', 'Phone', 'Tablet'];
// }

// The file structure for this component would be:
//
//   src/app/product-list/
//     |-- product-list.component.ts       <-- The file above (logic)
//     |-- product-list.component.html     <-- The HTML template
//     |-- product-list.component.css      <-- The styles
//     |-- product-list.component.spec.ts  <-- Tests
//
// When you use the Angular CLI command:
//   ng generate component product-list
// It creates ALL FOUR files for you automatically!


// ============================================
// SECTION 4: Complete Example - ProductCard Component
// ============================================

// Let's build a realistic component: a product card you might see on a shopping site.
// This is the kind of thing you would explain in an interview.

// ----- STEP 1: The TypeScript file (product-card.component.ts) -----

@Component({
  selector: 'app-product-card',

  // Using inline template so you can see everything in one place.
  // In a real project, this would be in product-card.component.html
  template: `
    <div class="product-card">
      <img [src]="imageUrl" [alt]="productName">
      <h3>{{ productName }}</h3>
      <p class="price">\${{ price }}</p>
      <p class="description">{{ description }}</p>
      <button (click)="addToCart()">Add to Cart</button>
      <p *ngIf="addedToCart" class="success">Added to cart!</p>
    </div>
  `,
  // Let's break down EVERY special Angular syntax used above:
  //
  //   {{ productName }}       -> INTERPOLATION: displays the productName variable
  //   {{ price }}             -> INTERPOLATION: displays the price variable
  //   [src]="imageUrl"        -> PROPERTY BINDING: sets the img src to the imageUrl variable
  //   [alt]="productName"     -> PROPERTY BINDING: sets the alt text
  //   (click)="addToCart()"   -> EVENT BINDING: when clicked, call the addToCart method
  //   *ngIf="addedToCart"     -> STRUCTURAL DIRECTIVE: only show this <p> if addedToCart is true
  //
  // Don't worry if these don't fully make sense yet — file 03 covers them in depth!

  styles: [`
    .product-card {
      border: 1px solid #ddd;
      border-radius: 8px;
      padding: 16px;
      width: 250px;
      text-align: center;
    }
    .product-card img {
      width: 100%;
      height: 200px;
      object-fit: cover;
    }
    .price {
      font-size: 20px;
      font-weight: bold;
      color: green;
    }
    .description {
      color: #666;
      font-size: 14px;
    }
    button {
      background-color: #ff9900;
      color: white;
      border: none;
      padding: 10px 20px;
      border-radius: 4px;
      cursor: pointer;
      font-size: 16px;
    }
    button:hover {
      background-color: #e68a00;
    }
    .success {
      color: green;
      font-weight: bold;
    }
  `]
})
export class ProductCardComponent {

  // ----- PROPERTIES (the data) -----
  // These are the variables that hold the component's data.
  // The template above uses {{ productName }}, {{ price }}, etc. to display them.

  productName: string = 'Wireless Headphones';
  price: number = 79.99;
  description: string = 'High-quality wireless headphones with noise cancellation.';
  imageUrl: string = 'https://example.com/headphones.jpg';
  addedToCart: boolean = false;   // false = not added yet, true = added

  // ----- METHODS (the actions) -----
  // These are functions that do things when the user interacts with the component.

  addToCart(): void {
    // "void" means this function does not return any value.
    // It just DOES something (sets addedToCart to true).
    this.addedToCart = true;

    // "this" refers to THIS component instance.
    // "this.addedToCart" means "the addedToCart property of THIS component."

    console.log(this.productName + ' was added to the cart!');
    // console.log prints a message to the browser's developer console.
    // Useful for debugging (checking if your code ran).
  }
}


// ============================================
// SECTION 5: How Components are Used in HTML
// ============================================

// Once you create a component, you use it in OTHER components' templates
// just like a regular HTML tag.
//
// Example: In app.component.html (the main page), you would write:
//
//   <h1>My Online Store</h1>
//
//   <app-product-card></app-product-card>
//   <app-product-card></app-product-card>
//   <app-product-card></app-product-card>
//
// This displays THREE product cards on the page!
// Each one is an independent instance — clicking "Add to Cart" on one
// does NOT affect the others.
//
// In a real app, you would pass DIFFERENT data to each card (covered in file 04).


// ============================================
// SECTION 6: Registering Components in a Module
// ============================================

// IMPORTANT: After creating a component, you MUST register it in a module.
// Otherwise Angular does not know it exists.
//
// You register it in the "declarations" array of your module:

// import { NgModule } from '@angular/core';
// import { BrowserModule } from '@angular/platform-browser';
// import { AppComponent } from './app.component';
// import { ProductCardComponent } from './product-card/product-card.component';
//
// @NgModule({
//   declarations: [
//     AppComponent,           // The main component (always here)
//     ProductCardComponent    // Our new component — ADD IT HERE
//   ],
//   imports: [
//     BrowserModule           // Angular's browser features
//   ],
//   providers: [],
//   bootstrap: [AppComponent] // Which component starts first
// })
// export class AppModule { }

// If you use the Angular CLI to generate components:
//   ng generate component product-card
// It automatically adds it to the module for you!


// ============================================
// SECTION 7: Creating Components with Angular CLI
// ============================================

// The easiest way to create a component is with the CLI:
//
//   ng generate component product-card
//
// Or the shorthand:
//
//   ng g c product-card
//
// This creates FOUR files:
//   product-card.component.ts       (the logic)
//   product-card.component.html     (the template)
//   product-card.component.css      (the styles)
//   product-card.component.spec.ts  (the tests)
//
// AND it automatically registers the component in app.module.ts.
//
// This is much faster than creating everything by hand.


// ============================================
// SECTION 8: Key Takeaways for Interviews
// ============================================

// 1. A component is a reusable building block of an Angular app.
//
// 2. Every component has a decorator (@Component) and a class.
//
// 3. The decorator has:
//    - selector: the custom HTML tag name
//    - template/templateUrl: the HTML
//    - styles/styleUrls: the CSS
//
// 4. The class has:
//    - Properties: the data (variables)
//    - Methods: the actions (functions)
//
// 5. Components are used in HTML like custom tags: <app-product-card>
//
// 6. Components must be registered in a module's declarations array.
//
// 7. Angular CLI: ng generate component component-name
//
// 8. Each component's CSS is ENCAPSULATED — it only affects that component.
//
// INTERVIEW QUESTION: "What is a component in Angular?"
// ANSWER: "A component is a reusable building block that controls a part of
//          the user interface. It consists of a TypeScript class that handles
//          the logic and data, an HTML template that defines the view, and
//          CSS styles that define the appearance. Components are defined using
//          the @Component decorator and are used in templates via their selector."
