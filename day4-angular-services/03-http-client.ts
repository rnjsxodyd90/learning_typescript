// ============================================================================
//
//   03 - HTTP CLIENT (Talking to Servers / APIs)
//
//   This is a TEACHING FILE. Read it top to bottom.
//   It is not meant to be run directly. It is meant to teach you.
//
// ============================================================================


// ============================================================================
//  SECTION 1: WHY DO WE NEED HTTP?
// ============================================================================

// In the last file (01-services.ts), our ProductService had a hardcoded
// list of products stored right in the service.
//
// In REAL applications, data does not live in your Angular code.
// Data lives on a SERVER (a computer somewhere on the internet).
//
// Your Angular app (the frontend) needs to ASK the server for data.
// It does this using HTTP requests.
//
// The conversation looks like this:
//
//   Angular App:  "Hey server, give me all the products."
//   Server:       "Sure, here are 50 products in JSON format."
//   Angular App:  "Thanks. Hey server, I want to add a new product."
//   Server:       "Got it, product added. Here is the confirmation."
//
// HTTP is the language they use to talk to each other.
// You already use HTTP every day — when you visit a website, your
// browser sends an HTTP request to a server and gets a response.


// ============================================================================
//  SECTION 2: WHAT IS HttpClient?
// ============================================================================

// HttpClient is Angular's built-in tool for making HTTP requests.
// It is a SERVICE (just like the ones we learned about).
// You inject it into your service and use it to call APIs.
//
// Think of HttpClient as a TELEPHONE.
//   - You pick up the phone (use HttpClient)
//   - You dial a number (provide a URL)
//   - You make a request ("Give me the products" or "Save this new product")
//   - You wait for a response
//   - You hang up when done
//
// HttpClient handles all the complicated networking stuff for you.
// You just tell it: "Call this URL and give me the result."


// ============================================================================
//  SECTION 3: SETTING UP HttpClient
// ============================================================================

// Before using HttpClient, you must import it into your application.
//
// In your app's main module (app.module.ts), you add HttpClientModule:

import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';

// In app.module.ts, you would have:
//
// @NgModule({
//   imports: [
//     BrowserModule,
//     HttpClientModule,    // <-- ADD THIS LINE
//   ],
//   // ... rest of your module
// })
// class AppModule { }
//
// This tells Angular: "I want to use HTTP features in my app."
// You do this ONCE, in the main module. Then HttpClient is available
// everywhere through dependency injection.
//
// NOTE: In newer Angular versions (v15+), if you use standalone
// components, you can use provideHttpClient() instead. But the
// module approach above is still common and widely understood.


// ============================================================================
//  SECTION 4: THE FOUR HTTP METHODS (GET, POST, PUT, DELETE)
// ============================================================================

// There are four main types of HTTP requests. Think of them as
// four different kinds of messages you can send to a server:
//
// GET     -->  "Give me data"         (READ)
// POST    -->  "Here is NEW data"     (CREATE)
// PUT     -->  "Here is UPDATED data" (UPDATE)
// DELETE  -->  "Remove this data"     (DELETE)
//
// Together, these four operations are called CRUD:
//   Create  =  POST
//   Read    =  GET
//   Update  =  PUT
//   Delete  =  DELETE
//
// INTERVIEW TIP: "CRUD" comes up all the time. If someone says
// "build a CRUD app," they mean an app that can Create, Read,
// Update, and Delete data.


// ============================================================================
//  SECTION 5: WHAT IS AN OBSERVABLE? (IMPORTANT!)
// ============================================================================

