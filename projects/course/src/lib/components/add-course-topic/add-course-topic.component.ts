import { Component, OnInit, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CourseService } from '../../course.service';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { KtClientService } from 'projects/frontend/src/app/kt-client.service';

@Component({
  selector: 'app-add-course-topic',
  templateUrl: './add-course-topic.component.html',
  styleUrls: ['./add-course-topic.component.css'],
})
export class AddCourseTopicComponent implements OnInit {
  courseId: string;
  moduleId: string;
  module: any;

  breadcrumbItems = [
    { icon: 'home', name: 'Home', link: '/' },
    { name: 'Courses' },
  ];

  constructor(
    private ktClient: KtClientService,
    private router: Router,
    private route: ActivatedRoute,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialog: MatDialog
  ) {
    this.module = data['moduleObj'];
    this.route.params.subscribe((params) => {
      this.courseId = params['id'];
      this.moduleId = params['moduleId'];
    });
  }

  ngOnInit(): void {}

  topic = { name: null, duration: 0, core: true };

  save(topic) {
    console.log(this.courseId, this.module.code, topic);
    this.ktClient
      .getCourseClient()
      .addTopic(this.courseId, this.module.code, topic)
      .then((res) => {
        console.log(res);
        //this.router.navigate ( ["courses/" + this.courseId]);
        this.dialog.closeAll();
      });
  }

  cancel() {
    window.history.back();
  }
}
