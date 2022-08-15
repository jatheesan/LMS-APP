import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Leavetype } from 'src/app/models/leavetype.model';
import { LeavetypeService } from 'src/app/services/leavetype.service';
import { AddEditLeavetypeComponent } from 'src/app/shared/modals/leavetype/add-edit-leavetype/add-edit-leavetype.component';
import { Serializer } from 'ts-json-api-formatter';

@Component({
  selector: 'lms-leavetype',
  templateUrl: './leavetype.component.html',
  styleUrls: ['./leavetype.component.scss']
})
export class LeavetypeComponent implements OnInit {

  leavetypes!: Leavetype[];
  JsonSerialized!: any;
  constructor(private leavetypeService : LeavetypeService, public dailog: MatDialog) { }

  ngOnInit(): void {
    this.getAllLeaveType()
  }

  getAllLeaveType(){
    this.leavetypeService.getAllLeaveTypes().subscribe(response => {
      this.leavetypes = response;
    })
  }

  createLeaveType(){
    const dialogRef = this.dailog.open(AddEditLeavetypeComponent, {
      width : '500px',
      panelClass: 'custom-modalbox',
      data : {
        leaveTypeId : null
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      let newLeaveType : Leavetype = {
        id: -1,
        leaveTypeName: result.leaveTypeName
      };
      this.JsonSerialized=((new Serializer()).serialize(newLeaveType));
      console.log(this.JsonSerialized);
      this.leavetypeService.createLeaveType(this.JsonSerialized).subscribe(result =>
        console.log(result)
      );
    })
  }

  deleteLeaveType(id : number){
    let response : any;
    if(confirm("Are you sure to delete "+ id) && id != null) {
      this.leavetypeService.deleteLeaveType(id).subscribe(result => {
        response = result;
      });
    }
  }

  editLeaveType(id : number){
    const dialogRef = this.dailog.open(AddEditLeavetypeComponent, {
      width : '500px',
      panelClass: 'custom-modalbox',
      data : {
        leaveTypeId : id
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      let newLeaveType : Leavetype = {
        id: -1,
        leaveTypeName: result.leaveTypeName
      };
      this.JsonSerialized=((new Serializer()).serialize(newLeaveType));
      console.log(this.JsonSerialized);
      this.leavetypeService.updateLeaveType(id, this.JsonSerialized).subscribe(result =>
        console.log(result)
      );
    })
  }

}
