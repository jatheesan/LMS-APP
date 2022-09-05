import { Component, Input, OnInit } from '@angular/core';
import { Leavetype } from 'src/app/models/leavetype.model';
import { Team } from 'src/app/models/team.model';
import { LeavetypeService } from 'src/app/services/leavetype.service';
import { TeamService } from 'src/app/services/team.service';

@Component({
  selector: 'lms-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  @Input() user !: any 
  userprofile !: any;
  leavetypes!: Leavetype[];
  constructor(private teamService : TeamService, private leavetypeService : LeavetypeService) { }

  teams!: Team[];
  ngOnInit(): void {
    this.userprofile = this.user;
    console.log(this.userprofile);
    this.getAllTeams();
    this.getAllLeaveType();
    
  }

  getAllTeams(){
    this.teamService.getAllTeams()
      .subscribe(
        response => {
          this.teams = response;
        }
      )
  }

  getAllLeaveType(){
    this.leavetypeService.getAllLeaveTypes().subscribe(response => {
      this.leavetypes = response;
    })
  }

  getTeamNames(teams : any[]) :any{
    let teamNameArr : string[] = [];
    if(teams.length == 0){
      teamNameArr = [];
    }
    else{
      let teamId = teams[0].teamId;
      teams.forEach(x => {
        let name = this.teams.find(y => y.id == x.teamId)?.teamName;
        if(name != undefined){
          teamNameArr.push(name);
        }
      })
    }
    return teamNameArr;
  }

  getLeaveName(id : number) : any{
    return this.leavetypes.find(x => (x.id == id))?.leaveTypeName;
  }

}
