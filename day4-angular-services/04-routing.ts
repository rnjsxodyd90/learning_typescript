// ============================================================================
//
//   04 - ANGULAR ROUTING (Navigating Between Pages)
//
//   This is a TEACHING FILE. Read it top to bottom.
//   It is not meant to be run directly. It is meant to teach you.
//
// ============================================================================


// ============================================================================
//  SECTION 1: WHAT IS ROUTING?
// ============================================================================

// When you use a traditional website, every time you click a link,
// the ENTIRE page reloads. The browser goes to the server, gets a
// completely new page, and displays it. This is slow.
//
// Angular is a SINGLE PAGE APPLICATION (SPA).
// That means there is only ONE HTML page. When you "navigate" to
// a different page, Angular does not reload the browser. Instead,
// it SWAPS OUT the content on the screen.
//
// Think of it like a TV:
//   - The TV (browser) stays on the whole time.
//   - When you change the channel (navigate), the CONTENT changes.
//   - But the TV itself does not turn off and on again.
//
// ROUTING is the system that controls which "channel" (component)
// is displayed based on the URL.
//
// When the URL is /home       --> Show the HomeComponent
// When the URL is /products   --> Show the ProductListComponent
// When the URL is /about      --> Show the AboutComponent
//
// That mapping of URL to component is called a ROUTE.


// ============================================================================
//  SECTION 2: SETTING UP ROUTES
// ============================================================================

import { NgModule, Component, OnInit } from '@angular/core';
import { RouterModule, Routes, ActivatedRoute, Router } from '@angular/router';

// First, let's create some simple components that represent pages.
// In a real app, each of these would be in its own file.

@Component({
  selector: 'app-home',
  template: `
    <h1>Welcome Home!</h1>
    <p>This is the home page of our store.</p>
  `
})
class HomeComponent { }

@Component({
  selector: 'app-product-list',
  template: `
    <h1>Our Products</h1>
    <ul>
      <li>Laptop - $999</li>
      <li>Mouse - $29</li>
      <li>Keyboard - $79</li>
    </ul>
  `
})
class ProductListComponent { }

@Component({
  selector: 'app-about',
  template: `
    <h1>About Us</h1>
    <p>We sell the best tech products.</p>
  `
})
class AboutComponent { }


// Now, define the ROUTES.
// A route is an object with two properties:
//   path: the URL path (what shows in the address bar)
//   component: which component to display for that path

const routes: Routes = [
  { path: '',           component: HomeComponent },         // localhost:4200/
  { path: 'products',   component: ProductListComponent },  // localhost:4200/products
  { path: 'about',      component: AboutComponent },        // localhost:4200/about
];

// IMPORTANT DETAILS:
//
// - The path does NOT start with a slash. Write 'products', NOT '/products'.
//
// - The empty string '' means the ROOT path — the homepage.
//   When someone visits localhost:4200/ with no path, HomeComponent loads.
//
// - The ORDER of routes matters. Angular checks them top to bottom
//   and uses the FIRST match it finds.


// ============================================================================
//  SECTION 3: RouterModule.forRoot()
// ============================================================================

// After defining routes, you need to tell Angular about them.
// You do this in your app module using RouterModule.forRoot():

@NgModule({
  imports: [
    RouterModule.forRoot(routes)    // <-- Register the routes
  ],
  exports: [RouterModule]           // <-- Make router features available
})
class AppRoutingModule { }

// What is happening here:
//
// RouterModule.forRoot(routes):
//   "Hey Angular, here are my routes. Set up the routing system
//    at the ROOT (top level) of the application."
//
// .forRoot() is used ONCE, in the main routing module.
// If you have sub-modules with their own routes, they use .forChild().
// But for now, just know .forRoot() — that is what you will see most.
//
// In a real project, this module is usually in a file called
// app-routing.module.ts, and then imported into app.module.ts:
//
// @NgModule({
//   imports: [
//     BrowserModule,
//     HttpClientModule,
//     AppRoutingModule,     // <-- Import routing here
//   ],
//   // ...
// })
// class AppModule { }


// ============================================================================
//  SECTION 4: router-outlet — WHERE THE CONTENT APPEARS
// ============================================================================

