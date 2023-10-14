import { Component } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {

}


// // admin.component.ts
// import { Component, OnInit } from '@angular/core';
// import { Router } from '@angular/router';
// import { AdminService } from '../admin-login/admin.service';

// @Component({
//   selector: 'app-admin',
//   templateUrl: './admin.component.html',
//   styleUrls: ['./admin.component.css']
// })
// export class AdminComponent implements OnInit {
//   constructor(private authService: AdminService, private router: Router) {}

//   ngOnInit(): void {
//     // Check if the user is authenticated as an admin
//     if (!this.authService.isAdminUser()) {
//       // If not an admin, navigate to the admin login page
//       this.router.navigate(['/admin-login']);
//     }
//   }
// }
