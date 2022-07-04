import { Component, Input, OnInit } from '@angular/core';
import { DaysOfWeek } from "../../../../../enum/days-of-week";

@Component({
  selector: 'lms-calendar-month-view-header',
  templateUrl: './calendar-month-view-header.component.html',
  styleUrls: ['../calendar-month-view.component.scss']
})
export class CalendarMonthViewHeaderComponent implements OnInit {

  @Input() workweek!: number[];
  @Input() orderOfWorkWeekDays!: number[];
  @Input() date!: Date;
  DaysofWeek = DaysOfWeek;
  workweeksnames!: String[];
  month !: number;
  monthName !: string;
  year !: number;

  constructor() {

  }

  ngOnInit(): void {

    this.workweeksnames = CalendarMonthViewHeaderComponent.fineWorkWeek(this.orderOfWorkWeekDays);

    this.month = this.date.getMonth();
    this.monthName = CalendarMonthViewHeaderComponent.findMonth(this.month);
    this.year = this.date.getFullYear();
  }

  public static fineWorkWeek(workweek : number[]): string[] {
    let workweeksnames : string[] = [];
    let workweeklenght = workweek.length;
    while(workweeklenght > 0){
      let value = workweek[workweeklenght-1]
      workweeksnames.unshift(DaysOfWeek[value]);
      workweeklenght = workweeklenght - 1
    }
    return workweeksnames;
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
