import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl = 'http://localhost:14162/api/Auth';

  constructor(private http: HttpClient) { }

  userLogin(authdetails: any): Observable<any>{
    return this.http.post(this.baseUrl + '/login', authdetails);
  }
}
