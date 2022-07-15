import { LeaveRequest } from "./leaverequest.model";

export class Rowevent {
    rowEvent : LeaveRequest | undefined;
    rowEventStartDate : any | undefined;
    rowEventEndDate : any | undefined;
    rowEventWidth : number;

    constructor(rowEvent : LeaveRequest, rowEventStartDate : any, rowEventEndDate : any, rowEventWidth : number){
        this.rowEvent = rowEvent;
        this.rowEventStartDate = rowEventStartDate;
        this.rowEventEndDate = rowEventEndDate;
        this.rowEventWidth = rowEventWidth;
    }
}
