import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'projects/auth/src/public-api';
import { GithubModule } from 'projects/project/src/lib/github/github.module';
import { HeaderComponent } from 'projects/theme/src/public-api';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {path:'home', component:HomeComponent},  
  { path:'app', component: HeaderComponent},

  // { path:'', component: HeaderComponent},
  { path: '',   redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
