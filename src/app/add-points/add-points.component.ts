import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnDestroy, OnInit } from '@angular/core';
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
  isLoading: boolean = false;
  uploadPointsToDatabaseSubscription: Subscription = new Subscription();

  constructor(private meetingService: MeetingService) { }
  
  ngOnDestroy(): void {
    this.uploadPointsToDatabaseSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.pointLists = this.meetingService.pointListsNames;
  }

  submitPoints(): void {
    this.isError = false;
    this.isLoading = true;
    this.uploadPointsToDatabaseSubscription = this.meetingService.uploadPointsToDatabase()
    .subscribe(
      response => {
        this.isError = !response;
        if(!this.isError) {
          this.addPointsToUploadedList();
          this.meetingService.listOfpointLists = [];
        }
        this.isLoading = false;
    },
      error => {
        this.isError = true;
        this.isLoading = false;
    });
  }

  getUploadedPointsByListName(listName: string): Point[] {
    var response: Point[] = [];
    var listObject = this.uploadedPoints.find(x=>x.listName === listName);
    return listObject === undefined ? response : listObject.points;
  }

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
