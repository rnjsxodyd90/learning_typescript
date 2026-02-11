// ================================================================
// DAY 3 - FILE 6: COMPONENT LIFECYCLE HOOKS
// ================================================================
//
// THIS FILE IS FOR READING AND LEARNING ONLY.
// You do NOT run this file. Read the comments, understand the code.
//
// Prerequisites: Read files 02, 03, and 04 first.
//
// ================================================================


// ============================================
// SECTION 1: What Are Lifecycle Hooks?
// ============================================
//
// Every Angular component has a LIFECYCLE — it is born, it lives, and it dies.
//
// Just like a person has milestones (birth, first day of school, graduation, etc.),
// a component has milestones too. Angular gives you HOOK methods that run
// automatically at each milestone.
//
// You write code in these hooks to do things at the RIGHT TIME.
//
// THE LIFECYCLE (in order):
//
//   1. constructor()     -> The class is created (but NOT ready to use yet)
//   2. ngOnChanges()     -> Input properties changed (for components with @Input)
//   3. ngOnInit()        -> Component is initialized and READY (most important!)
//   4. ngDoCheck()       -> Angular checks for changes
//   5. ngAfterContentInit()   -> Content projected into component is ready
//   6. ngAfterContentChecked() -> Content checked for changes
//   7. ngAfterViewInit()      -> Component's view (template) is ready
//   8. ngAfterViewChecked()   -> View checked for changes
//   9. ngOnDestroy()     -> Component is about to be REMOVED (cleanup time)
//
// DON'T PANIC! You do NOT need to memorize all of these.
// For a junior interview, know these THREE:
//
//   ngOnInit      -> When the component STARTS (most commonly used)
//   ngOnDestroy   -> When the component is REMOVED (cleanup)
//   ngOnChanges   -> When @Input values change
//
// That's it. The others are for advanced use cases.
//

import { Component, Input, OnInit, OnDestroy, OnChanges, SimpleChanges } from '@angular/core';

// Notice we import OnInit, OnDestroy, OnChanges — these are INTERFACES.
// An interface is like a contract: "I promise to have this method."
// When you write "implements OnInit", you are promising to write an ngOnInit() method.


// ============================================
// SECTION 2: ngOnInit — The Most Important Hook
// ============================================
//
// ngOnInit runs ONCE when the component is initialized and ready to use.
//
// This is where you do setup work:
//   - Fetch data from a server
//   - Set up initial values
//   - Start timers or subscriptions
//
// Think of it like the "start" button — the component is ready, now DO things.

@Component({
  selector: 'app-user-dashboard',
  template: `
    <h2>User Dashboard</h2>

    <div *ngIf="isLoading">
      <p>Loading your data...</p>
    </div>

    <div *ngIf="!isLoading">
      <p>Welcome, {{ userData.name }}!</p>
      <p>Email: {{ userData.email }}</p>
      <p>Member since: {{ userData.memberSince }}</p>

      <h3>Recent Orders:</h3>
      <ul>
        <li *ngFor="let order of recentOrders">
          {{ order.item }} - \${{ order.price }}
        </li>
      </ul>
    </div>
  `
})
export class UserDashboardComponent implements OnInit {
  //                                     ^^^^^^^^^^^^^^^^
  //   "implements OnInit" means this class PROMISES to have an ngOnInit() method.
  //   If you forget to write ngOnInit(), TypeScript will warn you.

  isLoading: boolean = true;

  userData: any = {};
  // "any" means this can hold any type of data.
  // In a real app, you would define a proper type/interface.

  recentOrders: any[] = [];

  // ---- THE CONSTRUCTOR ----
  // The constructor runs when the class is CREATED.
  // At this point, @Input values are NOT available yet.
  // The template is NOT rendered yet.
  // Use the constructor ONLY for simple setup like dependency injection.

  constructor() {
    console.log('Constructor called - component class created');
    // Do NOT fetch data here!
    // Do NOT access @Input values here!
  }

  // ---- ngOnInit ----
  // This runs AFTER the constructor, AFTER @Input values are set.
  // The component is fully initialized and ready.
  // THIS is where you fetch data and do setup work.

  ngOnInit(): void {
    console.log('ngOnInit called - component is ready!');

    // Simulate fetching data from a server
    this.loadUserData();
    this.loadRecentOrders();
  }

