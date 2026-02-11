// ============================================================================
//
//   02 - DEPENDENCY INJECTION (DI)
//
//   THIS IS THE #1 MOST ASKED ANGULAR INTERVIEW QUESTION.
//   If you learn ONE thing from today, let it be this.
//
//   This is a TEACHING FILE. Read it top to bottom.
//
// ============================================================================


// ============================================================================
//  SECTION 1: WHAT IS DEPENDENCY INJECTION?
// ============================================================================

// Let's start with the two words separately:
//
// DEPENDENCY:
//   Something a class NEEDS to do its job.
//   If ProductListComponent needs ProductService to get products,
//   then ProductService is a DEPENDENCY of ProductListComponent.
//
// INJECTION:
//   The act of PROVIDING that dependency from the outside,
//   rather than the class creating it itself.
//
// DEPENDENCY INJECTION:
//   A design pattern where a class RECEIVES its dependencies
//   from an external source, rather than creating them itself.
//
// That is the textbook definition. Now let's make it actually make sense.


// ============================================================================
//  SECTION 2: THE RESTAURANT ANALOGY
// ============================================================================

// Imagine a restaurant.
//
// APPROACH 1 — NO Dependency Injection (BAD):
//
//   The restaurant grows its own tomatoes.
//   The restaurant raises its own chickens.
//   The restaurant mills its own flour.
//   The restaurant makes its own plates.
//   The restaurant generates its own electricity.
//
//   If the tomato crop fails, the ENTIRE restaurant is affected.
//   If they want different tomatoes, they have to replant everything.
//   The restaurant is doing too many things. It is tightly coupled
//   to everything it depends on.
//
//
// APPROACH 2 — WITH Dependency Injection (GOOD):
//
//   The restaurant says: "I NEED tomatoes." A supplier provides them.
//   The restaurant says: "I NEED chicken." A different supplier provides it.
//   The restaurant says: "I NEED electricity." The power company provides it.
//
//   The restaurant does not care WHERE the tomatoes come from.
//   It just declares: "I need tomatoes" and they show up.
//
//   Want to switch from regular tomatoes to organic? Just change
//   the supplier. The restaurant code does not change at all.
//
//
// In Angular:
//
//   The COMPONENT is the restaurant.
//   The SERVICE is the supplier.
//   ANGULAR ITSELF is the delivery system that connects them.
//
//   The component says: "I need a ProductService."
//   Angular says: "Here is one." And hands it over.
//
//   The component never creates the service itself.
//   It just declares what it needs, and Angular provides it.


// ============================================================================
//  SECTION 3: WITHOUT DI vs. WITH DI (CODE COMPARISON)
// ============================================================================

import { Injectable, Component, OnInit } from '@angular/core';

// --- The Service ---

@Injectable({
  providedIn: 'root'
})
class ProductService {
  getProducts(): string[] {
    return ['Laptop', 'Mouse', 'Keyboard'];
  }
}


// === WITHOUT Dependency Injection (THE WRONG WAY) ===

class BadProductComponent {

  productService: ProductService;

  constructor() {
    // The component CREATES the service itself.
    // This is like the restaurant growing its own food.
    this.productService = new ProductService();
  }
  // Problems with this approach:
  //
  // 1. TIGHT COUPLING: This component is permanently tied to
  //    ProductService. You cannot swap it for a different service.
  //
  // 2. HARD TO TEST: In tests, you cannot replace ProductService
  //    with a fake version. You are stuck with the real one.
  //
  // 3. MULTIPLE INSTANCES: If 10 components each do "new ProductService()",
  //    you get 10 separate copies. They do not share data.
  //
  // 4. HIDDEN DEPENDENCIES: Looking at this class, you have to read
  //    through the code to find out what it depends on.
}


// === WITH Dependency Injection (THE RIGHT WAY) ===

@Component({
  selector: 'app-good-product',
  template: `<p>Products loaded!</p>`
})
class GoodProductComponent {

  constructor(private productService: ProductService) {
    // The component DECLARES it needs ProductService.
    // Angular PROVIDES it automatically.
    // This is like the restaurant ordering from a supplier.
  }
  // Benefits of this approach:
  //
  // 1. LOOSE COUPLING: The component does not know or care how
  //    ProductService is created. It just uses it.
  //
  // 2. EASY TO TEST: In tests, you can provide a FAKE ProductService
  //    that returns test data. The component does not know the difference.
  //
  // 3. SINGLETON: Angular creates ONE instance and shares it everywhere.
  //    All components using ProductService share the same data.
  //
  // 4. CLEAR DEPENDENCIES: Just look at the constructor to see
  //    everything this component needs.
}


