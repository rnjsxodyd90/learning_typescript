// ================================================================
// DAY 3 - FILE 5: ANGULAR FORMS
// ================================================================
//
// THIS FILE IS FOR READING AND LEARNING ONLY.
// You do NOT run this file. Read the comments, understand the code.
//
// Prerequisites: Read files 02, 03, and 04 first.
//
// Forms are EVERYWHERE on the web: login pages, signup pages,
// search bars, checkout forms, settings pages...
//
// Angular provides TWO ways to build forms:
//   1. Template-Driven Forms — simpler, good for basic forms
//   2. Reactive Forms — more powerful, better for complex forms
//
// We will focus mainly on Template-Driven Forms since they are
// easier to understand as a beginner.
//
// ================================================================

import { Component } from '@angular/core';


// ============================================
// SECTION 1: Template-Driven Forms — The Basics
// ============================================
//
// Template-Driven forms are called "template-driven" because most of the
// form logic lives in the HTML TEMPLATE, not in the TypeScript class.
//
// You use directives like ngModel, required, minlength directly in the HTML.
//
// IMPORTANT: To use template-driven forms, you must import FormsModule
// in your app.module.ts:
//
//   import { FormsModule } from '@angular/forms';
//
//   @NgModule({
//     imports: [
//       BrowserModule,
//       FormsModule        // <--- ADD THIS
//     ],
//     ...
//   })
//   export class AppModule { }


// ============================================
// SECTION 2: Simple Form with ngModel
// ============================================

@Component({
  selector: 'app-simple-form',
  template: `
    <h2>Contact Form</h2>

    <form>
      <!-- TEXT INPUT with ngModel -->
      <div>
        <label for="nameInput">Name:</label>
        <input
          type="text"
          id="nameInput"
          [(ngModel)]="name"
          name="name"
        >
        <!--
          [(ngModel)]="name"
            -> Two-way binding: links this input to the "name" variable.
            -> When the user types, "name" updates.
            -> If "name" changes in code, the input updates too.

          name="name"
            -> REQUIRED when using ngModel inside a form.
            -> This is the HTML "name" attribute. Angular uses it internally
               to register the control. Without it, you get an error.
            -> This is NOT the same as [(ngModel)]="name". The attribute
               name is just a label for the form system.
        -->
      </div>

      <!-- EMAIL INPUT -->
      <div>
        <label for="emailInput">Email:</label>
        <input
          type="email"
          id="emailInput"
          [(ngModel)]="email"
          name="email"
        >
      </div>

      <!-- TEXTAREA -->
      <div>
        <label for="messageInput">Message:</label>
        <textarea
          id="messageInput"
          [(ngModel)]="message"
          name="message"
          rows="4"
        ></textarea>
      </div>

      <!-- SELECT (dropdown) -->
      <div>
        <label for="topicSelect">Topic:</label>
        <select id="topicSelect" [(ngModel)]="selectedTopic" name="topic">
          <option value="">-- Choose a topic --</option>
          <option *ngFor="let topic of topics" [value]="topic">
            {{ topic }}
          </option>
        </select>
      </div>

      <!-- CHECKBOX -->
      <div>
        <label>
          <input type="checkbox" [(ngModel)]="agreeToTerms" name="agreeToTerms">
          I agree to the terms and conditions
        </label>
      </div>

      <!-- SUBMIT BUTTON -->
      <button type="submit" (click)="onSubmit()">Send</button>
    </form>

    <!-- Preview of form data (for learning/debugging) -->
    <div class="preview">
      <h3>Form Data Preview:</h3>
      <p>Name: {{ name }}</p>
      <p>Email: {{ email }}</p>
      <p>Message: {{ message }}</p>
      <p>Topic: {{ selectedTopic }}</p>
      <p>Agreed: {{ agreeToTerms }}</p>
    </div>
  `
})
export class SimpleFormComponent {
  name: string = '';
  email: string = '';
  message: string = '';
  selectedTopic: string = '';
  agreeToTerms: boolean = false;

  topics: string[] = ['General Inquiry', 'Bug Report', 'Feature Request', 'Other'];

  onSubmit(): void {
    console.log('Form submitted!');
    console.log('Name:', this.name);
    console.log('Email:', this.email);
    console.log('Message:', this.message);
    console.log('Topic:', this.selectedTopic);
    console.log('Agreed:', this.agreeToTerms);

    // In a real app, you would send this data to a server here.
  }
}


