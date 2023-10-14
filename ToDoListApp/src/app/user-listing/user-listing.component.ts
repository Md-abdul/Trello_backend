// // user-listing.component.ts
// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { HttpClient } from '@angular/common/http';
// import { catchError } from 'rxjs/operators';
// import { throwError } from 'rxjs';
// import { NgZone } from '@angular/core';

// @Component({
//   selector: 'app-user-listing',
//   templateUrl: './user-listing.component.html',
//   styleUrls: ['./user-listing.component.css'],
// })
// export class UserListingComponent implements OnInit {
//   userForm: FormGroup;
//   users: any[] = [];
//   isEditing: boolean = false;
//   editingUserId: string | null = null; // Keep track of the ID of the user being edited

//   constructor(private formBuilder: FormBuilder, private http: HttpClient, private zone: NgZone) {
//     this.userForm = this.formBuilder.group({
//       username: ['', Validators.required],
//       email: ['', [Validators.required, Validators.email]],
//       password: ['', Validators.required],
//       position: ['', Validators.required],
//       role: ['', Validators.required],
//     });
//   }

//   ngOnInit() {
//     this.fetchUsers();
//   }

//   fetchUsers() {
//     this.http
//       .get<any>('http://localhost:3232/user/userslist') // Change to expect an object
//       .pipe(
//         catchError((error) => {
//           console.error('Error fetching users:', error);
//           return throwError(error);
//         })
//       )
//       .subscribe(
//         (response) => {
//           this.zone.run(() => {
//             this.users = response.users; // Extract 'users' array from the response
//           });
//         },
//         (error) => {
//           console.error('Error fetching users:', error);
//         }
//       );
//   }

//   onSubmit() {
//     if (this.userForm.valid) {
//       if (this.isEditing) {
//         // If editing, update the user
//         this.editUser();
//       } else {
//         // If not editing, create a new user
//         this.createUser();
//       }
//     } else {
//       // Handle form validation errors
//     }
//   }

//   createUser() {
//     this.http
//       .post('http://localhost:3232/user/signup', this.userForm.value)
//       .pipe(
//         catchError((error) => {
//           console.error('Error creating user:', error);
//           return throwError(error);
//         })
//       )
//       .subscribe(() => {
//         this.userForm.reset();
//         this.fetchUsers();
//       });
//   }

//   // editUser() {
//   //   if (this.editingUserId) {
//   //     // Update the user on the backend
//   //     this.http
//   //       .put(
//   //         `http://localhost:3232/user/update/${this.editingUserId}`,
//   //         this.userForm.value
//   //       )
//   //       .pipe(
//   //         catchError((error) => {
//   //           console.error('Error editing user:', error);
//   //           return throwError(error);
//   //         })
//   //       )
//   //       .subscribe(() => {
//   //         this.isEditing = false;
//   //         this.editingUserId = null;
//   //         this.userForm.reset();
//   //         this.fetchUsers();
//   //       });
//   //   }
//   // }
//   // editUser() {
//   //   if (this.editingUserId) {
//   //     // Update the user on the backend
//   //     this.http
//   //       .put(
//   //         `http://localhost:3232/user/update/${this.editingUserId}`,
//   //         this.userForm.value
//   //       )
//   //       .pipe(
//   //         catchError((error) => {
//   //           console.error('Error editing user:', error);
//   //           return throwError(error);
//   //         })
//   //       )
//   //       .subscribe(() => {
//   //         this.isEditing = false;
//   //         this.editingUserId = null;
//   //         this.userForm.reset();
//   //         this.fetchUsers();
//   //       });
//   //   }
//   // }
  

//   populateFormForEdit(user: any) {
//     this.isEditing = true;
//     this.editingUserId = user._id;
//     this.userForm.patchValue({
//       username: user.username,
//       email: user.email,
//       // Omitting the 'password' field from the update
//       position: user.position,
//       role: user.role,
//     });
//   }
  
//   editUser() {
//     if (this.editingUserId) {
//       this.http
//         .put(
//           `http://localhost:3232/user/update/${this.editingUserId}`,
//           this.userForm.value
//         )
//         .pipe(
//           catchError((error) => {
//             console.error('Error editing user:', error);
//             return throwError(error);
//           })
//         )
//         .subscribe(() => {
//           this.isEditing = false;
//           this.editingUserId = null;
//           this.userForm.reset();
//           this.fetchUsers();
//         });
//     }
//   }
  


