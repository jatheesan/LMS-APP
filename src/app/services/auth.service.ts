import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { map, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl = 'http://localhost:14162/api/Auth';
  expireTime : number = 60000;
  clearTimeOut : any;

  constructor(private http: HttpClient, private router : Router) { }

  userLogin(authdetails: any): Observable<any>{
    return this.http.post(this.baseUrl + '/login', authdetails)
    .pipe(tap(this.handelUser.bind(this)));
  }

  userRegister(authdetails: any): Observable<any>{
    authdetails.data.id = "0";
    authdetails.data.type = "user";
    return this.http.post(this.baseUrl + '/register', authdetails)
  }

  private handelUser(response : any){
    
    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(response.loginuser.token);

    let nowDate = new Date();
    let expirationDate = helper.getTokenExpirationDate(response.loginuser.token);
    if(expirationDate && nowDate){
      this.expireTime =  expirationDate?.getTime() - nowDate.getTime();
    }
    
    this.autoLogOut(this.expireTime);
  }

  autoLogOut(expirationTime : number){
    console.log(expirationTime)
    this.clearTimeOut = setTimeout(() => {
      this.logOut();
    }, expirationTime);
  }

  logOut(){
    this.router.navigate(['/login']);
    localStorage.removeItem('Session-User');
    if(this.clearTimeOut){
      clearTimeout(this.clearTimeOut);
    }
  }
}
