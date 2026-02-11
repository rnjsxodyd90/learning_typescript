// ================================================================
// DAY 3 - FILE 3: TEMPLATES AND DATA BINDING
// ================================================================
//
// THIS FILE IS FOR READING AND LEARNING ONLY.
// You do NOT run this file. Read the comments, understand the code.
//
// Prerequisites: Read TUTORIAL.md and 02-components.ts first.
//
// Data binding is HOW your TypeScript code (the logic) talks to
// your HTML template (what the user sees). It is the bridge between
// the two. There are FOUR types of data binding in Angular.
//
// ================================================================

import { Component } from '@angular/core';


// ============================================
// SECTION 1: INTERPOLATION — {{ variableName }}
// ============================================
//
// Interpolation is the SIMPLEST form of data binding.
// It takes a variable from your TypeScript class and DISPLAYS it in HTML.
//
// Syntax:  {{ variableName }}
//
// Think of {{ }} as a window — it lets you SEE the data from TypeScript
// inside your HTML.

@Component({
  selector: 'app-interpolation-demo',
  template: `
    <!-- Simple variable display -->
    <h1>{{ title }}</h1>

    <!-- Multiple variables -->
    <p>My name is {{ firstName }} {{ lastName }}</p>

    <!-- Numbers work too -->
    <p>I am {{ age }} years old</p>

    <!-- You can do simple math inside {{ }} -->
    <p>Next year I will be {{ age + 1 }}</p>

    <!-- You can call methods (functions) -->
    <p>{{ getGreeting() }}</p>

    <!-- You can use string methods -->
    <p>Uppercase name: {{ firstName.toUpperCase() }}</p>

    <!-- DOES NOT WORK: You cannot use complex statements like if/else -->
    <!-- This would be WRONG: {{ if (age > 18) 'adult' }} -->
  `
})
export class InterpolationDemoComponent {
  title: string = 'Welcome to My App';
  firstName: string = 'Sura';
  lastName: string = 'Steel';
  age: number = 25;

  getGreeting(): string {
    return 'Hello, ' + this.firstName + '!';
    // "this.firstName" means "the firstName property of THIS component"
  }
}

// INTERVIEW TIP: Interpolation only works ONE WAY.
// Data flows FROM TypeScript TO the template.
// The user cannot change the value by looking at it.
// This is called "one-way data binding."


// ============================================
// SECTION 2: PROPERTY BINDING — [property]="value"
// ============================================
//
// Property binding lets you set an HTML element's PROPERTY
// to a value from your TypeScript class.
//
// Syntax:  [htmlProperty]="typescriptVariable"
//
// The square brackets [ ] mean "bind this property to a TypeScript value."
//
// What's the difference between interpolation and property binding?
//   - Interpolation {{ }} is for displaying TEXT content
//   - Property binding [ ] is for setting HTML PROPERTIES (src, disabled, href, etc.)

@Component({
  selector: 'app-property-binding-demo',
  template: `
    <!-- Setting the src of an image -->
    <img [src]="imageUrl" [alt]="imageDescription">

    <!-- Disabling a button based on a boolean variable -->
    <button [disabled]="isButtonDisabled">Submit</button>

    <!--
      Why use [disabled]="isButtonDisabled" instead of disabled="{{ isButtonDisabled }}"?

      Because "disabled" is a PROPERTY, not text content.
      Interpolation would convert it to a STRING: disabled="true" or disabled="false"
      But in HTML, disabled="false" STILL disables the button! (Any value disables it)
      Property binding correctly sets it to the boolean true/false.
    -->

    <!-- Setting a CSS class conditionally -->
    <p [class.highlight]="isImportant">This might be highlighted</p>
    <!--
      If isImportant is true  -> the "highlight" CSS class is ADDED
      If isImportant is false -> the "highlight" CSS class is REMOVED
    -->

    <!-- Setting inline styles -->
    <p [style.color]="textColor">This text has a dynamic color</p>
    <p [style.font-size.px]="fontSize">This text has a dynamic size</p>
  `
})
export class PropertyBindingDemoComponent {
  imageUrl: string = 'https://example.com/photo.jpg';
  imageDescription: string = 'A beautiful landscape';
  isButtonDisabled: boolean = true;   // true = button is disabled (cannot click)
  isImportant: boolean = true;
  textColor: string = 'red';
  fontSize: number = 20;
}


// ============================================
// SECTION 3: EVENT BINDING — (event)="handler()"
// ============================================
//
// Event binding lets you RESPOND to user actions (clicks, key presses, etc.).
//
// Syntax:  (eventName)="methodName()"
//
// The parentheses ( ) mean "when this event happens, call this method."
//
// Common events:
//   (click)      — user clicks
//   (dblclick)   — user double-clicks
//   (mouseover)  — mouse hovers over element
//   (mouseout)   — mouse leaves element
//   (keyup)      — user releases a key
//   (keydown)    — user presses a key
//   (submit)     — form is submitted
//   (input)      — user types in an input field

