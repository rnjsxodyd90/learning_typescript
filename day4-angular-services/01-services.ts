// ============================================================================
//
//   01 - ANGULAR SERVICES
//
//   This is a TEACHING FILE. Read it top to bottom.
//   It is not meant to be run directly. It is meant to teach you.
//
// ============================================================================


// ============================================================================
//  SECTION 1: WHAT IS A SERVICE?
// ============================================================================

// Think about a restaurant.
//
// The WAITER (component) takes your order and brings your food.
// The KITCHEN (service) actually prepares the food.
//
// The waiter does NOT cook. The kitchen does NOT serve tables.
// Each one has a specific job.
//
// In Angular:
//   - COMPONENTS are the waiters. They handle the UI (what the user sees).
//   - SERVICES are the kitchen. They handle the logic and data.
//
// A service is just a regular TypeScript class with a special decorator
// that tells Angular: "Hey, this class can be shared with other parts
// of the application."
//
// That is it. A service is a class that does work behind the scenes.


// ============================================================================
//  SECTION 2: WHY USE SERVICES? (SEPARATION OF CONCERNS)
// ============================================================================

// "Separation of concerns" means: each piece of code should do ONE thing.
//
// BAD APPROACH (everything in the component):
//
//   Imagine a component that:
//     - Displays a list of products         (UI job - OK)
//     - Fetches products from a server      (data job - NOT OK here)
//     - Validates product data              (logic job - NOT OK here)
//     - Calculates discounts                (logic job - NOT OK here)
//     - Logs errors                         (utility job - NOT OK here)
//
//   This component is doing too many things. It is hard to read,
//   hard to test, and hard to change.
//
// GOOD APPROACH (using services):
//
//   ProductListComponent:
//     - Displays a list of products         (UI job - its ONLY job)
//
//   ProductService:
//     - Fetches products from a server      (data management)
//     - Adds, updates, deletes products     (data management)
//
//   DiscountService:
//     - Calculates discounts                (business logic)
//
//   LoggingService:
//     - Logs errors and events              (utility)
//
// NOW each piece does one thing. If you need to change how discounts
// work, you go to DiscountService. You do not have to dig through
// a giant component file.
//
// INTERVIEW TIP: If asked "Why use services?", say:
//   "Services provide separation of concerns. Business logic and data
//    management go in services, while components focus only on the UI.
//    This makes code reusable, testable, and easier to maintain."


// ============================================================================
//  SECTION 3: THE @Injectable DECORATOR
// ============================================================================

// Remember from earlier days: decorators are special labels that start
// with @ and tell Angular what a class is.
//
//   @Component  --> "This class is a component"
//   @Injectable --> "This class is a service that can be injected"
//
// "Injected" means Angular can automatically provide an instance of this
// class to any component or other service that needs it. We will cover
// this in detail in the next file (02-dependency-injection.ts).

import { Injectable } from '@angular/core';

// The @Injectable decorator. This is what makes a class a service.
@Injectable({
  providedIn: 'root'   // <-- We will explain this next
})
class MyFirstService {
  // This class can now be used as a service anywhere in the app
}


// ============================================================================
//  SECTION 4: providedIn: 'root' EXPLAINED
// ============================================================================

// When you write:
//
//   @Injectable({
//     providedIn: 'root'
//   })
//
// You are telling Angular:
//
//   "Create ONE instance of this service and make it available
//    to the ENTIRE application."
//
// What does "one instance" mean?
//
//   Imagine you have a ProductService. If 5 different components all
//   use ProductService, they ALL share the SAME ProductService object.
//   There is only ONE copy. This is called a SINGLETON.
//
//   Think of it like a school's library. There is ONE library (service).
//   Every student (component) uses the SAME library. There are not
//   separate libraries for each student.
//
// What does 'root' mean?
//
//   'root' means the service is available at the ROOT level of
//   your application. In simple terms: available EVERYWHERE.
//
//   This is what you will use 99% of the time. Do not overthink it.
//
// INTERVIEW TIP: If asked "What does providedIn: 'root' mean?", say:
//   "It registers the service at the root level, creating a singleton
//    instance that is available throughout the entire application."


// ============================================================================
//  SECTION 5: A COMPLETE SERVICE EXAMPLE — ProductService
// ============================================================================

// Let's build a real service step by step.
// This service manages a list of products.

// First, let's define what a Product looks like.
// This is a TypeScript interface — just a description of the shape of data.
interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
}

// Now the actual service:

@Injectable({
  providedIn: 'root'          // Available everywhere in the app
})
class ProductService {

  // ---------------------------------------------------------------
  // PRIVATE DATA
  // ---------------------------------------------------------------
  // This is the data the service manages.
  // "private" means only this service can directly access this array.
  // Components cannot reach in and modify it directly — they have
  // to use the methods below. This is GOOD practice.

  private products: Product[] = [
    { id: 1, name: 'Laptop',     price: 999.99,  description: 'A fast laptop' },
    { id: 2, name: 'Mouse',      price: 29.99,   description: 'Wireless mouse' },
    { id: 3, name: 'Keyboard',   price: 79.99,   description: 'Mechanical keyboard' },
  ];


  // ---------------------------------------------------------------
  // METHOD: getProducts()
  // ---------------------------------------------------------------
  // Returns ALL products.
  // A component calls this to get the list.

