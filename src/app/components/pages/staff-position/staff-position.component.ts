import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { StaffPosition } from 'src/app/models/staff-position.model';
import { StaffPositionService } from 'src/app/services/staff-position.service';
import { AddEditStaffPositionComponent } from 'src/app/shared/modals/staff-position/add-edit-staff-position/add-edit-staff-position.component';
import { Serializer } from 'ts-json-api-formatter';

@Component({
  selector: 'lms-staff-position',
  templateUrl: './staff-position.component.html',
  styleUrls: ['./staff-position.component.scss']
})
export class StaffPositionComponent implements OnInit {

  staffPositions!: StaffPosition[];
  JsonSerialized!: any;
  constructor(private staffPositionService: StaffPositionService, public dailog: MatDialog) { }

  ngOnInit(): void {
    this.getAllStaffPositions()
  }

  getAllStaffPositions(){
    this.staffPositionService.getAllPositions().subscribe(response => {
      this.staffPositions = response
    })
  }

  createStaffPosition(){
    const dialogRef = this.dailog.open(AddEditStaffPositionComponent, {
      width : '500px',
      panelClass: 'custom-modalbox',
      data : {
        staffPositionId : null
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      let editresult : StaffPosition = {
        id: -1,
        position: result.position
      };
      this.JsonSerialized=((new Serializer()).serialize(editresult));
      console.log(this.JsonSerialized);
      this.staffPositionService.createStaffPosition(this.JsonSerialized).subscribe(result =>
        console.log(result)
      );
    })
  }

  deleteStaffPosition(id : number| undefined){
    let response : any;
    if(confirm("Are you sure to delete "+ id) && id != null) {
      this.staffPositionService.deletePosition(id).subscribe(result => {
        response = result;
      });
    }
  }

  editStaffPosition(id: number| undefined){
    const dialogRef = this.dailog.open(AddEditStaffPositionComponent, {
      width : '500px',
      panelClass: 'custom-modalbox',
      data : {
        staffPositionId : id
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      let editresult : StaffPosition = {
        id: -1,
        position: result.position
      };
      this.JsonSerialized=((new Serializer()).serialize(editresult));
      console.log(this.JsonSerialized);
      this.staffPositionService.updateStaffPosition(id, this.JsonSerialized).subscribe(result =>
        console.log(result)
      );
    })
  }

}
