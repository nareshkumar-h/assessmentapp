import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthGuard } from './guards/auth.guard';
import { TaskDashboardComponent } from './components/task-dashboard/task-dashboard.component';



const routes: Routes = [
  {path:'dashboard', component:DashboardComponent, canActivate:[AuthGuard]},
  {path:'courses', component:HomeComponent},
  {path:'tasks', component:TaskDashboardComponent},
  { path: '',   redirectTo: '/dashboard', pathMatch: 'full' }
  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
