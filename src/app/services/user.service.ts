import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
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
      return this.mapDataToUsers(data.data)
    }))
  }

  getUserById(userid : number): Observable<any>{
    return this.http.get<any>(this.baseUrl + "/" + userid).pipe(map((data:any)=>{
      return this.mapDataToUser(data.data)
    }))
  }

  //Mapping to User Model
  mapDataToUsers(data: any) : User[]{
    let users: User[] = [];
    data.forEach((element: any) => {
      let user:User = new User(element);
      users.push(user);
    });
    console.log(users);
    return users;
  }

  mapDataToUser(data: any): any {
    console.log(data);
    let user:User = new User(data);
    console.log(user);
    return user;
  }
}
