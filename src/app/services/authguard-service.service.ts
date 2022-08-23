import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { map, Observable } from 'rxjs';
import { RoleService } from './role.service';

@Injectable({
  providedIn: 'root'
})
export class AuthguardServiceService {

  sessionToken !: any;
  isAuthRole !: Observable<boolean>; 
  constructor(private roleService : RoleService) { }

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

  checkRole(role : String) : Observable<boolean>{
    this.sessionToken = JSON.parse(this.getToken()!);
    if(this.sessionToken != null){
      this.isAuthRole = this.checkAuthRole(this.sessionToken.token, role);
    }
    return this.isAuthRole;
  }

  public checkAuthRole(token : string, role : String){
    this.sessionToken = JSON.parse(this.getToken()!);

    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(token);
    console.log(decodedToken.Role);
    return this.roleService.getAllRoleById(decodedToken.Role).pipe(map((roledata) =>{
        if(role == roledata.roleType){
          return true;
        }
        else{
          return false;
        }
    })
    );
  }

  public getAuthRole(){
    this.sessionToken = JSON.parse(this.getToken()!);
    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(this.sessionToken.token);
    return decodedToken.Role;
  }
}
