import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { InterviewDetailComponent } from './interview/interview-detail/interview-detail.component';
import { InterviewsComponent } from './interview/interviews/interviews.component';
import { MyInterviewsComponent } from './interview/my-interviews/my-interviews.component';
import { InterviewListComponent } from './interview/interview-list/interview-list.component';
import { AuthGuard } from 'auth';

const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'userinterviews/:userId',
    component: MyInterviewsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'interviews',
    component: InterviewsComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: ':id',
        component: InterviewDetailComponent,
      },
      { path: '', component: InterviewListComponent },
    ],
  },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
