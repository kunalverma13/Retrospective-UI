import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { MeetingNameComponent } from './meeting-name/meeting-name.component';
import { AppRoutingModule } from './app-routing.module';
import { ParticipantNameComponent } from './participant-name/participant-name.component';
import { AddPointsComponent } from './add-points/add-points.component';
import { PointEntryComponent } from './add-points/point-entry/point-entry.component';
import { CoordinatorViewComponent } from './coordinator-view/coordinator-view.component';
import { ParticipantListComponent } from './participant-list/participant-list.component';
import { PointListComponent } from './point-list/point-list.component';
import { NgbdModalComponent } from './ngbd-modal-component/ngbd-modal.component';
import { ActionItemComponent } from './action-item/action-item.component';
import { TimerComponent } from './timer/timer.component';
import { FormatTimePipe } from './timer/format-time.pipe';

@NgModule({
  declarations: [
    AppComponent,
    MeetingNameComponent,
    ParticipantNameComponent,
    AddPointsComponent,
    PointEntryComponent,
    CoordinatorViewComponent,
    ParticipantListComponent,
    PointListComponent,
    NgbdModalComponent,
    ActionItemComponent,
    TimerComponent,
    FormatTimePipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
