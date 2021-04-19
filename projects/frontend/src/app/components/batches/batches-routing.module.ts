import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListBatchesComponent } from './list-batches/list-batches.component';
import { ViewBatchComponent } from './view-batch/view-batch.component';
import { EditBatchComponent } from './edit-batch/edit-batch.component';
import { BatchUsersComponent } from './batch-users/batch-users.component';
import { BatchCourseComponent } from './batch-course/batch-course.component';
import { BatchCoursePlanComponent } from './batch-course-plan/batch-course-plan.component';
import { AssignBatchCourseComponent } from './assign-batch-course/assign-batch-course.component';
import { AddBatchComponent } from './add-batch/add-batch.component';
import { BatchCourseListComponent } from './batch-course-list/batch-course-list.component';
//import { AddSlackComponent } from '../slack/add-slack/add-slack.component';
//import { ViewSlackComponent } from '../slack/view-slack/view-slack.component';
import { AddBatchUserComponent } from './add-batch-user/add-batch-user.component';
import { BatchActivityComponent } from './batch-activity/batch-activity.component';
import { EditBatchCourseComponent } from './edit-batch-course/edit-batch-course.component';
import { BatchProjectListComponent } from './batch-project-list/batch-project-list.component';
import { ViewBatchDetailComponent } from './view-batch-detail/view-batch-detail.component';
import { AddSlackComponent } from '../slack/add-slack/add-slack.component';
import { ViewSlackComponent } from '../slack/view-slack/view-slack.component';
import { BatchCourseTopicsComponent } from './batch-course-topics/batch-course-topics.component';
import { BatchCourseOverviewComponent } from './batch-course-overview/batch-course-overview.component';
import { BatchCourseContentComponent } from './batch-course-content/batch-course-content.component';
import { TrainerDashboardComponent } from '../trainer-dashboard/trainer-dashboard.component';
import { TrainerCourseListComponent } from '../trainer/trainer-course-list/trainer-course-list.component';
import { BatchCourseQuestionComponent } from './batch-course-question/batch-course-question.component';

const routes: Routes = [
  {
    path: 'batches',
    component: ListBatchesComponent,
    data: { showSidebar: true },
  },
  { path: 'batches/addbatch', component: AddBatchComponent },
  {
    path: 'batches/:id/courses/:courseId',
    component: BatchCourseComponent,
    children: [
      { path: '', component: BatchCourseOverviewComponent },
      { path: 'overview', component: BatchCourseOverviewComponent },
      { path: 'topics', component: BatchCourseTopicsComponent },
      { path: 'plan', component: BatchCoursePlanComponent },
      { path: 'edit', component: EditBatchCourseComponent },
      { path: 'content', component: BatchCourseContentComponent },
      { path: 'questions', component: BatchCourseQuestionComponent },
    ],
  },
  {
    path: 'batches/:id',
    component: ViewBatchComponent,
    children: [
      { path: 'edit', component: EditBatchComponent },
      { path: 'users', component: BatchUsersComponent },
      { path: 'courses', component: BatchCourseListComponent },
      { path: 'assigncourse', component: AssignBatchCourseComponent },

      { path: 'addslack', component: AddSlackComponent },
      { path: 'slack', component: ViewSlackComponent },

      { path: 'addbatchuser', component: AddBatchUserComponent },
      { path: 'activity', component: BatchActivityComponent },
      { path: 'projects', component: BatchProjectListComponent },
      { path: '', component: ViewBatchDetailComponent },
    ],
  },
  {
    path: 'training/:userId',
    component: TrainerCourseListComponent,
    data: { showSidebar: true },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BatchesRoutingModule {}