//   // deleteUser(user: any) {
//   //   // Implement logic to delete the user on the backend
//   //   this.http
//   //     .delete(`http://localhost:3232/user/delete/${user._id}`)
//   //     .pipe(
//   //       catchError((error) => {
//   //         console.error('Error deleting user:', error);
//   //         return throwError(error);
//   //       })
//   //     )
//   //     .subscribe(() => {
//   //       this.userForm.reset();
//   //       this.fetchUsers();
//   //     });
//   // }

//   deleteUser(user: any) {
//     // Check if editingUserId is defined before making the delete request
//     if (this.editingUserId) {
//       this.http
//         .delete(`http://localhost:3232/user/delete/${this.editingUserId}`)
//         .pipe(
//           catchError((error) => {
//             console.error('Error deleting user:', error);
//             return throwError(error);
//           })
//         )
//         .subscribe(() => {
//           this.userForm.reset();
//           this.fetchUsers();
//         });
//     } else {
//       console.error('Editing user ID is undefined. Delete request cannot be made.');
//     }
//   }
  

//   // populateFormForEdit(user: any) {
//   //   this.isEditing = true;
//   //   this.editingUserId = user._id;
//   //   this.userForm.setValue({
//   //     username: user.username,
//   //     email: user.email,
//   //     password: '',
//   //     position: user.position,
//   //     role: user.role,
//   //   });
//   // }

//   clearForm() {
//     this.isEditing = false;
//     this.editingUserId = null;
//     this.userForm.reset();
//   }
// }


import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { NgZone } from '@angular/core';

@Component({
  selector: 'app-user-listing',
  templateUrl: './user-listing.component.html',
  styleUrls: ['./user-listing.component.css'],
})
export class UserListingComponent implements OnInit {

  maskPassword(password: string): string {
    // Show only the first 8 characters followed by '*'
    const truncatedPassword = password.substring(0, 8);
    return truncatedPassword.replace(/./g, '*');
  }

  userForm: FormGroup;
  users: any[] = [];
  isEditing: boolean = false;
  editingUserId: string | null = null; // Keep track of the ID of the user being edited

  constructor(private formBuilder: FormBuilder, private http: HttpClient, private zone: NgZone) {
    this.userForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      position: ['', Validators.required],
      role: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.fetchUsers();
  }

  fetchUsers() {
    this.http
      .get<any>('http://localhost:3232/user/userslist')
      .pipe(
        catchError((error) => {
          console.error('Error fetching users:', error);
          return throwError(error);
        })
      )
      .subscribe(
        (response) => {
          this.users = response.users;
        },
        (error) => {
          console.error('Error fetching users:', error);
        }
      );
  }

  onSubmit() {
    if (this.userForm.valid) {
      if (this.isEditing) {
        // If editing, update the user
        this.editUser();
      } else {
        // If not editing, create a new user
        this.createUser();
      }
    } else {
      // Handle form validation errors
      alert('Please fill in all required fields.');
    }
  }

  createUser() {
    this.http
      .post('http://localhost:3232/user/signup', this.userForm.value)
      .pipe(
        catchError((error) => {
          console.error('Error creating user:', error);
          alert('Failed to create user. Please try again.');
          return throwError(error);
        })
      )
      .subscribe(() => {
        this.userForm.reset();
        this.fetchUsers();
        alert('User created successfully.');
      });
  }

  editUser() {
    if (this.editingUserId) {
      this.http
        .put(
          `http://localhost:3232/user/update/${this.editingUserId}`,
          this.userForm.value
        )
        .pipe(
          catchError((error) => {
            console.error('Error editing user:', error);
            alert('Failed to update user. Please try again.');
            return throwError(error);
          })
        )
        .subscribe(() => {
          this.isEditing = false;
          this.editingUserId = null;
          this.userForm.reset();
          this.fetchUsers();
          alert('User updated successfully.');
        });
    }
  }

  deleteUser(user: any) {
    this.http
      .delete(`http://localhost:3232/user/delete/${user._id}`)
      .pipe(
        catchError((error) => {
          console.error('Error deleting user:', error);
          alert('Failed to delete user. Please try again.');
          return throwError(error);
        })
      )
      .subscribe(() => {
        this.userForm.reset();
        this.fetchUsers();
        alert('User deleted successfully.');
      });
  }

  populateFormForEdit(user: any) {
    this.isEditing = true;
    this.editingUserId = user._id;  // Set editingUserId here
    this.userForm.patchValue({
      username: user.username,
      email: user.email,
      password: user.password,
      position: user.position,
      role: user.role,
    });
  }

  clearForm() {
    this.isEditing = false;
    this.editingUserId = null;
    this.userForm.reset();
  }
}

