import { Component, OnInit, HostListener, ViewChild, ElementRef } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

import * as _ from 'lodash';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ClipboardService } from 'ngx-clipboard';
import { CourseService } from 'projects/course/src/public-api';

declare var hljs: any;

export enum KEY_CODE {
  RIGHT_ARROW = 39,
  LEFT_ARROW = 37
}


@Component({
  selector: 'app-batch-course-content',
  templateUrl: './batch-course-content.component.html',
  styleUrls: ['./batch-course-content.component.css']
})
export class BatchCourseContentComponent implements OnInit {
  
  pageNo:number =0;
  totalPages:number;
  courseId:string;
  breadcrumbItems=[];

  constructor(private courseService:CourseService, private router:Router, private route:ActivatedRoute,
    private toastr:ToastrService, private _clipboardService: ClipboardService,
    public sanitizer: DomSanitizer) {
    this.route.parent.params.subscribe(params=>{
      this.courseId = params["courseId"];
    });
   }

  ngOnInit(): void {
    this.list();
  }

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    console.log(event.key , this.pageNo);

    if (event.keyCode === KEY_CODE.RIGHT_ARROW) {
      this.nextPage(this.pageNo);
    }

    if (event.keyCode === KEY_CODE.LEFT_ARROW) {
      this.previousPage(this.pageNo);
    }
  }

  contentList:any;

  contents:any;

  list(){
    this.courseService.getCourseContents(this.courseId).subscribe(res=>{
      this.contentList = res;
      if(this.contentList.length > 0 ){        
        this.totalPages = this.contentList.length;
        this.nextPage(this.pageNo);
      
      }
      this.createReport(res);
      
    });
  }

  nextPage(pageNo){
    if(pageNo>=0 && pageNo<this.totalPages){
      let data = this.contentList[pageNo];
      let contents = [];
      contents.push(data);
      this.contents = contents;
      this.pageNo = pageNo + 1;
    }
  }

  
  previousPage(pageNo){
    
    if(pageNo>1 && pageNo<=this.totalPages){
      console.log("Previous: Page No:" + pageNo);
      let data = this.contentList[pageNo-2];
      let contents = [];
      contents.push(data);
      this.contents = contents;    
      this.pageNo = pageNo - 1;
    }
  }

  goto(pageNo){
    if(pageNo > 0 && pageNo<= this.totalPages){ 
      let data = this.contentList[pageNo-1];
      let contents = [];
      contents.push(data);
      this.contents = contents;
    }
  }

  fileName = "https://gist.githubusercontent.com/nareshkumar-h/970d3d89ce7ad0404af95d386e3b888e/raw/212a0a25522320286dacbefa54d8a8a07e20d333/EnhancedForLoop.java";

  getGistId(url){
       let id = url.substring(url.lastIndexOf("/")+1);
    console.log(id);
    return id;
  }

  files:any = {};
  selectedFiles:any;

  code = `function myFunction() {
    document.getElementById("demo1").innerHTML = "Hello there!";
    document.getElementById("demo2").innerHTML = "How are you?";
  }`;


  lang = ["sql","java","html","js"];
  
  viewFile(contentObj){
    console.log(contentObj);
    //let id = url.substring(url.lastIndexOf("/")+1);
    //console.log(id);
    /*this.githubService.getGistFile(contentObj.url).subscribe ( res=>{  
      console.log(res);
      let files = res["files"];
      console.log(files);
      let fileNames = Object.keys(files);
      console.log(fileNames);
      for(let fName of fileNames){
        let obj = files[fName];
        this.files[fName] = obj.content;
      }
      
    });*/
  }

  copySuccess(){
    this.toastr.success("Copied");
  }
  callServiceToCopy(content){
    this._clipboardService.copyFromContent(content);
    this.toastr.success("Copied","",{timeOut:1000});
  }


  update(c,index,status){
    console.log(c, index);
    this.contents.splice(index,1);
    if ( status == 'C'){
      this.toastr.success("Success",null, {timeOut:1000});
    }
    else if (status == 'S'){
      this.toastr.info("Skipped",null, {timeOut:1000});
    }
  }


  
  reportData: any = [];
  widgetColors = ["purple-plum", "blue-madison", "green-haze", "purple-plum", "red-intense","blue-madison"];

  contentTypes = {"V":"Videos", "L": "Links", "C" : "Code","I":"Images", "P": "PDF"};

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



  @ViewChild('code')
  codeElement: ElementRef;
  
  ngAfterViewInit() {
    //hljs.highlightBlock(this.codeElement.nativeElement);
  }


}
