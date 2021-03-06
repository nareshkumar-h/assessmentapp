import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import * as _ from 'lodash';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'auth';
import { UserService } from 'projects/users/src/lib/components/user.service';
import { ProjectService } from '../../../project.service';

@Component({
  selector: 'lib-edit-user-feature-rating-report',
  templateUrl: './edit-user-feature-rating-report.component.html',
  styleUrls: ['./edit-user-feature-rating-report.component.css'],
})
export class EditUserFeatureRatingReportComponent implements OnInit {
  @Input()
  userId: any;
  breadcrumbItems = [
    { icon: 'home', name: 'Home', link: '/' },
    { name: 'Projects' },
  ];

  constructor(
    private projectService: ProjectService,
    private toastr: ToastrService,
    private authService: AuthService,
    private route: ActivatedRoute
  ) {
    this.route.params.subscribe((params) => {
      this.userId = params['userId'];
    });
  }

  ngOnInit(): void {
    this.loadMenus();
    this.list();
  }

  ratings: any;

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
    this.projectService
      .listUserFeatureRatingsForUser(this.userId)
      .subscribe((res) => {
        this.ratings = res;
        this.dataSource = new MatTableDataSource<any>(this.ratings);
        // this.createReport(this.projects);
      });
  }

  displayedColumns: string[] = [
    'id',
    'featureName',
    'functionality',
    'design',
    'bestPractices',
    'timeline',
    'complexity',
    'lastModifiedDate',
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
    //this.menus.push( {title: "Ratings",  path:[ "../ratings"], icontype:"fas fa-plus", access: true});
    //this.menus.push( {title: "Reviews",  path:[ "../reviews"], icontype:"fas fa-plus", access: true});
  }

  sortData(event) {
    console.log('Sorting', event);
    let field = event.active;
    let direction = event.direction != '' ? event.direction : 'desc';
    this.ratings = _.orderBy(this.ratings, [field], [direction]);
    console.log(this.ratings);
    this.dataSource = new MatTableDataSource<any>(this.ratings);
    this.dataSource.sort = this.sort;
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

  updateRating(f) {
    console.log(f);

    this.projectService
      .updateFeatureReviewRating(f.featureId, f)
      .subscribe((res) => {
        this.toastr.success('Successfully Updated');
      });
  }
}
