# ============================================================
#  DAY 6: SPRING BOOT REST API -- THE COMPLETE BEGINNER GUIDE
# ============================================================
#
#  If you know NOTHING about Spring Boot, start here.
#  We explain everything from scratch.
#  Express.js comparisons included where helpful.
#
# ============================================================


---


# SECTION 1: WHAT IS SPRING BOOT?
---

## The Simple Answer

Spring Boot is a **Java framework for building web applications and APIs**.

If you have seen Express.js (the Node.js framework), Spring Boot does the
same job -- but for Java.

```
Express.js  = Framework to build APIs using JavaScript
Spring Boot = Framework to build APIs using Java
```

That is literally it. Both let you:
- Create endpoints (URLs that return data)
- Handle GET, POST, PUT, DELETE requests
- Connect to databases
- Return JSON responses

## Why Do Companies Use Spring Boot?

Most large companies (banks, insurance, healthcare, enterprise) use Java.
Java is:
- Fast (compiled language)
- Strongly typed (catches bugs before running)
- Has been around since 1995 (tons of libraries and support)
- Scales well for large applications

Spring Boot is the #1 way to build Java web applications today.
If a job listing says "Java Developer" or "Backend Developer (Java)",
they almost certainly use Spring Boot.


---


# SECTION 2: SPRING vs SPRING BOOT -- WHAT IS THE DIFFERENCE?
---

This is a **very common interview question**.

## Spring (The Framework)

Spring is a HUGE framework. It has modules for:
- Web applications
- Security
- Database access
- Messaging
- Cloud
- And 50+ other things

But Spring by itself requires A LOT of configuration.
You had to write XML files, set up servers, configure everything manually.
It was painful.

## Spring Boot (The Easy Button)

Spring Boot is built ON TOP of Spring. It gives you:
- **Auto-configuration** -- it sets things up for you automatically
- **Embedded server** -- no need to install Tomcat separately
- **Starter dependencies** -- pre-packaged sets of libraries
- **Convention over configuration** -- sensible defaults, less XML

```
Think of it this way:

Spring      = A fully equipped kitchen with every tool imaginable
              but you have to assemble it yourself

Spring Boot = That same kitchen, but already assembled and ready
              to cook. Just start making food.
```

### Interview Answer (memorize this):

> "Spring is a comprehensive Java framework for building enterprise
>  applications. Spring Boot is a project built on top of Spring that
>  simplifies setup and configuration by providing auto-configuration,
>  embedded servers, and starter dependencies. It lets you get a
>  production-ready application running with minimal configuration."


---


# SECTION 3: HOW TO CREATE A SPRING BOOT PROJECT
---

## Step 1: Go to https://start.spring.io

This is called the "Spring Initializr" (yes, spelled with a 'z').
It is a website that generates a starter project for you.

```
Think of it like:
  - "npx create-react-app" for React
  - "ng new" for Angular
  - But it is a website you visit in your browser
```

## Step 2: Configure Your Project

On the website, you will see these options:

```
+---------------------------------------------------+
|  Spring Initializr                                |
|                                                   |
|  Project:      [x] Maven   [ ] Gradle             |
|  Language:     [x] Java    [ ] Kotlin              |
|  Spring Boot:  [x] 3.2.x  (pick latest stable)    |
|                                                   |
|  Group:        com.example                         |
|  Artifact:     my-api                              |
|  Name:         my-api                              |
|  Package name: com.example.myapi                   |
|  Packaging:    [x] Jar                             |
|  Java:         [x] 17                              |
|                                                   |
|  Dependencies:                                     |
|    [x] Spring Web                                  |
|    [x] Spring Data JPA                             |
|    [x] H2 Database (or PostgreSQL)                 |
|    [x] Spring Boot DevTools                        |
|                                                   |
|  [ GENERATE ]                                      |
+---------------------------------------------------+
```

### What do those fields mean?

| Field        | What it means                                      |
|--------------|----------------------------------------------------|
| Project      | Maven = build tool (like npm). Always pick Maven   |
| Language     | Java (obviously)                                   |
| Spring Boot  | Version. Pick the latest stable (not SNAPSHOT)     |
| Group        | Your organization name (like a package name)       |
| Artifact     | Your project name                                  |
| Dependencies | Libraries your project needs                       |

### What dependencies to add?

| Dependency         | What it does                                    |
|--------------------|-------------------------------------------------|
| Spring Web         | Lets you build REST APIs (@GetMapping, etc.)    |
| Spring Data JPA    | Database access (Repository pattern)            |
| H2 Database        | In-memory database for testing                  |
| Spring Boot DevTools | Auto-restart when you change code             |
| Lombok (optional)  | Reduces boilerplate (getters/setters)           |

## Step 3: Download and Unzip

Click "GENERATE" and it downloads a .zip file.
Unzip it and open it in IntelliJ IDEA (or VS Code with Java extensions).


