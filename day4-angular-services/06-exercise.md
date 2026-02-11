# Day 4 Exercises: Services, DI, HTTP, Routing, and Pipes

## Instructions

Try to answer each question WITHOUT looking at the tutorial files.
Write your answers down (on paper or in a text file) before checking
the answers at the bottom.

For coding questions, write them out by hand. Do not copy-paste.
The act of writing code by hand builds muscle memory that will help
you in interviews.

---

## SECTION A: Conceptual Questions (Explain in Your Own Words)

### Question 1
**What is a service in Angular and why would you use one?**

(Think: what is the restaurant analogy? What goes in a service vs. a component?)

---

### Question 2
**Explain dependency injection to a non-developer.**

(Pretend you are explaining to your friend who knows nothing about code.
Use an everyday analogy. This is THE interview question.)

---

### Question 3
**What is the difference between a component and a service?**

(Think about their different jobs. What does each one do?)

---

### Question 4
**What is an Observable? Why does Angular use them for HTTP requests?**

(Think about the YouTube subscription analogy.)

---

### Question 5
**How do you navigate between pages in Angular? How is this different
from a traditional website?**

(Think: what happens when you click a link on a regular website vs. Angular?)

---

### Question 6
**What does `router-outlet` do?**

(Think about the picture frame analogy.)

---

### Question 7
**What does `providedIn: 'root'` mean in a service?**

(Think: where is the service available? How many copies exist?)

---

## SECTION B: Code Reading Questions

### Question 8
**Look at this code. What does each line do?**

```typescript
@Injectable({
  providedIn: 'root'
})
class UserService {
  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>('https://api.example.com/users');
  }
}
```

Explain each line in plain English.

---

### Question 9
**Look at this component code. How does it get its data?**

```typescript
@Component({
  selector: 'app-user-list',
  template: `
    <ul>
      <li *ngFor="let user of users">
        {{ user.name }} - {{ user.email | lowercase }}
      </li>
    </ul>
  `
})
class UserListComponent implements OnInit {
  users: User[] = [];

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getUsers().subscribe(data => {
      this.users = data;
    });
  }
}
```

Answer these questions about the code:
- How does the component get the UserService?
- When does it fetch the users?
- What does `.subscribe()` do here?
- What does the `lowercase` pipe do in the template?

---

### Question 10
**Write a complete UserService from scratch.**

The service should have these methods:
- `getUsers()` — fetches all users from `https://api.example.com/users`
- `getUserById(id: number)` — fetches one user by ID
- `createUser(user: User)` — sends a new user to the server
- `deleteUser(id: number)` — deletes a user by ID

Write the full service class with the decorator and constructor.

---

## SECTION C: Routing Questions

### Question 11 (BONUS)
**Given these routes, what component is shown for each URL?**

```typescript
const routes: Routes = [
  { path: '',           component: HomeComponent },
  { path: 'users',      component: UserListComponent },
  { path: 'users/:id',  component: UserDetailComponent },
  { path: 'about',      component: AboutComponent },
  { path: '**',         component: NotFoundComponent },
];
```

What shows for each URL?
- `/`
- `/users`
- `/users/42`
- `/about`
- `/contact`
- `/xyz/abc/123`

---

### Question 12 (BONUS)
**What is the difference between `routerLink` and `href` in Angular?**

---

---
---

# ANSWERS

(Do NOT read until you have tried ALL questions above.)

---
---

---

## Answer 1: What is a service?

A service is a class in Angular that handles business logic, data management,
or utility functions. It is separate from the UI.

Think of a restaurant: the component is the waiter (handles what the customer
sees and interacts with), and the service is the kitchen (handles the actual
work behind the scenes).

You use services because of "separation of concerns." Components should only
handle the UI. Everything else — fetching data, calculations, sharing data
between components — goes in a service.

Key points to mention:
- Decorated with `@Injectable`
- Handles logic and data, not UI
- Promotes code reuse (multiple components can share one service)
- Makes code easier to test and maintain

---

## Answer 2: Explain DI to a non-developer

"Imagine a restaurant. Instead of growing its own tomatoes, raising its own
chickens, and making its own plates, the restaurant simply says 'I need
tomatoes' and a supplier delivers them. The restaurant does not care which
farm the tomatoes come from — it just needs tomatoes.

Dependency Injection works the same way. When a piece of code needs something
(like a data service), it does not create that thing itself. It just says
'I need this' and the system automatically provides it. This makes the code
more flexible — if you want to swap the tomato supplier, the restaurant code
does not change at all."

Technical version for the interviewer:
"Dependency Injection is a design pattern where a class receives its
dependencies from an external source rather than creating them itself.
In Angular, components declare dependencies in their constructor, and
Angular's injector automatically provides instances. This promotes loose
coupling, improves testability, and ensures services are singletons."

---

## Answer 3: Component vs. Service

| Aspect      | Component                           | Service                              |
|-------------|-------------------------------------|--------------------------------------|
| Purpose     | Handles the UI (what user sees)     | Handles logic and data               |
| Decorator   | @Component                          | @Injectable                          |
| Has template| Yes (HTML for the view)             | No (no HTML, no visual output)       |
| Created by  | Angular, based on selectors/routes  | Angular's DI system, when requested  |
| Example     | ProductListComponent displays a list| ProductService fetches/manages products|

Simple answer: "A component controls what the user sees. A service handles
the work behind the scenes. Components are for display, services are for logic."

---

## Answer 4: What is an Observable?

An Observable is like a YouTube subscription. When you subscribe to a channel,
you do not get all videos instantly. You wait, and when the channel posts a
new video, you get notified. You can unsubscribe anytime.

