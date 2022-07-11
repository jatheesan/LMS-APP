import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Holiday } from '../models/holiday.model';

@Injectable({
  providedIn: 'root'
})
export class HolidayService {

  baseUrl = 'http://localhost:14162/api/Holiday';

  constructor(private http: HttpClient) { }

  //Get All Holidays....
  getAllHolidays(): Observable<any>{
    return this.http.get<any>(this.baseUrl).pipe(map((data:any)=>{
      return this.mapDataToHoliday(data.data)
    }))
  }

  //Mapping....
  mapDataToHoliday(data:any){
    let holidays:Holiday[]=[];
    data.forEach((element: any) => {
      let holiday:Holiday = new Holiday(element);
      holidays.push(holiday);
    });
    return holidays;
  }
}

