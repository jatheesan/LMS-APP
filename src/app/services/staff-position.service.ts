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

  public deletePosition(id : number): Observable<any>{
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

  public createStaffPosition(position: any): Observable<any>{
    position.data.id = "0";
    position.data.type = "staffposition";
    return this.http.post(this.baseUrl, position);
  }

  public updateStaffPosition(id: number | undefined, position: any): Observable<any>{
    position.data.id = id;
    position.data.type = "staffposition";
    return this.http.put((this.baseUrl + '/'+ id), position);
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
