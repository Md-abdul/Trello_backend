// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { HttpClient } from '@angular/common/http';
// import { catchError } from 'rxjs/operators';
// import { throwError } from 'rxjs';

// @Component({
//   selector: 'app-project-listing',
//   templateUrl: './project-listing.component.html',
//   styleUrls: ['./project-listing.component.css'],
// })
// export class ProjectListingComponent implements OnInit {
//   projectForm: FormGroup;
//   projects: any[] = [];
//   isEditing: boolean = false;
//   editingProjectId: string | null = null; // Keep track of the ID of the project being edited

//   constructor(private formBuilder: FormBuilder, private http: HttpClient) {
//     this.projectForm = this.formBuilder.group({
//       projectId: ['', Validators.required],
//       name: ['', Validators.required],
//       description: ['', Validators.required],
//       startDate: ['', Validators.required],
//       endDate: ['', Validators.required],
//       projectManager: ['', Validators.required],
//     });
//   }

//   ngOnInit() {
//     this.fetchProjects();
//   }

//   fetchProjects() {
//     this.http
//       .get<any[]>('http://localhost:3232/project/')
//       .pipe(
//         catchError((error) => {
//           console.error('Error fetching projects:', error);
//           return throwError(error);
//         })
//       )
//       .subscribe((projects) => {
//         this.projects = projects;
//       });
//   }

//   onSubmit() {
//     if (this.projectForm.valid) {
//       if (this.isEditing) {
//         // If editing, update the project
//         this.editProject();
//       } else {
//         // If not editing, create a new project
//         this.createProject();
//       }
//     } else {
//       // Handle form validation errors
//     }
//   }

//   createProject() {
//     this.http
//       .post('http://localhost:3232/project/addproject', this.projectForm.value)
//       .pipe(
//         catchError((error) => {
//           console.error('Error creating project:', error);
//           return throwError(error);
//         })
//       )
//       .subscribe(() => {
//         this.projectForm.reset();
//         this.fetchProjects();
//       });
//   }

//   editProject() {
//     if (this.editingProjectId) {
//       // Update the project on the backend
//       this.http
//         .put(
//           `http://localhost:3232/project/update/${this.editingProjectId}`,
//           this.projectForm.value
//         )
//         .pipe(
//           catchError((error) => {
//             console.error('Error editing project:', error);
//             return throwError(error);
//           })
//         )
//         .subscribe(() => {
//           this.isEditing = false;
//           this.editingProjectId = null;
//           this.projectForm.reset();
//           this.fetchProjects();
//         });
//     }
//   }

//   deleteProject(project: any) {
//     // Implement logic to delete the project on the backend
//     this.http
//       .delete(`http://localhost:3232/project/delete/${project._id}`)
//       .pipe(
//         catchError((error) => {
//           console.error('Error deleting project:', error);
//           return throwError(error);
//         })
//       )
//       .subscribe(() => {
//         this.projectForm.reset();
//         this.fetchProjects();
//       });
//   }

//   populateFormForEdit(project: any) {
//     this.isEditing = true;
//     this.editingProjectId = project._id;
//     this.projectForm.setValue({
//       projectId: project.projectId,
//       name: project.name,
//       description: project.description,
//       startDate: project.startDate,
//       endDate: project.endDate,
//       projectManager: project.projectManager,
//     });
//   }

//   clearForm() {
//     this.isEditing = false;
//     this.editingProjectId = null;
//     this.projectForm.reset();
//   }
// }


import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-project-listing',
  templateUrl: './project-listing.component.html',
  styleUrls: ['./project-listing.component.css'],
})
export class ProjectListingComponent implements OnInit {
  projectForm: FormGroup;
  projects: any[] = [];
  isEditing: boolean = false;
  editingProjectId: string | null = null; // Keep track of the ID of the project being edited

  constructor(private formBuilder: FormBuilder, private http: HttpClient) {
    this.projectForm = this.formBuilder.group({
      projectId: ['', Validators.required],
      name: ['', Validators.required],
      description: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      projectManager: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.fetchProjects();
  }

  fetchProjects() {
    this.http
      .get<any[]>('http://localhost:3232/project/')
      .pipe(
        catchError((error) => {
          console.error('Error fetching projects:', error);
          return throwError(error);
        })
      )
      .subscribe((projects) => {
        this.projects = projects;
      });
  }

  onSubmit() {
    if (this.projectForm.valid) {
      if (this.isEditing) {
        // If editing, update the project
        this.editProject();
      } else {
        // If not editing, create a new project
        this.createProject();
      }
    } else {
      // Handle form validation errors
      alert('Please fill in all required fields.');
    }
  }

  createProject() {
    this.http
      .post('http://localhost:3232/project/addproject', this.projectForm.value)
      .pipe(
        catchError((error) => {
          console.error('Error creating project:', error);
          alert('Failed to create project. Please try again.');
          return throwError(error);
        })
      )
      .subscribe(() => {
        this.projectForm.reset();
        this.fetchProjects();
        alert('Project created successfully.');
      });
  }

  editProject() {
    if (this.editingProjectId) {
      // Update the project on the backend
      this.http
        .put(
          `http://localhost:3232/project/update/${this.editingProjectId}`,
          this.projectForm.value
        )
        .pipe(
          catchError((error) => {
            console.error('Error editing project:', error);
            alert('Failed to update project. Please try again.');
            return throwError(error);
          })
        )
        .subscribe(() => {
          this.isEditing = false;
          this.editingProjectId = null;
          this.projectForm.reset();
          this.fetchProjects();
          alert('Project updated successfully.');
        });
    }
  }

  deleteProject(project: any) {
    // Implement logic to delete the project on the backend
    this.http
      .delete(`http://localhost:3232/project/delete/${project._id}`)
      .pipe(
        catchError((error) => {
          console.error('Error deleting project:', error);
          alert('Failed to delete project. Please try again.');
          return throwError(error);
        })
      )
      .subscribe(() => {
        this.projectForm.reset();
        this.fetchProjects();
        alert('Project deleted successfully.');
      });
  }

  populateFormForEdit(project: any) {
    this.isEditing = true;
    this.editingProjectId = project._id;
    this.projectForm.setValue({
      projectId: project.projectId,
      name: project.name,
      description: project.description,
      startDate: project.startDate,
      endDate: project.endDate,
      projectManager: project.projectManager,
    });
  }

  clearForm() {
    this.isEditing = false;
    this.editingProjectId = null;
    this.projectForm.reset();
  }
}
