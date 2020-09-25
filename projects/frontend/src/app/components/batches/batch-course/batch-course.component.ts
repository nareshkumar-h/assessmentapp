import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BatchService } from '../batch.service';
import { CourseService } from 'projects/course/src/public-api';


@Component({
  selector: 'app-batch-course',
  templateUrl: './batch-course.component.html',
  styleUrls: ['./batch-course.component.css']
})
export class BatchCourseComponent implements OnInit {

  batchId:string;
  courseId:string;

  breadcrumbItems:any  = [ {"icon":"home", "name":"Home","link":"/"},
  {"name":"Batches", "link":"../../batches"}];

  constructor(private batchService:BatchService, private courseService:CourseService,private route:ActivatedRoute) { 

    this.route.params.subscribe ( params=>{
      console.log("Params:" ,JSON.stringify(params));
      this.batchId = params["id"];
      this.courseId = params["courseId"];
      console.log("CourseId:" + this.courseId);
      this.breadcrumbItems.push({name:this.batchId, link:"../"});      
      this.breadcrumbItems.push({name:"Courses" , link:"../"});
       this.breadcrumbItems.push({name: this.courseId});
    });
  }

  ngOnInit(): void {

    this.loadMenus();
  }

  menus:any = [];

  loadMenus(){
    this.menus = [];
    this.menus.push( {title: "Back",  path:["../"], icontype:"fas fa-arrow-left", access: true});
    this.menus.push( {title: "Overview",  path:[ "../" + this.courseId + "/overview"], icontype:"fa-asterisk fas", access: true});
    this.menus.push( {title: "Topics",  path:[ "../" + this.courseId + "/topics"], icontype:"fa-chalkboard-teacher fas", access: true});
    this.menus.push( {title: "Plan",  path:[ "../" + this.courseId + "/plan"], icontype:"fas fa-calendar", access: true});
    this.menus.push( {title: "Content",  path:[ "../" + this.courseId + "/content"], icontype:"fas fa-book-open", access: true});
    
  }



}
