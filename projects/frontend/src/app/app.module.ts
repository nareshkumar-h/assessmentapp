import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

import { ThemeModule, NavbarModule } from 'projects/theme/src/public-api';
import { DeviceDetectorModule } from 'ngx-device-detector';
import { ProjectModule } from 'projects/project/src/public-api';
import { environment } from '../environments/environment';
import { UsercourseModule } from 'projects/usercourse/src/public-api';
import { AuthModule } from 'projects/auth/src/public-api';
import { CourseModule } from 'projects/course/src/public-api';
import { BatchesModule } from './components/batches/batches.module';
import { UsersModule } from './components/users/users.module';
import { TrainingModule } from './components/trainer/training.module';
import { SettingsModule } from './settings/settings.module';

@NgModule({
  declarations: [
    AppComponent,HomeComponent, DashboardComponent
  ],
  imports: [
    BrowserModule,
    AuthModule.forRoot({API_ENDPOINT:environment.API_URL,USER_TYPE:'U', ORG_ID:environment.ORG_ID}),
    //UserCourseWrapperModule,
    CourseModule.forRoot({API_ENDPOINT:environment.API_URL}),
    UsercourseModule.forRoot({API_ENDPOINT:environment.API_URL}),
    ThemeModule, NavbarModule,   
    ProjectModule.forRoot({API_ENDPOINT:environment.API_URL}),
    DeviceDetectorModule ,
    BatchesModule,
    UsersModule,
    TrainingModule,    
    SettingsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
