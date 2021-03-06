import { Component, OnInit } from '@angular/core';
import { AuthService } from 'auth';

@Component({
  selector: 'app-view-project',
  templateUrl: './view-project.component.html',
  styleUrls: ['./view-project.component.css'],
})
export class ViewProjectComponent implements OnInit {
  showSidebar = false;
  constructor(private authService: AuthService) {
    this.showSidebar = this.authService.isAuthorized();
    console.log('ShowSidebar', this.authService.isAuthorized());
  }

  ngOnInit(): void {
    //this.loadMenus();
  }
}
