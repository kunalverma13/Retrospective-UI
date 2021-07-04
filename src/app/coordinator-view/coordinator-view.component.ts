import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
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
  additionalRecepients: string[] = [];

  routeSubscription: Subscription = new Subscription();

  constructor(private spinnerService: NgxSpinnerService, private meetingService: MeetingService, private route: ActivatedRoute) { }
  
  ngOnDestroy(): void {
    this.routeSubscription.unsubscribe();
  }
  
  ngOnInit(): void {
    this.meetingService.meetingId = this.route.snapshot.params["id"];
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
      this.meetingService.sendEmail(this.meetingService.meetingId, recepientList).subscribe();
    }
  }

  toggleAllowAddPoints(shouldGetData: boolean): void {
    this.meetingService.toggleAllowAddPoints(this.meetingService.meetingId)
    .subscribe(response=> {
      if(shouldGetData) {
        this.getMeetingData()
      }
    });
  }

  shouldShowError(pe: HTMLInputElement) {
    return pe && 
    !pe.validity.valid;
  }

}
