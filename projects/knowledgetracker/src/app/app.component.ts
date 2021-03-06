import { Component } from '@angular/core';
import { AuthService } from 'auth';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  name = 'KnowledgeTracker';
  headerColor = '#2b3643';
  siteInfo: any;

  user: any;

  users = ['guru', 'dharani'];
  courses: any;

  constructor(public authService: AuthService) {
    this.user = this.authService.getUser();
    this.isLoggedIn = this.user != null;
  }

  selectedUser: any;

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
  }

  isLoggedIn: boolean = true;

  headerMenus = [];

  getHeaderMenus() {
    this.headerMenus = [];
    // this.headerMenus.push({
    //   name: 'Courses',
    //   link: ['courses'],
    //   icon: 'fas fa-book-open',
    //   access: true,
    // });
    return this.headerMenus;
  }
}
