import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'auth';
import { CourseService } from 'projects/course/src/public-api';
import { CourseClientService } from 'projects/usercourse/src/lib/course-client.service';
import { CourseContentService } from '../../services/course-content.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
})
export class TaskListComponent implements OnInit {
  category: string;
  userId: any;
  courseId: string;
  courseName: string;

  constructor(
    private courseService: CourseContentService,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {
    this.userId = this.authService.getLoggedInUsername();
    this.route.params.subscribe((params) => {
      this.courseId = params['courseId'];
      this.courseName = params['courseName'];
    });
  }

  ngOnInit(): void {
    this.findUserCourseContents();
    this.loadMenus();
  }

  userContents: any = [];
  findUserCourseContents() {
    console.log(
      'Fetching User course contents:',
      this.userId + ',' + this.courseId
    );

    this.courseService
      .getUserCourseLectures(this.userId, this.courseId)
      .subscribe((res) => {
        console.log(res);
        //this.userContents = res;
      });
  }

  menus: any;

  loadMenus() {
    this.menus = [];
    this.menus.push({
      title: 'Java',
      path: ['/tasks/java'],
      icontype: 'fas fa-home',
      access: true,
    });
    this.menus.push({
      title: 'HTML',
      path: ['/tasks/html'],
      icontype: 'fas fa-task',
      access: true,
    });
  }
}
