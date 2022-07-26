export class LeaveRequest {
    id : number | undefined;
    userId : number | undefined;
    startDate : Date | undefined;
    endDate : Date = null as any;
    timeOfLeaveday : string = '';
    reason : string = '';
    isAvailableResPersion : boolean = null as any;
    resPersionId : number = null as any;
    isAdminApproved : boolean = null as any;
    isSuperAdminApproved : boolean  = null as any;
    bgcolor : string  = null as any;

    constructor(data: any, colors : string[]){
        this.id = data.id;
        this.userId = data.attributes.userId;
        this.startDate = data.attributes.startDate;
        this.endDate = data.attributes.endDate;
        this.timeOfLeaveday = data.attributes.timeOfLeaveday;
        this.reason = data.attributes.reason;
        this.isAvailableResPersion = data.attributes.is_AvailableRespersion;
        this.resPersionId = data.attributes.resPersionId;
        this.isAdminApproved = data.attributes.is_AdminApproved;
        this.isSuperAdminApproved = data.attributes.is_SuperAdminApproved;
        this.bgcolor = colors[Math.floor(Math.random() * colors.length)];
    }
}
