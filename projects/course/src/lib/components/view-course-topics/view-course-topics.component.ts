import { Component, OnInit, Input } from '@angular/core';
import { CourseService } from './../../course.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { EditCourseComponent } from '../edit-course/edit-course.component';

@Component({
  selector: 'ct-view-course-topics',
  templateUrl: './view-course-topics.component.html',
  styleUrls: ['./view-course-topics.component.css']
})
export class ViewCourseTopicsComponent implements OnInit {

  
  @Input()
  course:any;

  courseId:string;

  showSidebar=true;

  breadcrumbItems:any  = [ {"icon":"home", "name":"Home","link":"/"},
   {"name":"Courses", "link":"../"}];


  constructor(private courseService:CourseService, private router:Router, private route:ActivatedRoute,
    private toastr: ToastrService, public dialog: MatDialog) { 

    this.route.parent.params.subscribe ( params=>{
      this.courseId = params["id"];
      this.breadcrumbItems.push({"name": this.courseId});
    });

  }

  ngOnInit(): void {

    this.course = this.courseService.getCourse();
    this.loadMenus();
    this.courseId = this.course.code;
  }



  menus:any;

  loadMenus(){
    this.menus = [];
    this.menus.push( {title: "Back",  path:["../"], icon:"fas fa-arrow-left", access: true});
    this.menus.push( {title: "Curriculum",  path:["/courses",this.courseId], icon:"fas fa-book-open", access: true});
    this.menus.push( {title: "Plan",  path:[ "plan"], icon:"fas fa-book-open", access: true});
    this.menus.push( {title: "Questions",  path:["questions"], icon:"fas fa-question", access: true});
    this.menus.push( {title: "Contents",  path:["contents"], icon:"fas fa-book-open", access: true});
 
    
  }




}
