

// // auth.guard.ts
// import { Injectable } from '@angular/core';
// import { CanActivate, Router } from '@angular/router';
// import { AuthService } from './auth.service';

// @Injectable({
//   providedIn: 'root',
// })
// export class AuthGuard implements CanActivate {
//   constructor(private authService: AuthService, private router: Router) {}

//   canActivate(): boolean {
//     if (this.authService.getIsLoggedIn() && !this.authService.isAdmin()) {
//       return true;
//     } else {
//       // If not logged in or admin, navigate to the login page
//       this.router.navigate(['/login']);
//       return false;
//     }
//   }
// }




// auth.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.getIsLoggedIn()) {
      return true;
    } else {
      // If not logged in, navigate to the login page
      this.router.navigate(['/login']);
      return false;
    }
  }
}
