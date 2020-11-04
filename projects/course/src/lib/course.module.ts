import { NgModule, ModuleWithProviders, NO_ERRORS_SCHEMA } from '@angular/core';
import { CourseComponent } from './course.component';
import { CourseListComponent } from './components/course-list/course-list.component';
import { AddCourseComponent } from './components/add-course/add-course.component';
import { ViewCourseComponent } from './components/view-course/view-course.component';
import { CourseTopicsComponent } from './components/course-topics/course-topics.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CourseRoutingModule } from './course-routing.module';
import { ThemeModule, CardModule, SidenavModule, NavbarModule } from 'projects/theme/src/public-api';
import { MatDialogModule } from '@angular/material/dialog';
import { EditCourseComponent } from './components/edit-course/edit-course.component';
import { AddCourseModuleComponent } from './components/add-course-module/add-course-module.component';
import { AddCourseTopicComponent } from './components/add-course-topic/add-course-topic.component';
import { CoursePlanComponent } from './components/course-plan/course-plan.component';
import { CourseQuestionsComponent } from './components/course-questions/course-questions.component';
import { AddCourseQuestionComponent } from './components/add-course-question/add-course-question.component';
import { CourseContentListComponent } from './components/course-content-list/course-content-list.component';
import { AddCourseContentComponent } from './components/add-course-content/add-course-content.component';
import { Config, COURSE_CONFIG } from './config';
import { CourseService } from './course.service';
import { ViewCourseTopicsComponent } from './components/view-course-topics/view-course-topics.component';
import { CategoryListComponent } from './components/category-list/category-list.component';
import { AddCategoryComponent } from './components/add-category/add-category.component';
import { EditCategoryComponent } from './components/edit-category/edit-category.component';
import { CourseAccessListComponent } from './components/course-access-list/course-access-list.component';
import { CourseOverviewComponent } from './components/course-overview/course-overview.component';
import { EditCourseContentComponent } from './components/edit-course-content/edit-course-content.component';
import { TextFieldModule } from '@angular/cdk/text-field';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { AuthGuard } from './guards/auth.guard';
import { ViewCourseCurriculumComponent } from './components/view-course-curriculum/view-course-curriculum.component';
import { AddSectionComponent } from './components/add-section/add-section.component';
import { AddLectureComponent } from './components/add-lecture/add-lecture.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { SecurityModule } from 'projects/security/src/public-api';
import { ContentModule } from 'projects/content/src/public-api';
import { MaterialModule } from 'projects/theme/src/lib/material.module';
// import { KTThemeModule } from 'src/app/kttheme.module';
//import { ContentModule } from 'projects/content/src/public-api';


@NgModule({
  declarations: [CourseComponent, AddCourseComponent, ViewCourseComponent, CourseTopicsComponent, CourseListComponent,
    EditCourseComponent, AddCourseModuleComponent, AddCourseTopicComponent, CoursePlanComponent,
    CourseQuestionsComponent, AddCourseQuestionComponent, CourseContentListComponent,
    AddCourseContentComponent,
    ViewCourseTopicsComponent,
    CategoryListComponent,
    AddCategoryComponent,
    EditCategoryComponent,
    CourseAccessListComponent,
    CourseOverviewComponent,
    EditCourseContentComponent,
    ViewCourseCurriculumComponent,
    AddSectionComponent,
    AddLectureComponent,AddCourseComponent],
  imports: [
    ThemeModule,  SecurityModule.forRoot({ SECURE_KEY: "123", ENCODING_TYPE: "des" }),
    CommonModule, FormsModule, ReactiveFormsModule,HttpClientModule, CourseRoutingModule, 
    ContentModule, TextFieldModule, AngularEditorModule,DragDropModule,MaterialModule
  ],
  providers:[CourseService, AuthGuard],
  schemas: [NO_ERRORS_SCHEMA],
  entryComponents: [AddCourseComponent, EditCourseComponent, AddCourseTopicComponent, AddCategoryComponent, EditCategoryComponent, AddCourseContentComponent, EditCourseContentComponent],
  exports: [CourseComponent, AddCourseComponent, ViewCourseComponent, CourseTopicsComponent, CourseListComponent, EditCourseComponent,
    CoursePlanComponent, CourseQuestionsComponent, AddCourseQuestionComponent,
    CourseContentListComponent, AddCourseContentComponent,AddCategoryComponent,EditCategoryComponent, CategoryListComponent,ThemeModule]
})
export class CourseModule {
  static forRoot(config: Config): ModuleWithProviders<CourseModule> {
    return {
      ngModule: CourseModule,
      providers: [CourseService,AuthGuard,
        { provide: COURSE_CONFIG, useValue: config } // If I hard code `useValue: {API_ENDPOINT: 'FooBar'}`, instead of using `config` it works... weird.
      ],
    };
  }
}