// ============================================================================
//  SECTION 4: HOW ANGULAR DI WORKS — STEP BY STEP
// ============================================================================

// Here is exactly what happens when Angular sees a component that
// needs a service. Follow along step by step:
//
// STEP 1: You create a service with @Injectable({ providedIn: 'root' })
//
//   @Injectable({ providedIn: 'root' })
//   class ProductService { ... }
//
//   Angular now knows: "ProductService exists and is available app-wide."
//
//
// STEP 2: A component declares it needs the service in its constructor.
//
//   constructor(private productService: ProductService) { }
//
//   Angular reads this constructor and sees: "This component needs
//   a ProductService."
//
//
// STEP 3: Angular checks its INJECTOR.
//
//   The injector is like a warehouse. Angular looks in the warehouse
//   and asks: "Do I already have a ProductService?"
//
//   - If YES: Angular gives the EXISTING instance to the component.
//     (This is why it is a singleton — everyone gets the same one.)
//
//   - If NO: Angular CREATES a new ProductService, stores it in
//     the warehouse, and gives it to the component. Next time someone
//     asks, the existing one will be used.
//
//
// STEP 4: The component uses the service.
//
//   this.productService.getProducts();
//
//   The component has no idea how the service was created, where
//   it came from, or who else is using it. It just works.
//
//
// VISUAL SUMMARY:
//
//   @Injectable({ providedIn: 'root' })  -->  Angular REGISTERS the service
//             |
//             v
//   constructor(private svc: MyService)  -->  Component REQUESTS the service
//             |
//             v
//   Angular Injector checks warehouse    -->  Already exists? Reuse it.
//             |                                Does not exist? Create it.
//             v
//   Component receives the service       -->  Component USES the service
//


// ============================================================================
//  SECTION 5: THE CONSTRUCTOR LINE — DECODED
// ============================================================================

// This one line is doing A LOT. Let's break it down:
//
//   constructor(private productService: ProductService) { }
//
// Let's look at each word:
//
// constructor  -->  A special method that runs when the class is created.
//                   Every class can have one. It sets things up.
//
// private      -->  This creates a PROPERTY on the class automatically.
//                   Without "private", you would have to write:
//
//                     productService: ProductService;
//                     constructor(productService: ProductService) {
//                       this.productService = productService;
//                     }
//
//                   With "private" in the constructor, TypeScript does
//                   all three of those lines in ONE line. It is a shortcut.
//
// productService -> The NAME of the property. You choose this name.
//                   You will use this.productService throughout the class.
//
// : ProductService -> The TYPE. This tells Angular WHICH service to inject.
//                     Angular looks at this type and says: "I need to
//                     provide a ProductService."
//
// So this one line:
//   1. Tells Angular to inject a ProductService
//   2. Creates a private property called productService
//   3. Assigns the injected service to that property
//   4. Makes it available as this.productService throughout the class


// ============================================================================
//  SECTION 6: MULTIPLE DEPENDENCIES
// ============================================================================

// A component can have MULTIPLE dependencies. Just add more parameters
// to the constructor.

@Injectable({ providedIn: 'root' })
class CartService {
  getCartItems(): string[] { return ['Item 1', 'Item 2']; }
  getCartCount(): number { return 2; }
}

@Injectable({ providedIn: 'root' })
class LoggingService {
  log(message: string): void {
    console.log(`[LOG] ${message}`);
  }
}

@Component({
  selector: 'app-checkout',
  template: `<p>Checkout page</p>`
})
class CheckoutComponent implements OnInit {

  // THREE dependencies injected at once:
  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private loggingService: LoggingService
  ) {
    // Angular provides ALL THREE automatically.
    // Each one is a separate service with a separate job.
  }

  ngOnInit(): void {
    const products = this.productService.getProducts();
    const cartItems = this.cartService.getCartItems();
    this.loggingService.log('Checkout page loaded');
    // Each service does its own thing. The component just coordinates.
  }
}


