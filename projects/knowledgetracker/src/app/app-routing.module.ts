import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'auth';

import { UserCourseListComponent } from 'projects/usercourse/src/lib/components/user-course-list/user-course-list.component';

import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MyInterviewsComponent } from './components/my-interviews/my-interviews.component';
import { ProjectFeatureListComponent } from './components/project-feature-list/project-feature-list.component';
import { ProjectListComponent } from './components/project-list/project-list.component';
import { ViewProjectComponent } from './components/view-project/view-project.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
  },
  {
    path: ':userId/courses',
    component: UserCourseListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: ':userId/projects',
    component: ProjectListComponent,
  },
  {
    path: ':userId/projects/:id',
    component: ViewProjectComponent,
    children: [
      {
        path: 'features',
        component: ProjectFeatureListComponent,
      },
      {
        path: 'ratings',
        component: ProjectFeatureListComponent,
      },
      {
        path: '',
        component: ProjectFeatureListComponent,
      },
    ],
  },
  {
    path: ':userId/interviews',
    component: MyInterviewsComponent,
    canActivate: [AuthGuard],
  },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
