import { Component, OnInit } from '@angular/core';
import { CourseService } from '../../course.service';

import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'ct-add-section',
  templateUrl: './add-section.component.html',
  styleUrls: ['./add-section.component.css']
})
export class AddSectionComponent implements OnInit {

  
  courseId:string;

  showSidebar = true;

  breadcrumbItems  = [ {"icon":"home", "name":"Home","link":"/"},
   {"name":"Courses"}];
   
  constructor(private courseService:CourseService, private router:Router,
    private route:ActivatedRoute) {
      this.route.parent.params.subscribe ( params=>{
        this.courseId = params["id"];
      });
   }

  ngOnInit(): void {
    this.findOne();
  }

  module = { title: null,  status:"DRAFT"};

  categories:any;

  course:any;
  findOne(){
    
    this.courseService.findOne(this.courseId).subscribe(res=>{
      this.course = res;
    });
  }

  save(module){
    console.log(module);
    this.module["courseId"] = this.course.id;
    this.courseService.addSection(this.course.id,module).subscribe( res=>{
      console.log(res);
      this.router.navigate(["courses/"+ this.courseId + "/curriculum" ]);
    });
  }

  cancel(){
    window.history.back();
  }



}
