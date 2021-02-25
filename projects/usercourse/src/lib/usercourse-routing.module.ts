import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserCourseListComponent } from './components/user-course-list/user-course-list.component';
import { ViewUserCourseComponent } from './components/view-user-course/view-user-course.component';
import { CourseSettingsComponent } from './components/course-settings/course-settings.component';
import { UserCourseQuestionsComponent } from './components/user-course-questions/user-course-questions.component';
import { UserCourseTopicsComponent } from './components/user-course-topics/user-course-topics.component';
import { UserCourseContentListComponent } from './components/user-course-content-list/user-course-content-list.component';
import { AvailableCourseListComponent } from './components/available-course-list/available-course-list.component';
import { UserCourseDashboardComponent } from './components/user-course-dashboard/user-course-dashboard.component';
import { CourseCurriculumComponent } from './components/course-curriculum/course-curriculum.component';

import { UserCourseContentComponent } from './components/user-course-content/user-course-content.component';
import { CalendarComponent } from './calendar/calendar.component';
import { AuthGuard } from 'projects/auth/src/public-api';

const routes: Routes = [
  {
    path: ':learn/courses',
    component: UserCourseListComponent,
    data: { showSidebar: true, menus: 'courses' },
    canActivate: [AuthGuard],
  },
  {
    path: 'learn/:courseId/:courseName',
    component: ViewUserCourseComponent,
    children: [
      {
        path: '',
        component: CourseCurriculumComponent,
      },
      {
        path: 'topics',
        component: UserCourseTopicsComponent,
        data: { menus: 'viewcourse' },
        canActivate: [AuthGuard],
      },
    ],
  },
  {
    path: ':userId/calendar',
    component: CalendarComponent,
    data: { showSidebar: true, menus: 'courses' },
    canActivate: [AuthGuard],
  },
  {
    path: ':userId/coursedashboard',
    component: UserCourseDashboardComponent,
    data: { showSidebar: true, menus: 'courses', protected: false },
  },
  {
    path: ':userId/courses',
    component: UserCourseListComponent,
    data: { showSidebar: true, menus: 'courses' },
  },
  {
    path: ':userId/availablecourses',
    component: AvailableCourseListComponent,
    data: { showSidebar: true, menus: 'courses' },
    canActivate: [AuthGuard],
  },
  {
    path: ':userId/courses/:courseId/:courseName',
    component: ViewUserCourseComponent,
    children: [
      {
        path: '',
        component: CourseCurriculumComponent,
      },
      {
        path: 'topics',
        component: UserCourseTopicsComponent,
        data: { menus: 'viewcourse' },
      },
      {
        path: 'settings',
        component: CourseSettingsComponent,
        data: { menus: 'viewcourse' },
        canActivate: [AuthGuard],
      },
      {
        path: 'questions',
        component: UserCourseQuestionsComponent,
        data: { menus: 'viewcourse' },
        canActivate: [AuthGuard],
      },
      {
        path: 'sections/:sectionId/:sectionName',
        component: UserCourseContentListComponent,
        data: { menus: 'viewcourse' },
        canActivate: [AuthGuard],
      },
    ],
  },
  {
    path: ':userId/courses/:courseId/:courseName/contents',
    component: UserCourseContentComponent,
    data: { menus: 'viewcourse' },
    canActivate: [AuthGuard],
    children: [
      {
        path: ':sectionId/:sectionName',
        component: UserCourseContentListComponent,
        data: { menus: 'viewcourse' },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserCourseRoutingModule {}
