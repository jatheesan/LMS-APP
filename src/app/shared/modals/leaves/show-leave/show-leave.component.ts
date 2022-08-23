import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { Rowevent } from 'src/app/models/rowevent.model';
import { User } from 'src/app/models/user.model';
import { AuthguardServiceService } from 'src/app/services/authguard-service.service';
import { LeaveRequestService } from 'src/app/services/leave-request.service';

@Component({
  selector: 'lms-show-leave',
  templateUrl: './show-leave.component.html',
  styleUrls: ['./show-leave.component.scss']
})
export class ShowLeaveComponent implements OnInit {

  event !: Rowevent;
  //responsiblePerson !: User;
  listview : boolean = false;
  editview : boolean = false;
  showSuperAdminApproved!: boolean;
  showAdminApproved!: boolean;
  authRole !: Observable<boolean>;
  authRoleId !: number;

  form: FormGroup = new FormGroup({
    isApproved: new FormControl(''),
    whoApproved: new FormControl('')
  });
  submitted = false;

  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data : any,
    public dialogRef : MatDialogRef<ShowLeaveComponent>,
    private leaveRequestService: LeaveRequestService,
    private authguardServiceService: AuthguardServiceService
    ) { }

  ngOnInit(): void {
    this.event = this.data.leave;
    console.log(this.event);
    this.listview = true;
    this.editview = false;

    this.authRoleId = this.authguardServiceService.getAuthRole();
    
    //show approved form for superadmin
    if(+this.authRoleId == 1){
      this.showSuperAdminApproved = true;
    }
    else{
      this.showSuperAdminApproved = false;
    }

    //show approved form for admin
    if(+this.authRoleId == 2){
      this.showAdminApproved = true;
    }
    else{
      this.showAdminApproved = false;
    }

    this.form = this.fb.group(
      {
        isApproved: ['', [Validators.required]],
        whoApproved: ['']
      },
    );
  }

  isTrueCheck(){
    let ischecked: boolean = false;
    if(+this.authRoleId == 1){
      if(this.event.rowEvent?.isSuperAdminApproved == true){
        ischecked = true;
        this.form.controls['isApproved'].setValue('True');
      }
    }
    if(+this.authRoleId == 2){
      if(this.event.rowEvent?.isAdminApproved == true){
        ischecked = true;
        this.form.controls['isApproved'].setValue('True');
      }
    }
    return ischecked;
  }

  isFalseCheck(){
    let ischecked: boolean = false;
    if(+this.authRoleId == 1){
      if(this.event.rowEvent?.isSuperAdminApproved == false){
        ischecked = true;
        this.form.controls['isApproved'].setValue('False');
      }
    }
    if(+this.authRoleId == 2){
      if(this.event.rowEvent?.isAdminApproved == false){
        ischecked = true;
        this.form.controls['isApproved'].setValue('False');
      }
    }
    return ischecked;
  }

  deleteEvent(id: number | undefined) {
    let response : any;
    if(confirm("Are you sure to delete "+ id) && id != null) {
      this.leaveRequestService.deleteLeaveRequest(id).subscribe(result => {
        response = result;
      });
      this.dialogRef.close(response);
    }
  }

  onCancel(){
    this.dialogRef.close();
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    if(this.showAdminApproved){
      this.form.controls['whoApproved'].setValue('Admin');
    }
    if(this.showSuperAdminApproved){
      this.form.controls['whoApproved'].setValue('SuperAdmin');
    }
    this.data = this.form.value;
    console.log(this.data);
    this.dialogRef.close(this.data);
  }

  showlistview(){
    this.listview = true;
    this.editview = false;
  }

  showeditview(){
    this.editview = true;
    this.listview = false;
  }

}