Similarly, when you subscribe to an Observable, you wait for data. When the
data arrives (like an API response), your callback function runs. You can
unsubscribe when you no longer need the data.

Angular uses Observables for HTTP because API calls are asynchronous — the
data does not arrive instantly. The Observable lets the app keep running
while waiting, and delivers the data when it arrives.

Key difference from Promises: Observables can emit multiple values over time,
are lazy (do not execute until subscribed), and can be cancelled.

---

## Answer 5: Navigation in Angular

Angular is a Single Page Application (SPA). When you navigate between pages,
the browser does NOT reload. Angular swaps out the content dynamically.

Traditional website: Click a link, browser sends a new request to the server,
entire page reloads. Slow.

Angular: Click a routerLink, Angular catches it, swaps the component shown
in the router-outlet. No server request for a new page. Fast.

You set up routing by:
1. Defining routes (URL path mapped to a component)
2. Using RouterModule.forRoot(routes) in the app module
3. Using `<router-outlet>` where content should appear
4. Using `routerLink` for navigation links

---

## Answer 6: What does router-outlet do?

`<router-outlet>` is a placeholder directive in the template. It marks
the spot where Angular should display the component that matches the
current route.

Think of it as an empty picture frame on a wall. When you navigate to
different URLs, Angular puts different "pictures" (components) into
that frame. The rest of the page (navigation bar, footer) stays the same.

---

## Answer 7: What does providedIn: 'root' mean?

`providedIn: 'root'` registers the service at the root level of the
application, meaning:

1. The service is available to EVERY component and service in the app.
2. Angular creates only ONE instance (singleton) shared everywhere.
3. If no one uses the service, Angular can tree-shake it (exclude it
   from the final bundle to save space).

---

## Answer 8: Code reading — UserService

```typescript
@Injectable({              // This class is an injectable service
  providedIn: 'root'       // Available everywhere, singleton
})
class UserService {
  constructor(private http: HttpClient) { }
  // Injects Angular's HttpClient for making API calls.
  // "private http" creates a property and assigns HttpClient to it.

  getUsers(): Observable<User[]> {
  // A method that returns an Observable containing an array of Users.
  // The data is NOT returned immediately — it arrives asynchronously.

    return this.http.get<User[]>('https://api.example.com/users');
    // Makes a GET request to the API URL.
    // <User[]> tells TypeScript the response will be an array of User objects.
    // The actual request happens when someone subscribes.
  }
}
```

---

## Answer 9: Code reading — UserListComponent

- **How does it get UserService?** Through dependency injection. The line
  `constructor(private userService: UserService)` tells Angular to provide
  an instance of UserService.

- **When does it fetch users?** In `ngOnInit()`, which runs when the component
  first loads. This is the standard place to fetch initial data.

- **What does `.subscribe()` do?** It triggers the actual HTTP GET request
  and provides a callback function that runs when the data arrives. The
  callback stores the received data in `this.users`.

- **What does the `lowercase` pipe do?** It transforms the user's email to
  all lowercase letters in the display. The original data is not changed.

---

## Answer 10: Write a UserService

```typescript
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface User {
  id: number;
  name: string;
  email: string;
}

@Injectable({
  providedIn: 'root'
})
class UserService {

  private apiUrl = 'https://api.example.com/users';

  constructor(private http: HttpClient) { }

  // GET all users
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }

  // GET one user by ID
  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${id}`);
  }

  // POST a new user
  createUser(user: User): Observable<User> {
    return this.http.post<User>(this.apiUrl, user);
  }

  // DELETE a user by ID
  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
```

Key things the interviewer checks:
- Did you use @Injectable with providedIn: 'root'?
- Did you inject HttpClient in the constructor?
- Do methods return Observable (not raw data)?
- Did you use the correct HTTP methods (get, post, delete)?
- Did you use template literals for URLs with IDs?

---

## Answer 11: Route matching

```
/             -->  HomeComponent       (matches path: '')
/users        -->  UserListComponent   (matches path: 'users')
/users/42     -->  UserDetailComponent (matches path: 'users/:id', id = '42')
/about        -->  AboutComponent      (matches path: 'about')
/contact      -->  NotFoundComponent   (matches path: '**' — no route for 'contact')
/xyz/abc/123  -->  NotFoundComponent   (matches path: '**' — no route for this)
```

The `**` wildcard catches ALL unmatched URLs. It MUST be the last route
because Angular checks routes top to bottom and uses the first match.

---

## Answer 12: routerLink vs. href

| Feature     | routerLink                            | href                                |
|-------------|---------------------------------------|-------------------------------------|
| Page reload | NO — Angular handles navigation       | YES — full browser reload           |
| Speed       | Fast (only swaps component)           | Slow (reloads entire application)   |
| SPA         | Preserves SPA behavior                | Breaks SPA behavior                 |
| State       | Preserves app state (variables, etc.) | Loses all app state on reload       |
| Usage       | `<a routerLink="/products">`          | `<a href="/products">`              |

In Angular, ALWAYS use routerLink for internal navigation. Use href only
for external links (links to other websites).

---

## How Did You Do?

- **10-12 correct**: Excellent! You are ready for interview questions on these topics.
- **7-9 correct**: Good foundation. Re-read the sections you missed.
- **4-6 correct**: Getting there. Re-read the tutorial files and try again tomorrow.
- **0-3 correct**: No worries. These are complex concepts. Re-read everything
  slowly and try the questions again. Repetition is how you learn.

Remember: the #1 question will be about Dependency Injection.
Practice explaining it out loud until it feels natural.
