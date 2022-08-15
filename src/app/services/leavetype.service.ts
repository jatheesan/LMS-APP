import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Leavetype } from '../models/leavetype.model';

@Injectable({
  providedIn: 'root'
})
export class LeavetypeService {

  private baseUrl = 'http://localhost:14162/api/LeaveType';

  constructor(private http: HttpClient) { }

  //Get All Roles....
  getAllLeaveTypes(): Observable<any>{
    return this.http.get<any>(this.baseUrl).pipe(map((data:any)=>{
      return this.mapDataToLeaveTypes(data.data);
    }))
  }

  getLeaveTypeById(id : number): Observable<any>{
    return this.http.get<any>(this.baseUrl + "/" + id).pipe(map((data:any)=>{
      return this.mapDataToLeaveType(data.data);
    }))
  }

  public deleteLeaveType(id : number): Observable<any>{
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

  public createLeaveType(leavetype: any): Observable<any>{
    leavetype.data.id = "0";
    leavetype.data.type = "leavetype";
    return this.http.post(this.baseUrl, leavetype);
  }

  public updateLeaveType(id: number | undefined, leavetype: any): Observable<any>{
    leavetype.data.id = id;
    leavetype.data.type = "leavetype";
    return this.http.put((this.baseUrl + '/'+ id), leavetype);
  }

  mapDataToLeaveTypes(data:any){
    let leavetypes:Leavetype[]=[];
    data.forEach((element: any) => {
      let leavetype:Leavetype = new Leavetype(element);
      leavetypes.push(leavetype);
    });
    return leavetypes;
  }

  mapDataToLeaveType(data: any): any {
    let leavetype:Leavetype = new Leavetype(data);
    return leavetype;
  }
}
