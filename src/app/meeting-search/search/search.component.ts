import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subscription } from 'rxjs';
import { MeetingService } from 'src/app/Services/meeting.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit, OnDestroy {

  term: string = "";
  startDate!: Date;
  endDate!: Date;
  meetings: {meetingId: string, meetingName: string, meetingDate: Date}[] = [];
  filterData: {meetingId: string, meetingName: string, meetingDate: Date}[] = [];
  shouldShowError: boolean = false;
  getMeetingsSubscription: Subscription = new Subscription();

  @Output('meetingSelected') meetingSelected: EventEmitter<string> = new EventEmitter<string>();

  constructor(private spinnerService: NgxSpinnerService, private meetingService: MeetingService) { }

  ngOnDestroy(): void {
    this.getMeetingsSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.spinnerService.show();
    this.shouldShowError = false;
    this.getMeetingsSubscription = this.meetingService.getMeetings().subscribe(
      response => {
        this.meetings = response;
        this.filterData = this.meetings.slice();
        this.spinnerService.hide();
      }, error => {
        this.shouldShowError = true;
        this.spinnerService.hide();
      }
    )
  }

  dateSelected(): void {
    this.filterData = this.meetings.slice();
    if(this.startDate) {
      this.filterData = this.filterData.filter(x => this.withoutTime(x.meetingDate) >= this.withoutTime(this.startDate));
    }
    if(this.endDate) {
      this.filterData = this.filterData.filter(x => this.withoutTime(x.meetingDate) <= this.withoutTime(this.endDate));
    }
  }

  meetingNameClicked(meetingId: string): void {
    this.meetingSelected.emit(meetingId)
  }

  private withoutTime(dateTime: Date) {
    var date = new Date(dateTime);
    date.setHours(0, 0, 0, 0);
    return date;
  }

}
