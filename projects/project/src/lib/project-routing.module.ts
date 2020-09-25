import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MyProjectListComponent } from './components/my-project-list/my-project-list.component';
import { ProjectListComponent } from './components/project-list/project-list.component';
import { ProjectFeatureListComponent } from './components/project-feature-list/project-feature-list.component';
import { AddProjectFeatureComponent } from './components/add-project-feature/add-project-feature.component';
import { ViewProjectFeatureComponent } from './components/view-project-feature/view-project-feature.component';
import { ProjectActivityListComponent } from './components/project-activity-list/project-activity-list.component';
import { ProjectTasksComponent } from './components/project-tasks/project-tasks.component';
import { ViewProjectComponent } from './components/view-project/view-project.component';
import { ProjectReviewsComponent } from './components/project-reviews/project-reviews.component';
import { ProjectSprintsComponent } from './components/project-sprints/project-sprints.component';
import { ProjectRepositoryListComponent } from './components/project-repository-list/project-repository-list.component';
import { AddRepositoryComponent } from './components/add-repository/add-repository.component';
import { RepoEventsComponent } from './components/repo-events/repo-events.component';
import { ViewProjectDetailComponent } from './components/view-project-detail/view-project-detail.component';
import { AddProjectComponent } from './components/add-project/add-project.component';
import { ViewProjectActivityComponent } from './components/view-project-activity/view-project-activity.component';

const routes: Routes = [
  { path: ':userId/myprojects',      component: MyProjectListComponent },
  { path: ':userId/projects',      component: MyProjectListComponent },
  { path: 'projects',      component: ProjectListComponent },
  { path: ':userId/addproject',      component: AddProjectComponent },
  { path: ':userId/projects/:projectId/view',      component: ViewProjectComponent },
  { path: ':userId/projects/:projectId',      component: ViewProjectComponent,
    children: [
      { path: 'features',      component: ProjectFeatureListComponent },
      { path: 'addfeature/:moduleId',      component: AddProjectFeatureComponent },
      { path: 'features/:featureId',      component: ViewProjectFeatureComponent }, 
      { path: 'plan',      component: ProjectActivityListComponent },   
      { path: 'tasks',      component: ProjectTasksComponent },
      { path: 'reviews',      component: ProjectReviewsComponent },
      { path: 'sprints',      component: ProjectSprintsComponent },
      { path: 'repositories',      component: ProjectRepositoryListComponent },
      { path: 'repoevents/:account/:repoName',      component: RepoEventsComponent },
      { path: '', component: ViewProjectDetailComponent },
      
  ]
  },
  { path: 'projects/:projectId',      component: ViewProjectComponent,
  children: [
    { path: 'view',      component: ViewProjectDetailComponent },
    { path: 'features',      component: ProjectFeatureListComponent },
    // { path: 'addfeature/:moduleId',      component: AddProjectFeatureComponent },
    { path: 'features/:featureId',      component: ViewProjectFeatureComponent },
    { path: 'plan',      component: ProjectActivityListComponent },   
    { path: 'plan/:activityId',      component: ViewProjectActivityComponent },   
    { path: 'tasks',      component: ProjectTasksComponent },
    { path: 'sprints',      component: ProjectSprintsComponent },
    { path: 'repositories',      component: ProjectRepositoryListComponent },
    { path: 'addrepository',      component: AddRepositoryComponent },
    { path: '', component: ViewProjectDetailComponent },
  ]},
  // { path: 'projects', component: ProjectListComponent , data: {showSidebar:false}},    
  //     { path: ':userId/projects/:projectId/features',      component: ProjectFeatureListComponent },
  //     { path: ':userId/projects/:projectId/addfeature/:moduleId',      component: AddProjectFeatureComponent },
     
  //     { path: ':userId/projects/:projectId/plan/:userId',      component: ProjectActivityListComponent },
  //     { path: ':userId/projects/:projectId/tasks/:userId',      component: ProjectTasksComponent },
      
  //     { path: ':userId/projects/:projectId/reviews',      component: ProjectReviewsComponent },
  //     { path: ':userId/projects/:projectId/sprints',      component: ProjectSprintsComponent },
  //     { path: ':userId/projects/:projectId/repositories',      component: ProjectRepositoryListComponent },
  //     { path: ':userId/projects/:projectId/addrepository',      component: AddRepositoryComponent },
  //     { path: ':userId/projects/:projectId/repoevents/:account/:repoName',      component: RepoEventsComponent },
    
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectRoutingModule { }
