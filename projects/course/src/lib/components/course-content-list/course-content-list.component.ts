import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CourseService } from '../../course.service';
import * as _ from 'lodash';
import { DomSanitizer } from '@angular/platform-browser';

import { MatDialog } from '@angular/material/dialog';
import { AddCourseContentComponent } from '../add-course-content/add-course-content.component';
import { EditCourseContentComponent } from '../edit-course-content/edit-course-content.component';

declare var hljs: any;
  

@Component({
  selector: 'app-course-content-list',
  templateUrl: './course-content-list.component.html',
  styleUrls: ['./course-content-list.component.css']
})
export class CourseContentListComponent implements OnInit {

  showSidebar=true;

  viewAll:boolean = false;
  
  selectedRow:number;  
  courseId:string;
  breadcrumbItems:any  = [ {"icon":"home", "name":"Home","link":"/"},
  {"name":"Courses", "link":"../../courses"}];

  moduleId:string;
  moduleName:string;
  selectedTopic:any;
  constructor(private courseService:CourseService, private router:Router, private route:ActivatedRoute,
    private toastr:ToastrService, public sanitizer: DomSanitizer, public dialog: MatDialog) {
    this.route.parent.params.subscribe(params=>{
      console.log(JSON.stringify(params));
      this.courseId = params["id"];
      console.log(this.moduleName);
      this.breadcrumbItems.push({name: this.courseId});
      this.breadcrumbItems.push({name: this.moduleName});
    });
    
    this.route.params.subscribe(params=>{
      console.log(JSON.stringify(params));
      this.moduleId = params["lectureId"];
      this.moduleName = params["lectureName"];
      this.contents = null;
      this.listContents();
    });
   }

  ngOnInit(): void {
    
  }

  
  course:any;

  contents:any;  
  data:any;
  selectedModule:any;

  listContents(){
    /* this.courseService.getCourseContents(this.courseId).subscribe(res=>{
      let data = res;
      this.data = res;
      this.contents = _.groupBy(data,obj=>obj["moduleName"]);
      let modules = Object.keys(this.contents);
      this.createReport(this.modules,data);
    }); */

    this.courseService.getCourseModuleContents(this.courseId, this.moduleId).subscribe(res=>{
      this.contents = res;
      this.createReport(this.contents);
    });

  }

  
  menus:any = [];

  loadMenus(){
    this.menus = [];
    //this.menus.push( {name: "Back",  link:["../"], icon:"fas fa-arrow-left",  access: true});
//    this.menus.push( {name: "Courses",  link:["/courses"], icon:"fas fa-graduation-cap",  access: true});
  }  

  
  move(index, action){
    console.log(index, action);    
    if(action=="UP"){
      this.toastr.success("Success")
    }
    else if (action=="DOWN"){
      this.toastr.success("Success")
    }
  }

  contentTypes = {"V":"Videos", "L": "Links", "C" : "Code","I":"Images", "P": "PDF"};

  getContentTypeIcon(contentType){
    let type="default";
    if(contentType=="V"){
      type="fa-video";
    }
    else if(contentType=="P"){
      type="far fa-file-pdf";
    }
    else if(contentType=="I"){
      type="fa-image";
    }
    else if(contentType=="C"){
      type="fa-code";
    }
    else if(contentType=="T"){
      type="fa-file-alt";
    }
    else{
      
    }
    return type;
  }
  
  reportData: any = [];
  widgetColors = ["purple-plum", "blue-madison", "green-haze", "purple-plum", "red-intense","blue-madison"];

  refreshReport(){
    this.createReport(this.contents);
  }

  createReport(data) {
    
    this.reportData = [];
    this.reportData.push({ "label": "Contents", "value": data.length });
    let dataByContentTypes=  _.groupBy(data, obj => obj.contentType);
    let keys = Object.keys(dataByContentTypes);
    for( let type of keys){
      let cnt = dataByContentTypes[type].length;
      let label = this.contentTypes[type];
      this.reportData.push({ "label": label, "value": cnt });
    }
    
  //  let total = data.length;

//    let topics = data.reduce(function (sum, obj) { return sum + obj.noOfTopics }, 0);
    
    //this.reportData.push({ "label": "Text", "value": categories });
    //this.reportData.push({ "label": "Topics", "value": topics });

  }

  toggle(){
    this.viewAll = !this.viewAll;
  }

  view(id){
    if(this.selectedRow==id){
      this.selectedRow=null;
    }
    else{
      this.selectedRow = id;
    }
    
  }

  edit(i , mode){
    this.selectedRow =  i;
    this.mode = mode;
  }

  mode:string;
    
  


  addContent(moduleId){    
    this.router.navigate(['../addcontent'],{relativeTo:this.route,queryParams:{}});
   //this.openDialog(contentType);
  }

  openDialog(contentType){
    const dialogRef = this.dialog.open(AddCourseContentComponent,{width: '100%', data:{"courseId":this.courseId, contentType: contentType}});
    
    dialogRef.afterClosed().subscribe(result => {
     // this.list();
    });
  }

  editDialog(content){
    const dialogRef = this.dialog.open(EditCourseContentComponent,{width: '100%', height:'1000', data: {courseId:this.courseId, content:content}});
    
    dialogRef.afterClosed().subscribe(result => {
      this.listContents();
    });
  }
  
  back(){
    window.history.back();
  }

}
