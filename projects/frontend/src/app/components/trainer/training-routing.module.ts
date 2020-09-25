import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TrainerCourseListComponent } from './trainer-course-list/trainer-course-list.component';

const routes: Routes = [
  { path: 'training/:userId', component: TrainerCourseListComponent , data: {showSidebar:true},
  children:[      
        { path: '',      component: TrainerCourseListComponent }
  ]}
        
        
      
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TrainingRoutingModule { }
