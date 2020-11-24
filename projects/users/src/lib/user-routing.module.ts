import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddEmployeeComponent } from './components/add-employee/add-employee.component';
import { AddUserComponent } from './components/add-user/add-user.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { GithubComponent } from './components/github/github.component';
import { ListEmployeesComponent } from './components/list-employees/list-employees.component';
import { ListUsersComponent } from './components/list-users/list-users.component';
import { MentorListComponent } from './components/mentor-list/mentor-list.component';
import { ProfileComponent } from './components/profile/profile.component';
import { SonarcloudComponent } from './components/sonarcloud/sonarcloud.component';
import { UpdateAcademicsComponent } from './components/update-academics/update-academics.component';
import { UserFeaturesComponent } from './components/user-features/user-features.component';
import { ViewUserComponent } from './components/view-user/view-user.component';



const routes: Routes = [
  { path: 'users', component: ListUsersComponent , data: {showSidebar:true}},
  { path: 'users/adduser', component: AddUserComponent , data: {showSidebar:true}},
  
  { path: 'users/github', component: GithubComponent , data: {showSidebar:true}},
  { path: 'users/sonarcloud', component: SonarcloudComponent , data: {showSidebar:true}},

  { path: 'employees', component: ListEmployeesComponent , data: {showSidebar:true}},
  { path: 'employees/addemployee', component: AddEmployeeComponent , data: {showSidebar:true}},
  // { path: 'employees', component: ListEmployeesComponent , data: {showSidebar:true}},
  

  { path: 'user/:id', component: ViewUserComponent , data: {showSidebar:true},
    children:[
      
      { path: 'profile', component: ProfileComponent , data: {showSidebar:true}},
      { path: 'changePassword', component: ChangePasswordComponent , data: {showSidebar:true}},
      { path: 'academics', component: UpdateAcademicsComponent , data: {showSidebar:true}},
      { path: 'features', component: UserFeaturesComponent , data: {showSidebar:true}},
      { path: '', component: ProfileComponent , data: {showSidebar:true}},
          
      { path: 'features', component: UserFeaturesComponent , data: {showSidebar:true}},
      { path: 'mentors', component: MentorListComponent , data: {showSidebar:true}},
      { path: 'github', component: GithubComponent , data: {showSidebar:true}},
      { path: 'sonarcloud', component: SonarcloudComponent , data: {showSidebar:true}},
        ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
