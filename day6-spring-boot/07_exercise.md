# ============================================================
#  DAY 6 EXERCISES: SPRING BOOT REST API
# ============================================================
#
#  12 interview-style questions with detailed answers.
#  Try to answer each question BEFORE reading the answer.
#  Write your answer on paper or in a text file, then compare.
#
#  These are the questions interviewers ACTUALLY ask for
#  junior Java developer positions.
#
# ============================================================


---


## QUESTION 1: What is Spring Boot and how is it different from Spring?

**Try to answer this yourself first. Then check below.**

<details>
<summary>Click to reveal answer</summary>

**Spring** is a comprehensive Java framework for building enterprise applications. It provides modules for web applications, security, database access, messaging, and much more. However, Spring by itself requires significant configuration -- XML files, manual server setup, and lots of boilerplate.

**Spring Boot** is built on top of Spring and simplifies the entire setup process. It provides:
- **Auto-configuration**: Automatically configures your application based on the dependencies you include
- **Embedded server**: Includes Tomcat so you don't install a separate server
- **Starter dependencies**: Pre-packaged bundles of related libraries (e.g., spring-boot-starter-web gives you everything for REST APIs)
- **Convention over configuration**: Sensible defaults so you write less config

**The key difference**: Spring is the foundation framework. Spring Boot is a tool that makes it easy to START building with Spring. You get a production-ready application in minutes instead of hours.

**Analogy**: Spring is like a fully stocked kitchen where you have to assemble every appliance. Spring Boot is that same kitchen already assembled -- just start cooking.

</details>


---


## QUESTION 2: Explain the flow of a GET request through Controller, Service, and Repository

**Scenario: A client sends GET /api/products/5**

<details>
<summary>Click to reveal answer</summary>

Here is the complete flow:

**Step 1 -- Client sends the request:**
```
GET http://localhost:8080/api/products/5
```

**Step 2 -- Controller receives it:**
```java
@GetMapping("/{id}")
public Product getProductById(@PathVariable Long id) {
    return productService.getProductById(id);
}
```
- Spring matches the URL to this method because of `@GetMapping("/{id}")`
- `@PathVariable` extracts `5` from the URL and assigns it to `id`
- The controller calls the service layer

**Step 3 -- Service processes it:**
```java
public Product getProductById(Long id) {
    return productRepository.findById(id)
        .orElseThrow(() -> new RuntimeException("Product not found"));
}
```
- The service applies any business logic (in this case, handling "not found")
- It calls the repository to actually fetch the data

**Step 4 -- Repository queries the database:**
```java
productRepository.findById(5)
// Generates: SELECT * FROM products WHERE id = 5
```
- Spring Data JPA generates the SQL query automatically
- The database returns the row, which JPA converts to a Product object

**Step 5 -- Response flows back:**
```
Repository returns Optional<Product> to Service
Service unwraps it and returns Product to Controller
Controller returns Product -- Spring converts it to JSON
Client receives: {"id":5,"name":"Laptop","price":999.99,...}
```

**The diagram:**
```
Client -> Controller -> Service -> Repository -> Database
Client <- Controller <- Service <- Repository <- Database
```

</details>


---


## QUESTION 3: What does @RestController do?

<details>
<summary>Click to reveal answer</summary>

`@RestController` is an annotation that marks a Java class as a REST API controller. It tells Spring:

1. **This class handles HTTP requests** (like GET, POST, PUT, DELETE)
2. **Return values should be written directly to the response body** (as JSON)

`@RestController` is actually a combination of two annotations:
- `@Controller` -- marks the class as a web controller
- `@ResponseBody` -- tells Spring to return data (JSON) instead of an HTML view

**Without @RestController:**
```java
// Spring would not know this class handles web requests
public class ProductController {
    // These methods would never be called by HTTP requests
}
```

**With @RestController:**
```java
@RestController
public class ProductController {
    @GetMapping("/api/products")
    public List<Product> getAll() {
        return products; // Automatically converted to JSON
    }
}
```

**Comparison with Express.js:**
- Express: You create a router and define routes with `app.get()`, `app.post()`
- Spring Boot: You annotate a class with `@RestController` and methods with `@GetMapping`, `@PostMapping`

</details>


---


## QUESTION 4: What is the difference between @GetMapping and @PostMapping?

<details>
<summary>Click to reveal answer</summary>

They handle different HTTP methods:

**@GetMapping** -- handles **GET** requests (reading/fetching data)
```java
@GetMapping("/api/products")
public List<Product> getAllProducts() {
    return productService.findAll();
}
// Triggered by: GET http://localhost:8080/api/products
// Purpose: Retrieve data
// Has request body: NO
```

