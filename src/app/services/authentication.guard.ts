import { DoCheck, Injectable, OnInit } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { map, observable, Observable } from 'rxjs';
import { AuthguardServiceService } from './authguard-service.service';
import { JwtHelperService } from "@auth0/angular-jwt";
import { RoleService } from './role.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {
  sessionToken !: any;
  canRoute !: Observable<boolean>;

  constructor(private authguardServiceService : AuthguardServiceService,
              private router : Router,
              private roleService : RoleService){
              }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
                
    this.sessionToken = JSON.parse(this.authguardServiceService.getToken()!);
    if(this.sessionToken != null){
      this.canRoute = this.CheckUserRole(this.sessionToken.token, route);
    }
    return this.canRoute;
  }

  CheckUserRole(token : string, route: ActivatedRouteSnapshot){

    // token and decodedToken
    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(token);

    return this.roleService.getAllRoleById(decodedToken.Role).pipe(map((roledata) =>{
        
        if(!helper.isTokenExpired(token) &&
          route.data['role'].indexOf(roledata.roleType) != -1){
          return true;
        }
        else{
          this.router.navigate(['/login']);
          return false;
        }
      })
    );
  }
}