// ============================================
// SECTION 3: Form Validation
// ============================================
//
// Validation means checking if the user entered CORRECT data before submitting.
// For example:
//   - Is the name field empty? -> Show "Name is required"
//   - Is the email valid? -> Show "Please enter a valid email"
//   - Is the password long enough? -> Show "Password must be at least 8 characters"
//
// Angular has built-in validation that works with standard HTML validation attributes.
//
// Built-in validators you can use in the template:
//   required        -> field must not be empty
//   minlength="3"   -> minimum number of characters
//   maxlength="50"  -> maximum number of characters
//   pattern="..."   -> must match a regex pattern
//   email           -> must look like an email (has @ and a domain)
//   min="0"         -> minimum number value
//   max="100"       -> maximum number value

@Component({
  selector: 'app-validated-form',
  template: `
    <h2>Registration Form (with Validation)</h2>

    <!--
      #registrationForm="ngForm"
        -> This creates a REFERENCE to the form.
        -> "ngForm" is an Angular directive that tracks the form's state.
        -> #registrationForm is a template reference variable.
        -> We can use registrationForm.valid, registrationForm.submitted, etc.

      (ngSubmit)="onRegister(registrationForm)"
        -> This is the form submit event.
        -> It fires when the user clicks the submit button or presses Enter.
        -> We pass the form reference to our method so we can check validation.
    -->
    <form #registrationForm="ngForm" (ngSubmit)="onRegister(registrationForm)">

      <!-- NAME FIELD with validation -->
      <div>
        <label>Name:</label>
        <input
          type="text"
          [(ngModel)]="user.name"
          name="name"
          required
          minlength="2"
          #nameField="ngModel"
        >
        <!--
          required         -> the field must not be empty
          minlength="2"    -> must have at least 2 characters
          #nameField="ngModel"
            -> Creates a reference to THIS specific input's ngModel
            -> We can check nameField.valid, nameField.errors, etc.
            -> This lets us show specific error messages
        -->

        <!-- ERROR MESSAGES -->
        <div *ngIf="nameField.invalid && nameField.touched" class="error">
          <!--
            nameField.invalid  -> true if any validation rule fails
            nameField.touched  -> true if the user has clicked into and out of the field
            We check BOTH because we don't want to show errors before the user
            has even tried to fill in the field.
          -->

          <p *ngIf="nameField.errors?.['required']">Name is required.</p>
          <!--
            nameField.errors is an object containing which validations failed.
            If the "required" validator failed, errors['required'] exists.
            The ?. is the "optional chaining" operator — it prevents errors
            if nameField.errors is null.
          -->

          <p *ngIf="nameField.errors?.['minlength']">
            Name must be at least 2 characters.
          </p>
        </div>
      </div>

      <!-- EMAIL FIELD with validation -->
      <div>
        <label>Email:</label>
        <input
          type="email"
          [(ngModel)]="user.email"
          name="email"
          required
          email
          #emailField="ngModel"
        >
        <!--
          email  -> built-in Angular validator that checks for a valid email format
        -->

        <div *ngIf="emailField.invalid && emailField.touched" class="error">
          <p *ngIf="emailField.errors?.['required']">Email is required.</p>
          <p *ngIf="emailField.errors?.['email']">Please enter a valid email.</p>
        </div>
      </div>

      <!-- PASSWORD FIELD with validation -->
      <div>
        <label>Password:</label>
        <input
          type="password"
          [(ngModel)]="user.password"
          name="password"
          required
          minlength="8"
          #passwordField="ngModel"
        >

        <div *ngIf="passwordField.invalid && passwordField.touched" class="error">
          <p *ngIf="passwordField.errors?.['required']">Password is required.</p>
          <p *ngIf="passwordField.errors?.['minlength']">
            Password must be at least 8 characters.
            (Currently {{ passwordField.value?.length || 0 }} characters)
          </p>
        </div>
      </div>

      <!-- SUBMIT BUTTON -->
      <button type="submit" [disabled]="registrationForm.invalid">
        Register
      </button>
      <!--
        [disabled]="registrationForm.invalid"
          -> The button is DISABLED (grayed out, cannot click) until
             ALL validation rules pass.
          -> registrationForm.invalid is true if ANY field has errors.
          -> Once every field is valid, the button becomes clickable.
      -->

      <!-- Form-level status message -->
      <p *ngIf="registrationForm.submitted && registrationForm.valid" class="success">
        Registration successful!
      </p>
    </form>
  `,
  styles: [`
    .error { color: red; font-size: 12px; }
    .success { color: green; font-weight: bold; }
    input.ng-invalid.ng-touched { border: 2px solid red; }
    input.ng-valid.ng-touched { border: 2px solid green; }
    button:disabled { background: #ccc; cursor: not-allowed; }
  `]
  //
  // CSS CLASS EXPLANATION:
  // Angular automatically adds CSS classes to form fields:
  //   .ng-valid     -> field passes all validation
  //   .ng-invalid   -> field fails one or more validations
  //   .ng-touched   -> user has focused and blurred the field
  //   .ng-untouched -> user has not interacted with the field yet
  //   .ng-dirty     -> user has changed the field's value
  //   .ng-pristine  -> field value has not been changed
  //
  // So "input.ng-invalid.ng-touched" targets inputs that are
  // BOTH invalid AND have been touched (user tried to fill them).
  // This gives a red border to invalid fields only AFTER the user interacts.
})
export class ValidatedFormComponent {

