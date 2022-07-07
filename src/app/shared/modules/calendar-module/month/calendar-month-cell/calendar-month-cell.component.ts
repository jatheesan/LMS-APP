import { Component, Input, OnInit } from '@angular/core';
import { CalendarDate } from 'src/app/models/calendar-date.model';

@Component({
  selector: 'lms-calendar-month-cell',
  templateUrl: './calendar-month-cell.component.html',
  styleUrls: ['../calendar-month-view.component.scss']
})
export class CalendarMonthCellComponent implements OnInit {

  @Input() day !: CalendarDate;
  cellDay !: CalendarDate;
  fullDate !: Date | undefined;
  date: any;
  month: any;
  monthName: any;
  year: any;
  isThisMonth: boolean | undefined;

  constructor() { }

  ngOnInit(): void {
    this.cellDay = this.day;
    this.fullDate = this.cellDay.date;
    this.isThisMonth = this.cellDay.isThisMonth;
    this.date = this.cellDay.date?.getDate();
    this.month = this.cellDay.date?.getMonth();
    this.monthName = CalendarMonthCellComponent.findMonth(this.month);
    this.year = this.cellDay.date?.getFullYear();
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
