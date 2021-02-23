import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as _ from 'lodash';
import { AuthService } from 'projects/auth/src/public-api';
import { InterviewService } from '../../interview.service';

@Component({
  selector: 'app-interviews',
  templateUrl: './interviews.component.html',
  styleUrls: ['./interviews.component.css'],
})
export class InterviewsComponent implements OnInit {
  @Input()
  userId: string;
  category: string;
  showSidebar = true;

  breadcrumbItems: any = [
    { icon: 'home', name: 'Home', link: '/' },
    { name: 'Courses' },
  ];

  constructor(
    private authService: AuthService,
    private interviewService: InterviewService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.userId = this.authService.getLoggedInUsername();
    this.loadMenus();
    this.route.params.subscribe((params) => {
      //this.userId = params['userId'];
      //console.log("category-" + this.category);
      this.listInterviews();
    });
  }

  ngOnInit(): void {
    console.log('UserId', this.userId);
    this.listInterviews();
  }

  userCourses: any;
  interviews: any = {};

  listInterviews() {
    this.interviewService.getInterviews(this.userId).subscribe((res) => {
      this.interviews = res;
      this.createReport(this.interviews);
    });
  }

  display(categories, usercourses: any) {
    //console.log(categories);
    this.userCourses = [];
    for (let category of categories) {
      let data = usercourses.filter((c) => c.category == category);
      if (data.length > 0) {
        this.interviews[category] = data;
        this.userCourses.push(...data);
      }
    }
  }

  reportData: any = [];
  widgetColors = [
    'purple-plum',
    'blue-madison',
    'green-haze',
    'red-intense',
    'blue-madison',
  ];

  createReport(data) {
    //console.log(JSON.stringify(data));
    this.reportData = [];
    let result = _.groupBy(data, (obj) => obj['rating']);

    this.reportData.push({ label: 'ALL', value: data.length });
    this.reportData.push({
      label: 'V.GOOD',
      value: result['VGOOD'] ? result['VGOOD'].length : 0,
    });
    this.reportData.push({
      label: 'GOOD',
      value: result['VGOOD'] ? result['VGOOD'].length : 0,
    });
    this.reportData.push({
      label: 'AVERAGE',
      value: result['AVERAGE'] ? result['AVERAGE'].length : 0,
    });
    this.reportData.push({
      label: 'NOT SATISFIED',
      value: result['REJECTED'] ? result['REJECTED'].length : 0,
    });
  }

  categories = [
    'Java',
    'Database',
    'Web',
    'JEE',
    'Testing',
    'Cloud',
    'Project Management',
    'Tools',
    'DevOps',
    'Quality',
    'Best Practices',
  ];

  getPercentage = function (obj) {
    var percentage = 0;
    if (obj.completed_topics > 0) {
      percentage = Math.round((100 * obj.completed_topics) / obj.no_of_topics);
    }
    return percentage;
  };

  navigate(routeLink, sidebarPath) {
    //console.log(routeLink, sidebarPath);
    this.router.navigate([
      { outlets: { primary: routeLink, sidebar: sidebarPath } },
    ]);
  }

  menus: any = [];

  loadMenus() {
    this.menus = [];
    this.menus.push({
      title: 'Back',
      path: ['../dashboard'],
      icontype: 'fas fa-arrow-left',
      access: true,
    });
    this.menus.push({
      title: 'Interviews',
      path: ['../interviews'],
      icontype: 'fas fa-tachometer-alt',
      access: true,
    });
    //this.menus.push( {title: "Available Courses",  path:[ "../availablecourses"], icontype:"fas fa-book-open", access: true});
  }
}
