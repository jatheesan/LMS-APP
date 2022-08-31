import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Deserializer } from 'ts-json-api-formatter';
import { Team } from '../models/team.model';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  baseUrl = 'http://localhost:14162/api/Team';
  constructor(private http : HttpClient) { }

  getAllTeams(): Observable<any>{
    return this.http.get<any>(this.baseUrl).pipe(map((data : any) =>{
      //return this.mapDataToTeams(data.data)
      let teamsObj=((new Deserializer()).deserialize(data));
      return teamsObj;
    }))
  }

  getTeamById(id: number): Observable<any>{
    return this.http.get<any>(this.baseUrl + '/' + id).pipe(map((data : any) =>{
      return this.mapDataToTeam(data.data)
    }))
  }

  public deleteTeam(id : number): Observable<any>{
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

  public createTeam(team: any): Observable<any>{
    team.data.id = "0";
    team.data.type = "team";
    return this.http.post(this.baseUrl, team);
  }

  public updateTeam(id: number, team: any): Observable<any>{
    team.data.id = id;
    team.data.type = "team";
    return this.http.put((this.baseUrl + '/'+ id), team);
  }

  mapDataToTeams(data: any) : Team[]{
    let teams: Team[] = [];
    data.forEach((element: any) => {
      let team:Team = new Team(element);
      teams.push(team);
    });
    return teams;
  }

  mapDataToTeam(data: any): Team{
    let team : Team = new Team(data)
    return team;
  }

}
