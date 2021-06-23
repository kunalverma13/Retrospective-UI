import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MeetingService } from '../Services/meeting.service';

@Component({
  selector: 'app-add-points',
  templateUrl: './add-points.component.html',
  styleUrls: ['./add-points.component.css']
})
export class AddPointsComponent implements OnInit, OnDestroy {
  pointLists: string[] = [];
  isError: boolean = false;
  isLoading: boolean = false;
  uploadPointsToDatabaseSubscription: Subscription = new Subscription();

  constructor(private meetingService: MeetingService) { }
  
  ngOnDestroy(): void {
    this.uploadPointsToDatabaseSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.pointLists = this.meetingService.pointListsNames;
  }

  submitPoints(): void {
    this.isError = false;
    this.isLoading = true;
    this.uploadPointsToDatabaseSubscription = this.meetingService.uploadPointsToDatabase()
    .subscribe(
      response => {
        this.isError = !response;
        this.isLoading = false;
    },
      error => {
        this.isError = true;
        this.isLoading = false;
    });
  }

}
