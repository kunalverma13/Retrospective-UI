import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { Point } from '../Models/meeting.model';
import { MeetingService } from '../Services/meeting.service';

@Component({
  selector: 'app-action-item',
  templateUrl: './action-item.component.html',
  styleUrls: ['./action-item.component.css']
})
export class ActionItemComponent implements OnInit, OnDestroy {
  
  @Input('readOnly') readOnly: boolean = false;
  @Input('point') point!: Point;
  @Input('listId') listId: number = 0;
  @Output('close') close: EventEmitter<void> = new EventEmitter(); 

  @ViewChild('txtActionItem') txtActionItem!: ElementRef;

  saveActionItemSubscription: Subscription = new Subscription();

  constructor(private meetingService: MeetingService) { }
  
  ngOnDestroy(): void {
    this.saveActionItemSubscription.unsubscribe();
  }

  ngOnInit(): void {
  }

  saveActionItem(): void {
    this.saveActionItemSubscription = this.meetingService.saveActionItem(this.listId, this.point.id, this.txtActionItem.nativeElement.value)
    .subscribe(response=>{
      this.point.actionItem = this.txtActionItem.nativeElement.value;
      this.close.emit();
    });
  }

}
