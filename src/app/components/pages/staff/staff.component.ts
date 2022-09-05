import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Team } from 'src/app/models/team.model';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { TeamService } from 'src/app/services/team.service';
import { UserService } from 'src/app/services/user.service';
import { AddEditStaffTeamComponent } from 'src/app/shared/modals/staff-team/add-edit-staff-team/add-edit-staff-team.component';
import { AddEditStaffComponent } from 'src/app/shared/modals/staffs/add-edit-staff/add-edit-staff.component';
import { Serializer } from 'ts-json-api-formatter';

@Component({
  selector: 'lms-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.scss']
})
export class StaffComponent implements OnInit {
  
  @Input() authUserRole !: any;
  staffs!: any;
  teams!: Team[];
  JsonSerialized='';

  constructor(private userServise: UserService,
              private authService: AuthService, 
              private teamService : TeamService,
              public dailog: MatDialog,) { }

  ngOnInit(): void {
    this.getAllUsers();
    this.getAllTeams();
  }

  getAllUsers(){
    this.userServise.getAllUsers()
      .subscribe(
        response => {
          this.staffs = response;
        }
      );
      
  }

  getAllTeams(){
    this.teamService.getAllTeams()
      .subscribe(
        response => {
          this.teams = response;
        }
      )
  }

  deletestaff(id : number){
    let response : any;
    if(confirm("Are you sure to delete "+ id) && id != null) {
      this.userServise.deleteUser(id).subscribe(result => {
        response = result;
      });
    }
  }

  editstaff(id : number){
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

  createStaff(){
    const dialogRef = this.dailog.open(AddEditStaffComponent, {
      width : '500px',
      panelClass: 'custom-modalbox',
      data : {
        staffId : null,
        authUserRole : this.authUserRole
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      let newstaff : User = {
        id: -1,
        firstname: result.firstName,
        lastname: result.lastName,
        username: result.username,
        email: result.email,
        passwordHash: "b6CoqLH6CwxXVKQizVxwU3mSwtacqUfzgB1G2/7MOnw=",
        staffPositionId: result.staffPositionId,
        roleId: result.roleId,
        fullname: null as any,
        team: null as any
      };
      this.JsonSerialized=((new Serializer()).serialize(newstaff));
      // this.userServise.createUser(this.JsonSerialized).subscribe(result =>
      //   console.log(result)
      // );
      this.authService.userRegister(this.JsonSerialized).subscribe(result =>
        console.log(result)
      );

    })
  }

  updateTeam(id : number, staff : any){
    const dialogRef = this.dailog.open(AddEditStaffTeamComponent, {
      width : '500px',
      panelClass: 'custom-modalbox',
      data : {
        staffId : id,
        teams : this.teams,
        staff : staff
      }
    });
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

}
