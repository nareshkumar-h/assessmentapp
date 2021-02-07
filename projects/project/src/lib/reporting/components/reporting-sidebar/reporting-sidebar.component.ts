import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'projects/auth/src/public-api';

@Component({
  selector: 'lib-reporting-sidebar',
  templateUrl: './reporting-sidebar.component.html',
  styleUrls: ['./reporting-sidebar.component.css']
})
export class ReportingSidebarComponent implements OnInit {

 
  loggedInUser;
  constructor(private authService: AuthService, private router:Router) { 
    this.loggedInUser = this.authService.getUser();
  }
  ngOnInit(): void {
    
  }

  navigate(path){
    console.log(path);
    this.router.navigateByUrl(path);
  }

}
