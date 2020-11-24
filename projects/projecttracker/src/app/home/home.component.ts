import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'projects/auth/src/public-api';

@Component({
  selector: 'pt-home',
  templateUrl: './home.component.html',
  styles: [
  ]
})
export class HomeComponent implements OnInit {

  constructor(private authService:AuthService, private router:Router) { }

  ngOnInit(): void {
    if(this.authService.isLoggedIn()){
      if(this.authService.hasRoleAccess('T')){
        this.router.navigate(['projects/all']);
      }
      else{
        this.router.navigate(['projects']);
      }
    }
    else{
      
      this.router.navigate(['auth/login'],{queryParams:{"redirectUrl":"projects"}});
    }
  }

}