  user = {
    name: '',
    email: '',
    password: ''
  };

  onRegister(form: any): void {
    if (form.valid) {
      console.log('Registration data:', this.user);
      // In a real app, send this.user to a server via an HTTP service
    } else {
      console.log('Form is invalid. Please fix the errors.');
    }
  }
}


// ============================================
// SECTION 4: Complete Login Form Example
// ============================================
//
// This is a complete, realistic login form — the kind you might
// be asked to explain or write in an interview.

@Component({
  selector: 'app-login-form',
  template: `
    <div class="login-container">
      <h2>Login</h2>

      <!-- Show error message if login fails -->
      <div *ngIf="loginError" class="error-box">
        {{ loginError }}
      </div>

      <!-- Show success message if login succeeds -->
      <div *ngIf="loginSuccess" class="success-box">
        Welcome, {{ username }}! You are now logged in.
      </div>

      <!-- The login form (hide it after successful login) -->
      <form
        *ngIf="!loginSuccess"
        #loginForm="ngForm"
        (ngSubmit)="onLogin(loginForm)"
      >

        <!-- Username -->
        <div class="form-group">
          <label for="username">Username:</label>
          <input
            type="text"
            id="username"
            [(ngModel)]="username"
            name="username"
            required
            minlength="3"
            #usernameField="ngModel"
            placeholder="Enter your username"
          >
          <div *ngIf="usernameField.invalid && usernameField.touched" class="error">
            <span *ngIf="usernameField.errors?.['required']">Username is required.</span>
            <span *ngIf="usernameField.errors?.['minlength']">
              Username must be at least 3 characters.
            </span>
          </div>
        </div>

        <!-- Password -->
        <div class="form-group">
          <label for="password">Password:</label>
          <input
            type="password"
            id="password"
            [(ngModel)]="password"
            name="password"
            required
            minlength="6"
            #passwordField="ngModel"
            placeholder="Enter your password"
          >
          <div *ngIf="passwordField.invalid && passwordField.touched" class="error">
            <span *ngIf="passwordField.errors?.['required']">Password is required.</span>
            <span *ngIf="passwordField.errors?.['minlength']">
              Password must be at least 6 characters.
            </span>
          </div>
        </div>

        <!-- Remember Me checkbox -->
        <div class="form-group">
          <label>
            <input type="checkbox" [(ngModel)]="rememberMe" name="rememberMe">
            Remember me
          </label>
        </div>

        <!-- Submit button -->
        <button type="submit" [disabled]="loginForm.invalid || isLoading">
          {{ isLoading ? 'Logging in...' : 'Login' }}
        </button>
        <!--
          {{ isLoading ? 'Logging in...' : 'Login' }}
            -> This is a TERNARY in interpolation.
            -> If isLoading is true, the button says "Logging in..."
            -> If isLoading is false, the button says "Login"
        -->

      </form>
    </div>
  `,
  styles: [`
    .login-container {
      max-width: 400px;
      margin: 50px auto;
      padding: 30px;
      border: 1px solid #ddd;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    h2 { text-align: center; margin-bottom: 20px; }
    .form-group { margin-bottom: 16px; }
    .form-group label { display: block; margin-bottom: 4px; font-weight: bold; }
    .form-group input[type="text"],
    .form-group input[type="password"] {
      width: 100%;
      padding: 10px;
      border: 1px solid #ccc;
      border-radius: 4px;
      font-size: 14px;
    }
    button {
      width: 100%;
      padding: 12px;
      background: #007bff;
      color: white;
      border: none;
      border-radius: 4px;
      font-size: 16px;
      cursor: pointer;
    }
    button:hover:not(:disabled) { background: #0056b3; }
    button:disabled { background: #ccc; cursor: not-allowed; }
    .error { color: red; font-size: 12px; margin-top: 4px; }
    .error-box {
      background: #ffe0e0;
      border: 1px solid red;
      color: red;
      padding: 10px;
      border-radius: 4px;
      margin-bottom: 16px;
    }
    .success-box {
      background: #e0ffe0;
      border: 1px solid green;
      color: green;
      padding: 10px;
      border-radius: 4px;
    }
  `]
})
export class LoginFormComponent {

