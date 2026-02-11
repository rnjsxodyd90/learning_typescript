# Day 4: Angular Services, HTTP, and Routing

## Welcome Back!

You have made it to Day 4. Today we tackle the concepts that separate someone
who "knows a little Angular" from someone who actually understands how Angular
applications work in the real world.

If Days 1-3 taught you how to build individual LEGO pieces (components, templates,
data binding), today you learn how to connect those pieces into a real, working
application that talks to servers and has multiple pages.

---

## What You Will Learn Today

| # | Topic                  | Why It Matters                                      |
|---|------------------------|-----------------------------------------------------|
| 1 | **Services**           | Where your business logic and data management live  |
| 2 | **Dependency Injection** | THE #1 most asked Angular interview question      |
| 3 | **HTTP Client**        | How your app talks to a server (fetching/sending data) |
| 4 | **Routing**            | How users navigate between pages without reloading  |
| 5 | **Pipes**              | How you format data for display (dates, currency)   |

---

## Why These Concepts WILL Come Up in Interviews

### Dependency Injection
Every. Single. Angular. Interview. Will. Ask. About. This.

It is not optional knowledge. It is not "nice to have." If you cannot explain
dependency injection clearly, the interviewer will assume you do not understand
Angular at all. We will drill this concept until it feels natural.

### Services
Interviewers want to know that you understand SEPARATION OF CONCERNS. They want
to hear you say: "Business logic goes in services, display logic goes in
components." That single sentence can carry you through a question.

### HTTP / API Calls
Every real application fetches data from a server. Interviewers will ask how
Angular does this. You need to know HttpClient and Observables.

### Routing
Single Page Applications (SPAs) do not reload the entire page when you navigate.
Interviewers will ask how Angular handles navigation. You need to know the
basics of the Router.

---

## How These Pieces Connect

Here is the big picture. Read this carefully because understanding how the
pieces fit together is MORE important than memorizing syntax.

```
  USER CLICKS A LINK
        |
        v
  [ROUTING] --> Decides which PAGE (component) to show
        |
        v
  [COMPONENT] --> The page loads and needs data
        |
        v
  [SERVICE] --> The component asks the service for data
        |
        v
  [HTTP CLIENT] --> The service calls an API on a server
        |
        v
  [SERVER / API] --> Returns data (usually JSON)
        |
        v
  [SERVICE] --> Receives the data, passes it to the component
        |
        v
  [COMPONENT] --> Displays the data using the template
        |
        v
  [PIPES] --> Format the data nicely (dates, currency, etc.)
        |
        v
  USER SEES THE PAGE
```

### A Real-World Example of the Flow

1. User clicks "Products" in the navigation menu
2. **Router** sees the URL changed to `/products` and loads the ProductListComponent
3. **ProductListComponent** says: "I need product data" and asks the **ProductService**
4. **ProductService** uses **HttpClient** to call `GET https://api.example.com/products`
5. The server responds with a JSON array of products
6. **ProductService** passes that data back to the component
7. **ProductListComponent** displays each product in the template
8. **Pipes** format the prices as currency ($19.99) and dates nicely

That is how a real Angular application works. Every piece has a job.

---

## File Guide

Read these files IN ORDER. Each one builds on the previous:

| File                          | What You Will Learn                          |
|-------------------------------|----------------------------------------------|
| `01-services.ts`              | What services are and how to create them     |
| `02-dependency-injection.ts`  | How Angular provides services to components  |
| `03-http-client.ts`          | How to call APIs and handle server data      |
| `04-routing.ts`              | How to set up multiple pages and navigation  |
| `05-pipes.ts`                | How to format data for display               |
| `06-exercise.md`             | Practice questions with answers              |

---

## Key Vocabulary for Today

Before you start, here are words you will see over and over:

- **Service**: A class that handles logic or data, separate from the UI
- **Dependency Injection (DI)**: A system where Angular automatically provides
  objects (services) to classes that need them
- **Injectable**: A decorator that marks a class as available for DI
- **HttpClient**: Angular's built-in tool for making HTTP requests (API calls)
- **Observable**: A stream of data you can subscribe to (like a newsletter)
- **Subscribe**: The act of listening to an Observable for data
- **Route**: A URL path mapped to a component (page)
- **Router**: The Angular service that handles navigation
- **Pipe**: A tool that transforms data for display in a template

---

## Study Strategy

1. Read each file top to bottom. Do NOT skip sections.
2. After each file, close it and try to explain the concept OUT LOUD.
3. If you cannot explain it simply, re-read the file.
4. After all files, do the exercises in `06-exercise.md`.
5. Practice explaining Dependency Injection to an imaginary friend.
   Seriously. Say it out loud. This is the question that will come up.

---

Let's get started. Open `01-services.ts` now.
