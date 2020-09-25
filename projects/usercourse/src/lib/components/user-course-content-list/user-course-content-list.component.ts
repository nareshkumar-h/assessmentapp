import { Component, OnInit, ViewChild, ElementRef, HostListener, Output } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ClipboardService } from 'ngx-clipboard';
import {CourseClientService} from './../../course-client.service';
import { DomSanitizer } from '@angular/platform-browser';

import * as _ from 'lodash';
import { EventEmitter } from 'events';


declare var hljs: any;

export enum KEY_CODE {
  RIGHT_ARROW = 39,
  LEFT_ARROW = 37
}

@Component({
  selector: 'app-user-course-content-list',
  templateUrl: './user-course-content-list.component.html',
  styleUrls: ['./user-course-content-list.component.css']
})
export class UserCourseContentListComponent implements OnInit {

  userId:string;
  pageNo:number =0;
  totalPages:number;
  courseId:string;
  breadcrumbItems=[];
  moduleId:string;
  sectionName:string;

  constructor(private courseService:CourseClientService, private router:Router, private route:ActivatedRoute,
    private toastr:ToastrService, private _clipboardService: ClipboardService,
    public sanitizer: DomSanitizer) {
    this.route.parent.params.subscribe(params=>{
      this.courseId = params["courseId"];
      this.userId = params["userId"];
    });
    this.route.params.subscribe(params=>{
      
      this.moduleId = params["sectionId"];
      this.sectionName = params["sectionName"];
      this.lectures=null;
      this.contents =null;
      this.currentLecture =null;
      this.list();
      this.pageNo=0;
    });
   }

  ngOnInit(): void {
    
  }

  listModules(){
    
  }

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    //console.log(event.key , this.pageNo);

    if (event.keyCode === KEY_CODE.RIGHT_ARROW) {
      this.nextPage(this.pageNo);
    }

    if (event.keyCode === KEY_CODE.LEFT_ARROW) {
      this.previousPage(this.pageNo);
    }
  }

  lectures:any;

  list(){
    this.courseService.getCourseModuleContents(this.courseId, this.moduleId).subscribe(res=>{
      this.lectures = res;
      if(this.lectures.length > 0 ){         
        this.totalPages = this.lectures.length;
        this.nextPage(this.pageNo);
      
      }
      //this.createReport(res);
      
    });
  }

  currentLecture:any;
  contents:any;

  getContent(lectureId){
    console.log("Get content id -" + lectureId)
    this.contents=[];
    //this.content=this.courseService.getCourseContent(id);
     this.courseService.getCourseContent(this.courseId,  lectureId).subscribe(res=>{
       console.log(JSON.stringify(res));
       this.contents = res;
     });
  }

  nextPage(pageNo){
    if(pageNo>=0 && pageNo<this.totalPages){
      let obj = this.lectures[pageNo];
      this.currentLecture = obj;
      this.getContent(obj.id);
      this.pageNo = pageNo + 1;
    }
  }

  currentPage(pageNo){
    
      this.pageNo = pageNo;
      let obj = this.lectures[pageNo-1];
      this.currentLecture = obj;
      this.getContent(obj.id); 
  }
  
  previousPage(pageNo){
    
    if(pageNo>1 && pageNo<=this.totalPages){
      console.log("Previous: Page No:" + pageNo);
      let obj = this.lectures[pageNo-2];
      this.currentLecture = obj;
      this.getContent(obj.id); 
      this.pageNo = pageNo - 1;
    }
  }

  goto(pageNo){
    if(pageNo > 0 && pageNo<= this.totalPages){ 
      let obj = this.lectures[pageNo-1];
      this.currentLecture = obj;
      this.getContent(obj.id); 
    }
  }

  copySuccess(){
    this.toastr.success("Copied");
  }
  callServiceToCopy(content){
    this._clipboardService.copyFromContent(content);
    this.toastr.success("Copied","",{timeOut:1000});
  }


  update(contentId,status){
    
    this.courseService.updateActivity(this.userId,this.courseId,contentId,status).subscribe(res=>{
      this.lectures.splice(this.pageNo-1,1);
      this.totalPages = this.lectures.length;
      if(this.pageNo <= this.totalPages){
        console.log("Next Page" + this.pageNo);
        this.nextPage(this.pageNo-1);
      }
      else if(this.totalPages>0){
        console.log("Current Page" + this.pageNo);      
        this.currentPage(this.pageNo-1);
      }
      else {
        console.log("No pages");
        this.pageNo = 0;
        this.currentLecture =null;
      }
      if ( status == 'C'){
        this.toastr.success("Success",null, {timeOut:1000});
      }
      else if (status == 'S'){
        this.toastr.info("Skipped",null, {timeOut:1000});
      }
    });
    
    //this.createReport(this.lectures);
  }


  
  reportData: any = [];
  widgetColors = ["purple-plum", "blue-madison", "green-haze", "purple-plum", "red-intense","blue-madison"];

  contentTypes = {"V":"Videos", "L": "Links", "C" : "Code","I":"Images", "P": "PDF"};

  createReport(data) {
    
    this.reportData = [];
    this.reportData.push({ "label": "lectures", "value": data.length });
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



  @ViewChild('code')
  codeElement: ElementRef;
  
  ngAfterViewInit() {
    //hljs.highlightBlock(this.codeElement.nativeElement);
  }
  
  


}
