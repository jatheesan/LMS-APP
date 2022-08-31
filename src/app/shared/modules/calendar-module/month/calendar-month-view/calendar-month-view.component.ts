import { getLocaleDayNames } from '@angular/common';
import { Component, DoCheck, HostListener, Input, OnChanges, OnInit, SimpleChange, SimpleChanges } from '@angular/core';
import { CalendarDate } from "../../../../../models/calendar-date.model";
import { MonthView } from "../../../../../models/month-view"
import { DaysOfWeek } from "../../../../../enum/days-of-week";
import { Holiday } from 'src/app/models/holiday.model';
import * as moment from 'moment';
import { last, Observable } from 'rxjs';
import { LeaveRequest } from 'src/app/models/leaverequest.model';
import { Rowevent } from 'src/app/models/rowevent.model';
import { ShowLeaveComponent } from 'src/app/shared/modals/leaves/show-leave/show-leave.component';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user.model';
import { LeaveRequestService } from 'src/app/services/leave-request.service';

@Component({
  selector: 'lms-calendar-month-view',
  templateUrl: './calendar-month-view.component.html',
  styleUrls: ['../calendar-month-view.component.scss']
})
export class CalendarMonthViewComponent implements OnInit ,DoCheck {
  
  month: any;
  changeMonth: any;
  year: any;
  changeYear: any;
  Dates : CalendarDate[] | undefined;
  static today: Date ;
  @Input() todayDate!: Date;
  @Input() workweek!: number[];
  @Input() orderOfWorkWeekDays!: number[];
  @Input() holidays!: Holiday[];
  @Input() leaveRequests!: LeaveRequest[];
  @Input() users!: User[];
  @Input() noOfEventsShowInWeek!: number;
  monthHoliday: Holiday[] = [];
  monthLeaveRequest: LeaveRequest[] = [];
  staffs:  User[] = [];
  workweekofmonth!: number[];
  index!: number;
  static isThisMonth: boolean;
  static isToday: boolean = false;
  static date: Date;
  static DaysList: any;

  rowEvent !: LeaveRequest | undefined;
  rowEventStartDate !: Date | undefined;
  rowEventEndDate !: Date | undefined;
  rowEventWidth !: number | undefined;
  rowEventUser !: User | undefined;
  rowEventResponsiblePerson !: User | undefined;

  view!: MonthView;
  rowoffset !: number[];
  rowoffsets !: number[];
  noOfWorkWeekDays !: number;
  totalDaysVisibleInWeek!: number;
  noOfDatesInView !: number;
  noOfWeeks !: number;
  days : CalendarDate[] | undefined;

  user!: User;

  constructor(public dailog: MatDialog,
              private userService: UserService,
              private leaveRequestService : LeaveRequestService) {

  }

