import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CourseService } from '../../course.service';
import { CategoryService } from '../../category.service';

@Component({
  selector: 'app-add-course-module',
  templateUrl: './add-course-module.component.html',
  styleUrls: ['./add-course-module.component.css']
})
export class AddCourseModuleComponent implements OnInit {

  courseId:string;

  showSidebar = true;

  breadcrumbItems  = [ {"icon":"home", "name":"Home","link":"/"},
   {"name":"Courses"}];
   
  constructor(private courseService:CourseService,private categoryService:CategoryService, private router:Router,
    private route:ActivatedRoute) {
      this.route.parent.params.subscribe ( params=>{
        this.courseId = params["id"];
      });
   }

  ngOnInit(): void {

  }

  module = { name: null};

  categories:any;


  save(module){
    console.log(module);
    this.courseService.addModule(this.courseId,module).subscribe( res=>{
      console.log(res);
      this.router.navigate(['courses/'+ this.courseId]);
    });
  }

  cancel(){
    window.history.back();
  }


}
