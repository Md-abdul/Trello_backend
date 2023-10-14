


// navbar.component.ts
// import { Component, OnInit } from '@angular/core';
// import { AuthService } from '../auth/auth.service';

// @Component({
//   selector: 'app-navbar',
//   templateUrl: './navbar.component.html',
//   styleUrls: ['./navbar.component.css'],
// })
// export class NavbarComponent implements OnInit {
//   constructor(private authService: AuthService) {}

//   ngOnInit(): void {}

//   get isLoggedIn(): boolean {
//     return this.authService.getIsLoggedIn();
//   }

//   get username(): string | null {
//     return this.authService.getUsername();
//   }

//   logout() {
//     this.authService.logout();
//   }
// }


// navbar.component.ts
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

  get isLoggedIn(): boolean {
    return this.authService.getIsLoggedIn();
  }

  get username(): string | null {
    return this.authService.getUsername();
  }

  get isAdmin(): boolean {
    return this.authService.isAdmin();
  }

  logout() {
    this.authService.logout();
  }
}
