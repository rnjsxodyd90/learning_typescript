# Quick Reference Cheat Sheet - Junior Software Engineer

> Print this out or keep it open while studying. Scan it before your interview.

---

## Table of Contents
1. [TypeScript Syntax](#typescript-syntax)
2. [Angular Cheat Sheet](#angular-cheat-sheet)
3. [Java Syntax (Compared to TypeScript)](#java-syntax-compared-to-typescript)
4. [Spring Boot Annotations](#spring-boot-annotations)
5. [HTTP Methods Table](#http-methods-table)
6. [Common Design Patterns](#common-design-patterns)
7. [Key Vocabulary](#key-vocabulary)

---

## TypeScript Syntax

### Variable Declarations

```typescript
// const - cannot be reassigned (USE BY DEFAULT)
const name: string = "John";
const age: number = 25;
const isActive: boolean = true;

// let - can be reassigned
let count: number = 0;
count = 5; // OK

// Arrays
const names: string[] = ["Alice", "Bob"];
const numbers: Array<number> = [1, 2, 3];

// Objects
const user: { name: string; age: number } = { name: "John", age: 25 };
```

### Basic Types

| Type        | Example                          | Description                     |
|-------------|----------------------------------|---------------------------------|
| `string`    | `"hello"`                        | Text                            |
| `number`    | `42`, `3.14`                     | Numbers (int and float)         |
| `boolean`   | `true`, `false`                  | True or false                   |
| `any`       | anything                         | No type checking (AVOID)        |
| `unknown`   | anything                         | Safe version of any             |
| `void`      | no return                        | Function returns nothing        |
| `null`      | `null`                           | Intentional absence             |
| `undefined` | `undefined`                      | Not yet assigned                |
| `string[]`  | `["a", "b"]`                     | Array of strings                |
| `object`    | `{ key: value }`                 | Any object                      |

### Interfaces

```typescript
// Define the shape of an object
interface User {
  id: number;
  name: string;
  email: string;
  isAdmin?: boolean;  // ? = optional property
}

// Use the interface
const user: User = {
  id: 1,
  name: "John",
  email: "john@test.com"
};

// Extending interfaces
interface Admin extends User {
  permissions: string[];
}
```

### Type Aliases & Unions

```typescript
// Type alias
type ID = string | number;  // Union type: can be string OR number

// Literal types
type Status = "pending" | "active" | "closed";
let orderStatus: Status = "active";

// Intersection types (combine types)
type Employee = User & { department: string };
```

### Enums

```typescript
enum Direction {
  Up = "UP",
  Down = "DOWN",
  Left = "LEFT",
  Right = "RIGHT"
}

enum Status {
  Pending,   // 0
  Active,    // 1
  Closed     // 2
}
```

### Functions

```typescript
// Typed function
function add(a: number, b: number): number {
  return a + b;
}

// Arrow function
const multiply = (a: number, b: number): number => a * b;

// Optional parameter
function greet(name: string, greeting?: string): string {
  return `${greeting || "Hello"}, ${name}`;
}

// Default parameter
function greet(name: string, greeting: string = "Hello"): string {
  return `${greeting}, ${name}`;
}
```

### Generics

```typescript
// Generic function
function getFirst<T>(arr: T[]): T {
  return arr[0];
}

getFirst<string>(["a", "b"]);  // returns "a" (type: string)
getFirst<number>([1, 2, 3]);   // returns 1 (type: number)

// Generic interface
interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}
```

### Classes

```typescript
class User {
  // Properties
  private id: number;
  public name: string;
  protected email: string;

  // Constructor
  constructor(id: number, name: string, email: string) {
    this.id = id;
    this.name = name;
    this.email = email;
  }

  // Method
  getInfo(): string {
    return `${this.name} (${this.email})`;
  }
}

// Shorthand constructor (same thing, less code)
class User {
  constructor(
    private id: number,
    public name: string,
    protected email: string
  ) {}
}
```

---

## Angular Cheat Sheet

### Component Structure

```typescript
// user.component.ts
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-user',            // HTML tag: <app-user></app-user>
  templateUrl: './user.component.html',  // HTML file
  styleUrls: ['./user.component.css']    // CSS file
})
export class UserComponent implements OnInit {
  @Input() userId: number;          // Data FROM parent
  @Output() userDeleted = new EventEmitter<number>();  // Event TO parent

  userName: string = '';

  constructor(private userService: UserService) {}  // Dependency Injection

  ngOnInit(): void {
    // Runs after component is initialized
    this.loadUser();
  }

  loadUser(): void {
    this.userService.getUser(this.userId).subscribe(user => {
      this.userName = user.name;
    });
  }

  onDelete(): void {
    this.userDeleted.emit(this.userId);  // Send event to parent
  }
}
```

### Key Decorators

| Decorator         | Purpose                                  | Where Used        |
|-------------------|------------------------------------------|-------------------|
| `@Component({})`  | Defines a component                      | Class             |
| `@NgModule({})`   | Defines a module                         | Class             |
| `@Injectable({})`  | Marks a class as injectable (service)   | Class             |
| `@Input()`        | Receive data from parent component       | Property          |
| `@Output()`       | Send events to parent component          | Property          |
| `@ViewChild()`    | Access a child component/element         | Property          |
| `@Pipe({})`       | Defines a custom pipe                    | Class             |

### Lifecycle Hooks (In Order of Execution)

| Hook                | When It Runs                               | Common Use                       |
|---------------------|--------------------------------------------|----------------------------------|
| `ngOnChanges`       | When @Input properties change              | React to input changes           |
| `ngOnInit`          | Once, after first ngOnChanges              | **Load data, initialize**        |
| `ngDoCheck`         | Every change detection cycle               | Custom change detection          |
| `ngAfterViewInit`   | After view (and child views) initialized   | Access DOM elements              |
| `ngOnDestroy`       | Before component is destroyed              | **Unsubscribe, cleanup**         |

> **Most important:** `ngOnInit` (setup) and `ngOnDestroy` (cleanup)

### Template Syntax

```html
<!-- Interpolation: display data -->
<h1>{{ title }}</h1>
<p>{{ user.name }}</p>

<!-- Property binding: set element property -->
<img [src]="imageUrl">
<button [disabled]="isLoading">Submit</button>

<!-- Event binding: handle events -->
<button (click)="onSubmit()">Submit</button>
<input (keyup)="onSearch($event)">

<!-- Two-way binding (banana in a box) -->
<input [(ngModel)]="userName">

<!-- *ngIf: conditional rendering -->
<div *ngIf="isLoggedIn">Welcome!</div>
<div *ngIf="users.length > 0; else noUsers">
  User list here
</div>
<ng-template #noUsers>No users found</ng-template>

<!-- *ngFor: loop -->
<div *ngFor="let user of users; let i = index">
  {{ i + 1 }}. {{ user.name }}
</div>

<!-- ngClass: conditional CSS classes -->
<div [ngClass]="{ 'active': isActive, 'disabled': isDisabled }">

<!-- ngStyle: conditional inline styles -->
<div [ngStyle]="{ 'color': isError ? 'red' : 'green' }">

<!-- Pipe: transform display data -->
<p>{{ birthday | date:'longDate' }}</p>
<p>{{ price | currency:'USD' }}</p>
<p>{{ name | uppercase }}</p>
```

### Service with HTTP

```typescript
// user.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'  // Available app-wide (singleton)
})
export class UserService {
  private apiUrl = 'http://localhost:8080/api/users';

  constructor(private http: HttpClient) {}

  getAll(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }

  getById(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${id}`);
  }

  create(user: User): Observable<User> {
    return this.http.post<User>(this.apiUrl, user);
  }

  update(id: number, user: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/${id}`, user);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
```

### Routing

```typescript
// app-routing.module.ts
const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'users', component: UserListComponent },
  { path: 'users/:id', component: UserDetailComponent },
  { path: '**', component: NotFoundComponent }  // Wildcard (404)
];

// In template: navigation
<a routerLink="/users">Users</a>
<a [routerLink]="['/users', user.id]">View User</a>

// In component: programmatic navigation
constructor(private router: Router) {}
this.router.navigate(['/users', userId]);
```

### Reactive Forms

```typescript
// In component
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

export class UserFormComponent implements OnInit {
  userForm: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.userForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      age: [null, [Validators.min(18)]]
    });
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      console.log(this.userForm.value);
    }
  }
}
```

```html
<!-- In template -->
<form [formGroup]="userForm" (ngSubmit)="onSubmit()">
  <input formControlName="name">
  <div *ngIf="userForm.get('name')?.errors?.['required']">
    Name is required
  </div>

  <input formControlName="email">
  <button type="submit" [disabled]="userForm.invalid">Submit</button>
</form>
```

---

## Java Syntax (Compared to TypeScript)

### Side-by-Side Comparison

| Concept             | TypeScript                           | Java                                    |
|---------------------|--------------------------------------|-----------------------------------------|
| Variable            | `let name: string = "John";`        | `String name = "John";`                |
| Constant            | `const MAX = 100;`                  | `final int MAX = 100;`                 |
| Array               | `let nums: number[] = [1,2,3];`     | `int[] nums = {1, 2, 3};`              |
| Dynamic list        | `let list: number[] = [];`          | `List<Integer> list = new ArrayList<>();` |
| Function            | `function add(a: number): number`   | `public int add(int a)`                |
| Arrow function      | `(x) => x * 2`                      | `x -> x * 2` (lambda)                  |
| Print               | `console.log("hello");`             | `System.out.println("hello");`         |
| Null check          | `if (x !== null)`                   | `if (x != null)`                        |
| String interpolation| `` `Hello ${name}` ``               | `"Hello " + name` or `String.format`   |
| Interface           | `interface User { name: string; }`  | `interface User { String getName(); }` |
| Class               | `class User { }`                    | `public class User { }`                |
| Constructor         | `constructor(name: string) { }`     | `public User(String name) { }`         |
| Import              | `import { X } from './x';`         | `import com.example.X;`                |
| For-each loop       | `for (let item of items) { }`       | `for (Item item : items) { }`          |
| Map/Dictionary      | `Map<string, number>`               | `Map<String, Integer>`                 |

### Java Class Structure

```java
// User.java
package com.example.model;

public class User {
    // Fields (properties)
    private Long id;
    private String name;
    private String email;

    // Constructor
    public User(Long id, String name, String email) {
        this.id = id;
        this.name = name;
        this.email = email;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
}
```

### Java Collections Quick Reference

| Collection    | TypeScript Equivalent    | Java                          | Key Feature                |
|---------------|--------------------------|-------------------------------|----------------------------|
| ArrayList     | `Array` / `[]`           | `List<String> list`           | Ordered, allows duplicates |
| HashSet       | `Set`                    | `Set<String> set`             | No duplicates              |
| HashMap       | `Map` / `{}`             | `Map<String, Integer> map`    | Key-value pairs            |
| LinkedList    | N/A                      | `List<String> list`           | Fast insert/delete         |

```java
// ArrayList
List<String> names = new ArrayList<>();
names.add("Alice");
names.add("Bob");
names.get(0);        // "Alice"
names.size();        // 2
names.remove("Bob");
names.contains("Alice"); // true

// HashMap
Map<String, Integer> ages = new HashMap<>();
ages.put("Alice", 25);
ages.get("Alice");    // 25
ages.containsKey("Alice"); // true
```

### Java OOP Pillars Quick Reference

```java
// ENCAPSULATION - hide internal details
public class BankAccount {
    private double balance;  // private - hidden

    public double getBalance() { return balance; }  // controlled access
    public void deposit(double amount) {
        if (amount > 0) balance += amount;  // validation
    }
}

// INHERITANCE - extend a class
public class Animal {
    public void speak() { System.out.println("..."); }
}
public class Dog extends Animal {
    @Override
    public void speak() { System.out.println("Woof!"); }
}

// POLYMORPHISM - same method, different behavior
Animal myPet = new Dog();
myPet.speak();  // prints "Woof!" (Dog's version)

// ABSTRACTION - hide complexity
public interface PaymentProcessor {
    void processPayment(double amount);  // WHAT to do
}
public class StripeProcessor implements PaymentProcessor {
    public void processPayment(double amount) {
        // HOW to do it (hidden from caller)
    }
}
```

---

## Spring Boot Annotations

### Core Annotations

| Annotation            | Purpose                                            | Layer        |
|-----------------------|----------------------------------------------------|--------------|
| `@SpringBootApplication` | Entry point of the application                  | Main class   |
| `@RestController`     | Marks class as REST API controller                 | Controller   |
| `@Service`            | Marks class as a service (business logic)          | Service      |
| `@Repository`         | Marks class as a data access component             | Repository   |
| `@Component`          | Generic Spring-managed component                   | Any          |
| `@Autowired`          | Inject a dependency automatically                  | Any          |
| `@Entity`             | Maps class to a database table                     | Model        |
| `@Configuration`      | Marks class as a configuration source              | Config       |

### Controller / Endpoint Annotations

| Annotation                     | HTTP Method | Purpose                       |
|--------------------------------|-------------|-------------------------------|
| `@GetMapping("/path")`         | GET         | Retrieve data                 |
| `@PostMapping("/path")`        | POST        | Create new resource           |
| `@PutMapping("/path")`         | PUT         | Update entire resource        |
| `@PatchMapping("/path")`       | PATCH       | Update part of resource       |
| `@DeleteMapping("/path")`      | DELETE      | Delete resource               |
| `@RequestMapping("/base")`     | All         | Base path for the controller  |

### Parameter Annotations

| Annotation                    | Purpose                              | Example                        |
|-------------------------------|--------------------------------------|--------------------------------|
| `@PathVariable`               | Get value from URL path              | `/users/{id}` -> `id`         |
| `@RequestBody`                | Get JSON from request body           | POST/PUT data                  |
| `@RequestParam`               | Get query parameter                  | `?name=John` -> `name`        |
| `@RequestHeader`              | Get HTTP header value                | Authorization header           |

### JPA / Entity Annotations

| Annotation                    | Purpose                              |
|-------------------------------|--------------------------------------|
| `@Entity`                     | Marks class as a database entity     |
| `@Table(name = "users")`      | Specifies the table name             |
| `@Id`                         | Marks the primary key field          |
| `@GeneratedValue`             | Auto-generate the ID                 |
| `@Column(name = "col_name")`  | Maps field to specific column        |
| `@OneToMany`                  | One-to-many relationship             |
| `@ManyToOne`                  | Many-to-one relationship             |

### Complete Spring Boot Example

```java
// === MODEL / ENTITY ===
@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(unique = true)
    private String email;

    // constructors, getters, setters
}

// === REPOSITORY ===
@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    // Spring auto-generates: findAll, findById, save, delete
    List<User> findByName(String name);  // Custom query method
}

// === SERVICE ===
@Service
public class UserService {
    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {  // Constructor DI
        this.userRepository = userRepository;
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public User createUser(User user) {
        return userRepository.save(user);
    }
}

// === CONTROLLER ===
@RestController
@RequestMapping("/api/users")
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {  // Constructor DI
        this.userService = userService;
    }

    @GetMapping
    public List<User> getAll() {
        return userService.getAllUsers();
    }

    @GetMapping("/{id}")
    public User getById(@PathVariable Long id) {
        return userService.getUserById(id);
    }

    @PostMapping
    public User create(@RequestBody User user) {
        return userService.createUser(user);
    }

    @PutMapping("/{id}")
    public User update(@PathVariable Long id, @RequestBody User user) {
        return userService.updateUser(id, user);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        userService.deleteUser(id);
    }
}
```

---

## HTTP Methods Table

| Method   | Action   | URL Example          | Request Body | Response           | Idempotent |
|----------|----------|----------------------|--------------|--------------------|------------|
| `GET`    | Read     | `/api/users`         | No           | List of users      | Yes        |
| `GET`    | Read one | `/api/users/5`       | No           | Single user        | Yes        |
| `POST`   | Create   | `/api/users`         | Yes (JSON)   | Created user       | No         |
| `PUT`    | Update   | `/api/users/5`       | Yes (JSON)   | Updated user       | Yes        |
| `PATCH`  | Partial  | `/api/users/5`       | Yes (JSON)   | Updated user       | Yes        |
| `DELETE` | Delete   | `/api/users/5`       | No           | Empty / Confirmation | Yes      |

### HTTP Status Codes to Know

| Code | Meaning                | When Used                                |
|------|------------------------|------------------------------------------|
| 200  | OK                     | Successful GET, PUT, PATCH               |
| 201  | Created                | Successful POST (new resource created)   |
| 204  | No Content             | Successful DELETE                        |
| 400  | Bad Request            | Invalid data sent by client              |
| 401  | Unauthorized           | Not authenticated (no/invalid token)     |
| 403  | Forbidden              | Authenticated but no permission          |
| 404  | Not Found              | Resource doesn't exist                   |
| 500  | Internal Server Error  | Server-side bug                          |

---

## Common Design Patterns

### MVC (Model-View-Controller)

```
Model      = Data and business logic
View       = What the user sees (UI)
Controller = Handles input, connects Model and View
```

### Singleton Pattern
One instance shared across the entire application. Angular services with `providedIn: 'root'` are singletons.

### Observer Pattern
One object (Observable) notifies many listeners (Observers) when something changes. RxJS Observables in Angular use this pattern.

### Repository Pattern
Abstracts database operations behind an interface. Spring Data JPA repositories implement this.

---

## Key Vocabulary

| Term               | Simple Definition                                                    |
|--------------------|----------------------------------------------------------------------|
| **API**            | Contract for how systems communicate                                 |
| **REST**           | Architecture style for web APIs using HTTP methods                   |
| **JSON**           | Data format: `{ "key": "value" }` - used for API communication      |
| **Component**      | Reusable UI building block with template, logic, and styles          |
| **Service**        | Class that handles business logic, separate from UI                  |
| **DI**             | Dependency Injection - getting dependencies from outside the class   |
| **Observable**     | A stream of data over time you subscribe to                          |
| **Decorator**      | `@Something` - adds metadata to a class/property (Angular & Spring) |
| **Annotation**     | Java's version of decorators: `@RestController`, `@Service`          |
| **Bean**           | A Spring-managed object instance                                     |
| **Module**         | A container that groups related functionality                        |
| **Directive**      | Angular instruction that adds behavior to DOM elements               |
| **Pipe**           | Angular feature that transforms data for display                     |
| **Route**          | URL path mapped to a component or controller                         |
| **Middleware**      | Code that runs between request and response (interceptors)          |
| **ORM**            | Object-Relational Mapping - maps objects to database tables          |
| **CRUD**           | Create, Read, Update, Delete - basic data operations                 |
| **SPA**            | Single Page Application - one page, content changes dynamically      |
| **JWT**            | JSON Web Token - used for authentication                             |
| **CORS**           | Cross-Origin Resource Sharing - allows frontend to call backend API  |
