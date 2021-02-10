import { Component, OnInit } from '@angular/core';
import { BatchService } from '../batch.service';
import { CourseService } from 'projects/course/src/public-api';
import { ActivatedRoute } from '@angular/router';
import { KtClientService } from '../../../kt-client.service';

@Component({
  selector: 'app-batch-course-topics',
  templateUrl: './batch-course-topics.component.html',
  styleUrls: ['./batch-course-topics.component.css'],
})
export class BatchCourseTopicsComponent implements OnInit {
  batchId: string;
  courseId: string;

  breadcrumbItems: any = [
    { icon: 'home', name: 'Home', link: '/' },
    { name: 'Batches', link: '../../batches' },
  ];

  constructor(
    private ktClient: KtClientService,
    private courseService: CourseService,
    private route: ActivatedRoute
  ) {
    this.route.parent.params.subscribe((params) => {
      this.batchId = params['id'];
      this.breadcrumbItems.push({ name: this.batchId, link: '../' });

      this.courseId = params['courseId'];

      this.breadcrumbItems.push({ name: 'Courses', link: '../' });
      this.breadcrumbItems.push({ name: this.courseId });
    });

    this.route.params.subscribe((params) => {});
  }

  ngOnInit(): void {
    this.listTopics();
    this.findCourse();
  }

  topicData: any;
  courseTopics: any;

  course: any;

  findCourse() {
    this.courseService.findOne(this.courseId).subscribe((res) => {
      this.course = res;
    });
  }

  listTopics() {
    this.ktClient
      .getBatchClient()
      .getBatchCourseTopics(this.batchId, this.courseId)
      .then((res) => {
        this.topicData = res;
        this.courseTopics = this.topicData['topics'];
        this.createReport(this.courseTopics);
      });
  }

  updateStatus(topic, checked) {
    console.log('Update Status:', topic, checked);
    let status = checked ? 'C' : 'P';
    topic.completionDate = checked ? new Date().toJSON().substr(0, 10) : null;
    this.ktClient
      .getBatchClient()
      .updateBatchTopicStatus(topic.id, status)
      .then((res) => {
        console.log(res);
        this.createReport(this.courseTopics);
      });
  }

  reportData: any = [];
  widgetColors = [
    'green-haze',
    'purple-plum',
    'green-haze',
    'red-intense',
    'blue-madison',
    'red-intense',
  ];

  createReport(data) {
    this.ktClient
      .getBatchClient()
      .getBatchCourseTopicReport(data)
      .then((res) => {
        this.reportData = res;
      });
  }

  today = new Date();

  getColor(topic) {
    let color = '';
    if (topic.status == 'P' && new Date(topic.plannedDate) < this.today) {
      color = 'red';
    }

    return color;
  }
}
