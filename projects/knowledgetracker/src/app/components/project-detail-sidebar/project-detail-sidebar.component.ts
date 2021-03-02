import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-project-detail-sidebar',
  templateUrl: './project-detail-sidebar.component.html',
  styleUrls: ['./project-detail-sidebar.component.css'],
})
export class ProjectDetailSidebarComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    this.loadMenus();
  }
  menus = [];

  loadMenus() {
    this.menus = [];
    this.menus.push({
      title: 'Home',
      path: ['../../dashboard'],
      icontype: 'fas fa-home',
      access: true,
    });
    this.menus.push({
      title: 'Projects',
      path: ['../'],
      icontype: 'fas fa-laptop',
      access: true,
    });
  }
}
