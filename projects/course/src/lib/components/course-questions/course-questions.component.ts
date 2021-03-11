import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { KtClientService } from 'projects/frontend/src/app/kt-client.service';

@Component({
  selector: 'app-course-questions',
  templateUrl: './course-questions.component.html',
  styleUrls: ['./course-questions.component.css'],
})
export class CourseQuestionsComponent implements OnInit {
  showSidebar = true;
  courseId: string;
  breadcrumbItems: any = [
    { icon: 'home', name: 'Home', link: '/' },
    { name: 'Courses', link: '../../courses' },
  ];

  constructor(
    private ktClient: KtClientService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) {
    this.route.parent.params.subscribe((params) => {
      this.courseId = params['id'];
      this.breadcrumbItems.push({ name: this.courseId, link: '../' });
      this.breadcrumbItems.push({ name: 'Questions' });
    });
  }

  ngOnInit(): void {
    this.loadMenus();
    this.findCourse();
    this.list();
  }

  course: any;

  findCourse() {
    this.ktClient
      .getCourseClient()
      .findOne(this.courseId)
      .then((res) => {
        this.course = res;
      });
  }

  questions: any;

  list() {
    this.ktClient
      .getCourseClient()
      .getCourseQuestions(this.courseId)
      .then((res) => {
        this.questions = res;
      });
  }

  delete(questionId) {
    this.ktClient
      .getCourseClient()
      .deleteCourseQuestion(this.courseId, questionId)
      .then(
        (res) => {
          this.toastr.success('Successfully Deleted');
          this.list();
        },
        (err) => {
          this.toastr.error('Error', err.error.errorMessage);
        }
      );
  }

  menus = [];

  loadMenus() {
    this.menus = [];
    this.menus.push({
      name: 'Back',
      link: ['../'],
      icon: 'fas fa-arrow-left',
      access: true,
    });
  }
}
