import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LeavetypeService } from 'src/app/services/leavetype.service';
import { first, map } from 'rxjs/operators';

@Component({
  selector: 'lms-add-edit-leavetype',
  templateUrl: './add-edit-leavetype.component.html',
  styleUrls: ['../../add-edit-modal-styles.scss']
})
export class AddEditLeavetypeComponent implements OnInit {

  leaveTypeId!: number;
  isAddMode!: boolean;
  LeaveTypeAddForm: FormGroup = new FormGroup({
    leaveTypeName: new FormControl(''),
  });
  submitted = false;

  constructor(
    private fb: FormBuilder,
    public dialogRef : MatDialogRef<AddEditLeavetypeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private leaveTypeService : LeavetypeService
  ) { }

  ngOnInit(): void {
    this.leaveTypeId = this.data.leaveTypeId;
    this.isAddMode = !this.leaveTypeId;

    this.LeaveTypeAddForm = this.fb.group(
      {
        leaveTypeName: ['', [Validators.required]]
      },
    );

    if(!this.isAddMode){
      this.leaveTypeService.getLeaveTypeById(this.leaveTypeId)
        .pipe(first())
        .subscribe((x : any) => {
          this.LeaveTypeAddForm.patchValue(x)
        });
    }
  }

  get f(): { [key: string]: AbstractControl } {
    return this.LeaveTypeAddForm.controls;
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.LeaveTypeAddForm.invalid) {
      return;
    }
    this.data = this.LeaveTypeAddForm.value;
    console.log(this.data);
    this.dialogRef.close(this.data);
  }

  onCancel(){
    this.LeaveTypeAddForm.reset();
    this.dialogRef.close();
  }

}
