import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import * as _ from 'lodash';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'projects/auth/src/public-api';
import { InterviewService } from '../../interview.service';

import { UpdateInterviewResultComponent } from '../update-interview-result/update-interview-result.component';

@Component({
  selector: 'app-interview-detail',
  templateUrl: './interview-detail.component.html',
  styleUrls: ['./interview-detail.component.css'],
})
export class InterviewDetailComponent implements OnInit {
  @Input()
  userId: string;
  category: string;
  showSidebar = true;

  interviewId: number;

  breadcrumbItems: any = [
    { icon: 'home', name: 'Home', link: '/' },
    { name: 'Courses' },
  ];

  constructor(
    private authService: AuthService,
    public dialog: MatDialog,
    private interviewService: InterviewService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.userId = this.authService.getLoggedInUsername();
    this.loadMenus();
    this.route.params.subscribe((params) => {
      this.interviewId = params['id'];
      //this.userId = params['userId'];
      //console.log("category-" + this.category);
      this.listInterviews();
    });
  }

  ngOnInit(): void {
    console.log('UserId', this.userId);
    this.listInterviews();
    this.loadUserInterviews();
  }

  userCourses: any;
  interviews: any = {};
  interview: any;

  loadUserInterviews() {
    this.interviewService
      .getUserInterviewByInterviewId(this.interviewId)
      .subscribe((res) => {
        this.interviews = res;
        this.createReport(this.interviews);
      });
  }
  listInterviews() {
    this.interviewService.getInterview(this.interviewId).subscribe((res) => {
      this.interview = res;
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
      path: ['../'],
      icontype: 'fas fa-arrow-left',
      access: true,
    });
    this.menus.push({
      title: 'Interviews',
      path: ['../'],
      icontype: 'fas fa-tachometer-alt',
      access: true,
    });
    //this.menus.push( {title: "Available Courses",  path:[ "../availablecourses"], icontype:"fas fa-book-open", access: true});
  }

  updateRating(interview) {
    console.log(JSON.stringify(interview));
    let rating = prompt('Enter Rating ');
    if (rating != null && rating.length > 0) {
      interview['rating'] = rating;
      interview['status'] = 'COMPLETED';
      this.interviewService
        .updateRating(interview.id, interview)
        .subscribe((res) => {
          this.toastr.success('Updated Rating ' + rating);
          this.loadUserInterviews();
        });
    }
  }

  ratings = ['VGOOD', 'GOOD', 'AVERAGE', 'REJECTED'];

  openDialog(interview) {
    const dialogRef = this.dialog.open(UpdateInterviewResultComponent, {
      width: '800px',
      data: interview,
    });

    dialogRef.afterClosed().subscribe((result) => {
      // this.list();
      this.loadUserInterviews();
    });
  }
}
