// // app-routing.module.ts
// import { NgModule } from '@angular/core';
// import { RouterModule, Routes } from '@angular/router';
// import { ProjectListingComponent } from '../project-listing/project-listing.component';
// import { TaskListingComponent } from '../task-listing/task-listing.component';
// import { LoginComponent } from '../auth/login/login.component';
// import { SignupComponent } from '../auth/signup/signup.component';
// import { TeamListingComponent } from '../team-listing/team-listing.component';
// import { HomepageComponent } from '../homepage/homepage.component';
// import { AuthGuard } from '../auth/auth.guard';
// import { AdminGuard } from '../auth/admin.guard';
// import { AdminComponent } from '../admin/admin.component';
// import { UserListingComponent } from '../user-listing/user-listing.component';
// import { EmployeeTaskComponent } from '../employee-task/employee-task.component';

// const routes: Routes = [
//   { path: 'homepage', component: HomepageComponent },
//   { path: 'employetask', component: EmployeeTaskComponent },
//   {
//     path: 'admin',
//     component: AdminComponent,
//     children: [
//       { path: 'projects', component: ProjectListingComponent },
//       { path: 'tasks', component: TaskListingComponent },
//       { path: 'teams', component: TeamListingComponent },
//       { path: 'users', component: UserListingComponent },
//       { path: '', redirectTo: 'projects', pathMatch: 'full' },
//     ],
//   },
//   { path: 'login', component: LoginComponent },
//   { path: 'signup', component: SignupComponent },
//   { path: '', redirectTo: '/projects', pathMatch: 'full' },
// ];

// @NgModule({
//   imports: [RouterModule.forRoot(routes)],
//   exports: [RouterModule],
// })
// export class AppRoutingModule {}

// app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectListingComponent } from '../project-listing/project-listing.component';
import { TaskListingComponent } from '../task-listing/task-listing.component';
import { LoginComponent } from '../auth/login/login.component';
import { SignupComponent } from '../auth/signup/signup.component';
import { TeamListingComponent } from '../team-listing/team-listing.component';
import { HomepageComponent } from '../homepage/homepage.component';
import { AuthGuard } from '../auth/auth.guard';
// import { AdminGuard } from '../admin-login/admin.guard';
import { AdminComponent } from '../admin/admin.component';
import { UserListingComponent } from '../user-listing/user-listing.component';
import { EmployeeTaskComponent } from '../employee-task/employee-task.component';
// import { AdminLoginComponent } from '../admin-login/admin-login.component';

const routes: Routes = [
  { path: 'homepage', component: HomepageComponent },
  {
    path: 'employetask',
    component: EmployeeTaskComponent,
    canActivate: [AuthGuard], // Make the route private
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuard], // Make the route private and require admin role
    children: [
      { path: 'projects', component: ProjectListingComponent },
      { path: 'tasks', component: TaskListingComponent },
      { path: 'teams', component: TeamListingComponent },
      { path: 'users', component: UserListingComponent },
      { path: '', redirectTo: 'projects', pathMatch: 'full' },
    ],
  },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: '**', redirectTo: '/some-default-route' },
  { path: '', redirectTo: '/projects', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