// You have defined routes, but Angular needs to know WHERE on the page
// to display the routed component. That is what <router-outlet> does.
//
// Think of <router-outlet> as an EMPTY PICTURE FRAME on a wall.
// When you navigate to different routes, Angular puts different
// "pictures" (components) into that frame.

@Component({
  selector: 'app-root',
  template: `
    <!-- This navigation bar ALWAYS shows -->
    <nav>
      <a routerLink="/">Home</a>
      <a routerLink="/products">Products</a>
      <a routerLink="/about">About</a>
    </nav>

    <!-- This is the "picture frame" where routed components appear -->
    <router-outlet></router-outlet>

    <!-- This footer ALWAYS shows -->
    <footer>
      <p>Copyright 2024 My Store</p>
    </footer>
  `
})
class AppComponent { }

// What happens:
//
// When URL is /            -->  <router-outlet> shows HomeComponent
// When URL is /products    -->  <router-outlet> shows ProductListComponent
// When URL is /about       -->  <router-outlet> shows AboutComponent
//
// The <nav> and <footer> NEVER change. Only the content inside
// <router-outlet> changes. That is how SPAs work — the shell stays,
// only the inner content swaps.
//
// VISUAL:
//
//   +--------------------------------------------------+
//   |  [Home]  [Products]  [About]          (nav bar)  |
//   +--------------------------------------------------+
//   |                                                  |
//   |    <router-outlet> shows content here            |
//   |                                                  |
//   |    (HomeComponent OR ProductListComponent        |
//   |     OR AboutComponent, depending on the URL)     |
//   |                                                  |
//   +--------------------------------------------------+
//   |  Copyright 2024 My Store              (footer)   |
//   +--------------------------------------------------+
//
// INTERVIEW TIP: If asked "What is router-outlet?", say:
//   "router-outlet is a directive that acts as a placeholder.
//    Angular dynamically inserts the component that matches
//    the current route into the router-outlet location."


// ============================================================================
//  SECTION 5: routerLink — Navigation Links
// ============================================================================

// In normal HTML, you use <a href="/products"> for links.
// In Angular, you use <a routerLink="/products"> instead.
//
// WHY? Because href causes a FULL page reload (the old way).
// routerLink navigates WITHOUT reloading (the SPA way).
//
// COMPARISON:
//
//   <a href="/products">Products</a>
//   // Browser reloads the entire page. SLOW. Not SPA behavior.
//
//   <a routerLink="/products">Products</a>
//   // Angular handles navigation. No reload. FAST.
//
// routerLink is a DIRECTIVE (an attribute you add to HTML elements).

// You can also add routerLinkActive to highlight the current page:

@Component({
  selector: 'app-nav-example',
  template: `
    <nav>
      <!-- routerLinkActive adds a CSS class when the link is active -->
      <a routerLink="/"
         routerLinkActive="active-link"
         [routerLinkActiveOptions]="{ exact: true }">
        Home
      </a>

      <a routerLink="/products"
         routerLinkActive="active-link">
        Products
      </a>

      <a routerLink="/about"
         routerLinkActive="active-link">
        About
      </a>
    </nav>
  `,
  styles: [`
    .active-link {
      font-weight: bold;
      color: blue;
      border-bottom: 2px solid blue;
    }
  `]
})
class NavExampleComponent { }

// routerLinkActive="active-link":
//   When this link matches the current URL, Angular adds the CSS class
//   "active-link" to the element. You can style it to look highlighted.
//
// [routerLinkActiveOptions]="{ exact: true }":
//   For the Home link ("/"), we need "exact: true" because "/"
//   technically matches every URL (since every URL starts with /).
//   exact: true means: only highlight if the URL is EXACTLY "/".


// ============================================================================
//  SECTION 6: ROUTE PARAMETERS — Dynamic URLs
// ============================================================================

// Often you need URLs like:
//   /products/1    (show product with ID 1)
//   /products/2    (show product with ID 2)
//   /products/42   (show product with ID 42)
//
// You do NOT create a separate route for each product.
// Instead, you use a ROUTE PARAMETER:

const routesWithParams: Routes = [
  { path: '',              component: HomeComponent },
  { path: 'products',      component: ProductListComponent },
  { path: 'products/:id',  component: ProductDetailComponent },  // <-- :id is a PARAMETER
  { path: 'about',         component: AboutComponent },
];

