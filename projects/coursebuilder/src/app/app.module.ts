import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ThemeModule, NavbarModule } from 'projects/theme/src/public-api';
import { DeviceDetectorModule } from 'ngx-device-detector';
import { environment } from '../environments/environment';
import { AuthModule } from 'projects/auth/src/public-api';
import { CourseModule } from 'projects/course/src/public-api';

import { MaterialModule } from 'projects/theme/src/lib/material.module';

import { ContentModule } from 'projects/content/src/public-api';
import { HighlightModule, HIGHLIGHT_OPTIONS } from 'ngx-highlightjs';
import { UsersModule } from 'projects/users/src/public-api';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from 'projects/auth/src/lib/jwt.interceptor';
import { DashboardComponent } from './components/dashboard/dashboard.component';

@NgModule({
  declarations: [AppComponent, DashboardComponent],
  imports: [
    BrowserModule,
    AuthModule.forRoot({
      API_ENDPOINT: environment.ENV,
      USER_TYPE: 'T',
      ORG_ID: environment.ORG_ID,
      REDIRECT_URI: environment.REDIRECT_URI,
    }),

    CourseModule.forRoot({ API_ENDPOINT: environment.API_URL }),
    ThemeModule,
    MaterialModule,
    NavbarModule,
    DeviceDetectorModule,
    ContentModule,
    HighlightModule,
    AppRoutingModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    {
      provide: HIGHLIGHT_OPTIONS,
      useValue: {
        lineNumbers: true,
        coreLibraryLoader: () => import('highlight.js/lib/core'),
        //coreLibraryLoader: () => import('highlight.js/lib/highlight'),
        lineNumbersLoader: () => import('highlightjs-line-numbers.js'),
        languages: {
          xml: () => import('highlight.js/lib/languages/xml'),
          java: () => import('highlight.js/lib/languages/java'),
          typescript: () => import('highlight.js/lib/languages/typescript'),
          scss: () => import('highlight.js/lib/languages/scss'),
        },
      },
    },
  ],
  schemas: [NO_ERRORS_SCHEMA],
  bootstrap: [AppComponent],
})
export class AppModule {}