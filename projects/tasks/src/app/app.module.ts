import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SettingsModule } from 'projects/frontend/src/app/settings/settings.module';
import { AuthModule } from 'projects/auth/src/public-api';
import { NavbarModule, ThemeModule } from 'projects/theme/src/public-api';
import { environment} from '../environments/environment';
import { MaterialModule } from 'projects/theme/src/lib/material.module';
import { SecurityModule } from 'projects/security/src/public-api';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { TaskListComponent } from './components/task-list/task-list.component';
import { ContentModule } from 'projects/content/src/public-api';
import { CourseModule } from 'projects/course/src/public-api';
import { UsercourseModule } from 'projects/usercourse/src/public-api';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DashboardComponent,
    TaskListComponent
  ],
  imports: [
    BrowserModule,   
    ThemeModule, MaterialModule, NavbarModule,  
    SettingsModule,
    SecurityModule,
    ContentModule,
    AuthModule.forRoot({API_ENDPOINT:environment.API_URL,USER_TYPE:'U', ORG_ID:environment.ORG_ID}),    
    HttpClientModule,
    FormsModule,CommonModule,
    AppRoutingModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
