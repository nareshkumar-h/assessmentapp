import { Component, OnInit } from '@angular/core';
import { BatchService } from '../batch.service';
import { ActivatedRoute } from '@angular/router';
import { AssignBatchCourseComponent } from '../assign-batch-course/assign-batch-course.component';
import { MatDialog } from '@angular/material/dialog';
import { EditBatchCourseComponent } from '../edit-batch-course/edit-batch-course.component';
import { KtClientService } from '../../../kt-client.service';

@Component({
  selector: 'app-batch-course-list',
  templateUrl: './batch-course-list.component.html',
  styleUrls: ['./batch-course-list.component.css'],
})
export class BatchCourseListComponent implements OnInit {
  batchId: string;

  breadcrumbItems: any = [
    { icon: 'home', name: 'Home', link: '/' },
    { name: 'Batches', link: '../../' },
  ];

  constructor(
    public dialog: MatDialog,
    private ktClient: KtClientService,
    private route: ActivatedRoute
  ) {
    this.route.parent.params.subscribe((params) => {
      this.batchId = params['id'];
      this.breadcrumbItems.push({ name: this.batchId });
    });
  }

  ngOnInit(): void {
    this.list();
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

  mode: string;

  updateMode(mode) {
    this.mode = mode;
  }

  assignCourseDialog() {
    let courseIds = [];
    for (let c of this.batchCourses) {
      courseIds.push(c.course_id);
    }

    const dialogRef = this.dialog.open(AssignBatchCourseComponent, {
      width: '800px',
      data: { batchId: this.batchId, assignedCourses: courseIds },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.list();
    });
  }

  editCourseDialog(batchCourse) {
    let courseIds = [];
    for (let c of this.batchCourses) {
      courseIds.push(c.course_id);
    }

    const dialogRef = this.dialog.open(EditBatchCourseComponent, {
      width: '800px',
      data: { batchId: this.batchId, course: batchCourse },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.list();
    });
  }
}
