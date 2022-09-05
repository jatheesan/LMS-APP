import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Leavetype } from 'src/app/models/leavetype.model';
import { Team } from 'src/app/models/team.model';
import { User } from 'src/app/models/user.model';
import { LeavetypeService } from 'src/app/services/leavetype.service';
import { TeamService } from 'src/app/services/team.service';
import { UserService } from 'src/app/services/user.service';
import { AddEditStaffComponent } from 'src/app/shared/modals/staffs/add-edit-staff/add-edit-staff.component';
import { Serializer } from 'ts-json-api-formatter';

@Component({
  selector: 'lms-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  @Input() user !: any;
  @Input() authUserRole !: any;
  userprofile !: any;
  leavetypes!: Leavetype[];
  JsonSerialized='';

  constructor(private userServise: UserService,
              private teamService : TeamService,
              private leavetypeService : LeavetypeService,
              public dailog: MatDialog) { }

  teams!: Team[];
  ngOnInit(): void {
    this.userprofile = this.user;
    console.log(this.userprofile);
    console.log(this.authUserRole);
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

  editProfile(id :number){
    const dialogRef = this.dailog.open(AddEditStaffComponent, {
      width : '500px',
      panelClass: 'custom-modalbox',
      data : {
        staffId : id,
        authUserRole : this.authUserRole
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      let editresult : User = {
        id: id,
        firstname: result.firstName,
        lastname: result.lastName,
        username: result.username,
        email: result.email,
        passwordHash: null as any,
        staffPositionId: result.staffPositionId,
        roleId: result.roleId,
        fullname: null as any,
        team: null as any
      };
      this.JsonSerialized=((new Serializer()).serialize(editresult));
      console.log(this.JsonSerialized);
      this.userServise.updateUser(id, this.JsonSerialized).subscribe(result =>
        console.log(result)
      );
    })
  }

}
