import { getLocaleDayNames } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { CalendarDate } from "../../../../../models/calendar-date.model";
import { DaysOfWeek } from "../../../../../enum/days-of-week";

@Component({
  selector: 'lms-calendar-month-view',
  templateUrl: './calendar-month-view.component.html',
  styleUrls: ['../calendar-month-view.component.scss']
})
export class CalendarMonthViewComponent implements OnInit {
  
  datenum: any;
  month: any;
  year: any;
  daysInMonth: any;
  local : any;
  Dates : CalendarDate[] | undefined;
  @Input() date!: Date;
  @Input() workweek!: number[];
  workweekofmonth!: number[];
  index!: number;
  static is_thismonth: boolean;
  static date: Date;
  static DaysList: any;
  
  constructor() { }

  ngOnInit(): void {
    this.datenum = this.date.getDate();
    this.month = this.date.getMonth();
    this.year = this.date.getFullYear();
    this.daysInMonth = new Date(this.year, this.month, 35).getDate();
    this.local = this.date.toLocaleDateString();

    this.workweekofmonth = this.workweek;

    this.Dates = CalendarMonthViewComponent.getCalendarDateInMonth(this.month, this.year, this.workweekofmonth);

    let Dateslength = this.Dates.length;
    let lastdate = this.Dates[Dateslength-1];
    let lastday = lastdate.date?.getDay();
    this.index = this.workweekofmonth.findIndex(x => x === lastday);
    let workweekofmonthlength = this.workweekofmonth.length;
    let filldays = workweekofmonthlength - (this.index + 1)
    if(filldays > 0)
    {
      this.Dates = CalendarMonthViewComponent.getCalendarDateInAfterMonth(this.month, this.year, this.Dates, this.workweekofmonth, filldays, this.index);
    }

    let firstdate = this.Dates[0]; 
    let firstday = firstdate.date?.getDay();
    this.index = this.workweekofmonth.findIndex(x => x === firstday);
    if(this.index > 0)
    {
      this.Dates = CalendarMonthViewComponent.getCalendarDateInBeforeMonth(this.month, this.year, this.Dates, this.workweekofmonth, this.index);
    }
  }

  public static getDaysInMonth(month: number, year: number): Date[] {
    let date = new Date(year, month, 1);
    let days = [];
    while (date.getMonth() === month) {
      days.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }
    return days;
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
            this.is_thismonth = true
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
            this.is_thismonth = false
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
            this.is_thismonth = false
          )
        );
        filldays = filldays - 1;
      }
      workdate.setDate(workdate.getDate() + 1);
    }
    return days;
  }


}
