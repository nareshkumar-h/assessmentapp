import { Component, OnInit } from '@angular/core';
import { AuthService } from 'auth';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {


  user: any;
  isLoggedIn: any;

  constructor(public authService: AuthService) {
    this.user = this.authService.getUser();
    this.isLoggedIn = this.user != null;
  }

  ngOnInit(): void {
  }

  logout(){
    localStorage.clear();
    sessionStorage.clear();
    window.location.href="/";
  }

}
