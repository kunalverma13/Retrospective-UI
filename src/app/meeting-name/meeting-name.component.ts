import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subscription } from 'rxjs';
import { Meeting, Points } from '../Models/meeting.model';
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
  listNames: string[] = ["Start doing", "Continue doing", "Stop doing"];
  saveMeetingNameSubscription: Subscription = new Subscription();

  constructor(private meetingService: MeetingService, 
    private route: ActivatedRoute, 
    private spinnerService: NgxSpinnerService) { }
  
  ngOnDestroy(): void {
    this.saveMeetingNameSubscription.unsubscribe();
  }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm) {
    if(form.valid) {
      this.spinnerService.show();
      this.isLoading = true;
      let pointsLists: Points[] = [];
      this.listNames.forEach((element, i) => {
        if(form.value['listName' + i].trim() !== "") {
          pointsLists.push(new Points(i + 1, form.value['listName' + i], []));
        }
      });
      this.saveMeetingNameSubscription = this.meetingService.saveMeetingName(new Meeting("", form.value.meetingName, [], pointsLists))
      .subscribe(
        (response: string) => {
          if(response === ""){
            this.isError = true
          } else {
            this.meetingId = response;
            this.isSaved = true;
          }
        }, 
        error => {
          this.isError = true;
        },
        () => {
          this.spinnerService.hide();
          this.isLoading = false;
        }
      );
    } else {
      this.markFormGroupTouched(form);
    }
  }

  addList() {
    this.listNames.push("");
  }

  shouldShowError(ln: HTMLInputElement) {
    return ln && 
    !ln.validity.valid;
  }

  private markFormGroupTouched(formGroup: NgForm) {
    (<any>Object).values(formGroup.controls).forEach((control: any) => {
      control.markAsTouched();

      if (control.controls) {
        this.markFormGroupTouched(control);
      }
    });
  }

}
