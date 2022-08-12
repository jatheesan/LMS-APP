import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { StaffPositionService } from 'src/app/services/staff-position.service';
import { first, map } from 'rxjs/operators';

@Component({
  selector: 'lms-add-edit-staff-position',
  templateUrl: './add-edit-staff-position.component.html',
  styleUrls: ['../../add-edit-modal-styles.scss']
})
export class AddEditStaffPositionComponent implements OnInit {

  staffPositionId!: number;
  isAddMode!: boolean;
  StaffPositionAddForm: FormGroup = new FormGroup({
    Position: new FormControl(''),
  });
  submitted = false;

  constructor(
    private fb: FormBuilder,
    public dialogRef : MatDialogRef<AddEditStaffPositionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private staffPositionService : StaffPositionService
  ) { }

  ngOnInit(): void {
    this.staffPositionId = this.data.staffPositionId;
    this.isAddMode = !this.staffPositionId;

    this.StaffPositionAddForm = this.fb.group(
      {
        position: ['', [Validators.required]]
      },
    );

    if(!this.isAddMode){
      this.staffPositionService.getPositionById(this.staffPositionId)
        .pipe(first())
        .subscribe((x : any) => {
          this.StaffPositionAddForm.patchValue(x)
        });
    }
  }

  get f(): { [key: string]: AbstractControl } {
    return this.StaffPositionAddForm.controls;
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.StaffPositionAddForm.invalid) {
      return;
    }
    this.data = this.StaffPositionAddForm.value;
    console.log(this.data);
    //this.StaffPositionAddForm.reset();
    this.dialogRef.close(this.data);
  }

  onCancel(){
    this.StaffPositionAddForm.reset();
    this.dialogRef.close();
  }

}
