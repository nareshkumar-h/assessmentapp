import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MyProjectListComponent } from '../components/my-project-list/my-project-list.component';
import { ProjectFeatureListComponent } from '../components/project-feature-list/project-feature-list.component';
import { ProjectReportFeedbackComponent } from '../components/project-report-feedback/project-report-feedback.component';
import { ProjectSkillsComponent } from '../components/project-skills/project-skills.component';
import { ViewProjectDetailComponent } from '../components/view-project-detail/view-project-detail.component';
import { ReportingComponent } from './components/reporting/reporting.component';
import { UserRatingReportComponent } from './components/user-rating-report/user-rating-report.component';
import { UserReportingComponent } from './components/user-reporting/user-reporting.component';
import { ViewUserRatingReportComponent } from './components/view-user-rating-report/view-user-rating-report.component';

const routes: Routes = [
  {
    path: 'reports',
    component: ReportingComponent,
    children: [
      { path: 'projects', component: UserRatingReportComponent },      
      {
        path: ':userId',
        component: UserReportingComponent,
        children: [
          { path: 'mprojects', component: MyProjectListComponent },
          { path: 'projects', component: ViewUserRatingReportComponent },
          { path: 'features', component: ProjectFeatureListComponent },
          { path: 'ratings', component: ViewUserRatingReportComponent },
          { path: 'technologies', component: ProjectSkillsComponent },
          { path: 'feedback', component: ProjectReportFeedbackComponent },
          {
            path: 'projectfeatures/:userId',
            component: ViewUserRatingReportComponent,
          },
        ],
      },
      { path: '', redirectTo: 'projects', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReportingRoutingModule {}
