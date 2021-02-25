import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'projects/auth/src/public-api';
import { UserCourseListComponent } from 'projects/usercourse/src/lib/components/user-course-list/user-course-list.component';

import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MyInterviewsComponent } from './components/my-interviews/my-interviews.component';

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
