# Day 3: Angular Basics - Practice Exercises

## Instructions

Answer these questions **on paper or in a text file**. Try to answer from memory FIRST, then check the answers at the bottom. These are the types of questions you might get in a junior developer interview.

Take your time. Understanding WHY is more important than memorizing exact syntax.

---

## Questions

### Question 1: What is a Component?
Describe what an Angular component is in your own words. What three files does a component typically consist of?

---

### Question 2: Interpolation
What does `{{ name }}` do in an Angular template? What kind of data binding is this?

---

### Question 3: Event Binding vs Property Binding
What is the difference between `(click)="doSomething()"` and `[src]="imageUrl"`? Which one sends data TO the template and which one receives events FROM the template?

---

### Question 4: Write a Component
On paper or in a text editor, write an Angular component called `ProductListComponent` that:
- Has an array of products (each product has a name and price)
- Displays each product's name and price in a list
- Has a button next to each product that says "Buy"
- When the "Buy" button is clicked, it shows an alert or sets a message

You do not need to get the syntax 100% perfect. Focus on the structure.

---

### Question 5: Lifecycle Hooks
What lifecycle hook would you use to load data from a server when a component first appears? Why would you NOT use the constructor for this?

---

### Question 6: Two-Way Binding
Explain what `[(ngModel)]="searchTerm"` does. What module must you import to use ngModel?

---

### Question 7: *ngIf and *ngFor
Given this component class:
```typescript
export class FruitListComponent {
  fruits: string[] = ['Apple', 'Banana', 'Cherry'];
  showList: boolean = true;
}
```
Write the HTML template that:
- Shows the list of fruits ONLY when `showList` is true
- Displays each fruit as a list item
- Has a button that toggles `showList` between true and false

---

### Question 8: @Input and @Output
Explain the difference between `@Input()` and `@Output()`. Which direction does data flow for each one? Give a real-world example of when you would use each.

---

### Question 9: Angular vs React
Your interviewer asks: "What is the difference between Angular and React?" Give a concise answer covering at least 3 differences.

---

### Question 10: Form Validation
Look at this form field:
```html
<input
  type="text"
  [(ngModel)]="username"
  name="username"
  required
  minlength="3"
  #usernameField="ngModel"
>
<p *ngIf="usernameField.invalid && usernameField.touched">
  Username is invalid
</p>
```
Explain what each part does:
- What does `required` do?
- What does `minlength="3"` do?
- What does `#usernameField="ngModel"` do?
- Why do we check both `usernameField.invalid` AND `usernameField.touched`?

---

## ANSWERS

(Try your best before looking!)

---

### Answer 1: What is a Component?
A component is a reusable building block of an Angular application. It controls a piece of the user interface. Think of components like LEGO blocks -- you snap them together to build a complete page.

A component typically consists of three files:
1. **A TypeScript file (.ts)** -- contains the logic, data, and methods
2. **An HTML file (.html)** -- the template that defines what the user sees
3. **A CSS file (.css)** -- styles that only apply to this component

A component is defined using the `@Component` decorator which specifies:
- `selector`: the custom HTML tag name (e.g., `'app-product-card'`)
- `templateUrl`: the path to the HTML template
- `styleUrls`: the path to the CSS file(s)

---

### Answer 2: Interpolation
`{{ name }}` is called **interpolation**. It takes the value of the `name` variable from the TypeScript class and displays it as text in the HTML template.

This is **one-way data binding** -- data flows FROM the TypeScript class TO the template. If `name = 'Sura'`, then `{{ name }}` will display "Sura" on the page. If the variable changes, the display updates automatically.

---

### Answer 3: Event Binding vs Property Binding

**`(click)="doSomething()"`** is **event binding**.
- The parentheses `()` mean "listen for this event."
- Data flows FROM the template TO the TypeScript class.
- When the user clicks, it calls the `doSomething()` method in the class.
- Direction: HTML -> TypeScript

**`[src]="imageUrl"`** is **property binding**.
- The square brackets `[]` mean "bind this property to a value."
- Data flows FROM the TypeScript class TO the template.
- It sets the HTML element's `src` property to the value of `imageUrl`.
- Direction: TypeScript -> HTML

Memory trick:
- `()` looks like an "O" for "Output" (events go OUT from the template)
- `[]` looks like a box receiving something "IN" from TypeScript

---

### Answer 4: Write a Component

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-product-list',
  template: `
    <h2>Products</h2>
    <ul>
      <li *ngFor="let product of products">
        {{ product.name }} - ${{ product.price }}
        <button (click)="onBuy(product.name)">Buy</button>
      </li>
    </ul>
    <p *ngIf="purchaseMessage">{{ purchaseMessage }}</p>
  `
})
export class ProductListComponent {
  products = [
    { name: 'Laptop', price: 999 },
    { name: 'Phone', price: 699 },
    { name: 'Tablet', price: 449 }
  ];

  purchaseMessage: string = '';

