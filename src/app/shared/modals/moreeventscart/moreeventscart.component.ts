import { Component, Inject, OnInit, DoCheck, HostListener } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import * as moment from 'moment';
import { Moment } from 'moment';
import { LeaveRequest } from 'src/app/models/leaverequest.model';
import { Rowevent } from 'src/app/models/rowevent.model';
import { ShowLeaveComponent } from '../leaves/show-leave/show-leave.component';

@Component({
  selector: 'lms-moreeventscart',
  templateUrl: './moreeventscart.component.html',
  styleUrls: ['../add-edit-modal-styles.scss']
})
export class MoreeventscartComponent implements OnInit {

  leaveRequests: any[] = [];
  rowEvent: Rowevent[] = [];
  date!: string;

  constructor(
    public dailog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data : any,
    public dialogRef : MatDialogRef<MoreeventscartComponent>,
    ) { }

  ngOnInit(): void {
    this.leaveRequests = this.data.leaves;
    this.rowEvent = this.data.rowEvent;
    this.date = moment(this.data.date).format("DD-MM-YYYY");
  }

  // @HostListener('document:mouseover', ['$event'])
  // mouseover(event: any){
  //   if(event.target.matches('#event')){
  //     let eventName = document.getElementById('event');
  //     eventName!.style.color = "red";
  //     console.log(eventName?.style);
  //     //event.target.matches('#event').styles.color = "#fff";
  //   }
  // }

  showevent(event : any){
    this.dialogRef.close();
    if(event){
      const dialogRef = this.dailog.open(ShowLeaveComponent, {
        width : '500px',
        panelClass: 'custom-Leavebox',
        data : {
          leave :event,
        }
      });
    }
  }


}
