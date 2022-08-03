export class User {
    id : number | undefined;
    firstname : string | undefined;
    lastname : string | undefined;
    username : string | undefined;
    email : string | undefined;
    passwordHash : string | undefined;
    staffPositionId : number | undefined;
    roleId : number | undefined;
    fullname : string | undefined;

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

    }
}
