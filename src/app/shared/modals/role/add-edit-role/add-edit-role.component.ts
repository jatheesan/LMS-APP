import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RoleService } from 'src/app/services/role.service';
import { first, map } from 'rxjs/operators';

@Component({
  selector: 'lms-add-edit-role',
  templateUrl: './add-edit-role.component.html',
  styleUrls: ['../../add-edit-modal-styles.scss']
})
export class AddEditRoleComponent implements OnInit {

  staffroleId!: number;
  isAddMode!: boolean;
  StaffRoleAddForm: FormGroup = new FormGroup({
    roleType: new FormControl(''),
  });
  submitted = false;

  constructor(
    private fb: FormBuilder,
    public dialogRef : MatDialogRef<AddEditRoleComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private roleService : RoleService
  ) { }

  ngOnInit(): void {
    this.staffroleId = this.data.staffPositionId;
    this.isAddMode = !this.staffroleId;

    this.StaffRoleAddForm = this.fb.group(
      {
        roleType: ['', [Validators.required]]
      },
    );

    if(!this.isAddMode){
      this.roleService.getAllRoleById(this.staffroleId)
        .pipe(first())
        .subscribe((x : any) => {
          this.StaffRoleAddForm.patchValue(x)
        });
    }
  }

  get f(): { [key: string]: AbstractControl } {
    return this.StaffRoleAddForm.controls;
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.StaffRoleAddForm.invalid) {
      return;
    }
    this.data = this.StaffRoleAddForm.value;
    console.log(this.data);
    //this.StaffPositionAddForm.reset();
    this.dialogRef.close(this.data);
  }

  onCancel(){
    this.StaffRoleAddForm.reset();
    this.dialogRef.close();
  }

}
