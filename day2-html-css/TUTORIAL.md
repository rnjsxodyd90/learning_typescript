# Day 2: HTML & CSS - The Building Blocks of Every Website

## Welcome!

Before we touch Angular or TypeScript, we NEED to understand HTML and CSS.
Every single website you have ever visited is made of HTML and CSS.
Google, YouTube, Amazon -- all of them. Let's learn what they are.

---

## What is HTML?

HTML stands for **HyperText Markup Language**.

Think of it like the **skeleton** of a human body.
It gives the webpage its **structure** -- where the heading goes, where the
paragraph goes, where the image goes, where the button goes.

HTML uses **tags** to define things. Tags look like this:

```html
<p>This is a paragraph</p>
```

- `<p>` is the **opening tag** (it says "a paragraph starts here")
- `</p>` is the **closing tag** (it says "the paragraph ends here")
- The text between them is the **content**

That's it. HTML is just tags wrapping content. Nothing scary.

---

## What is CSS?

CSS stands for **Cascading Style Sheets**.

If HTML is the skeleton, CSS is the **clothes, paint, and makeup**.
It makes things look good -- colors, sizes, spacing, fonts, layout.

Without CSS, every website would look like a plain Word document from 1995.

CSS looks like this:

```css
p {
    color: blue;
    font-size: 20px;
}
```

This says: "Find all paragraphs, make the text blue, and make the font size 20 pixels."

---

## How Do HTML and CSS Work Together?

1. You write HTML to create the structure (headings, paragraphs, buttons, images)
2. You write CSS to style that structure (colors, sizes, layout)
3. The browser reads both and shows you a pretty webpage

---

## How to Open HTML Files in Your Browser

This is the easiest part:

1. Find the `.html` file on your computer (like the files in this folder)
2. **Double-click it** -- it will open in your default web browser (Chrome, Edge, Firefox)
3. That's it. You're looking at a webpage YOU made.

To see your changes:
1. Edit the file in VS Code (or any text editor)
2. Save it (Ctrl + S)
3. Go to the browser and refresh (F5 or Ctrl + R)

---

## Basic HTML Document Structure

Every HTML page has this structure:

```html
<!DOCTYPE html>
<html>
  <head>
    <title>My Page Title</title>
  </head>
  <body>
    <!-- Everything the user SEES goes here -->
    <h1>Hello World</h1>
    <p>This is my first webpage.</p>
  </body>
</html>
```

Let me break that down:

| Tag | What It Does |
|-----|-------------|
| `<!DOCTYPE html>` | Tells the browser "this is an HTML5 document" (just always include it) |
| `<html>` | The root container -- everything goes inside this |
| `<head>` | Invisible stuff -- page title, settings, links to CSS files |
| `<title>` | The text that shows in the browser tab |
| `<body>` | Everything the user actually SEES on the page |

---

## What You'll Learn in These Files

| File | What You'll Learn |
|------|------------------|
| `01-basic-html.html` | All the essential HTML tags (headings, paragraphs, links, images, lists) |
| `02-forms.html` | How to build forms (text boxes, dropdowns, checkboxes) -- CRITICAL for Angular |
| `03-css-basics.html` | How CSS works -- colors, fonts, spacing, the box model |
| `04-flexbox.html` | How to arrange items in rows and columns (Flexbox layout) |
| `05-responsive.html` | How to make pages work on phones AND desktops |
| `06-exercise.html` | A practice exercise -- build a profile card! |

---

## Tips for Learning

1. **Open each file in your browser** and see what it looks like
2. **Read the comments** in the code (comments look like `<!-- this -->` in HTML)
3. **Change things** and refresh the browser to see what happens
4. **Break things on purpose** -- delete a tag, see what happens, then undo it
5. Don't memorize -- just understand. You can always Google tag names later.

---

## Why This Matters for Your Interview

- Every Angular component has an HTML template -- you MUST know HTML
- Every Angular component has CSS styles -- you MUST know CSS
- Forms are EVERYWHERE in real apps -- login pages, sign-up pages, search bars
- Flexbox is how you lay out 90% of modern web pages
- Interviewers WILL ask you about basic HTML/CSS. It's considered fundamental.

---

## Ready? Open `01-basic-html.html` in your browser and start learning!
