import { Component, OnInit } from '@angular/core';
import { Holiday } from 'src/app/models/holiday.model';
import { HolidayService } from 'src/app/services/holiday.service';
import { DatePipe } from '@angular/common'
import { LeaveRequestService } from 'src/app/services/leave-request.service';
import { LeaveRequest } from 'src/app/models/leaverequest.model';
import { AddLeaveComponent } from 'src/app/shared/modals/leaves/add-leave/add-leave.component';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'lms-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  //date = new Date('Wed jan 20 2022 00:00:00 GMT+0530 (India Standard Time)');
  date = new Date();
  //[0 => Sunday, 1 => Monday, 2 => Tuseday, 3 => Wednesday, 4 => Thursday, 5 => Friday, 6 => Saturday]
  // here workweek first element is first day of week
  //workweek = [];
  workweek = [3, 1, 5, 2, 4];
  orderOfWorkWeekDays!: number[];
  //no Of Events Show In EveryWeek
  noOfEventsShowInWeek = 3;
  holidays!: Holiday[];
  leaveRequests!: any;
  leave !: LeaveRequest;
  leavedata !: any;
  leaveuserId : number | undefined;
  leavestartDate : Date | undefined;
  leaveendDate : Date = null as any;
  leavetimeOfLeaveday : string = '';
  leavereason : string = '';
  leaveisAvailableResPersion : boolean = null as any;
  leaveresPersionId : number = null as any;
  leaveisAdminApproved : boolean = null as any;
  leaveisSuperAdminApproved : boolean  = null as any;
  leavebgcolor : string  = null as any;

  constructor(
    public dailog: MatDialog,
    private holidayService: HolidayService,
    private leaveRequestService: LeaveRequestService,
    private http: HttpClient
    ) {

  }

  ngOnInit(): void {
    let weekStartDay = this.workweek[0];
    let lowestToHighest = this.workweek.sort((a, b) => a - b);
    this.orderOfWorkWeekDays = DashboardComponent.orderOfWorkWeek(lowestToHighest, weekStartDay);

    this.getAllHolidays();
    this.getAllLeaveRequest();
  }
  
  getAllHolidays(){
    this.holidayService.getAllHolidays()
      .subscribe(
        response => {
          this.holidays = response;
        }
      );
  }

  getAllLeaveRequest(){
    this.leaveRequestService.getAllLeaveRequest()
      .subscribe(
        response => {
          this.leaveRequests = response;
        }
      );
  }
  applyLeave(): void{
    const dialogRef = this.dailog.open(AddLeaveComponent, {
      width : '500px',
      panelClass: 'custom-modalbox',
      data : {
        reason: "sqwddwwc",
        resPersionId: 4,
        timeOfLeaveday: "",
        userId: 2,
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      // this.leave.userId = result.userId;
      // this.leave.startDate = result.startDate;
      // this.leave.endDate = result.endDate;
      // this.leave.reason = result.reason;
      // this.leave.timeOfLeaveday = result.timeOfLeaveday;
      // this.leave.resPersionId = result.resPersionId;
      console.log(this.leave);
      this.leavedata = result;
      console.log(this.leavedata);
      this.leaveRequestService.ApplyLeaveRequest(result).subscribe(result => {
        alert('New leave added');
      });
      // this.leaveRequestService.ApplyLeaveRequest(result);
    });
    console.log(this.leavedata);
  }

  public static orderOfWorkWeek(lowestToHighest: number[], startday: number) : number[]
  {
    let startdayIndex = lowestToHighest.indexOf(startday);
    let lengthOfWorkWeek = lowestToHighest.length;
    let orderOfWorkWeek: number[] = [];
    let i = startdayIndex;
    if(lengthOfWorkWeek > 0)
    {
      while(i < lengthOfWorkWeek)
      {
        orderOfWorkWeek.push(lowestToHighest[i]);
        i = i + 1;
      }

      let y = 0;
      if(startdayIndex > 0)
      {
        while(y < startdayIndex)
        {
          orderOfWorkWeek.push(lowestToHighest[y]);
          y = y + 1;
        }
      }
    }
    else{
      orderOfWorkWeek = [1, 2, 3, 4, 5, 6, 0]
    }

    return orderOfWorkWeek;
  }

}
