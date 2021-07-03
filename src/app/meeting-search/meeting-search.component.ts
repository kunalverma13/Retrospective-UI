import { Component, OnInit } from '@angular/core';
import { MeetingService } from '../Services/meeting.service';

@Component({
  selector: 'app-meeting-search',
  templateUrl: './meeting-search.component.html',
  styleUrls: ['./meeting-search.component.css']
})
export class MeetingSearchComponent implements OnInit {

  selectedMeetingId: string = "";

  constructor() { }

  ngOnInit(): void {
  }

  meetingSelected(meetingId: string): void {
    this.selectedMeetingId = meetingId;
  }

  hideMeetingDetailsClicked(): void {
    this.selectedMeetingId = "";
  }

}
