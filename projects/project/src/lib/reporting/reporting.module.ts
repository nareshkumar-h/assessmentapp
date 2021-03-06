import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportingRoutingModule } from './reporting-routing.module';
import { ThemeModule, MaterialModule } from 'theme';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProjectModule, ProjectService } from '../../public-api';
import { API_URL, Config } from '../config';
import { UserRatingReportComponent } from './components/user-rating-report/user-rating-report.component';
import { ViewUserRatingReportComponent } from './components/view-user-rating-report/view-user-rating-report.component';
import { ReportingSidebarComponent } from './components/reporting-sidebar/reporting-sidebar.component';
import { AuthModule } from 'auth';
import { ReportingService } from 'projects/frontend/src/app/reporting.service';
import { ReportingComponent } from './components/reporting/reporting.component';
import { UserFeatureRatingReportComponent } from './components/user-feature-rating-report/user-feature-rating-report.component';
import { EditUserFeatureRatingReportComponent } from './components/edit-user-feature-rating-report/edit-user-feature-rating-report.component';
import { UserReportSidebarComponent } from './components/user-report-sidebar/user-report-sidebar.component';
import { UserReportingComponent } from './components/user-reporting/user-reporting.component';
import { BrowserModule } from '@angular/platform-browser';
import { ProjectReportFeedbackComponent } from '../components/project-report-feedback/project-report-feedback.component';
import { GithubReportComponent } from '../components/github-report/github-report.component';
import { UserGithubReportComponent } from '../components/user-github-report/user-github-report.component';

@NgModule({
  declarations: [
    UserRatingReportComponent,
    ViewUserRatingReportComponent,
    ReportingSidebarComponent,
    UserFeatureRatingReportComponent,
    EditUserFeatureRatingReportComponent,
    ReportingComponent,
    UserReportSidebarComponent,
    UserReportingComponent,
    ProjectReportFeedbackComponent,
    GithubReportComponent,
    UserGithubReportComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    MaterialModule,
    ThemeModule,
    AuthModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ReportingRoutingModule,
  ],
})
export class ReportingModule {
  static forRoot(config: Config): ModuleWithProviders<ReportingModule> {
    return {
      ngModule: ReportingModule,
      providers: [
        ReportingService,
        { provide: API_URL, useValue: config.API_ENDPOINT }, // If I hard code `useValue: {API_ENDPOINT: 'FooBar'}`, instead of using `config` it works... weird.
      ],
    };
  }
}
