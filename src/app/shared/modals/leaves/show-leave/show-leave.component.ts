import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Rowevent } from 'src/app/models/rowevent.model';
import { User } from 'src/app/models/user.model';
import { LeaveRequestService } from 'src/app/services/leave-request.service';

@Component({
  selector: 'lms-show-leave',
  templateUrl: './show-leave.component.html',
  styleUrls: ['./show-leave.component.scss']
})
export class ShowLeaveComponent implements OnInit {

  event !: Rowevent;
  responsiblePerson !: User;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data : any,
    public dialogRef : MatDialogRef<ShowLeaveComponent>,
    private leaveRequestService: LeaveRequestService
    ) { }

  ngOnInit(): void {
    this.event = this.data.leave;
  }

  deleteEvent(id: number | undefined) {
    let response : any;
    if(confirm("Are you sure to delete "+ id) && id != null) {
      this.leaveRequestService.deleteLeaveRequest(id).subscribe(result => {
        response = result;
      });
      this.dialogRef.close(response);
    }
  }

  onCancel(){
    this.dialogRef.close();
  }

}
