import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Meeting } from '../Models/meeting.model';
import { MeetingService } from '../Services/meeting.service';

@Component({
  selector: 'app-coordinator-view',
  templateUrl: './coordinator-view.component.html',
  styleUrls: ['./coordinator-view.component.css']
})
export class CoordinatorViewComponent implements OnInit, OnDestroy {
  meetingData!: Meeting;
  isLoading: boolean = false;
  isDataLoaded: boolean = false;
  isError: boolean = false;
  meetingId: string = "";
  routeSubscription: Subscription = new Subscription();

  constructor(private meetingService: MeetingService, private route: ActivatedRoute, private router: Router) { }
  
  ngOnDestroy(): void {
    this.routeSubscription.unsubscribe();
  }
  
  ngOnInit(): void {
    this.meetingService.meetingId = this.route.snapshot.params["id"];
    this.routeSubscription = this.route.params.subscribe(params=>{
      this.meetingService.meetingId = params["id"];
    });
  }

  getMeetingData(): void {
    this.isLoading = true;
    this.meetingService.getMeetingData(this.meetingService.meetingId)
    .subscribe(response=>{
      this.meetingData = response;
      this.isDataLoaded = true;
    },
    error=>{
      this.isError = true;
      this.isLoading = false;
    }, 
    ()=>{
      this.isLoading = false;
    });
  }

  sendEmail(): void {
    this.meetingService.sendEmail(this.meetingService.meetingId).subscribe();
  }

}