  loadUserData(): void {
    // In a real app, this would call an HTTP service:
    //   this.userService.getUser().subscribe(data => { ... });
    //
    // For this example, we simulate a server delay:
    setTimeout(() => {
      this.userData = {
        name: 'Sura Steel',
        email: 'sura@example.com',
        memberSince: 'January 2024'
      };
    }, 1000);  // 1 second delay
  }

  loadRecentOrders(): void {
    setTimeout(() => {
      this.recentOrders = [
        { item: 'Laptop',     price: 999.99 },
        { item: 'Headphones', price: 79.99 },
        { item: 'Mouse',      price: 29.99 }
      ];
      this.isLoading = false;  // Stop showing "Loading..."
    }, 1500);  // 1.5 second delay
  }
}


// ============================================
// SECTION 3: Why ngOnInit Instead of the Constructor?
// ============================================
//
// This is a VERY COMMON interview question!
//
// CONSTRUCTOR:
//   - Runs when the class instance is created
//   - @Input() values are NOT available yet
//   - The template is NOT rendered yet
//   - Use it ONLY for dependency injection (getting services)
//   - Keep it simple — no heavy logic
//
// ngOnInit:
//   - Runs after the constructor
//   - @Input() values ARE available
//   - The component is fully initialized
//   - Use it for setup logic, data fetching, initialization
//
// EXAMPLE showing the difference:

@Component({
  selector: 'app-demo-init',
  template: `<p>Product: {{ productName }}</p>`
})
export class DemoInitComponent implements OnInit {

  @Input() productName: string = '';

  constructor() {
    // At this point, productName is still '' (empty string, the default)
    // Even if the parent passed a value, it is NOT available yet.
    console.log('Constructor - productName:', this.productName);
    // Output: "Constructor - productName: "
  }

  ngOnInit(): void {
    // NOW productName has the value passed by the parent!
    console.log('ngOnInit - productName:', this.productName);
    // Output: "ngOnInit - productName: Laptop"  (or whatever the parent passed)

    // So if you need to DO something based on the input value,
    // you MUST do it here, not in the constructor.
  }
}

// INTERVIEW ANSWER:
// "The constructor is for dependency injection and very basic setup.
//  ngOnInit is for initialization logic because @Input values are available
//  and the component is fully ready. You should fetch data and set up
//  the component in ngOnInit, not in the constructor."


// ============================================
// SECTION 4: ngOnDestroy — Cleanup When Component is Removed
// ============================================
//
// ngOnDestroy runs ONCE, right BEFORE the component is removed from the page.
//
// Why do you need this? To CLEAN UP:
//   - Stop timers (setInterval)
//   - Unsubscribe from data streams (Observables)
//   - Remove event listeners
//
// If you don't clean up, these things keep running even after the component
// is gone. This causes MEMORY LEAKS — your app uses more and more memory
// and eventually slows down or crashes.
//
// Think of it like leaving the lights on when you leave a room.
// ngOnDestroy is you turning off the lights before leaving.

@Component({
  selector: 'app-live-clock',
  template: `
    <h2>Live Clock</h2>
    <p>{{ currentTime }}</p>
  `
})
export class LiveClockComponent implements OnInit, OnDestroy {
  //                                              ^^^^^^^^^^^
  //   We implement BOTH OnInit and OnDestroy.
  //   A component can implement multiple lifecycle interfaces.

  currentTime: string = '';
  private timerInterval: any;
  // "private" means only THIS class can access this property.
  // Other components and templates cannot see it.

  ngOnInit(): void {
    // Start a timer that updates every second
    this.updateTime();  // Update immediately
    this.timerInterval = setInterval(() => {
      this.updateTime();
    }, 1000);  // 1000ms = 1 second

    // setInterval runs a function repeatedly at the given interval.
    // We save the reference in this.timerInterval so we can STOP it later.
    console.log('Clock started!');
  }

  ngOnDestroy(): void {
    // STOP the timer when the component is removed
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      // clearInterval stops the repeating timer we started in ngOnInit
    }
    console.log('Clock stopped! Component destroyed. Timer cleaned up.');

    // If we did NOT do this, the timer would keep running forever
    // even after the component is gone from the page.
    // This is a MEMORY LEAK — wasting computer resources.
  }

  private updateTime(): void {
    this.currentTime = new Date().toLocaleTimeString();
    // new Date() creates the current date/time
    // .toLocaleTimeString() formats it as "3:45:30 PM"
  }
}


