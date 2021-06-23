import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MeetingService } from '../Services/meeting.service';

@Component({
  selector: 'app-participant-name',
  templateUrl: './participant-name.component.html',
  styleUrls: ['./participant-name.component.css']
})
export class ParticipantNameComponent implements OnInit {

  isLoading: boolean = false;
  isSaved: boolean = false;
  isError: boolean = false;
  meetingId: string = "";
  participantId: string = "";

  constructor(private meetingService: MeetingService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.meetingService.meetingId = this.route.snapshot.params["id"];
    this.route.params.subscribe(params=>{
      this.meetingService.meetingId = this.route.snapshot.params["id"];
    });
  }

  onSubmit(form: NgForm){
    if(form.valid){
      this.isLoading = true;
      this.meetingService.addParticipantToMeeting(form.value.participantName, form.value.participantEmail)
      .subscribe(
        (response: string) => {
        if(response === ""){
          this.isError = true
        } else {
          this.participantId = response;
          this.isSaved = true;
          this.router.navigate(["addPoints"]);
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