// :id is a placeholder. It can be ANY value:
//   /products/1     -->  id = '1'
//   /products/42    -->  id = '42'
//   /products/abc   -->  id = 'abc'
//
// The colon (:) tells Angular: "This part of the URL is variable."


// ============================================================================
//  SECTION 7: READING ROUTE PARAMETERS — ActivatedRoute
// ============================================================================

// When a user navigates to /products/5, how does the component
// know that the ID is 5? It uses ActivatedRoute.
//
// ActivatedRoute is a SERVICE (injected just like any other service)
// that gives you information about the current route.

@Component({
  selector: 'app-product-detail',
  template: `
    <h1>Product Detail</h1>
    <p>You are viewing product ID: {{ productId }}</p>
    <div *ngIf="product">
      <h2>{{ product.name }}</h2>
      <p>Price: {{ product.price }}</p>
      <p>{{ product.description }}</p>
    </div>
    <a routerLink="/products">Back to Products</a>
  `
})
class ProductDetailComponent implements OnInit {

  productId: string = '';
  product: any;     // In a real app, this would be typed as Product

  // Inject ActivatedRoute to read the URL parameters
  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    // METHOD 1: Snapshot (simple, works for most cases)
    // Gets the value of 'id' from the current URL, ONE TIME.
    this.productId = this.route.snapshot.params['id'];

    // METHOD 2: Observable (for when the parameter might change
    // while staying on the same component)
    this.route.params.subscribe(params => {
      this.productId = params['id'];
      // You could also call a service here to fetch the product:
      // this.productService.getProductById(+this.productId).subscribe(...)
      // The + converts string to number: +'5' becomes 5
    });
  }
}

// WHEN TO USE EACH METHOD:
//
// Snapshot: When you navigate TO the page. Simple and clean.
//   Use this when: the component is destroyed and recreated for each navigation.
//   Example: Going from /products to /products/5 loads a new component.
//
// Observable: When the parameter changes WITHOUT leaving the component.
//   Use this when: navigating from /products/1 to /products/2 while
//   already ON the product detail page. The component stays alive, only
//   the parameter changes.
//
// FOR INTERVIEWS: Know both exist. Snapshot is fine for most questions.


// ============================================================================
//  SECTION 8: NAVIGATING FROM CODE (Programmatic Navigation)
// ============================================================================

// Sometimes you want to navigate AFTER something happens in code,
// not from a link click. For example: after a form is submitted,
// navigate to a success page.
//
// Use the Router service for this.

@Component({
  selector: 'app-add-product',
  template: `
    <h1>Add Product</h1>
    <button (click)="saveProduct()">Save</button>
  `
})
class AddProductComponent {

  // Inject the Router service
  constructor(private router: Router) { }

  saveProduct(): void {
    // ... save the product ...

    // Then navigate to the products page:
    this.router.navigate(['/products']);
    // This is the same as the user clicking <a routerLink="/products">
    // but done from TypeScript code.
  }

  goToProduct(productId: number): void {
    // Navigate with a parameter:
    this.router.navigate(['/products', productId]);
    // This navigates to: /products/5 (if productId is 5)
  }
}

// this.router.navigate() takes an ARRAY of path segments:
//   ['/products']          -->  /products
//   ['/products', 5]       -->  /products/5
//   ['/products', 5, 'edit'] -->  /products/5/edit


// ============================================================================
//  SECTION 9: WILDCARD ROUTE (404 Page)
// ============================================================================

// What happens if someone types a URL that does not match any route?
// Like /asdfghjkl? You should show a "Page Not Found" page.
//
// Use the WILDCARD route ** to catch all unmatched URLs.

@Component({
  selector: 'app-not-found',
  template: `
    <h1>404 - Page Not Found</h1>
    <p>Sorry, the page you are looking for does not exist.</p>
    <a routerLink="/">Go Home</a>
  `
})
class NotFoundComponent { }

const routesWithWildcard: Routes = [
  { path: '',           component: HomeComponent },
  { path: 'products',   component: ProductListComponent },
  { path: 'about',      component: AboutComponent },
  { path: '**',         component: NotFoundComponent },    // <-- MUST BE LAST
];

// IMPORTANT: The ** route MUST be the LAST route in the array.
// Angular checks routes top to bottom. If ** was first, EVERY
// URL would match it and you would always see the 404 page.