// ============================================================================
//  SECTION 7: SERVICES INJECTING OTHER SERVICES
// ============================================================================

// Services can also depend on OTHER services.
// This works the same way — constructor injection.

@Injectable({ providedIn: 'root' })
class NotificationService {
  sendNotification(message: string): void {
    console.log(`NOTIFICATION: ${message}`);
  }
}

@Injectable({ providedIn: 'root' })
class OrderService {

  // This SERVICE depends on two OTHER services.
  // Same pattern: put them in the constructor.
  constructor(
    private cartService: CartService,
    private notificationService: NotificationService
  ) { }

  placeOrder(): void {
    const items = this.cartService.getCartItems();
    // ... process the order ...
    this.notificationService.sendNotification('Order placed!');
    // OrderService does not need to know HOW notifications work.
    // It just asks NotificationService to handle it.
  }
}


// ============================================================================
//  SECTION 8: WHY DI MATTERS — TESTABILITY
// ============================================================================

// One of the biggest reasons for DI is TESTING.
//
// Without DI:
//   Your component creates its own ProductService.
//   ProductService calls a REAL server.
//   Your tests need a running server. SLOW. FRAGILE. BAD.
//
// With DI:
//   In tests, you can REPLACE ProductService with a FAKE one.
//   The fake returns test data instantly. No server needed.
//   Your tests are FAST, RELIABLE, and INDEPENDENT.
//
// Example of a fake service for testing:

class FakeProductService {
  getProducts(): string[] {
    return ['Test Product 1', 'Test Product 2'];
  }
}

// In a test, you tell Angular:
//   "When someone asks for ProductService, give them FakeProductService instead."
//
// The component does not know the difference. It just calls getProducts()
// and gets data back. This is the POWER of DI.
//
// You do NOT need to know how to write tests for a junior interview.
// But you DO need to know that DI makes testing easier. Interviewers
// love hearing: "DI improves testability."


// ============================================================================
//  SECTION 9: THE INJECTOR HIERARCHY (ADVANCED — READ BUT DON'T STRESS)
// ============================================================================

// Angular has a TREE of injectors, not just one.
//
// Root Injector (providedIn: 'root')
//   |
//   +-- Module Injectors (if you provide in a specific module)
//   |     |
//   |     +-- Component Injectors (if you provide in a component)
//
// For now, ALL you need to know is:
//
//   providedIn: 'root'  =  available everywhere, one instance for the whole app
//
// This is what you will use in almost every real project.
// If an interviewer asks about the injector hierarchy, just say:
//
//   "Angular has a hierarchical injection system. The root injector provides
//    app-wide singletons. Module and component injectors can create
//    more specific scopes if needed."
//
// That is enough for a junior interview. Move on. Do not get lost here.


// ============================================================================
//  SECTION 10: KEY TAKEAWAYS
// ============================================================================

// 1. DEPENDENCY INJECTION is a pattern where a class RECEIVES its
//    dependencies from the outside instead of creating them itself.
//
// 2. In Angular, DI works through the CONSTRUCTOR:
//      constructor(private myService: MyService) { }
//
// 3. Angular maintains an INJECTOR (warehouse) that stores service instances.
//
// 4. Benefits of DI:
//    - Loose coupling (classes do not create their own dependencies)
//    - Testability (you can swap real services with fakes in tests)
//    - Singleton pattern (one instance shared across the app)
//    - Clear dependencies (just look at the constructor)
//
// 5. The @Injectable({ providedIn: 'root' }) decorator registers a
//    service with the root injector, making it available everywhere.
//
// ============================================================================
//  INTERVIEW ANSWER — MEMORIZE THIS
// ============================================================================
//
// Q: "What is Dependency Injection in Angular?"
//
// A: "Dependency Injection is a design pattern where a class receives
//     its dependencies from an external source rather than creating them
//     itself. In Angular, when a component needs a service, it declares
//     the dependency in its constructor, and Angular's injector
//     automatically provides an instance. This promotes loose coupling,
//     makes code easier to test by allowing you to swap real services
//     with mocks, and ensures services are singletons by default when
//     provided in root."
//
// PRACTICE SAYING THIS OUT LOUD. MULTIPLE TIMES.
//
// ============================================================================

// Next file: 03-http-client.ts
// We will learn how services talk to servers to get real data.
