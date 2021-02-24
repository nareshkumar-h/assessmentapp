import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from 'projects/auth/src/public-api';
import { environment } from '../environments/environment';
import { NavbarModule } from 'angular-bootstrap-md';
import { ProjectModule } from 'projects/project/src/public-api';
import { MaterialModule } from 'projects/theme/src/lib/material.module';
import { ThemeModule } from 'projects/theme/src/public-api';
import { ProjectdashboardComponent } from './projectdashboard/projectdashboard.component';
import { HomeComponent } from './home/home.component';
import { UsersModule } from 'projects/users/src/public-api';
import { ReportingModule } from 'projects/project/src/lib/reporting/reporting.module';
import { GithubModule } from 'projects/project/src/lib/github/github.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from 'projects/auth/src/lib/jwt.interceptor';

@NgModule({
  declarations: [AppComponent, ProjectdashboardComponent, HomeComponent],
  imports: [
    BrowserModule,
    ThemeModule,
    MaterialModule,
    NavbarModule,
    ReportingModule.forRoot({ API_ENDPOINT: environment.API_URL }),
    ProjectModule.forRoot({ API_ENDPOINT: environment.API_URL }),
    GithubModule.forRoot({ API_ENDPOINT: environment.API_URL }),
    UsersModule.forRoot({ API_ENDPOINT: environment.API_URL }),
    AuthModule.forRoot({
      API_ENDPOINT: environment.API_URL,
      USER_TYPE: 'U',
      ORG_ID: environment.ORG_ID,
      REDIRECT_URI: '',
    }),
    AppRoutingModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
