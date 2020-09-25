import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListUsersComponent } from './list-users/list-users.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ProfileComponent } from './profile/profile.component';
import { UpdateAcademicsComponent } from './update-academics/update-academics.component';
import { UserFeaturesComponent } from './user-features/user-features.component';
import { GithubComponent } from './github/github.component';
import { SonarcloudComponent } from './sonarcloud/sonarcloud.component';
import { AddUserComponent } from './add-user/add-user.component';
import { ListEmployeesComponent } from './list-employees/list-employees.component';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { ViewUserComponent } from './view-user/view-user.component';


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
