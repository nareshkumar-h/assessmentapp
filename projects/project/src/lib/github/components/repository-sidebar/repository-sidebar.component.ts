import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'auth';

@Component({
  selector: 'lib-repository-sidebar',
  templateUrl: './repository-sidebar.component.html',
  styleUrls: ['./repository-sidebar.component.css'],
})
export class RepositorySidebarComponent implements OnInit {
  loggedInUser;
  constructor(private authService: AuthService, private router: Router) {
    this.loggedInUser = this.authService.getUser();
  }
  ngOnInit(): void {}

  navigate(path) {
    this.router.navigate(path);
  }
}
