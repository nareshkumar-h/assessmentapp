import { NgModule, ModuleWithProviders, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ProjectComponent } from './project.component';
import { ProjectListComponent } from './components/project-list/project-list.component';
import { ViewProjectComponent } from './components/view-project/view-project.component';
import { MyProjectListComponent } from './components/my-project-list/my-project-list.component';
import { AddProjectComponent } from './components/add-project/add-project.component';
import { ProjectFeatureListComponent } from './components/project-feature-list/project-feature-list.component';
import { ProjectPlanComponent } from './components/project-plan/project-plan.component';
import { ProjectTasksComponent } from './components/project-tasks/project-tasks.component';
import { ProjectActivitiesComponent } from './components/project-activities/project-activities.component';
import { ProjectActivityListComponent } from './components/project-activity-list/project-activity-list.component';
import { ViewProjectFeatureComponent } from './components/view-project-feature/view-project-feature.component';
import { AddProjectFeatureComponent } from './components/add-project-feature/add-project-feature.component';
import { ProjectSidebarComponent } from './components/project-sidebar/project-sidebar.component';
import { ProjectReviewsComponent } from './components/project-reviews/project-reviews.component';
import { ProjectSprintsComponent } from './components/project-sprints/project-sprints.component';
import { ProjectRepositoryListComponent } from './components/project-repository-list/project-repository-list.component';
import { RatingIconComponent } from './components/rating-icon/rating-icon.component';
import { TravisBadgeComponent } from './components/travis-badge/travis-badge.component';
import { RepoEventsComponent } from './components/repo-events/repo-events.component';
import { EventTypeBadgeComponent } from './components/event-type-badge/event-type-badge.component';
import { ViewFilesCommittedComponent } from './components/view-files-committed/view-files-committed.component';
import { AddRepositoryComponent } from './components/add-repository/add-repository.component';
import { ProjectDashboardComponent } from './components/project-dashboard/project-dashboard.component';
import { ProjectRoutingModule } from './project-routing.module';
import { CommonModule } from '@angular/common';
import {  HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { SidenavModule, ThemeModule } from 'projects/theme/src/public-api';
import { ViewProjectDetailComponent } from './components/view-project-detail/view-project-detail.component';
import { Config, API_URL } from './config';
import { ProjectService } from './project.service';
import { GithubService } from './github.service';
import { AddProjectActivityComponent } from './components/add-project-activity/add-project-activity.component';
import { AddProjectSprintComponent } from './components/add-project-sprint/add-project-sprint.component';
import { ViewProjectActivityComponent } from './components/view-project-activity/view-project-activity.component';
import { FeatureTasksComponent } from './feature-tasks/feature-tasks.component';
import { AddFeatureTaskComponent } from './add-feature-task/add-feature-task.component';
import { MaterialModule } from 'projects/theme/src/lib/material.module';
import { EditFeatureTaskComponent } from './components/edit-feature-task/edit-feature-task.component';
import { ViewProjectReviewRatingComponent } from './components/view-project-review-rating/view-project-review-rating.component';
import { ReviewFeatureComponent } from './components/review-feature/review-feature.component';
import { ViewProjectRatingComponent } from './components/view-project-rating/view-project-rating.component';
import { StarRatingComponent } from './components/star-rating/star-rating.component';
import { ViewUserStoryComponent } from './components/view-user-story/view-user-story.component';
import { ReviewRatingFormComponent } from './components/review-rating-form/review-rating-form.component';
import { UserRatingReportComponent } from './components/user-rating-report/user-rating-report.component';
import { UserFeatureRatingReportComponent } from './components/user-feature-rating-report/user-feature-rating-report.component';
import { ViewUserRatingReportComponent } from './components/view-user-rating-report/view-user-rating-report.component';
import { ProjectSkillsComponent } from './components/project-skills/project-skills.component';
import { EditUserFeatureRatingReportComponent } from './components/edit-user-feature-rating-report/edit-user-feature-rating-report.component';



@NgModule({
  declarations: [ProjectComponent, ProjectDashboardComponent,
    ProjectListComponent, 
    ViewProjectComponent, 
    MyProjectListComponent, 
    AddProjectComponent, ProjectFeatureListComponent, 
    ProjectPlanComponent, ProjectTasksComponent,
     ProjectActivitiesComponent, ProjectActivityListComponent, 
     ViewProjectFeatureComponent, AddProjectFeatureComponent,
      ProjectSidebarComponent, ProjectReviewsComponent, ProjectSprintsComponent, ProjectRepositoryListComponent,
    RatingIconComponent,TravisBadgeComponent, 
    RepoEventsComponent, EventTypeBadgeComponent,ViewFilesCommittedComponent,
     AddRepositoryComponent,  ViewProjectDetailComponent, AddProjectActivityComponent, AddProjectSprintComponent, ViewProjectActivityComponent, FeatureTasksComponent, AddFeatureTaskComponent, EditFeatureTaskComponent, ViewProjectReviewRatingComponent, ReviewFeatureComponent, StarRatingComponent, ViewUserStoryComponent, ReviewRatingFormComponent, ViewProjectRatingComponent, UserRatingReportComponent, UserFeatureRatingReportComponent, ViewUserRatingReportComponent, ProjectSkillsComponent, EditUserFeatureRatingReportComponent
  ],
  imports: [
    CommonModule,HttpClientModule,FormsModule, ProjectRoutingModule, ThemeModule,
    SidenavModule, MaterialModule
  ],
  entryComponents: [AddProjectFeatureComponent,AddProjectActivityComponent,AddProjectSprintComponent, AddFeatureTaskComponent,EditFeatureTaskComponent],
  exports: [ProjectComponent,ProjectDashboardComponent,
    ProjectListComponent, ViewProjectComponent, MyProjectListComponent, 
    AddProjectComponent, ProjectFeatureListComponent, ProjectPlanComponent, ProjectTasksComponent, 
    ProjectActivitiesComponent, ProjectActivityListComponent, ViewProjectFeatureComponent, AddProjectFeatureComponent, ProjectSidebarComponent, ProjectReviewsComponent, ProjectSprintsComponent, ProjectRepositoryListComponent,
    RatingIconComponent,TravisBadgeComponent, RepoEventsComponent, EventTypeBadgeComponent,
    ViewFilesCommittedComponent, AddRepositoryComponent,ViewProjectRatingComponent,UserRatingReportComponent,EditUserFeatureRatingReportComponent
  ],
  schemas: [NO_ERRORS_SCHEMA,CUSTOM_ELEMENTS_SCHEMA]
})
export class ProjectModule {
  static forRoot(config: Config): ModuleWithProviders<ProjectModule> {    
    return {
      ngModule: ProjectModule,
      providers: [ ProjectService,GithubService,
        {provide: API_URL, useValue: config.API_ENDPOINT} // If I hard code `useValue: {API_ENDPOINT: 'FooBar'}`, instead of using `config` it works... weird.
      ],
    };
  }
 }