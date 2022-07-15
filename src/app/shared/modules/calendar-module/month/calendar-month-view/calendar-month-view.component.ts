import { getLocaleDayNames } from '@angular/common';
import { Component, DoCheck, Input, OnChanges, OnInit, SimpleChange, SimpleChanges } from '@angular/core';
import { CalendarDate } from "../../../../../models/calendar-date.model";
import { MonthView } from "../../../../../models/month-view"
import { DaysOfWeek } from "../../../../../enum/days-of-week";
import { Holiday } from 'src/app/models/holiday.model';
import * as moment from 'moment';
import { last, Observable } from 'rxjs';
import { LeaveRequest } from 'src/app/models/leaverequest.model';
import { Rowevent } from 'src/app/models/rowevent.model';

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
  @Input() todayDate!: Date;
  @Input() workweek!: number[];
  @Input() orderOfWorkWeekDays!: number[];
  @Input() holidays!: Holiday[];
  @Input() leaveRequests!: LeaveRequest[];
  monthHoliday: Holiday[] = [];
  monthLeaveRequest: LeaveRequest[] = [];
  workweekofmonth!: number[];
  index!: number;
  static isThisMonth: boolean;
  static date: Date;
  static DaysList: any;

  rowEvent !: LeaveRequest | undefined;
  rowEventStartDate !: Date | undefined;
  rowEventEndDate !: Date | undefined;
  rowEventWidth !: number | undefined;

  view!: MonthView;
  rowoffset !: number[];
  rowoffsets !: number[];
  noOfWorkWeekDays !: number;
  totalDaysVisibleInWeek!: number;
  noOfDatesInView !: number;
  noOfWeeks !: number;
  days : CalendarDate[] | undefined;

  constructor() {

  }

  ngOnInit(): void {
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
    console.log(this.rowoffset);
    

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

  }

  ngDoCheck(): void
  {
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
  }


  public static getCalendarDateInMonth(month: number, year: number, workweek: number[]): CalendarDate[]{
    let days = [];
    let date = new Date(year, month, 1);

    while (date.getMonth() === month) {
      let weekdate = new Date(date)
      let d = weekdate.getDay();
      let i = workweek.findIndex(x => x === d);
      if(i != -1){
        days.push(
          new CalendarDate(
            this.date = weekdate,
            this.isThisMonth = true
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
        days.unshift(
          new CalendarDate(
            this.date = new Date(workdate),
            this.isThisMonth = false
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
        days.push(
          new CalendarDate(
            this.date = new Date(workdate),
            this.isThisMonth = false
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
      firstday = this.Dates[rowIndex].date;
      firstdayOfWeek = moment(firstday);
      lastday = this.Dates[rowIndex + (this.noOfWorkWeekDays - 1)].date
      lastdayOfWeek = moment(lastday);

      if(this.leaveRequests != null){
        this.leaveRequests.forEach((item: LeaveRequest) => {
          let firstdayofLeave = moment(item.startDate);
          let lastdayofLeave = moment(item.endDate);

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
                  this.rowEventWidth = width
                )
              );
              leaveRequest.push(item);
          }
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
                  this.rowEventWidth = width
                )
              );
              leaveRequest.push(item);
          }
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
                  this.rowEventWidth = width
                )
              );
              leaveRequest.push(item);
          }
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
                  this.rowEventWidth = width
                )
              );
              leaveRequest.push(item);
          }
        });
      }
    }
    let sortedrowLeaveRequest = rowLeaveRequest.sort((a, b) => 
    (a.rowEventWidth< b.rowEventWidth) ? -1 : 1);
    //console.log(sortedrowLeaveRequest);
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
            leaverequest.push(item);
          }
        })
      }
    }
    else{
      leaverequest = [];
    }
    
    return leaverequest;
  }

  counter(i: number) {
    return new Array(i);
  }

  receiveMonth($event: number){
    this.changeMonth = $event;
    console.log(this.changeMonth);
  }

  receiveYear($event: number){
    this.changeYear = $event;
    console.log(this.changeYear);
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
}

