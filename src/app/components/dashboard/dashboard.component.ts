import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'lms-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  date = new Date('Wed jan 20 2022 00:00:00 GMT+0530 (India Standard Time)');
  //[0 => Sunday, 1 => ]
  workweek = [3, 1, 2, 5, 4];
  //workweek = [2, 5, 1, 3, 0]
  orderOfWorkWeekDays!: number[];

  constructor() {

  }

  ngOnInit(): void {
    console.log("Date = " + this.date);
    console.log('workweek ' + this.workweek);
    let weekStartDay = this.workweek[0];
    let lowestToHighest = this.workweek.sort((a, b) => a - b);
    console.log('lowestToHighest ' + lowestToHighest);
    this.orderOfWorkWeekDays = DashboardComponent.orderOfWorkWeek(lowestToHighest, weekStartDay);
    console.log('orderOfWorkWeekDays ' + this.orderOfWorkWeekDays);
  }

  public static orderOfWorkWeek(lowestToHighest: number[], startday: number) : number[]
  {
    let startdayIndex = lowestToHighest.indexOf(startday);
    let lengthOfWorkWeek = lowestToHighest.length;
    let orderOfWorkWeek: number[] = [];
    let i = startdayIndex;
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

    return orderOfWorkWeek;
  }

}
