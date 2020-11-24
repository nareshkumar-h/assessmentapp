import { ModuleWithProviders, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {
  SidenavModule,
  ThemeModule,
  CardModule,
} from 'projects/theme/src/public-api';
import { MaterialModule } from 'projects/theme/src/lib/material.module';
import { AddEmployeeComponent } from './components/add-employee/add-employee.component';
import { AddUserComponent } from './components/add-user/add-user.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { GithubComponent } from './components/github/github.component';
import { ListEmployeesComponent } from './components/list-employees/list-employees.component';
import { ListUsersComponent } from './components/list-users/list-users.component';
import { MentorListComponent } from './components/mentor-list/mentor-list.component';
import { ProfileSidebarComponent } from './components/profile-sidebar/profile-sidebar.component';
import { ProfileComponent } from './components/profile/profile.component';
import { SonarcloudComponent } from './components/sonarcloud/sonarcloud.component';
import { UpdateAcademicsComponent } from './components/update-academics/update-academics.component';
import { UserFeaturesComponent } from './components/user-features/user-features.component';
import { ViewUserComponent } from './components/view-user/view-user.component';
import { UserRoutingModule } from './user-routing.module';
import { SwitchUserComponent } from './components/switch-user/switch-user.component';

import { Config, API_URL } from './config';
import { UserService } from './components/user.service';

@NgModule({
  declarations: [
    AddUserComponent,
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
    SonarcloudComponent,
    MentorListComponent,
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    FormsModule,
    HttpClientModule,
    MaterialModule,
    ThemeModule,
    CardModule,
    SidenavModule,
    UserRoutingModule,
  ],
  entryComponents: [SwitchUserComponent],
  exports: [],
  schemas: [NO_ERRORS_SCHEMA],
})
export class UsersModule {
  static forRoot(config: Config): ModuleWithProviders<UsersModule> {
    return {
      ngModule: UsersModule,
      providers: [
        UserService,
        { provide: API_URL, useValue: config.API_ENDPOINT }, // If I hard code `useValue: {API_ENDPOINT: 'FooBar'}`, instead of using `config` it works... weird.
      ],
    };
  }
}
