// ============================================================
//  02: REST CONTROLLERS IN SPRING BOOT
// ============================================================
//
//  This file teaches you how to create API endpoints.
//  This is the MOST IMPORTANT file for interview preparation.
//  Controllers are what interviewers ask about most.
//
//  NOTE: This is a TEACHING FILE with heavy comments.
//  In real code, you would not have this many comments.
//  This file won't compile as-is (it's for learning).
//
// ============================================================


// ============================================================
//  PART 1: WHAT IS A REST API?
// ============================================================
//
//  REST API = A way for programs to talk to each other over HTTP
//
//  Your frontend (Angular/React) sends HTTP requests to your backend.
//  Your backend processes them and sends back data (usually JSON).
//
//  The 4 main HTTP methods (called CRUD operations):
//
//  +--------+----------+---------------------------+
//  | Method | Action   | Example                   |
//  +--------+----------+---------------------------+
//  | GET    | READ     | Get all products          |
//  | POST   | CREATE   | Add a new product         |
//  | PUT    | UPDATE   | Change a product's price  |
//  | DELETE | DELETE   | Remove a product          |
//  +--------+----------+---------------------------+
//
//  This is the SAME for Express.js, Spring Boot, Django, etc.
//  The HTTP methods are universal.
//
// ============================================================


// ============================================================
//  PART 2: YOUR FIRST CONTROLLER
// ============================================================

package com.example.myapi.controller;

// These are the imports you need. Don't memorize them,
// your IDE (IntelliJ) will auto-import them for you.
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import java.util.List;
import java.util.ArrayList;

// ------------------------------------------------------------
//  @RestController
// ------------------------------------------------------------
//  This annotation tells Spring: "This class handles HTTP requests
//  and returns data (usually JSON) in the response body."
//
//  Without this annotation, Spring does not know this class
//  is supposed to handle web requests. It would just be a
//  regular Java class that does nothing.
//
//  INTERVIEW TIP: @RestController = @Controller + @ResponseBody
//    - @Controller alone returns HTML views (like server-side rendering)
//    - @ResponseBody means "return data, not an HTML page"
//    - @RestController combines both = "return JSON data"
//
// ------------------------------------------------------------

// ------------------------------------------------------------
//  @RequestMapping("/api/products")
// ------------------------------------------------------------
//  This sets the BASE URL for ALL endpoints in this controller.
//  Every endpoint URL will START with /api/products
//
//  So if you have @GetMapping("/{id}"), the full URL is:
//  GET /api/products/{id}
//
// ------------------------------------------------------------

@RestController
@RequestMapping("/api/products")
public class ProductController {

    // In a real app, this would be a Service (we'll learn that in 03_Service.java)
    // For now, we use a simple list to store products in memory
    private List<Product> products = new ArrayList<>();


    // ========================================================
    //  GET ALL PRODUCTS
    // ========================================================
    //
    //  HTTP Request:  GET /api/products
    //  What it does:  Returns a list of all products
    //  Returns:       JSON array of products
    //
    //  Express.js equivalent:
    //  ----------------------
    //  app.get("/api/products", (req, res) => {
    //      res.json(products);
    //  });
    //
    //  Spring Boot version:
    //  --------------------

    @GetMapping                         // Handles GET /api/products
    public List<Product> getAllProducts() {
        return products;                // Spring automatically converts to JSON!
    }

    //  KEY POINT: You do NOT need to call res.json() like in Express.
    //  Spring Boot automatically converts the return value to JSON.
    //  This is called "serialization" -- turning a Java object into JSON.


    // ========================================================
    //  GET ONE PRODUCT BY ID
    // ========================================================
    //
    //  HTTP Request:  GET /api/products/5
    //  What it does:  Returns a single product with id = 5
    //  Returns:       JSON object of one product
    //
    //  Express.js equivalent:
    //  ----------------------
    //  app.get("/api/products/:id", (req, res) => {
    //      const id = req.params.id;       // Get id from URL
    //      const product = products.find(p => p.id === id);
    //      res.json(product);
    //  });
    //
    //  Spring Boot version:
    //  --------------------

    @GetMapping("/{id}")                // Handles GET /api/products/{id}
    public Product getProductById(
            @PathVariable Long id       // @PathVariable extracts {id} from the URL
    ) {
        // Find the product with matching id
        return products.stream()
                .filter(p -> p.getId().equals(id))
                .findFirst()
                .orElse(null);
    }

