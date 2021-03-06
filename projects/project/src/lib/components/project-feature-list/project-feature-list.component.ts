import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../project.service';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { AddProjectFeatureComponent } from '../add-project-feature/add-project-feature.component';
import { AuthService } from 'auth';
import * as _ from 'lodash';

@Component({
  selector: 'app-project-feature-list',
  templateUrl: './project-feature-list.component.html',
  styleUrls: ['./project-feature-list.component.css'],
})
export class ProjectFeatureListComponent implements OnInit {
  breadcrumbItems = [
    { icon: 'home', name: 'Home', link: '/' },
    { name: 'Projects' },
  ];

  projectId: string;
  userId: string;
  isLoggedInUser: boolean;
  isMentor: boolean;
  showSidebar = false;

  displayColumns = ['technologies', 'priority', 'action', 'status'];

  constructor(
    public dialog: MatDialog,
    private projectService: ProjectService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) {
    this.showSidebar = this.authService.isAuthorized();
    this.isMentor = this.authService.hasRoleAccess('T');
    this.route.parent.params.subscribe((params) => {
      this.projectId = params['projectId'];
      this.userId = params['userId'];
    });
    this.route.queryParams.subscribe((params) => {
      let fields = params['display'];
      if (fields) {
        let fieldName = fields.split(',');
        this.displayColumns = [];
        this.displayColumns.push(...fieldName);
        console.log(JSON.stringify(this.displayColumns));
      }
    });
  }

  ngOnInit(): void {
    if (this.projectId != null) {
      this.findOne();
      this.listModules();
    }
    this.listFeatures();
  }

  projectFeatures: any;
  modules: any;

  project: any;

  findOne() {
    this.projectService.findOne(this.projectId).subscribe((res) => {
      this.project = res;
      this.isLoggedInUser =
        this.authService.getSelectedUser() == this.project['createdBy'];
    });
  }

  listModules() {
    this.projectService.listModules(this.projectId).subscribe((res) => {
      this.modules = res;
    });
  }

  listFeatures() {
    this.getFeatures().subscribe((res) => {
      this.projectFeatures = <{}>res;
      if (this.userId != null) {
        let modules = Object.keys(this.projectFeatures);
        console.log(modules);
        let modulesMap = [];
        for (let m of modules) {
          modulesMap.push({ name: m });
        }
        this.modules = modulesMap;
      }
      this.createReport(this.projectFeatures);
    });
  }

  getFeatures() {
    if (this.projectId != null) {
      return this.projectService.listFeatures(this.projectId);
    } else if (this.userId != null) {
      return this.projectService.listUserFeatures(this.userId);
    }
  }

  isExists(tag) {
    return this.displayColumns.includes(tag);
  }

  getModuleId(moduleName) {
    let tasks = this.projectFeatures[moduleName];
  }

  reportData: any = [];
  widgetColors = [
    'blue-madison',
    'green-haze',
    'red-intense',
    'blue-madison',
    'purple-plum',
    'green-haze',
  ];

  createReport(data) {
    this.reportData = [];

    let modules = Object.keys(data);
    let tasks: any = _.flatten(Object.values(data));

    let pendingTasks = tasks.filter((obj) => obj.status == 'PENDING').length;
    let inprogressTasks = tasks.filter((obj) => obj.status == 'INPROGRESS')
      .length;
    let reviewTasks = tasks.filter((obj) => obj.status == 'TESTING').length;
    let completedTasks = tasks.filter(
      (obj) => obj.status == 'COMPLETED' || obj.status == 'ACCEPTED'
    ).length; //correct

    var count = 0;
    for (let moduleName in this.projectFeatures) {
      let features = this.projectFeatures[moduleName];
      count += features.length;
    }
    this.reportData.push({ label: 'Modules', value: modules.length });
    this.reportData.push({ label: 'Features', value: tasks.length });
    this.reportData.push({ label: 'PENDING', value: pendingTasks });
    this.reportData.push({ label: 'INPROGRESS', value: inprogressTasks });
    this.reportData.push({ label: 'TESTING', value: reviewTasks });
    this.reportData.push({ label: 'COMPLETED', value: completedTasks });
  }

  addModule() {
    let moduleName = prompt('Enter Module Name');
    if (moduleName.length > 0) {
      let module = { name: moduleName };
      this.projectService.addModule(this.projectId, module).subscribe((res) => {
        this.toastr.success('Successfully Added');
        this.refresh();
      });
      console.log(moduleName);
    }
  }

  refresh() {
    this.listModules();
    this.listFeatures();
  }

  addFeatureDialog(module) {
    const dialogRef = this.dialog.open(AddProjectFeatureComponent, {
      width: '800px',
      height: 'fit-content',
      data: { projectId: this.projectId, moduleObj: module },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.refresh();
    });
  }

  menus = [];
}
