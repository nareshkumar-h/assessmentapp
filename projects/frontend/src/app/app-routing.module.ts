import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthGuard } from './guards/auth.guard';



const routes: Routes = [
  {path:'dashboard', component:DashboardComponent, canActivate:[AuthGuard]},
  {path:'courses', component:HomeComponent},
  { path: '',   redirectTo: '/dashboard', pathMatch: 'full' }
  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
