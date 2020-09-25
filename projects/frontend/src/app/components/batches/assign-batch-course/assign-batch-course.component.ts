import { Component, OnInit, Optional, Inject } from '@angular/core';
import { BatchService } from '../batch.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CourseService } from 'projects/course/src/public-api';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-assign-batch-course',
  templateUrl: './assign-batch-course.component.html',
  styleUrls: ['./assign-batch-course.component.css']
})
export class AssignBatchCourseComponent implements OnInit {

  
  batchId:string;
  assignedCourses:any;
  breadcrumbItems:any  = [ {"icon":"home", "name":"Home","link":"/"},
   {"name":"Batches", "link":"../../batches"}];

  constructor(private batchService:BatchService,private courseService:CourseService, 
     private router:Router, private route:ActivatedRoute, private toastr:ToastrService,
     private dialog:MatDialog, @Optional() @Inject(MAT_DIALOG_DATA) public data: any) { 

     this.batchId = data.batchId;
     this.assignedCourses= data.assignedCourses;

    // this.route.parent.params.subscribe ( params=>{
    //   this.batchId = params["id"];
    //   this.breadcrumbItems.push({name:this.batchId});
    //   this.batchCourse["batchId"] = this.batchId;
    // });

  }

  today:string = new Date().toJSON().substr(0,10);

  ngOnInit(): void {

    this.listCourses();
  }


  batchCourse = { batchId: null, courseId:null, startDate: this.today, endDate:this.today, days:null};
  
  batchCourses:any;

  courses:any;

  listCourses(){
    this.courseService.list().subscribe (res=>{
      let data:any= res;
      this.courses= data.filter(obj=>this.assignedCourses.indexOf(obj.code) ==-1);
    });
  }

  save(batchCourse){
    console.log(batchCourse);
    this.batchService.assignCourse(this.batchId, batchCourse).subscribe(res=>{
      this.toastr.success("Successfully assigned course to batch");
      //this.router.navigate(['batches/'+ this.batchId +"/courses"]);
      this.dialog.closeAll();
    },
    err=>{
      console.error(err);
    });
  }

  cancel(){
    //this.router.navigate(['batches/'+ this.batchId+"/courses"]);
    this.dialog.closeAll();
  }



}
