import { BrowserModule } from '@angular/platform-browser';
import {
  CUSTOM_ELEMENTS_SCHEMA,
  NgModule,
  NO_ERRORS_SCHEMA,
} from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ThemeModule, NavbarModule } from 'projects/theme/src/public-api';
import { DeviceDetectorModule } from 'ngx-device-detector';
import { environment } from '../environments/environment';
import { AuthGuard, AuthModule } from 'projects/auth/src/public-api';
import { CourseModule } from 'projects/course/src/public-api';

import { MaterialModule } from 'projects/theme/src/lib/material.module';

import { HighlightModule, HIGHLIGHT_OPTIONS } from 'ngx-highlightjs';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from 'projects/auth/src/lib/jwt.interceptor';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AssessmentModule } from './assessment/assessment.module';
import { InterviewModule } from './interview/interview.module';
import { MyInterviewsComponent } from 'projects/knowledgetracker/src/app/components/my-interviews/my-interviews.component';
import { InterviewListComponent } from './interview/interview-list/interview-list.component';
import { InterviewsComponent } from './interview/interviews/interviews.component';
import { InterviewService } from './interview.service';
import { InterviewDetailComponent } from './interview/interview-detail/interview-detail.component';
import { UpdateInterviewResultComponent } from './interview/update-interview-result/update-interview-result.component';
import { MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [AppComponent, DashboardComponent],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AuthModule.forRoot({
      API_ENDPOINT: environment.ENV,
      USER_TYPE: 'T',
      ORG_ID: environment.ORG_ID,
      REDIRECT_URI: environment.REDIRECT_URI,
    }),

    //CourseModule.forRoot({ API_ENDPOINT: environment.API_URL }),
    ThemeModule,
    MatDialogModule,
    MaterialModule,
    NavbarModule,
    AppRoutingModule,
    InterviewModule,
  ],
  entryComponents: [MatDialogModule],
  providers: [AuthGuard],
  schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent],
})
export class AppModule {}