// ================================================================
// DAY 3 - FILE 4: @Input() AND @Output() — COMPONENT COMMUNICATION
// ================================================================
//
// THIS FILE IS FOR READING AND LEARNING ONLY.
// You do NOT run this file. Read the comments, understand the code.
//
// Prerequisites: Read files 02 and 03 first.
//
// When you have multiple components, they need to TALK to each other.
// A parent component needs to send data DOWN to its children.
// A child component needs to send events UP to its parent.
//
// Think of it like a family:
//   - Parent GIVES things to the child (@Input)
//   - Child TELLS the parent when something happens (@Output)
//
// ================================================================

import { Component, Input, Output, EventEmitter } from '@angular/core';


// ============================================
// SECTION 1: @Input() — Parent Sends Data to Child
// ============================================
//
// @Input() is a decorator that marks a property as "receivable from outside."
// It is like a function parameter — the parent passes a value in.
//
// WITHOUT @Input:
//   The component's data is private — only the component itself can set it.
//
// WITH @Input:
//   The parent component can pass data INTO this property from its template.
//
// Real-world analogy:
//   A TV has an HDMI INPUT port. You plug a cable in (send data from outside).
//   @Input() is like creating that port on your component.


// ----- THE CHILD COMPONENT -----
// This component displays ONE product card.
// It does NOT know what product to show — the parent TELLS it via @Input().

@Component({
  selector: 'app-product-card',
  template: `
    <div class="card">
      <h3>{{ name }}</h3>
      <p>Price: \${{ price }}</p>
      <img [src]="imageUrl" [alt]="name">
      <p *ngIf="onSale" class="sale-badge">ON SALE!</p>
    </div>
  `,
  styles: [`
    .card { border: 1px solid #ccc; padding: 16px; margin: 8px; border-radius: 8px; }
    .sale-badge { background: red; color: white; padding: 4px 8px; border-radius: 4px; }
  `]
})
export class ProductCardComponent {

  // These properties are decorated with @Input().
  // That means the PARENT component can set these values.

  @Input() name: string = '';
  // The parent will pass in a product name like 'Laptop'

  @Input() price: number = 0;
  // The parent will pass in a price like 999.99

  @Input() imageUrl: string = '';
  // The parent will pass in an image URL

  @Input() onSale: boolean = false;
  // The parent will pass in whether this product is on sale
}


// ----- THE PARENT COMPONENT -----
// This component has a list of products and passes each one to a ProductCard.

@Component({
  selector: 'app-product-list',
  template: `
    <h1>Our Products</h1>

    <!-- Using the child component and passing data via @Input properties -->
    <app-product-card
      [name]="'Laptop'"
      [price]="999.99"
      [imageUrl]="'https://example.com/laptop.jpg'"
      [onSale]="true"
    ></app-product-card>

    <!--
      LOOK CAREFULLY at the syntax:
        [name]="'Laptop'"

      - [name] — square brackets mean PROPERTY BINDING (bind to the @Input property)
      - "name" — this is the @Input property name in the child component
      - "'Laptop'" — the value being passed (notice the single quotes inside double quotes
                     because it is a string literal)
    -->

    <!-- You can also pass VARIABLES instead of hardcoded values -->
    <app-product-card
      [name]="featuredProduct.name"
      [price]="featuredProduct.price"
      [imageUrl]="featuredProduct.imageUrl"
      [onSale]="featuredProduct.onSale"
    ></app-product-card>

    <!-- Using *ngFor to create a card for EACH product in the array -->
    <app-product-card
      *ngFor="let product of products"
      [name]="product.name"
      [price]="product.price"
      [imageUrl]="product.imageUrl"
      [onSale]="product.onSale"
    ></app-product-card>
    <!--
      This is the POWER of components + @Input + *ngFor!
      With just a few lines, we create a card for every product.
      If the array has 100 products, 100 cards appear. If it has 3, 3 cards appear.
    -->
  `
})
export class ProductListComponent {

  featuredProduct = {
    name: 'Wireless Headphones',
    price: 79.99,
    imageUrl: 'https://example.com/headphones.jpg',
    onSale: true
  };

