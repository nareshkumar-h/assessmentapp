import { Component, Input, OnInit } from '@angular/core';
import { ProjectService } from '../../project.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'auth';
import { AddRepositoryComponent } from '../add-repository/add-repository.component';
import { ProjectClientService } from '../../project-client.service';

@Component({
  selector: 'app-my-project-list',
  templateUrl: './my-project-list.component.html',
  styleUrls: ['./my-project-list.component.css'],
})
export class MyProjectListComponent implements OnInit {
  breadcrumbItems = [
    { icon: 'home', name: 'Home', link: '/' },
    { name: 'Projects' },
  ];

  @Input()
  userId: string;
  private loggedInUserId: string;
  isLoggedInUser: boolean;

  constructor(
    private projectService: ProjectService,
    private projectClient: ProjectClientService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.loggedInUserId = this.authService.getLoggedInUsername();
    this.userId = this.authService.getSelectedUser();
    this.route.params.subscribe((params) => {
      // this.userId = params["userId"];
    });

    this.route.parent.params.subscribe((params) => {
      if (params['userId']) {
        this.userId = params['userId'];
      }
    });
  }

  ngOnInit(): void {
    this.loadMenus();
    this.list();
    this.isLoggedInUser = this.loggedInUserId == this.userId;
  }

  projects: any;

  list() {
    this.projectService.findMyProjects
    //this.projectClient.getMyProjects
    (this.userId).subscribe((res) => {
      this.projects = res;
      this.createReport(this.projects);
    });
  }

  reportData: any = [];
  widgetColors = [
    'purple-plum',
    'blue-madison',
    'red-intense',
    'green-haze',
    'blue-madison',
    'red-intense',
  ];

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

  navigate(routeLink, sidebarPath) {
    console.log(routeLink, sidebarPath);
    this.router.navigate([
      { outlets: { primary: routeLink, sidebar: sidebarPath } },
    ]);
  }

  menus: any = [];

  loadMenus() {
    this.menus = [];
    this.menus.push({
      title: 'Home',
      path: ['../projects'],
      icontype: 'fas fa-home',
      access: true,
    });

    this.menus.push({
      title: 'My Projects',
      path: ['../projects'],
      icontype: 'fas fa-user',
      access: this.authService.hasRoleAccess(['U', 'T']),
    });
    this.menus.push({
      title: 'All Projects',
      path: ['../projects/all'],
      icontype: 'fas fa-tools',
      access: this.authService.hasRoleAccess(['U', 'T', 'HR']),
    });
    this.menus.push({
      title: 'Add Project',
      path: ['addproject'],
      icontype: 'fas fa-plus',
      access: this.authService.hasRoleAccess(['U', 'T']),
    });
    this.menus.push({
      title: 'Reviews',
      path: ['reviews'],
      icontype: 'fas fa-search',
      access: this.authService.hasRoleAccess(['U', 'T']),
    });
  }

  createRepo(p) {
    this.router.navigateByUrl(
      '/repositories/addrepository?projectId=' + p.id + '&name=' + p.name
    );
  }
}