// ============================================
// SECTION 5: ngOnChanges — When Input Values Change
// ============================================
//
// ngOnChanges runs whenever an @Input() property receives a NEW value
// from the parent component.
//
// It runs:
//   - BEFORE ngOnInit (with the initial values)
//   - Every time the parent changes an @Input value
//
// It receives a "SimpleChanges" object that contains:
//   - The PREVIOUS value (what it was before)
//   - The CURRENT value (what it is now)
//   - Whether this is the FIRST change

@Component({
  selector: 'app-price-display',
  template: `
    <div class="price-box">
      <h3>{{ productName }}</h3>
      <p class="price">\${{ price }}</p>
      <p *ngIf="priceChange !== ''" [class]="priceChangeClass">
        {{ priceChange }}
      </p>
    </div>
  `,
  styles: [`
    .price-box { border: 1px solid #ccc; padding: 16px; margin: 8px; }
    .price { font-size: 24px; font-weight: bold; }
    .price-up { color: red; }
    .price-down { color: green; }
  `]
})
export class PriceDisplayComponent implements OnChanges {

  @Input() productName: string = '';
  @Input() price: number = 0;

  priceChange: string = '';
  priceChangeClass: string = '';

  ngOnChanges(changes: SimpleChanges): void {
    // "changes" is an object. Each key is the name of an @Input that changed.
    // changes['price'] gives us info about the price change.

    console.log('ngOnChanges called! Changes:', changes);

    // Check if the price changed (and it is not the first time)
    if (changes['price'] && !changes['price'].firstChange) {
      const previousPrice = changes['price'].previousValue;
      const currentPrice = changes['price'].currentValue;

      if (currentPrice > previousPrice) {
        this.priceChange = `Price went UP from $${previousPrice} to $${currentPrice}`;
        this.priceChangeClass = 'price-up';
      } else if (currentPrice < previousPrice) {
        this.priceChange = `Price went DOWN from $${previousPrice} to $${currentPrice}`;
        this.priceChangeClass = 'price-down';
      }
    }

    //
    // The SimpleChanges object looks like this:
    //
    // {
    //   price: {
    //     previousValue: 99.99,       <-- what it was before
    //     currentValue: 79.99,        <-- what it is now
    //     firstChange: false          <-- is this the very first time?
    //   },
    //   productName: {
    //     previousValue: 'Old Name',
    //     currentValue: 'New Name',
    //     firstChange: false
    //   }
    // }
    //
  }
}

// How the parent might use this:
//
//   <app-price-display
//     [productName]="'Laptop'"
//     [price]="currentLaptopPrice"
//   ></app-price-display>
//   <button (click)="currentLaptopPrice = currentLaptopPrice + 50">
//     Increase Price
//   </button>
//
// Every time the button is clicked, the price increases by 50,
// and ngOnChanges fires in the PriceDisplayComponent, showing
// "Price went UP from $999 to $1049"


// ============================================
// SECTION 6: All Lifecycle Hooks at a Glance
// ============================================

// Here is the COMPLETE lifecycle in the order they are called:
//
// HOOK                      | WHEN IT RUNS                        | HOW OFTEN
// --------------------------|-------------------------------------|------------------
// constructor()             | Class is instantiated               | Once
// ngOnChanges()             | @Input property changes             | Many times
// ngOnInit()                | Component is initialized            | Once
// ngDoCheck()               | Every change detection cycle        | Many times
// ngAfterContentInit()      | After content projection init       | Once
// ngAfterContentChecked()   | After content projection checked    | Many times
// ngAfterViewInit()         | After component view is ready       | Once
// ngAfterViewChecked()      | After view is checked               | Many times
// ngOnDestroy()             | Before component is destroyed       | Once
//
// FOR A JUNIOR INTERVIEW, you need to know:
//   - ngOnInit      -> setup, fetch data (runs ONCE)
//   - ngOnDestroy   -> cleanup, stop timers, unsubscribe (runs ONCE)
//   - ngOnChanges   -> react to @Input changes (runs MANY times)
//   - constructor   -> dependency injection only (runs ONCE, before everything)
//
// The others (ngDoCheck, ngAfterContentInit, etc.) are for advanced use cases.
// If asked about them, just say "I know they exist for advanced scenarios
// like working with projected content or manual change detection."


// ============================================
// SECTION 7: Complete Example — Combining Hooks
// ============================================