---


# SECTION 4: PROJECT STRUCTURE EXPLAINED
---

When you unzip, you get this structure:

```
my-api/
|
|-- src/
|   |-- main/
|   |   |-- java/
|   |   |   |-- com/
|   |   |       |-- example/
|   |   |           |-- myapi/
|   |   |               |-- MyApiApplication.java    <-- ENTRY POINT
|   |   |               |-- controller/              <-- Your API endpoints
|   |   |               |-- service/                 <-- Business logic
|   |   |               |-- model/                   <-- Data classes
|   |   |               |-- repository/              <-- Database access
|   |   |
|   |   |-- resources/
|   |       |-- application.properties               <-- Configuration
|   |       |-- static/                              <-- Static files (HTML, CSS)
|   |       |-- templates/                           <-- HTML templates
|   |
|   |-- test/
|       |-- java/                                    <-- Your tests go here
|
|-- pom.xml                                          <-- Dependencies (like package.json)
|-- mvnw                                             <-- Maven wrapper (like npx)
|-- mvnw.cmd                                         <-- Maven wrapper for Windows
|-- .gitignore
```

### Comparing to Express.js project structure:

```
Express.js Project          Spring Boot Project
-----------------          --------------------
package.json         =     pom.xml
node_modules/        =     (Maven downloads to ~/.m2/)
server.js            =     MyApiApplication.java
routes/              =     controller/
(inline logic)       =     service/
models/              =     model/
.env                 =     application.properties
npm install          =     Maven does it automatically
npm start            =     ./mvnw spring-boot:run
```


---


# SECTION 5: WHAT IS MAVEN?
---

Maven is a **build tool** for Java. It does what npm does for Node.js.

```
npm (Node.js)              Maven (Java)
-----------                ------
package.json               pom.xml
npm install                mvn install (or automatic)
node_modules/              ~/.m2/repository/
npm start                  mvn spring-boot:run
npm run build              mvn package
npm run test               mvn test
```

## pom.xml = package.json

The pom.xml file lists your project's dependencies, just like package.json.

Here is a simplified pom.xml:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project>
    <modelVersion>4.0.0</modelVersion>

    <!-- This is like the "name" and "version" in package.json -->
    <groupId>com.example</groupId>
    <artifactId>my-api</artifactId>
    <version>0.0.1-SNAPSHOT</version>

    <!-- This tells Maven we are using Spring Boot -->
    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>3.2.0</version>
    </parent>

    <!-- These are like "dependencies" in package.json -->
    <dependencies>

        <!-- Spring Web = lets us build REST APIs -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>

        <!-- Spring Data JPA = database access -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-data-jpa</artifactId>
        </dependency>

        <!-- H2 = in-memory database for testing -->
        <dependency>
            <groupId>com.h2database</groupId>
            <artifactId>h2</artifactId>
            <scope>runtime</scope>
        </dependency>

    </dependencies>
</project>
```

### Quick comparison:

```
package.json                          pom.xml
------------                          -------
"express": "^4.18.0"                  <dependency>
                                          <groupId>org.springframework.boot</groupId>
                                          <artifactId>spring-boot-starter-web</artifactId>
                                      </dependency>
```

Yes, pom.xml is more verbose. That is Java for you. But you get used to it.


---


# SECTION 6: HOW TO RUN YOUR APPLICATION
---

## Method 1: Command Line

```bash
# Navigate to your project folder
cd my-api

# Run the application (Linux/Mac)
./mvnw spring-boot:run

# Run the application (Windows)
mvnw.cmd spring-boot:run
```

## Method 2: IntelliJ IDEA

1. Open the project in IntelliJ
2. Find MyApiApplication.java
3. Click the green play button next to the main() method
4. Done!

## What happens when you run it?

```
  .   ____          _            __ _ _
 /\\ / ___'_ __ _ _(_)_ __  __ _ \ \ \ \
( ( )\___ | '_ | '_| | '_ \/ _` | \ \ \ \
 \\/  ___)| |_)| | | | | || (_| |  ) ) ) )
  '  |____| .__|_| |_|_| |_\__, | / / / /
 =========|_|==============|___/=/_/_/_/

 :: Spring Boot ::                (v3.2.0)

2024-01-15 10:30:00 INFO  Starting MyApiApplication...
2024-01-15 10:30:02 INFO  Tomcat started on port(s): 8080
2024-01-15 10:30:02 INFO  Started MyApiApplication in 2.5 seconds
```

Your API is now running at: http://localhost:8080

```
Express.js:  app.listen(3000) --> runs on port 3000
Spring Boot: auto-starts    --> runs on port 8080 by default
```

To change the port, edit src/main/resources/application.properties:
```
server.port=3000
```


---


# SECTION 7: THE APPLICATION ENTRY POINT
---

Every Spring Boot app has ONE main class. It looks like this:

