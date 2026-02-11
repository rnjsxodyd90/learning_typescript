// ============================================================
//  04: MODELS AND ENTITIES IN SPRING BOOT
// ============================================================
//
//  A Model (also called an Entity) is a Java class that
//  represents a table in your database.
//
//  Each INSTANCE of the class = one ROW in the table.
//  Each FIELD in the class = one COLUMN in the table.
//
//  +----------------------------------+
//  |  Product (Java Class)            |
//  +----------------------------------+
//  |  id: Long                        |     DATABASE TABLE: products
//  |  name: String                    |     +----+--------+--------+
//  |  price: Double                   |     | id | name   | price  |
//  |  description: String             | ==> +----+--------+--------+
//  |  quantity: Integer               |     |  1 | Laptop | 999.99 |
//  +----------------------------------+     |  2 | Mouse  |  29.99 |
//                                           +----+--------+--------+
//
//  NOTE: This is a TEACHING FILE with heavy comments.
//
// ============================================================


// ============================================================
//  PART 1: WHAT IS JPA?
// ============================================================
//
//  JPA = Java Persistence API
//
//  It's a specification (a set of rules) for how Java objects
//  should be saved to and loaded from databases.
//
//  Hibernate is the most popular IMPLEMENTATION of JPA.
//  When you use Spring Data JPA, it uses Hibernate under the hood.
//
//  Think of it this way:
//  - JPA = the rules (like an interface)
//  - Hibernate = the implementation (like a class that implements it)
//  - Spring Data JPA = makes it even easier to use
//
//  COMPARISON:
//  -----------
//  Express + Prisma:  Prisma schema defines your database tables
//  Spring + JPA:      Java classes with annotations define your tables
//
//  Prisma example:
//    model Product {
//      id    Int     @id @default(autoincrement())
//      name  String
//      price Float
//    }
//
//  JPA example:
//    @Entity
//    public class Product {
//        @Id @GeneratedValue
//        private Long id;
//        private String name;
//        private Double price;
//    }
//
//  Same concept, different syntax.
//
// ============================================================


// ============================================================
//  PART 2: CREATING AN ENTITY CLASS
// ============================================================

package com.example.myapi.model;

import jakarta.persistence.*;

// ------------------------------------------------------------
//  @Entity
// ------------------------------------------------------------
//  This annotation tells JPA:
//  "This Java class represents a database table."
//
//  When you run the application, JPA will automatically
//  create a table named "product" (or "products") in your
//  database based on this class.
//
//  This is called ORM = Object-Relational Mapping.
//  It maps Java objects to database tables.
//
// ------------------------------------------------------------

// ------------------------------------------------------------
//  @Table(name = "products")
// ------------------------------------------------------------
//  OPTIONAL: Specifies the exact table name in the database.
//  Without this, JPA uses the class name ("product").
//  With this, you can set it to "products" or anything else.
//
// ------------------------------------------------------------

@Entity
@Table(name = "products")
public class Product {

    // --------------------------------------------------------
    //  @Id
    // --------------------------------------------------------
    //  Marks this field as the PRIMARY KEY of the table.
    //  Every entity MUST have exactly one @Id field.
    //
    //  A primary key uniquely identifies each row.
    //  No two products can have the same id.
    //
    // --------------------------------------------------------

    // --------------------------------------------------------
    //  @GeneratedValue(strategy = GenerationType.IDENTITY)
    // --------------------------------------------------------
    //  Tells the database to auto-generate the id.
    //  When you save a new product, the database assigns
    //  the next available number (1, 2, 3, 4, ...).
    //
    //  You do NOT set the id yourself. The database does it.
    //
    //  GenerationType.IDENTITY = auto-increment
    //  (like SERIAL in PostgreSQL or AUTO_INCREMENT in MySQL)
    //
    //  Prisma equivalent:
    //    id Int @id @default(autoincrement())
    //
    // --------------------------------------------------------

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // --------------------------------------------------------
    //  Regular fields = Regular columns
    // --------------------------------------------------------
    //  Each field below becomes a column in the "products" table.
    //  The column name defaults to the field name.
    //  The column type is determined by the Java type:
    //
    //  Java Type      Database Type
    //  ---------      -------------
    //  String    -->  VARCHAR(255)
    //  Long      -->  BIGINT
    //  Integer   -->  INT
    //  Double    -->  DOUBLE
    //  Boolean   -->  BOOLEAN
    //  LocalDate -->  DATE
    //
    // --------------------------------------------------------

    // You can add constraints with @Column
    @Column(nullable = false)       // This column cannot be NULL in the database
    private String name;

    @Column(nullable = false)
    private Double price;

    @Column(length = 1000)          // Allow up to 1000 characters (default is 255)
    private String description;

    private Integer quantity;       // No special constraints, can be null


    // ========================================================
    //  CONSTRUCTORS
    // ========================================================
    //
    //  JPA REQUIRES a no-argument constructor.
    //  It uses this to create instances when loading from database.
    //

    // No-argument constructor (REQUIRED by JPA)
    public Product() {
    }

    // Convenience constructor for creating products in code
    public Product(String name, Double price, String description, Integer quantity) {
        this.name = name;
        this.price = price;
        this.description = description;
        this.quantity = quantity;
    }