**@PostMapping** -- handles **POST** requests (creating new data)
```java
@PostMapping("/api/products")
public Product createProduct(@RequestBody Product product) {
    return productService.save(product);
}
// Triggered by: POST http://localhost:8080/api/products
// Purpose: Create a new resource
// Has request body: YES (the new product data as JSON)
```

**The full set of HTTP method annotations:**

| Annotation     | HTTP Method | Purpose                        | Has Body? |
|----------------|-------------|--------------------------------|-----------|
| @GetMapping    | GET         | Read / Fetch data              | No        |
| @PostMapping   | POST        | Create new data                | Yes       |
| @PutMapping    | PUT         | Update existing data (full)    | Yes       |
| @PatchMapping  | PATCH       | Update existing data (partial) | Yes       |
| @DeleteMapping | DELETE      | Remove data                    | No        |

**Express.js comparison:**
```javascript
app.get("/products", handler)    // = @GetMapping
app.post("/products", handler)   // = @PostMapping
app.put("/products/:id", handler)  // = @PutMapping
app.delete("/products/:id", handler) // = @DeleteMapping
```

</details>


---


## QUESTION 5: What is Dependency Injection in Spring?

<details>
<summary>Click to reveal answer</summary>

**Dependency Injection (DI)** is a design pattern where an object receives its dependencies from an external source (the Spring framework) instead of creating them itself.

**WITHOUT Dependency Injection (bad):**
```java
public class ProductController {
    // The controller creates its own service -- tightly coupled!
    private ProductService service = new ProductService();
}
```

**WITH Dependency Injection (good):**
```java
public class ProductController {
    private final ProductService service;

    // Spring creates the service and passes it in
    public ProductController(ProductService service) {
        this.service = service;
    }
}
```

**Why is DI important?**

1. **Loose coupling** -- The controller doesn't know HOW the service is created
2. **Easier testing** -- In tests, you can inject a mock/fake service
3. **Flexibility** -- You can swap implementations without changing the controller
4. **Spring manages the lifecycle** -- Spring creates, configures, and destroys objects for you

**How DI works in Spring:**
1. You annotate classes with `@Service`, `@Repository`, `@Controller`, etc.
2. Spring creates instances of these classes (called "beans") when the app starts
3. When a class needs a dependency, Spring looks at the constructor and injects the matching bean

**Two ways to inject:**
```java
// Way 1: Constructor injection (RECOMMENDED)
private final ProductService service;
public ProductController(ProductService service) {
    this.service = service;
}

// Way 2: Field injection with @Autowired (works but not recommended)
@Autowired
private ProductService service;
```

Constructor injection is preferred because it supports `final` fields (immutability) and makes dependencies explicit.

**Angular comparison:**
This is the exact same concept as Angular's dependency injection:
```typescript
// Angular
constructor(private productService: ProductService) { }

// Spring Boot
public ProductController(ProductService productService) {
    this.productService = productService;
}
```

</details>


---


## QUESTION 6: Write a UserController with endpoints for CRUD operations

**On paper, write a UserController class with these endpoints:**
- GET /api/users -- get all users
- GET /api/users/{id} -- get one user
- POST /api/users -- create a user
- PUT /api/users/{id} -- update a user
- DELETE /api/users/{id} -- delete a user

<details>
<summary>Click to reveal answer</summary>

```java
@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    // GET /api/users
    @GetMapping
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    // GET /api/users/{id}
    @GetMapping("/{id}")
    public User getUserById(@PathVariable Long id) {
        return userService.getUserById(id);
    }

    // POST /api/users
    @PostMapping
    public ResponseEntity<User> createUser(@RequestBody User user) {
        User created = userService.createUser(user);
        return new ResponseEntity<>(created, HttpStatus.CREATED);
    }

    // PUT /api/users/{id}
    @PutMapping("/{id}")
    public User updateUser(@PathVariable Long id, @RequestBody User user) {
        return userService.updateUser(id, user);
    }

    // DELETE /api/users/{id}
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
        return ResponseEntity.noContent().build();
    }
}
```

**Key points to mention in an interview:**
- `@RestController` marks it as a REST controller
- `@RequestMapping("/api/users")` sets the base URL
- Constructor injection for the service (not @Autowired on field)
- `@PathVariable` extracts `{id}` from the URL
- `@RequestBody` reads JSON from the request body
- `ResponseEntity` used for POST (201 Created) and DELETE (204 No Content)
- GET and PUT return 200 OK by default

</details>


---


## QUESTION 7: What annotation would you use to get the 'id' from /users/5?

