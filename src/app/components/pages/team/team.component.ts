import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { map } from 'rxjs';
import { Team } from 'src/app/models/team.model';
import { TeamService } from 'src/app/services/team.service';
import { AddEditTeamComponent } from 'src/app/shared/modals/team/add-edit-team/add-edit-team.component';
import { Serializer } from 'ts-json-api-formatter';

@Component({
  selector: 'lms-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent implements OnInit {

  teams!: Team[];
  team!: Team;
  JsonSerialized!: any;
  constructor(private teamService : TeamService, public dailog: MatDialog) { }

  ngOnInit(): void {
    this.getAllTeam()
  }

  getAllTeam(){
    this.teamService.getAllTeams().subscribe(response => {
      this.teams = response;
    })
  }

  // getTeamById(id : number){
  //   let team :Team
  //   this.teamService.getTeamById(id).subscribe(response => {
  //     team = response;
  //     console.log(team);     
  //     return team;
  //   })

  // }

  createTeam(){
    const dialogRef = this.dailog.open(AddEditTeamComponent, {
      width : '500px',
      panelClass: 'custom-modalbox',
      data : {
        teamId : null
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      let newTeam : Team = {
        id: -1,
        teamName : result.teamName,
        primaryTeamId : result.primaryTeamId,
        description: result.description
      };
      this.JsonSerialized=((new Serializer()).serialize(newTeam));
      console.log(this.JsonSerialized);
      this.teamService.createTeam(this.JsonSerialized).subscribe((result: any) =>
        console.log(result)
      );
    })
  }

  deleteTeam(id : number){
    let response : any;
    if(confirm("Are you sure to delete "+ id) && id != null) {
      this.teamService.deleteTeam(id).subscribe(result => {
        response = result;
      });
    }
  }

  editTeam(id : number){
    const dialogRef = this.dailog.open(AddEditTeamComponent, {
      width : '500px',
      panelClass: 'custom-modalbox',
      data : {
        teamId : id
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      let newTeam : Team = {
        id: -1,
        teamName : result.teamName,
        primaryTeamId : result.primaryTeamId,
        description: result.description
      };
      this.JsonSerialized=((new Serializer()).serialize(newTeam));
      console.log(this.JsonSerialized);
      this.teamService.updateTeam(id, this.JsonSerialized).subscribe(result =>
        console.log(result)
      );
    })
  }

}
