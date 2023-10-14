// // signup.component.ts
// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { HttpClient } from '@angular/common/http';
// // import { ToastrService } from 'ngx-toastr';

// @Component({
//   selector: 'app-signup',
//   templateUrl: './signup.component.html',
//   styleUrls: ['./signup.component.css'],
// })
// export class SignupComponent implements OnInit {
//   signupForm: FormGroup;

//   constructor(
//     private fb: FormBuilder,
//     private http: HttpClient
//   ) {
//     this.signupForm = this.fb.group({
//       username: ['', Validators.required],
//       email: ['', [Validators.required, Validators.email]],
//       password: ['', [Validators.required, Validators.minLength(6)]],
//       position: ['', Validators.required],
//       role: ['', Validators.required],
//     });
//   }

//   ngOnInit(): void {}

//   onSubmit() {
//     console.log('Form Controls:', this.signupForm.controls);

//     if (this.signupForm.valid) {
//       const signupData = this.signupForm.value;

//       // Make an HTTP POST request to the backend signup endpoint
//       const signupUrl = 'http://localhost:3232/user/signup';

//       this.http.post(signupUrl, signupData).subscribe(
//         (response) => {
//           console.log('Signup successful:', response);
//           // Optionally, you can redirect the user to a success page
//         },
//         (error) => {
//           console.error('Signup failed:', error);
//           // Handle signup failure, display error messages, etc.
//         }
//       );
//     } else {
//       console.log('Form is invalid');
//       // Display error messages or handle an invalid form
//     }
//   }

// }

// signup.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    this.signupForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      position: ['', Validators.required],
      role: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    console.log('Form Controls:', this.signupForm.controls);

    if (this.signupForm.valid) {
      const signupData = this.signupForm.value;

      // Make an HTTP POST request to the backend signup endpoint
      const signupUrl = 'http://localhost:3232/user/signup';

      this.http.post(signupUrl, signupData).subscribe(
        (response) => {
          console.log('Signup successful:', response);
          // Display a simple alert after successful signup
          window.alert('Signup successful!'); // You can replace this with a more sophisticated alert library
          
          // Clear the form
          this.signupForm.reset();

          // Redirect to the login page
          this.router.navigate(['/login']);
        },
        (error) => {
          console.error('Signup failed:', error);
          // Handle signup failure, display error messages, etc.
        }
      );
    } else {
      console.log('Form is invalid');
      // Display error messages or handle an invalid form
    }
  }
}
