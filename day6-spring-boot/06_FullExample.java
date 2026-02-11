// ============================================================
//  06: COMPLETE SPRING BOOT REST API -- ALL LAYERS TOGETHER
// ============================================================
//
//  This file shows the FULL picture.
//  All four layers in one file so you can see how they connect.
//
//  In a real project, each class would be in its own file.
//  We put them together here for learning purposes.
//
//  THE ARCHITECTURE:
//
//  +--------+     +-----------+     +-----------+     +----------+     +----------+
//  | Client | --> | Controller| --> |  Service  | --> |Repository| --> | Database |
//  | (HTTP) |     | (Routes)  |     | (Logic)   |     | (Data)   |     | (Storage)|
//  +--------+     +-----------+     +-----------+     +----------+     +----------+
//      ^                                                                     |
//      |                                                                     |
//      +------------ JSON Response <-----------------------------------------+
//
//  TRACING A REQUEST (GET /api/products/1):
//
//  1. Client sends:     GET http://localhost:8080/api/products/1
//  2. Controller:       @GetMapping("/{id}") --> getProductById(1)
//  3. Service:          productService.getProductById(1)
//  4. Repository:       productRepository.findById(1)
//  5. Database:         SELECT * FROM products WHERE id = 1
//  6. Database returns: {id:1, name:"Laptop", price:999.99, ...}
//  7. Repository:       Returns Optional<Product>
//  8. Service:          Unwraps Optional, returns Product
//  9. Controller:       Returns Product as HTTP response
//  10. Client receives: {"id":1,"name":"Laptop","price":999.99,...}
//
// ============================================================


// ############################################################
// #                                                          #
// #    LAYER 1: THE ENTITY (Model)                           #
// #    File: src/main/java/com/example/myapi/model/Product.java
// #                                                          #
// ############################################################

package com.example.myapi.model;

import jakarta.persistence.*;

