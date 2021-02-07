import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddRepositoryComponent } from '../components/add-repository/add-repository.component';
import { ProjectRepositoryListComponent } from '../components/project-repository-list/project-repository-list.component';
import { PullRequestListComponent } from '../components/pull-request-list/pull-request-list.component';
import { RepoEventsComponent } from '../components/repo-events/repo-events.component';
import { ViewProjectDetailComponent } from '../components/view-project-detail/view-project-detail.component';
import { ViewRepositoryComponent } from '../components/view-repository/view-repository.component';
import { BranchesComponent } from './components/branches/branches.component';
import { RepoIssuesComponent } from './components/repo-issues/repo-issues.component';
import { RepositoryListComponent } from './components/repository-list/repository-list.component';
import { ViewCollaboratorsComponent } from './components/view-collaborators/view-collaborators.component';
import { ViewRepositoryDetailComponent } from './components/view-repository-detail/view-repository-detail.component';

const routes: Routes = [
  { path: 'repositories', component: ProjectRepositoryListComponent },
  { path: 'repositories/all', component: RepositoryListComponent },
  { path: 'repositories/addrepository', component: AddRepositoryComponent },
  
  {
    path: 'repositories/:account/:repoName',
    component: ViewRepositoryComponent,
    children: [
      { path: 'pr', component: PullRequestListComponent },
      { path: 'events', component:RepoEventsComponent },
      { path: 'users', component:ViewCollaboratorsComponent },
      { path: 'branches', component:BranchesComponent },
      { path: 'issues', component:RepoIssuesComponent },
      { path: 'adduser', component: AddRepositoryComponent },
      { path: '', component: ViewRepositoryDetailComponent }],
  },

  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GithubRoutingModule {}
