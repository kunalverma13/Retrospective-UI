import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap'

@Component({
  selector: 'app-ngbd-modal',
  templateUrl: './ngbd-modal.component.html',
  styleUrls: ['./ngbd-modal.component.css']
})
export class NgbdModalComponent implements OnInit {

  @Input("linkText") linkText : string = "click";

  modelRef!: NgbModalRef;;

  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
  }

  open(content: any) {
    this.modelRef = this.modalService.open(content);
  }

  close(): void {
    this.modelRef.close();
  }

}
