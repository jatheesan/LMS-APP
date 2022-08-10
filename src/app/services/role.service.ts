import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { Role } from '../models/role.model';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  private baseUrl = 'http://localhost:14162/api/Role';
  private _roles = new BehaviorSubject<Role[]>([]);
  private dataStore : { roles : Role[] } = {roles: []};
  readonly roles = this._roles.asObservable();
  maproles!: Role[];

  constructor(private http: HttpClient) { }

  loadAll(){
    this.http.get(this.baseUrl).subscribe(
      (data:any) => {
        this.dataStore.roles = this.mapDataToRoles(data.data);
        this._roles.next(Object.assign({}, this.dataStore).roles)
      },
      error => console.log('Could not load roles!!!')
    );
  }

  load(id : number | string){
    this.http.get<Role>(this.baseUrl + "/" + id).subscribe(
      data => {
        let notFound = true;

        this.dataStore.roles.forEach((item, index) => {
          if(item.id === data.id){
            this.dataStore.roles[index] = data;
            notFound = false;
          }
        });

        if(notFound){
          this.dataStore.roles.push(data);
        }

        this._roles.next(Object.assign({}, this.dataStore).roles);
      },
      error => console.log('Could not load role.!!')
    );
  }

  //Get All Roles....
  getAllRoles(): Observable<any>{
    return this.http.get<any>(this.baseUrl).pipe(map((data:any)=>{
      return this.mapDataToRoles(data.data);
    }))
  }

  getAllRoleById(id : number): Observable<any>{
    return this.http.get<any>(this.baseUrl + "/" + id).pipe(map((data:any)=>{
      return this.mapDataToRole(data.data);
    }))
  }

  mapDataToRoles(data:any){
    let roles:Role[]=[];
    data.forEach((element: any) => {
      let role:Role = new Role(element);
      roles.push(role);
    });
    return roles;
  }

  mapDataToRole(data: any): any {
    let role:Role = new Role(data);
    return role;
  }
}
