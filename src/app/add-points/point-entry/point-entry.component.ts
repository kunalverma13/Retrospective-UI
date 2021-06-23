import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Point } from 'src/app/Models/meeting.model';
import { MeetingService } from 'src/app/Services/meeting.service';

@Component({
  selector: 'app-point-entry',
  templateUrl: './point-entry.component.html',
  styleUrls: ['./point-entry.component.css']
})
export class PointEntryComponent implements OnInit {
  @Input("title") title: string = "";
  points: Point[] = [];
  isError = false;
  isLoading = false;

  constructor(private meetingService: MeetingService) { }

  ngOnInit(): void {
    this.points = this.meetingService.getPointsList(this.title);
  }

  onSubmit(form: NgForm): void {
    var point: Point = {
      id: 0,
      participantName: form.value.checkAnonymous ? "Anonymous" : this.meetingService.participantName, 
      pointText: form.value.txtPoint,
      actionItem: ""
    };
    this.meetingService.addPointToPointsList(point, this.title);
    this.points = this.meetingService.getPointsList(this.title);
    form.reset();
  }

}