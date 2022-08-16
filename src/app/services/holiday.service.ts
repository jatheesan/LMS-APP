import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Deserializer } from 'ts-json-api-formatter';
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
      //return this.mapDataToHoliday(data.data)
      let leaveObj=((new Deserializer()).deserialize(data));
      return leaveObj;
    }))
  }

  getHolidayById(id : number): Observable<any>{
    return this.http.get<any>(this.baseUrl + "/" + id).pipe(map((data:any)=>{
      let leaveObj=((new Deserializer()).deserialize(data));
      return leaveObj;
    }))
  }

  public deleteHoliday(id : number): Observable<any>{
    let result : any;
    if(id != null){
      result = this.http.delete(this.baseUrl + '/' + id);
      console.log(result);
      return result;
    }
    else{
      return result;
    }
  }

  public createHoliday(holiday: any): Observable<any>{
    holiday.data.id = "0";
    holiday.data.type = "holiday";
    return this.http.post(this.baseUrl, holiday);
  }

  public updateHoliday(id: number | undefined, holiday: any): Observable<any>{
    holiday.data.id = id;
    holiday.data.type = "holiday";
    return this.http.put((this.baseUrl + '/'+ id), holiday);
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

