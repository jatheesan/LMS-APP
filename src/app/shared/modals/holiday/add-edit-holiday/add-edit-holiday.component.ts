import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HolidayService } from 'src/app/services/holiday.service';
import { first } from 'rxjs';

@Component({
  selector: 'lms-add-edit-holiday',
  templateUrl: './add-edit-holiday.component.html',
  styleUrls: ['../../add-edit-modal-styles.scss']
})
export class AddEditHolidayComponent implements OnInit {

  holidayId!: number;
  isAddMode!: boolean;
  HolidayAddForm: FormGroup = new FormGroup({
    date: new FormControl(''),
    description: new FormControl('')
  });
  submitted = false;

  myFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    // Prevent Saturday and Sunday from being selected.
    return day !== 0 && day !== 6;
  };

  constructor(
    private fb: FormBuilder,
    public dialogRef : MatDialogRef<AddEditHolidayComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private holidayService : HolidayService
  ) { }

  ngOnInit(): void {

    this.holidayId = this.data.holidayId;
    console.log(this.holidayId);
    this.isAddMode = !this.holidayId;

    this.HolidayAddForm = this.fb.group(
      {
        date: ['', [Validators.required]],
        description: ['', [Validators.required]]
      },
    );

    if(!this.isAddMode){
      this.holidayService.getHolidayById(this.holidayId)
        .pipe(first())
        .subscribe((x : any) => {
          console.log(x[0]);
          this.HolidayAddForm.patchValue(x[0])
        });
    }
  }

  get f(): { [key: string]: AbstractControl } {
    return this.HolidayAddForm.controls;
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.HolidayAddForm.invalid) {
      return;
    }
    this.data = this.HolidayAddForm.value;
    console.log(this.data);
    //this.StaffPositionAddForm.reset();
    this.dialogRef.close(this.data);
  }

  onCancel(){
    this.HolidayAddForm.reset();
    this.dialogRef.close();
  }

}
