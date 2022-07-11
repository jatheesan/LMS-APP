import { Component, OnInit } from '@angular/core';
import { Holiday } from 'src/app/models/holiday.model';
import { HolidayService } from 'src/app/services/holiday.service';
import { DatePipe } from '@angular/common'

@Component({
  selector: 'lms-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  date = new Date('Wed jan 20 2022 00:00:00 GMT+0530 (India Standard Time)');
  //[0 => Sunday, 1 => Monday, 2 => Tuseday, 3 => Wednesday, 4 => Thursday, 5 => Friday, 6 => Saturday]
  // here workweek first element is first day of week
  //workweek = [];
  workweek = [3, 1, 5, 2, 4];
  orderOfWorkWeekDays!: number[];

  holidays!: Holiday[];
  holidaydates : Date[] = [];

  constructor(private holidayService: HolidayService) {

  }

  ngOnInit(): void {
    let weekStartDay = this.workweek[0];
    let lowestToHighest = this.workweek.sort((a, b) => a - b);
    this.orderOfWorkWeekDays = DashboardComponent.orderOfWorkWeek(lowestToHighest, weekStartDay);

    this.getAllHolidays();
    
  }

  getAllHolidays(){
    this.holidayService.getAllHolidays()
      .subscribe(
        response => {
          this.holidays = response;
          this.holidaydates = this.getAllHolidayDates(this.holidays);
        }
      );
  }

  getAllHolidayDates(data:any){
    let dates : Date[] = [];
    data.forEach((element: any) => {
      let date: Date = element.date
      dates.push(date);
    });
    return dates;
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
