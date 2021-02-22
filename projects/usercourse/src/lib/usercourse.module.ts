import {
  NgModule,
  NO_ERRORS_SCHEMA,
  CUSTOM_ELEMENTS_SCHEMA,
  ModuleWithProviders,
} from '@angular/core';
import { FullCalendarModule } from '@fullcalendar/angular';
import { UsercourseComponent } from './usercourse.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { UserCourseRoutingModule } from './usercourse-routing.module';
import { UserCourseListComponent } from './components/user-course-list/user-course-list.component';
import { ViewUserCourseComponent } from './components/view-user-course/view-user-course.component';
import { CourseSettingsComponent } from './components/course-settings/course-settings.component';
import { UserCourseQuestionsComponent } from './components/user-course-questions/user-course-questions.component';
import { UserCourseTopicsComponent } from './components/user-course-topics/user-course-topics.component';
import { UserCourseService } from './usercourse.service';
import { Config, API_URL } from './config';
import { CourseClientService } from './course-client.service';
import {
  CardModule,
  SidenavModule,
  ThemeModule,
} from 'projects/theme/src/public-api';
import { UserCourseContentListComponent } from './components/user-course-content-list/user-course-content-list.component';

import { HighlightModule } from 'ngx-highlightjs';
import { AvailableCourseListComponent } from './components/available-course-list/available-course-list.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { UserCourseDashboardComponent } from './components/user-course-dashboard/user-course-dashboard.component';
import { CurriculumComponent } from './components/curriculum/curriculum.component';
import { CourseCurriculumComponent } from './components/course-curriculum/course-curriculum.component';
import { AuthGuard } from './guards/auth.guard';
import { UserCourseContentComponent } from './components/user-course-content/user-course-content.component';
import { CalendarComponent } from './calendar/calendar.component';
import { ContentModule } from 'projects/content/src/public-api';
import { MaterialModule } from 'projects/theme/src/lib/material.module';

//import { CalendarComponent } from './calendar/calendar.component'; // for FullCalendar!
//import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin
//import interactionPlugin from '@fullcalendar/interaction'; // a plugin
/*
FullCalendarModule.registerPlugins([ 
  dayGridPlugin,
  interactionPlugin
]);
*/
@NgModule({
  declarations: [
    UsercourseComponent,
    UserCourseListComponent,
    ViewUserCourseComponent,
    CourseSettingsComponent,
    UserCourseQuestionsComponent,
    UserCourseTopicsComponent,
    UserCourseContentListComponent,
    AvailableCourseListComponent,
    UserCourseDashboardComponent,
    CurriculumComponent,
    CourseCurriculumComponent,
    UserCourseContentComponent,
    CalendarComponent,
  ],
  imports: [
    FullCalendarModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    CardModule,
    SidenavModule,
    ThemeModule,
    UserCourseRoutingModule,
    MaterialModule,
    ContentModule,
  ],
  providers: [UserCourseService, AuthGuard],
  exports: [
    UsercourseComponent,
    UserCourseListComponent,
    ViewUserCourseComponent,
    CourseSettingsComponent,
    UserCourseQuestionsComponent,
    UserCourseContentListComponent,
    ThemeModule,
    UserCourseDashboardComponent,
  ],
})
export class UsercourseModule {
  static forRoot(config: Config): ModuleWithProviders<UsercourseModule> {
    return {
      ngModule: UsercourseModule,
      providers: [
        UserCourseService,
        CourseClientService,
        AuthGuard,
        { provide: API_URL, useValue: config.API_ENDPOINT }, // If I hard code `useValue: {API_ENDPOINT: 'FooBar'}`, instead of using `config` it works... weird.
      ],
    };
  }
}