  ngOnInit(): void {
   
    CalendarMonthViewComponent.today = new Date();
    this.month = this.todayDate.getMonth();
    this.changeMonth = this.todayDate.getMonth();
    this.year = this.todayDate.getFullYear();
    this.changeYear = this.todayDate.getFullYear();
    this.workweekofmonth = this.orderOfWorkWeekDays;

  //#####pushing the current month dates#####//
    this.Dates = CalendarMonthViewComponent.getCalendarDateInMonth(this.month, this.year, this.workweekofmonth);

  //#####pushing the next month dates#####//
    let Dateslength = this.Dates.length;
    //last date of current month
    let lastdate = this.Dates[Dateslength-1];
    //last day of current month
    let lastday = lastdate.date?.getDay();
    //index of last day of current month in workweek array
    this.index = this.workweekofmonth.findIndex(x => x === lastday);
    //how many days fill by next month dates
    let filldays = this.workweekofmonth.length - (this.index + 1)
    
    if(filldays > 0)
    {
      this.Dates = CalendarMonthViewComponent.getCalendarDateInAfterMonth(this.month, this.year, this.Dates, this.workweekofmonth, filldays, this.index);
    }

  //#####pushing the previous month dates#####//
    let firstdate = this.Dates[0]; 
    let firstday = firstdate.date?.getDay();
    this.index = this.workweekofmonth.findIndex(x => x === firstday);
    if(this.index > 0)
    {
      this.Dates = CalendarMonthViewComponent.getCalendarDateInBeforeMonth(this.month, this.year, this.Dates, this.workweekofmonth, this.index);
    }

    //number of work week days
    this.noOfWorkWeekDays = this.workweekofmonth.length;

    //number of days in that month view
    this.noOfDatesInView = this.Dates.length;
    
    //number of weeks in that month view
    this.noOfWeeks = this.noOfDatesInView / this.noOfWorkWeekDays;
    
    //rowoffset (index of week first date in dates array)
    this.rowoffset = CalendarMonthViewComponent.getRowOffSets(this.noOfWorkWeekDays, this.noOfDatesInView);

  //Monthview Object
    this.view = new MonthView(
      this.rowoffsets = this.rowoffset,
      this.days = this.Dates,
      this.totalDaysVisibleInWeek = this.noOfWorkWeekDays
    );
    

    //List of holidays for this month
    if(this.holidays != null){
      this.monthHoliday = this.getMonthHoliday(this.holidays, this.month, this.year);
    }
    else{
      this.monthHoliday = [];
    }

    //List of leaveRequest for this month
    if(this.leaveRequests != null){
      this.monthLeaveRequest = this.getMonthLeaveRequest(this.leaveRequests, this.month, this.year);
    }
    else{
      this.monthLeaveRequest = [];
    }

    //List of User
    if(this.users != null){
      this.staffs = this.users
    }
  }

  ngDoCheck(): void
  {
    CalendarMonthViewComponent.today = new Date();
    this.month = this.todayDate.getMonth();
    this.changeMonth = this.todayDate.getMonth();
    this.year = this.todayDate.getFullYear();
    this.changeYear = this.todayDate.getFullYear();
    this.workweekofmonth = this.orderOfWorkWeekDays;

  //#####pushing the current month dates#####//
    this.Dates = CalendarMonthViewComponent.getCalendarDateInMonth(this.month, this.year, this.workweekofmonth);

  //#####pushing the next month dates#####//
    let Dateslength = this.Dates.length;
    //last date of current month
    let lastdate = this.Dates[Dateslength-1];
    //last day of current month
    let lastday = lastdate.date?.getDay();
    //index of last day of current month in workweek array
    this.index = this.workweekofmonth.findIndex(x => x === lastday);
    //how many days fill by next month dates
    let filldays = this.workweekofmonth.length - (this.index + 1)
    
    if(filldays > 0)
    {
      this.Dates = CalendarMonthViewComponent.getCalendarDateInAfterMonth(this.month, this.year, this.Dates, this.workweekofmonth, filldays, this.index);
    }

  //#####pushing the previous month dates#####//
    let firstdate = this.Dates[0]; 
    let firstday = firstdate.date?.getDay();
    this.index = this.workweekofmonth.findIndex(x => x === firstday);
    if(this.index > 0)
    {
      this.Dates = CalendarMonthViewComponent.getCalendarDateInBeforeMonth(this.month, this.year, this.Dates, this.workweekofmonth, this.index);
    }

    //number of work week days
    this.noOfWorkWeekDays = this.workweekofmonth.length;

    //number of days in that month view
    this.noOfDatesInView = this.Dates.length;
    
    //number of weeks in that month view
    this.noOfWeeks = this.noOfDatesInView / this.noOfWorkWeekDays;
    
    //rowoffset (index of week first date in dates array)
    this.rowoffset = CalendarMonthViewComponent.getRowOffSets(this.noOfWorkWeekDays, this.noOfDatesInView);

  //Monthview Object
    this.view = new MonthView(
      this.rowoffsets = this.rowoffset,
      this.days = this.Dates,
      this.totalDaysVisibleInWeek = this.noOfWorkWeekDays
    );
    
    //List of holiday for this month
    if(this.holidays != null){
      this.monthHoliday = this.getMonthHoliday(this.holidays, this.month, this.year);
    }
    else{
      this.monthHoliday = [];
    }

    //List of leaveRequest for this month
    if(this.leaveRequests != null){
      this.monthLeaveRequest = this.getMonthLeaveRequest(this.leaveRequests, this.month, this.year);
    }
    else{
      this.monthLeaveRequest = [];
    }

    //List of User
    if(this.users != null){
      this.staffs = this.users
    }
  }


