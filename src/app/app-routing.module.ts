import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MeetingNameComponent } from './meeting-name/meeting-name.component';
import { ParticipantNameComponent } from './participant-name/participant-name.component';
import { AddPointsComponent } from './add-points/add-points.component';
import { CoordinatorViewComponent } from './coordinator-view/coordinator-view.component';
import { NgbdModalComponent } from './ngbd-modal-component/ngbd-modal.component';
import { MeetingSearchComponent } from './meeting-search/meeting-search.component';

const routes: Routes = [
  {path: "", redirectTo: "meetingName", pathMatch: "full"},
  {path: "meetingName", component: MeetingNameComponent},
  {path: "participantName/:id", component: ParticipantNameComponent},
  {path: "coordinator/:id", component: CoordinatorViewComponent},
  {path: "addPoints", component: AddPointsComponent},
  {path: "modal", component: NgbdModalComponent},
  {path: "meetingSearch", component: MeetingSearchComponent},
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
