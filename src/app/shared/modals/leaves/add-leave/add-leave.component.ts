import { Component, Inject, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from 'src/app/models/user.model';
import { AuthguardServiceService } from 'src/app/services/authguard-service.service';

@Component({
  selector: 'lms-add-leave',
  templateUrl: './add-leave.component.html',
  styleUrls: ['./add-leave.component.scss']
})
export class AddLeaveComponent implements OnInit {

  staffs !: any[];
  respersion!: any[];
  authRoleId !: number;
  authUserId !: number;
  showApplyForMe!: boolean;
  showApplyForSpecial!: boolean;
  LeaveApplyForm: FormGroup = new FormGroup({
    userId: new FormControl(''),
    startDate:new FormControl(''),
    endDate:new FormControl(''),
    reason: new FormControl(''),
    timeOfLeaveday: new FormControl(''),
    resPersionId: new FormControl(''),
  });
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private authguardServiceService : AuthguardServiceService,
    public dialogRef : MatDialogRef<AddLeaveComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
    ) { }

  ngOnInit(): void {
    this.staffs = this.data.staffs;
    this.authRoleId = this.authguardServiceService.getAuthRole();
    this.authUserId = this.authguardServiceService.getAuthUserId();
    this.showApplyForMe = true;
    this.showApplyForSpecial = false;

    if(this.authRoleId == 1){
      this.respersion = this.staffs.filter(x => x.roleId == 1);
    }
    else if(this.authRoleId == 2){
      this.respersion = this.staffs.filter(x => x.roleId == 1 || x.roleId == 2);
    }
    else{
      let authuser = this.staffs.find(x => x.id == this.authUserId);
      let authUserTeams : number[] = [];
      authuser.staff_Teams.forEach((element : any)=> {
        authUserTeams.push(element.teamId);
      });
      this.respersion = [];
      this.staffs.forEach((element : any) => {
        if(element.staff_Teams.length > 0){
          element.staff_Teams.forEach((team : any) => {
            if(authUserTeams.some(x => x == team.teamId) == true){
              this.respersion.push(element);
            }
          })
        }
      })
    }
    

    this.LeaveApplyForm = this.fb.group(
      {
        userId: ['', [Validators.required]],
        startDate: ['', [Validators.required]],
        endDate: [''],
        reason: ['', [Validators.required]],
        timeOfLeaveday: [''],
        resPersionId: [''],
      },
    );

    this.LeaveApplyForm.controls['userId'].setValue(this.authUserId)

  }

  get f(): { [key: string]: AbstractControl } {
    return this.LeaveApplyForm.controls;
  }

  applyForMe(){
    this.showApplyForMe = true;
    this.showApplyForSpecial = false;
  }

  applyForSpecial(){
    this.showApplyForMe = false;
    this.showApplyForSpecial = true;
    this.respersion = this.staffs;
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.LeaveApplyForm.invalid) {
      return;
    }
    this.data = this.LeaveApplyForm.value;

    this.dialogRef.close(this.data);
  }

  onCancel(){
    this.dialogRef.close();
  }

}
