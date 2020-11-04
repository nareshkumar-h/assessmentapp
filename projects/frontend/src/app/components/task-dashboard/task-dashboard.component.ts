import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit } from '@angular/core';
import { AuthService } from 'projects/auth/src/public-api';
import { TaskService } from '../../task.service';
import { HighlightJS } from 'ngx-highlightjs';

@Component({
  selector: 'app-task-dashboard',
  templateUrl: './task-dashboard.component.html',
  styleUrls: ['./task-dashboard.component.css']
})
export class TaskDashboardComponent implements OnInit {

  userId:string;
  user:any;
  constructor(private authService:AuthService,     
    private taskService:TaskService,private elementRef:ElementRef,private hljs: HighlightJS) {
    this.user = this.authService.getUser();
    this.userId = this.authService.getSelectedUser();
   }

  ngOnInit(): void {
    this.loadPendingContents();
    this.getContent();
    //this.loadMenus();
  }

  ngAfterViewInit() {
    console.log("after Init");
    this.elementRef.nativeElement.querySelectorAll('pre code').forEach((block) => {
      console.log(block);      
     // this.hljs.initHighlighting();
     this.hljs.initHighlighting();
     this.hljs.lineNumbersBlock(block);
    });
       
  }

  menus = [];

  loadMenus(){
    this.menus = [];
    
    this.menus.push( {title: "Home",  path:[""], icontype:"fas fa-home",  access: true});
    this.menus.push( {title: "Courses",  path:["/learn/courses"], icontype:"fas fa-graduation-cap",  access: this.authService.hasRole(this.user,["U"])});
    this.menus.push( {title: "Projects",  path:["/"+ this.userId + "/myprojects"], icontype:"fas fa-cubes",  access: this.authService.hasRole(this.user,["U"])});
    this.menus.push( {title: "Tasks",  path:["/tasks"], icontype:"fas fa-tasks",  access: this.authService.hasRole(this.user,["T"])});

  }

  courses:any;

  loadPendingContents(){
    this.taskService.getPendingTaskCount(this.userId).subscribe(res=>{
      console.log(res);
      this.courses= res;
    });
  }

  selectedCourse:any;

  contents:any;

  loadPendingCourseContents(courseId){
    this.taskService.getPendingCourseContents(this.userId, courseId).subscribe(res=>{
      console.log(res);
      this.contents= res;
    });
  }

  content:any;

  getContent(){
    let url =  "http://api.knowledgetracker.in/1/1.java";
    this.content = {url:url};
    if(url.indexOf(".java")){
      this.content["contentType"] ="C";
      this.content["language"]="java";
    }
  }

  contentText = `<h1>Welcome</h1>
  <pre>
  <code language="java" class="language-java hljs" >
  class a {}
  </code>
  </pre>
  `;

  navigate(m){
    this.selectedCourse = m;
    this.loadPendingCourseContents(m.courseId);
  }

}