@Component({
  selector: 'app-event-binding-demo',
  template: `
    <!-- CLICK event -->
    <button (click)="onButtonClick()">Click Me!</button>
    <p>Button was clicked {{ clickCount }} times</p>

    <!-- CLICK event with passing data -->
    <button (click)="onBuy('Laptop')">Buy Laptop</button>
    <button (click)="onBuy('Phone')">Buy Phone</button>
    <p>{{ purchaseMessage }}</p>

    <!-- MOUSEOVER and MOUSEOUT events -->
    <p
      (mouseover)="onMouseOver()"
      (mouseout)="onMouseOut()"
      [style.color]="hoverColor"
    >
      Hover over me!
    </p>

    <!-- KEYUP event — reacting to keyboard input -->
    <input
      type="text"
      (keyup)="onKeyUp($event)"
      placeholder="Type something..."
    >
    <p>You typed: {{ typedText }}</p>
    <!--
      $event is a special Angular variable. It contains information about
      the event that just happened. For keyup, it tells you which key was
      pressed and what the input's current value is.
    -->

    <!-- KEYUP.ENTER — only triggers when Enter key is pressed -->
    <input
      type="text"
      (keyup.enter)="onSearch($event)"
      placeholder="Search and press Enter..."
    >
    <p>You searched for: {{ searchTerm }}</p>
  `
})
export class EventBindingDemoComponent {
  clickCount: number = 0;
  purchaseMessage: string = '';
  hoverColor: string = 'black';
  typedText: string = '';
  searchTerm: string = '';

  onButtonClick(): void {
    this.clickCount++;   // ++ means add 1
    // First click: clickCount goes from 0 to 1
    // Second click: clickCount goes from 1 to 2
    // And so on...
  }

  onBuy(productName: string): void {
    this.purchaseMessage = 'You bought a ' + productName + '!';
  }

  onMouseOver(): void {
    this.hoverColor = 'blue';
  }

  onMouseOut(): void {
    this.hoverColor = 'black';
  }

  onKeyUp(event: any): void {
    // event.target is the HTML element (the input box)
    // event.target.value is whatever text is currently in the input box
    this.typedText = event.target.value;
  }

  onSearch(event: any): void {
    this.searchTerm = event.target.value;
  }
}


// ============================================
// SECTION 4: TWO-WAY BINDING — [(ngModel)]="variable"
// ============================================
//
// Two-way binding is the combination of property binding AND event binding.
// It creates a TWO-WAY connection between an input field and a variable:
//   - When the variable changes -> the input field updates
//   - When the user types in the input field -> the variable updates
//
// Syntax:  [(ngModel)]="variableName"
//
// The combination [( )] is sometimes called "banana in a box" because
// the parentheses () look like a banana inside the square brackets [].
//
// IMPORTANT: To use ngModel, you must import FormsModule in your module:
//   import { FormsModule } from '@angular/forms';
//   And add it to the imports array in @NgModule

@Component({
  selector: 'app-two-way-binding-demo',
  template: `
    <!-- Two-way binding: typing in the input INSTANTLY updates the <h1> -->
    <input type="text" [(ngModel)]="userName" placeholder="Enter your name">
    <h1>Hello, {{ userName }}!</h1>
    <!--
      As the user types "S", "Su", "Sur", "Sura"...
      the <h1> instantly shows "Hello, S!", "Hello, Su!", "Hello, Sur!", "Hello, Sura!"
      This is LIVE — no button press needed.
    -->

    <!-- Another example: a color picker -->
    <input type="color" [(ngModel)]="selectedColor">
    <p [style.color]="selectedColor">This text changes color!</p>

    <!-- Another example: a range slider -->
    <input type="range" [(ngModel)]="fontSize" min="10" max="50">
    <p [style.font-size.px]="fontSize">Font size: {{ fontSize }}px</p>
  `
})
export class TwoWayBindingDemoComponent {
  userName: string = '';
  selectedColor: string = '#000000';
  fontSize: number = 16;
}


// ============================================
// SECTION 5: *ngIf — Conditional Display
// ============================================
//
// *ngIf shows or HIDES an element based on a condition.
// If the condition is TRUE, the element appears.
// If the condition is FALSE, the element is REMOVED from the page entirely.
//
// Syntax:  *ngIf="condition"
//
// The * (asterisk) means this is a "structural directive" — it changes
// the STRUCTURE of the HTML (adds or removes elements).

