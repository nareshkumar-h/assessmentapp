import {
  NgModule,
  NO_ERRORS_SCHEMA,
  CUSTOM_ELEMENTS_SCHEMA,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { SidenavModule, ThemeModule, CardModule } from '@nareshkumarh/kt-theme';
import { TrainerCourseListComponent } from './trainer-course-list/trainer-course-list.component';
import { TrainingRoutingModule } from './training-routing.module';
import { AddBatchComponent } from '../batches/add-batch/add-batch.component';
import { AssignBatchCourseComponent } from '../batches/assign-batch-course/assign-batch-course.component';
import { EditBatchComponent } from '../batches/edit-batch/edit-batch.component';
import { AddBatchUserComponent } from '../batches/add-batch-user/add-batch-user.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    ThemeModule,
    CardModule,
    SidenavModule,
    TrainingRoutingModule,
  ],

  schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
})
export class TrainingModule {}
