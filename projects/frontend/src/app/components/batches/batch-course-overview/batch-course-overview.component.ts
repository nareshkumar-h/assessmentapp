import { Component, OnInit } from '@angular/core';
import { BatchService } from '../batch.service';
import { CourseService } from 'projects/course/src/public-api';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-batch-course-overview',
  templateUrl: './batch-course-overview.component.html',
  styleUrls: ['./batch-course-overview.component.css']
})
export class BatchCourseOverviewComponent implements OnInit {

  
  batchId:string;
  courseId:string;

  breadcrumbItems:any  = [ {"icon":"home", "name":"Home","link":"/"},
  {"name":"Batches", "link":"../../batches"}];

  constructor(private batchService:BatchService, private courseService:CourseService,private route:ActivatedRoute) { 

    this.route.parent.params.subscribe ( params=>{
      this.batchId = params["id"];
      this.courseId = params["courseId"];
      
      this.breadcrumbItems.push({name:this.batchId, link:"../"});      
      this.breadcrumbItems.push({name:"Courses" , link:"../"});
       this.breadcrumbItems.push({name: this.courseId});
    });
  }


  ngOnInit(): void {
    this.findCourse();
  }

  
  course:any;

  findCourse(){
    this.courseService.findOne(this.courseId).subscribe (res=>{
      this.course = res;
    });
  }

}