    //  @PathVariable explained:
    //  -------------------------
    //  URL:    /api/products/5
    //                        ^
    //                        |
    //  @PathVariable grabs this value and puts it in the 'id' parameter
    //
    //  Express.js:  req.params.id
    //  Spring Boot: @PathVariable Long id
    //
    //  The {id} in the URL pattern MUST match the parameter name (or use
    //  @PathVariable("id") if names differ).


    // ========================================================
    //  CREATE A NEW PRODUCT
    // ========================================================
    //
    //  HTTP Request:  POST /api/products
    //  Request Body:  { "name": "Laptop", "price": 999.99 }
    //  What it does:  Creates a new product
    //  Returns:       The created product (with its new id)
    //
    //  Express.js equivalent:
    //  ----------------------
    //  app.post("/api/products", (req, res) => {
    //      const product = req.body;       // Get data from request body
    //      products.push(product);
    //      res.status(201).json(product);
    //  });
    //
    //  Spring Boot version:
    //  --------------------

    @PostMapping                        // Handles POST /api/products
    public ResponseEntity<Product> createProduct(
            @RequestBody Product product // @RequestBody reads JSON from request body
    ) {
        products.add(product);

        // ResponseEntity lets you set the HTTP status code
        // 201 = Created (standard for POST that creates something)
        return new ResponseEntity<>(product, HttpStatus.CREATED);
    }

    //  @RequestBody explained:
    //  -----------------------
    //  When the client sends JSON in the request body:
    //  { "name": "Laptop", "price": 999.99 }
    //
    //  @RequestBody tells Spring: "Take that JSON and convert it
    //  into a Product Java object."
    //
    //  This is called "deserialization" -- turning JSON into a Java object.
    //
    //  Express.js:  req.body       (after app.use(express.json()))
    //  Spring Boot: @RequestBody   (automatic, no middleware needed)
    //
    //  ResponseEntity explained:
    //  -------------------------
    //  ResponseEntity lets you control:
    //  - The response body (the data you return)
    //  - The HTTP status code (200, 201, 404, etc.)
    //  - Response headers (if needed)
    //
    //  If you just return a plain object (like getAllProducts does),
    //  Spring returns 200 OK by default.
    //  Use ResponseEntity when you need a different status code.


    // ========================================================
    //  UPDATE A PRODUCT
    // ========================================================
    //
    //  HTTP Request:  PUT /api/products/5
    //  Request Body:  { "name": "Gaming Laptop", "price": 1299.99 }
    //  What it does:  Updates product with id = 5
    //  Returns:       The updated product
    //
    //  Express.js equivalent:
    //  ----------------------
    //  app.put("/api/products/:id", (req, res) => {
    //      const id = req.params.id;
    //      const updatedData = req.body;
    //      // ... find and update ...
    //      res.json(updatedProduct);
    //  });
    //
    //  Spring Boot version:
    //  --------------------

    @PutMapping("/{id}")                // Handles PUT /api/products/{id}
    public Product updateProduct(
            @PathVariable Long id,           // Get id from URL
            @RequestBody Product updatedProduct  // Get new data from body
    ) {
        // Find the existing product and update it
        for (int i = 0; i < products.size(); i++) {
            if (products.get(i).getId().equals(id)) {
                updatedProduct.setId(id);    // Keep the same id
                products.set(i, updatedProduct);
                return updatedProduct;
            }
        }
        return null; // Not found (in real app, throw an exception)
    }

    //  NOTICE: @PutMapping uses BOTH @PathVariable AND @RequestBody.
    //  - @PathVariable gets the id from the URL (WHICH product to update)
    //  - @RequestBody gets the new data from the body (WHAT to update)


    // ========================================================
    //  DELETE A PRODUCT
    // ========================================================
    //
    //  HTTP Request:  DELETE /api/products/5
    //  What it does:  Deletes product with id = 5
    //  Returns:       Nothing (204 No Content)
    //
    //  Express.js equivalent:
    //  ----------------------
    //  app.delete("/api/products/:id", (req, res) => {
    //      const id = req.params.id;
    //      products = products.filter(p => p.id !== id);
    //      res.status(204).send();
    //  });
    //
    //  Spring Boot version:
    //  --------------------

