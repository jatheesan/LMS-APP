import { LeaveRequest } from "./leaverequest.model";
import { User } from "./user.model";

export class Rowevent {
    rowEvent : LeaveRequest | undefined;
    rowEventStartDate : any | undefined;
    rowEventEndDate : any | undefined;
    rowEventWidth : number;
    rowEventUser : User | undefined;
    rowEventResponsiblePerson : User | undefined;

    constructor(rowEvent : LeaveRequest, rowEventStartDate : any, rowEventEndDate : any, rowEventWidth : number, rowEventUser : User, rowEventResponsiblePerson : User){
        this.rowEvent = rowEvent;
        this.rowEventStartDate = rowEventStartDate;
        this.rowEventEndDate = rowEventEndDate;
        this.rowEventWidth = rowEventWidth;
        this.rowEventUser = rowEventUser;
        this.rowEventResponsiblePerson = rowEventResponsiblePerson;
    }
}
