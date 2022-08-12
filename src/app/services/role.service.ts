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

  public deleteRole(id : number): Observable<any>{
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

  public createRole(role: any): Observable<any>{
    role.data.id = "0";
    role.data.type = "role";
    return this.http.post(this.baseUrl, role);
  }

  public updateRole(id: number | undefined, role: any): Observable<any>{
    role.data.id = id;
    role.data.type = "role";
    return this.http.put((this.baseUrl + '/'+ id), role);
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
