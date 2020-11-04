import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'projects/auth/src/public-api';
import { UserCourseService } from '../../usercourse.service';
import { CourseClientService } from '../../course-client.service';
@Component({
  selector: 'ct-view-user-course',
  templateUrl: './view-user-course.component.html'
})
export class ViewUserCourseComponent implements OnInit {

  showSidebar = true;
  @Input()
  userId: string;

  @Input()
  courseId: string;
  settings:string;

  selectedCourse:any;
  
  breadcrumbItems:any  = [ {"icon":"home","name":" Courses", "link":"../../courses"}];

  courseName:string;

  enrolled = true;

  constructor(private userCourseService: UserCourseService, private authService:AuthService,private courseClientService:CourseClientService, private route: ActivatedRoute) {
    //this.userId = params["userId"];
    this.userId = this.authService.getLoggedInUsername();
    this.route.params.subscribe(params => {
      
      this.courseId = params["courseId"];
      this.courseName = params["courseName"];
     // this.breadcrumbItems.push({ name: "Courses", link: "coursedashboard",sidelink:"USER_COURSE"});      
      
    });
    this.route.queryParams.subscribe( params=>{
      let view = params["view"];
      if(view=="enroll"){
        this.enrolled = false;
      }
    });
    console.log(this.selectedCourse);
  }

  ngOnInit(): void {

    this.loadMenus();
    let value = localStorage.getItem("COURSE_SETTINGS");
    this.settings = value ? value : "A";

    this.findCourse();
    //this.loadUserCourseContents();
    
  }

  topicData: any;
  courseTopics: any = {};

  page:string = 'topics';
  course: any;

  modules: any;

  userContents:any;
  

  findCourse() {
    
    this.courseClientService.listTopics(this.courseId).subscribe(res => {
      let data = res;
      let course:any = data;
      console.log(course);
      //this.loadSections(this.courseId);
      
      this.breadcrumbItems.push({ name: course.title });

      var modules = data["modules"];
      

      this.course = course;
      //console.log("Before Sorting:" , JSON.stringify(modules));
      modules.sort(this.sortByDisplayOrder);
      //this.loadModulesMenus(modules);
      //console.log("After Sorting:" , JSON.stringify(modules));
      this.modules = modules;
      
      this.courseTopics = this.getCourseTopics(modules);

     // this.listUserTopics(modules, this.courseTopics);
    });
  }

