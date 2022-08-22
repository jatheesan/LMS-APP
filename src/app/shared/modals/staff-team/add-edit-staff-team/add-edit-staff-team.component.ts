import { Component, DoCheck, Inject, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TeamService } from 'src/app/services/team.service';
import { UserService } from 'src/app/services/user.service';
import { first } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { Team } from 'src/app/models/team.model';

@Component({
  selector: 'lms-add-edit-staff-team',
  templateUrl: './add-edit-staff-team.component.html',
  styleUrls: ['../../add-edit-modal-styles.scss']
})
export class AddEditStaffTeamComponent implements OnInit{

  staffId !: number;
  teams!: any[];
  staff!: any;
  team!: Team;
  isteam!: boolean;

  form!: FormGroup;
  submitted = false;
  
  constructor(
    private fb: FormBuilder,
    public dialogRef : MatDialogRef<AddEditStaffTeamComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private teamService : TeamService,
    private userService : UserService){
    }

  ngOnInit(): void {

    this.form = this.fb.group({
      checkArray: this.fb.array([], [Validators.required]),
    })

    this.teams = this.data.teams;
    this.staff = this.data.staff;

    this.teams.forEach( element => {
      console.log(element.id);
      let bool =  this.staff?.staff_Teams.some((x:any) => x.teamId == element.id);
      console.log(bool);
      const checkArray: FormArray = this.form.get('checkArray') as FormArray;
      if(bool == true){
        checkArray.push(new FormControl(element.id));
      }
    })
  }

  onCheckboxChange(e: any){
    const checkArray: FormArray = this.form.get('checkArray') as FormArray;
    if(e.target.checked){
      checkArray.push(new FormControl(e.target.value));
    }else{
      let i: number = 0;
      checkArray.controls.forEach((item : any) => {
        if(item.value == e.target.value){
          checkArray.removeAt(i);
          return;
        }
        i++;
      });
    }
  }

  isTeam(id : any) : boolean{
    let bool : boolean
    let ids : number[] = [];
    bool =  this.staff?.staff_Teams.some((x:any) => x.teamId == id);

    const checkArray: FormArray = this.form.get('checkArray') as FormArray;
    if(bool == true){

      
      // if(ids.findIndex((x) => x === id) != -1){
      //   ids.push(id);
      //   checkArray.push(new FormControl(id));
      // }
    }
    return bool;
  }


  getAllTeams(){
    this.teamService.getAllTeams()
    .subscribe(response => {
      this.teams = response;
  });
  }

  getUserById(id: number){
    this.userService.getUserById(id).pipe(first())
      .subscribe(
        response => {
          this.staff = response;
        }
      );
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    this.data = this.form.value;
    console.log(this.data);
    this.dialogRef.close(this.data);
  }

  onCancel(){
    this.dialogRef.close();
  }

}
