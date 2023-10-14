// // employee-task.component.ts
// import { Component, OnInit } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { AuthService } from '../auth/auth.service';

// @Component({
//   selector: 'app-employee-task',
//   templateUrl: './employee-task.component.html',
//   styleUrls: ['./employee-task.component.css'],
// })
// export class EmployeeTaskComponent implements OnInit {
//   projects: any[] = [];
//   tasks: any[] = [];

//   constructor(private http: HttpClient, private authService: AuthService) {}

//   ngOnInit(): void {
//     // console.log('ngOnInit called');
//     if (this.authService.getIsLoggedIn()) {
//       this.fetchProjects();
//       this.fetchTasks();
//     }
//   }

//   fetchProjects() {
//     this.http.get<any[]>('http://localhost:3232/project/').subscribe(
//       (data) => {
//         console.log('Projects:', data); // Log the data
//         this.projects = data;
//         console.log(data)
//       },
//       (error) => {
//         console.error('Error fetching projects:', error);
//       }
//     );
//   }
//   // console.log(fetchProjects())

//   fetchTasks() {
//     this.http.get<any[]>('http://localhost:3232/task/taskdata').subscribe(
//       (data) => {
//         console.log('Tasks:', data); // Log the data
//         this.tasks = data;
//       },
//       (error) => {
//         console.error('Error fetching tasks:', error);
//       }
//     );
//   }
// }




// employee-task.component.ts
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-employee-task',
  templateUrl: './employee-task.component.html',
  styleUrls: ['./employee-task.component.css'],
})
export class EmployeeTaskComponent implements OnInit {
  projects: any[] = [];
  tasks: any[] = [];
  showProjects: boolean = true; // Initially show projects

  constructor(private http: HttpClient, private authService: AuthService) {}

  ngOnInit(): void {
    if (this.authService.getIsLoggedIn()) {
      this.fetchProjects();
      this.fetchTasks();
    }
  }

  fetchProjects() {
    this.http.get<any[]>('http://localhost:3232/project/').subscribe(
      (data) => {
        this.projects = data;
      },
      (error) => {
        console.error('Error fetching projects:', error);
      }
    );
  }

  fetchTasks() {
    this.http.get<any[]>('http://localhost:3232/task/taskdata').subscribe(
      (data) => {
        this.tasks = data;
      },
      (error) => {
        console.error('Error fetching tasks:', error);
      }
    );
  }

  toggleView(isProjects: boolean) {
    this.showProjects = isProjects;
  }
}
