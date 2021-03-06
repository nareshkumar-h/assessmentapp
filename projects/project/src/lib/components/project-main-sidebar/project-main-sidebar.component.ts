import { Component, OnInit } from '@angular/core';
import { AuthService } from 'auth';

@Component({
  selector: 'lib-project-main-sidebar',
  templateUrl: './project-main-sidebar.component.html',
  styleUrls: ['./project-main-sidebar.component.css'],
})
export class ProjectMainSidebarComponent implements OnInit {
  loggedInUser;
  constructor(private authService: AuthService) {
    this.loggedInUser = this.authService.getUser();
  }

  ngOnInit(): void {
    this.loadMenus();
  }

  menus = [];

  loadMenus() {
    this.menus = [];
    this.menus.push({
      title: 'Home',
      path: ['../'],
      icontype: 'fas fa-home',
      access: true,
    });

    this.menus.push({
      title: 'My Projects',
      path: ['../../projects'],
      icontype: 'fas fa-user',
      access: this.authService.hasRoleAccess(['U']),
    });
    this.menus.push({
      title: 'All Projects',
      path: ['../projects/all'],
      icontype: 'fas fa-laptop',
      access: this.authService.hasRoleAccess(['U', 'T', 'HR']),
    });
    //this.menus.push( {title: "Add Project",  path:[ "addproject"], icontype:"fas fa-plus", access: this.authService.hasRoleAccess(["U"])});
    //this.menus.push( {title: "Ratings",  path:[ "../ratings"], icontype:"fas fa-plus", access: true});
    this.menus.push({
      title: 'Reviews',
      path: ['../reviews'],
      icontype: 'fas fa-search',
      access: this.authService.hasRoleAccess(['T']),
    });
    this.menus.push({
      title: 'Reports',
      path: ['../../reports/projects'],
      icontype: 'fas fa-tasks',
      access: this.authService.hasRoleAccess(['T', 'HR']),
    });
  }
}
