import { Component, OnInit } from '@angular/core';
import { CourseService } from '../../course.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import * as _ from 'lodash';

@Component({
  selector: 'app-view-course',
  templateUrl: './view-course.component.html',
  styleUrls: ['./view-course.component.css']
})
export class ViewCourseComponent implements OnInit {

  courseId:string;

  showSidebar=true;

  breadcrumbItems:any  = [ 
   {"icon":"home","name":" Courses", "link":"../"}];


  constructor(private courseService:CourseService, private router:Router, private route:ActivatedRoute,
    private toastr: ToastrService, public dialog: MatDialog) { 

    this.route.params.subscribe ( params=>{
      this.courseId = params["id"];
      //this.breadcrumbItems.push({"name": this.courseId});
    });

  }

  ngOnInit(): void {

    this.loadMenus();
    this.findCourse();
    //this.listSections();
  }

  course:any;
  sections:any;

  findCourse(){
    this.courseService.findOne(this.courseId).subscribe (res=>{
      console.log(res);
      this.course = res;
      this.courseService.setCourse(this.course);
      this.breadcrumbItems.push({"name": this.course.title});
      //this.listSections();
    });
  }

  listSections(){
    this.courseService.listSections(this.course.id).subscribe (res=>{
      this.sections = res;
      //this.loadModulesMenus(this.sections);
      //this.loadContents(this.sections);
    });
  }

  pageName:string = "overview";

  contents:any;
  loadContents(sections){
    this.courseService.getCourseContents(this.courseId).subscribe(res=>{
      let data = res;
      this.contents = _.groupBy(data,obj=>obj["title"]); 
    });
  }

  loadModulesMenus(sections){
    
    this.menus.push( {title: "Content", icontype:"fas fa-leaf", access: true});
    for(let m of sections){
    
      let title = m.title ;
      this.menus.push( {title: title,  path:["/courses",this.courseId, "modules",m.id,m.title], icontype:"", access: true});
      
    }
  }

  download(){
    console.log("Download" + this.courseId);
    this.courseService.download(this.courseId).subscribe (data=>{
      console.log(data);
      var downloadURL = window.URL.createObjectURL(data);
      var link = document.createElement('a');
      link.href = downloadURL;
      link.download = this.courseId +".json";
      link.click();
    });
  }


  publish(){
    this.courseService.publish(this.courseId).subscribe (res=>{
      console.log(res);
      this.toastr.success("Published Successfully");
      this.findCourse();
    });
  }

  menus:any;

  loadMenus(){
    this.menus = [];
    this.menus.push( {title: "Back",  path:["../"], icontype:"fas fa-arrow-left", access: true});
    this.menus.push( {title: "Overview",  path:["/courses",this.courseId], icontype:"fas fa-book-open", access: true});
    this.menus.push( {title: "Curriculum",  path:["/courses",this.courseId ,"curriculum"], icontype:"fas fa-book-open", access: true});
    this.menus.push( {title: "Topics",  path:["/courses",this.courseId ,"topics"], icontype:"fas fa-book-open", access: true});
    this.menus.push( {title: "Contents",  path:["/courses",this.courseId ,"contents"], icontype:"fas fa-book-open", access: true});
    this.menus.push( {title: "Questions",  path:["/courses",this.courseId ,"questions"], icontype:"fas fa-book-open", access: true});
    //this.menus.push( {title: "Plan",  path:[ "plan"], icontype:"fas fa-calendar", access: true});
    //this.menus.push( {title: "Contents",  path:["contents"], icontype:"fas fa-book", access: true});
    // this.menus.push( {title: "Questions",  path:["questions"], icontype:"fas fa-question", access: true});
    // this.menus.push( {title: "Access",  path:["access"], icontype:"fas fa-lock", access: true});
    
  }

  

}
