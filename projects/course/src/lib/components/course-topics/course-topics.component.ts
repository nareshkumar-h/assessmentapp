import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CourseService } from '../../course.service';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { AddCourseTopicComponent } from '../add-course-topic/add-course-topic.component';

@Component({
  selector: 'app-course-topics',
  templateUrl: './course-topics.component.html',
  styleUrls: ['./course-topics.component.css']
})
export class CourseTopicsComponent implements OnInit {

  mode:string;
  
  
  @Input()
  course:any;

  courseId:string;

  
  constructor(private dialog:MatDialog, private courseService:CourseService, private router:Router, private route:ActivatedRoute, private toastr:ToastrService) { 

    this.route.parent.params.subscribe ( params=>{
      this.courseId = params["id"];
    });

  }

  ngOnInit(): void {
    this.courseId = this.course.code;
    this.listModules();
  }

  topics:any;

  

  modules:any;

  moduleTopics = {};

  listModules(){
    this.courseService.listModules(this.courseId).subscribe (res=>{
      this.modules = res;
      this.listTopics();
    });
  }

  listTopics(){
    console.log("listTopics:" + this.courseId);
    this.courseService.listTopics(this.courseId).subscribe (res=>{
      this.moduleTopics = res;
    });
  }
  
  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.modules, event.previousIndex, event.currentIndex);
    let indexData=  { previous: event.previousIndex , current: event.currentIndex};
    console.log(indexData);
  }

  deleteModule(index,moduleId){
    this.courseService.deleteModule(this.courseId,moduleId).subscribe(res=>{
      console.log(res);
      this.modules.splice(index,1);
      this.toastr.success("Successfully Deleted");
    },
    err=>{
      this.toastr.error("Error" , err.error.errorMessage);
    })
  }

  
  deleteTopic(moduleId,topicId){
    this.courseService.deleteTopic(this.courseId,moduleId, topicId).subscribe(res=>{
      console.log(res);
//      this.modules.splice(index,1);
      this.toastr.success("Successfully Deleted Topic");
      this.listTopics();
    },
    err=>{
      this.toastr.error("Error" , err.error.errorMessage);
    })
  }

  
  openDialog(module){
    console.log(this.dialog);
    const dialogRef = this.dialog.open(AddCourseTopicComponent, {data: { moduleObj :module} });
    console.log(dialogRef);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      this.listTopics();
    });
  }

  selectedModule:number;
}