  public static getCalendarDateInMonth(month: number, year: number, workweek: number[]): CalendarDate[]{
    let days = [];
    let date = new Date(year, month, 1);

    while (date.getMonth() === month) {
      let weekdate = new Date(date)
      let d = weekdate.getDay();
      let i = workweek.findIndex(x => x === d);
      if(i != -1){
          if( moment(this.today).format('DD-MM-YYYY') == moment(weekdate).format('DD-MM-YYYY')){
          this.isToday = true;
          }
          else{
            this.isToday = false;
          }
          days.push(
            new CalendarDate(
              this.date = weekdate,
              this.isThisMonth = true,
              this.isToday
            )
          );
      }
      date.setDate(date.getDate() + 1);
    }
    return days;
  }

  public static getCalendarDateInBeforeMonth(month: number, year: number, Dates: CalendarDate[], workweek: number[], index: number): CalendarDate[]{
    let days: CalendarDate[] = Dates;
    let workdate = new Date(year, month, 1);
    let setdateday;
    while(index > 0 )
    {
      setdateday = workdate.getDay();
      if(workweek[index-1] === setdateday)
      {
        if( moment(this.today).format('DD-MM-YYYY') == moment(workdate).format('DD-MM-YYYY')){
          this.isToday = true;
        }
        else{
          this.isToday = false;
        }
        days.unshift(
          new CalendarDate(
            this.date = new Date(workdate),
            this.isThisMonth = false,
            this.isToday
          )
        );
        index = index - 1;
      }
      workdate.setDate(workdate.getDate() - 1);
    }
    return days;
  }

  public static getCalendarDateInAfterMonth(month: number, year: number, Dates: CalendarDate[], workweek: number[], filldays: number, index: number): CalendarDate[]{
    let days: CalendarDate[] = Dates;
    let workdate = new Date(year, (month+1), 1);
    let setdateday;
    while(filldays > 0 )
    {
      setdateday = workdate.getDay();
      if(workweek[index+1] === setdateday)
      {
        if( moment(this.today).format('DD-MM-YYYY') == moment(workdate).format('DD-MM-YYYY')){
          this.isToday = true;
        }
        else{
          this.isToday = false;
        }
        days.push(
          new CalendarDate(
            this.date = new Date(workdate),
            this.isThisMonth = false,
            this.isToday
          )
        );
        index = index + 1;
        filldays = filldays - 1;
      }
      workdate.setDate(workdate.getDate() + 1);
    }
    return days;
  }

  public static getRowOffSets(noOfWorkWeekDays: number, noOfDates: number): number[]
  {
    let rowoffsetsOfMonth: number[] = [];
    for(let i = 0 ; i < noOfDates; i++)
    {
      if((i%noOfWorkWeekDays) == 0)
      {
        rowoffsetsOfMonth.push(i);
      }
    }
    return rowoffsetsOfMonth;
  }

  getMonthHoliday(holi : Holiday[], month : number, year : number): any{
    let monthHoliday : Holiday[] = [];
    monthHoliday = holi.filter(x => moment(x.date).month() === month && moment(x.date).year() === year);
    return monthHoliday;
  }

  getMonthLeaveRequest(request: LeaveRequest[], month: number, year: number): any{
    let monthLeaves : LeaveRequest[] = [];
    monthLeaves = request.filter(x => 
      moment(x.startDate).month() === month && moment(x.startDate).year() === year);

    return monthLeaves;
  }