    @DeleteMapping("/{id}")             // Handles DELETE /api/products/{id}
    public ResponseEntity<Void> deleteProduct(
            @PathVariable Long id            // Get id from URL
    ) {
        products.removeIf(p -> p.getId().equals(id));

        // 204 = No Content (standard for successful delete)
        return ResponseEntity.noContent().build();
    }


    // ========================================================
    //  BONUS: QUERY PARAMETERS
    // ========================================================
    //
    //  URL: GET /api/products/search?name=laptop&maxPrice=1000
    //
    //  Query parameters are the key=value pairs after the ? in a URL.
    //
    //  Express.js:  req.query.name, req.query.maxPrice
    //  Spring Boot: @RequestParam
    //

    @GetMapping("/search")
    public List<Product> searchProducts(
            @RequestParam String name,                    // Required parameter
            @RequestParam(required = false) Double maxPrice  // Optional parameter
    ) {
        // Filter products by name and optional max price
        return products.stream()
                .filter(p -> p.getName().toLowerCase().contains(name.toLowerCase()))
                .filter(p -> maxPrice == null || p.getPrice() <= maxPrice)
                .toList();
    }

    //  @RequestParam vs @PathVariable:
    //  --------------------------------
    //  @PathVariable = part of the URL path
    //    /api/products/5         --> @PathVariable Long id = 5
    //
    //  @RequestParam = query parameter after ?
    //    /api/products?name=laptop  --> @RequestParam String name = "laptop"
    //
    //  INTERVIEW TIP: Interviewers LOVE asking the difference between these two.
}


// ============================================================
//  PART 3: SUMMARY -- SIDE BY SIDE COMPARISON
// ============================================================
//
//  +------------------+------------------------------------------+--------------------------------------------+
//  | Operation        | Express.js                               | Spring Boot                                |
//  +------------------+------------------------------------------+--------------------------------------------+
//  | GET all          | app.get("/products", handler)             | @GetMapping                                |
//  | GET one          | app.get("/products/:id", handler)         | @GetMapping("/{id}")                       |
//  | POST             | app.post("/products", handler)            | @PostMapping                               |
//  | PUT              | app.put("/products/:id", handler)         | @PutMapping("/{id}")                       |
//  | DELETE           | app.delete("/products/:id", handler)      | @DeleteMapping("/{id}")                    |
//  | URL param        | req.params.id                            | @PathVariable Long id                      |
//  | Request body     | req.body                                 | @RequestBody Product product               |
//  | Query param      | req.query.name                           | @RequestParam String name                  |
//  | Set status       | res.status(201)                          | ResponseEntity + HttpStatus.CREATED        |
//  | Return JSON      | res.json(data)                           | Just return the object (automatic)         |
//  +------------------+------------------------------------------+--------------------------------------------+
//
// ============================================================


// ============================================================
//  PART 4: COMMON INTERVIEW QUESTIONS ABOUT CONTROLLERS
// ============================================================
//
//  Q: What is @RestController?
//  A: It marks a class as a REST API controller. It combines
//     @Controller and @ResponseBody, meaning it handles HTTP
//     requests and returns data (JSON) instead of HTML views.
//
//  Q: What is the difference between @Controller and @RestController?
//  A: @Controller returns views (HTML pages).
//     @RestController returns data (JSON/XML).
//     @RestController = @Controller + @ResponseBody
//
//  Q: What is the difference between @PathVariable and @RequestParam?
//  A: @PathVariable extracts from URL path: /products/{id}
//     @RequestParam extracts from query string: /products?name=laptop
//
//  Q: What is @RequestBody?
//  A: It tells Spring to deserialize (convert) the JSON from the
//     HTTP request body into a Java object.
//
//  Q: What is ResponseEntity?
//  A: A class that lets you control the full HTTP response:
//     the body, status code, and headers.
//
//  Q: What HTTP status codes should you use?
//  A: 200 OK         -- Successful GET or PUT
//     201 Created     -- Successful POST (created new resource)
//     204 No Content  -- Successful DELETE
//     400 Bad Request -- Client sent invalid data
//     404 Not Found   -- Resource doesn't exist
//     500 Internal Server Error -- Something broke on the server
//
// ============================================================
