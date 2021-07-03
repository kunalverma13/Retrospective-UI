import { EventEmitter } from '@angular/core';
import { Component, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subscription } from 'rxjs';
import { Meeting } from 'src/app/Models/meeting.model';
import { MeetingService } from 'src/app/Services/meeting.service';

@Component({
  selector: 'app-meeting-details',
  templateUrl: './meeting-details.component.html',
  styleUrls: ['./meeting-details.component.css']
})
export class MeetingDetailsComponent implements OnInit , OnDestroy {
  meetingData!: Meeting;
  isLoading: boolean = false;
  isDataLoaded: boolean = false;
  isError: boolean = false;
  routeSubscription: Subscription = new Subscription();
  
  @Input('meetingId') meetingId: string = "";
  @Output('hideMeetingDetails') hideMeetingDetails: EventEmitter<void> = new EventEmitter<void>();

  constructor(private spinnerService: NgxSpinnerService, private meetingService: MeetingService, private route: ActivatedRoute) { }
  
  ngOnDestroy(): void {
    this.routeSubscription.unsubscribe();
  }
  
  ngOnInit(): void {
    this.meetingService.meetingId = this.meetingId;
    this.getMeetingData();
    this.routeSubscription = this.route.params.subscribe(params=>{
      this.meetingService.meetingId = params["id"];
    });
  }

  getMeetingData(): void {
    this.isLoading = true;
    this.spinnerService.show();
    this.meetingService.getMeetingData(this.meetingService.meetingId)
    .subscribe(response=>{
      this.meetingData = response;
      this.isDataLoaded = true;
    },
    error=>{
      this.isError = true;
      this.isLoading = false;
      this.spinnerService.hide();
    }, 
    ()=>{
      this.isLoading = false;
      this.spinnerService.hide();
    });
  }

  sendEmail(): void {
    this.meetingService.sendEmail(this.meetingService.meetingId).subscribe();
  }

  toggleAllowAddPoints(shouldGetData: boolean): void {
    this.meetingService.toggleAllowAddPoints(this.meetingService.meetingId)
    .subscribe(response=> {
      if(shouldGetData) {
        this.getMeetingData()
      }
    });
  }

  backClicked(): void {
    this.hideMeetingDetails.emit();
  }

}
