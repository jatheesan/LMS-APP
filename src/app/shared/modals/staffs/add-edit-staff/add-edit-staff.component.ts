import { Component, DoCheck, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import { first, map } from 'rxjs/operators';
import { Role } from 'src/app/models/role.model';
import { RoleService } from 'src/app/services/role.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'lms-add-edit-staff',
  templateUrl: './add-edit-staff.component.html',
  styleUrls: ['./add-edit-staff.component.scss']
})
export class AddEditStaffComponent implements OnInit {

  staffId !: number;
  staff !: User;
  isAddMode!: boolean;
  roles!: Role[];
  selectedrole: any;
  StaffAddForm: FormGroup = new FormGroup({
    firstname: new FormControl(''),
    lastname: new FormControl(''),
    username: new FormControl(''),
    email: new FormControl(''),
    roleId:new FormControl(''),
    staffPositionId:new FormControl(''),
  });
  submitted = false;
  
  constructor(
    private fb: FormBuilder,
    public dialogRef : MatDialogRef<AddEditStaffComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private userServise: UserService,
    private roleService: RoleService
    ) { }

  ngOnInit(): void {
    this.staffId = this.data.staffId;
    this.isAddMode = !this.staffId;

    this.StaffAddForm = this.fb.group(
      {
        firstname: ['', [Validators.required]],
        lastname: ['', [Validators.required]],
        username: ['', [Validators.required]],
        email: ['', [Validators.required]],
        roleId: ['', [Validators.required]],
        staffPositionId: ['', [Validators.required]],
      },
    );

    //this.roleService.getAllRoles().pipe(map((roledata) =>{this.roles = roledata}));
    this.getAllRole()
    
    if(!this.isAddMode){
      this.userServise.getUserById(this.staffId)
        .pipe(first())
        .subscribe((x : any) => {
          this.StaffAddForm.patchValue(x)
        });
    }
    //this.StaffAddForm.controls['roleId'].setValue(this.staff.roleId);
    if(this.staffId != null){
      this.getUserById(this.staffId);
      this.StaffAddForm.get('roleId')?.setValue(this.staff.roleId);
    }
  }

  get f(): { [key: string]: AbstractControl } {
    return this.StaffAddForm.controls;
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.StaffAddForm.invalid) {
      return;
    }
    this.data = this.StaffAddForm.value;
    console.log(this.data);
    //this.LeaveApplyForm.reset();
    this.dialogRef.close(this.data);
  }

  onCancel(){
    this.dialogRef.close();
  }

  getAllRole(){
    this.roleService.getAllRoles().subscribe(response => {
      this.roles = response
    })
  }

  getUserById(id: number){
    this.userServise.getUserById(id).pipe(first())
      .subscribe(
        response => {
          this.staff = response;
        }
      );
  }


}
