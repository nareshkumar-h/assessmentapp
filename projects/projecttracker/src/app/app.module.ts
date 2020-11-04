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
import { UsersModule } from 'projects/frontend/src/app/components/users/users.module';

@NgModule({
  declarations: [
    AppComponent,
    ProjectdashboardComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AuthModule.forRoot({API_ENDPOINT:environment.API_URL,USER_TYPE:'U', ORG_ID:environment.ORG_ID}),
    ThemeModule, MaterialModule, NavbarModule,   
    ProjectModule.forRoot({API_ENDPOINT:environment.API_URL}),
    UsersModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
