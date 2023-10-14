// // team-listing.component.ts
// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { HttpClient } from '@angular/common/http';
// import { catchError } from 'rxjs/operators';
// import { throwError } from 'rxjs';

// @Component({
//   selector: 'app-team-listing',
//   templateUrl: './team-listing.component.html',
//   styleUrls: ['./team-listing.component.css'],
// })
// export class TeamListingComponent implements OnInit {
//   teamForm: FormGroup;
//   teams: any[] = [];
//   isEditing: boolean = false;
//   editingTeamId: string | null = null; // Keep track of the ID of the team being edited

//   constructor(private formBuilder: FormBuilder, private http: HttpClient) {
//     this.teamForm = this.formBuilder.group({
//       teamID: ['', Validators.required],
//       teamName: ['', Validators.required],
//     });
//   }

//   ngOnInit() {
//     this.fetchTeams();
//   }

//   fetchTeams() {
//     this.http
//       .get<any[]>('http://localhost:3232/team/')
//       .pipe(
//         catchError((error) => {
//           console.error('Error fetching teams:', error);
//           return throwError(error);
//         })
//       )
//       .subscribe((teams) => {
//         this.teams = teams;
//       });
//   }

//   onSubmit() {
//     if (this.teamForm.valid) {
//       if (this.isEditing) {
//         // If editing, update the team
//         this.editTeam();
//       } else {
//         // If not editing, create a new team
//         this.createTeam();
//       }
//     } else {
//       // Handle form validation errors
//     }
//   }

//   createTeam() {
//     this.http
//       .post('http://localhost:3232/team/create', this.teamForm.value)
//       .pipe(
//         catchError((error) => {
//           console.error('Error creating team:', error);
//           return throwError(error);
//         })
//       )
//       .subscribe(() => {
//         this.teamForm.reset();
//         this.fetchTeams();
//       });
//   }

//   editTeam() {
//     if (this.editingTeamId) {
//       // Update the team on the backend
//       this.http
//         .put(
//           `http://localhost:3232/team/update/${this.editingTeamId}`,
//           this.teamForm.value
//         )
//         .pipe(
//           catchError((error) => {
//             console.error('Error editing team:', error);
//             return throwError(error);
//           })
//         )
//         .subscribe(() => {
//           this.isEditing = false;
//           this.editingTeamId = null;
//           this.teamForm.reset();
//           this.fetchTeams();
//         });
//     }
//   }

//   deleteTeam(team: any) {
//     // Implement logic to delete the team on the backend
//     this.http
//       .delete(`http://localhost:3232/team/delete/${team._id}`)
//       .pipe(
//         catchError((error) => {
//           console.error('Error deleting team:', error);
//           return throwError(error);
//         })
//       )
//       .subscribe(() => {
//         this.teamForm.reset();
//         this.fetchTeams();
//       });
//   }

//   populateFormForEdit(team: any) {
//     this.isEditing = true;
//     this.editingTeamId = team._id;
//     this.teamForm.setValue({
//       teamID: team.teamID,
//       teamName: team.teamName,
//     });
//   }

//   clearForm() {
//     this.isEditing = false;
//     this.editingTeamId = null;
//     this.teamForm.reset();
//   }
// }


import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-team-listing',
  templateUrl: './team-listing.component.html',
  styleUrls: ['./team-listing.component.css'],
})
export class TeamListingComponent implements OnInit {
  teamForm: FormGroup;
  teams: any[] = [];
  isEditing: boolean = false;
  editingTeamId: string | null = null; // Keep track of the ID of the team being edited

  constructor(private formBuilder: FormBuilder, private http: HttpClient) {
    this.teamForm = this.formBuilder.group({
      teamID: ['', Validators.required],
      teamName: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.fetchTeams();
  }

  fetchTeams() {
    this.http
      .get<any[]>('http://localhost:3232/team/')
      .pipe(
        catchError((error) => {
          console.error('Error fetching teams:', error);
          return throwError(error);
        })
      )
      .subscribe((teams) => {
        this.teams = teams;
      });
  }

  onSubmit() {
    if (this.teamForm.valid) {
      if (this.isEditing) {
        // If editing, update the team
        this.editTeam();
      } else {
        // If not editing, create a new team
        this.createTeam();
      }
    } else {
      // Handle form validation errors
      alert('Please fill in all required fields.');
    }
  }

  createTeam() {
    this.http
      .post('http://localhost:3232/team/create', this.teamForm.value)
      .pipe(
        catchError((error) => {
          console.error('Error creating team:', error);
          alert('Failed to create team. Please try again.');
          return throwError(error);
        })
      )
      .subscribe(() => {
        this.teamForm.reset();
        this.fetchTeams();
        alert('Team created successfully.');
      });
  }

  editTeam() {
    if (this.editingTeamId) {
      // Update the team on the backend
      this.http
        .put(
          `http://localhost:3232/team/update/${this.editingTeamId}`,
          this.teamForm.value
        )
        .pipe(
          catchError((error) => {
            console.error('Error editing team:', error);
            alert('Failed to update team. Please try again.');
            return throwError(error);
          })
        )
        .subscribe(() => {
          this.isEditing = false;
          this.editingTeamId = null;
          this.teamForm.reset();
          this.fetchTeams();
          alert('Team updated successfully.');
        });
    }
  }

  deleteTeam(team: any) {
    // Implement logic to delete the team on the backend
    this.http
      .delete(`http://localhost:3232/team/delete/${team._id}`)
      .pipe(
        catchError((error) => {
          console.error('Error deleting team:', error);
          alert('Failed to delete team. Please try again.');
          return throwError(error);
        })
      )
      .subscribe(() => {
        this.teamForm.reset();
        this.fetchTeams();
        alert('Team deleted successfully.');
      });
  }

  populateFormForEdit(team: any) {
    this.isEditing = true;
    this.editingTeamId = team._id;
    this.teamForm.setValue({
      teamID: team.teamID,
      teamName: team.teamName,
    });
  }

  clearForm() {
    this.isEditing = false;
    this.editingTeamId = null;
    this.teamForm.reset();
  }
}
