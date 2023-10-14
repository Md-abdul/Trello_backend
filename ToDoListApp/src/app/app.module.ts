import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { ProjectListingComponent } from './project-listing/project-listing.component';
import { TaskListingComponent } from './task-listing/task-listing.component';
import { HttpClientModule } from '@angular/common/http';
import { NavbarComponent } from './navbar/navbar.component';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { FooterComponent } from './footer/footer.component';
import { HomepageComponent } from './homepage/homepage.component';
import { TeamListingComponent } from './team-listing/team-listing.component';
import { ImageSliderComponent } from './image-slider/image-slider.component';
import { AdminComponent } from './admin/admin.component';
import { UserListingComponent } from './user-listing/user-listing.component';
import { EmployeeTaskComponent } from './employee-task/employee-task.component';
// import { AdminLoginComponent } from './admin-login/admin-login.component';

@NgModule({
  declarations: [
    AppComponent,
    ProjectListingComponent,
    TaskListingComponent,
    NavbarComponent,
    LoginComponent,
    SignupComponent,
    FooterComponent,
    HomepageComponent,
    TeamListingComponent,
    ImageSliderComponent,
    AdminComponent,
    UserListingComponent,
    EmployeeTaskComponent,
    // AdminLoginComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
