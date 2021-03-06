import { Component, OnInit, ViewChild } from '@angular/core';
import { ProjectService } from '../../project.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'auth';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import * as dayjs from 'dayjs';
@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css'],
})
export class ProjectListComponent implements OnInit {
  userId: any;
  breadcrumbItems = [
    { icon: 'home', name: 'Home', link: '/' },
    { name: 'Projects' },
  ];

  loggedInUser;
  isMentor: boolean;

  constructor(
    private router: Router,
    private projectService: ProjectService,
    private authService: AuthService,
    private route: ActivatedRoute
  ) {
    this.userId = this.authService.getLoggedInUsername();
    this.loggedInUser = this.authService.getUser();
    this.isMentor = this.authService.hasRoleAccess('T');
  }

  ngOnInit(): void {
    this.loadMenus();
    this.list();
  }

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
    this.projectService.list().subscribe((res) => {
      this.projects = res;
      this.dataSource = new MatTableDataSource<any>(this.projects);
      //this.createReport(this.projects);
    });
  }

  displayedColumns: string[] = [
    'id',
    'name',
    'createdBy',
    'days',
    'noOfFeatures',
    'action',
  ];

  resultsLength: number;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  dataSource: any;

  ngAfterViewInit() {
    this.loadTableViewChild();
  }
  loadTableViewChild() {
    if (this.projects) {
      this.dataSource.paginator = this.paginator;
    }
  }

  menus: any;

  getDays(obj) {
    let sd = dayjs(obj.startDate);
    let days = dayjs().diff(sd, 'day');
    return days;
  }

  getUrl(url) {
    let projectUrls = url != null ? url.split(',') : [];

    return projectUrls;
  }

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
      access: this.authService.hasRoleAccess(['U']),
    });
    this.menus.push({
      title: 'All Projects',
      path: ['../all'],
      icontype: 'fas fa-tools',
      access: this.authService.hasRoleAccess(['U', 'T', 'HR']),
    });
    this.menus.push({
      title: 'Add Project',
      path: ['../addproject'],
      icontype: 'fas fa-plus',
      access: this.authService.hasRoleAccess(['U']),
    });
    //this.menus.push( {title: "Ratings",  path:[ "../ratings"], icontype:"fas fa-plus", access: true});
    this.menus.push({
      title: 'Reviews',
      path: ['../projects/reviews'],
      icontype: 'fas fa-search',
      access: this.authService.hasRoleAccess(['T']),
    });
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

  createRepo(p) {
    this.router.navigateByUrl(
      '/repositories/addrepository?projectId=' +
        p.id +
        '&name=' +
        p.name +
        '&prefix=' +
        p.projectPrefix
    );
  }
}
