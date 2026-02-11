// ============================================================
//  03: THE SERVICE LAYER IN SPRING BOOT
// ============================================================
//
//  The Service layer contains your BUSINESS LOGIC.
//  It sits between the Controller and the Repository.
//
//  Controller  -->  Service  -->  Repository  -->  Database
//   (HTTP)        (Logic)       (Data access)     (Storage)
//
//  This is the SAME concept as Angular Services.
//  If you've seen Angular's @Injectable(), Spring's @Service
//  does the same thing.
//
//  NOTE: This is a TEACHING FILE with heavy comments.
//
// ============================================================


// ============================================================
//  PART 1: WHY DO WE NEED A SERVICE LAYER?
// ============================================================
//
//  Imagine you have this in your Controller:
//
//  @PostMapping
//  public Product createProduct(@RequestBody Product product) {
//      // Validate the product
//      if (product.getPrice() < 0) throw new Exception("Bad price");
//      // Check if product name already exists
//      if (repository.findByName(product.getName()) != null) throw new Exception("Duplicate");
//      // Calculate tax
//      product.setTax(product.getPrice() * 0.08);
//      // Save to database
//      return repository.save(product);
//  }
//
//  The problem? The Controller is doing TOO MUCH.
//  It handles HTTP AND business logic AND validation.
//
//  What if you need the same logic in a different controller?
//  You'd have to copy-paste it. That's bad.
//
//  SOLUTION: Move the logic to a Service class.
//
//  Controller:  "I received a POST request with this data"
//  Service:     "Let me validate it, apply business rules, and process it"
//  Repository:  "Let me save it to the database"
//
//  EACH CLASS HAS ONE JOB. This is called "Separation of Concerns."
//
// ============================================================


// ============================================================
//  PART 2: CREATING A SERVICE CLASS
// ============================================================

package com.example.myapi.service;

import com.example.myapi.model.Product;
import com.example.myapi.repository.ProductRepository;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

// ------------------------------------------------------------
//  @Service
// ------------------------------------------------------------
//  This annotation tells Spring:
//  "This class contains business logic. Please manage it for me."
//
//  What "manage it" means:
//  Spring creates ONE instance of this class when the app starts
//  and keeps it in memory. When a Controller needs it, Spring
//  gives the Controller that instance. This is called a "bean."
//
//  ANGULAR COMPARISON:
//  -------------------
//  Angular:      @Injectable({ providedIn: 'root' })
//  Spring Boot:  @Service
//
//  Both mean: "Create one instance, share it everywhere"
//  Both enable: Dependency Injection
//
// ------------------------------------------------------------

@Service
public class ProductService {

    // --------------------------------------------------------
    //  DEPENDENCY INJECTION
    // --------------------------------------------------------
    //
    //  This is a CRITICAL interview concept.
    //
    //  Dependency Injection (DI) = Instead of a class creating
    //  its own dependencies, they are "injected" (given to it)
    //  from the outside.
    //
    //  WITHOUT Dependency Injection (BAD):
    //  -----------------------------------
    //  public class ProductService {
    //      private ProductRepository repo = new ProductRepository();
    //      // Problem: Tightly coupled, hard to test, hard to change
    //  }
    //
    //  WITH Dependency Injection (GOOD):
    //  ---------------------------------
    //  public class ProductService {
    //      private final ProductRepository repo;
    //
    //      // Spring creates the repo and passes it here
    //      public ProductService(ProductRepository repo) {
    //          this.repo = repo;
    //      }
    //  }
    //
    //  WHY IS DI GOOD?
    //  - Loose coupling: Service doesn't know HOW the repo is created
    //  - Easy testing: In tests, you can pass a fake/mock repo
    //  - Flexible: You can swap implementations without changing code
    //
    //  ANGULAR COMPARISON:
    //  -------------------
    //  Angular:
    //    constructor(private productService: ProductService) { }
    //
    //  Spring Boot:
    //    public ProductService(ProductRepository productRepository) {
    //        this.productRepository = productRepository;
    //    }
    //
    //  EXACT SAME CONCEPT. The framework gives you the dependency.
    //  You never call "new ProductRepository()" yourself.
    //
    // --------------------------------------------------------