// ============================================================================
//  SECTION 10: REDIRECT ROUTES
// ============================================================================

// Sometimes you want to redirect one URL to another.

const routesWithRedirect: Routes = [
  { path: '',           redirectTo: '/home',   pathMatch: 'full' },
  { path: 'home',       component: HomeComponent },
  { path: 'products',   component: ProductListComponent },
  { path: '**',         component: NotFoundComponent },
];

// When someone visits the root URL (/), they are automatically
// redirected to /home.
//
// pathMatch: 'full' means: only redirect if the ENTIRE path is ''.
// Without 'full', Angular might redirect partial matches too,
// which would break everything.


// ============================================================================
//  SECTION 11: COMPLETE EXAMPLE — Putting It All Together
// ============================================================================

// Here is a complete routing setup for a small store application.
// This is what a real app's routing configuration looks like.

// --- All the routes ---
const storeRoutes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'products',
    component: ProductListComponent
  },
  {
    path: 'products/:id',
    component: ProductDetailComponent
  },
  {
    path: 'about',
    component: AboutComponent
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];

// --- The routing module ---
@NgModule({
  imports: [RouterModule.forRoot(storeRoutes)],
  exports: [RouterModule]
})
class StoreRoutingModule { }

// --- The main app component with navigation ---
@Component({
  selector: 'app-root',
  template: `
    <header>
      <h1>My Store</h1>
      <nav>
        <a routerLink="/" routerLinkActive="active"
           [routerLinkActiveOptions]="{exact: true}">Home</a> |
        <a routerLink="/products" routerLinkActive="active">Products</a> |
        <a routerLink="/about" routerLinkActive="active">About</a>
      </nav>
    </header>

    <main>
      <router-outlet></router-outlet>
    </main>

    <footer>
      <p>My Store - 2024</p>
    </footer>
  `,
  styles: [`
    nav a { margin: 0 10px; text-decoration: none; }
    nav a.active { font-weight: bold; color: blue; }
  `]
})
class StoreAppComponent { }


// ============================================================================
//  SECTION 12: ROUTE GUARDS (BRIEF MENTION — BONUS KNOWLEDGE)
// ============================================================================

// Sometimes you want to PROTECT routes. For example:
//   - Only logged-in users can access /dashboard
//   - Only admins can access /admin
//
// Angular has ROUTE GUARDS for this. A guard is a service that
// decides "Can this user navigate to this route?"
//
// Common guards:
//   CanActivate    -->  "Can the user ACCESS this route?"
//   CanDeactivate  -->  "Can the user LEAVE this route?"
//                        (useful for unsaved form warnings)
//
// Example (just read, do not memorize):
//
//   const routes: Routes = [
//     {
//       path: 'dashboard',
//       component: DashboardComponent,
//       canActivate: [AuthGuard]   // <-- Only if AuthGuard says yes
//     }
//   ];
//
// This is ADVANCED. For a junior interview, just know that guards exist
// and what they do. You probably will not be asked to implement one.


// ============================================================================
//  SECTION 13: KEY TAKEAWAYS
// ============================================================================

// 1. ROUTING maps URLs to components. Each URL shows a different "page."
//
// 2. Define routes as an array of { path, component } objects.
//
// 3. Register routes with RouterModule.forRoot(routes) in your app module.
//
// 4. <router-outlet> is the placeholder where the current route's
//    component is displayed.
//
// 5. Use routerLink for navigation links (not href).
//
// 6. Route parameters (:id) let you create dynamic URLs.
//    Read them with ActivatedRoute.
//
// 7. Use Router.navigate() for programmatic navigation from code.
//
// 8. The ** wildcard route catches all unmatched URLs (404 page).
//    It MUST be the last route defined.
//
// 9. INTERVIEW ANSWER for "How does routing work in Angular?":
//    "Angular's Router maps URL paths to components. You define routes
//     as an array of objects, each with a path and a component. The
//     RouterModule is configured with these routes using forRoot().
//     In the template, router-outlet serves as a placeholder where
//     the matched component is rendered. Navigation is done with
//     routerLink directives or programmatically with Router.navigate()."

// Next file: 05-pipes.ts
// We will learn how to format data for display.
