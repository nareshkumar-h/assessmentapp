import { Component, OnInit, Input } from '@angular/core';
import { UserCourseService } from '../../usercourse.service';
import { AuthService } from 'auth';
import { CourseClientService } from '../../course-client.service';
import { ActivatedRoute } from '@angular/router';
import { UserCourseReport } from '../../models/user-course-report';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'uc-user-course-topics',
  templateUrl: './user-course-topics.component.html',
  styleUrls: ['./user-course-topics.component.css'],
})
export class UserCourseTopicsComponent implements OnInit {
  showSidebar = true;
  @Input()
  userId: string;

  @Input()
  courseId: string;
  settings: string;
  courseName: string;
  report: UserCourseReport;

  breadcrumbItems: any = [];

  readAccess: boolean = false;

  selectedUser: string;

  userType: string;

  constructor(
    private userCourseService: UserCourseService,
    private authService: AuthService,
    private courseClientService: CourseClientService,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) {
    //this.userId = params["userId"];
    this.userId = this.authService.getLoggedInUsername();
    this.selectedUser = this.authService.getSelectedUser();
    if (this.userId == this.selectedUser) {
      this.userType = 'U';
    }
    if (this.userId != this.selectedUser) {
      this.userType = 'M';
    }
    console.log(this.userType);
    this.readAccess = this.userId != this.selectedUser;
    this.route.parent.params.subscribe((params) => {
      this.courseId = params['courseId'];
      this.courseName = params['courseName'];
      // this.breadcrumbItems.push({ name: "Courses", link: "coursedashboard",sidelink:"USER_COURSE"});
      //this.breadcrumbItems.push({ name: this.courseId });
      //this.breadcrumbItems.push({ icon: 'home', name: 'Home', link: '/' });
      // this.breadcrumbItems.push({
      //   name: 'Courses',
      //   link: this.courseId,
      // });
    });
  }

  ngOnInit(): void {
    this.loadMenus();
    let value = localStorage.getItem('COURSE_SETTINGS');
    this.settings = value ? value : 'A';

    this.findCourse();
  }

  modules: any;

  filterTopics() {
    //alert(this.selectedStatus);
    /*    this.filteredModules = [];
    if (this.selectedStatus == 'ALL') {
      this.filteredModules = this.modules;
    } else {
      for (let m of this.modules) {
        let mObj = Object.assign({}, m);
        let topics = m.topics.filter(this.fTopics);
        mObj.topics = topics;
        this.filteredModules.push(mObj);
      }
    }*/
  }

  topicData: any;
  courseTopics: any = {};

  course: any;

  findCourse() {
    this.courseClientService.listTopics(this.courseId).subscribe((res) => {
      let data = res;
      var course = data;

      var modules = data['modules'];

      this.course = course;
      //console.log("Before Sorting:" , JSON.stringify(modules));
      modules.sort(this.sortByDisplayOrder);
      //console.log("After Sorting:" , JSON.stringify(modules));
      this.modules = modules;
      this.courseTopics = this.getCourseTopics(modules);

      this.listUserTopics();
    });
  }

  getCourseTopics(modules) {
    let courseTopics = {};
    for (let m of modules) {
      var moduleName = m.name;
      courseTopics[moduleName] = m.topics;
    }
    return courseTopics;
  }

  assignTopic(topic) {
    console.log(topic);
    let date = new Date().toJSON();
    topic['lectureDate'] = date.substr(0, 10);
    if (topic.userTopicId) {
      this.userCourseService.assignTopic(topic).subscribe((res) => {
        this.toastr.success('Assigned');

        //this.listUserTopics();
      });
    } else {
      let formData = {
        courseId: this.courseId,
        topicId: topic['code'],
        userId: this.selectedUser,
        assignedBy: this.userId,
      };

      this.userCourseService.assignTopic(formData).subscribe((res) => {
        this.toastr.success('Assigned');
        topic['status'] = 'P';
      });
    }
  }

  topicsLoaded = false;

  topicReviewStatus(topic, status) {
    console.log('Update Review Status:', topic, status);

    //topic.completionDate = status == 'C' ? null : null;

    this.userCourseService
      .updateTopicReviewStatus(topic.userTopicId, status)
      .subscribe((res) => {
        this.report.updateProjectAppliedCount(status);
        topic.reviewStatus = status;
        this.toastr.success('Success');
        this.displayReport();
      });
  }

  modulePercentage = {};

  reviewStatusMap = { A: 'Approved', R: 'Rejected', P: 'Pending' };

