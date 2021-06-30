import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subscription } from 'rxjs';
import { Point, Points } from '../Models/meeting.model';
import { MeetingService } from '../Services/meeting.service';

@Component({
  selector: 'app-add-points',
  templateUrl: './add-points.component.html',
  styleUrls: ['./add-points.component.css']
})
export class AddPointsComponent implements OnInit, OnDestroy {
  pointLists: string[] = [];
  uploadedPoints: Points[] = []
  isError: boolean = false;
  errorMessage: string = "There was an error, please try again";
  isLoading: boolean = false;
  uploadPointsToDatabaseSubscription: Subscription = new Subscription();

  constructor(private meetingService: MeetingService, private spinnerService: NgxSpinnerService) { }
  
  ngOnDestroy(): void {
    this.uploadPointsToDatabaseSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.meetingService.getMeetingData(this.meetingService.meetingId).subscribe(
      response => {
        this.pointLists = response.pointsLists?.map(p => p.listName) ?? this.meetingService.pointListsNames;  
      },
      error => {
        this.pointLists = this.meetingService.pointListsNames;
      }
    )
  }

  submitPoints(): void {
    this.isError = false;
    this.isLoading = true;
    this.spinnerService.show();
    this.uploadPointsToDatabaseSubscription = this.meetingService.uploadPointsToDatabase()
    .subscribe(
      response => {
        this.isError = !response.saved;
        if(!this.isError) {
          this.addPointsToUploadedList();
          this.meetingService.listOfpointLists = [];
        } else {
          this.errorMessage = response.error;
        }
        this.isLoading = false;
    },
      error => {
        this.isError = true;
        this.isLoading = false;
    },
      () => {
        this.spinnerService.hide();
    });
  }

  getUploadedPointsByListName(listName: string): Point[] {
    var response: Point[] = [];
    var listObject = this.uploadedPoints.find(x => x.listName === listName);
    return listObject === undefined ? response : listObject.points;
  }

  shouldDisablePost = () => this.meetingService.listOfpointLists.length <= 0;

  private addPointsToUploadedList() {
    if(this.uploadedPoints.length == 0) {
      this.uploadedPoints = this.meetingService.listOfpointLists
    } else {
      this.meetingService.listOfpointLists.forEach(element => {
        if(this.uploadedPoints.findIndex(pl=>pl.listName === element.listName) !== -1) {
          var newPL = this.uploadedPoints.find(pl=>pl.listName == element.listName)?.points.concat(element.points);
          this.uploadedPoints[this.uploadedPoints.findIndex(pl=>pl.listName === element.listName)].points = newPL ?? [];
        } else {
          this.uploadedPoints.push(element);
        }
      });
    }
  }

}