  products = [
    { name: 'Laptop',      price: 999.99, imageUrl: 'https://example.com/laptop.jpg',  onSale: true },
    { name: 'Phone',       price: 699.99, imageUrl: 'https://example.com/phone.jpg',   onSale: false },
    { name: 'Tablet',      price: 449.99, imageUrl: 'https://example.com/tablet.jpg',  onSale: true },
    { name: 'Smartwatch',  price: 299.99, imageUrl: 'https://example.com/watch.jpg',   onSale: false },
  ];
}


// ============================================
// SECTION 2: @Output() — Child Sends Events to Parent
// ============================================
//
// @Output() is a decorator that lets a child component SEND EVENTS to its parent.
// It is like a callback function — "Hey parent, something happened!"
//
// Real-world analogy:
//   A child at school raises their hand (sends a signal) to the teacher (parent).
//   The teacher then decides what to do about it.
//
// HOW IT WORKS:
//   1. The child creates an @Output property using EventEmitter
//   2. When something happens (like a button click), the child EMITS an event
//   3. The parent LISTENS for that event in its template
//   4. When the event fires, the parent runs a method
//
// EventEmitter is a class from Angular that lets you create custom events.
// Think of it like a megaphone — the child uses it to shout to the parent.


// ----- THE CHILD COMPONENT (with both @Input and @Output) -----

@Component({
  selector: 'app-product-card-interactive',
  template: `
    <div class="card">
      <h3>{{ name }}</h3>
      <p>Price: \${{ price }}</p>

      <!-- When the user clicks "Add to Cart", we EMIT an event to the parent -->
      <button (click)="onAddToCart()">Add to Cart</button>

      <!-- When the user clicks "Remove", we EMIT a different event -->
      <button (click)="onRemove()" class="remove-btn">Remove</button>
    </div>
  `,
  styles: [`
    .card { border: 1px solid #ccc; padding: 16px; margin: 8px; }
    .remove-btn { background: red; color: white; border: none; padding: 8px; }
  `]
})
export class ProductCardInteractiveComponent {

  // @Input — data coming IN from the parent
  @Input() name: string = '';
  @Input() price: number = 0;

  // @Output — events going OUT to the parent
  // EventEmitter<string> means this event will carry a string value
  @Output() addToCart = new EventEmitter<string>();
  // EventEmitter<number> means this event will carry a number value
  @Output() removeProduct = new EventEmitter<string>();

  //
  // BREAKING THIS DOWN:
  //
  //   @Output()
  //     -> This decorator marks the property as an event that the parent can listen to
  //
  //   addToCart
  //     -> The name of the event. The parent will use (addToCart)="..." in its template
  //
  //   = new EventEmitter<string>()
  //     -> Creates a new EventEmitter that can send string data
  //     -> <string> is the TYPE of data the event carries
  //     -> You could also use <number>, <boolean>, or any custom type
  //

  onAddToCart(): void {
    // .emit() sends the event to the parent, carrying data with it
    this.addToCart.emit(this.name);
    // This says: "Hey parent! The 'addToCart' event happened! Here is the product name."
  }

  onRemove(): void {
    this.removeProduct.emit(this.name);
    // This says: "Hey parent! The 'removeProduct' event happened! Here is the product name."
  }
}


// ----- THE PARENT COMPONENT — Listening for Child Events -----

@Component({
  selector: 'app-shopping-page',
  template: `
    <h1>Shop</h1>

    <!-- Display product cards using *ngFor -->
    <app-product-card-interactive
      *ngFor="let product of products"
      [name]="product.name"
      [price]="product.price"
      (addToCart)="handleAddToCart($event)"
      (removeProduct)="handleRemoveProduct($event)"
    ></app-product-card-interactive>

    <!--
      LOOK CAREFULLY:
        (addToCart)="handleAddToCart($event)"

      - (addToCart) — parentheses mean EVENT BINDING
      - "addToCart" — this matches the @Output property name in the child
      - handleAddToCart($event) — the parent's method that will run
      - $event — the DATA that the child sent with .emit()
                 (in this case, the product name string)
    -->

    <!-- Display the cart -->
    <h2>Shopping Cart ({{ cart.length }} items)</h2>
    <ul>
      <li *ngFor="let item of cart">{{ item }}</li>
    </ul>
    <p *ngIf="cart.length === 0">Your cart is empty.</p>

    <!-- Display removed products message -->
    <p *ngIf="lastRemoved">Last removed: {{ lastRemoved }}</p>
  `
})
export class ShoppingPageComponent {

