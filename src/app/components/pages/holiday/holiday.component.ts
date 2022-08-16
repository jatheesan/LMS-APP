import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import * as moment from 'moment';
import { Holiday } from 'src/app/models/holiday.model';
import { HolidayService } from 'src/app/services/holiday.service';
import { AddEditHolidayComponent } from 'src/app/shared/modals/holiday/add-edit-holiday/add-edit-holiday.component';
import { Serializer } from 'ts-json-api-formatter';

@Component({
  selector: 'lms-holiday',
  templateUrl: './holiday.component.html',
  styleUrls: ['./holiday.component.scss']
})
export class HolidayComponent implements OnInit {

  holidays!: Holiday[];
  JsonSerialized!: any;
  constructor(private holidayService : HolidayService, public dailog: MatDialog) { }

  ngOnInit(): void {
    this.getAllHolidays()
  }

  getAllHolidays(){
    this.holidayService.getAllHolidays().subscribe(response => {
      this.holidays = response;
    })
  }

  createHoliday(){
    const dialogRef = this.dailog.open(AddEditHolidayComponent, {
      width : '500px',
      panelClass: 'custom-modalbox',
      data : {
        holidayId : null
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      let newrecord : Holiday = {
        id: -1,
        date: moment(result.date).format("YYYY-MM-DDTHH:mm:ss"),
        description: result.description
      };
      this.JsonSerialized=((new Serializer()).serialize(newrecord));
      console.log(this.JsonSerialized);
      this.holidayService.createHoliday(this.JsonSerialized).subscribe(result =>
        console.log(result)
      );
    })
  }

  deleteHoliday(id : number | undefined){
    let response : any;
    if(confirm("Are you sure to delete "+ id) && id != null) {
      this.holidayService.deleteHoliday(id).subscribe(result => {
        response = result;
      });
    }
  }

  editHoliday(id : number | undefined){
    const dialogRef = this.dailog.open(AddEditHolidayComponent, {
      width : '500px',
      panelClass: 'custom-modalbox',
      data : {
        holidayId : id
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      let editrecord : Holiday = {
        id: -1,
        date:  moment(result.date).format("YYYY-MM-DDTHH:mm:ss"),
        description: result.description
      };
      this.JsonSerialized=((new Serializer()).serialize(editrecord));
      console.log(this.JsonSerialized);
      this.holidayService.updateHoliday(id, this.JsonSerialized).subscribe(result =>
        console.log(result)
      );
    })
  }

}
