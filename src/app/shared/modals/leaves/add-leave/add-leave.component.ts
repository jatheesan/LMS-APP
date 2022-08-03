import { Component, Inject, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'lms-add-leave',
  templateUrl: './add-leave.component.html',
  styleUrls: ['./add-leave.component.scss']
})
export class AddLeaveComponent implements OnInit {

  staffs !: User[];
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
    public dialogRef : MatDialogRef<AddLeaveComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
    ) { }

  ngOnInit(): void {
    this.staffs = this.data.staffs;
    console.log(this.staffs);
    
    this.LeaveApplyForm = this.fb.group(
      {
        userId: ['', [Validators.required]],
        startDate: ['', [Validators.required]],
        endDate: [''],
        reason: ['', [Validators.required]],
        timeOfLeaveday: [''],
        resPersionId: ['', [ Validators.required]],
      },
    );

  }

  get f(): { [key: string]: AbstractControl } {
    return this.LeaveApplyForm.controls;
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.LeaveApplyForm.invalid) {
      return;
    }
    this.data = this.LeaveApplyForm.value;
    console.log(this.data);
    //this.LeaveApplyForm.reset();
    this.dialogRef.close(this.data);
  }

  onCancel(){
    this.dialogRef.close();
  }

}
