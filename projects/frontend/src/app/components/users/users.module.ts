import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddUserComponent } from './add-user/add-user.component';
import { ListUsersComponent } from './list-users/list-users.component';
import { ListEmployeesComponent } from './list-employees/list-employees.component';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { ViewUserComponent } from './view-user/view-user.component';
import { UserRoutingModule } from './user-routing.module';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ProfileSidebarComponent } from './profile-sidebar/profile-sidebar.component';
import { ProfileComponent } from './profile/profile.component';
import { UpdateAcademicsComponent } from './update-academics/update-academics.component';
import { UserFeaturesComponent } from './user-features/user-features.component';
import { GithubComponent } from './github/github.component';
import { SonarcloudComponent } from './sonarcloud/sonarcloud.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SidenavModule, ThemeModule, CardModule } from 'projects/theme/src/public-api';
import { NavbarModule } from 'angular-bootstrap-md';
import { MaterialModule } from '../../material.module';




@NgModule({
  declarations: [AddUserComponent,
    ListUsersComponent,
    ListEmployeesComponent,    
    AddEmployeeComponent,
    ViewUserComponent,
    ChangePasswordComponent,
    ProfileSidebarComponent,
    ProfileComponent,
    UpdateAcademicsComponent,
    UserFeaturesComponent,
    GithubComponent,
    SonarcloudComponent
    
    ],
  imports: [
    CommonModule, UserRoutingModule,FormsModule, HttpClientModule,MaterialModule,
    ThemeModule,CardModule,SidenavModule, UserRoutingModule
  ],
  exports:[],
  schemas: [ NO_ERRORS_SCHEMA ]
})
export class UsersModule { }
