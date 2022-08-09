import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { Holiday } from 'src/app/models/holiday.model';
import { Leave, LeaveRequestOfLeaveType } from 'src/app/models/leave.model';
import { User } from 'src/app/models/user.model';
import { AuthguardServiceService } from 'src/app/services/authguard-service.service';
import { HolidayService } from 'src/app/services/holiday.service';
import { LeaveRequestService } from 'src/app/services/leave-request.service';
import { UserService } from 'src/app/services/user.service';
import { AddLeaveComponent } from 'src/app/shared/modals/leaves/add-leave/add-leave.component';
import { Serializer } from 'ts-json-api-formatter';

@Component({
  selector: 'lms-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss']
})
export class UserDashboardComponent implements OnInit {
  date = new Date();
  //[0 => Sunday, 1 => Monday, 2 => Tuseday, 3 => Wednesday, 4 => Thursday, 5 => Friday, 6 => Saturday]
  // here workweek first element is first day of week
  //workweek = [];
  workweek = [3, 1, 5, 2, 4];
  orderOfWorkWeekDays!: number[];
  //no Of Events Show In EveryWeek
  noOfEventsShowInWeek = 3;
  holidays!: Holiday[];
  users!: any;
  user!: User;
  leaveRequests!: any;
  leavedata !: any;
  JsonSerialized='';

  constructor(
    public dailog: MatDialog,
    private holidayService: HolidayService,
    private leaveRequestService: LeaveRequestService,
    private userServise: UserService,
    private authguardServiceService : AuthguardServiceService,
    private http: HttpClient,
    private router : Router
    ) {

  }

  ngOnInit(): void {
    let weekStartDay = this.workweek[0];
    let lowestToHighest = this.workweek.sort((a, b) => a - b);
    this.orderOfWorkWeekDays = UserDashboardComponent.orderOfWorkWeek(lowestToHighest, weekStartDay);

    this.getAllUsers();
    this.getAllHolidays();
    this.getAllLeaveRequest(7);
    //this.getUserById(7);
    
  }
  
  getAllHolidays(){
    this.holidayService.getAllHolidays()
      .subscribe(
        response => {
          this.holidays = response;
        }
      );
  }

  getAllLeaveRequest(id : number){
    this.leaveRequestService.getAllLeaveRequestsByUser(id)
      .subscribe(
        response => {
          this.leaveRequests = response;
        }
      );
  }

  getAllUsers(){
    this.userServise.getAllUsers()
      .subscribe(
        response => {
          this.users = response;
        }
      );
      
  }

  // getUserById(id: number){
  //   this.userServise.getUserById(id)
  //     .subscribe(
  //       response => {
  //         this.user = response;
  //       }
  //     );
  // }

  applyLeave(): void{
    const dialogRef = this.dailog.open(AddLeaveComponent, {
      width : '500px',
      panelClass: 'custom-modalbox',
      data : {
        staffs : this.users
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      let leave = new Leave();
      leave.id = -1;
      leave.type  = 'leaverequest';
      leave.userId = result.userId;
      leave.startDate = moment(result.startDate).format("YYYY-MM-DDTHH:mm:ss");
      leave.endDate = moment(result.endDate).format("YYYY-MM-DDTHH:mm:ss");
      leave.reason = result.reason;
      leave.timeOfLeaveday = result.timeOfLeaveday;
      leave.resPersionId = result.resPersionId;

      leave.leaveRequestOfLeaveTypes = [];
      var lrlt=new LeaveRequestOfLeaveType();
      lrlt.id = 0;
      lrlt.leaveReguestId = 0;
      lrlt.leaveTypeId = 0;
      lrlt.noOfDays = 0;
      leave.leaveRequestOfLeaveTypes.push(lrlt);

      this.JsonSerialized=((new Serializer()).serialize(leave));
      console.log(leave);
      console.log(this.JsonSerialized);
      this.leaveRequestService.ApplyLeaveRequest(this.JsonSerialized).subscribe(result => {
        console.log(result);
      });
      //this.leaveRequestService.ApplyLeaveRequest(this.JsonSerialized);
    });
  }

  lockOut(){
    this.authguardServiceService.signOut();
    this.router.navigate(['/login']);
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