<details>
<summary>Click to reveal answer</summary>

**@PathVariable**

```java
@GetMapping("/users/{id}")
public User getUser(@PathVariable Long id) {
    // id will be 5 when the URL is /users/5
    return userService.getUserById(id);
}
```

How it works:
1. The URL pattern has `{id}` as a placeholder
2. `@PathVariable` tells Spring to extract the value from that position in the URL
3. `/users/5` --> `{id}` = 5 --> `Long id` = 5

**Do NOT confuse with @RequestParam:**
- `@PathVariable` -- value is part of the URL path: `/users/5`
- `@RequestParam` -- value is a query parameter: `/users?id=5`

```java
// @PathVariable: URL = /users/5
@GetMapping("/users/{id}")
public User getUser(@PathVariable Long id) { ... }

// @RequestParam: URL = /users?id=5
@GetMapping("/users")
public User getUser(@RequestParam Long id) { ... }
```

**When to use which?**
- Use `@PathVariable` for identifying a specific resource: `/products/5`, `/users/john`
- Use `@RequestParam` for filtering/searching: `/products?category=electronics&maxPrice=100`

</details>


---


## QUESTION 8: What is a Repository in Spring?

<details>
<summary>Click to reveal answer</summary>

A **Repository** is an interface that handles database operations (CRUD). In Spring Data JPA, you create a Repository by extending `JpaRepository`, and Spring automatically generates the implementation.

```java
@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    // That's it! You get findAll(), findById(), save(), deleteById() for free.
}
```

**What you get automatically (no code needed):**
- `findAll()` -- get all records
- `findById(Long id)` -- get one record by ID
- `save(Product product)` -- insert or update a record
- `deleteById(Long id)` -- delete a record
- `count()` -- count total records
- `existsById(Long id)` -- check if a record exists

**Custom queries by naming convention:**
```java
public interface ProductRepository extends JpaRepository<Product, Long> {
    List<Product> findByName(String name);
    // Spring generates: SELECT * FROM products WHERE name = ?

    List<Product> findByPriceLessThan(Double price);
    // Spring generates: SELECT * FROM products WHERE price < ?
}
```

Spring reads the method name (`findByPriceLessThan`) and automatically writes the SQL query. You never write SQL for basic operations.

**Comparison to Prisma:**
```
Prisma:  prisma.product.findMany()     =  productRepository.findAll()
Prisma:  prisma.product.create({...})  =  productRepository.save(product)
Prisma:  prisma.product.delete({...})  =  productRepository.deleteById(id)
```

</details>


---


## QUESTION 9: What is the difference between @Controller and @RestController?

<details>
<summary>Click to reveal answer</summary>

| Feature          | @Controller                    | @RestController                    |
|------------------|--------------------------------|------------------------------------|
| Returns          | HTML views (web pages)         | Data (JSON/XML)                    |
| Used for         | Server-side rendered websites  | REST APIs                          |
| Response body    | Needs @ResponseBody on each method | Automatic on all methods        |
| Typical use      | Thymeleaf/JSP templates        | Angular/React frontends            |

**@Controller** -- Returns HTML views:
```java
@Controller
public class WebController {
    @GetMapping("/home")
    public String home() {
        return "home";  // Returns the "home.html" template
    }
}
```

**@RestController** -- Returns JSON data:
```java
@RestController
public class ApiController {
    @GetMapping("/api/products")
    public List<Product> getProducts() {
        return products;  // Returns JSON: [{"id":1,"name":"Laptop",...}]
    }
}
```

**The technical difference:**
`@RestController` = `@Controller` + `@ResponseBody`

`@ResponseBody` tells Spring: "Don't look for an HTML template. Write the return value directly to the HTTP response body as JSON."

