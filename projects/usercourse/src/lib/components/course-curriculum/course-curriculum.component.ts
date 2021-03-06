import { Component, OnInit, Input } from '@angular/core';
import { UserCourseService } from '../../usercourse.service';
import { AuthService } from 'auth';
import { CourseClientService } from '../../course-client.service';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'uc-course-curriculum',
  templateUrl: './course-curriculum.component.html',
  styleUrls: ['./course-curriculum.component.css'],
})
export class CourseCurriculumComponent implements OnInit {
  showSidebar = true;
  @Input()
  userId: string;

  @Input()
  courseId: string;
  settings: string;

  courseName: string;

  enrolled = true;

  breadcrumbItems: any = [
    { icon: 'home', name: 'Home', link: '/' },
    { name: 'Courses', link: '../../courses' },
  ];

  constructor(
    private userCourseService: UserCourseService,
    private authService: AuthService,
    private courseClientService: CourseClientService,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) {
    //this.userId = params["userId"];
    this.userId = this.authService.getLoggedInUsername();
    this.route.parent.params.subscribe((params) => {
      this.courseId = params['courseId'];
      this.courseName = params['courseName'];
      // this.breadcrumbItems.push({ name: "Courses", link: "coursedashboard",sidelink:"USER_COURSE"});
      this.breadcrumbItems.push({ name: this.courseId });
    });

    this.route.parent.queryParams.subscribe((params) => {
      if (params['view'] == 'enroll') {
        this.enrolled = false;
      }
    });
  }

  ngOnInit(): void {
    this.loadMenus();
    let value = localStorage.getItem('COURSE_SETTINGS');
    this.settings = value ? value : 'A';

    this.findCourse();
  }

  topicData: any;
  courseTopics: any = {};

  course: any;

  modules: any;

  findCourse() {
    this.courseClientService.listTopics(this.courseId).subscribe((res) => {
      let data = res;
      var course = data['course'];

      var modules = data['modules'];
      var topics = data['topics'];

      this.course = course;
      //console.log("Before Sorting:" , JSON.stringify(modules));
      modules.sort(this.sortByDisplayOrder);
      //console.log("After Sorting:" , JSON.stringify(modules));
      this.modules = modules;
      this.courseTopics = this.getCourseTopics(modules, topics);

      this.listUserTopics(modules, this.courseTopics);
    });
  }

  getCourseTopics(modules, topics) {
    let courseTopics = {};
    for (let m of modules) {
      var moduleName = m.name;
      // var moduleTopics = topics.filter(c => c.module_id == m.code);
      courseTopics[moduleName] = m.topics;
    }
    return courseTopics;
  }

  modulePercentage = {};

  listUserTopics(modules, courseTopics) {
    this.userCourseService
      .listCourseTopics(this.userId, this.courseId)
      .subscribe((res) => {
        let data = <[]>res;
        for (let m of modules) {
          let moduleName = m.name;
          let topics = courseTopics[moduleName];

          let moduleTopicCompleted = 0;
          let percentage = 0;

          var completed = 0;
          let total = topics.length;
          var newTopics = [];

          for (let topic of topics) {
            const obj = <{}>data.find((t) => t['topicId'] == topic['code']);

            if (obj) {
              topic = { ...topic, ...obj };
              if (obj['status'] == 'C') {
                completed++;
                moduleTopicCompleted++;
              } else {
                topic['status'] = 'P';
              }
              newTopics.push(topic);

              this.modulePercentage[moduleName] = Math.ceil(
                (100 * moduleTopicCompleted) / total
              );

              this.courseTopics[moduleName] = newTopics;
            }
          }
        }

        this.createReport(this.courseTopics);
      });
  }

  updateStatus(topic, checked) {
    //console.log("Update Status:", topic, checked);
    let status = checked ? 'C' : 'P';
    if (topic.id) {
      this.userCourseService
        .updateTopicStatus(topic.id, status)
        .subscribe((res) => {
          // console.log(res);
        });
    } else {
      this.userCourseService
        .updateCourseTopicStatus(this.courseId, topic.code, status)
        .subscribe((res) => {});
    }
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
    this.reportData = [];
    let i = 0;
    let total = 0;
    let completed = 0;
    let pending = 0;
    let totalDuration = 0;
    let topicDelayed = 0;
    let modules = Object.keys(data);
    for (let m of modules) {
      let topics = data[m];
      for (let c of topics) {
        completed += c.status == 'C' ? 1 : 0;
        pending += c.status == 'P' ? 1 : 0;
        // totalDuration += c.duration;
        // topicDelayed += ((c.status == 'P' && new Date(c.plannedDate) < this.today) ? 1 : 0);
        total += 1;
      }
    }
    let hours = Math.ceil(totalDuration / 60);
    let percentage = 0;
    if (total > 0) {
      percentage = Math.round((100 * completed) / total);
    }
    this.reportData.push({ label: 'Modules', value: modules.length });
    this.reportData.push({ label: 'Topics', value: total });
    this.reportData.push({ label: 'Completed', value: completed });
    this.reportData.push({ label: 'Pending', value: total - completed });
    this.reportData.push({ label: 'Percentage', value: percentage + '%' });
    //this.reportData.push({ "label": "Topics Due", "value": topicDelayed });
    console.log(this.reportData);
  }

  today = new Date();

  getColor(topic) {
    let color = '';

    if (topic.status == 'P' && new Date(topic.plannedDate) < this.today) {
      color = 'red';
    }

    return color;
  }

  sortByDisplayOrder(a, b) {
    if (a.display_order < b.display_order) {
      return -1;
    }
    if (a.display_order > b.display_order) {
      return 1;
    }
    return 0;
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
    this.menus.push({
      name: 'Topics',
      link: ['../' + this.courseId],
      icon: 'fas fa-book-open',
      access: true,
    });
    this.menus.push({
      name: 'Questions',
      link: ['questions'],
      icon: 'fas fa-question',
      access: true,
    });
    this.menus.push({
      name: 'Settings',
      link: ['settings'],
      icon: 'fas fa-gear',
      access: true,
    });
  }

  enrollCourse() {
    let cfm = confirm('Do you want to enroll course -' + this.courseId + '?');
    if (cfm) {
      this.userCourseService
        .enrollCourse(this.userId, this.courseId)
        .subscribe((res) => {
          console.log(res);
          this.toastr.success(
            'Successfully Enrolled to Course -' + this.courseId
          );
          //this.listCourses();
          this.enrolled = true;
        });
    }
  }
}
