import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Deserializer } from 'ts-json-api-formatter';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl = 'http://localhost:14162/api/User';

  constructor(private http: HttpClient) { }

  //Get All Holidays....
  getAllUsers(): Observable<any>{
    return this.http.get<any>(this.baseUrl).pipe(map((data:any)=>{
      //return this.mapDataToUsers(data.data)
      let staffsObj=((new Deserializer()).deserialize(data));
      return staffsObj
    }))
  }

  getUserById(userid : number): Observable<any>{
    return this.http.get<any>(this.baseUrl + "/" + userid).pipe(map((data:any)=>{
      //return this.mapDataToUser(data.data)
      let staffObj=((new Deserializer()).deserialize(data));
      return staffObj
    }))
  }

  public deleteUser(id : number): Observable<any>{
    let result : any;
    if(id != null){
      result = this.http.delete(this.baseUrl + '/' + id);
      return result;
    }
    else{
      return result;
    }
  }

  public updateUser(id: number, user: any): Observable<any>{
    return this.http.put((this.baseUrl + '/'+ id), user);
  }

  public createUser(user: any): Observable<any>{
    user.data.id = "0";
    user.data.type = "user";
    return this.http.post(this.baseUrl, user);
  }

  //Mapping to User Model
  mapDataToUsers(data: any) : User[]{
    let users: User[] = [];
    data.forEach((element: any) => {
      let user:User = new User(element);
      users.push(user);
    });
    return users;
  }

  mapDataToUser(data: any): any {
    let user:User = new User(data);
    return user;
  }
}
