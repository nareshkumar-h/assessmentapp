import { Component, OnInit } from '@angular/core';
import { BatchService } from '../batch.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseService } from 'projects/course/src/public-api';

@Component({
  selector: 'app-view-batch',
  templateUrl: './view-batch.component.html',
  styleUrls: ['./view-batch.component.css'],
})
export class ViewBatchComponent implements OnInit {
  batchId: string;
  breadcrumbItems: any = [
    { icon: 'home', name: 'Batches', link: '../../batches' },
  ];

  constructor(private router: Router, private route: ActivatedRoute) {
    this.route.params.subscribe((params) => {
      this.batchId = params['id'];
      this.breadcrumbItems.push({ name: this.batchId });
    });
  }

  ngOnInit(): void {
    this.loadMenus();
  }

  showSidebar = true;

  menus: any;

  loadMenus() {
    this.menus = [];
    this.menus.push({
      title: 'Back',
      path: ['../'],
      icontype: 'fas fa-arrow-left',
      access: true,
    });
    this.menus.push({
      title: 'Batch',
      path: ['../' + this.batchId],
      icontype: 'fas fa-home',
      access: true,
    });
    this.menus.push({
      title: 'Courses',
      path: ['courses'],
      icontype: 'fas fa-book-open',
      access: true,
    });
    this.menus.push({
      title: 'Users',
      path: ['users'],
      icontype: 'fas fa-users',
      access: true,
    });
    this.menus.push({
      title: 'Slack',
      path: ['slack'],
      icontype: 'fab fa-slack',
      access: true,
    });
    // this.menus.push( {title: "Assessments",  path:["assessments"], icontype:"fas fa-question", access: true});
  }
}
