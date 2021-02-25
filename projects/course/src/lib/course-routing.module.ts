import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CourseListComponent } from './components/course-list/course-list.component';
import { ViewCourseComponent } from './components/view-course/view-course.component';
import { EditCourseComponent } from './components/edit-course/edit-course.component';
import { AddCourseModuleComponent } from './components/add-course-module/add-course-module.component';
import { AddCourseTopicComponent } from './components/add-course-topic/add-course-topic.component';
import { CoursePlanComponent } from './components/course-plan/course-plan.component';
import { CourseQuestionsComponent } from './components/course-questions/course-questions.component';
import { AddCourseQuestionComponent } from './components/add-course-question/add-course-question.component';
import { CourseContentListComponent } from './components/course-content-list/course-content-list.component';
import { AddCourseContentComponent } from './components/add-course-content/add-course-content.component';
import { ViewCourseTopicsComponent } from './components/view-course-topics/view-course-topics.component';
import { CategoryListComponent } from './components/category-list/category-list.component';
import { CourseAccessListComponent } from './components/course-access-list/course-access-list.component';
import { CourseOverviewComponent } from './components/course-overview/course-overview.component';
import { ViewCourseCurriculumComponent } from './components/view-course-curriculum/view-course-curriculum.component';
import { AddSectionComponent } from './components/add-section/add-section.component';
import { AddLectureComponent } from './components/add-lecture/add-lecture.component';
import { AddCourseComponent } from './components/add-course/add-course.component';

const routes: Routes = [
  {
    path: 'categories',
    component: CategoryListComponent,
    data: { showSidebar: true, menus: 'courses' },
    canActivate: [AuthGuard],
  },
  {
    path: 'courses',
    component: CourseListComponent,
    data: { showSidebar: true, menus: 'courses' },
    canActivate: [AuthGuard],
  },
  {
    path: 'addcourse',
    component: AddCourseComponent,
    data: { showSidebar: true, menus: 'courses' },
    canActivate: [AuthGuard],
  },
  {
    path: 'courses/:id',
    component: ViewCourseComponent,
    data: { menus: 'viewcourse' },
    canActivate: [AuthGuard],
    children: [
      {
        path: 'edit',
        component: EditCourseComponent,
        data: { menus: 'viewcourse' },
        canActivate: [AuthGuard],
      },
      {
        path: 'plan',
        component: CoursePlanComponent,
        data: { menus: 'viewcourse' },
        canActivate: [AuthGuard],
      },
      {
        path: 'access',
        component: CourseAccessListComponent,
        data: { menus: 'viewcourse' },
        canActivate: [AuthGuard],
      },
      {
        path: 'addmodule',
        component: AddCourseModuleComponent,
        data: { menus: 'viewcourse' },
        canActivate: [AuthGuard],
      },
      {
        path: 'addsection',
        component: AddSectionComponent,
        data: { menus: 'viewcourse' },
        canActivate: [AuthGuard],
      },
      {
        path: 'contents',
        component: CourseContentListComponent,
        data: { menus: 'viewcourse' },
        canActivate: [AuthGuard],
      },
      {
        path: 'contents/preview',
        component: CourseContentListComponent,
        data: { menus: 'viewcourse' },
        canActivate: [AuthGuard],
      },

      {
        path: 'questions',
        component: CourseQuestionsComponent,
        data: { menus: 'viewcourse' },
        canActivate: [AuthGuard],
      },
      {
        path: 'questions/addquestion',
        component: AddCourseQuestionComponent,
        data: { menus: 'viewcourse' },
        canActivate: [AuthGuard],
      },
      {
        path: 'sections/:sectionId/addlecture',
        component: AddLectureComponent,
        data: { menus: 'viewcourse' },
        canActivate: [AuthGuard],
      },
      {
        path: 'lectures/:lectureId/:lectureName',
        component: CourseContentListComponent,
        data: { menus: 'viewcourse' },
        canActivate: [AuthGuard],
      },
      {
        path: 'lectures/:lectureId/:lectureName/addcontent',
        component: AddCourseContentComponent,
        data: { menus: 'viewcourse' },
        canActivate: [AuthGuard],
      },
      {
        path: 'modules/:moduleId/:moduleName/addtopic',
        component: AddCourseTopicComponent,
        data: { menus: 'viewcourse' },
        canActivate: [AuthGuard],
      },
      {
        path: 'topics',
        component: ViewCourseTopicsComponent,
        data: { menus: 'viewcourse' },
        canActivate: [AuthGuard],
      },
      {
        path: 'curriculum',
        component: ViewCourseCurriculumComponent,
        data: { menus: 'viewcourse' },
        canActivate: [AuthGuard],
      },

      {
        path: '',
        component: CourseOverviewComponent,
        data: { menus: 'viewcourse' },
        canActivate: [AuthGuard],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CourseRoutingModule {}
