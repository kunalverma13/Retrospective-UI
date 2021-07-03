import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgxSpinnerModule } from 'ngx-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatToolbarModule } from '@angular/material/toolbar'; 
import { MatListModule } from '@angular/material/list'; 
import { MatSidenavModule } from '@angular/material/sidenav'; 
import { MatButtonModule } from '@angular/material/button'; 
import { MatRadioModule } from '@angular/material/radio'; 

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
import { MeetingSearchComponent } from './meeting-search/meeting-search.component';
import { MeetingDetailsComponent } from './meeting-search/meeting-details/meeting-details.component';
import { SearchComponent } from './meeting-search/search/search.component';
import { MenuComponent } from './menu/menu.component';

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
    FormatTimePipe,
    MeetingSearchComponent,
    MeetingDetailsComponent,
    SearchComponent,
    MenuComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    NgbModule,
    NgxSpinnerModule,
    Ng2SearchPipeModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatListModule,
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    FlexLayoutModule,
    MatRadioModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
