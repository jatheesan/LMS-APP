import { Team } from "./team.model";

export class User {
    id : number | undefined;
    firstname : string | undefined;
    lastname : string | undefined;
    username : string | undefined;
    email : string | undefined;
    passwordHash : string = null as any;
    staffPositionId : number | undefined;
    roleId : number | undefined;
    fullname : string | undefined;
    team : number[]

    constructor(data:any){
        this.id = data.id;
        this.firstname = data.attributes.firstName;
        this.lastname = data.attributes.lastName;
        this.username = data.attributes.username;
        this.email = data.attributes.email;
        this.passwordHash = data.attributes.passwordHash;
        this.staffPositionId = data.attributes.staffPositionId;
        this.roleId = data.attributes.roleId;
        this.fullname = data.attributes.fullName;

        let userteam = data.relationships.staff_Teams.data
        let teamids : number[] = [];
        userteam.forEach((x : any)=> {
            teamids.push(x.id)
        })
        this.team = teamids;

    }
}
