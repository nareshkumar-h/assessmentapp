import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'projects/auth/src/public-api';
import { ProjectService } from '../../project.service';

@Component({
  selector: 'lib-add-task-issue',
  templateUrl: './add-task-issue.component.html',
  styleUrls: ['./add-task-issue.component.css']
})
export class AddTaskIssueComponent implements OnInit {

  
  
  projectId;
  feature;
  loggedInUsername;
  taskName;
  constructor(private projectService:ProjectService, private route:ActivatedRoute, private router:Router, private authService:AuthService,
    @Inject(MAT_DIALOG_DATA) public data: any, private dialog:MatDialog,
    private toastr:ToastrService) { 
    console.log(data);
      this.feature = data['feature'];
      this.projectId = data['projectId'];
      let task =  data['task'];
      this.taskName = task.name;
      this.task  = { name: '',  description: '', featureId : task.featureId, sprintNo: task.sprintNo, assignedTo: task.assignedTo, estimation:1 }
      this.task.category = "BUG";
      this.task.issueType = 1;
      //this.loggedInUser = this.authService.getLoggedInUsername();
  }

  issueTypes = [{id:1, name:"Major"},
  {id:2, name:"Minor"},
  {id:3, name:"Improvement"},
  {id:4, name:"Code Violation"}
];

  today:string = new Date().toJSON().substr(0,10);
  
  task;

  ngOnInit(): void {
    
  }

 
  save(){
    
    this.task["featureId"] = this.feature.id;
    console.log(this.task);


    this.projectService.addTask(this.feature.id,this.task).subscribe (res=>{
      console.log(res);
      this.toastr.success("Success");
      if ( this.task.issueType == 1 || this.task.issueType == 2){
        this.updateFeatureStatus(this.feature.id);
      }
      this.dialog.closeAll();

    //  this.router.navigate(['projects/' + this.projectId + "/features/" + this.authService.getLoggedInUsername()])
    });
  }

  createIssue(){
    
  }

  updateFeatureStatus(featureId){
    let status="INPROGRESS";
    this.projectService.updateFeatureStatus(featureId, status).subscribe(res=>{
      this.toastr.success("Feature moved to " + status);
      //this.ngOnInit();
      this.dialog.closeAll();
    });
  }
  
  cancel(){
    this.dialog.closeAll();
  }



}
