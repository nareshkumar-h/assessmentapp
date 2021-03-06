import {
  CUSTOM_ELEMENTS_SCHEMA,
  NgModule,
  NO_ERRORS_SCHEMA,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyInterviewsComponent } from 'projects/knowledgetracker/src/app/components/my-interviews/my-interviews.component';
import { InterviewsComponent } from './interviews/interviews.component';
import { InterviewListComponent } from './interview-list/interview-list.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'theme'; //'projects/theme/src/lib/material.module';
import { CardModule, SidenavModule, ThemeModule } from 'theme'; //'projects/theme/src/public-api';

import { UpdateInterviewResultComponent } from './update-interview-result/update-interview-result.component';
import { InterviewDetailComponent } from './interview-detail/interview-detail.component';
import { MatDialogModule } from '@angular/material/dialog';
import { InterviewRoutingModule } from './interview-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { InterviewService } from '../interview.service';

@NgModule({
  declarations: [
    InterviewsComponent,
    MyInterviewsComponent,
    InterviewDetailComponent,
    InterviewListComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    CardModule,
    SidenavModule,
    ThemeModule,
    MaterialModule,
    MatDialogModule,

    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    InterviewRoutingModule,
  ],
  entryComponents: [],
  providers: [InterviewService],
  schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
  exports: [
    InterviewsComponent,
    MyInterviewsComponent,
    InterviewDetailComponent,
    InterviewListComponent,
  ],
})
export class InterviewModule {}
