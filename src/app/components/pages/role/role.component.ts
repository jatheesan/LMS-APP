import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Role } from 'src/app/models/role.model';
import { RoleService } from 'src/app/services/role.service';
import { AddEditRoleComponent } from 'src/app/shared/modals/role/add-edit-role/add-edit-role.component';
import { Serializer } from 'ts-json-api-formatter';

@Component({
  selector: 'lms-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.scss']
})
export class RoleComponent implements OnInit {

  roles!: Role[];
  JsonSerialized!: any;
  constructor(private roleService : RoleService, public dailog: MatDialog) { }

  ngOnInit(): void {
    this.getAllRole()
  }

  getAllRole(){
    this.roleService.getAllRoles().subscribe(response => {
      this.roles = response;
    })
  }

  createRole(){
    const dialogRef = this.dailog.open(AddEditRoleComponent, {
      width : '500px',
      panelClass: 'custom-modalbox',
      data : {
        staffPositionId : null
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      let editresult : Role = {
        id: -1,
        roleType: result.roleType
      };
      this.JsonSerialized=((new Serializer()).serialize(editresult));
      console.log(this.JsonSerialized);
      this.roleService.createRole(this.JsonSerialized).subscribe(result =>
        console.log(result)
      );
    })
  }

  deleteRole(id : number | undefined){
    let response : any;
    if(confirm("Are you sure to delete "+ id) && id != null) {
      this.roleService.deleteRole(id).subscribe(result => {
        response = result;
      });
    }
  }

  editRole(id : number | undefined){
    const dialogRef = this.dailog.open(AddEditRoleComponent, {
      width : '500px',
      panelClass: 'custom-modalbox',
      data : {
        staffPositionId : id
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      let editresult : Role = {
        id: -1,
        roleType: result.roleType
      };
      this.JsonSerialized=((new Serializer()).serialize(editresult));
      console.log(this.JsonSerialized);
      this.roleService.updateRole(id, this.JsonSerialized).subscribe(result =>
        console.log(result)
      );
    })
  }

}
