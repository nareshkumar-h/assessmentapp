import { Component, OnInit, Optional, Inject } from '@angular/core';
import { BatchService } from '../batch.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CourseService } from 'projects/course/src/public-api';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { KtClientService } from '../../../kt-client.service';

@Component({
  selector: 'app-edit-batch-course',
  templateUrl: './edit-batch-course.component.html',
  styleUrls: ['./edit-batch-course.component.css'],
})
export class EditBatchCourseComponent implements OnInit {
  batchId: string;
  courseId: string;
  batchCourse: any;
  oldBatchCourse: any;

  constructor(
    private ktClient: KtClientService,
    private courseService: CourseService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private dialog: MatDialog,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.batchId = data.batchId;
    this.batchCourse = JSON.parse(JSON.stringify(data.course));
    this.oldBatchCourse = data.course;
    this.courseId = data.course.course_id;

    //   this.route.parent.params.subscribe ( params=>{
    //     this.batchId = params["id"];
    //     this.breadcrumbItems.push({name:this.batchId, link:"../"});
    //   this.batchCourse["batchId"] = this.batchId;
    //   this.courseId = params["courseId"];
    //   this.breadcrumbItems.push({name:"Courses", link:"../"});
    //   this.breadcrumbItems.push({name:this.courseId});
    //   });

    // this.route.params.subscribe ( params=>{

    // });
  }

  today: string = new Date().toJSON().substr(0, 10);

  ngOnInit(): void {}

  course: any;

  save(batchCourse) {
    console.log(batchCourse);
    let batchCourseObj = {
      batchId: this.batchId,
      courseId: this.batchCourse.course_id,
      startDate: this.batchCourse.start_date,
      endDate: this.batchCourse.end_date,
      trainerId: this.batchCourse.trainer_id,
    };
    this.ktClient
      .getBatchClient()
      .updateBatchCourse(this.batchId, batchCourseObj)
      .then(
        (res) => {
          this.toastr.success('Successfully updated');
          //this.router.navigate(['batches/'+ this.batchId +"/courses"]);
          this.dialog.closeAll();
        },
        (err) => {
          console.error(err);
          this.toastr.error('Error', err.error.message);
        }
      );
  }

  delete() {
    let cfm = confirm('Do you want to delete course?');
    if (cfm) {
      this.ktClient
        .getBatchClient()
        .removeCourseFromBatch(this.batchId, this.courseId)
        .then(
          (res) => {
            this.toastr.success('Successfully Deleted');
            //this.router.navigate(['batches/'+ this.batchId+"/courses"]);
            this.dialog.closeAll();
          },
          (err) => {
            this.toastr.error(err.error.errorMessage);
          }
        );
    }
  }

  cancel() {
    this.data.course = this.oldBatchCourse;
    this.dialog.closeAll();
  }
}
