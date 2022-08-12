import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { StaffPosition } from '../models/staff-position.model';

@Injectable({
  providedIn: 'root'
})
export class StaffPositionService {
  private baseUrl = 'http://localhost:14162/api/StaffPosition';
  
  constructor(private http: HttpClient) { }

  //Get All Roles....
  getAllPositions(): Observable<any>{
    return this.http.get<any>(this.baseUrl).pipe(map((data:any)=>{
      return this.mapDataToPositions(data.data);
    }))
  }

  getPositionById(id : number): Observable<any>{
    return this.http.get<any>(this.baseUrl + "/" + id).pipe(map((data:any)=>{
      return this.mapDataToPosition(data.data);
    }))
  }

  mapDataToPositions(data:any){
    let positions:StaffPosition[]=[];
    data.forEach((element: any) => {
      let position:StaffPosition = new StaffPosition(element);
      positions.push(position);
    });
    return positions;
  }

  mapDataToPosition(data: any): any {
    let position:StaffPosition = new StaffPosition(data);
    return position;
  }
}
