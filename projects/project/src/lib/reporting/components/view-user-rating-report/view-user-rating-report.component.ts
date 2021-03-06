import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'auth';
import { ReportingService } from 'projects/frontend/src/app/reporting.service';
import { UserService } from 'projects/users/src/lib/components/user.service';

@Component({
  selector: 'lib-view-user-rating-report',
  templateUrl: './view-user-rating-report.component.html',
  styleUrls: ['./view-user-rating-report.component.css'],
})
export class ViewUserRatingReportComponent implements OnInit {
  isLoggedIn: boolean;
  userId: any;
  breadcrumbItems = [
    { icon: 'home', name: 'Home', link: '/' },
    { name: 'Projects' },
  ];

  isMentor: boolean = false;
  mode: string = 'view';

  constructor(
    private projectService: ReportingService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private userService: UserService
  ) {
    this.route.parent.params.subscribe((params) => {
      this.userId = params['userId'];
    });
    this.isMentor = this.authService.hasRoleAccess('T');
    this.isLoggedIn = this.authService.isLoggedIn();
  }

  ngOnInit(): void {
    this.loadMenus();
    this.listMyProjects();
    this.list();
  }

  ratings: any;
  projects: any;

  reportData: any = [];
  widgetColors = [
    'purple-plum',
    'blue-madison',
    'red-intense',
    'green-haze',
    'blue-madison',
    'red-intense',
  ];

  list() {
    this.projectService.listUserRatingsForUser(this.userId).subscribe((res) => {
      this.ratings = res;
      this.dataSource = new MatTableDataSource<any>(this.ratings);
      // this.createReport(this.projects);
    });
  }

  listMyProjects() {
    this.projectService.findMyProjects(this.userId).subscribe((res) => {
      this.projects = res;
    });
  }

  displayedColumns: string[] = [
    'id',
    'username',
    'noOfFeatures',
    'functionality',
    'design',
    'bestPractices',
    'timeline',
    'complexity',
  ];

  resultsLength: number;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  dataSource: any;

  ngAfterViewInit() {
    this.loadTableViewChild();
  }
  loadTableViewChild() {
    if (this.ratings) {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }

  menus: any;

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
      path: ['../'],
      icontype: 'fas fa-user',
      access: true,
    });
    this.menus.push({
      title: 'All Projects',
      path: ['../all'],
      icontype: 'fas fa-tools',
      access: true,
    });
    this.menus.push({
      title: 'Add Project',
      path: ['../addproject'],
      icontype: 'fas fa-plus',
      access: true,
    });
    //this.menus.push( {title: "Ratings",  path:[ "../ratings/" + thi], icontype:"fas fa-plus", access: true});
    //this.menus.push( {title: "Reviews",  path:[ "../reviews"], icontype:"fas fa-plus", access: true});
  }

  createReport(data) {
    this.reportData = [];
    let total = data.length;
    let completed = data.filter((b) => b.status == 'COMPLETED').length;
    let inProgress = data.filter((b) => b.status == 'IN_PROGRESS').length;
    let scheduled = data.filter((b) => b.status == 'SCHEDULED').length;
    let users = data.reduce(function (sum, obj) {
      return sum + obj.noOfParticipants;
    }, 0);

    this.reportData.push({ label: 'Projects', value: total });
    this.reportData.push({ label: 'Pending', value: scheduled });
    this.reportData.push({ label: 'In Progress', value: inProgress });
    this.reportData.push({ label: 'Completed', value: completed });
  }
}