  getWeekLeaveRequest(rowIndex: number): any{
    let leaveRequest : LeaveRequest[] = [];
    let rowLeaveRequest : Rowevent[] = [];
    let firstday : any;
    let firstdayOfWeek: moment.Moment;
    let lastday : any;
    let lastdayOfWeek: moment.Moment;
    if(this.Dates != null){
      // first date of week
      firstday = this.Dates[rowIndex].date;
      firstdayOfWeek = moment(firstday);
      // last date of week
      lastday = this.Dates[rowIndex + (this.noOfWorkWeekDays - 1)].date
      lastdayOfWeek = moment(lastday);

      if(this.leaveRequests != null){
        //for each all leave request
        this.leaveRequests.forEach((item: LeaveRequest) => {
          //staring date of leave 
          let firstdayofLeave = moment(item.startDate);
          //ending date of leave
          let lastdayofLeave = moment(item.endDate);

          //condition for fw fl lw ll
          if(
            ((firstdayofLeave.diff(firstdayOfWeek, 'day') >= 0 ) && (lastdayOfWeek.diff(firstdayofLeave, 'day') >= 0)) &&
            ((lastdayOfWeek.diff(firstdayofLeave, 'day') >= 0 ) && (lastdayofLeave.diff(lastdayOfWeek, 'day') >= 0))
          ){
              let width = this.getWidth(firstdayofLeave, lastdayOfWeek)
              rowLeaveRequest.push(
                new Rowevent(
                  this.rowEvent = item,
                  this.rowEventStartDate = item.startDate,
                  this.rowEventEndDate = lastday,
                  this.rowEventWidth = width,
                  this.rowEventUser = this.findUser(item.userId),
                  this.rowEventResponsiblePerson = this.findUser(item.resPersionId)
                )
              );
              leaveRequest.push(item);
          }
          //condition for fl fw ll lw
          else if(
            ((firstdayOfWeek.diff(firstdayofLeave, 'day') >= 0) && (lastdayofLeave.diff(firstdayOfWeek, 'day') >= 0)) &&
            ((lastdayofLeave.diff(firstdayOfWeek, 'day') >= 0) && (lastdayOfWeek.diff(lastdayofLeave, 'day') >= 0))
          ){
            let width = this.getWidth(firstdayOfWeek,lastdayofLeave);
              rowLeaveRequest.push(
                new Rowevent(
                  this.rowEvent = item,
                  this.rowEventStartDate = firstday,
                  this.rowEventEndDate = item.endDate,
                  this.rowEventWidth = width,
                  this.rowEventUser = this.findUser(item.userId),
                  this.rowEventResponsiblePerson = this.findUser(item.resPersionId)
                )
              );
              leaveRequest.push(item);
          }
          //condition for fl fw ll lw
          else if(
            ((firstdayOfWeek.diff(firstdayofLeave, 'day') >= 0) && (lastdayofLeave.diff(firstdayOfWeek, 'day') >= 0)) &&
            ((lastdayOfWeek.diff(firstdayofLeave, 'day') >= 0) && (lastdayofLeave.diff(lastdayOfWeek, 'day') >= 0))
          ){
            let width = this.getWidth(firstdayOfWeek,lastdayOfWeek);
              rowLeaveRequest.push(
                new Rowevent(
                  this.rowEvent = item,
                  this.rowEventStartDate = firstday,
                  this.rowEventEndDate = lastday,
                  this.rowEventWidth = width,
                  this.rowEventUser = this.findUser(item.userId),
                  this.rowEventResponsiblePerson = this.findUser(item.resPersionId)
                )
              );
              leaveRequest.push(item);
          }
          //condition for fw fl lw
          else if(
            ((firstdayofLeave.diff(firstdayOfWeek, 'day') >= 0 ) && (lastdayOfWeek.diff(firstdayofLeave, 'day') >= 0)) &&
            ((lastdayofLeave.diff(firstdayOfWeek, 'day') >= 0 ) && (lastdayOfWeek.diff(lastdayofLeave, 'day') >= 0))
          ){
            let width = this.getWidth(firstdayofLeave,lastdayofLeave);
              rowLeaveRequest.push(
                new Rowevent(
                  this.rowEvent = item,
                  this.rowEventStartDate = item.startDate,
                  this.rowEventEndDate = item.endDate,
                  this.rowEventWidth = width,
                  this.rowEventUser = this.findUser(item.userId),
                  this.rowEventResponsiblePerson = this.findUser(item.resPersionId)
                )
              );
              leaveRequest.push(item);
          }
        });
      }
    }
    let sortedrowLeaveRequest = rowLeaveRequest.sort((a, b) => 
    (a.rowEventWidth > b.rowEventWidth) ? -1 : 1);

    //this.getEventByRowIndex(sortedrowLeaveRequest);
    
    return sortedrowLeaveRequest
  }

