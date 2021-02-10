import { Component, OnInit } from '@angular/core';
import { BatchService } from '../batch.service';
import { Router } from '@angular/router';
import { AuthService } from 'projects/auth/src/public-api';
import { MatDialog } from '@angular/material/dialog';
import { AddBatchComponent } from '../add-batch/add-batch.component';
import { SecurityService } from 'projects/security/src/public-api';
import { KtClientService } from '../../../kt-client.service';

@Component({
  selector: 'app-list-batches',
  templateUrl: './list-batches.component.html',
  styleUrls: ['./list-batches.component.css'],
})
export class ListBatchesComponent implements OnInit {
  breadcrumbItems: any = [{ icon: 'home ', name: 'Batches', link: '/' }];

  userId: string;

  constructor(
    public dialog: MatDialog,
    private ktClient: KtClientService,
    private router: Router,
    private authService: AuthService,
    private securityService: SecurityService
  ) {
    this.userId = this.authService.getLoggedInUsername();
  }

  ngOnInit(): void {
    this.loadMenus();
    this.list();
  }

  batches: any;

  list() {
    this.ktClient
      .getBatchClient()
      .getBatches()
      .then((res) => {
        let data: any = res;
        this.batches = data.filter((obj) => obj.active);
        this.createReport(this.batches);
      });
  }

  reportData: any = [];
  widgetColors = [
    'purple-plum',
    'blue-madison',
    'green-haze',
    'red-intense',
    'blue-madison',
    'red-intense',
  ];

  createReport(data) {
    this.ktClient
      .getBatchClient()
      .getBatchListWidgetData(data)
      .then((res) => {
        this.reportData = res;
      });
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
      path: ['../'],
      icontype: 'fas fa-home',
      access: this.securityService.hasRole(['T', 'HR']),
    });
    this.menus.push({
      title: 'Training',
      path: ['../training', this.userId],
      icontype: 'fa-chalkboard-teacher fas',
      access: this.securityService.hasRole(['T', 'HR']),
    });
    this.menus.push({
      title: 'Courses',
      path: ['../courses'],
      icontype: 'fas fa-book-open',
      access: this.securityService.hasRole(['T', 'HR']),
    });
    this.menus.push({
      title: 'Batches',
      path: ['../batches'],
      icontype: 'fa-suitcase fas',
      access: this.securityService.hasRole(['T', 'HR']),
    });
    this.menus.push({
      title: 'Users',
      path: ['../users'],
      icontype: 'fa-users fas',
      access: this.securityService.hasRole(['HR']),
    });
  }

  openDialog() {
    const dialogRef = this.dialog.open(AddBatchComponent, { width: '800px' });

    dialogRef.afterClosed().subscribe((result) => {
      this.list();
    });
  }
}
