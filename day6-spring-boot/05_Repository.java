// ============================================================
//  05: REPOSITORIES IN SPRING BOOT
// ============================================================
//
//  The Repository layer handles ALL database operations.
//  It is the ONLY layer that talks to the database.
//
//  The magic of Spring Data JPA:
//  You write an INTERFACE (not a class), and Spring
//  AUTOMATICALLY creates the implementation for you.
//
//  You never write SQL. You never implement the methods.
//  Spring does it all.
//
//  NOTE: This is a TEACHING FILE with heavy comments.
//
// ============================================================


// ============================================================
//  PART 1: WHAT IS A REPOSITORY?
// ============================================================
//
//  A Repository is a pattern for data access.
//  It provides methods to:
//    - Find data (SELECT)
//    - Save data (INSERT / UPDATE)
//    - Delete data (DELETE)
//
//  COMPARISON TO PRISMA (from your Express.js project):
//  ----------------------------------------------------
//
//  Prisma:
//    const products = await prisma.product.findMany();
//    const product = await prisma.product.findUnique({ where: { id } });
//    const newProduct = await prisma.product.create({ data: productData });
//    await prisma.product.delete({ where: { id } });
//
//  Spring Data JPA:
//    List<Product> products = productRepository.findAll();
//    Optional<Product> product = productRepository.findById(id);
//    Product newProduct = productRepository.save(product);
//    productRepository.deleteById(id);
//
//  Same operations, different syntax. Both abstract away the
//  raw SQL so you never write it yourself.
//
// ============================================================


// ============================================================
//  PART 2: CREATING A REPOSITORY
// ============================================================

package com.example.myapi.repository;

import com.example.myapi.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

// ------------------------------------------------------------
//  @Repository (optional but good practice)
// ------------------------------------------------------------
//  This annotation marks this interface as a data access
//  component. Spring automatically detects it.
//
//  Actually, if you extend JpaRepository, you don't NEED
//  @Repository -- Spring detects it anyway. But adding it
//  makes the code clearer and is considered good practice.
//
// ------------------------------------------------------------