  getWidth(fdate: moment.Moment, ldate: moment.Moment) : number{
    let width = 0
    if(fdate != null && ldate != null){
      while(ldate.diff(fdate, 'day') >= 0){
        if(this.orderOfWorkWeekDays.indexOf(fdate.day()) >= 0){
          width = width + 1;
        }
        fdate = moment(fdate).add(1, 'day');
      }
    }
    return width;
  }

  getEventByRowIndex(sortedrowLeaveRequest: Rowevent[]) : any[][]{
    let rowindexevent : number[][] = []; //2 dimention array of events for every row
    let rowevents : Rowevent[][] = [];
    let reverseRowEvents : Rowevent[][] = [];
    if(sortedrowLeaveRequest != null){

      sortedrowLeaveRequest.forEach((eventItem:Rowevent) => {
        if(rowindexevent.length == 0){ // push very first element
          rowindexevent.push([sortedrowLeaveRequest.indexOf(eventItem)]);
          rowevents.push([eventItem]);
        }
        else{ // push other events
          let breakPoint;
          let checkEventStartDate = eventItem.rowEventStartDate; // start date of event
          let checkEventEndDate = eventItem.rowEventEndDate;     // end date of event
          let checkEventLength = eventItem.rowEventWidth;        // width(no of column fill) of event
          
          let rowLength = rowindexevent.length; //how many row are filled (length)
          let k = 0;
          let area = '';
          for(let i = 0; i < rowLength; i++){

            let rowEvents : number[] = rowindexevent[i];
            let rowEventsLength = rowEvents.length;
            let totalExitEventLength = 0;

            for(let j = 0; j < rowEventsLength; j++){
              let exitEvent = sortedrowLeaveRequest[rowEvents[j]];  // exit event in row
              let exitEventStartDate = exitEvent.rowEventStartDate; // start date of exit event in row
              let exitEventEndDate = exitEvent.rowEventEndDate;     // end date of exit event in row
              let exitEventLength = exitEvent.rowEventWidth;        // width(no of column fill) exit event in row
              //console.log('checkEvent : ' + eventItem.rowEvent?.reason +';;; checkEventStartDate : ' + checkEventStartDate + ';;; checkEventLength : ' + checkEventLength);
              //console.log('exitEvent : ' + exitEvent.rowEvent?.reason +';;; exitEventEndDate : ' + exitEventEndDate + ';;; exitEventLength : ' + exitEventLength);

              totalExitEventLength = totalExitEventLength + exitEventLength;
              //console.log('totalExitEventLength : ' + totalExitEventLength)
              if((
                5 - totalExitEventLength) < checkEventLength || 
                moment(checkEventStartDate).diff(moment(exitEventStartDate), 'day') == 0 ||
                moment(checkEventStartDate).diff(moment(exitEventEndDate), 'day') == 0){
                k = -1;
                //console.log("-1k totalExitEventLength: " + totalExitEventLength);
                //console.log("-1k checkEventLength: " + checkEventLength);
                break;
              }
              else{
                //console.log("k totalExitEventLength: " + totalExitEventLength);
                //console.log("k checkEventLength: " + checkEventLength);
                if(moment(exitEventStartDate).diff(moment(checkEventEndDate), 'day') > 0){
                  k = i;
                  area = 'before';
                  //console.log(k);
                  //break;
                }
                else if(moment(checkEventStartDate).diff(moment(exitEventEndDate), 'day') > 0){
                  k = i;
                  area = 'after';
                  //console.log(k);
                  //break;
                }
              }      
            }
            if(k != -1){
              break;
            }
          }
          if(k == -1){
            rowindexevent.push([sortedrowLeaveRequest.indexOf(eventItem)]);
            rowevents.push([eventItem]);
            //console.log(rowindexevent);
          }
          else{
            if(area == 'before'){
              rowindexevent[k].unshift(sortedrowLeaveRequest.indexOf(eventItem));
              rowevents[k].unshift(eventItem);
            }
            else if(area == 'after'){
              rowindexevent[k].push(sortedrowLeaveRequest.indexOf(eventItem));
              rowevents[k].push(eventItem);
            }
          }
        }
      });
    }
    //reverseRowEvents = .reverse();
    return rowevents;
  }