    private final ProductRepository productRepository;

    // CONSTRUCTOR INJECTION (recommended way in Spring Boot)
    // Spring sees this constructor, finds a ProductRepository bean,
    // and passes it in automatically.
    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    // --------------------------------------------------------
    //  ALTERNATIVE: @Autowired
    // --------------------------------------------------------
    //
    //  You might see this older style in code:
    //
    //  @Autowired
    //  private ProductRepository productRepository;
    //
    //  @Autowired tells Spring to inject the dependency.
    //  It works, but CONSTRUCTOR INJECTION is the recommended way.
    //
    //  WHY?
    //  - Constructor injection makes dependencies obvious
    //  - Fields can be "final" (immutable = safer)
    //  - Easier to test (just pass mocks to constructor)
    //
    //  INTERVIEW TIP: If asked "What is @Autowired?", say:
    //  "It's an annotation that tells Spring to inject a dependency.
    //   But constructor injection is now the recommended approach
    //   because it makes dependencies explicit and supports
    //   immutability with final fields."
    //
    // --------------------------------------------------------


    // ========================================================
    //  SERVICE METHODS
    // ========================================================
    //  These are the methods the Controller will call.
    //  They contain the business logic.
    //  They call the Repository for database operations.
    // ========================================================


    // --- GET ALL PRODUCTS ---
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }


    // --- GET ONE PRODUCT BY ID ---
    public Product getProductById(Long id) {
        // findById returns Optional<Product>
        // Optional is Java's way of handling "might be null"
        // orElseThrow() means: if not found, throw an exception
        return productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found with id: " + id));
    }

    //  WHAT IS Optional<Product>?
    //  --------------------------
    //  Optional is a container that may or may not hold a value.
    //  It forces you to handle the "not found" case.
    //
    //  Instead of returning null (which can cause NullPointerException),
    //  the repository returns Optional.
    //
    //  You then decide what to do:
    //    .orElseThrow()   -- throw exception if not found
    //    .orElse(default) -- return a default value if not found
    //    .isPresent()     -- check if value exists
    //    .get()           -- get the value (unsafe, avoid this)


    // --- CREATE A PRODUCT ---
    public Product createProduct(Product product) {
        // BUSINESS LOGIC: Validate the product before saving
        if (product.getPrice() == null || product.getPrice() < 0) {
            throw new RuntimeException("Price must be a positive number");
        }
        if (product.getName() == null || product.getName().isEmpty()) {
            throw new RuntimeException("Product name is required");
        }

        // Business rule: Set default quantity to 0 if not provided
        if (product.getQuantity() == null) {
            product.setQuantity(0);
        }

        // Save to database and return the saved product (with generated id)
        return productRepository.save(product);
    }


    // --- UPDATE A PRODUCT ---
    public Product updateProduct(Long id, Product updatedProduct) {
        // Step 1: Check if the product exists
        Product existingProduct = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found with id: " + id));

        // Step 2: Update the fields
        existingProduct.setName(updatedProduct.getName());
        existingProduct.setPrice(updatedProduct.getPrice());
        existingProduct.setDescription(updatedProduct.getDescription());
        existingProduct.setQuantity(updatedProduct.getQuantity());

        // Step 3: Save the updated product
        // When you call save() on an entity that already has an id,
        // JPA knows to UPDATE instead of INSERT.
        return productRepository.save(existingProduct);
    }


    // --- DELETE A PRODUCT ---
    public void deleteProduct(Long id) {
        // Check if exists first
        if (!productRepository.existsById(id)) {
            throw new RuntimeException("Product not found with id: " + id);
        }
        productRepository.deleteById(id);
    }


    // --- CUSTOM BUSINESS LOGIC EXAMPLES ---

    // Find products under a certain price
    public List<Product> getAffordableProducts(Double maxPrice) {
        return productRepository.findByPriceLessThan(maxPrice);
    }

    // Check if a product is in stock
    public boolean isInStock(Long id) {
        Product product = getProductById(id);
        return product.getQuantity() > 0;
    }
}