**For REST API development (which is what you'll do 99% of the time), always use @RestController.**

</details>


---


## QUESTION 10: What is the purpose of the Service layer? Why not put logic directly in the Controller?

<details>
<summary>Click to reveal answer</summary>

The **Service layer** contains business logic and sits between the Controller and Repository.

**Why separate them?**

1. **Separation of Concerns:**
   - Controller: Only handles HTTP (routes, status codes, request/response)
   - Service: Only handles business logic (validation, calculations, rules)
   - Repository: Only handles database operations

2. **Reusability:**
   - Multiple controllers can use the same service
   - Example: Both a REST API controller and a scheduled task can call `productService.getExpiredProducts()`

3. **Testability:**
   - You can test business logic in the Service without starting an HTTP server
   - You can mock the Repository to test Service logic in isolation

4. **Organization:**
   - Controllers stay small and clean (2-3 lines per method)
   - Business rules are in one place, not scattered across controllers

**Bad (logic in controller):**
```java
@PostMapping
public Product create(@RequestBody Product product) {
    if (product.getPrice() < 0) throw new RuntimeException("Bad price");
    if (product.getName() == null) throw new RuntimeException("Name required");
    product.setTax(product.getPrice() * 0.08);
    if (product.getQuantity() == null) product.setQuantity(0);
    return repository.save(product);
}
```

**Good (logic in service):**
```java
// Controller -- clean and simple
@PostMapping
public ResponseEntity<Product> create(@RequestBody Product product) {
    return new ResponseEntity<>(productService.createProduct(product), HttpStatus.CREATED);
}

// Service -- all logic here
public Product createProduct(Product product) {
    validateProduct(product);           // validation
    product.setTax(calculateTax(product));  // business rule
    if (product.getQuantity() == null) product.setQuantity(0);  // default
    return productRepository.save(product);
}
```

</details>


---


## QUESTION 11: How does Spring Boot auto-configure your application?

<details>
<summary>Click to reveal answer</summary>

Spring Boot auto-configuration works by examining:

1. **What dependencies are on the classpath** (in your pom.xml)
2. **What beans are already defined** (your @Service, @Controller, etc.)
3. **What properties are set** (in application.properties)

**Example:**
- You add `spring-boot-starter-web` to pom.xml
- Spring Boot detects it and automatically:
  - Starts an embedded Tomcat server
  - Configures JSON serialization (Jackson)
  - Sets up error handling
  - Enables `@RequestMapping` support

- You add `spring-boot-starter-data-jpa` and `h2` to pom.xml
- Spring Boot automatically:
  - Configures a DataSource (database connection)
  - Sets up Hibernate as the JPA provider
  - Creates the H2 in-memory database
  - Scans for @Entity classes and creates tables

**The @SpringBootApplication annotation enables this:**
```java
@SpringBootApplication  // includes @EnableAutoConfiguration
public class MyApiApplication {
    public static void main(String[] args) {
        SpringApplication.run(MyApiApplication.class, args);
    }
}
```

**Key points for the interview:**
- Auto-configuration is based on classpath dependencies
- It provides sensible defaults (port 8080, Jackson for JSON, etc.)
- You can override any auto-configuration with your own settings
- `application.properties` lets you customize defaults (change port, database URL, etc.)
- This is what makes Spring Boot so much easier than plain Spring

</details>


---


## QUESTION 12: What are the HTTP status codes you should use for a REST API, and when?

<details>
<summary>Click to reveal answer</summary>

**Success codes (2xx):**

| Code | Name         | When to use                              | Spring Boot                           |
|------|--------------|------------------------------------------|---------------------------------------|
| 200  | OK           | GET succeeded, PUT/PATCH succeeded       | Default return (no special code needed) |
| 201  | Created      | POST succeeded (new resource created)    | `new ResponseEntity<>(obj, HttpStatus.CREATED)` |
| 204  | No Content   | DELETE succeeded (nothing to return)     | `ResponseEntity.noContent().build()`  |

**Client error codes (4xx):**

| Code | Name          | When to use                             |
|------|---------------|-----------------------------------------|
| 400  | Bad Request   | Client sent invalid data (bad JSON, missing fields) |
| 401  | Unauthorized  | Client is not logged in                 |
| 403  | Forbidden     | Client is logged in but not allowed     |
| 404  | Not Found     | The requested resource doesn't exist    |
| 409  | Conflict      | Duplicate resource (e.g., username taken) |

**Server error codes (5xx):**

| Code | Name                  | When to use                       |
|------|-----------------------|-----------------------------------|
| 500  | Internal Server Error | Something crashed on the server   |

**In Spring Boot, how to return these:**

```java
// 200 OK (default -- just return the object)
@GetMapping
public Product get() { return product; }

// 201 Created
@PostMapping
public ResponseEntity<Product> create(@RequestBody Product p) {
    return new ResponseEntity<>(savedProduct, HttpStatus.CREATED);
}

// 204 No Content
@DeleteMapping("/{id}")
public ResponseEntity<Void> delete(@PathVariable Long id) {
    return ResponseEntity.noContent().build();
}

// 404 Not Found (using custom exception)
@ResponseStatus(HttpStatus.NOT_FOUND)
public class ResourceNotFoundException extends RuntimeException { }
```

**The rule of thumb:**
- GET returning data: **200**
- POST creating something: **201**
- DELETE removing something: **204**
- Client error: **4xx**
- Server error: **5xx**

</details>


---


# ============================================================
#  BONUS: PRACTICE CODING EXERCISES
# ============================================================


## CODING EXERCISE 1: Write a Book Entity

Write an @Entity class for a Book with these fields:
- id (auto-generated Long)
- title (String, required)
- author (String, required)
- isbn (String, unique)
- publishedYear (Integer)
- price (Double)

<details>
<summary>Click to reveal answer</summary>

```java
@Entity
@Table(name = "books")
public class Book {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String author;

    @Column(unique = true)
    private String isbn;

    private Integer publishedYear;

    private Double price;

    // No-arg constructor (required by JPA)
    public Book() {}

    // Getters and setters for all fields
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public String getAuthor() { return author; }
    public void setAuthor(String author) { this.author = author; }
    public String getIsbn() { return isbn; }
    public void setIsbn(String isbn) { this.isbn = isbn; }
    public Integer getPublishedYear() { return publishedYear; }
    public void setPublishedYear(Integer publishedYear) { this.publishedYear = publishedYear; }
    public Double getPrice() { return price; }
    public void setPrice(Double price) { this.price = price; }
}
```

</details>


## CODING EXERCISE 2: Write a BookRepository with Custom Queries

Write a BookRepository interface with these custom query methods:
- Find books by author
- Find books cheaper than a given price
- Find books published after a certain year
- Find books by title containing a keyword (case-insensitive)

<details>
<summary>Click to reveal answer</summary>

```java
@Repository
public interface BookRepository extends JpaRepository<Book, Long> {

    // SELECT * FROM books WHERE author = ?
    List<Book> findByAuthor(String author);

    // SELECT * FROM books WHERE price < ?
    List<Book> findByPriceLessThan(Double price);

    // SELECT * FROM books WHERE published_year > ?
    List<Book> findByPublishedYearGreaterThan(Integer year);

    // SELECT * FROM books WHERE LOWER(title) LIKE LOWER('%keyword%')
    List<Book> findByTitleContainingIgnoreCase(String keyword);
}
```

**Remember:** You write ZERO implementation code. Spring generates all the SQL from the method names.

</details>


## CODING EXERCISE 3: Explain This Code

What does the following code do? Walk through each annotation and method.

```java
@RestController
@RequestMapping("/api/orders")
public class OrderController {

    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @GetMapping
    public List<Order> getAll() {
        return orderService.getAllOrders();
    }

    @PostMapping
    public ResponseEntity<Order> create(@RequestBody Order order) {
        Order saved = orderService.createOrder(order);
        return new ResponseEntity<>(saved, HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public Order getById(@PathVariable Long id) {
        return orderService.getOrderById(id);
    }
}
```

<details>
<summary>Click to reveal answer</summary>

**Line by line:**

- `@RestController` -- This class is a REST API controller that returns JSON
- `@RequestMapping("/api/orders")` -- All endpoints start with `/api/orders`
- `private final OrderService orderService` -- The service dependency (final = immutable)
- `public OrderController(OrderService orderService)` -- Constructor injection. Spring automatically passes the OrderService bean.
- `@GetMapping` -- Handles `GET /api/orders`. Returns a list of all orders as JSON (200 OK)
- `@PostMapping` -- Handles `POST /api/orders`. Reads JSON from request body (`@RequestBody`), creates an order, returns it with 201 Created status
- `@GetMapping("/{id}")` -- Handles `GET /api/orders/{id}`. `@PathVariable` extracts the id from the URL. Returns one order as JSON (200 OK)

**The flow for GET /api/orders/5:**
1. Spring matches the URL to `getById()` method
2. `@PathVariable` extracts 5 and assigns to `id`
3. `orderService.getOrderById(5)` is called
4. Service calls repository, repository queries database
5. Result comes back as JSON response

</details>


---


# ============================================================
#  STUDY CHECKLIST
# ============================================================
#
#  Before your interview, make sure you can explain:
#
#  [ ] What is Spring Boot and how is it different from Spring?
#  [ ] What is @RestController?
#  [ ] What are @GetMapping, @PostMapping, @PutMapping, @DeleteMapping?
#  [ ] What is @PathVariable and how is it different from @RequestParam?
#  [ ] What is @RequestBody?
#  [ ] What is the Service layer and why do we need it?
#  [ ] What is Dependency Injection?
#  [ ] What is an Entity (@Entity)?
#  [ ] What is a Repository and how does JpaRepository work?
#  [ ] What is the Controller-Service-Repository architecture?
#  [ ] What HTTP status codes should you use for CRUD operations?
#  [ ] How to create a Spring Boot project (start.spring.io)?
#
#  If you can explain all 12 of these clearly, you are well
#  prepared for a junior Spring Boot interview.
#
# ============================================================