// Before we look at HTTP examples, you need to understand Observables.
// Every HTTP method in Angular returns an Observable.
//
// ANALOGY: YouTube Subscriptions
//
//   Imagine you SUBSCRIBE to a YouTube channel.
//     - You do not get videos immediately.
//     - When the channel POSTS a new video, you get NOTIFIED.
//     - You can UNSUBSCRIBE at any time.
//
//   An Observable works the same way:
//     - You SUBSCRIBE to an Observable.
//     - When DATA arrives, you get notified.
//     - You can UNSUBSCRIBE when you no longer want data.
//
//
// ANOTHER ANALOGY: Pizza Delivery
//
//   When you order a pizza:
//     - You place the order (subscribe)
//     - You wait (the Observable is working)
//     - The pizza arrives (data is delivered to you)
//     - You eat it (you use the data)
//
//   You do NOT stand at the oven watching it cook.
//   You go about your life and get notified when it is ready.
//   This is called ASYNCHRONOUS — it happens in the background.
//
//
// WHY Observables instead of regular values?
//
//   When you call an API, the data does NOT come back instantly.
//   The server might take 1 second, 5 seconds, or even fail.
//
//   An Observable lets your app keep working while waiting for
//   the data. When the data finally arrives, the Observable
//   delivers it to whoever subscribed.
//
//
// KEY TERMINOLOGY:
//
//   Observable  -->  A "stream" that will eventually produce data
//   subscribe() -->  "I want to listen for the data"
//   next        -->  "Here comes data!" (success)
//   error       -->  "Something went wrong!" (failure)
//   complete    -->  "All done, no more data" (finished)
//
//
// INTERVIEW TIP: If asked "What is an Observable?", say:
//   "An Observable is a stream of asynchronous data. You subscribe
//    to it, and when data arrives, your callback function runs.
//    Angular's HttpClient returns Observables for all HTTP requests.
//    Unlike Promises, Observables can emit multiple values over time
//    and support operators for transforming data."


// ============================================================================
//  SECTION 6: GET REQUEST — Fetching Data
// ============================================================================

// Let's build a real ProductService that calls an actual API.

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
}

@Injectable({
  providedIn: 'root'
})
class ProductService {

  // The base URL of the API we are calling.
  // In a real app, this would be something like 'https://api.mystore.com'
  private apiUrl = 'https://api.example.com/products';

  // Inject HttpClient — this is how our service talks to the server.
  constructor(private http: HttpClient) { }
  //                   ^^^^
  // Remember: this is dependency injection!
  // Angular provides HttpClient automatically, just like any other service.


