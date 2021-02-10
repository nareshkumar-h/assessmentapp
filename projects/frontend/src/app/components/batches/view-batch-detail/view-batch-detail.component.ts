import { Component, OnInit } from '@angular/core';
import { BatchService } from '../batch.service';
import { CourseService } from 'projects/course/src/public-api';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { EditBatchComponent } from '../edit-batch/edit-batch.component';
import { KtClientService } from '../../../kt-client.service';

@Component({
  selector: 'app-view-batch-detail',
  templateUrl: './view-batch-detail.component.html',
  styleUrls: ['./view-batch-detail.component.css'],
})
export class ViewBatchDetailComponent implements OnInit {
  batchId: string;
  breadcrumbItems: any = [
    { icon: 'home', name: 'Batches', link: '../../batches' },
  ];

  constructor(
    private dialog: MatDialog,
    private ktClient: KtClientService,
    private courseService: CourseService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.route.params.subscribe((params) => {
      this.batchId = params['id'];
      this.breadcrumbItems.push({ name: this.batchId });
    });
  }

  ngOnInit(): void {
    this.findBatch();
    this.list();
  }

  batch: any;

  findBatch() {
    this.ktClient
      .getBatchClient()
      .getBatch(this.batchId)
      .then((res) => {
        this.batch = res;
      });
  }

  batchCourses: any;

  list() {
    this.ktClient
      .getBatchClient()
      .getBatchCourses(this.batchId)
      .then((res) => {
        this.batchCourses = res;
        this.createReport(this.batchCourses);
      });
  }

  reportData: any = [];
  widgetColors = [
    'purple-plum',
    'green-haze',
    'green-haze',
    'red-intense',
    'blue-madison',
  ];

  createReport(courses) {
    this.ktClient
      .getBatchClient()
      .getBatchCourseListReport(courses)
      .then((res) => {
        this.reportData = res;
      });
  }

  editDialog() {
    const dialogRef = this.dialog.open(EditBatchComponent, {
      width: '800px',
      data: { batch: this.batch },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.list();
    });
  }
}