  listUserTopics() {
    this.userCourseService
      .listCourseTopics(this.selectedUser, this.courseId)
      .subscribe((res) => {
        let data = <[]>res;
        let modules: any = this.course.modules;
        for (let [i, moduleObj] of modules.entries()) {
          //let moduleObj = modules[i];
          let moduleName = moduleObj.name;
          let topics = moduleObj.topics;
          let moduleTopicCompleted = 0;
          let percentage = 0;
          var completed = 0;
          let total = topics.length;
          for (let [j, topic] of topics.entries()) {
            //let topic = topics[j];

            const obj = <{}>data.find((t) => t['topicId'] == topic['code']);
            //            console.log(obj);
            if (obj) {
              let status = obj['status'];
              this.course.modules[i].topics[j]['userTopicId'] =
                obj['userTopicId'];
              this.course.modules[i].topics[j]['status'] = status;
              this.course.modules[i].topics[j]['completionDate'] =
                obj['completionDate'];
              this.course.modules[i].topics[j]['lectureDate'] =
                obj['lectureDate'];
              this.course.modules[i].topics[j]['reviewStatus'] =
                obj['reviewStatus'];
              if (status == 'C') {
                completed++;
                moduleTopicCompleted++;
              }
              topic['status'] = status == 'C' ? 'C' : 'P';
              // newTopics.push(topic);

              this.modulePercentage[moduleName] = Math.ceil(
                (100 * moduleTopicCompleted) / total
              );

              //this.courseTopics[moduleName] = newTopics;
            }
          }
        }
        this.topicsLoaded = true;

        this.filterTopics();
        this.createReport();
      });
  }

  updateStatus(topic, checked, index, moduleIndex) {
    //console.log('Update Status:', topic, checked);
    let status = checked ? 'C' : 'P';
    topic.status = status;
    topic.completionDate = status == 'C' ? null : null;

    if (topic.userTopicId) {
      this.userCourseService
        .updateTopicStatus(topic.userTopicId, status)
        .subscribe((res) => {
          console.log(res);
          this.report.updateCount(status);

          //this.modules[moduleIndex].topics[index].status = status;

          let index1 = this.modules[moduleIndex].topics.findIndex(
            (obj) => obj.code == topic.code
          );
          console.log(index1);
          alert(index1);
          //let topic = this.modules.topics[index].status = status;
          if (status == 'C') {
            topic.completionDate = new Date();
            this.toastr.success('Good Job !!!');
          }
          this.displayReport();
        });
    } else {
      this.userCourseService
        .updateCourseTopicStatus(this.courseId, topic.code, status)
        .subscribe((res) => {
          let percentageImproved = this.report.updateCount(status);
          this.displayReport();
          if (status == 'C') {
            this.toastr.success('Good Job !!!');
          }
        });
    }
  }

  reportData: any = [];
  widgetColors = [
    'green-haze',
    'purple-plum',
    'green-haze',
    'red-intense',
    'blue-madison',
    'green-haze',
  ];

  createReport() {
    this.reportData = [];
    let i = 0;
    let total = 0;
    let completed = 0;
    let pending = 0;
    let projectApplied = 0;
    let totalDuration = 0;
    let topicDelayed = 0;
    for (let m of this.course.modules) {
      let topics = m['topics'];
      for (let c of topics) {
        completed += c.status == 'C' ? 1 : 0;
        pending += c.status == 'P' ? 1 : 0;
        projectApplied += c.reviewStatus == 'A' ? 1 : 0;
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
    let report = new UserCourseReport();
    report.modules = this.course.modules.length;
    report.topics = total;
    report.pending = total - completed;
    report.completed = completed;
    report.total = total;
    report.projectApplied = projectApplied;

    this.report = report;
    //this.reportData.push({ "label": "Topics Due", "value": topicDelayed });
    //console.log(this.reportData);
    this.displayReport();
  }

  displayReport() {
    this.reportData = [];
    this.reportData.push({ label: 'Modules', value: this.report.modules });
    this.reportData.push({ label: 'Topics', value: this.report.topics });
    this.reportData.push({ label: 'Completed', value: this.report.completed });
    this.reportData.push({ label: 'Pending', value: this.report.pending });

    this.reportData.push({
      label: 'Percentage',
      value: this.report.getPercentage() + '%',
    });
    this.reportData.push({
      label: 'Project(%)',
      value: this.report.getProjectPercentage() + '%',
    });
  }

  today = new Date();

  getColor(topic) {
    let color = '';

    if (
      topic.status == 'P' &&
      new Date(topic.lectureDate.substr(0, 10)) < this.today
    ) {
      color = 'red';
    }

    return color;
  }

  selectedStatus = 'P';

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

  fTopics = (topic) => {
    switch (this.selectedStatus) {
      case 'ALL': {
        return true;
      }
      case 'P': {
        return !topic.status || topic.status == 'P';
      }
      case 'C': {
        return topic.status == 'C';
      }
      case 'ASSIGNED': {
        return topic.lectureDate != null;
      }
      case 'PROJECT': {
        return topic.reviewStatus == 'A';
      }
      default: {
        return false;
      }
    }
  };

  filteredTopics: any;

  getTopics(m) {
    let topics = m.topics.filter(this.fTopics);
    this.filteredTopics = topics;
    return topics;
  }
}