  username: string = '';
  password: string = '';
  rememberMe: boolean = false;
  isLoading: boolean = false;
  loginError: string = '';
  loginSuccess: boolean = false;

  onLogin(form: any): void {
    if (form.invalid) {
      return;   // Do nothing if the form is invalid
    }

    // Clear previous error
    this.loginError = '';

    // Simulate loading (in a real app, you would call an HTTP service)
    this.isLoading = true;

    // Simulate a server call with a timeout
    // setTimeout is a JavaScript function that runs code after a delay
    setTimeout(() => {
      // Simulated check (in real life this would be a server response)
      if (this.username === 'admin' && this.password === 'password') {
        this.loginSuccess = true;
      } else {
        this.loginError = 'Invalid username or password. Please try again.';
      }
      this.isLoading = false;
    }, 1500);  // 1500 milliseconds = 1.5 seconds delay
  }
}


// ============================================
// SECTION 5: Reactive Forms (Brief Overview)
// ============================================
//
// Reactive forms are the MORE ADVANCED way to build forms in Angular.
// They put more logic in the TypeScript class instead of the template.
//
// You do NOT need to know reactive forms deeply for a junior interview,
// but you should know they exist and what makes them different.
//
// KEY DIFFERENCES:
//
//   Template-Driven Forms:
//     - Logic mostly in HTML template
//     - Uses ngModel
//     - Simpler syntax
//     - Good for simple forms
//     - Requires FormsModule
//
//   Reactive Forms:
//     - Logic mostly in TypeScript class
//     - Uses FormGroup, FormControl, FormBuilder
//     - More code upfront
//     - Better for complex forms (dynamic fields, complex validation)
//     - Easier to test
//     - Requires ReactiveFormsModule
//
// Here is a QUICK look at what reactive forms look like:

// import { FormGroup, FormControl, Validators } from '@angular/forms';
//
// @Component({
//   selector: 'app-reactive-login',
//   template: `
//     <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
//       <input formControlName="username" placeholder="Username">
//       <input formControlName="password" type="password" placeholder="Password">
//       <button type="submit" [disabled]="loginForm.invalid">Login</button>
//     </form>
//   `
// })
// export class ReactiveLoginComponent {
//
//   // The form is defined ENTIRELY in TypeScript
//   loginForm = new FormGroup({
//     username: new FormControl('', [Validators.required, Validators.minLength(3)]),
//     password: new FormControl('', [Validators.required, Validators.minLength(6)])
//   });
//
//   onSubmit(): void {
//     console.log(this.loginForm.value);
//     // Output: { username: 'admin', password: 'secret123' }
//   }
// }
//
// Notice:
//   - No [(ngModel)] in the template
//   - Instead, we use formControlName to link inputs to FormControls
//   - Validators are defined in TypeScript, not in HTML
//   - The form definition (FormGroup with FormControls) is in the class


// ============================================
// SECTION 6: Key Takeaways for Interviews
// ============================================

// 1. Angular has two approaches to forms:
//    - Template-Driven: simpler, logic in HTML, uses ngModel
//    - Reactive: more powerful, logic in TypeScript, uses FormGroup/FormControl
//
// 2. For template-driven forms, import FormsModule.
//    For reactive forms, import ReactiveFormsModule.
//
// 3. ngModel provides two-way data binding for form inputs.
//    EVERY ngModel inside a <form> needs a "name" attribute.
//
// 4. Validation attributes: required, minlength, maxlength, email, pattern
//
// 5. To show errors, use template reference variables (#fieldName="ngModel")
//    and check fieldName.invalid && fieldName.touched
//
// 6. Angular automatically adds CSS classes: ng-valid, ng-invalid, ng-touched, ng-dirty
//
// 7. Disable the submit button when the form is invalid:
//    [disabled]="formName.invalid"
//
// INTERVIEW QUESTION: "How do you handle forms in Angular?"
// ANSWER: "Angular provides two approaches: template-driven forms and reactive forms.
//   Template-driven forms use ngModel for two-way data binding and put validation
//   rules in the HTML template using attributes like required and minlength.
//   Reactive forms define the form structure and validation in the TypeScript class
//   using FormGroup and FormControl, which gives more control and is better for
//   complex forms. For basic forms, I would use template-driven. For complex
//   forms with dynamic fields, I would use reactive forms."
