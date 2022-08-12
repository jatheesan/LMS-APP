import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { AddEditStaffComponent } from 'src/app/shared/modals/staffs/add-edit-staff/add-edit-staff.component';
import { Serializer } from 'ts-json-api-formatter';

@Component({
  selector: 'lms-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.scss']
})
export class StaffComponent implements OnInit {
  
  staffs!: any;
  JsonSerialized='';

  constructor(private userServise: UserService,private authService: AuthService, public dailog: MatDialog,) { }

  ngOnInit(): void {
    this.getAllUsers()
  }

  getAllUsers(){
    this.userServise.getAllUsers()
      .subscribe(
        response => {
          this.staffs = response;
        }
      );
      
  }

  deletestaff(id : number){
    let response : any;
    if(confirm("Are you sure to delete "+ id) && id != null) {
      this.userServise.deleteUser(id).subscribe(result => {
        response = result;
      });
    }
  }

  editstaff(id : number){
    const dialogRef = this.dailog.open(AddEditStaffComponent, {
      width : '500px',
      panelClass: 'custom-modalbox',
      data : {
        staffId : id
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      let editresult : User = {
        id: id,
        firstname: result.firstname,
        lastname: result.lastname,
        username: result.username,
        email: result.email,
        passwordHash: null as any,
        staffPositionId: result.staffPositionId,
        roleId: result.roleId,
        fullname: null as any
      };
      this.JsonSerialized=((new Serializer()).serialize(editresult));
      console.log(this.JsonSerialized);
      this.userServise.updateUser(id, this.JsonSerialized).subscribe(result =>
        console.log(result)
      );
    })
  }

  createStaff(){
    const dialogRef = this.dailog.open(AddEditStaffComponent, {
      width : '500px',
      panelClass: 'custom-modalbox',
      data : {
        staffId : null
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      let newstaff : User = {
        id: -1,
        firstname: result.firstname,
        lastname: result.lastname,
        username: result.username,
        email: result.email,
        passwordHash: "b6CoqLH6CwxXVKQizVxwU3mSwtacqUfzgB1G2/7MOnw=",
        staffPositionId: result.staffPositionId,
        roleId: result.roleId,
        fullname: null as any
      };
      this.JsonSerialized=((new Serializer()).serialize(newstaff));
      // this.userServise.createUser(this.JsonSerialized).subscribe(result =>
      //   console.log(result)
      // );
      this.authService.userRegister(this.JsonSerialized).subscribe(result =>
        console.log(result)
      );

    })
  }

}
