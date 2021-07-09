import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap'
import { Subscription } from 'rxjs';
import { MeetingService } from '../Services/meeting.service';

@Component({
  selector: 'app-ngbd-modal',
  templateUrl: './ngbd-modal.component.html',
  styleUrls: ['./ngbd-modal.component.css']
})
export class NgbdModalComponent implements OnInit, OnDestroy {

  @Input("linkText") linkText : string = "click";
  modelRef!: NgbModalRef;
  actionItemSavedSubjectSubscription: Subscription = new Subscription();

  constructor(private modalService: NgbModal, private meetingService: MeetingService) { }

  ngOnDestroy(): void {
    this.actionItemSavedSubjectSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.actionItemSavedSubjectSubscription = this.meetingService.actionItemSavedSubject.subscribe(()=>{
      this.close();
    })
  }

  open(content: any) {
    this.modelRef = this.modalService.open(content);
  }

  close(): void {
    this.modelRef?.close();
  }

}