  getProducts(): Product[] {
    return this.products;
  }
  // Usage in a component: this.productService.getProducts()


  // ---------------------------------------------------------------
  // METHOD: getProductById(id)
  // ---------------------------------------------------------------
  // Returns ONE product that matches the given ID.
  // The .find() method searches the array and returns the first match.

  getProductById(id: number): Product | undefined {
    return this.products.find(product => product.id === id);
  }
  // Usage: this.productService.getProductById(2)
  // Returns: { id: 2, name: 'Mouse', price: 29.99, description: 'Wireless mouse' }
  //
  // The "| undefined" means: this method might return a Product,
  // OR it might return undefined if no product has that ID.


  // ---------------------------------------------------------------
  // METHOD: addProduct(newProduct)
  // ---------------------------------------------------------------
  // Adds a new product to the list.

  addProduct(newProduct: Product): void {
    this.products.push(newProduct);
  }
  // Usage: this.productService.addProduct({ id: 4, name: 'Monitor', price: 399.99, description: 'Big screen' })
  //
  // "void" means this method does not return anything.
  // It just does its job (adding the product) and finishes.


  // ---------------------------------------------------------------
  // METHOD: deleteProduct(id)
  // ---------------------------------------------------------------
  // Removes a product from the list by its ID.

  deleteProduct(id: number): void {
    this.products = this.products.filter(product => product.id !== id);
  }
  // Usage: this.productService.deleteProduct(2)
  //
  // How .filter() works:
  //   It creates a NEW array that only includes items that pass the test.
  //   The test is: product.id !== id (keep products whose ID is NOT the one we want to delete)
  //   So if we delete id 2, the new array has id 1 and id 3 only.


  // ---------------------------------------------------------------
  // METHOD: updateProduct(updatedProduct)
  // ---------------------------------------------------------------
  // Replaces an existing product with new data.

  updateProduct(updatedProduct: Product): void {
    const index = this.products.findIndex(p => p.id === updatedProduct.id);
    // findIndex returns the position in the array (0, 1, 2, etc.)
    // If the product is not found, it returns -1

    if (index !== -1) {
      this.products[index] = updatedProduct;
    }
  }
  // Usage:
  // this.productService.updateProduct({ id: 2, name: 'Mouse Pro', price: 49.99, description: 'Upgraded wireless mouse' })
}


// ============================================================================
//  SECTION 6: HOW A COMPONENT USES A SERVICE
// ============================================================================

// Here is a component that uses the ProductService.
// This is a PREVIEW. We will explain the "how" in the next file
// (02-dependency-injection.ts). For now, just see the pattern.

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-list',
  template: `
    <h2>Products</h2>
    <ul>
      <li *ngFor="let product of products">
        {{ product.name }} - {{ product.price }}
      </li>
    </ul>
  `
})
class ProductListComponent implements OnInit {

  products: Product[] = [];

  // THIS IS THE KEY LINE.
  // By putting "private productService: ProductService" in the constructor,
  // Angular automatically creates and provides the ProductService.
  // You do NOT write: this.productService = new ProductService();
  // Angular does it FOR you. This is called DEPENDENCY INJECTION.

  constructor(private productService: ProductService) {
    // Angular sees: "This component needs a ProductService"
    // Angular says: "I have one! Here you go."
    // That is dependency injection in a nutshell.
  }

  // ngOnInit runs when the component first loads.
  // This is where we fetch initial data.
  ngOnInit(): void {
    this.products = this.productService.getProducts();
  }

  // We can also call other service methods:
  onDeleteProduct(id: number): void {
    this.productService.deleteProduct(id);
    // Refresh the list after deleting
    this.products = this.productService.getProducts();
  }
}


// ============================================================================
//  SECTION 7: ANOTHER SERVICE EXAMPLE — CartService
// ============================================================================

// Services can use OTHER services. Here is a shopping cart service.

@Injectable({
  providedIn: 'root'
})
class CartService {

  private cartItems: Product[] = [];

  addToCart(product: Product): void {
    this.cartItems.push(product);
  }

  getCartItems(): Product[] {
    return this.cartItems;
  }

  getCartTotal(): number {
    // .reduce() adds up all the prices
    return this.cartItems.reduce((total, item) => total + item.price, 0);
  }

  clearCart(): void {
    this.cartItems = [];
  }

  getCartCount(): number {
    return this.cartItems.length;
  }
}


// ============================================================================
//  SECTION 8: KEY TAKEAWAYS
// ============================================================================

// 1. A SERVICE is a class that handles logic and data, separate from the UI.
//
// 2. Use the @Injectable({ providedIn: 'root' }) decorator to create a service.
//
// 3. Services keep your components CLEAN. Components handle UI.
//    Services handle everything else.
//
// 4. Components get services through CONSTRUCTOR INJECTION:
//      constructor(private myService: MyService) { }
//
// 5. Multiple components can share the SAME service (singleton).
//    This means they all work with the same data.
//
// 6. INTERVIEW ANSWER for "What is a service?":
//    "A service is a class decorated with @Injectable that provides
//     reusable logic, data management, or utility functions. It promotes
//     separation of concerns by keeping business logic out of components.
//     Services are typically singletons when provided in root, meaning
//     all components share the same instance."

// Next file: 02-dependency-injection.ts
// We will go DEEP into how Angular provides services to components.
