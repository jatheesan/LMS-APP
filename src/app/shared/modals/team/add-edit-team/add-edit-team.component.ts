import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TeamService } from 'src/app/services/team.service';
import { first, map } from 'rxjs/operators';
import { Team } from 'src/app/models/team.model';

@Component({
  selector: 'lms-add-edit-team',
  templateUrl: './add-edit-team.component.html',
  styleUrls: ['../../add-edit-modal-styles.scss']
})
export class AddEditTeamComponent implements OnInit {

  teams!: Team[];
  teamId!: number;
  isAddMode!: boolean;
  TeamAddForm: FormGroup = new FormGroup({
    teamName: new FormControl(''),
    primaryTeamId: new FormControl(''),
    description: new FormControl(''),
  });
  submitted = false;

  constructor(
    private fb: FormBuilder,
    public dialogRef : MatDialogRef<AddEditTeamComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private teamService : TeamService
  ) { }

  ngOnInit(): void {
    this.teamId = this.data.teamId;
    this.isAddMode = !this.teamId;
    this.getAllTeam();

    this.TeamAddForm = this.fb.group(
      {
        teamName: ['', [Validators.required]],
        primaryTeamId: [''],
        description: ['', [Validators.required]],
      },
    );

    if(!this.isAddMode){
      this.teamService.getTeamById(this.teamId)
        .pipe(first())
        .subscribe((x : any) => {
          this.TeamAddForm.patchValue(x)
        });
    }
  }

  get f(): { [key: string]: AbstractControl } {
    return this.TeamAddForm.controls;
  }

  getAllTeam(){
    this.teamService.getAllTeams().subscribe(response => {
      this.teams = response;
    })
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.TeamAddForm.invalid) {
      return;
    }
    this.data = this.TeamAddForm.value;
    console.log(this.data);
    //this.StaffPositionAddForm.reset();
    this.dialogRef.close(this.data);
  }

  onCancel(){
    this.TeamAddForm.reset();
    this.dialogRef.close();
  }

}
