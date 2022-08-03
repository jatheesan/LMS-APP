import { Component, Inject, OnInit, DoCheck } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import * as moment from 'moment';
import { Moment } from 'moment';
import { LeaveRequest } from 'src/app/models/leaverequest.model';
import { Rowevent } from 'src/app/models/rowevent.model';

@Component({
  selector: 'lms-moreeventscart',
  templateUrl: './moreeventscart.component.html',
  styleUrls: ['./moreeventscart.component.scss']
})
export class MoreeventscartComponent implements OnInit {

  leaveRequests: LeaveRequest[] = [];
  rowEvent: Rowevent[] = [];
  date!: string;

  constructor(@Inject(MAT_DIALOG_DATA) public data : any) { }

  ngOnInit(): void {
    this.leaveRequests = this.data.leaves;
    this.rowEvent = this.data.rowEvent;
    this.date = moment(this.data.date).format("DD-MM-YYYY");
  }


}
