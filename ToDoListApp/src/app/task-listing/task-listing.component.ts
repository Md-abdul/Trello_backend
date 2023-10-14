// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { HttpClient } from '@angular/common/http';
// import { catchError } from 'rxjs/operators';
// import { throwError } from 'rxjs';

// @Component({
//   selector: 'app-task-listing',
//   templateUrl: './task-listing.component.html',
//   styleUrls: ['./task-listing.component.css'],
// })
// export class TaskListingComponent implements OnInit {
//   taskForm: FormGroup;
//   tasks: any[] = [];
//   isEditing: boolean = false;
//   editingTaskId: string | null = null; // Keep track of the ID of the task being edited

//   constructor(private formBuilder: FormBuilder, private http: HttpClient) {
//     this.taskForm = this.formBuilder.group({
//       taskID: ['', Validators.required],
//       title: ['', Validators.required],
//       description: ['', Validators.required],
//       dueDate: ['', Validators.required],
//       priority: ['', Validators.required],
//       status: ['', Validators.required],
//       projectID: ['', Validators.required],
//     });
//   }

//   ngOnInit() {
//     this.fetchTasks();
//   }

//   fetchTasks() {
//     this.http
//       .get<any[]>('http://localhost:3232/task/taskdata')
//       .pipe(
//         catchError((error) => {
//           console.error('Error fetching tasks:', error);
//           return throwError(error);
//         })
//       )
//       .subscribe((tasks) => {
//         this.tasks = tasks;
//       });
//   }

//   onSubmit() {
//     if (this.taskForm.valid) {
//       if (this.isEditing) {
//         // If editing, update the task
//         this.editTask();
//       } else {
//         // If not editing, create a new task
//         this.createTask();
//       }
//     } else {
//       // Handle form validation errors
//     }
//   }

//   createTask() {
//     this.http
//       .post('http://localhost:3232/task/create', this.taskForm.value)
//       .pipe(
//         catchError((error) => {
//           console.error('Error creating task:', error);
//           return throwError(error);
//         })
//       )
//       .subscribe(() => {
//         this.taskForm.reset();
//         this.fetchTasks();
//       });
//   }

//   editTask() {
//     if (this.editingTaskId) {
//       // Update the task on the backend
//       this.http
//         .put(
//           `http://localhost:3232/task/update/${this.editingTaskId}`,
//           this.taskForm.value
//         )
//         .pipe(
//           catchError((error) => {
//             console.error('Error editing task:', error);
//             return throwError(error);
//           })
//         )
//         .subscribe(() => {
//           this.isEditing = false;
//           this.editingTaskId = null;
//           this.taskForm.reset();
//           this.fetchTasks();
//         });
//     }
//   }

//   deleteTask(task: any) {
//     // Implement logic to delete the task on the backend
//     this.http
//       .delete(`http://localhost:3232/task/delete/${task._id}`)
//       .pipe(
//         catchError((error) => {
//           console.error('Error deleting task:', error);
//           return throwError(error);
//         })
//       )
//       .subscribe(() => {
//         this.taskForm.reset();
//         this.fetchTasks();
//       });
//   }

//   populateFormForEdit(task: any) {
//     this.isEditing = true;
//     this.editingTaskId = task._id;
//     this.taskForm.setValue({
//       taskID: task.taskID,
//       title: task.title,
//       description: task.description,
//       dueDate: task.dueDate,
//       priority: task.priority,
//       status: task.status,
//       projectID: task.projectID,
//     });
//   }

//   clearForm() {
//     this.isEditing = false;
//     this.editingTaskId = null;
//     this.taskForm.reset();
//   }
// }

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-task-listing',
  templateUrl: './task-listing.component.html',
  styleUrls: ['./task-listing.component.css'],
})
export class TaskListingComponent implements OnInit {
  taskForm: FormGroup;
  tasks: any[] = [];
  isEditing: boolean = false;
  editingTaskId: string | null = null; // Keep track of the ID of the task being edited

  constructor(private formBuilder: FormBuilder, private http: HttpClient) {
    this.taskForm = this.formBuilder.group({
      taskID: ['', Validators.required],
      title: ['', Validators.required],
      description: ['', Validators.required],
      dueDate: ['', Validators.required],
      priority: ['', Validators.required],
      status: ['', Validators.required],
      projectID: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.fetchTasks();
  }

  fetchTasks() {
    this.http
      .get<any[]>('http://localhost:3232/task/taskdata')
      .pipe(
        catchError((error) => {
          console.error('Error fetching tasks:', error);
          return throwError(error);
        })
      )
      .subscribe((tasks) => {
        this.tasks = tasks;
      });
  }

  onSubmit() {
    if (this.taskForm.valid) {
      if (this.isEditing) {
        // If editing, update the task
        this.editTask();
      } else {
        // If not editing, create a new task
        this.createTask();
      }
    } else {
      // Handle form validation errors
      alert('Please fill in all required fields.');
    }
  }

  createTask() {
    this.http
      .post('http://localhost:3232/task/create', this.taskForm.value)
      .pipe(
        catchError((error) => {
          console.error('Error creating task:', error);
          alert('Failed to create task. Please try again.');
          return throwError(error);
        })
      )
      .subscribe(() => {
        this.taskForm.reset();
        this.fetchTasks();
        alert('Task created successfully.');
      });
  }

  editTask() {
    if (this.editingTaskId) {
      // Update the task on the backend
      this.http
        .put(
          `http://localhost:3232/task/update/${this.editingTaskId}`,
          this.taskForm.value
        )
        .pipe(
          catchError((error) => {
            console.error('Error editing task:', error);
            alert('Failed to update task. Please try again.');
            return throwError(error);
          })
        )
        .subscribe(() => {
          this.isEditing = false;
          this.editingTaskId = null;
          this.taskForm.reset();
          this.fetchTasks();
          alert('Task updated successfully.');
        });
    }
  }

  deleteTask(task: any) {
    // Implement logic to delete the task on the backend
    this.http
      .delete(`http://localhost:3232/task/delete/${task._id}`)
      .pipe(
        catchError((error) => {
          console.error('Error deleting task:', error);
          alert('Failed to delete task. Please try again.');
          return throwError(error);
        })
      )
      .subscribe(() => {
        this.taskForm.reset();
        this.fetchTasks();
        alert('Task deleted successfully.');
      });
  }

  populateFormForEdit(task: any) {
    this.isEditing = true;
    this.editingTaskId = task._id;
    this.taskForm.setValue({
      taskID: task.taskID,
      title: task.title,
      description: task.description,
      dueDate: task.dueDate,
      priority: task.priority,
      status: task.status,
      projectID: task.projectID,
    });
  }

  clearForm() {
    this.isEditing = false;
    this.editingTaskId = null;
    this.taskForm.reset();
  }
}
