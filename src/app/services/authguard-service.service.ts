import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthguardServiceService {

  constructor() { }

  public saveToken(token : any, userid : number){
    var user_details = {
      token : token,
      userid : userid
    }
    //console.log(user_details);
    localStorage.removeItem('Session-User');
    localStorage.setItem('Session-User', JSON.stringify(user_details));
  }

  public getToken(){
    return localStorage.getItem('Session-User');
  }
}
