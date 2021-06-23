import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Meeting } from '../Models/meeting.model';
import { MeetingService } from '../Services/meeting.service';

@Component({
  selector: 'app-meeting-name',
  templateUrl: './meeting-name.component.html',
  styleUrls: ['./meeting-name.component.css']
})
export class MeetingNameComponent implements OnInit, OnDestroy {

  isLoading: boolean = false;
  isSaved: boolean = false;
  isError: boolean = false;
  meetingId: string = "";
  saveMeetingNameSubscription: Subscription = new Subscription();

  constructor(private meetingService: MeetingService, private route: ActivatedRoute) { }
  
  ngOnDestroy(): void {
    this.saveMeetingNameSubscription.unsubscribe();
  }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm){
    if(form.valid){
      this.isLoading = true;
      this.saveMeetingNameSubscription = this.meetingService.saveMeetingName(new Meeting("", form.value.meetingName, []))
      .subscribe(
        (response: string) => {
        if(response === ""){
          this.isError = true
        } else {
          this.meetingId = response;
          this.isSaved = true;
        }
      }, 
      error=>{
        this.isError = true;
      },
      ()=>{
        this.isLoading = false;
      });
    }
  }

}
