import { Component, Input, OnInit } from '@angular/core';
import * as moment from 'moment';
import { CalendarDate } from 'src/app/models/calendar-date.model';
import { Holiday } from 'src/app/models/holiday.model';
import { LeaveRequest } from 'src/app/models/leaverequest.model';
import { Rowevent } from 'src/app/models/rowevent.model';
import {MatDialog} from '@angular/material/dialog';
import { MoreeventscartComponent } from 'src/app/shared/modals/moreeventscart/moreeventscart.component';

@Component({
  selector: 'lms-calendar-month-cell',
  templateUrl: './calendar-month-cell.component.html',
  styleUrls: ['../calendar-month-view.component.scss']
})
export class CalendarMonthCellComponent implements OnInit {

  @Input() day !: CalendarDate;
  @Input() dayHoliday!: Holiday[];
  @Input() dayLeaveRequest!: LeaveRequest[];
  @Input() orderOfWorkWeekDays!: number[];
  @Input() rowEvent!: Rowevent[];
  @Input() noOfEventsShowInWeek!: number;
  cellDay !: CalendarDate;
  fullDate !: Date | undefined;
  date: any;
  month: any;
  monthName: any;
  year: any;
  isThisMonth: boolean | undefined;
  isToday: boolean | undefined;

  dayHolidayLength : any;
  dayLeaveRequestLength : any;

  leavelength !: number;

  constructor(public dailog: MatDialog) {

   }

  ngOnInit(): void {
    
    this.cellDay = this.day;
    this.fullDate = this.cellDay.date;
    this.isThisMonth = this.cellDay.isThisMonth;
    this.isToday = this.cellDay.isToday
    this.date = this.cellDay.date?.getDate();
    this.month = this.cellDay.date?.getMonth();
    //this.monthName = CalendarMonthCellComponent.findMonth(this.month);
    this.monthName = moment(this.fullDate).format('MMMM')
    //console.log(this.monthName);
    this.year = this.cellDay.date?.getFullYear();

    this.dayHolidayLength = this.dayHoliday.length;
    this.dayLeaveRequestLength = this.dayLeaveRequest.length;

    this.leavelength = 100;
    
  }

  openDialog(){
    const dialogRef = this.dailog.open(MoreeventscartComponent, {
      width : '500px',
      data : {
        leaves :this.dayLeaveRequest,
        date : this.fullDate
      }
    });
  }

  findMore(): number{
    let more : number = 0;
    more = this.dayLeaveRequestLength - this.noOfEventsShowInWeek;
    return more;
  }

  findBgColor() : string{
    let bgcolor : string;

    if(this.isToday){
      bgcolor = '#e8fde7';
    }
    else if(this.dayHolidayLength > 0 || this.fullDate?.getDay() == 0 || this.fullDate?.getDay() == 6){
      bgcolor = '#ffe8e5';
    }
    else{
      bgcolor = '#fff';
    }
    return bgcolor;
  }

  findHolidayWidth() : number{
    let cellwidth: number = 0;
    let datewidth: number = 0;
    let cellattr = document.getElementById('cell');
    let dateattr = document.getElementById('date');
    
    if(cellattr){
      cellwidth = cellattr.offsetWidth;
      console.log(cellwidth);
      
    }

    if(dateattr){
      datewidth = dateattr.offsetWidth;
      console.log(datewidth);
    }
    return (cellwidth - datewidth ) * 2;
  }

  getlength(noOfCell : number): number{
    
    let cellwidth: number = 0;
    let celloffsetwidth: number = 0;
    let widthstyle: number = 0;

    let cellattr = document.getElementById('cell');
    if(cellattr){
      cellwidth = cellattr.clientWidth;
      celloffsetwidth = cellattr.offsetWidth;
    }
      //console.log('cellwidth ' + cellwidth);
      //console.log('celloffsetwidth ' + celloffsetwidth);
      
      widthstyle = cellwidth;
      noOfCell = noOfCell - 1;
      while(noOfCell > 0){
        widthstyle = widthstyle + celloffsetwidth;
        noOfCell = noOfCell - 1;
      }
    return widthstyle;
  }

  getPositionFromBottom(fullDate : CalendarDate): number{
    let fromBottom = 0;
    let dayrowEvent : Rowevent[] = [];
    dayrowEvent = this.rowEvent.filter((item : Rowevent) => 
      (moment(fullDate.date).diff(moment(item.rowEventStartDate), 'day') > 0) &&
      (moment(item.rowEventEndDate).diff(moment(fullDate.date), 'day') >= 0)
    );
    fromBottom = dayrowEvent.length
    
    return fromBottom * 19;
  }

  dayRowEvent(fullDate : CalendarDate) : Rowevent[]{
    let dayrowEvent : Rowevent[] = [];
    dayrowEvent = this.rowEvent.filter((item : Rowevent) => 
      moment(item.rowEventStartDate).diff(moment(fullDate.date), 'day') == 0
    );
    return dayrowEvent;
  }

  public static findMonth(monthNumber : number): string
  {
    let month = monthNumber;
    let monthName !: string;
    switch (month){
      case 0:
        monthName = 'January';
        break;
      case 1:
        monthName = 'February';
        break;
      case 2:
        monthName = 'March';
        break;
      case 3:
        monthName = 'April';
        break;
      case 4:
        monthName = 'May';
        break;
      case 5:
        monthName = 'June';
        break;
      case 6:
        monthName = 'July';
        break;
      case 7:
        monthName = 'August';
        break;
      case 8:
        monthName = 'September';
        break;
      case 9:
        monthName = 'October';
        break;
      case 10:
        monthName = 'November';
        break;
      case 11:
        monthName = 'December';
        break;
    }
    return monthName;
  }

}
