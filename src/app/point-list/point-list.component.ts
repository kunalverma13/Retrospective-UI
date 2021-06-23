import { Component, Input, OnInit } from '@angular/core';
import { Points } from '../Models/meeting.model';

@Component({
  selector: 'app-point-list',
  templateUrl: './point-list.component.html',
  styleUrls: ['./point-list.component.css']
})
export class PointListComponent implements OnInit {
  @Input("pointsList") pointsList!: Points;

  constructor() { }

  ngOnInit(): void {
  }

}
