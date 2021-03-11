import { Component, OnInit, Input } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { EditCourseComponent } from '../edit-course/edit-course.component';
import { CourseService } from '../../course.service';

import * as _ from 'lodash';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { KtClientService } from 'projects/frontend/src/app/kt-client.service';

@Component({
  selector: 'ct-view-course-curriculum',
  templateUrl: './view-course-curriculum.component.html',
  styleUrls: ['./view-course-curriculum.component.css'],
})
export class ViewCourseCurriculumComponent implements OnInit {
  @Input()
  course: any;
  courseName: string;
  showSidebar = true;

  constructor(
    private courseService: CourseService,
    private ktClient: KtClientService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    public dialog: MatDialog
  ) {
    this.route.parent.params.subscribe((params) => {
      // this.courseId = params["id"];
    });
  }

  ngOnInit(): void {
    this.course = this.courseService.getCourse();
    console.log(this.course);
    //this.loadMenus();
    this.findCourse();
  }

  sections: any;

  findCourse() {
    this.ktClient
      .getCourseClient()
      .listSections(this.course.id)
      .then((res) => {
        this.sections = res;
        this.findContent();
      });
  }

  selectedModule: any;

  deleteModule(i, module) {
    let data = this.contents[module.title];
    console.log(data);
    if (data && data.length > 1) {
      this.toastr.warning('Delete module contents before deleting module');
    } else {
      let cfm = confirm('Do you want to delete - ' + module.title);
      if (cfm) {
        this.ktClient
          .getCourseClient()
          .deleteSection(this.course.id, module.id)
          .then(
            (res) => {
              this.toastr.success('Successfully Deleted');
              this.sections.splice(i, 1);
              this.findContent();
            },
            (err) => {
              this.toastr.error('Error', err.error.errorMessage);
            }
          );
      }
    }
  }

  hasContents(module) {
    let result =
      this.contents[module] && this.contents[module].length > 0 ? true : false;
    //console.log("has contents: " + module +"-"  + result);
    return result;
  }

  getLectures(sectionTitle) {
    let obj = this.contents ? this.contents[sectionTitle] : null;
    return obj ? obj.lectures : [];
  }

  openDialog(m) {}

  contents: any;

  findContent() {
    this.contents = {};
    this.ktClient
      .getCourseClient()
      .getCourseContents(this.course.id)
      .then((res) => {
        this.contents = res;
      });
  }

  drop(event: CdkDragDrop<string[]>, moduleName: string) {
    alert(
      'drop-' +
        moduleName +
        '-' +
        event.previousIndex +
        '-' +
        event.currentIndex
    );
    moveItemInArray(this.contents, event.previousIndex, event.currentIndex);
    let indexData = {
      previous: event.previousIndex,
      current: event.currentIndex,
    };
    console.log(indexData);
  }

  dropTopics(event: CdkDragDrop<string[]>, moduleName: string) {
    let srcModule = event.previousContainer.id;
    let destModule = event.container.id;

    //console.log("src=" + event.previousContainer.id);
    //console.log("dest=" + event.container.id);
    let selectedObj = this.contents[srcModule][event.previousIndex];
    if (event.previousContainer === event.container) {
      //alert("dropTopics-" + moduleName +"-" +  event.previousIndex + "-" + event.currentIndex);
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      this.contents[srcModule].splice(event.previousIndex, 1);
      if (!this.contents[destModule]) {
        this.contents[destModule] = [];
      }
      this.contents[destModule].splice(event.currentIndex, 0, selectedObj);

      //alert("Transfer Item");
      // this.
      /*transferArrayItem(event.previousContainer.data,
         event.container.data,
         event.previousIndex,
         event.currentIndex);*/
    }
  }

  moduleTopics: any;

  download() {
    console.log('Download' + this.course.id);
    this.ktClient
      .getCourseClient()
      .download(this.course.id)
      .then((data) => {
        console.log(data);
        var downloadURL = window.URL.createObjectURL(data);
        var link = document.createElement('a');
        link.href = downloadURL;
        link.download = this.course.code + '.json';
        link.click();
      });
  }

  publish() {
    this.ktClient
      .getCourseClient()
      .publish(this.course.id)
      .then((res) => {
        console.log(res);
        this.toastr.success('Published Successfully');
        this.findCourse();
      });
  }

  menus: any;

  loadMenus() {
    this.menus = [];
    this.menus.push({
      title: 'Back',
      path: ['../'],
      icon: 'fas fa-arrow-left',
      access: true,
    });
    this.menus.push({
      title: 'Curriculum',
      path: ['/courses', this.course.id],
      icon: 'fas fa-book-open',
      access: true,
    });
    this.menus.push({
      title: 'Plan',
      path: ['plan'],
      icon: 'fas fa-book-open',
      access: true,
    });
    this.menus.push({
      title: 'Questions',
      path: ['questions'],
      icon: 'fas fa-question',
      access: true,
    });
    this.menus.push({
      title: 'Contents',
      path: ['contents'],
      icon: 'fas fa-book-open',
      access: true,
    });
  }

  editCourse(course) {
    console.log(this.dialog);
    const dialogRef = this.dialog.open(EditCourseComponent, {
      data: { courseObj: course },
    });
    console.log(dialogRef);
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
      this.findCourse();
    });
  }

  mode: any;

  deleteTopic(sectionId, topicId) {
    let cfm = confirm('Do you want to delete?');
    if (cfm) {
      console.log('delete ', sectionId);
      this.findContent();
    }
  }

  deleteLecture(lecture) {
    let cfm = confirm('Do you want to delete - ' + lecture.title + ' ?');
    if (cfm) {
      this.ktClient
        .getCourseClient()
        .deleteLecture(this.course.id, lecture.id)
        .then(
          (res) => {
            this.toastr.success('Successfully Deleted');
            this.findContent();
          },
          (err) => {
            this.toastr.error('Error', err.error.errorMessage);
          }
        );
    }
  }
}