// ============================================================
//  PART 3: HOW THE CONTROLLER USES THE SERVICE
// ============================================================
//
//  Now the Controller becomes simple and clean:
//
//  @RestController
//  @RequestMapping("/api/products")
//  public class ProductController {
//
//      private final ProductService productService;
//
//      // Constructor injection -- Spring injects ProductService
//      public ProductController(ProductService productService) {
//          this.productService = productService;
//      }
//
//      @GetMapping
//      public List<Product> getAllProducts() {
//          return productService.getAllProducts();
//          // Controller just delegates to service.
//          // No business logic here!
//      }
//
//      @PostMapping
//      public ResponseEntity<Product> createProduct(@RequestBody Product product) {
//          Product created = productService.createProduct(product);
//          return new ResponseEntity<>(created, HttpStatus.CREATED);
//          // Validation and business rules are in the service.
//          // Controller only handles HTTP concerns.
//      }
//  }
//
//  SEE HOW CLEAN THAT IS?
//  The Controller is just 2-3 lines per method.
//  All the logic is in the Service.
//
// ============================================================


// ============================================================
//  PART 4: THE FLOW VISUALIZED
// ============================================================
//
//  Let's trace a POST request to create a product:
//
//  1. Client sends:
//     POST /api/products
//     Body: { "name": "Laptop", "price": 999.99 }
//
//  2. CONTROLLER receives it:
//     @PostMapping
//     createProduct(@RequestBody Product product)
//     --> Calls productService.createProduct(product)
//
//  3. SERVICE processes it:
//     createProduct(product)
//     --> Validates: Is price positive? Yes.
//     --> Validates: Is name provided? Yes.
//     --> Sets default quantity to 0
//     --> Calls productRepository.save(product)
//
//  4. REPOSITORY saves it:
//     save(product)
//     --> Generates SQL: INSERT INTO products (name, price, ...) VALUES (...)
//     --> Returns the saved product with generated id
//
//  5. Response goes back up the chain:
//     Repository --> Service --> Controller --> Client
//     Client receives: { "id": 1, "name": "Laptop", "price": 999.99, "quantity": 0 }
//
// ============================================================


// ============================================================
//  PART 5: COMMON INTERVIEW QUESTIONS ABOUT SERVICES
// ============================================================
//
//  Q: What is the Service layer?
//  A: The Service layer contains business logic. It sits between
//     the Controller (which handles HTTP) and the Repository
//     (which handles the database). It processes data, applies
//     business rules, and coordinates operations.
//
//  Q: Why separate Controller and Service?
//  A: Separation of concerns. The Controller handles HTTP
//     requests/responses. The Service handles business logic.
//     This makes code more organized, reusable, and testable.
//
//  Q: What is Dependency Injection?
//  A: Dependency Injection is a design pattern where an object
//     receives its dependencies from an external source rather
//     than creating them itself. In Spring, the framework
//     creates and injects the dependencies automatically.
//     This makes code loosely coupled and easier to test.
//
//  Q: What is the difference between @Autowired and constructor injection?
//  A: Both achieve dependency injection. @Autowired on a field
//     injects directly. Constructor injection passes dependencies
//     through the constructor. Constructor injection is preferred
//     because it supports immutability (final fields) and makes
//     dependencies explicit.
//
//  Q: What is a Spring Bean?
//  A: A bean is an object that Spring creates and manages.
//     Any class annotated with @Service, @Controller, @Repository,
//     or @Component becomes a bean. Spring creates it once and
//     shares it wherever it's needed (this is called Singleton scope).
//
// ============================================================
