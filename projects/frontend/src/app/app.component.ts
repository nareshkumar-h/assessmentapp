import { Component } from '@angular/core';
import { API, CourseClient, UserClient } from '@ks-sdk-client/rest';
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
  courses: any;

  constructor() {
    this.user = this.getLoggedInUser();
    this.isLoggedIn = this.user != null;
    const courseClient = new CourseClient();
    const userClient = new UserClient();
    UserClient.list().then((response) => {
      console.log(response);
    });
    console.log(userClient);
    console.log('APP constructor', API(), courseClient.listCourses());
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

  getLoggedInUser() {
    return JSON.parse(localStorage.getItem('LOGGED_IN_USER'));
  }

  isLoggedIn: boolean = true;

  headerMenus = [];

  getHeaderMenus() {
    this.headerMenus = [];
    //this.headerMenus.push({name: "Courses",  link:["courses"], icon:"fas fa-book-open",  access: true});
    return this.headerMenus;
  }
}
