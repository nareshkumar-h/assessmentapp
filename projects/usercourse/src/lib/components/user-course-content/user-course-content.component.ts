import { Component, OnInit } from '@angular/core';
import { CourseClientService } from '../../course-client.service';
import { ActivatedRoute } from '@angular/router';
import * as _ from 'lodash';
import { UserCourseService } from '../../usercourse.service';
@Component({
  selector: 'uc-user-course-content',
  templateUrl: './user-course-content.component.html',
  styleUrls: ['./user-course-content.component.css']
})
export class UserCourseContentComponent implements OnInit {

  userId:any;
  courseId:any;
  courseCode:any;
  selectedCourse:any;
  constructor(private courseService:CourseClientService, private userCourseService:UserCourseService, private route:ActivatedRoute) { 
    
    this.route.parent.params.subscribe(params=>{
      console.log(params);
      this.courseId =  params["courseId"];
      this.userId =  params["userId"];
    });
    this.selectedCourse = userCourseService.getCourse();
  }

  ngOnInit(): void {
    this.findOne();
  }

  contents:any;
  course:any;

  findOne(){
    this.courseService.findOne(this.courseId).subscribe(res=>{
      console.log(res);
      this.course = res;
      this.findSections();
      this.findContent();
    });
  }

  sections:any;
  findSections(){
    this.courseService.getCourseSections(this.course.id).subscribe (res=>{
      this.sections = res;
    });
  }
  findContent(){
    this.contents = {};
    this.courseService.getCourseContents(this.course.id).subscribe (res=>{
      this.contents= res;
      this.findUserCourseContents();
    });
  }

  userContents:any;
  findUserCourseContents(){
    this.courseService.getUserCourseLectures(this.userId, this.courseId).subscribe(res=>{
      console.log(res);
      this.userContents = res;
      
    });
  }

    
  reportData: any = [];
  widgetColors = ["purple-plum", "blue-madison", "green-haze", "purple-plum", "red-intense","blue-madison"];

  contentTypes = {"V":"Videos", "L": "Links", "C" : "Code","I":"Images", "P": "PDF"};

  createReport(data) {
    
    this.reportData = [];
    this.reportData.push({ "label": "Contents", "value": data.length });
    let dataByContentTypes=  _.groupBy(data, obj => obj.contentType);
    let keys = Object.keys(dataByContentTypes);
    for( let type of keys){
      let cnt = dataByContentTypes[type].length;
      let label = this.contentTypes[type];
      this.reportData.push({ "label": label, "value": cnt });
    }
  }


}
