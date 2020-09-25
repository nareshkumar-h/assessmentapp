import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'projects/auth/src/public-api';

@Component({
  selector: 'app-project-dashboard',
  templateUrl: './project-dashboard.component.html',
  styleUrls: ['./project-dashboard.component.css']
})
export class ProjectDashboardComponent implements OnInit {

  userId:string;

  constructor(private authService:AuthService, private router:Router) { 
    this.userId = this.authService.getLoggedInUsername();
  }


  ngOnInit(): void {

    this.router.navigate(['projects/'+ this.userId]);
  }

}
