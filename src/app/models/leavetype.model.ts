export class Leavetype {
    id : number;
    leaveTypeName : string;

    constructor(data:any){
        this.id = data.id;
        this.leaveTypeName = data.attributes.leaveTypeName;
    }
}