// ------------------------------------------------------------
//  JpaRepository<Product, Long>
// ------------------------------------------------------------
//  This is the KEY part. By extending JpaRepository, you get
//  a TON of database methods for FREE.
//
//  The two types in the angle brackets:
//    Product = the Entity class this repository manages
//    Long    = the type of the entity's primary key (@Id field)
//
//  So JpaRepository<Product, Long> means:
//  "A repository for Product entities with Long ids"
//
// ------------------------------------------------------------

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

    // ========================================================
    //  THAT'S IT. SERIOUSLY.
    // ========================================================
    //
    //  By writing this ONE interface with ZERO methods,
    //  you already get ALL of these methods for free:
    //
    //  +------------------------------------+-------------------------------------------+
    //  | Method                             | What it does                              |
    //  +------------------------------------+-------------------------------------------+
    //  | findAll()                          | Get ALL products from the database        |
    //  | findById(Long id)                  | Get ONE product by its id                 |
    //  | save(Product product)              | INSERT a new product or UPDATE existing   |
    //  | deleteById(Long id)                | DELETE a product by its id                |
    //  | existsById(Long id)                | Check if a product exists (returns bool)  |
    //  | count()                            | Count total number of products            |
    //  | findAll(Sort sort)                 | Get all products, sorted                  |
    //  | findAll(Pageable pageable)         | Get products with pagination              |
    //  | saveAll(List<Product> products)     | Save multiple products at once            |
    //  | deleteAll()                        | Delete all products                       |
    //  +------------------------------------+-------------------------------------------+
    //
    //  HOW IS THIS POSSIBLE?
    //  Spring Data JPA uses the JpaRepository interface as a blueprint.
    //  At runtime, it creates a PROXY class that implements all these methods.
    //  It generates the SQL queries automatically based on your Entity class.
    //
    //  You never write: SELECT * FROM products WHERE id = ?
    //  Spring writes it for you when you call findById(id).
    //
    // ========================================================


    // ========================================================
    //  CUSTOM QUERY METHODS (Derived Queries)
    // ========================================================
    //
    //  The magic doesn't stop there. You can define CUSTOM
    //  queries just by writing method names that follow a pattern.
    //
    //  Spring reads the method name and creates the SQL automatically.
    //  This is called "Derived Query Methods."
    //
    //  Pattern: findBy + FieldName + Condition
    //
    // ========================================================

    // Find all products with a specific name
    // SQL: SELECT * FROM products WHERE name = ?
    List<Product> findByName(String name);

    // Find all products with price less than a value
    // SQL: SELECT * FROM products WHERE price < ?
    List<Product> findByPriceLessThan(Double price);

    // Find all products with price greater than a value
    // SQL: SELECT * FROM products WHERE price > ?
    List<Product> findByPriceGreaterThan(Double price);

    // Find all products with price between two values
    // SQL: SELECT * FROM products WHERE price BETWEEN ? AND ?
    List<Product> findByPriceBetween(Double minPrice, Double maxPrice);

    // Find all products whose name contains a string (case-insensitive)
    // SQL: SELECT * FROM products WHERE LOWER(name) LIKE LOWER('%?%')
    List<Product> findByNameContainingIgnoreCase(String name);

    // Find all products with quantity greater than zero
    // SQL: SELECT * FROM products WHERE quantity > ?
    List<Product> findByQuantityGreaterThan(Integer quantity);

    // Find products ordered by price ascending
    // SQL: SELECT * FROM products ORDER BY price ASC
    List<Product> findAllByOrderByPriceAsc();

    // Find products ordered by price descending
    // SQL: SELECT * FROM products ORDER BY price DESC
    List<Product> findAllByOrderByPriceDesc();

    // Combine multiple conditions with And
    // SQL: SELECT * FROM products WHERE name = ? AND price < ?
    List<Product> findByNameAndPriceLessThan(String name, Double price);

    // Combine conditions with Or
    // SQL: SELECT * FROM products WHERE price < ? OR quantity > ?
    List<Product> findByPriceLessThanOrQuantityGreaterThan(Double price, Integer quantity);


    // ========================================================
    //  HOW METHOD NAME PARSING WORKS
    // ========================================================
    //
    //  Spring reads your method name and breaks it into parts:
    //
    //  findByNameContainingIgnoreCase
    //  |    |   |          |
    //  |    |   |          +-- Modifier: case-insensitive
    //  |    |   +-- Condition: contains (LIKE %...%)
    //  |    +-- Field name: "name" field in Product
    //  +-- Action: find (SELECT)
    //
    //  Available keywords:
    //
    //  Keyword              | SQL Equivalent
    //  ---------------------+------------------
    //  findBy               | SELECT ... WHERE
    //  countBy              | SELECT COUNT(*) WHERE
    //  deleteBy             | DELETE ... WHERE
    //  existsBy             | SELECT EXISTS WHERE
    //  And                  | AND
    //  Or                   | OR
    //  Is, Equals           | = (equal)
    //  IsNot, Not           | <> (not equal)
    //  LessThan             | <
    //  LessThanEqual        | <=
    //  GreaterThan          | >
    //  GreaterThanEqual     | >=
    //  Between              | BETWEEN x AND y
    //  Like                 | LIKE
    //  Containing           | LIKE %...%
    //  StartingWith         | LIKE ...%
    //  EndingWith           | LIKE %...
    //  IgnoreCase           | LOWER(field)
    //  IsNull               | IS NULL
    //  IsNotNull            | IS NOT NULL
    //  OrderBy...Asc        | ORDER BY ... ASC
    //  OrderBy...Desc       | ORDER BY ... DESC
    //  In                   | IN (...)
    //  True                 | = TRUE
    //  False                | = FALSE
    //
    // ========================================================
}


// ============================================================
//  PART 3: COMPARISON TABLE
// ============================================================
//
//  +----------------------+----------------------------------+-------------------------------------+
//  | Operation            | Prisma (Express.js)              | Spring Data JPA                     |
//  +----------------------+----------------------------------+-------------------------------------+
//  | Get all              | prisma.product.findMany()        | productRepo.findAll()               |
//  | Get by ID            | prisma.product.findUnique({      | productRepo.findById(id)            |
//  |                      |   where: { id }                  |                                     |
//  |                      | })                               |                                     |
//  | Create               | prisma.product.create({          | productRepo.save(product)           |
//  |                      |   data: { name, price }          |                                     |
//  |                      | })                               |                                     |
//  | Update               | prisma.product.update({          | productRepo.save(product)           |
//  |                      |   where: { id },                 | (same method, but entity has id)    |
//  |                      |   data: { name }                 |                                     |
//  |                      | })                               |                                     |
//  | Delete               | prisma.product.delete({          | productRepo.deleteById(id)          |
//  |                      |   where: { id }                  |                                     |
//  |                      | })                               |                                     |
//  | Find by name         | prisma.product.findMany({        | productRepo.findByName("Laptop")    |
//  |                      |   where: { name: "Laptop" }      |                                     |
//  |                      | })                               |                                     |
//  | Count                | prisma.product.count()           | productRepo.count()                 |
//  | Check exists         | (manually check if result null)  | productRepo.existsById(id)          |
//  +----------------------+----------------------------------+-------------------------------------+
//
// ============================================================


