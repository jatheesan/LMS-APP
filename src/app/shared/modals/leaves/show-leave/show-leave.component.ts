import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Rowevent } from 'src/app/models/rowevent.model';

@Component({
  selector: 'lms-show-leave',
  templateUrl: './show-leave.component.html',
  styleUrls: ['./show-leave.component.scss']
})
export class ShowLeaveComponent implements OnInit {

  event !: Rowevent;
  constructor(@Inject(MAT_DIALOG_DATA) public data : Rowevent) { }

  ngOnInit(): void {
    this.event = this.data;
  }

}
