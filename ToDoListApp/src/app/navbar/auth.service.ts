// auth.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isLoggedIn = false;
  private username: string | null = null;

  // Simulate a login operation
  login(username: string) {
    // Perform authentication logic, set isLoggedIn to true, and store the username
    this.isLoggedIn = true;
    this.username = username;
  }

  // Simulate a logout operation
  logout() {
    // Perform logout logic, set isLoggedIn to false, and clear the username
    this.isLoggedIn = false;
    this.username = null;
  }

  // Check if the user is currently logged in
//   isLoggedIn(): boolean {
//     return this.isLoggedIn;
//   }

  // Get the username of the logged-in user
  getUsername(): string | null {
    return this.username;
  }
}
