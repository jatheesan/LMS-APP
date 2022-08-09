import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthguardServiceService } from './authguard-service.service';
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {
  sessionToken !: any;
  canRoute !: boolean;

  constructor(private authguardServiceService : AuthguardServiceService,
              private router : Router){}
  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
      this.sessionToken = JSON.parse(this.authguardServiceService.getToken()!);
      if(this.sessionToken != null){
        const helper = new JwtHelperService();
        const decodedToken = helper.decodeToken(this.sessionToken.token);
        console.log(this.sessionToken.token);
        console.log(decodedToken);
        
        if(!helper.isTokenExpired(this.sessionToken.token) &&
            this.sessionToken.userid == decodedToken.userId &&
            route.data['role'] &&
            route.data['role'].indexOf(decodedToken.Role) != -1
        ){
          this.canRoute = true;
        }
        else{
          this.router.navigate(['/login']);
          this.canRoute = false;
        }
      }
      else{
          this.router.navigate(['/login']);
          this.canRoute = false;
      }
      return this.canRoute;
  }
  
}
