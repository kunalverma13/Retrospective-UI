import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { Meeting, Point, Points } from '../Models/meeting.model';
import { Observable, of, Subject } from 'rxjs';
import { httpErrorHandlerService } from './http-error-handler.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MeetingService {
  apiURL = environment.apiURL;

  participantName: string = "";
  participantId: number = 0;
  listOfpointLists: Points[] = [];
  meetingId: string = "";
  pointListsNames: string[] = ["Start doing", "Continue doing", "Stop doing"];
  actionItemSavedSubject: Subject<void> = new Subject();

  constructor(private http: HttpClient, private httpErrorHandler: httpErrorHandlerService) { }

  saveMeetingName(meeting: Meeting): Observable<string> {
    return this.http.post(`${this.apiURL}api/Meeting/SaveMeeting`, {meetingName: meeting.meetingName}).pipe(
      catchError(this.httpErrorHandler.handleError),
      map((resposne)=>{
        return String(resposne);
      })
    );
  }

  addParticipantToMeeting(participantName: string, participantEmail: string): Observable<string> {
    return this.http.post(`${this.apiURL}api/Meeting/SaveParticipant`, {MeetingId: this.meetingId, participantName: participantName, participantEmail: participantEmail}).pipe(
      catchError(this.httpErrorHandler.handleError),
      map((resposne)=>{
        this.participantName = participantName;
        this.participantId = +resposne;
        return String(resposne);
      })
    );
  }

  addPointToPointsList(point: Point, listName: string) {
    var listObject = this.listOfpointLists.find(x=>x.listName === listName);
    if(listObject === undefined) {
      this.listOfpointLists.push(
        {id: 0, listName: listName, points: [{id: 0, participantName: point.participantName, participantId: point.participantId, pointText: point.pointText, actionItem: ""}]})
    } else {
      listObject.points.push({id: 0, participantName: point.participantName, participantId: point.participantId, pointText: point.pointText, actionItem: ""});
    }
  }

  getPointsList(listName: string): Point[] {
    var response: Point[] = [];
    var listObject = this.listOfpointLists.find(x=>x.listName === listName);
    return listObject === undefined ? response : listObject.points;
  }

  uploadPointsToDatabase(): Observable<boolean> {
    if(this.listOfpointLists.length > 0){
      return this.http.post(
        `${this.apiURL}api/Meeting/SavePointsLists`, 
        {"meetingId": this.meetingId, "listOfPointLists":  this.listOfpointLists})
        .pipe(
          catchError(this.httpErrorHandler.handleError),
          map((resposne)=>{
          return (resposne == true);
        })
      );
    } else {
      return of(false);
    }
  }

  getMeetingData(meetingId: string): Observable<Meeting> {
    return this.http.get(`${this.apiURL}api/Meeting/GetMeetingData?Id=${meetingId}`).pipe(
      catchError(this.httpErrorHandler.handleError),
      map((resposne: any)=>{
        return resposne;
      })
    );
  }

  saveActionItem(listId: number, pointId: number, actionItem: string): Observable<string> {
    return this.http.post(`${this.apiURL}api/Meeting/SaveActionItem`, {meetingId: this.meetingId, listId: listId, pointId: pointId, actionItem: actionItem}).pipe(
      catchError(this.httpErrorHandler.handleError),
      map((resposne)=>{
        this.actionItemSavedSubject.next();
        return String(resposne);
      })
    );
  }

  sendEmail(meetingId: string): Observable<Meeting> {
    return this.http.get(`${this.apiURL}api/Email?Id=${meetingId}`).pipe(
      catchError(this.httpErrorHandler.handleError),
      map((resposne: any)=>{
        return resposne;
      })
    );
  }
}
