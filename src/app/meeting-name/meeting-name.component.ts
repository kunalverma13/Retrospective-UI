import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subscription } from 'rxjs';
import { Meeting, Points } from '../Models/meeting.model';
import { MeetingService } from '../Services/meeting.service';
import {MatButtonModule} from '@angular/material/button';


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
  listNames: string[] = ["Start", "Stop", "Continue"];
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
    try {
      if(form.valid) {
        this.spinnerService.show();
        this.isLoading = true;
        let pointsLists: Points[] = [];
        
        Object.keys(form.controls).forEach((key, i) => {
          if(key.indexOf('listName') !== -1) {
            pointsLists.push(new Points(i, form.value[key], []));
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
    } catch (error) {
      this.isError = true;
      this.spinnerService.hide();
    }
  }

  addList() {
    if(this.listNames.length < 10) {
      this.listNames.push("");
    }
  }

  deleteList(index: number) {
    this.listNames.splice(index, 1);
  }

  shouldShowError(ln: HTMLInputElement) {
    return ln && 
    !ln.validity.valid;
  }

  setListNames(names: string[]) {
    this.listNames = names;
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
