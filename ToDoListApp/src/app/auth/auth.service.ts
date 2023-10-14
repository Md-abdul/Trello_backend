
// // auth.service.ts
// import { Injectable } from '@angular/core';
// import { Router } from '@angular/router';

// @Injectable({
//   providedIn: 'root',
// })
// export class AuthService {
//   private isLoggedIn = false;
//   private username: string | null = null;
//   // private adminStatus = false;

//   constructor(private router: Router) {}

//   login(username: string, token: string, isAdmin: boolean): void {
//     this.isLoggedIn = true;
//     this.username = username;
//     // this.adminStatus = isAdmin;
//     localStorage.setItem('token', token);
//   }

//   logout(): void {
//     this.isLoggedIn = false;
//     this.username = null;
//     // this.adminStatus = false;
//     localStorage.removeItem('token');
//     this.router.navigate(["/homepage"]);
//     alert('user logout success full !!')
//   }

//   getIsLoggedIn(): boolean {
//     return this.isLoggedIn && !!localStorage.getItem('token');
//   }

//   getUsername(): string | null {
//     return this.username;
//   }

//   // isAdmin(): boolean {
//   //   return this.adminStatus;
//   // }
// }


// auth.service.ts
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isLoggedIn = false;
  private username: string | null = null;
  private adminStatus = false;

  constructor(private router: Router) {}

  login(username: string, token: string, isAdmin: boolean = false): void {
    this.isLoggedIn = true;
    this.username = username;
    this.adminStatus = isAdmin;
    localStorage.setItem('token', token);
  }

  logout(): void {
    this.isLoggedIn = false;
    this.username = null;
    this.adminStatus = false;
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
    alert('User logout successful!');
  }

  getIsLoggedIn(): boolean {
    return this.isLoggedIn && !!localStorage.getItem('token');
  }

  getUsername(): string | null {
    return this.username;
  }

  isAdmin(): boolean {
    return this.adminStatus;
  }
}