  products = [
    { name: 'Laptop',     price: 999.99 },
    { name: 'Phone',      price: 699.99 },
    { name: 'Headphones', price: 79.99 },
  ];

  cart: string[] = [];         // Array of product names in the cart
  lastRemoved: string = '';    // Name of last removed product

  handleAddToCart(productName: string): void {
    // productName is the data that came from the child's .emit()
    this.cart.push(productName);
    console.log('Added to cart: ' + productName);
  }

  handleRemoveProduct(productName: string): void {
    this.lastRemoved = productName;
    // Remove the product from the products array
    this.products = this.products.filter(p => p.name !== productName);
    // filter() creates a NEW array containing only items where the condition is true
    // So this keeps all products EXCEPT the one being removed
    console.log('Removed product: ' + productName);
  }
}


// ============================================
// SECTION 3: The Complete Data Flow — Visual Diagram
// ============================================

//
//  PARENT COMPONENT (ShoppingPageComponent)
//  +--------------------------------------------------+
//  |                                                   |
//  |  products = [{name: 'Laptop', price: 999}, ...]   |
//  |  cart = ['Laptop', 'Phone']                       |
//  |                                                   |
//  |  Template:                                        |
//  |  <app-product-card-interactive                    |
//  |    [name]="product.name"          ---|            |
//  |    [price]="product.price"        ---|            |
//  |    (addToCart)="handleAddToCart($event)"  <--|     |
//  |    (removeProduct)="handleRemoveProduct($event)"> |
//  |                                                   |
//  +--------------------------------------------------+
//         |   DATA GOES DOWN via @Input      |
//         v                                  ^
//  +--------------------------------------------------+
//  |                                                   |
//  |  CHILD COMPONENT (ProductCardInteractiveComponent)|
//  |                                                   |
//  |  @Input() name          <--- receives 'Laptop'    |
//  |  @Input() price         <--- receives 999         |
//  |                                                   |
//  |  @Output() addToCart    ---> emits 'Laptop'       |
//  |  @Output() removeProduct ---> emits 'Laptop'     |
//  |                                                   |
//  |  EVENTS GO UP via @Output                         |
//  +--------------------------------------------------+
//
// DATA FLOWS DOWN (parent -> child) via @Input
// EVENTS FLOW UP (child -> parent) via @Output
//
// This is called "unidirectional data flow" and it keeps your app predictable.
//


// ============================================
// SECTION 4: @Input with Custom Names (Alias)
// ============================================

// Sometimes you want the @Input property name inside the component to be
// different from the attribute name used in the template.

@Component({
  selector: 'app-greeting',
  template: `<h1>Hello, {{ personName }}!</h1>`
})
export class GreetingComponent {
  // The parent uses [name]="..." but inside this component, the variable is personName
  @Input('name') personName: string = '';
  //
  // @Input('name') means:
  //   - The parent writes: <app-greeting [name]="'Sura'">
  //   - Inside this component, the value is stored in "personName"
  //   - 'name' is the ALIAS (the external name)
  //   - personName is the INTERNAL property name
  //
  // This is optional. Most of the time, you use the same name for both.
}


// ============================================
// SECTION 5: Key Takeaways for Interviews
// ============================================

// 1. @Input() lets a parent component pass data DOWN to a child component.
//    - Used with property binding: [inputName]="value"
//    - Like function parameters — the parent provides the value.
//
// 2. @Output() lets a child component send events UP to a parent component.
//    - Used with event binding: (outputName)="parentMethod($event)"
//    - Uses EventEmitter to create custom events.
//    - .emit() triggers the event and optionally sends data.
//
// 3. Data flows DOWN, events flow UP.
//    - Parent -> Child: @Input (data)
//    - Child -> Parent: @Output (events)
//
// 4. $event in the parent's template contains the data sent by .emit()
//
// 5. EventEmitter<Type> specifies what type of data the event carries.
//
// INTERVIEW QUESTION: "How do components communicate in Angular?"
// ANSWER: "Components communicate in two main ways:
//   1. Parent to child: Using @Input() to pass data down.
//      The parent uses property binding in its template to set the child's input.
//   2. Child to parent: Using @Output() with EventEmitter to send events up.
//      The child emits an event, and the parent listens for it using event binding.
//   For components that are not directly related (like siblings), you would
//   typically use a shared service to communicate."