// ============================================================
//  PART 4: CUSTOM SQL QUERIES WITH @Query
// ============================================================
//
//  If method name parsing is not enough, you can write
//  custom queries using the @Query annotation.
//
//  import org.springframework.data.jpa.repository.Query;
//  import org.springframework.data.repository.query.Param;
//
//  @Repository
//  public interface ProductRepository extends JpaRepository<Product, Long> {
//
//      // JPQL query (Java Persistence Query Language -- like SQL but for objects)
//      @Query("SELECT p FROM Product p WHERE p.price > :minPrice AND p.name LIKE %:name%")
//      List<Product> searchProducts(@Param("minPrice") Double minPrice,
//                                   @Param("name") String name);
//
//      // Native SQL query (actual SQL, not JPQL)
//      @Query(value = "SELECT * FROM products WHERE price > ?1", nativeQuery = true)
//      List<Product> findExpensiveProducts(Double minPrice);
//
//      // Query to get average price
//      @Query("SELECT AVG(p.price) FROM Product p")
//      Double getAveragePrice();
//  }
//
//  JPQL vs SQL:
//  - JPQL uses class/field names: "SELECT p FROM Product p WHERE p.price > :min"
//  - SQL uses table/column names: "SELECT * FROM products WHERE price > ?1"
//  - JPQL is preferred because it's database-independent
//
// ============================================================


// ============================================================
//  PART 5: PAGINATION
// ============================================================
//
//  When you have thousands of products, you don't want to
//  return them all at once. You use pagination.
//
//  JpaRepository already supports this!
//
//  // In your Service:
//  Pageable pageable = PageRequest.of(0, 10);  // Page 0, 10 items per page
//  Page<Product> page = productRepository.findAll(pageable);
//
//  // page.getContent()       -- the list of 10 products
//  // page.getTotalElements() -- total products in database
//  // page.getTotalPages()    -- total number of pages
//  // page.getNumber()        -- current page number
//
//  // In your Controller:
//  @GetMapping
//  public Page<Product> getAllProducts(
//      @RequestParam(defaultValue = "0") int page,
//      @RequestParam(defaultValue = "10") int size
//  ) {
//      Pageable pageable = PageRequest.of(page, size);
//      return productService.getAllProducts(pageable);
//  }
//
//  // Client calls: GET /api/products?page=0&size=10
//  //               GET /api/products?page=1&size=10  (next page)
//
// ============================================================


// ============================================================
//  PART 6: INTERVIEW QUESTIONS ABOUT REPOSITORIES
// ============================================================
//
//  Q: What is a Repository in Spring?
//  A: A Repository is an interface that extends JpaRepository
//     and provides methods for database operations (CRUD).
//     Spring Data JPA automatically generates the implementation,
//     so you never write SQL for basic operations.
//
//  Q: What is JpaRepository?
//  A: It's an interface from Spring Data JPA that provides
//     built-in methods like findAll(), findById(), save(),
//     and deleteById(). You extend it and Spring creates
//     the implementation automatically.
//
//  Q: What are Derived Query Methods?
//  A: Methods in a Repository interface whose names follow
//     a naming convention that Spring parses to generate SQL.
//     For example, findByName(String name) generates
//     SELECT * FROM products WHERE name = ?
//
//  Q: What is the difference between JpaRepository and CrudRepository?
//  A: CrudRepository provides basic CRUD methods.
//     JpaRepository extends CrudRepository and adds:
//     - Pagination and sorting support
//     - Batch operations (deleteAllInBatch, etc.)
//     - Flushing (saveAndFlush)
//     For most projects, use JpaRepository.
//
//  Q: How does save() know whether to INSERT or UPDATE?
//  A: If the entity's @Id field is null, save() does an INSERT
//     (creates a new row). If the @Id has a value, save() does
//     an UPDATE (modifies the existing row).
//
// ============================================================