  onBuy(productName: string): void {
    this.purchaseMessage = 'You bought a ' + productName + '!';
  }
}
```

Key elements in this answer:
- `@Component` decorator with selector and template
- An array of product objects in the class
- `*ngFor` to loop through products
- `{{ }}` interpolation to display name and price
- `(click)` event binding on the button
- A method that handles the click

---

### Answer 5: Lifecycle Hooks

Use **`ngOnInit`** to load data from a server.

You should NOT use the constructor because:
1. The constructor runs when the class is first instantiated, but `@Input()` values from parent components are **not yet available** at that point.
2. The component is not fully initialized in the constructor.
3. The constructor should only be used for **dependency injection** (receiving services).
4. `ngOnInit` runs after the constructor, after Angular has set up the component's inputs, so the component is fully ready.

```typescript
export class UserListComponent implements OnInit {
  users: any[] = [];

  constructor(private userService: UserService) {
    // Only dependency injection here
  }

  ngOnInit(): void {
    // Fetch data HERE, not in the constructor
    this.userService.getUsers().subscribe(data => {
      this.users = data;
    });
  }
}
```

---

### Answer 6: Two-Way Binding

`[(ngModel)]="searchTerm"` creates a **two-way data binding** between an input field and the `searchTerm` variable in the TypeScript class.

This means:
- When the user types in the input field, the `searchTerm` variable **automatically updates**.
- If `searchTerm` is changed in the TypeScript code, the input field **automatically shows the new value**.

The `[()]` syntax is sometimes called "banana in a box" because the parentheses `()` look like a banana inside the brackets `[]`.

To use `ngModel`, you must import **`FormsModule`** in your module:
```typescript
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [FormsModule],
  ...
})
```

---

### Answer 7: *ngIf and *ngFor

```html
<button (click)="showList = !showList">
  {{ showList ? 'Hide' : 'Show' }} Fruits
</button>

<ul *ngIf="showList">
  <li *ngFor="let fruit of fruits">{{ fruit }}</li>
</ul>
```

Explanation:
- The button uses `(click)="showList = !showList"` to flip the boolean (true becomes false, false becomes true).
- The button text uses a ternary: if `showList` is true, it says "Hide Fruits"; if false, "Show Fruits."
- `*ngIf="showList"` on the `<ul>` means the entire list only appears when `showList` is true.
- `*ngFor="let fruit of fruits"` creates one `<li>` for each fruit in the array.

---

### Answer 8: @Input and @Output

**@Input()** -- passes data FROM a parent component TO a child component.
- Direction: Parent -> Child (data flows DOWN)
- Like giving a value to a function parameter.
- Example: A `ProductListComponent` (parent) passes a product name to a `ProductCardComponent` (child) so the card knows what to display.

```html
<!-- Parent template -->
<app-product-card [name]="'Laptop'" [price]="999"></app-product-card>
```

**@Output()** -- sends events FROM a child component TO a parent component.
- Direction: Child -> Parent (events flow UP)
- Like a callback function.
- Uses `EventEmitter` to emit custom events.
- Example: A `ProductCardComponent` (child) has a "Buy" button. When clicked, it emits an event to tell the `ProductListComponent` (parent) that the user wants to buy this product.

```html
<!-- Parent template -->
<app-product-card (addToCart)="handleAddToCart($event)"></app-product-card>
```

---

### Answer 9: Angular vs React

"Angular and React differ in several key ways:

1. **Framework vs Library**: Angular is a full **framework** made by Google that includes everything out of the box -- routing, forms, HTTP client, and testing tools. React is a UI **library** made by Facebook that focuses on building components, and you need to add third-party libraries for routing, state management, and other features.

2. **Language**: Angular uses **TypeScript** by default, which adds type safety and catches errors at compile time. React uses JavaScript by default, though it can also use TypeScript.

3. **Structure**: Angular is more **opinionated** -- there is generally one recommended way to do things, which makes it good for large teams. React is more **flexible** -- developers have many choices for how to structure their app.

4. **Learning Curve**: Angular has a steeper learning curve because there is more to learn upfront. React is easier to start with, but you need to learn the ecosystem of add-on libraries."

---

### Answer 10: Form Validation

- **`required`**: A built-in HTML validation attribute. It means the field cannot be empty. If the user tries to submit with an empty field, it will be marked as invalid.

- **`minlength="3"`**: A validation rule that requires the user to type at least 3 characters. If they type fewer than 3, the field is invalid.

- **`#usernameField="ngModel"`**: This creates a **template reference variable** called `usernameField` that points to the NgModel directive on this input. It gives us access to the field's validation state (valid/invalid, touched/untouched, errors).

- **Why check both `invalid` AND `touched`?**: We check `invalid` to know if the validation failed. We check `touched` to know if the user has interacted with the field (clicked into it and then clicked out). We need BOTH because we do not want to show error messages before the user has even tried to fill in the field. Without checking `touched`, the error message would appear immediately when the page loads, which is a bad user experience.

---

## Bonus: Quick Self-Test (Yes/No)

1. Does Angular use TypeScript? **Yes**
2. Is Angular made by Facebook? **No (Google)**
3. Can you use *ngFor and *ngIf on the same element? **No (use a wrapper element)**
4. Does ngOnInit run before or after the constructor? **After**
5. Does @Input pass data from child to parent? **No (parent to child)**
6. Do you need FormsModule to use ngModel? **Yes**
7. Is a component's CSS shared with other components? **No (it is encapsulated)**
8. Can {{ }} display the result of a method call? **Yes (e.g., {{ getTotal() }})**
9. Does ngOnDestroy run when a component first appears? **No (when it is removed)**
10. Is `[disabled]="true"` the same as `disabled="true"`? **No (property binding vs string attribute)**
