import { Component, OnInit } from '@angular/core';
import { BatchService } from '../batch.service';
import { ActivatedRoute } from '@angular/router';
import { AssignBatchCourseComponent } from '../assign-batch-course/assign-batch-course.component';
import { MatDialog } from '@angular/material/dialog';
import { EditBatchCourseComponent } from '../edit-batch-course/edit-batch-course.component';

@Component({
  selector: 'app-batch-course-list',
  templateUrl: './batch-course-list.component.html',
  styleUrls: ['./batch-course-list.component.css']
})
export class BatchCourseListComponent implements OnInit {

  batchId:string;

  
  breadcrumbItems:any  = [ {"icon":"home", "name":"Home","link":"/"},
  {"name":"Batches", "link":"../../"}];
  
  constructor(public dialog: MatDialog,private batchService:BatchService, private route:ActivatedRoute) {
    this.route.parent.params.subscribe ( params=>{
      this.batchId = params["id"];
      this.breadcrumbItems.push({name:this.batchId});
    })
   }

  ngOnInit(): void {
    this.list();
  }

  
  reportData:any = [];
  widgetColors= [ "purple-plum","green-haze","green-haze","red-intense","blue-madison"];

  createReport(courses){
    this.reportData=[];
    let i =0;
    let total = 0;
    let completed = 0;
    let pending = 0;
    for(let c of courses){
      completed += c.completed_topics;
      pending+=c.pending_topics;
      total+=c.pending_topics + c.completed_topics;
    }
    let percentage = 0;
    if (total>0) {
      percentage= Math.round ( 100*completed/total);
    }
    this.reportData.push({"label":"Courses", "value":courses.length});
    this.reportData.push({"label": "Topics", "value": total});
    this.reportData.push({"label": "Completed", "value": completed });
    this.reportData.push({"label": "Pending", "value": pending});
    this.reportData.push({"label": "Percentage", "value": percentage + "%" });


    

  }

  batchCourses:any;

  list(){
    this.batchService.listCourses(this.batchId).subscribe (res=>{
      this.batchCourses = res;
      this.createReport(this.batchCourses);
    });
  }


  mode:string;

  updateMode(mode){
    this.mode = mode;
  }


  assignCourseDialog(){

    let courseIds = [];
    for(let c of this.batchCourses){      
      courseIds.push(c.course_id);
    }

    
    const dialogRef = this.dialog.open(AssignBatchCourseComponent,{width: '800px', data: {batchId:this.batchId, assignedCourses:courseIds}});
    
    dialogRef.afterClosed().subscribe(result => {
      this.list();
    });
  }

  editCourseDialog(batchCourse){

    let courseIds = [];
    for(let c of this.batchCourses){      
      courseIds.push(c.course_id);
    }

    
    const dialogRef = this.dialog.open(EditBatchCourseComponent,{width: '800px', data: {batchId:this.batchId, course:batchCourse}});
    
    dialogRef.afterClosed().subscribe(result => {
      this.list();
    });
  }
}