  // -----------------------------------------------------------------
  // GET — Fetch ALL products
  // -----------------------------------------------------------------
  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }
  //
  // Let's break this down word by word:
  //
  // getProducts()                  --> The method name
  // : Observable<Product[]>        --> This method returns an Observable
  //                                    that will eventually contain an
  //                                    array of Product objects
  // this.http                      --> The HttpClient we injected
  // .get                           --> Make a GET request (fetch data)
  // <Product[]>                    --> Tell TypeScript what type of data
  //                                    we expect back (array of products)
  // (this.apiUrl)                  --> The URL to call
  //
  // This does NOT execute immediately. It creates an Observable.
  // The actual HTTP call happens when someone SUBSCRIBES.


  // -----------------------------------------------------------------
  // GET — Fetch ONE product by ID
  // -----------------------------------------------------------------
  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }
  //
  // The URL becomes: https://api.example.com/products/5
  // (if id is 5)
  //
  // The backtick string (``) with ${} is called a template literal.
  // It lets you embed variables inside a string.


  // -----------------------------------------------------------------
  // POST — Create a NEW product
  // -----------------------------------------------------------------
  addProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.apiUrl, product);
  }
  //
  // .post takes TWO arguments:
  //   1. The URL to call
  //   2. The DATA to send (the new product)
  //
  // The server receives this data and adds it to its database.
  // It usually responds with the created product (now with an ID).


  // -----------------------------------------------------------------
  // PUT — Update an EXISTING product
  // -----------------------------------------------------------------
  updateProduct(product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.apiUrl}/${product.id}`, product);
  }
  //
  // .put also takes a URL and data.
  // The URL includes the product ID so the server knows WHICH
  // product to update.
  // The data is the new version of the product.


  // -----------------------------------------------------------------
  // DELETE — Remove a product
  // -----------------------------------------------------------------
  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
  //
  // .delete just takes a URL.
  // The URL includes the ID of the product to delete.
  // Observable<void> means the server responds with nothing
  // (just a confirmation that it worked).
}


// ============================================================================
//  SECTION 7: SUBSCRIBING — How a Component Uses HTTP Data
// ============================================================================

// Remember: the HTTP call does NOT happen until you subscribe.
// The component subscribes to get the data.

@Component({
  selector: 'app-product-list',
  template: `
    <h2>Products</h2>
    <p *ngIf="loading">Loading products...</p>
    <p *ngIf="errorMessage" style="color: red">{{ errorMessage }}</p>
    <ul>
      <li *ngFor="let product of products">
        {{ product.name }} - {{ product.price }}
      </li>
    </ul>
  `
})
class ProductListComponent implements OnInit {

  products: Product[] = [];
  loading: boolean = false;
  errorMessage: string = '';

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.loading = true;  // Show "Loading..." message

    // HERE IS THE SUBSCRIBE:
    this.productService.getProducts().subscribe({

      // NEXT: This runs when data arrives successfully.
      next: (data: Product[]) => {
        this.products = data;      // Store the products
        this.loading = false;      // Hide "Loading..." message
      },

      // ERROR: This runs if something goes wrong.
      error: (err) => {
        this.errorMessage = 'Failed to load products. Please try again.';
        this.loading = false;
        console.error('Error loading products:', err);
      },

      // COMPLETE: This runs when the Observable is done.
      // For HTTP requests, this happens right after next.
      complete: () => {
        console.log('Product loading complete');
      }
    });
  }

  // -----------------------------------------------------------------
  // Example: Adding a new product
  // -----------------------------------------------------------------
  addNewProduct(): void {
    const newProduct: Product = {
      id: 0,              // Server will assign the real ID
      name: 'New Product',
      price: 49.99,
      description: 'A brand new product'
    };

    this.productService.addProduct(newProduct).subscribe({
      next: (createdProduct: Product) => {
        // The server responds with the product (now with a real ID)
        this.products.push(createdProduct);
        console.log('Product added!', createdProduct);
      },
      error: (err) => {
        console.error('Failed to add product:', err);
      }
    });
  }

  // -----------------------------------------------------------------
  // Example: Deleting a product
  // -----------------------------------------------------------------
  onDelete(id: number): void {
    this.productService.deleteProduct(id).subscribe({
      next: () => {
        // Remove the product from our local array
        this.products = this.products.filter(p => p.id !== id);
        console.log('Product deleted!');
      },
      error: (err) => {
        console.error('Failed to delete product:', err);
      }
    });
  }
}

// KEY POINTS ABOUT SUBSCRIBE:
//
// 1. .subscribe() is what TRIGGERS the HTTP request.
//    Without subscribe, nothing happens. The request is never sent.
//
// 2. The subscribe callback has three possible handlers:
//    - next:     runs when data arrives (success)
//    - error:    runs if something fails
//    - complete: runs when the Observable finishes
//
// 3. For HTTP requests, the Observable emits ONE value (the response)
//    and then completes. So next runs once, then complete runs.
//
// 4. You do NOT always need all three handlers. Commonly:
//
//    // Simple subscribe with just next:
//    this.myService.getData().subscribe(data => {
//      this.myData = data;
//    });
//
//    // Subscribe with next and error:
//    this.myService.getData().subscribe({
//      next: (data) => { this.myData = data; },
//      error: (err) => { console.error(err); }
//    });


// ============================================================================
//  SECTION 8: ERROR HANDLING WITH catchError
// ============================================================================

// Sometimes you want to handle errors IN THE SERVICE, not the component.
// This is done using the catchError operator.

@Injectable({
  providedIn: 'root'
})
class ProductServiceWithErrorHandling {

  private apiUrl = 'https://api.example.com/products';

  constructor(private http: HttpClient) { }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl).pipe(
      catchError(error => {
        // Log the error (for developers to see)
        console.error('API Error:', error);

        // Return an empty array so the app does not crash
        return of([]);  // "of" creates an Observable from a value
      })
    );
  }
  //
  // What is .pipe()?
  //   .pipe() lets you ADD OPERATIONS to an Observable.
  //   Think of it as a pipeline — data flows through and can
  //   be transformed or handled along the way.
  //
  // What is catchError()?
  //   It catches any error from the HTTP call and lets you
  //   handle it gracefully instead of crashing.
  //
  // What is of([])?
  //   "of" is a function that creates an Observable from a regular value.
  //   of([]) creates an Observable that immediately emits an empty array.
  //   This means if the API fails, the component just gets an empty list
  //   instead of an error. The app keeps working.
}


// ============================================================================
//  SECTION 9: REAL-WORLD PATTERNS
// ============================================================================

// PATTERN 1: Loading States
//
// Real apps show a loading spinner while waiting for data.
//
//   this.loading = true;
//   this.service.getData().subscribe({
//     next: (data) => {
//       this.data = data;
//       this.loading = false;    // Hide spinner
//     },
//     error: () => {
//       this.loading = false;    // Hide spinner even on error
//     }
//   });
//
// In the template:
//   <div *ngIf="loading">Loading...</div>
//   <div *ngIf="!loading">...show data...</div>


// PATTERN 2: Headers (Authentication)
//
// Many APIs require a token (password) in the request.
// You add it as a "header":
//
//   import { HttpHeaders } from '@angular/common/http';
//
//   getProducts(): Observable<Product[]> {
//     const headers = new HttpHeaders({
//       'Authorization': 'Bearer my-secret-token',
//       'Content-Type': 'application/json'
//     });
//     return this.http.get<Product[]>(this.apiUrl, { headers });
//   }
//
// Do not worry about this for now. Just know it exists.


// PATTERN 3: Query Parameters
//
// Sometimes you need to filter or search:
//   GET /products?category=electronics&sort=price
//
//   import { HttpParams } from '@angular/common/http';
//
//   searchProducts(category: string): Observable<Product[]> {
//     const params = new HttpParams()
//       .set('category', category)
//       .set('sort', 'price');
//     return this.http.get<Product[]>(this.apiUrl, { params });
//   }


// ============================================================================
//  SECTION 10: OBSERVABLES vs. PROMISES — INTERVIEW QUESTION
// ============================================================================

// Interviewers sometimes ask: "What is the difference between
// an Observable and a Promise?"
//
// Here is a simple comparison:
//
// PROMISE:
//   - Emits ONE value (or an error)
//   - Cannot be cancelled
//   - Starts immediately when created
//   - Built into JavaScript
//   - Uses .then() and .catch()
//
// OBSERVABLE:
//   - Can emit MULTIPLE values over time
//   - CAN be cancelled (unsubscribe)
//   - Does NOT start until you subscribe (lazy)
//   - Comes from RxJS library (used by Angular)
//   - Uses .subscribe()
//   - Has powerful operators (map, filter, catchError, etc.)
//
// For HTTP requests, the difference is small because you only get
// one response. But for things like real-time data (chat messages,
// stock prices), Observables shine because they handle streams of data.
//
// INTERVIEW ANSWER:
//   "Observables are lazy and do not execute until subscribed to.
//    They can emit multiple values over time, unlike Promises which
//    resolve once. Observables support operators like map, filter,
//    and catchError for transforming data streams. They can also
//    be cancelled by unsubscribing."


// ============================================================================
//  SECTION 11: KEY TAKEAWAYS
// ============================================================================

// 1. HttpClient is Angular's tool for making HTTP requests.
//    Import HttpClientModule in your app module to use it.
//
// 2. The four HTTP methods map to CRUD:
//    GET (Read), POST (Create), PUT (Update), DELETE (Delete)
//
// 3. All HTTP methods return OBSERVABLES, not raw data.
//    You must SUBSCRIBE to get the actual data.
//
// 4. .subscribe() triggers the request. Without it, nothing happens.
//
// 5. Handle errors with catchError in the service or the error
//    handler in subscribe.
//
// 6. Observables are like YouTube subscriptions — you subscribe,
//    and you get notified when data arrives.
//
// 7. The pattern is always:
//      Service method returns Observable
//         --> Component subscribes
//            --> Data arrives in the callback
//               --> Component updates its properties
//                  --> Template re-renders

// Next file: 04-routing.ts
// We will learn how to navigate between pages in Angular.
