import { Component, OnInit } from '@angular/core';

import { AuthService } from 'projects/auth/src/public-api';
import { ActivatedRoute, Router } from '@angular/router';
import { UserCourseService } from '../../usercourse.service';
import { ToastrService } from 'ngx-toastr';
import * as _ from 'lodash';

@Component({
  selector: 'uc-available-course-list',
  templateUrl: './available-course-list.component.html',
  styleUrls: ['./available-course-list.component.css']
})
export class AvailableCourseListComponent implements OnInit {

  userId:string;
  selectedCategory:string;
  showSidebar=true;
  

  breadcrumbItems:any  = [ {"icon":"home", "name":"Home","link":"/"},
  {"name":"Courses"}];

  constructor(private userCourseService:UserCourseService,  private authService:AuthService, private route: ActivatedRoute, private router:Router,
    private toastr:ToastrService) {

    this.userId = this.authService.getLoggedInUsername();
    this.loadMenus();
    this.route.params.subscribe (params=>{
    
      //this.userId = params['userId'];
      this.selectedCategory = params['category'];
      console.log("category-" + this.selectedCategory);
      this.listCourses();
      
    });

   }

  ngOnInit(): void {
    //this.listCourses();
  }

  courses:any ;
  filteredCourses:any;

  filterCourses(category){
    this.selectedCategory = category;
    if(category=='All'){
      this.filteredCourses = this.courses;
    }
    else{
      this.filteredCourses = this.courses.filter(c=>c.category == category);
    }
  }

  back(){
    window.history.back();
  }

  categoryData:any;

  listCourses(){
    this.courses = {};      
    this.userCourseService.listAvailableCourses(this.userId).subscribe (res=>{      
       //console.log(JSON.stringify(res));        
        let coursesData= res["courses"];        
        this.courses= coursesData;      
        this.filteredCourses = this.courses;  
        this.selectedCategory = "All";
        let categoryData=  _.groupBy(this.courses, obj => obj.category);
        //console.log("CategoryData")
        //console.log(JSON.stringify(categoryData));
        this.categoryData= categoryData;
        
        this.categories = Object.keys(categoryData);
        this.loadCategoryMenus(this.categories);
        
        /*let courses = [];
        for(let c of this.categories){
          let courseList = coursesData[c];
          courses.push( ... courseList);
        }
        this.courses= courses;*/
    
        //this.createReport(this.courses,this.categories, res["noOfCourses"]);
    });
 
  }
  
  reportData:any = [];
  widgetColors= [ "purple-plum","green-haze","blue-madison"];

  createReport(courses, categories, noOfCourses){
    //console.log(JSON.stringify(data));
    this.reportData=[];

    let topics = 0;
    for ( let c of categories){
      let courseList = courses[c];
      for( let course of courseList){
        topics+= course.noOfTopics;
      }
    }
    
    this.reportData.push({"label":"Courses", "value":noOfCourses});
    this.reportData.push({"label": "Categories", "value": categories.length});
    this.reportData.push({"label": "Topics", "value": topics });
    
  }

  categories = ["Java","Database","Web","JEE","Testing","Cloud","Project Management","Tools","DevOps","Quality","Best Practices"];


  getPercentage = function (obj) {        
    var percentage = 0;
    if (obj.completed_topics > 0) {
        percentage = Math.round(100 * obj.completed_topics / (obj.no_of_topics));
    }
    return percentage;

  };

  
  navigate(routeLink, sidebarPath) {
    //console.log(routeLink, sidebarPath);
    this.router.navigate([{ outlets: { primary: routeLink, sidebar: sidebarPath } }]);
  }

  menus:any= [];

  loadMenus(){
    //this.menus = [];

    //this.menus.push( {title: "Back",  path:["../../dashboard"], icontype:"fas fa-arrow-left", access: true});
    //this.menus.push( {title: "Dashboard",  path:["../coursedashboard"], icontype:"fas fa-book-open", access: true});
    //this.menus.push( {title: "My Courses",  path:["../courses"], icontype:"fas fa-book-open", access: true});
    //this.menus.push( {title: "Available Courses",  path:[ "../availablecourses"], icontype:"fas fa-book-open", access: true});    
    
  }

  loadCategoryMenus(categories){
    this.menus = [];

    this.menus.push( {title: "Back",  path:["../../../dashboard"], icontype:"fas fa-arrow-left", access: true});
   
    this.menus.push( {title: "All",  path:["../"], icontype:"", access: true});
    for (let category of categories){
      this.menus.push( {title: category,  path:["../"+ category], icontype:"", access: true});
    }
  }

  viewCourse(course){
    this.router.navigate(["learn/" +  course.code + "/" + course.title ],{queryParams:{"view":"enroll"}});
  }

  enrollCourse(course){
    let courseId = course.code;
    let cfm = confirm("Do you want to enroll course -" + courseId +"?");
    if(cfm){
      this.userCourseService.enrollCourse(this.userId, courseId).subscribe( res=>{
        console.log(res);
        this.toastr.success("Successfully Enrolled to Course -" + courseId);
        //this.listCourses();
        this.viewCourse(course);
      });
    }

  }
}
