import { NgModule, NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BatchCourseComponent } from './batch-course/batch-course.component';
import { BatchCourseDashboardComponent } from './batch-course-dashboard/batch-course-dashboard.component';
import { ListBatchesComponent } from './list-batches/list-batches.component';
import { ViewBatchComponent } from './view-batch/view-batch.component';
import { BatchCourseListComponent } from './batch-course-list/batch-course-list.component';
import { AddBatchComponent } from './add-batch/add-batch.component';
import { EditBatchComponent } from './edit-batch/edit-batch.component';
import { BatchUsersComponent } from './batch-users/batch-users.component';
import { AssignBatchCourseComponent } from './assign-batch-course/assign-batch-course.component';
import { BatchCoursePlanComponent } from './batch-course-plan/batch-course-plan.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BatchesRoutingModule } from './batches-routing.module';
import { BatchSidebarComponent } from './batch-sidebar/batch-sidebar.component';
import { AddBatchUserComponent } from './add-batch-user/add-batch-user.component';
import { BatchActivityComponent } from './batch-activity/batch-activity.component';
import { EditBatchCourseComponent } from './edit-batch-course/edit-batch-course.component';
import { BatchProjectListComponent } from './batch-project-list/batch-project-list.component';
import { ViewBatchDetailComponent } from './view-batch-detail/view-batch-detail.component';
import { SidenavModule, ThemeModule, CardModule } from 'projects/theme/src/public-api';
import { SlackListComponent } from '../slack/slack-list/slack-list.component';
import { ViewSlackComponent } from '../slack/view-slack/view-slack.component';
import { AddSlackComponent } from '../slack/add-slack/add-slack.component';
import { BatchCourseTopicsComponent } from './batch-course-topics/batch-course-topics.component';
import { BatchCourseOverviewComponent } from './batch-course-overview/batch-course-overview.component';
import { BatchCourseContentComponent } from './batch-course-content/batch-course-content.component';
import { HighlightModule } from 'ngx-highlightjs';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { ClipboardModule } from 'ngx-clipboard';
import { CourseModule } from 'projects/course/src/public-api';
import { environment } from 'projects/frontend/src/environments/environment';
import { MaterialModule } from '../../material.module';
import { SecurityModule } from 'projects/security/src/public-api';
import { BrowserModule } from '@angular/platform-browser';


@NgModule({
  declarations: [

    BatchCourseComponent,
    BatchCourseDashboardComponent,
    ListBatchesComponent,
    ViewBatchComponent,
    BatchCourseListComponent,
    AddBatchComponent,
    EditBatchComponent,
    BatchUsersComponent,
    AssignBatchCourseComponent,
    BatchCoursePlanComponent,
    BatchSidebarComponent,
    AddBatchUserComponent,
    BatchActivityComponent,
    EditBatchCourseComponent,
    BatchProjectListComponent,
    ViewBatchDetailComponent,
    SlackListComponent,
    ViewSlackComponent,
    AddSlackComponent,
    BatchCourseTopicsComponent,
    BatchCourseOverviewComponent,
    BatchCourseContentComponent    
  ],
  imports: [
    BrowserModule,CommonModule, FormsModule, HttpClientModule, BatchesRoutingModule, ThemeModule,CardModule,SidenavModule,MaterialModule,
    HighlightModule,PdfViewerModule,ClipboardModule,SecurityModule.forRoot(),
    CourseModule.forRoot({API_ENDPOINT:environment.API_URL}),
  ],
  entryComponents: [AddBatchComponent,AssignBatchCourseComponent,EditBatchComponent,AddBatchUserComponent,AssignBatchCourseComponent,EditBatchCourseComponent],
  schemas: [ NO_ERRORS_SCHEMA ]
})
export class BatchesModule { }