@Entity
@Table(name = "products")
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private Double price;

    @Column(length = 1000)
    private String description;

    private Integer quantity;

    // No-arg constructor (required by JPA)
    public Product() {}

    // Full constructor
    public Product(String name, Double price, String description, Integer quantity) {
        this.name = name;
        this.price = price;
        this.description = description;
        this.quantity = quantity;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public Double getPrice() { return price; }
    public void setPrice(Double price) { this.price = price; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public Integer getQuantity() { return quantity; }
    public void setQuantity(Integer quantity) { this.quantity = quantity; }
}


// ############################################################
// #                                                          #
// #    LAYER 2: THE REPOSITORY (Data Access)                 #
// #    File: src/main/java/com/example/myapi/repository/     #
// #          ProductRepository.java                          #
// #                                                          #
// ############################################################

// package com.example.myapi.repository;

// import com.example.myapi.model.Product;
// import org.springframework.data.jpa.repository.JpaRepository;
// import org.springframework.stereotype.Repository;
// import java.util.List;

// @Repository
// public interface ProductRepository extends JpaRepository<Product, Long> {
//
//     // Spring auto-generates these query implementations:
//     List<Product> findByName(String name);
//     List<Product> findByPriceLessThan(Double price);
//     List<Product> findByNameContainingIgnoreCase(String name);
// }
//
// That's ALL you need. Spring creates the full implementation.
// findAll(), findById(), save(), deleteById() are inherited from JpaRepository.


// ############################################################
// #                                                          #
// #    LAYER 3: THE SERVICE (Business Logic)                 #
// #    File: src/main/java/com/example/myapi/service/        #
// #          ProductService.java                             #
// #                                                          #
// ############################################################

// package com.example.myapi.service;

// import com.example.myapi.model.Product;
// import com.example.myapi.repository.ProductRepository;
// import org.springframework.stereotype.Service;
// import java.util.List;

// @Service
// public class ProductService {
//
//     private final ProductRepository productRepository;
//
//     // Constructor Injection -- Spring injects ProductRepository automatically
//     public ProductService(ProductRepository productRepository) {
//         this.productRepository = productRepository;
//     }
//
//     // GET ALL
//     public List<Product> getAllProducts() {
//         return productRepository.findAll();
//     }
//
//     // GET BY ID
//     public Product getProductById(Long id) {
//         return productRepository.findById(id)
//                 .orElseThrow(() -> new RuntimeException("Product not found with id: " + id));
//     }
//
//     // CREATE
//     public Product createProduct(Product product) {
//         // Validation (business logic)
//         if (product.getPrice() < 0) {
//             throw new RuntimeException("Price cannot be negative");
//         }
//         return productRepository.save(product);
//     }
//
//     // UPDATE
//     public Product updateProduct(Long id, Product updatedProduct) {
//         Product existing = getProductById(id); // Throws if not found
//         existing.setName(updatedProduct.getName());
//         existing.setPrice(updatedProduct.getPrice());
//         existing.setDescription(updatedProduct.getDescription());
//         existing.setQuantity(updatedProduct.getQuantity());
//         return productRepository.save(existing);
//     }
//
//     // DELETE
//     public void deleteProduct(Long id) {
//         if (!productRepository.existsById(id)) {
//             throw new RuntimeException("Product not found with id: " + id);
//         }
//         productRepository.deleteById(id);
//     }
//
//     // SEARCH
//     public List<Product> searchByName(String name) {
//         return productRepository.findByNameContainingIgnoreCase(name);
//     }
// }


// ############################################################
// #                                                          #
// #    LAYER 4: THE CONTROLLER (HTTP Layer)                  #
// #    File: src/main/java/com/example/myapi/controller/     #
// #          ProductController.java                          #
// #                                                          #
// ############################################################

// package com.example.myapi.controller;

// import com.example.myapi.model.Product;
// import com.example.myapi.service.ProductService;
// import org.springframework.http.HttpStatus;
// import org.springframework.http.ResponseEntity;
// import org.springframework.web.bind.annotation.*;
// import java.util.List;

// @RestController
// @RequestMapping("/api/products")
// public class ProductController {
//
//     private final ProductService productService;
//
//     // Constructor Injection -- Spring injects ProductService automatically
//     public ProductController(ProductService productService) {
//         this.productService = productService;
//     }
//
//     // ---------------------------------------------------------
//     // GET ALL PRODUCTS
//     // ---------------------------------------------------------
//     // HTTP:     GET http://localhost:8080/api/products
//     // Response: 200 OK
//     //           [{"id":1,"name":"Laptop","price":999.99,...}, ...]
//     // ---------------------------------------------------------
//     @GetMapping
//     public List<Product> getAllProducts() {
//         return productService.getAllProducts();
//     }
//
//
//     // ---------------------------------------------------------
//     // GET ONE PRODUCT BY ID
//     // ---------------------------------------------------------
//     // HTTP:     GET http://localhost:8080/api/products/1
//     // Response: 200 OK
//     //           {"id":1,"name":"Laptop","price":999.99,...}
//     // ---------------------------------------------------------
//     @GetMapping("/{id}")
//     public Product getProductById(@PathVariable Long id) {
//         return productService.getProductById(id);
//     }
//
//
//     // ---------------------------------------------------------
//     // CREATE A NEW PRODUCT
//     // ---------------------------------------------------------
//     // HTTP:     POST http://localhost:8080/api/products
//     // Body:     {"name":"Laptop","price":999.99,"description":"Fast laptop","quantity":10}
//     // Response: 201 Created
//     //           {"id":1,"name":"Laptop","price":999.99,...}
//     // ---------------------------------------------------------
//     @PostMapping
//     public ResponseEntity<Product> createProduct(@RequestBody Product product) {
//         Product created = productService.createProduct(product);
//         return new ResponseEntity<>(created, HttpStatus.CREATED);
//     }
//
//
//     // ---------------------------------------------------------
//     // UPDATE AN EXISTING PRODUCT
//     // ---------------------------------------------------------
//     // HTTP:     PUT http://localhost:8080/api/products/1
//     // Body:     {"name":"Gaming Laptop","price":1299.99,...}
//     // Response: 200 OK
//     //           {"id":1,"name":"Gaming Laptop","price":1299.99,...}
//     // ---------------------------------------------------------
//     @PutMapping("/{id}")
//     public Product updateProduct(@PathVariable Long id, @RequestBody Product product) {
//         return productService.updateProduct(id, product);
//     }
//
//
//     // ---------------------------------------------------------
//     // DELETE A PRODUCT
//     // ---------------------------------------------------------
//     // HTTP:     DELETE http://localhost:8080/api/products/1
//     // Response: 204 No Content
//     // ---------------------------------------------------------
//     @DeleteMapping("/{id}")
//     public ResponseEntity<Void> deleteProduct(@PathVariable Long id) {
//         productService.deleteProduct(id);
//         return ResponseEntity.noContent().build();
//     }
//
//
//     // ---------------------------------------------------------
//     // SEARCH PRODUCTS BY NAME
//     // ---------------------------------------------------------
//     // HTTP:     GET http://localhost:8080/api/products/search?name=laptop
//     // Response: 200 OK
//     //           [{"id":1,"name":"Laptop","price":999.99,...}]
//     // ---------------------------------------------------------
//     @GetMapping("/search")
//     public List<Product> searchProducts(@RequestParam String name) {
//         return productService.searchByName(name);
//     }
// }


// ############################################################
// #                                                          #
// #    CONFIGURATION                                         #
// #    File: src/main/resources/application.properties       #
// #                                                          #
// ############################################################
//
// # Server port (default is 8080)
// server.port=8080
//
// # H2 in-memory database configuration (for development/testing)
// spring.datasource.url=jdbc:h2:mem:testdb
// spring.datasource.driverClassName=org.h2.Driver
// spring.datasource.username=sa
// spring.datasource.password=
//
// # JPA/Hibernate settings
// spring.jpa.database-platform=org.hibernate.dialect.H2Dialect
// spring.jpa.hibernate.ddl-auto=update
// # "update" means: create tables if they don't exist,
// #                 update them if the entity changes.
// # Other options: create, create-drop, validate, none
//
// # Show SQL queries in console (helpful for debugging)
// spring.jpa.show-sql=true
//
// # Enable H2 console (access at http://localhost:8080/h2-console)
// spring.h2.console.enabled=true


// ############################################################
// #                                                          #
// #    TESTING WITH CURL / POSTMAN                           #
// #                                                          #
// ############################################################

// ============================================================
//  After starting the application, you can test every endpoint.
//
//  TOOL 1: curl (command line)
//  TOOL 2: Postman (GUI application)
//  TOOL 3: Your browser (for GET requests only)
//
//  Here are the curl commands for each endpoint:
// ============================================================

// ---------------------------------------------------------
//  TEST 1: CREATE products (do this first to have data)
// ---------------------------------------------------------
//
//  curl -X POST http://localhost:8080/api/products \
//    -H "Content-Type: application/json" \
//    -d '{"name":"Laptop","price":999.99,"description":"Fast laptop","quantity":10}'
//
//  Expected Response (201 Created):
//  {
//    "id": 1,
//    "name": "Laptop",
//    "price": 999.99,
//    "description": "Fast laptop",
//    "quantity": 10
//  }
//
//  curl -X POST http://localhost:8080/api/products \
//    -H "Content-Type: application/json" \
//    -d '{"name":"Mouse","price":29.99,"description":"Wireless mouse","quantity":50}'
//
//  Expected Response (201 Created):
//  {
//    "id": 2,
//    "name": "Mouse",
//    "price": 29.99,
//    "description": "Wireless mouse",
//    "quantity": 50
//  }
//
//  curl -X POST http://localhost:8080/api/products \
//    -H "Content-Type: application/json" \
//    -d '{"name":"Keyboard","price":79.99,"description":"Mechanical keyboard","quantity":25}'
//
//  Expected Response (201 Created):
//  {
//    "id": 3,
//    "name": "Keyboard",
//    "price": 79.99,
//    "description": "Mechanical keyboard",
//    "quantity": 25
//  }

// ---------------------------------------------------------
//  TEST 2: GET all products
// ---------------------------------------------------------
//
//  curl http://localhost:8080/api/products
//
//  Expected Response (200 OK):
//  [
//    {
//      "id": 1,
//      "name": "Laptop",
//      "price": 999.99,
//      "description": "Fast laptop",
//      "quantity": 10
//    },
//    {
//      "id": 2,
//      "name": "Mouse",
//      "price": 29.99,
//      "description": "Wireless mouse",
//      "quantity": 50
//    },
//    {
//      "id": 3,
//      "name": "Keyboard",
//      "price": 79.99,
//      "description": "Mechanical keyboard",
//      "quantity": 25
//    }
//  ]

// ---------------------------------------------------------
//  TEST 3: GET one product by ID
// ---------------------------------------------------------
//
//  curl http://localhost:8080/api/products/1
//
//  Expected Response (200 OK):
//  {
//    "id": 1,
//    "name": "Laptop",
//    "price": 999.99,
//    "description": "Fast laptop",
//    "quantity": 10
//  }

// ---------------------------------------------------------
//  TEST 4: UPDATE a product
// ---------------------------------------------------------
//
//  curl -X PUT http://localhost:8080/api/products/1 \
//    -H "Content-Type: application/json" \
//    -d '{"name":"Gaming Laptop","price":1299.99,"description":"RGB gaming laptop","quantity":5}'
//
//  Expected Response (200 OK):
//  {
//    "id": 1,
//    "name": "Gaming Laptop",
//    "price": 1299.99,
//    "description": "RGB gaming laptop",
//    "quantity": 5
//  }

// ---------------------------------------------------------
//  TEST 5: SEARCH products by name
// ---------------------------------------------------------
//
//  curl "http://localhost:8080/api/products/search?name=lap"
//
//  Expected Response (200 OK):
//  [
//    {
//      "id": 1,
//      "name": "Gaming Laptop",
//      "price": 1299.99,
//      "description": "RGB gaming laptop",
//      "quantity": 5
//    }
//  ]

// ---------------------------------------------------------
//  TEST 6: DELETE a product
// ---------------------------------------------------------
//
//  curl -X DELETE http://localhost:8080/api/products/2
//
//  Expected Response: 204 No Content (empty body)
//
//  Verify it's gone:
//  curl http://localhost:8080/api/products
//  (Mouse should no longer appear)


// ############################################################
// #                                                          #
// #    JSON SERIALIZATION / DESERIALIZATION EXPLAINED         #
// #                                                          #
// ############################################################

// ============================================================
//  SERIALIZATION = Java Object --> JSON string
//  (Happens when you RETURN data from the API)
//
//  Your Java object:
//    Product { id=1, name="Laptop", price=999.99 }
//
//  Gets automatically converted to JSON:
//    {"id":1,"name":"Laptop","price":999.99}
//
//  Spring uses a library called Jackson to do this.
//  Jackson reads the getter methods and builds JSON.
//    getId()          --> "id": 1
//    getName()        --> "name": "Laptop"
//    getPrice()       --> "price": 999.99
//
//  This is why you NEED getter methods in your entity.
//
// ============================================================
//
//  DESERIALIZATION = JSON string --> Java Object
//  (Happens when you RECEIVE data in the API, i.e., @RequestBody)
//
//  Client sends JSON:
//    {"name":"Laptop","price":999.99}
//
//  Spring/Jackson converts it to a Java object:
//    Product { id=null, name="Laptop", price=999.99 }
//
//  Jackson uses the setter methods:
//    setName("Laptop")
//    setPrice(999.99)
//
//  This is why you NEED setter methods and a no-arg constructor.
//
// ============================================================
//
//  In Express.js:
//    app.use(express.json());  // You had to add this middleware
//    req.body                  // Then you can access JSON
//
//  In Spring Boot:
//    (Automatic!)              // Jackson is included by default
//    @RequestBody Product p    // Just use this annotation
//
// ============================================================


// ############################################################
// #                                                          #
// #    ERROR HANDLING (BONUS)                                #
// #                                                          #
// ############################################################

// ============================================================
//  Right now, if a product is not found, we throw RuntimeException.
//  The client would get a 500 Internal Server Error.
//
//  In a real app, you'd use proper exception handling:
//
//  STEP 1: Create a custom exception
//  ----------------------------------
//
//  @ResponseStatus(HttpStatus.NOT_FOUND)
//  public class ResourceNotFoundException extends RuntimeException {
//      public ResourceNotFoundException(String message) {
//          super(message);
//      }
//  }
//
//  STEP 2: Use it in the Service
//  ------------------------------
//
//  public Product getProductById(Long id) {
//      return productRepository.findById(id)
//          .orElseThrow(() -> new ResourceNotFoundException("Product not found with id: " + id));
//  }
//
//  Now the client gets a 404 Not Found instead of 500.
//
//  STEP 3 (ADVANCED): Global exception handler
//  ---------------------------------------------
//
//  @ControllerAdvice
//  public class GlobalExceptionHandler {
//
//      @ExceptionHandler(ResourceNotFoundException.class)
//      public ResponseEntity<Map<String, String>> handleNotFound(ResourceNotFoundException ex) {
//          Map<String, String> error = new HashMap<>();
//          error.put("error", ex.getMessage());
//          return new ResponseEntity<>(error, HttpStatus.NOT_FOUND);
//      }
//
//      @ExceptionHandler(Exception.class)
//      public ResponseEntity<Map<String, String>> handleGeneral(Exception ex) {
//          Map<String, String> error = new HashMap<>();
//          error.put("error", "Something went wrong");
//          return new ResponseEntity<>(error, HttpStatus.INTERNAL_SERVER_ERROR);
//      }
//  }
//
//  This catches exceptions from ALL controllers in one place.
//  @ControllerAdvice = "advice for all controllers"
//
// ============================================================


// ############################################################
// #                                                          #
// #    QUICK REFERENCE CHEAT SHEET                           #
// #                                                          #
// ############################################################

// ============================================================
//
//  ANNOTATIONS CHEAT SHEET:
//  -------------------------
//  @SpringBootApplication  -- Main class entry point
//  @RestController         -- REST API controller (returns JSON)
//  @RequestMapping("/url") -- Base URL for controller
//  @GetMapping             -- Handle GET requests
//  @PostMapping            -- Handle POST requests
//  @PutMapping             -- Handle PUT requests
//  @DeleteMapping          -- Handle DELETE requests
//  @PathVariable           -- Get value from URL path
//  @RequestBody            -- Get data from request body
//  @RequestParam           -- Get query parameter
//  @Service                -- Business logic class
//  @Repository             -- Database access interface
//  @Entity                 -- Database table class
//  @Id                     -- Primary key field
//  @GeneratedValue         -- Auto-generate primary key
//  @Autowired              -- Inject dependency (prefer constructor)
//
//  STATUS CODES CHEAT SHEET:
//  -------------------------
//  200 OK           -- GET or PUT succeeded
//  201 Created      -- POST succeeded (new resource created)
//  204 No Content   -- DELETE succeeded
//  400 Bad Request  -- Client sent bad data
//  404 Not Found    -- Resource doesn't exist
//  500 Server Error -- Something crashed on the server
//
//  LAYER RESPONSIBILITIES:
//  -----------------------
//  Controller  -- HTTP requests/responses, URL routing
//  Service     -- Business logic, validation, rules
//  Repository  -- Database operations (CRUD)
//  Entity      -- Data structure (maps to DB table)
//
// ============================================================
