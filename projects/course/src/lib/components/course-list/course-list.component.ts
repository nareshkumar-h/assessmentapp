import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CourseService } from '../../course.service';
import { MatDialog } from '@angular/material/dialog';
import { AddCourseComponent } from '../add-course/add-course.component';
import { CategoryService } from '../../category.service';
import { AuthService } from 'projects/auth/src/public-api';


@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css']
})
export class CourseListComponent implements OnInit {

  breadcrumbItems = [{ "icon": "home", "name": "Home", "link": "/" },
  { "name": "Courses" }];

  showSidebar = true;
  loggedInUser:any;
  

  constructor(public dialog: MatDialog, private courseService: CourseService, private authService:AuthService, private toastr: ToastrService, private route: ActivatedRoute, private router: Router,
    private categoryService:CategoryService) {
      this.loggedInUser = this.authService.getUser();

    this.route.queryParams
      .subscribe(params => {
        this.selectedCategory = params['category'] ? params['category'] : "ALL";
        // console.log(this.selectedCategory);   

      });
  }

  ngOnInit(): void {
    this.loadMenus();
    this.list();
    this.listCategories();
    
  }

  courses: any;

  selectedCategory: string;

  courseMap: any = {};

  categories: any = [];

  categoryList:any;

  listCategories(){
    this.categoryService.list().subscribe(res=>{
      this.categoryList = res;
    });
  }

  list() {
    this.courseService.list().subscribe(res => {
      this.courses = res;
      this.courses.filter(c => { if (this.categories.indexOf(c.category) == -1) this.categories.push(c.category); });
      this.categories.unshift("ALL");
      for (let category of this.categories) {
        this.courseMap[category] = this.courses.filter(c => category == 'ALL' || c.category == category);
      }
      this.createReport(this.courses, this.categories.length);
    });
  }





  reportData: any = [];
  widgetColors = ["purple-plum", "blue-madison", "green-haze", "red-intense", "blue-madison", "red-intense"];

  createReport(data, categories) {

    this.reportData = [];
    let total = data.length;

    let topics = data.reduce(function (sum, obj) { return sum + obj.noOfTopics }, 0);
    this.reportData.push({ "label": "Courses", "value": total });
    this.reportData.push({ "label": "Category", "value": categories });
    this.reportData.push({ "label": "Topics", "value": topics });

  }

  // menus = "Add Course";

  // @Output() menu = new EventEmitter();
  // public sendMenus() {
  //   console.log("Send Menus called from courselist");
  //   this.menu.emit(this.menus);
  // }

  menus:any;

  navigate(routeLink, sidebarPath) {
    console.log(routeLink, sidebarPath);
    //this.router.navigate([{ outlets: { primary: routeLink, sidebar: sidebarPath } }]);
    this.router.navigate(routeLink);
  }

  publish(course) {

    this.courseService.publish(course.code).subscribe(res => {
      console.log(res);
      this.toastr.success("Published Successfully");
      course.status = "PUBLISHED";
    });
  }


  loadMenus(){
    this.menus = [];
    this.menus.push( {title: "Back",  path:["../"], icontype:"fas fa-arrow-left",  access: true});
    this.menus.push( {title: "Courses",  path:["/courses"], icontype:"fas fa-graduation-cap",  access: true});
    this.menus.push( {title: "Categories",  path:["/categories"], icontype:"fas fa-book",  access: true});
  }  

  move(index, action){
    console.log(index, action);
    alert(index + "-" + action);
    if(action=="UP"){
      
    }
    else if (action=="DOWN"){

    }
  }

  openDialog(){
    
    const dialogRef = this.dialog.open(AddCourseComponent,{width: '800px'});
    
    dialogRef.afterClosed().subscribe(result => {
      this.list();
    });
  }

  courseFilter:string;
  

}
