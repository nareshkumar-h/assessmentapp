import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CourseService } from '../../course.service';

@Component({
  selector: 'app-course-questions',
  templateUrl: './course-questions.component.html',
  styleUrls: ['./course-questions.component.css']
})
export class CourseQuestionsComponent implements OnInit {

  showSidebar = true;    
  courseId:string;
  breadcrumbItems:any  = [ {"icon":"home", "name":"Home","link":"/"},
  {"name":"Courses", "link":"../../courses"}];

  constructor(private courseService:CourseService, private router:Router, private route:ActivatedRoute,
    private toastr:ToastrService) {
    this.route.parent.params.subscribe(params=>{
      this.courseId = params["id"];
      this.breadcrumbItems.push({name: this.courseId , link:"../"});
      this.breadcrumbItems.push({name: "Questions"});
    });
   }

  ngOnInit(): void {
    this.loadMenus();
    this.findCourse();
    this.list();
  }

  course:any;

  findCourse(){
    this.courseService.findOne(this.courseId).subscribe (res=>{
      this.course = res;
    });
  }

  questions:any;

  list(){
    this.courseService.getCourseQuestions(this.courseId).subscribe(res=>{
      this.questions = res;
    });
  }

  delete(questionId){
    this.courseService.deleteCourseQuestion(this.courseId, questionId).subscribe(res=>{
      this.toastr.success("Successfully Deleted");
      this.list();
    },err=>{
      this.toastr.error("Error", err.error.errorMessage);
    });
  }

  menus = [];

  loadMenus(){
    this.menus = [];
    this.menus.push( {name: "Back",  link:["../"], icon:"fas fa-arrow-left",  access: true});

  }

}
