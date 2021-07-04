import { EventEmitter } from '@angular/core';
import { Component, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
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
  additionalRecepients: string[] = [];

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

  sendEmail(form: NgForm): void {
    if(form.valid) {
      var recepientList: string[] = [];
      if(form.value.checkAllParticipants) {
        recepientList = this.meetingData.participants.map(p => p.participantEmail);
      }
      this.additionalRecepients.forEach((recepient, i) => {
        if(form.value['txtAdditionalRecepients' + i] !== "") {
          recepientList.push(form.value['txtAdditionalRecepients' + i]);
        }
      });
      this.meetingService.sendEmail(this.meetingId, recepientList).subscribe();
    }
  }

  backClicked(): void {
    this.hideMeetingDetails.emit();
  }

  shouldShowError(pe: HTMLInputElement) {
    return pe && 
    !pe.validity.valid;
  }

}