@Component({
  selector: 'app-ngif-demo',
  template: `
    <!-- Simple show/hide -->
    <button (click)="toggleMessage()">Toggle Message</button>
    <p *ngIf="showMessage">This message can be shown or hidden!</p>

    <!-- Showing content based on a condition -->
    <p *ngIf="age >= 18">You are an adult. Welcome!</p>
    <p *ngIf="age < 18">You are a minor. Some content is restricted.</p>

    <!-- Using *ngIf with else -->
    <div *ngIf="isLoggedIn; else loginTemplate">
      <p>Welcome back, {{ username }}!</p>
      <button (click)="logout()">Logout</button>
    </div>
    <ng-template #loginTemplate>
      <p>Please log in to continue.</p>
      <button (click)="login()">Login</button>
    </ng-template>
    <!--
      How the "else" works:
      1. *ngIf="isLoggedIn; else loginTemplate" means:
         - If isLoggedIn is true -> show the <div>
         - If isLoggedIn is false -> show the template called "loginTemplate"
      2. <ng-template #loginTemplate> defines an alternative template
         #loginTemplate is a "template reference variable" — just a name/label
      3. <ng-template> is NOT displayed by default. It only appears when
         Angular is told to show it (via the "else" in *ngIf).
    -->

    <!-- Checking if a list has items -->
    <div *ngIf="products.length > 0; else noProducts">
      <p>We have {{ products.length }} products available.</p>
    </div>
    <ng-template #noProducts>
      <p>No products found. Try a different search.</p>
    </ng-template>
  `
})
export class NgIfDemoComponent {
  showMessage: boolean = true;
  age: number = 22;
  isLoggedIn: boolean = false;
  username: string = 'Sura';
  products: string[] = ['Laptop', 'Phone', 'Tablet'];

  toggleMessage(): void {
    // This flips the boolean: true becomes false, false becomes true
    this.showMessage = !this.showMessage;
  }

  login(): void {
    this.isLoggedIn = true;
  }

  logout(): void {
    this.isLoggedIn = false;
  }
}


// ============================================
// SECTION 6: *ngFor — Looping Through Lists
// ============================================
//
// *ngFor repeats an HTML element for EACH item in a list (array).
//
// Syntax:  *ngFor="let item of items"
//
// This is like a "for each" loop but in HTML.
// "let item" creates a temporary variable for each item in the list.
// "of items" means "from the items array."

@Component({
  selector: 'app-ngfor-demo',
  template: `
    <!-- Simple list -->
    <h2>Fruits</h2>
    <ul>
      <li *ngFor="let fruit of fruits">{{ fruit }}</li>
    </ul>
    <!--
      If fruits = ['Apple', 'Banana', 'Cherry'], this produces:
        <li>Apple</li>
        <li>Banana</li>
        <li>Cherry</li>
    -->

    <!-- Using the index -->
    <h2>Numbered Shopping List</h2>
    <ul>
      <li *ngFor="let item of shoppingList; let i = index">
        {{ i + 1 }}. {{ item }}
      </li>
    </ul>
    <!--
      "let i = index" gives you the position number (starts at 0).
      We display "i + 1" so it starts at 1 instead of 0.
      Result:
        1. Milk
        2. Bread
        3. Eggs
    -->

    <!-- Looping through objects -->
    <h2>Products</h2>
    <div *ngFor="let product of products" class="product-card">
      <h3>{{ product.name }}</h3>
      <p>Price: \${{ product.price }}</p>
      <p>In Stock: {{ product.inStock ? 'Yes' : 'No' }}</p>
    </div>
    <!--
      Each "product" is an object with name, price, and inStock properties.
      {{ product.inStock ? 'Yes' : 'No' }} is a TERNARY OPERATOR:
        condition ? valueIfTrue : valueIfFalse
    -->

    <!-- Combining *ngFor with *ngIf -->
    <h2>Available Products Only</h2>
    <div *ngFor="let product of products">
      <div *ngIf="product.inStock">
        <p>{{ product.name }} - \${{ product.price }}</p>
      </div>
    </div>
    <!--
      NOTE: You CANNOT put *ngFor and *ngIf on the SAME element.
      That is why we use a wrapper <div> with *ngFor,
      and an inner <div> with *ngIf.
    -->
  `
})
export class NgForDemoComponent {
  fruits: string[] = ['Apple', 'Banana', 'Cherry', 'Date', 'Elderberry'];

  shoppingList: string[] = ['Milk', 'Bread', 'Eggs', 'Butter', 'Cheese'];

  products: { name: string; price: number; inStock: boolean }[] = [
    { name: 'Laptop',    price: 999.99,  inStock: true },
    { name: 'Phone',     price: 699.99,  inStock: true },
    { name: 'Tablet',    price: 449.99,  inStock: false },
    { name: 'Headphones', price: 79.99,  inStock: true },
    { name: 'Smartwatch', price: 299.99, inStock: false },
  ];
  // The type "{ name: string; price: number; inStock: boolean }[]" means:
  //   - It is an array ([])
  //   - Each item in the array is an object with those three properties
}


