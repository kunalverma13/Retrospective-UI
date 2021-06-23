import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'
import { MeetingNameComponent } from '../meeting-name/meeting-name.component';

@Component({
  selector: 'app-ngbd-modal',
  templateUrl: './ngbd-modal.component.html',
  styleUrls: ['./ngbd-modal.component.css']
})
export class NgbdModalComponent implements OnInit {

  @Input("linkText") linkText : string = "click";

  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
  }

  open(content: any) {
    this.modalService.open(content);
  }

}
