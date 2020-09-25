import { Component, OnInit } from '@angular/core';
import { BatchService } from '../batch.service';
import { CourseService } from 'projects/course/src/public-api';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { EditBatchComponent } from '../edit-batch/edit-batch.component';

@Component({
  selector: 'app-view-batch-detail',
  templateUrl: './view-batch-detail.component.html',
  styleUrls: ['./view-batch-detail.component.css']
})
export class ViewBatchDetailComponent implements OnInit {

  
  batchId:string;
  breadcrumbItems:any  = [ {"icon":"home", "name":"Batches", "link":"../../batches"}];

  constructor(private dialog:MatDialog,private batchService:BatchService,private courseService:CourseService,  private router:Router, private route:ActivatedRoute) { 

    this.route.params.subscribe ( params=>{
      this.batchId = params["id"];
      this.breadcrumbItems.push({name:this.batchId});
    });

  }

  ngOnInit(): void {

    this.findBatch();
    this.list();
  }

  batch:any;

  findBatch(){
    this.batchService.findOne(this.batchId).subscribe (res=>{
      this.batch = res;
    });
  }

  
  batchCourses:any;

  list(){
    this.batchService.listCourses(this.batchId).subscribe (res=>{
      this.batchCourses = res;
      this.createReport(this.batchCourses);
    });
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

  editDialog(){
    
    const dialogRef = this.dialog.open(EditBatchComponent,{width: '800px',data:{batch:this.batch}});
    
    dialogRef.afterClosed().subscribe(result => {
      this.list();
    });
  }

}
