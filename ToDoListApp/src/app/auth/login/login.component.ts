// // login.component.ts
// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { HttpClient } from '@angular/common/http';
// import { AuthService } from '../auth.service';
// import { Router } from '@angular/router';

// @Component({
//   selector: 'app-login',
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.css'],
// })

// export class LoginComponent implements OnInit {
//   loginForm: FormGroup;
//   errorMessage: string | null = null;

//   constructor(
//     private fb: FormBuilder,
//     private http: HttpClient,
//     private authService: AuthService
//   ) {
//     this.loginForm = this.fb.group({
//       email: ['', [Validators.required, Validators.email]],
//       password: ['', Validators.required],
//     });
//   }

//   ngOnInit(): void {}

//   onSubmit() {
//     if (this.loginForm.valid) {
//       const loginData = this.loginForm.value;

//       const loginUrl = 'http://localhost:3232/user/login';

//       this.http.post(loginUrl, loginData).subscribe(
//         (response: any) => {
//           console.log('Login successful:', response);
//           this.authService.login(response.username, response.token, response.isAdmin);
//           this.showSuccessAlert(); // Call the function to show success alert
//         },
//         (error) => {
//           console.error('Login failed:', error);

//           if (error.status === 401) {
//             this.errorMessage = 'Invalid email or password.';
//           } else {
//             this.errorMessage = 'An unexpected error occurred. Please try again.';
//           }
//         }
//       );
//     } else {
//       console.log('Form is invalid');
//       // Display error messages or handle an invalid form
//     }
//   }

//   showSuccessAlert() {
//     alert('Login successful!');
//     // You can replace this with a more sophisticated modal or notification library if needed.
//   }
// }

// login.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router'; // Import Router
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private authService: AuthService,
    private router: Router // Inject the Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    if (this.loginForm.valid) {
      const loginData = this.loginForm.value;
      const loginUrl = 'http://localhost:3232/user/login';

      this.http.post(loginUrl, loginData).subscribe(
        (response: any) => {
          console.log('Login successful:', response);
          this.authService.login(
            response.username,
            response.token,
            response.isAdmin
          );
          this.router.navigate(['/employetask']); // Navigate to employetask page on success
        },
        (error) => {
          console.error('Login failed:', error);

          if (error.status === 401) {
            this.errorMessage = 'Invalid email or password.';
          } else {
            this.errorMessage =
              'An unexpected error occurred. Please try again.';
          }
        }
      );
    } else {
      console.log('Form is invalid');
      // Display error messages or handle an invalid form
    }
  }
}
