import { Component } from '@angular/core';
import { AuthService } from 'projects/auth/src/public-api';
import { UserService } from 'projects/users/src/lib/components/user.service';

@Component({
  selector: 'pt-root',
  templateUrl: './app.component.html',
  styles: [],
})
export class AppComponent {
  name = 'ProjectTracker';
  headerColor = '#2b3643';
  siteInfo: any;

  user: any;

  constructor(
    private userService: UserService,
    private authService: AuthService
  ) {
    this.user = this.getLoggedInUser();
    this.isLoggedIn = this.user != null;
  }

  selectedUser: any;

  users;

  ngOnInit(): void {
    let sites = {
      theme1: {
        bg1Color: '#f2f2f2',
        bgColor: 'cadetblue',
        orgId: 'spinsoft',
        logo:
          'https://s3.ap-south-1.amazonaws.com/assets.coursetracker.in/spinsoft_logo.png',
        bg1Image:
          "url('https://s3.ap-south-1.amazonaws.com/assets.coursetracker.in/blue.jpg')",
        orgName: 'Learning Portal',
        displayOrgName: true,
        authBoxLeftColor: 'white',
        authBoxRightColor: 'white',
      },
    };
    sessionStorage.setItem('SITE_INFO', JSON.stringify(sites['theme1']));

    if (this.authService.hasRoleAccess('T')) {
      this.loadUsernames();
    }
  }

  getLoggedInUser() {
    return JSON.parse(sessionStorage.getItem('LOGGED_IN_USER'));
  }

  isLoggedIn: boolean = true;

  headerMenus = [];

  getHeaderMenus() {
    this.headerMenus = [];
    //this.headerMenus.push({name: "Projects",  link:["projects/all"], icon:"fas fa-book-open",  access: true});
    return this.headerMenus;
  }

  loadUsernames() {
    this.userService.listUsers().subscribe((res) => {
      this.users = res;
    });
  }
}