  @HostListener('window:resize') getlength(noOfCell : number): number{
    
    let cellwidth: number = 0.0;
    let celloffsetwidth: number = 0.0;
    let columnoffsetwidth: number = 0.0;
    let widthstyle: number = 0.0;

    let cellattr = document.getElementById('calendar-cell');
    if(cellattr){
      cellwidth = cellattr.clientWidth;
      celloffsetwidth = cellattr.offsetWidth;
    }

    let columnattr = document.getElementById('columns');
    if(columnattr){
      columnoffsetwidth = columnattr.offsetWidth;
    }

      while(noOfCell > 0){
        widthstyle = widthstyle + celloffsetwidth + 0.5;
        noOfCell = noOfCell - 1;
      }
      if(widthstyle > columnoffsetwidth){
        widthstyle = columnoffsetwidth;
      }
    return ((widthstyle * 2 ) - 2.5);
  }

  getMoveByBottom(row : Rowevent[][]): number{
    let noOfRows = row.length;
    if(noOfRows > this.noOfEventsShowInWeek){
      noOfRows = this.noOfEventsShowInWeek
    }
    let eventheight: number = 0;

    let columnattr = document.getElementById('event');
    if(columnattr){
      eventheight = (columnattr.offsetHeight * noOfRows);
    }

    if(eventheight == 0){
      eventheight = 19;
    }
    // if(noOfRows > this.noOfEventsShowInWeek){
    //   eventheighteventheight + 15
    // }
    //console.log(eventheight);
    return (eventheight + 17)
  }

  getMoveByLeft(event : Rowevent, index : number, rowEvent : Rowevent[], j : number) :number{
    //console.log('-----');
    
    let diff = 0;
    let eventFirstday : any;
    let firstdateOfWeek: any;
    let indextOfFirstdateOfWeek: any;
    let indextOfFirstdayOfEvent: any;

    let cellwidth: number = 0;
    let celloffsetwidth: number = 0;
    let widthstyle!: number | undefined;

    let cellattr = document.getElementById('calendar-cell');
    if(cellattr){
      cellwidth = cellattr.clientWidth;
      celloffsetwidth = cellattr.offsetWidth;
    }
    
    if(this.Dates != null){
      firstdateOfWeek = this.Dates[index].date;
      indextOfFirstdateOfWeek = this.workweekofmonth.indexOf(moment(firstdateOfWeek).day());
      indextOfFirstdayOfEvent = this.workweekofmonth.indexOf(moment(event.rowEventStartDate).day());

      let sortedrowLeaveRequest = rowEvent.sort((a, b) => 
        (a.rowEventStartDate < b.rowEventStartDate) ? -1 : 1);
      //console.log(sortedrowLeaveRequest);
      //console.log(event);
      
      //let eventindex = rowEvent.indexOf(event);
      let eventindex = sortedrowLeaveRequest.findIndex((leave: any) => leave.rowEvent.id === event.rowEvent?.id && leave === event);
      //console.log(event.rowEvent?.id);
      //console.log(eventindex);
      
      if(eventindex > 0){
        let beforeevent = sortedrowLeaveRequest[eventindex - 1];
        let indextOfEnddayOfBeforeEvent = this.workweekofmonth.indexOf(moment(beforeevent.rowEventEndDate).day());
        let aftereevent = sortedrowLeaveRequest[eventindex + 1];
        let indextOfStartdayOfAfterEvent = this.workweekofmonth.indexOf(moment(beforeevent.rowEventStartDate).day());

        diff = indextOfFirstdayOfEvent - indextOfEnddayOfBeforeEvent - 1;
        //diff = indextOfEnddayOfBeforeEvent - indextOfFirstdayOfEvent - 1;
        widthstyle = 1.5;
          while(diff > 0){
            widthstyle = widthstyle + celloffsetwidth + 0;
            diff = diff - 1;
          }
      }
      else{
        diff = indextOfFirstdayOfEvent - indextOfFirstdateOfWeek;
        widthstyle = 0.25;
          while(diff > 0){
            widthstyle = widthstyle + celloffsetwidth + 0.5;
            diff = diff - 1;
          }
      }
    }
    else{
      widthstyle = 0;
    }
    //console.log(widthstyle * 2);
    return ((widthstyle * 2));
    
  }

