import { Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { Point } from '../Models/meeting.model';
import { MeetingService } from '../Services/meeting.service';

@Component({
  selector: 'app-action-item',
  templateUrl: './action-item.component.html',
  styleUrls: ['./action-item.component.css']
})
export class ActionItemComponent implements OnInit, OnDestroy {
  
  @Input('point') point!: Point;
  @Input('listId') listId: number = 0;

  @ViewChild('txtActionItem') txtActionItem!: ElementRef;

  saveActionItemSubscription: Subscription = new Subscription();

  constructor(private meetingService: MeetingService) { }
  
  ngOnDestroy(): void {
    this.saveActionItemSubscription.unsubscribe();
  }

  ngOnInit(): void {
    //this.txtActionItem.nativeElement.value = this.point.actionItem;
  }

  saveActionItem(): void {
    this.saveActionItemSubscription = this.meetingService.saveActionItem(this.listId, this.point.id, this.txtActionItem.nativeElement.value)
    .subscribe(response=>{
      this.point.actionItem = this.txtActionItem.nativeElement.value;
    });
  }

}