# Interview Questions & Answers - Junior Software Engineer

> **Strategy:** Read the answer, then practice the "HOW TO SAY IT" version out loud.
> For a junior role, they expect you to know the BASICS well - not everything.
> Confidence + honest fundamentals beats shaky advanced knowledge every time.

---

## Table of Contents
1. [TypeScript (10 Questions)](#typescript)
2. [HTML/CSS (10 Questions)](#htmlcss)
3. [Angular (15 Questions)](#angular)
4. [Java (10 Questions)](#java)
5. [Spring Boot (10 Questions)](#spring-boot)
6. [General / DevOps (8 Questions)](#general--devops)

---

## TypeScript

### 1. What is TypeScript? Why use it over JavaScript?

**Answer:** TypeScript is a superset of JavaScript that adds static typing. It catches errors at compile time instead of runtime, makes code more readable, and provides better IDE support with autocompletion. All valid JavaScript is valid TypeScript, but TypeScript adds extra safety.

**HOW TO SAY IT:** "TypeScript is basically JavaScript with types added on top. The big advantage is that it catches bugs before your code even runs - like if you accidentally pass a string where a number is expected, TypeScript flags it immediately. It also makes working in teams easier because the types serve as documentation."

---

### 2. What are interfaces in TypeScript?

**Answer:** An interface defines the shape or structure of an object. It specifies what properties and methods an object must have, along with their types. Interfaces don't generate any JavaScript code - they exist only for type-checking during development.

**HOW TO SAY IT:** "An interface is like a contract that says 'any object of this type must have these specific properties.' For example, if I have a User interface with name and email, TypeScript will make sure every User object actually has those fields. It's purely for development - it disappears when compiled to JavaScript."

---

### 3. What is the difference between `let` and `const`?

**Answer:** `let` declares a variable that can be reassigned later. `const` declares a variable that cannot be reassigned after its initial value. Both are block-scoped, meaning they only exist within the curly braces where they are declared. Use `const` by default and only use `let` when you need to reassign.

**HOW TO SAY IT:** "The rule I follow is: use `const` by default for everything, and only switch to `let` when I actually need to change the value later. Both are block-scoped, which is safer than the old `var` keyword. One thing to note - `const` with an object means you can't reassign the variable, but you can still modify the object's properties."

---

### 4. What are generics in TypeScript?

**Answer:** Generics allow you to write reusable code that works with multiple types while still maintaining type safety. Instead of using `any`, you use a placeholder type (like `T`) that gets replaced with a real type when the code is used. This gives you flexibility without losing type checking.

**HOW TO SAY IT:** "Generics let you write a function or class that works with different types without losing type safety. For example, instead of writing separate functions for an array of numbers and an array of strings, I can write one generic function that works with both. The classic example is `Array<T>` - the T gets replaced with the actual type like `Array<string>`."

---

### 5. What is the `any` type and why should you avoid it?

**Answer:** The `any` type disables type checking for a variable, allowing it to hold any value. You should avoid it because it defeats the purpose of TypeScript - you lose all the safety benefits. If you need flexibility, use `unknown` instead, which forces you to check the type before using the value.

**HOW TO SAY IT:** "Using `any` is basically turning off TypeScript for that variable - it won't catch any errors. It's sometimes used as a quick fix, but it's considered bad practice. If I genuinely don't know the type, I'd use `unknown` instead, which still requires me to check the type before I do anything with the value."

---

### 6. What is the difference between `type` and `interface`?

**Answer:** Both define the shape of data, but interfaces can be extended and merged (declared again to add properties), while types are more flexible - they can represent unions, intersections, and primitive types. For objects, either works. The convention in Angular is to use interfaces for object shapes.

**HOW TO SAY IT:** "They're very similar, and for most cases either works. The main differences are: interfaces can be extended with the `extends` keyword and can be merged if declared twice, while types can represent more complex things like union types. In Angular projects, I typically use interfaces for defining object shapes like data models."

---

### 7. What are union types?

**Answer:** A union type allows a variable to hold one of several types. You write it using the pipe symbol (`|`). For example, `string | number` means the variable can be either a string or a number. TypeScript will only let you use methods that exist on ALL the types in the union unless you narrow it with a type check.

**HOW TO SAY IT:** "A union type means a value can be one of several types - like `string | number` means it could be either. TypeScript is smart about this - if I check `typeof value === 'string'` inside an if-block, TypeScript knows it's a string in that block and lets me use string methods. This is called type narrowing."

---

### 8. What is an enum in TypeScript?

**Answer:** An enum is a way to define a set of named constants. It makes code more readable by giving meaningful names to values. For example, instead of using 0, 1, 2 for status codes, you can use `Status.Pending`, `Status.Active`, `Status.Closed`. TypeScript has both numeric and string enums.

**HOW TO SAY IT:** "Enums let me define a group of related constants with readable names. Instead of magic numbers scattered through my code, I can write something like `Direction.Up` or `Status.Active`. It makes the code self-documenting and prevents mistakes like accidentally using an invalid value."

---

### 9. What is type narrowing?

**Answer:** Type narrowing is when TypeScript automatically figures out a more specific type based on conditions in your code. For example, if you check `if (typeof x === 'string')`, TypeScript knows `x` is a string inside that block. This lets you safely use type-specific methods after a check.

**HOW TO SAY IT:** "Type narrowing is TypeScript being smart about types inside conditional blocks. If I have a variable that could be a string or number, and I check `typeof x === 'string'`, TypeScript knows it's definitely a string inside that if-block and gives me access to string methods. It's one of the things that makes TypeScript really powerful."

---

### 10. What are access modifiers in TypeScript?

**Answer:** TypeScript has three access modifiers: `public` (accessible from anywhere, the default), `private` (only accessible within the class), and `protected` (accessible within the class and its subclasses). They control who can access properties and methods of a class. This is similar to Java's access modifiers.

**HOW TO SAY IT:** "TypeScript has `public`, `private`, and `protected`, similar to Java. Public is the default - anyone can access it. Private means only code inside that same class can access it. Protected is like private but also allows subclasses to access it. In Angular, I use private for services that are injected into a component but shouldn't be accessible from the template."

---

## HTML/CSS

### 11. What is the difference between a `div` and a `span`?

**Answer:** A `div` is a block-level element that takes up the full width available and starts on a new line. A `span` is an inline element that only takes up as much width as its content and stays in the flow of text. Use `div` for layout sections and `span` for styling small pieces of text.

**HOW TO SAY IT:** "A `div` is a block element - it takes up the whole width and starts a new line. A `span` is inline - it flows with the text and only takes the space it needs. I use `div` for structuring bigger sections of a page and `span` when I need to style a word or phrase within a paragraph."

---

### 12. What is Flexbox?

**Answer:** Flexbox is a CSS layout model that makes it easy to align and distribute space among items in a container. You set `display: flex` on a parent element, then use properties like `justify-content` (horizontal alignment), `align-items` (vertical alignment), and `flex-direction` (row or column) to control the layout.

**HOW TO SAY IT:** "Flexbox is a one-dimensional layout system in CSS - meaning it handles layout in one direction at a time, either as a row or a column. I use it all the time for things like centering elements, creating navigation bars, or evenly spacing items. The parent gets `display: flex` and then I use properties like `justify-content` and `align-items` to control positioning."

---

### 13. What is the CSS Box Model?

**Answer:** Every HTML element is treated as a box with four layers: content (the actual text/image), padding (space between content and border), border (the edge of the element), and margin (space between this element and others). Understanding this is essential for controlling spacing and sizing.

**HOW TO SAY IT:** "The box model is how CSS calculates the size of every element. From inside out, it's: content, then padding around the content, then the border, then margin on the outside. A common gotcha is that by default, width only sets the content width - padding and border are added on top. That's why many developers use `box-sizing: border-box` so width includes padding and border."

---

### 14. What is responsive design?

**Answer:** Responsive design means building web pages that look good on all screen sizes - from phones to desktops. It's achieved using flexible layouts (like Flexbox or CSS Grid), relative units (%, rem, vw), and media queries that apply different styles based on screen width.

**HOW TO SAY IT:** "Responsive design is about making a website look good on any device. I achieve this with a combination of flexible layouts using Flexbox or Grid, relative units instead of fixed pixel values, and media queries to change styles at different breakpoints. The mobile-first approach means you start designing for small screens and add complexity for larger ones."

---

### 15. What is semantic HTML?

**Answer:** Semantic HTML means using HTML tags that describe the meaning of the content, not just how it looks. For example, using `<header>`, `<nav>`, `<main>`, `<article>`, and `<footer>` instead of generic `<div>` tags everywhere. It improves accessibility, SEO, and code readability.

**HOW TO SAY IT:** "Semantic HTML means using tags that describe what the content IS, not just how it looks. Instead of putting everything in `div` tags, I use `header`, `nav`, `main`, `section`, `article`, and `footer`. This helps screen readers for accessibility, helps search engines understand the page, and makes the code much easier for other developers to read."

---

### 16. What is the difference between `class` and `id` in CSS?

**Answer:** An `id` is unique - only one element on a page should have a specific id. A `class` can be reused on multiple elements. In CSS, ids are selected with `#` and classes with `.`. Classes are preferred for styling because they are reusable, while ids are used for unique elements or JavaScript targeting.

**HOW TO SAY IT:** "An id should be unique on the page - only one element has it. A class can be applied to as many elements as you want. For styling, I almost always use classes because they're reusable. Ids have higher specificity in CSS, which can make styles harder to override, so I reserve ids for things like targeting elements with JavaScript or anchor links."

---

### 17. What is CSS Grid?

**Answer:** CSS Grid is a two-dimensional layout system that lets you create rows AND columns simultaneously. You set `display: grid` on a container and define rows and columns using `grid-template-rows` and `grid-template-columns`. It's ideal for complex page layouts like dashboards.

**HOW TO SAY IT:** "CSS Grid is a two-dimensional layout system - unlike Flexbox which handles one direction, Grid handles both rows and columns at the same time. It's perfect for creating complex page layouts like dashboards or card grids. I use Flexbox for simpler one-direction layouts and Grid when I need to control both dimensions."

---

### 18. What are media queries?

**Answer:** Media queries are CSS rules that apply styles only when certain conditions are met, usually based on screen width. For example, `@media (max-width: 768px)` applies styles only on screens 768px wide or less. They are a key tool for responsive design.

**HOW TO SAY IT:** "Media queries let me apply different CSS rules based on the device's characteristics, usually screen width. For example, I might show a sidebar on desktop but hide it on mobile using a media query at 768 pixels. I prefer the mobile-first approach where the default styles are for small screens and I use `min-width` media queries to add styles for larger screens."

---

### 19. What is the difference between `position: relative` and `position: absolute`?

**Answer:** `relative` positions an element relative to where it would normally be - it still takes up its original space. `absolute` removes the element from the normal flow and positions it relative to its nearest positioned ancestor (an ancestor with position set to anything other than static).

**HOW TO SAY IT:** "With `position: relative`, the element stays in the document flow but you can nudge it from its normal position. With `position: absolute`, it's taken completely out of the flow and positioned relative to its nearest positioned parent. A common pattern is to set the parent to `position: relative` and then use `absolute` on a child to place it precisely within that parent."

---

### 20. What is the difference between `px`, `rem`, and `%`?

**Answer:** `px` is a fixed unit - always the same size. `rem` is relative to the root font size (usually 16px), so `1rem = 16px`. `%` is relative to the parent element. Use `rem` for font sizes and spacing for better accessibility, and `%` for flexible widths.

**HOW TO SAY IT:** "Pixels are fixed - they don't scale. Rem is relative to the base font size, so if a user changes their browser's font size, everything scaled in rem adjusts automatically, which is great for accessibility. Percentages are relative to the parent element, which I use a lot for widths. My general approach is rem for typography and spacing, percentages or viewport units for layout widths."

---

## Angular

### 21. What is Angular and how is it different from React?

**Answer:** Angular is a full framework for building web applications, built by Google, using TypeScript. React is a library focused only on the view layer. Angular comes with everything built in (routing, forms, HTTP client, testing), while React requires you to add separate libraries. Angular uses two-way data binding, React uses one-way.

**HOW TO SAY IT:** "Angular is a complete framework - it gives you everything you need out of the box: routing, form handling, HTTP calls, testing tools. React is more of a library focused on the UI layer, and you pick and choose additional libraries. I've worked with React and I'm transitioning to Angular - the concepts are very similar. Components, state management, lifecycle methods - they exist in both, just with different syntax."

---

### 22. What is a component in Angular?

**Answer:** A component is the basic building block of an Angular application. It controls a section of the screen (a view). Each component has three parts: a TypeScript class (logic), an HTML template (what the user sees), and a CSS file (styling). Components are decorated with `@Component`.

**HOW TO SAY IT:** "A component is a reusable piece of UI with its own logic, template, and styles. For example, a navigation bar could be a component, a user card could be a component. Each one has a TypeScript file for the logic, an HTML template for the view, and CSS for styling. You define them with the `@Component` decorator. It's conceptually the same as a React component, just structured differently."

---

### 23. What is Dependency Injection? (MOST IMPORTANT - KNOW THIS COLD)

**Answer:** Dependency Injection (DI) is a design pattern where a class receives its dependencies from the outside rather than creating them itself. In Angular, you define a service and Angular's DI system automatically provides (injects) it to any component that needs it. This makes code more modular, testable, and loosely coupled.

**HOW TO SAY IT:** "Dependency Injection means instead of a class creating its own dependencies, they get handed to it from the outside. In Angular, if my component needs to make API calls, I don't create an HTTP service inside the component - I declare it in the constructor, and Angular automatically provides an instance. This is huge for testing because I can easily swap in a mock service. It also means multiple components can share the same service instance, which is great for shared state. Both Angular and Spring Boot use dependency injection heavily - it's a core concept in both frameworks."

---

### 24. What is a service in Angular?

**Answer:** A service is a class that handles business logic and data operations, separate from the UI components. Services are typically used for making HTTP requests, sharing data between components, and performing complex logic. They are decorated with `@Injectable()` and are provided through dependency injection.

**HOW TO SAY IT:** "A service is where I put logic that isn't directly related to the UI - things like API calls, data processing, or shared state. For example, I might have a UserService that handles all API calls related to users. Components inject this service and call its methods. This keeps components focused on the UI and makes the business logic reusable across multiple components."

---

### 25. What are lifecycle hooks? Name the most important ones.

**Answer:** Lifecycle hooks are methods that Angular calls at specific stages of a component's life. The most important ones are: `ngOnInit` (runs once after the component is created - use for initialization and data loading), `ngOnDestroy` (runs when the component is removed - use for cleanup like unsubscribing), and `ngOnChanges` (runs when input properties change).

**HOW TO SAY IT:** "Lifecycle hooks let me run code at specific points in a component's life. The one I use the most is `ngOnInit` - it runs after the component is initialized, and it's where I put API calls and setup logic. `ngOnDestroy` is important for cleanup - like unsubscribing from Observables to prevent memory leaks. And `ngOnChanges` fires whenever an `@Input` property changes, which is useful for reacting to new data from a parent component."

---

### 26. What is the difference between template-driven and reactive forms?

**Answer:** Template-driven forms are defined mainly in the HTML template using directives like `ngModel` - simpler but less control. Reactive forms are defined in the TypeScript class using `FormGroup` and `FormControl` - more code but more powerful for validation, dynamic forms, and testing. Reactive forms are preferred in production applications.

**HOW TO SAY IT:** "Template-driven forms are the simpler approach where most of the logic lives in the HTML using `ngModel`. Reactive forms put the form logic in the TypeScript class, which gives you more control over validation, makes dynamic forms easier, and is better for unit testing. For anything beyond a simple login form, I'd go with reactive forms because they scale better and are more predictable."

---

### 27. What is an Observable?

**Answer:** An Observable is a stream of data that arrives over time. Unlike a Promise (which resolves once), an Observable can emit multiple values. You subscribe to an Observable to receive its values. Angular uses Observables extensively, especially for HTTP requests and event handling through RxJS.

**HOW TO SAY IT:** "An Observable is like a stream of values over time. You subscribe to it to get the values as they come in. It's similar to a Promise, but a Promise gives you one value and that's it - an Observable can keep emitting values. Angular's HTTP client returns Observables, so when I make an API call, I subscribe to the result. I also make sure to unsubscribe when the component is destroyed to prevent memory leaks."

---

### 28. What is the difference between @Input and @Output?

**Answer:** `@Input()` allows a parent component to pass data DOWN to a child component. `@Output()` allows a child component to send events UP to the parent using an EventEmitter. Together, they create parent-child communication. This is similar to props and callbacks in React.

**HOW TO SAY IT:** "Input and Output are how parent and child components communicate. `@Input` sends data downward - like a parent passing a user object to a child user-card component. `@Output` sends events upward - like a child emitting a 'delete' event when a button is clicked, and the parent handling it. It's the same concept as props and callback functions in React."

---

### 29. What is routing in Angular?

**Answer:** Routing lets you navigate between different views/pages in a single-page application without reloading the browser. You define routes that map URL paths to components. Angular's Router module handles this. For example, `/users` shows the UserListComponent and `/users/123` shows UserDetailComponent.

**HOW TO SAY IT:** "Angular routing maps URL paths to components, so when a user navigates to `/dashboard`, Angular loads the DashboardComponent without a full page reload. I define routes in a routing module, and I can use `routerLink` in templates for navigation or the Router service in TypeScript. I can also set up route guards to protect routes - like redirecting to login if the user isn't authenticated."

---

### 30. What are `*ngIf` and `*ngFor`?

**Answer:** `*ngIf` conditionally shows or hides an element based on a boolean expression. `*ngFor` loops over a collection and creates an element for each item. They are structural directives - they change the DOM structure. For example, `*ngIf="isLoggedIn"` shows an element only when the user is logged in.

**HOW TO SAY IT:** "`*ngIf` shows or removes an element based on a condition - like only showing a welcome message when the user is logged in. `*ngFor` loops through a list and creates an element for each item - like generating a list of user cards from an array of users. They're called structural directives because they actually add or remove elements from the DOM, unlike regular directives that just change appearance."

---

### 31. What is two-way data binding?

**Answer:** Two-way data binding means the UI and the component's data stay in sync automatically. When the user types in an input field, the variable updates. When the variable changes in code, the UI updates. In Angular, you use `[(ngModel)]` syntax (called banana-in-a-box syntax). React uses one-way binding instead.

**HOW TO SAY IT:** "Two-way data binding keeps the template and the component class in sync. If I have an input field bound to a `name` variable with `[(ngModel)]`, typing in the field updates the variable, and changing the variable in code updates what's displayed. It's one of the differences from React, where data flows one way and you explicitly update state with setState. The Angular syntax is called 'banana in a box' because of the `[( )]` brackets."

---

### 32. What is a module in Angular?

**Answer:** An Angular module (NgModule) is a container that groups related components, services, directives, and pipes together. Every Angular app has at least one root module (AppModule). Modules help organize the application into cohesive blocks of functionality. You can lazy-load modules to improve performance.

**HOW TO SAY IT:** "A module is how Angular organizes the application. It groups related components, services, and other pieces together. Every app has a root AppModule, and you can create feature modules like a UserModule or AdminModule. The big benefit is lazy loading - you can set it up so certain modules only load when the user navigates to that section, which makes the initial load faster."

---

### 33. What are pipes in Angular?

**Answer:** Pipes transform data in the template for display purposes without changing the underlying data. Angular has built-in pipes like `date` (format dates), `uppercase` (convert to uppercase), `currency` (format numbers as currency), and `json` (display objects). You can also create custom pipes.

**HOW TO SAY IT:** "Pipes are used in templates to transform how data is displayed. For example, `{{ birthday | date:'longDate' }}` takes a date object and formats it nicely for the user. Angular comes with useful built-in pipes for dates, currency, percentages, and more. You can also write custom pipes - for example, I might create one that truncates long text with ellipsis."

---

### 34. What is an Angular directive?

**Answer:** A directive is a class that adds behavior to elements in the DOM. There are three types: component directives (components are actually directives with templates), structural directives (`*ngIf`, `*ngFor` - change the DOM structure), and attribute directives (`ngClass`, `ngStyle` - change the appearance or behavior of an element).

**HOW TO SAY IT:** "Directives add behavior to DOM elements. Structural directives like `*ngIf` and `*ngFor` change the DOM structure by adding or removing elements. Attribute directives like `ngClass` or `ngStyle` change how an element looks or behaves. Components are actually a special type of directive that has a template. You can also create custom directives for reusable behavior."

---

### 35. What is HttpClient in Angular?

**Answer:** HttpClient is Angular's built-in service for making HTTP requests to APIs. It returns Observables, which means you subscribe to get the response. It supports all HTTP methods (GET, POST, PUT, DELETE), handles JSON automatically, and provides features like interceptors for adding authentication headers.

**HOW TO SAY IT:** "HttpClient is the service I use to communicate with backend APIs. It's part of Angular's built-in modules. I inject it into a service and use methods like `http.get()` or `http.post()`. It returns Observables, so I subscribe to handle the response. A powerful feature is interceptors - I can set up an interceptor to automatically attach an auth token to every outgoing request."

---

## Java

### 36. What is Java and how does it work (JVM)?

**Answer:** Java is an object-oriented programming language. Java code is compiled into bytecode, which runs on the Java Virtual Machine (JVM). The JVM exists on every platform, so Java code written once can run anywhere - this is the "Write Once, Run Anywhere" principle. Java is strongly typed and widely used for backend development.

**HOW TO SAY IT:** "Java is an object-oriented language that's been a backbone of enterprise development for decades. The key concept is the JVM - Java Virtual Machine. Java code gets compiled into bytecode, and the JVM runs that bytecode. Since the JVM exists on every operating system, the same Java program runs on Windows, Mac, or Linux without changes. That's the 'write once, run anywhere' idea."

---

### 37. What is OOP? Name the four pillars.

**Answer:** Object-Oriented Programming (OOP) organizes code around objects that contain data and behavior. The four pillars are: Encapsulation (hiding internal details), Inheritance (classes can inherit from other classes), Polymorphism (same method name, different behavior), and Abstraction (hiding complexity, showing only what's needed).

**HOW TO SAY IT:** "OOP is about modeling your code as objects that have properties and methods. The four pillars are: **Encapsulation** - bundling data with methods and hiding internal details using access modifiers. **Inheritance** - a class can extend another class to reuse its code. **Polymorphism** - the same method can behave differently depending on the object type, like a `draw()` method working differently for a Circle versus a Square. **Abstraction** - hiding complex implementation details and exposing only what's necessary through interfaces or abstract classes."

---

### 38. What is the difference between an interface and an abstract class in Java?

**Answer:** An interface defines a contract of methods that a class MUST implement - it has no implementation (before Java 8). An abstract class can have both abstract methods (no implementation) and concrete methods (with implementation). A class can implement multiple interfaces but can only extend one abstract class.

**HOW TO SAY IT:** "An interface is a pure contract - it says 'any class that implements me must provide these methods.' An abstract class is a partial implementation - it can have some methods already implemented and others left abstract for subclasses to fill in. The big practical difference is that a class can implement multiple interfaces but can only extend one abstract class. Since Java 8, interfaces can have default methods with implementations, which blurred the line a bit."

---

### 39. What is a constructor?

**Answer:** A constructor is a special method that runs when an object is created with the `new` keyword. It initializes the object's state by setting initial values for its properties. If you don't write a constructor, Java provides a default one. A class can have multiple constructors with different parameters (overloading).

**HOW TO SAY IT:** "A constructor initializes an object when it's created. It's called automatically when you use `new`. For example, `new User('John', 'john@email.com')` calls the User constructor and sets up those fields. You can have multiple constructors with different parameters - this is called constructor overloading. In Spring Boot, constructors are also how dependency injection works - Spring sees what the constructor needs and provides the dependencies."

---

### 40. What are access modifiers in Java?

**Answer:** Java has four access modifiers: `public` (accessible from anywhere), `private` (only within the same class), `protected` (within the same class and subclasses and same package), and default/package-private (within the same package, no keyword needed). They control visibility and are a key part of encapsulation.

**HOW TO SAY IT:** "Access modifiers control who can see and use a class's members. `public` means anyone can access it. `private` means only the class itself can. `protected` allows the class, its subclasses, and classes in the same package to access it. And if you don't specify anything, it's package-private - accessible within the same package. I use `private` for fields and expose them through getter/setter methods, which is the encapsulation principle."

---

### 41. What is the difference between ArrayList and Array in Java?

**Answer:** An Array has a fixed size set when you create it and can hold primitives or objects. An ArrayList is dynamic - it can grow and shrink as you add or remove elements, but it can only hold objects (not primitives). ArrayList has useful methods like `add()`, `remove()`, and `contains()`. ArrayList is part of the Collections framework.

**HOW TO SAY IT:** "Arrays have a fixed size - once you create an array of 10 elements, that's it. ArrayLists are dynamic and can grow or shrink as needed. In practice, I almost always use ArrayList because the flexibility is worth it and the performance difference is negligible for most use cases. ArrayList also provides handy methods like `add`, `remove`, `contains`, and `size` that make working with collections much easier."

---

### 42. What is the difference between `==` and `.equals()` in Java?

**Answer:** `==` compares references - it checks if two variables point to the same object in memory. `.equals()` compares values - it checks if two objects have the same content. For comparing strings and objects, always use `.equals()`. For primitives (int, boolean), use `==`.

**HOW TO SAY IT:** "This is a classic Java gotcha. `==` checks if two references point to the exact same object in memory. `.equals()` checks if the values are the same. So two different String objects with the same text would return `false` with `==` but `true` with `.equals()`. The rule is: use `.equals()` for objects and strings, use `==` for primitives like int and boolean."

---

### 43. What is the `static` keyword?

**Answer:** `static` means the member belongs to the class itself, not to any specific instance. A static method can be called without creating an object (`Math.random()`). A static variable is shared across ALL instances of that class. The `main` method is static because it needs to run before any objects are created.

**HOW TO SAY IT:** "Static means it belongs to the class, not to an instance. A static method like `Math.random()` can be called without creating a Math object. A static variable is shared by all instances - if I have a counter that tracks how many User objects exist, I'd make it static. The `main` method is static because it's the entry point of the program and needs to run before any objects are created."

---

### 44. What is an exception in Java? How do you handle them?

**Answer:** An exception is an error that occurs during program execution. Java handles exceptions with try-catch blocks: the `try` block contains code that might fail, and the `catch` block handles the error. There are checked exceptions (must be handled) and unchecked exceptions (runtime errors). You can also use `finally` for cleanup code that always runs.

**HOW TO SAY IT:** "Exceptions are Java's way of handling errors at runtime. I wrap risky code in a try-catch block - the try block runs the code, and if something goes wrong, the catch block handles it gracefully instead of crashing. Java has checked exceptions that force you to handle them at compile time, and unchecked exceptions like NullPointerException that happen at runtime. The finally block runs regardless of whether an exception occurred, which is useful for cleanup like closing database connections."

---

### 45. What are Collections in Java?

**Answer:** The Collections framework is a set of classes and interfaces for storing and manipulating groups of objects. The main interfaces are: `List` (ordered, allows duplicates - ArrayList, LinkedList), `Set` (no duplicates - HashSet), and `Map` (key-value pairs - HashMap). They provide common operations like sorting, searching, and filtering.

**HOW TO SAY IT:** "Collections are Java's built-in data structures for working with groups of objects. The three main types are: List for ordered collections that allow duplicates - I mostly use ArrayList. Set for collections with no duplicates - HashSet is the common one. And Map for key-value pairs - HashMap is what I use most. They all come with helpful methods and can be used with Java Streams for functional-style operations like filtering and mapping."

---

## Spring Boot

### 46. What is Spring Boot?

**Answer:** Spring Boot is a Java framework that makes it easy to create production-ready backend applications. It's built on top of Spring Framework but removes most of the complex configuration. It provides auto-configuration, an embedded web server, and a quick way to create REST APIs. It follows the convention-over-configuration principle.

**HOW TO SAY IT:** "Spring Boot is a framework for building Java backend applications quickly. The original Spring Framework was powerful but required a lot of configuration. Spring Boot eliminates most of that with sensible defaults and auto-configuration. I can have a REST API up and running with just a few annotations. It comes with an embedded Tomcat server, so I don't need to set up a separate web server."

---

### 47. What is a REST API?

**Answer:** REST (Representational State Transfer) is an architectural style for building web APIs. It uses HTTP methods (GET, POST, PUT, DELETE) to perform CRUD operations on resources identified by URLs. A REST API is stateless - each request contains all the information needed to process it. Data is typically sent and received as JSON.

**HOW TO SAY IT:** "A REST API is a way for applications to communicate over HTTP. Each URL represents a resource - like `/api/users` represents users. You use HTTP methods to interact with resources: GET to read, POST to create, PUT to update, DELETE to remove. It's stateless, meaning the server doesn't remember previous requests. The frontend Angular app would call these REST endpoints to get and send data to the Spring Boot backend."

---

### 48. What are HTTP methods and when do you use each?

**Answer:** GET retrieves data (like fetching a list of users). POST creates new data (like creating a new user). PUT updates an existing resource completely. PATCH updates part of a resource. DELETE removes a resource. These map to CRUD operations: Create (POST), Read (GET), Update (PUT/PATCH), Delete (DELETE).

**HOW TO SAY IT:** "The main HTTP methods map to CRUD operations. GET is for reading - no side effects, safe to call multiple times. POST creates a new resource. PUT replaces an entire resource. PATCH updates part of a resource. DELETE removes it. For example, `GET /api/users` returns all users, `POST /api/users` creates a new user, `PUT /api/users/5` updates user 5, and `DELETE /api/users/5` removes user 5."

---

### 49. What is @RestController?

**Answer:** `@RestController` is an annotation that marks a class as a REST API controller in Spring Boot. It combines `@Controller` and `@ResponseBody`, meaning every method automatically serializes its return value to JSON and sends it in the HTTP response. It handles incoming HTTP requests and returns data.

**HOW TO SAY IT:** "The `@RestController` annotation tells Spring Boot 'this class handles HTTP requests and returns data as JSON.' It combines two things: `@Controller` which registers it as a Spring component, and `@ResponseBody` which means return values are automatically converted to JSON. So if my method returns a User object, Spring automatically converts it to JSON and sends it back to the client."

---

### 50. What is the difference between @GetMapping and @PostMapping?

**Answer:** `@GetMapping` maps HTTP GET requests to a specific method - used for retrieving data. `@PostMapping` maps HTTP POST requests - used for creating new data. There's also `@PutMapping` for updates and `@DeleteMapping` for deletion. Each annotation takes a URL path as its parameter.

**HOW TO SAY IT:** "These annotations map specific HTTP methods to Java methods. `@GetMapping('/api/users')` means when someone sends a GET request to that URL, this method runs and returns data. `@PostMapping('/api/users')` handles POST requests for creating new resources. There's also `@PutMapping` and `@DeleteMapping`. Each one handles a different type of CRUD operation. They're shortcuts for the more general `@RequestMapping` annotation."

---

### 51. Explain the Controller, Service, Repository pattern.

**Answer:** This is a three-layer architecture. The Controller handles HTTP requests and responses (the entry point). The Service contains business logic (rules, calculations, validations). The Repository handles database operations (CRUD). Data flows: Controller receives request -> calls Service -> Service uses Repository -> Repository queries database -> response flows back up.

**HOW TO SAY IT:** "It's a clean three-layer separation of concerns. The Controller is the entry point - it receives HTTP requests and sends responses, but has no business logic. It calls the Service layer, which is where all the business rules live - like validation, calculations, and orchestrating operations. The Service calls the Repository, which handles database operations. This separation makes code testable and maintainable. Angular has a similar pattern with components and services."

---

### 52. What is Dependency Injection in Spring?

**Answer:** Spring's DI container (IoC container) manages the creation and injection of objects (called beans). Instead of using `new` to create dependencies, you declare what you need (usually via constructor) and Spring provides it. This makes code loosely coupled and easy to test. You mark classes with annotations like `@Service`, `@Repository`, or `@Component`.

**HOW TO SAY IT:** "It's the same concept as Angular's DI. Instead of my Controller creating a new Service with `new UserService()`, I just declare it in the constructor and Spring provides an instance automatically. Spring manages these objects - called beans - and wires them together. I annotate classes with `@Service`, `@Repository`, or `@Component` so Spring knows about them. This makes testing easy because I can swap in mock objects."

---

### 53. What is @Autowired?

**Answer:** `@Autowired` tells Spring to automatically inject a dependency. It can be used on constructors, fields, or setters. Constructor injection (recommended) doesn't even need `@Autowired` in modern Spring Boot - Spring automatically injects if there's only one constructor. It's Spring's way of implementing dependency injection.

**HOW TO SAY IT:** "Autowired is an annotation that tells Spring to automatically inject the dependency I need. The recommended approach in modern Spring Boot is constructor injection - I just define the dependency as a constructor parameter and Spring provides it automatically. You don't even need the `@Autowired` annotation on the constructor anymore if there's only one constructor. Field injection with `@Autowired` directly on a field works too but constructor injection is preferred because it makes dependencies explicit and supports immutability."

---

### 54. What is application.properties in Spring Boot?

**Answer:** `application.properties` (or `application.yml`) is the main configuration file in Spring Boot. It stores settings like database connection URL, server port, logging level, and custom application properties. Spring Boot reads this file on startup and uses the values to configure the application automatically.

**HOW TO SAY IT:** "It's the central configuration file for a Spring Boot application. I set things like the database URL, server port, logging levels, and any custom settings my app needs. Spring Boot reads this file at startup. You can also have different profiles - like `application-dev.properties` for development and `application-prod.properties` for production, so you can have different database connections for different environments."

---

### 55. What is JPA and what is an Entity?

**Answer:** JPA (Java Persistence API) is a specification for mapping Java objects to database tables - this is called Object-Relational Mapping (ORM). An Entity is a Java class annotated with `@Entity` that represents a database table. Each instance of an Entity corresponds to a row in the table. Spring Data JPA provides a simple way to do database operations.

**HOW TO SAY IT:** "JPA is how Java maps objects to database tables. Instead of writing raw SQL, I create a Java class, annotate it with `@Entity`, and JPA handles the database mapping. Each field in the class maps to a column in the table. Spring Data JPA takes it further - I just define an interface that extends JpaRepository, and Spring automatically provides methods like `findAll()`, `findById()`, `save()`, and `delete()` without me writing any implementation."

---

## General / DevOps

### 56. What is Kubernetes?

**Answer:** Kubernetes (K8s) is an open-source platform for managing containerized applications. It automates deployment, scaling, and operations of application containers. It handles load balancing, self-healing (restarting failed containers), and rolling updates. Think of it as an orchestrator that manages many Docker containers across multiple servers.

**HOW TO SAY IT:** "Kubernetes is a container orchestration platform. If Docker is about running a single container, Kubernetes manages hundreds or thousands of containers across multiple servers. It handles things like: if a container crashes, Kubernetes automatically restarts it. If traffic increases, it can scale up more containers. It also handles rolling updates so you can deploy new versions without downtime. I understand it at a conceptual level and I'm eager to get hands-on experience with it."

---

### 57. What is Docker?

**Answer:** Docker is a platform that packages an application and all its dependencies into a container. A container is like a lightweight virtual machine that runs consistently on any machine. This solves the "it works on my machine" problem. You define how to build a container in a Dockerfile, and the result is a portable, consistent environment.

**HOW TO SAY IT:** "Docker packages an application with everything it needs - the code, runtime, libraries, and settings - into a container. That container runs the same way on my laptop, on a test server, or in production. It eliminates environment issues. A Dockerfile is the recipe that describes how to build the container. Docker images are stored in registries, and Kubernetes then orchestrates running those containers at scale."

---

### 58. What is CI/CD?

**Answer:** CI (Continuous Integration) means developers regularly merge their code into a shared repository, and automated tests run on every merge to catch bugs early. CD (Continuous Delivery/Deployment) means code that passes tests is automatically deployed to production or staging. Together, CI/CD automates the build-test-deploy pipeline.

**HOW TO SAY IT:** "CI/CD automates the path from code commit to production. Continuous Integration means every time I push code, it automatically builds and runs tests - so bugs are caught immediately. Continuous Deployment takes it further by automatically deploying to staging or production once tests pass. Tools like GitHub Actions, Jenkins, or Azure DevOps handle this. It means faster releases and fewer errors because nothing is manual."

---

### 59. What is Git and why is it important?

**Answer:** Git is a distributed version control system that tracks changes to code. It lets multiple developers work on the same project without overwriting each other's work. Key concepts are commits (save points), branches (parallel versions), and merging (combining branches). It's essential for team collaboration and code history.

**HOW TO SAY IT:** "Git tracks every change to a codebase and lets multiple developers work simultaneously. I create branches for features, make commits as I work, and then merge back to the main branch. If something goes wrong, I can look at the history or revert to a previous state. I use it daily with GitHub - creating pull requests, reviewing code, and resolving merge conflicts."

---

### 60. What is Azure?

**Answer:** Azure is Microsoft's cloud computing platform. It provides services for hosting applications, databases, virtual machines, storage, AI tools, and much more. It competes with AWS and Google Cloud. For a development team, Azure provides servers to run your applications, databases to store data, and tools for CI/CD and monitoring.

**HOW TO SAY IT:** "Azure is Microsoft's cloud platform - it's where you deploy and run applications in production. Instead of buying and maintaining physical servers, you use Azure's infrastructure. It offers services for everything: hosting web apps, running databases, managing containers with Azure Kubernetes Service, CI/CD with Azure DevOps, and monitoring with Application Insights. It integrates particularly well with .NET and Java Spring Boot applications."

---

### 61. What is an API?

**Answer:** An API (Application Programming Interface) is a set of rules that allows different software systems to communicate with each other. In web development, it usually refers to a web API (REST API) where the frontend sends HTTP requests to the backend and receives JSON data back. It's the bridge between the frontend and backend.

**HOW TO SAY IT:** "An API is a contract between systems for how they communicate. In our context, the Angular frontend sends HTTP requests to the Spring Boot backend's API endpoints, and the backend responds with JSON data. For example, calling `GET /api/users` tells the backend 'give me all the users,' and it responds with the data. The API defines what endpoints exist, what data you send, and what you get back."

---

### 62. What is the difference between frontend and backend?

**Answer:** The frontend is what the user sees and interacts with in the browser - built with HTML, CSS, and JavaScript/TypeScript frameworks like Angular or React. The backend runs on a server and handles business logic, database operations, authentication, and data processing - built with languages like Java (Spring Boot) or Node.js. They communicate through APIs.

**HOW TO SAY IT:** "The frontend is the user interface - everything the user sees and clicks on. It runs in the browser and is built with Angular in our case. The backend runs on the server and handles the heavy lifting - business logic, database queries, authentication, and data processing. In our stack, that's Java with Spring Boot. They talk to each other through REST APIs. The frontend makes HTTP requests, the backend processes them and sends back data."

---

### 63. What is Agile/Scrum?

**Answer:** Agile is a development methodology that delivers software in small, iterative increments rather than one big release. Scrum is a specific Agile framework where work is done in sprints (usually 2-week cycles). The team has daily standups, sprint planning, and retrospectives. It emphasizes collaboration, flexibility, and continuous improvement.

**HOW TO SAY IT:** "Agile is about building software iteratively - delivering working features in small increments rather than trying to build everything at once. Scrum is the specific framework I'm familiar with. We work in sprints, usually two weeks, with daily standup meetings to sync up. At the start of each sprint, we plan what we'll build, and at the end, we review what was done and how to improve. I value the focus on communication and adapting to change."

---

## Bonus: Behavioral / Soft Skill Questions

### 64. Tell me about yourself.

**HOW TO SAY IT:** "I'm a software developer transitioning into a junior engineer role with a focus on fullstack development. I've been working with React and TypeScript on the frontend and I'm expanding my skills to Angular and Spring Boot. I recently built a recruitment management platform using React and TypeScript where I handled component architecture, API integration, and responsive design. I'm excited about this role because it aligns with the technologies I'm learning and I'm eager to grow within a team environment."

---

### 65. Why do you want this job?

**HOW TO SAY IT:** "I'm drawn to this position because the tech stack matches my skills and the direction I'm growing in. I have experience with TypeScript and frontend frameworks, and I'm actively learning Angular and Spring Boot. The opportunity to work on both frontend and backend in a team environment is exactly what I'm looking for at this stage of my career. I also find [company name/industry] interesting because [something specific about the company]."

---

### 66. Tell me about a challenging project you worked on.

**HOW TO SAY IT:** "I worked on a recruitment management platform built with React and TypeScript. One of the challenges was designing a component architecture that could handle different views - like candidate lists, job postings, and application tracking - while keeping the code maintainable. I implemented reusable components, used TypeScript interfaces for type safety across the application, and integrated REST APIs for data management. The experience taught me a lot about thinking through architecture before jumping into code."

---

### 67. How do you handle not knowing something?

**HOW TO SAY IT:** "I start by trying to understand the problem clearly. Then I check the official documentation first - I find that's usually the most reliable source. If I'm still stuck, I'll look at examples, check Stack Overflow, or ask a team member. I believe in being honest when I don't know something rather than pretending - it's faster to ask and learn than to waste time guessing. I also document what I learn for future reference."

---

> **Remember:** For a junior role, they don't expect you to know everything. They expect you to know the basics well, show genuine enthusiasm for learning, and demonstrate that you can think logically about problems. Honesty and a growth mindset matter more than having all the answers.