  findUser(id : number | undefined) : User{
    //let user : User[] = [];
    let user : User = {} as User;
    //user = this.staffs.filter((x: User) => x.id == id);
    let index = this.staffs.findIndex((x: User) => x.id == id);
    if(index != -1){
      user = this.staffs[index];
    }
    return user;
  }

  dayHoliday(dayDate: CalendarDate) : any{
    let holiday;
    if(this.monthHoliday != null)
    {
      holiday = this.monthHoliday.filter(x => 
        moment(x.date).date() === dayDate.date?.getDate() 
        && moment(x.date).month() === dayDate.date?.getMonth()
        && moment(x.date).year() === dayDate.date?.getFullYear())
    }
    else{
      holiday = null;
    }
    
    return holiday;
  }

  dayLeaveRequest(dayDate: CalendarDate) : any{
    let leaverequest : LeaveRequest[] = [];
    let rowevent : Rowevent[] = [];
    if(this.monthLeaveRequest != null)
    {
      // leaverequest = this.monthLeaveRequest.filter(x => 
      //   moment(x.startDate).date() === dayDate.date?.getDate() 
      //   && moment(x.startDate).month() === dayDate.date?.getMonth()
      //   && moment(x.startDate).year() === dayDate.date?.getFullYear())
      if(this.leaveRequests != null){
        this.leaveRequests.forEach((item: LeaveRequest) => {
          let fDate = moment(item.startDate);
          let eDate = moment(item.endDate);
          let dDate = moment(dayDate.date);
  
          if(fDate.format() == dDate.format() || 
              (dDate.diff(fDate, 'day')) >= 0 && (eDate.diff(dDate, 'day')) >= 0
            )
          {
            rowevent.push(
              new Rowevent(
                this.rowEvent = item,
                this.rowEventStartDate = item.startDate,
                this.rowEventEndDate = item.endDate,
                this.rowEventWidth = 0,
                this.rowEventUser = this.findUser(item.userId),
                this.rowEventResponsiblePerson = this.findUser(item.resPersionId)
              )
            );
            leaverequest.push(item);
          }
        })
      }
    }
    else{
      leaverequest = [];
      rowevent = [];
    }
    
    return rowevent;
  }

  counter(i: number) {
    return new Array(i);
  }

  receiveMonth($event: number){
    this.changeMonth = $event;
    //console.log(this.changeMonth);
  }

  receiveYear($event: number){
    this.changeYear = $event;
    //console.log(this.changeYear);
  }
  // receiveDate($event: Date){
  //   this.todayDate = $event;
  //   console.log(this.todayDate);
  // }

  public static getDaysInMonth(month: number, year: number): Date[] {
    let date = new Date(year, month, 1);
    let days = [];
    while (date.getMonth() === month) {
      days.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }
    return days;
  }

  showLeave(event : Rowevent, userId : number, responsiblePersonId : number){
    if(event){
      const dialogRef = this.dailog.open(ShowLeaveComponent, {
        width : '500px',
        panelClass: 'custom-Leavebox',
        data : {
          leave :event,
        }
      });

      dialogRef.afterClosed().subscribe(result => {
          if(result != null){
            let value : boolean;
            if(result.whoApproved == 'SuperAdmin'){

              if(result.isApproved == 'true'){
                value = true;
              }
              else{
                value = false;
              }
              this.leaveRequestService.ApprovedBySuperAdmin(event.rowEvent?.id, value)
            }
            if(result.whoApproved == 'Admin'){

              if(result.isApproved == 'true'){
                value = true;
              }
              else{
                value = false;
              }
              this.leaveRequestService.ApprovedByAdmin(event.rowEvent?.id, value)
            }
          }
      });
    }
  }

}

