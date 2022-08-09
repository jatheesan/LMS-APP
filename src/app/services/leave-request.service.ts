import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { LeaveRequest } from '../models/leaverequest.model';

@Injectable({
  providedIn: 'root'
})
export class LeaveRequestService {

  baseUrl = 'http://localhost:14162/api/LeaveRequest';
  // colors 1->green 2->blue 3->gold 4->purple 5->pink 6->skyblue 7->logo-green
  colors : string[] = ['#b4eeb4', '#cfead9', '#eedd82', '#efc5f7', '#f7d6c5', '#c5cdf7', '#27FFBF'];

  constructor(private http: HttpClient) { }

  //Get All LeaveRequests
  getAllLeaveRequest(): Observable<any>{
    return this.http.get<any>(this.baseUrl).pipe(map((data:any) => {
      return this.mapDataToLeaveRequest(data.data)
    }))
  }

  getAllLeaveRequestsByUser(id : number): Observable<any>{
    return this.http.get<any>(this.baseUrl + "/User/" + id).pipe(map((data:any) => {
      return this.mapDataToLeaveRequest(data.data)
    }))
  }

  public ApplyLeaveRequest(leave: any): Observable<any>{
    leave.data.id = "0";
    leave.data.relationships.leaveRequestOfLeaveTypes.data = [];
    leave.included = []; 
    console.log(leave);
    return this.http.post(this.baseUrl, leave);
  }
  // public ApplyLeaveRequest(leave: any){
  //   console.log(leave);
  //   leave.data.id = "0";
  //   leave.data.relationships.leaveRequestOfLeaveTypes.data = [];
  //   leave.included = [];
  //   console.log(leave);
  // }

  public deleteLeaveRequest(id : number): Observable<any>{
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


  //Mapping to LeaveRequest Model
  mapDataToLeaveRequest(data: any): any {
    let leaveRequests: LeaveRequest[] = [];
    data.forEach((element: any) => {
      let leaverequest:LeaveRequest = new LeaveRequest(element, this.colors);
      leaveRequests.push(leaverequest);
    });
    return leaveRequests;
  }

}
