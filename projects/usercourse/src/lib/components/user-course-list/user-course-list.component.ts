import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserCourseService } from '../../usercourse.service';
import { AuthService } from 'projects/auth/src/public-api';
import * as _ from 'lodash';

@Component({
  selector: 'ct-user-course-list',
  templateUrl: './user-course-list.component.html',
  styleUrls: ['./user-course-list.component.css']
})
export class UserCourseListComponent implements OnInit {

  
  userId:string;
  category:string;
  showSidebar=true;

  breadcrumbItems:any  = [ {"icon":"home", "name":"Home","link":"/"},
  {"name":"Courses"}];

  constructor(private userCourseService:UserCourseService, private authService:AuthService, private route: ActivatedRoute, private router:Router) {

    this.userId = this.authService.getSelectedUser();
    this.loadMenus();
    this.route.params.subscribe (params=>{
    
      //this.userId = params['userId'];
      //console.log("category-" + this.category);
      this.listCourses();
      
    });

   }

  ngOnInit(): void {
    this.listCourses();
  }

  userCourses:any;
  
  listCourses(){ 
    this.userCourseService.listCourses(this.userId).subscribe (res=>{        
      let data:any = res;    
      for(let obj of data){
        obj.percentage = this.getPercentage(obj);
      }
      this.userCourses = _.groupBy(data,obj=>obj.category);
     // console.log(this.userCourses);
    });
 
  }

  categories = ["Java","Database","Web","JEE","Testing","Cloud","Project Management","Tools","DevOps","Quality","Best Practices"];


  getPercentage(obj) {        
    
    var percentage = 0;
    if (obj.completed_topics > 0) {
        percentage = Math.round(100 * obj.completed_topics / (obj.no_of_topics));
    }
    return percentage;

  };

  getPercentageColor = function(percentage){
    let color= "black";
    if(percentage>0){
      color = "white";
    }
    return color;
  }

  getCardColor = function(percentage){
    let color = "";
    if(percentage>90){
      color = "cadetblue";
    }
    else if(percentage>75){
      color = "green";
    }
    else if (percentage>50){
      color="orange";
    }
    else if (percentage>25){
      color="orange";
    }
    else if (percentage >0){
      color="indianred";
    }
    else{
      color = "grey";
    }
    return color;
  }
  getPercentageBgColor = function(percentage){
    let color= "";
    if(percentage>90){
      color="cadetblue";
    }
    else if(percentage>75){
      color = "green";
    }
    else if (percentage>50){
      color="orange";
    }
    else if (percentage>25){
      color="orange";
    }
    else if (percentage >0){
      color="indianred";
    }
    else{
      color = "grey";
    }
    return color;
  }

  goTo(course){

    console.log("Selected course");
    console.log(course);
    this.userCourseService.setCourse(course);
    this.router.navigate([ course.course_code + "/" + course.course_name  +"/topics"], { relativeTo: this.route });
  }
  
  navigate(routeLink, sidebarPath) {
    //console.log(routeLink, sidebarPath);
    this.router.navigate([{ outlets: { primary: routeLink, sidebar: sidebarPath } }]);
  }

  menus:any;

  loadMenus(){
    this.menus = [];
    this.menus.push( {title: "Back",  path:["../../dashboard"], icontype:"fas fa-arrow-left", access: true});
    this.menus.push( {title: "Dashboard",  path:["../coursedashboard"], icontype:"fas fa-tachometer-alt", access: true});
    this.menus.push( {title: "My Courses",  path:["../courses"], icontype:"fas fa-graduation-cap", access: true});
   // this.menus.push( {title: "Available Courses",  path:[ "../availablecourses"], icontype:"fas fa-book-open", access: true});    
    //this.menus.push( {title: "Calendar",  path:[ "../calendar"], icontype:"fas fa-calendar", access: true});    
    
  }
}
