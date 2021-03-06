import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'auth';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  userId: string;
  user: any;

  breadcrumbItems: any;

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    this.user = this.authService.getUser();
    this.userId = this.authService.getSelectedUser();
    console.log(this.userId);
    this.loadMenus();
    this.checkLoggedIn();
  }

  checkLoggedIn() {
    console.log(this.user);
    if (!this.user) {
      console.log('redirect to login page');
      this.router.navigate(['auth/login'], {
        queryParams: { redirectUrl: 'dashboard' },
      });
    } else {
      console.log('Already loggedin');
    }
  }

  navigate(routeLink, sidebarPath) {
    console.log(routeLink, sidebarPath);
    this.router.navigate([
      { outlets: { primary: routeLink, sidebar: sidebarPath } },
    ]);
  }

  features = [];

  getFeatures() {
    let featureList = [
      {
        name: 'Tasks',
        link: '../' + this.userId + '/tasks',
        image: 'courses.jpg',
        active: this.hasRole(['U']),
      },
    ];
    this.features = featureList.filter((obj) => obj.active == true);
    return this.features;
  }

  hasRole(roles) {
    let allowed = false;
    for (let role of roles) {
      if (this.user.roles.indexOf(role) != -1) {
        allowed = true;
        break;
      }
    }
    return allowed;
  }

  menus: any;
  loadMenus() {
    this.menus = [];

    this.menus.push({
      title: 'Java',
      path: ['/tasks/1/java'],
      icontype: 'fas fa-home',
      access: true,
    });
    this.menus.push({
      title: 'HTML',
      path: ['/tasks/2/html'],
      icontype: 'fas fa-task',
      access: this.hasRole(['U']),
    });
  }
}