  loadUserCourseContents(){
    this.courseClientService.getUserCourseContents(this.userId, this.courseId).subscribe(res=>{
      console.log(JSON.stringify(res));
      
      let courseData = res;
      this.loadModulesMenus(courseData);
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



  modulePercentage = {};

  // listUserTopics(modules, courseTopics) {
  //   this.userCourseService.listCourseTopics(this.userId, this.courseId).subscribe(res => {
  //     let data = <[]>res;
  //     for (let m of modules) {
  //       let moduleName = m.name;
  //       let topics = courseTopics[moduleName];
        
  //       let moduleTopicCompleted = 0;
  //       let percentage = 0;

  //       var completed = 0;
  //       let total = topics.length;
  //       var newTopics = [];
        
  //         for (let topic of topics) {

  //           const obj = <{}>data.find(t => t["topicId"] == topic["code"]);
            
  //           if (obj) {
  //             topic = { ...topic, ...obj}; 
  //             if (obj["status"] == 'C') {
  //               completed++;
  //               moduleTopicCompleted++;
  //             }
  //             else {
  //               topic["status"] = "P";
  //             }
  //             newTopics.push(topic);

  //             this.modulePercentage[moduleName] = Math.ceil(100 * moduleTopicCompleted / total);
              
  //             this.courseTopics[moduleName] = newTopics;
  //           }
  //         }
        
  //     }

  //     this.createReport(this.courseTopics);
  //   });
  // }


  // updateStatus(topic, checked) {
  //   console.log("Update Status:", topic, checked);
  //   let status = checked ? "C" : "P";
  //   if(topic.id){
  //      this.userCourseService.updateTopicStatus(topic.id, status).subscribe (res=>{
  //        console.log(res);
  //     });
  //   }
  //   else {
  //     this.userCourseService.updateCourseTopicStatus(this.courseId, topic.code, status).subscribe (res=>{

  //     });
  //   }
  // }

  sections:any;

  loadSections(courseId){
    console.log("fetch sections:" + courseId);
    this.courseClientService.getCourseSections(courseId).subscribe(res=>{
      console.log(res);
      this.sections = res;
      //this.loadModulesMenus(this.sections);
      this.loadUserCourseContents();
    });
  }


  reportData: any = [];
  widgetColors = ["green-haze", "purple-plum", "green-haze", "red-intense", "blue-madison", "red-intense"];

  // createReport(data) {

  //   //console.log("Data", JSON.stringify(data));
  //   this.reportData = [];
  //   let i = 0;
  //   let total = 0;
  //   let completed = 0;
  //   let pending = 0;
  //   let totalDuration = 0;
  //   let topicDelayed = 0;
  //   let modules = Object.keys(data);
  //   for (let m of modules) {
  //     let topics = data[m];
  //     for (let c of topics) {
  //       completed += (c.status == 'C' ? 1 : 0);
  //       pending += (c.status == 'P' ? 1 : 0);
  //       // totalDuration += c.duration;
  //       // topicDelayed += ((c.status == 'P' && new Date(c.plannedDate) < this.today) ? 1 : 0);
  //       total += 1;
  //     }
  //   }
  //   let hours = Math.ceil(totalDuration / 60);
  //   let percentage = 0;
  //   if (total>0){
  //     percentage=Math.round(100 * completed / total);
  //   }
  //   this.reportData.push({ "label": "Modules", "value": modules.length });
  //   this.reportData.push({ "label": "Topics", "value": total });
  //   this.reportData.push({ "label": "Completed", "value": completed });
  //   this.reportData.push({ "label": "Pending", "value": total-completed });
  //   this.reportData.push({ "label": "Percentage", "value": percentage + "%" });
  //   //this.reportData.push({ "label": "Topics Due", "value": topicDelayed });
  //   //console.log(this.reportData);

  // }

  today = new Date();

  getColor(topic) {
    let color = "";

    if (topic.status == 'P' && new Date(topic.plannedDate) < this.today) {
      color = 'red';
    }

    return color;
  }

  
	sortByDisplayOrder( a, b ) {
		if ( a.display_order < b.display_order ){
		  return -1;
		}
		if ( a.display_order > b.display_order ){
		  return 1;
		}
		return 0;
  }
  
  menus = [];
  loadMenus(){
    this.menus = [];
    if(this.enrolled){
      this.menus.push( {title: "Back",  path:["../../"], icontype:"fas fa-arrow-left",  access: true});
    }
    else{
      this.menus.push( {title: "Back",  path:["../../availablecourses"], icontype:"fas fa-arrow-left",  access: true});
    }
    this.menus.push( {title: "Curriculum",  path:["../"+ this.courseName], icontype:"fas fa-book-open",  access: true});
    this.menus.push( {title: "Topics",  path:["../" +this.courseName+"/topics"], icontype:"fas fa-leaf",  access: true});
    
    //this.menus.push( {title: "Contents",  path:["contents"], icontype:"fas fa-code",  access: this.enrolled});    
    //this.menus.push( {title: "Questions",  path:["questions"], icontype:"fas fa-question",  access: this.enrolled});
    //this.menus.push( {title: "Settings",  path:["settings"], icontype:"fas fa-gear",  access: true});
  }  

  loadModulesMenus(modules){
    this.menus.push( {title: "Contents", icontype:"fas fa-leaf", path:["contents"], access: true});
    for(let m of modules){
      console.log(m);
      let title = m.sectionName +"( " + m.total +" )";
      this.menus.push( {title: title +"",  path:["sections", m.sectionId,m.sectionName], icontype:"", access: true});
      
    }
  }


}
