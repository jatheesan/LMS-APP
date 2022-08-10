export class Role {
    id : number | undefined;
    roleType : string | undefined;

    constructor(data:any){
        this.id = data.id;
        this.roleType = data.attributes.roleType;
    }
}
