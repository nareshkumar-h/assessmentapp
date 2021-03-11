import {
  CUSTOM_ELEMENTS_SCHEMA,
  ModuleWithProviders,
  NgModule,
  NO_ERRORS_SCHEMA,
} from '@angular/core';
import { CommonModule } from '@angular/common';

import { GithubRoutingModule } from './github-routing.module';
import { ProjectModule } from '../project.module';
import { ProjectRepositoryListComponent } from '../components/project-repository-list/project-repository-list.component';
import { GithubService } from 'projects/course/src/lib/github.service';
import { API_URL, Config } from '../config';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddRepositoryComponent } from '../components/add-repository/add-repository.component';
import { BrowserModule } from '@angular/platform-browser';
import { ViewRepositoryComponent } from '../components/view-repository/view-repository.component';
import { PullRequestListComponent } from '../components/pull-request-list/pull-request-list.component';

import { ThemeModule, MaterialModule } from '@nareshkumarh/kt-theme';
import { RepositorySidebarComponent } from './components/repository-sidebar/repository-sidebar.component';
import { ViewRepositorySidebarComponent } from './components/view-repository-sidebar/view-repository-sidebar.component';
import { ViewRepositoryDetailComponent } from './components/view-repository-detail/view-repository-detail.component';
import { ViewCollaboratorsComponent } from './components/view-collaborators/view-collaborators.component';
import { BranchesComponent } from './components/branches/branches.component';
import { RepoIssuesComponent } from './components/repo-issues/repo-issues.component';
import { RepositoryListComponent } from './components/repository-list/repository-list.component';

@NgModule({
  declarations: [
    ProjectRepositoryListComponent,
    PullRequestListComponent,
    ViewRepositoryComponent,
    RepositorySidebarComponent,
    ViewRepositorySidebarComponent,
    ViewRepositoryDetailComponent,
    ViewCollaboratorsComponent,
    BranchesComponent,
    RepoIssuesComponent,
    RepositoryListComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    ThemeModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    GithubRoutingModule,
    ProjectModule,
  ],
  exports: [ProjectRepositoryListComponent],
  schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
})
export class GithubModule {
  static forRoot(config: Config): ModuleWithProviders<GithubModule> {
    return {
      ngModule: GithubModule,
      providers: [
        GithubService,
        { provide: API_URL, useValue: config.API_ENDPOINT }, // If I hard code `useValue: {API_ENDPOINT: 'FooBar'}`, instead of using `config` it works... weird.
      ],
    };
  }
}
