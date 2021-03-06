import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'auth';
import { ProjectService } from '../../project.service';
@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css'],
})
export class ProjectListComponent implements OnInit {
  breadcrumbItems = [
    { icon: 'home', name: 'Home', link: '/' },
    { name: 'Projects' },
  ];

  showSidebar = true;

  @Input()
  userId: string;
  private loggedInUserId: string;
  isLoggedInUser: boolean;

  constructor(
    private projectService: ProjectService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.loggedInUserId = this.authService.getLoggedInUsername();

    this.route.params.subscribe((params) => {
      this.userId = params['userId'];
    });
  }

  selectedProject: any;

  ngOnInit(): void {
    this.loadMenus();
    this.list();
    this.isLoggedInUser = this.loggedInUserId == this.userId;
  }

  projects: any;

  list() {
    this.projectService.findMyProjects(this.userId).subscribe((res) => {
      this.projects = res;
      if (this.projects.length > 0) {
        this.selectedProject = this.projects[0];
      }
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

  menus = [];

  loadMenus() {
    this.menus = [];
    this.menus.push({
      title: 'Home',
      path: ['../../dashboard'],
      icontype: 'fas fa-home',
      access: this.isLoggedInUser,
    });
    this.menus.push({
      title: 'Projects',
      path: ['../'],
      icontype: 'fas fa-laptop',
      access: true,
    });
  }
}
