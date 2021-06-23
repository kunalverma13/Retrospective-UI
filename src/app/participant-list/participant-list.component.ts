import { Component, Input, OnInit } from '@angular/core';
import { Participant } from '../Models/meeting.model';

@Component({
  selector: 'app-participant-list',
  templateUrl: './participant-list.component.html',
  styleUrls: ['./participant-list.component.css']
})
export class ParticipantListComponent implements OnInit {
  @Input("participantList") participantList: Participant[] = []

  constructor() { }

  ngOnInit(): void {
  }

}