@Component({
  selector: 'app-notification-banner',
  template: `
    <div *ngIf="isVisible" class="banner" [style.background]="backgroundColor">
      <p>{{ message }}</p>
      <small>Showing for {{ secondsRemaining }} more seconds</small>
      <button (click)="dismiss()">Dismiss</button>
    </div>
  `,
  styles: [`
    .banner {
      padding: 16px;
      color: white;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-radius: 4px;
      margin: 8px 0;
    }
    button {
      background: white;
      border: none;
      padding: 8px 16px;
      border-radius: 4px;
      cursor: pointer;
    }
  `]
})
export class NotificationBannerComponent implements OnInit, OnDestroy, OnChanges {

  @Input() message: string = '';
  @Input() type: 'success' | 'error' | 'info' = 'info';
  // The type can ONLY be one of these three strings.
  // This is called a "union type" in TypeScript.

  @Input() autoDismissSeconds: number = 10;
  // The banner will automatically disappear after this many seconds.

  isVisible: boolean = true;
  backgroundColor: string = '#007bff';
  secondsRemaining: number = 0;

  private countdownTimer: any;

  // ---- ngOnChanges ----
  // Runs when @Input values change. We use it to update the background color.
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['type']) {
      switch (this.type) {
        case 'success':
          this.backgroundColor = '#28a745';  // Green
          break;
        case 'error':
          this.backgroundColor = '#dc3545';  // Red
          break;
        case 'info':
          this.backgroundColor = '#007bff';  // Blue
          break;
      }
    }

    // If the message changes, restart the countdown
    if (changes['message'] && !changes['message'].firstChange) {
      this.isVisible = true;
      this.startCountdown();
    }
  }

  // ---- ngOnInit ----
  // Component is ready. Start the auto-dismiss countdown.
  ngOnInit(): void {
    console.log('Notification banner initialized with message:', this.message);
    this.startCountdown();
  }

  // ---- ngOnDestroy ----
  // Component is being removed. Clean up the timer.
  ngOnDestroy(): void {
    console.log('Notification banner destroyed. Cleaning up timer.');
    this.stopCountdown();
  }

  // ---- Helper Methods ----

  private startCountdown(): void {
    this.stopCountdown();  // Stop any existing countdown first
    this.secondsRemaining = this.autoDismissSeconds;

    this.countdownTimer = setInterval(() => {
      this.secondsRemaining--;
      if (this.secondsRemaining <= 0) {
        this.dismiss();
      }
    }, 1000);
  }

  private stopCountdown(): void {
    if (this.countdownTimer) {
      clearInterval(this.countdownTimer);
    }
  }

  dismiss(): void {
    this.isVisible = false;
    this.stopCountdown();
  }
}


// ============================================
// SECTION 8: Key Takeaways for Interviews
// ============================================

// 1. Lifecycle hooks are methods that Angular calls automatically at specific
//    points in a component's life.
//
// 2. ngOnInit is the most important — use it for initialization and data fetching.
//    It runs ONCE after the component is fully initialized.
//
// 3. ngOnDestroy is for cleanup — stop timers, unsubscribe from observables.
//    It runs ONCE right before the component is removed from the DOM.
//
// 4. ngOnChanges runs every time an @Input() value changes. It receives a
//    SimpleChanges object with previous and current values.
//
// 5. Use the CONSTRUCTOR only for dependency injection. Use ngOnInit for
//    everything else.
//
// 6. To use a lifecycle hook:
//    - Import the interface: import { OnInit } from '@angular/core';
//    - Implement it: export class MyComponent implements OnInit { }
//    - Write the method: ngOnInit(): void { ... }
//
// INTERVIEW QUESTION: "What are lifecycle hooks in Angular?"
// ANSWER: "Lifecycle hooks are methods that Angular calls at specific stages
//   of a component's life. The most important ones are ngOnInit, which runs
//   once when the component is initialized and is used for setup tasks like
//   fetching data; ngOnDestroy, which runs when the component is about to be
//   removed and is used for cleanup like stopping timers and unsubscribing
//   from observables; and ngOnChanges, which runs whenever an Input property
//   changes and lets you react to those changes."
//
// INTERVIEW QUESTION: "Why use ngOnInit instead of the constructor?"
// ANSWER: "The constructor runs when the class is instantiated, but at that
//   point Input values from the parent are not yet available and the component
//   is not fully initialized. ngOnInit runs after the constructor and after
//   Angular has set the Input properties, so it is the right place to do
//   setup work like fetching data or initializing values based on Inputs.
//   The constructor should only be used for dependency injection."