```java
package com.example.myapi;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication   // <-- This ONE annotation does everything
public class MyApiApplication {

    public static void main(String[] args) {
        SpringApplication.run(MyApiApplication.class, args);
    }
}
```

### What does @SpringBootApplication do?

It is actually THREE annotations combined:

1. **@Configuration** -- This class can define beans (objects Spring manages)
2. **@EnableAutoConfiguration** -- Spring Boot, please auto-configure everything
3. **@ComponentScan** -- Spring, please scan for my controllers, services, etc.

### Compare to Express.js:

```javascript
// Express.js entry point
const express = require('express');
const app = express();
app.use(express.json());
app.listen(3000);
```

```java
// Spring Boot entry point
@SpringBootApplication
public class MyApiApplication {
    public static void main(String[] args) {
        SpringApplication.run(MyApiApplication.class, args);
    }
}
```

Spring Boot does all that setup (JSON parsing, server creation) automatically.


---


# SECTION 8: THE BIG PICTURE -- HOW IT ALL FITS TOGETHER
---

```
                    SPRING BOOT APPLICATION ARCHITECTURE
                    ====================================

  Client (Browser/Postman/Frontend)
    |
    |  HTTP Request: GET /api/products/5
    |
    v
  +------------------+
  |   CONTROLLER     |  Receives HTTP requests, returns HTTP responses
  |  (ProductController) |  Like Express route handlers
  +------------------+
    |
    |  Calls service method: productService.getProductById(5)
    |
    v
  +------------------+
  |    SERVICE       |  Contains business logic
  |  (ProductService)|  Like a helper/utility module
  +------------------+
    |
    |  Calls repository method: productRepository.findById(5)
    |
    v
  +------------------+
  |   REPOSITORY     |  Talks to the database
  |  (ProductRepository) |  Like Prisma client
  +------------------+
    |
    |  SQL: SELECT * FROM products WHERE id = 5
    |
    v
  +------------------+
  |    DATABASE      |  Stores the data
  |  (H2/PostgreSQL) |
  +------------------+
```

This layered architecture is called **MVC** (Model-View-Controller)
or more accurately, the **Controller-Service-Repository** pattern.

**Why layers?** Each layer has ONE job:
- Controller: Handle HTTP (what URL? what method? what response code?)
- Service: Handle business rules (is the price valid? is the user allowed?)
- Repository: Handle database (save, find, update, delete)

This makes code organized, testable, and maintainable.


---


# SECTION 9: ANNOTATIONS -- THE KEY TO SPRING BOOT
---

Spring Boot uses **annotations** heavily. An annotation is a label you put
on a class, method, or field that tells Spring what to do with it.

Annotations start with @ symbol.

### Most Important Annotations (memorize these for interviews):

| Annotation        | What it does                                         |
|-------------------|------------------------------------------------------|
| @SpringBootApplication | Marks the main class, enables auto-config       |
| @RestController   | Marks a class as a REST API controller               |
| @RequestMapping   | Sets the base URL for a controller                   |
| @GetMapping       | Handles GET requests (read data)                     |
| @PostMapping      | Handles POST requests (create data)                  |
| @PutMapping       | Handles PUT requests (update data)                   |
| @DeleteMapping    | Handles DELETE requests (delete data)                |
| @PathVariable     | Gets a value from the URL path                       |
| @RequestBody      | Gets data from the request body (JSON)               |
| @Service          | Marks a class as a service (business logic)          |
| @Repository       | Marks a class/interface for database access          |
| @Entity           | Marks a class as a database table                    |
| @Id               | Marks a field as the primary key                     |
| @Autowired        | Tells Spring to inject a dependency                  |
| @Component        | Generic: marks a class as a Spring-managed bean      |


---


# SECTION 10: WHAT TO STUDY NEXT
---

After understanding these basics, learn:

1. **Exception Handling** -- @ControllerAdvice, @ExceptionHandler
2. **Validation** -- @Valid, @NotNull, @Size
3. **DTOs** -- Data Transfer Objects (separate from entities)
4. **Security** -- Spring Security (authentication/authorization)
5. **Testing** -- @SpringBootTest, MockMvc
6. **Profiles** -- application-dev.properties, application-prod.properties

But for a JUNIOR interview, the content in this tutorial series
(files 02 through 06) covers the core concepts you NEED to know.


---

## FILES IN THIS TUTORIAL SERIES

| File                   | Topic                                           |
|------------------------|-------------------------------------------------|
| TUTORIAL.md            | This file -- overview of everything             |
| 02_RestController.java | Controllers, endpoints, HTTP methods            |
| 03_Service.java        | Service layer, business logic, DI               |
| 04_Model.java          | Entity/Model classes, database mapping          |
| 05_Repository.java     | Repository pattern, database operations         |
| 06_FullExample.java    | Complete working example, all layers together   |
| 07_exercise.md         | Practice questions with detailed answers        |