    // ========================================================
    //  GETTERS AND SETTERS
    // ========================================================
    //
    //  In Java, fields are usually private.
    //  You access them through getter and setter methods.
    //  This is called "encapsulation."
    //
    //  Your IDE (IntelliJ) can generate these automatically:
    //    Right-click -> Generate -> Getter and Setter
    //
    //  OR you can use Lombok (a library) to avoid writing them:
    //    @Getter @Setter on the class, and they're generated for you.
    //
    //  Spring needs getters/setters to convert objects to/from JSON.
    //  Without them, JSON serialization will not work correctly.
    //

    // --- id ---
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    // --- name ---
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    // --- price ---
    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    // --- description ---
    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    // --- quantity ---
    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }


    // ========================================================
    //  toString() -- helpful for debugging
    // ========================================================
    //  When you print a Product, this controls what you see.
    //  Without it, you'd see something like "Product@3a5b1c2d"
    //  With it, you see "Product{id=1, name='Laptop', price=999.99}"
    //

    @Override
    public String toString() {
        return "Product{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", price=" + price +
                ", description='" + description + '\'' +
                ", quantity=" + quantity +
                '}';
    }
}


// ============================================================
//  PART 3: WHAT THE DATABASE TABLE LOOKS LIKE
// ============================================================
//
//  When you run the app, JPA creates this table automatically:
//
//  CREATE TABLE products (
//      id          BIGINT AUTO_INCREMENT PRIMARY KEY,
//      name        VARCHAR(255) NOT NULL,
//      price       DOUBLE NOT NULL,
//      description VARCHAR(1000),
//      quantity    INT
//  );
//
//  You never write this SQL yourself.
//  JPA generates it from your @Entity class.
//
// ============================================================


// ============================================================
//  PART 4: USING LOMBOK TO REDUCE BOILERPLATE
// ============================================================
//
//  Writing getters, setters, constructors, and toString() is
//  tedious. Lombok is a library that generates them for you.
//
//  With Lombok, the ENTIRE Product class becomes:
//
//  import lombok.*;
//
//  @Entity
//  @Table(name = "products")
//  @Data                // Generates getters, setters, toString, equals, hashCode
//  @NoArgsConstructor   // Generates no-arg constructor (required by JPA)
//  @AllArgsConstructor  // Generates constructor with all fields
//  public class Product {
//      @Id
//      @GeneratedValue(strategy = GenerationType.IDENTITY)
//      private Long id;
//
//      @Column(nullable = false)
//      private String name;
//
//      @Column(nullable = false)
//      private Double price;
//
//      @Column(length = 1000)
//      private String description;
//
//      private Integer quantity;
//  }
//
//  That's it! Much shorter. Same functionality.
//
//  Lombok annotations:
//  @Data           = @Getter + @Setter + @ToString + @EqualsAndHashCode
//  @NoArgsConstructor = empty constructor
//  @AllArgsConstructor = constructor with all fields
//  @Builder        = builder pattern (Product.builder().name("Laptop").build())
//
//  To use Lombok, add it as a dependency in pom.xml:
//  <dependency>
//      <groupId>org.projectlombok</groupId>
//      <artifactId>lombok</artifactId>
//      <optional>true</optional>
//  </dependency>
//
// ============================================================


// ============================================================
//  PART 5: COMMON ADDITIONAL ANNOTATIONS
// ============================================================
//
//  @Column(name = "product_name")
//  -- Sets a custom column name (default = field name)
//
//  @Column(unique = true)
//  -- No two rows can have the same value for this column
//
//  @Column(nullable = false)
//  -- This column cannot be NULL
//
//  @Column(length = 500)
//  -- Maximum string length (default 255)
//
//  @Transient
//  -- This field is NOT saved to the database
//  -- Use for calculated values or temporary data
//
//  @Enumerated(EnumType.STRING)
//  -- Store enum values as strings instead of numbers
//  -- Example: Category.ELECTRONICS is stored as "ELECTRONICS"
//
//  @CreatedDate
//  -- Automatically sets the creation timestamp
//
//  @LastModifiedDate
//  -- Automatically updates the modification timestamp
//
// ============================================================


// ============================================================
//  PART 6: INTERVIEW QUESTIONS ABOUT ENTITIES
// ============================================================
//
//  Q: What is an Entity in Spring/JPA?
//  A: An Entity is a Java class annotated with @Entity that
//     maps to a database table. Each instance represents a row,
//     and each field represents a column.
//
//  Q: What does @Id do?
//  A: It marks a field as the primary key of the entity.
//
//  Q: What does @GeneratedValue do?
//  A: It tells the database to auto-generate the primary key
//     value. With GenerationType.IDENTITY, it auto-increments.
//
//  Q: Why do you need a no-argument constructor?
//  A: JPA requires it to create instances of the entity when
//     loading data from the database. JPA uses reflection to
//     create the object and then sets the field values.
//
//  Q: What is ORM?
//  A: Object-Relational Mapping. It's the technique of mapping
//     Java objects to database tables. JPA/Hibernate is the
//     most common ORM framework in Java.
//
// ============================================================
