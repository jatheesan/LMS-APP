import { BaseResource } from 'ts-json-api-formatter';
export class Leave extends BaseResource{
    userId : number | undefined;
    startDate : string | undefined;
    endDate : string = null as any;
    timeOfLeaveday : string = '';
    reason : string = '';
    isAvailableResPersion : boolean = null as any;
    resPersionId : number = null as any;
    isAdminApproved : boolean = null as any;
    isSuperAdminApproved : boolean  = null as any;
    leaveRequestOfLeaveTypes: LeaveRequestOfLeaveType[] = [];
}

export class LeaveRequestOfLeaveType extends BaseResource{
    leaveReguestId: number = null as any;
    leaveTypeId: number = null as any;
    noOfDays: number = null as any;
}
