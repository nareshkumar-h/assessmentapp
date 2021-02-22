import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'projects/auth/src/public-api';

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
    let user = this.authService.getUser();
    if (!user) {
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
        name: 'Courses',
        link: '../' + this.userId + '/courses',
        image: 'courses.jpg',
        active: this.authService.hasRole(this.user, ['U']),
      },
      // {
      //   name: 'Projects',
      //   link: '../projects',
      //   image: 'project.png',
      //   active: this.authService.hasRole(this.user, ['U']),
      // },
    ];
    this.features = featureList.filter((obj) => obj.active == true);
    return this.features;
  }

  menus: any;
  loadMenus() {
    this.menus = [];

    this.menus.push({
      title: 'Home',
      path: [''],
      icontype: 'fas fa-home',
      access: true,
    });
    this.menus.push({
      title: 'Courses',
      path: ['/' + this.userId + '/coursedashboard'],
      icontype: 'fas fa-graduation-cap',
      access: this.authService.hasRole(this.user, ['U']),
    });
    // this.menus.push({
    //   title: 'Projects',
    //   path: ['/' + this.userId + '/myprojects'],
    //   icontype: 'fas fa-cubes',
    //   access: this.authService.hasRole(this.user, ['U']),
    // });
    //    this.menus.push( {title: "Tasks",  path:["/tasks"], icontype:"fas fa-tasks",  access: this.authService.hasRole(this.user,["T"])});

    //this.menus.push( {title: "Assessments",  path:["/"+ this.userId + "/assessments"], icontype:"fas fa-cubes",  access: true});
    this.menus.push({
      title: 'Interviews',
      path: ['/' + this.userId + '/interviews'],
      icontype: 'fas fa-cubes',
      access: true,
    });
  }
}