// ============================================
// SECTION 7: COMPLETE EXAMPLE — Putting It All Together
// ============================================
//
// Here is a realistic component that uses ALL the binding types we learned.
// This is a "User Profile" component.

@Component({
  selector: 'app-user-profile',
  template: `
    <div class="profile-container">
      <!-- INTERPOLATION -->
      <h1>{{ fullName }}'s Profile</h1>

      <!-- PROPERTY BINDING -->
      <img [src]="avatarUrl" [alt]="fullName + ' avatar'" class="avatar">

      <!-- TWO-WAY BINDING for editing -->
      <div class="edit-section">
        <label>First Name:</label>
        <input type="text" [(ngModel)]="firstName">

        <label>Last Name:</label>
        <input type="text" [(ngModel)]="lastName">

        <label>Bio:</label>
        <textarea [(ngModel)]="bio"></textarea>
      </div>

      <!-- INTERPOLATION showing live updates from two-way binding -->
      <div class="preview">
        <h2>Preview:</h2>
        <p><strong>Name:</strong> {{ firstName }} {{ lastName }}</p>
        <p><strong>Bio:</strong> {{ bio }}</p>
      </div>

      <!-- *ngIf — conditional display -->
      <p *ngIf="bio.length > 100" class="warning">
        Bio is getting long ({{ bio.length }} characters)
      </p>

      <!-- EVENT BINDING -->
      <button (click)="addSkill()">Add Skill</button>

      <!-- *ngFor — looping through skills -->
      <h3>Skills:</h3>
      <ul>
        <li *ngFor="let skill of skills; let i = index">
          {{ skill }}
          <button (click)="removeSkill(i)" class="remove-btn">Remove</button>
        </li>
      </ul>

      <!-- *ngIf — show message when no skills -->
      <p *ngIf="skills.length === 0">No skills added yet.</p>
    </div>
  `,
  styles: [`
    .profile-container { max-width: 500px; padding: 20px; }
    .avatar { width: 100px; height: 100px; border-radius: 50%; }
    .edit-section label { display: block; margin-top: 10px; font-weight: bold; }
    .edit-section input, .edit-section textarea { width: 100%; padding: 8px; }
    .preview { background: #f0f0f0; padding: 10px; margin: 10px 0; }
    .warning { color: orange; }
    .remove-btn { margin-left: 10px; color: red; cursor: pointer; }
  `]
})
export class UserProfileComponent {
  firstName: string = 'Sura';
  lastName: string = 'Steel';
  bio: string = 'I am a junior developer learning Angular!';
  avatarUrl: string = 'https://example.com/avatar.jpg';
  skills: string[] = ['HTML', 'CSS', 'JavaScript'];

  // Computed property — combines first and last name
  get fullName(): string {
    return this.firstName + ' ' + this.lastName;
    // "get" makes this a GETTER — you use it like a variable ({{ fullName }})
    // but it runs a function behind the scenes.
  }

  addSkill(): void {
    const newSkill = prompt('Enter a new skill:');
    // prompt() shows a browser popup asking for input
    if (newSkill) {
      this.skills.push(newSkill);
      // push() adds an item to the end of an array
    }
  }

  removeSkill(index: number): void {
    this.skills.splice(index, 1);
    // splice(index, 1) removes 1 item at the given position
  }
}


// ============================================
// SECTION 8: Summary — The Four Types of Data Binding
// ============================================

//  TYPE               | SYNTAX                  | DIRECTION              | USE CASE
//  -------------------|-------------------------|------------------------|---------------------------
//  Interpolation      | {{ variable }}          | TypeScript -> HTML     | Display text
//  Property Binding   | [property]="variable"   | TypeScript -> HTML     | Set element properties
//  Event Binding      | (event)="method()"      | HTML -> TypeScript     | Respond to user actions
//  Two-Way Binding    | [(ngModel)]="variable"  | TypeScript <-> HTML    | Input fields (live sync)
//
//  DIRECTIVES         | SYNTAX                  | WHAT IT DOES
//  -------------------|-------------------------|---------------------------
//  *ngIf              | *ngIf="condition"       | Show/hide elements
//  *ngFor             | *ngFor="let x of list"  | Loop through a list
//
// INTERVIEW QUESTION: "What are the different types of data binding in Angular?"
// ANSWER: "Angular has four types of data binding:
//   1. Interpolation (double curly braces) for displaying data as text.
//   2. Property binding (square brackets) for setting HTML properties dynamically.
//   3. Event binding (parentheses) for responding to user events like clicks.
//   4. Two-way binding (banana in a box — square brackets with parentheses)
//      for keeping an input field and a variable in sync.
//   Additionally, Angular has structural directives like *ngIf for conditional
//   rendering and *ngFor for looping through arrays."
