import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AddFeatureTaskComponent } from '../add-feature-task/add-feature-task.component';
import { ProjectService } from '../project.service';

@Component({
  selector: 'lib-feature-tasks',
  templateUrl: './feature-tasks.component.html',
  styleUrls: ['./feature-tasks.component.css']
})
export class FeatureTasksComponent implements OnInit {

  @Input()
  featureId:number;

  projectId;

  constructor(private dialog:MatDialog,private projectService:ProjectService, private toastr:ToastrService, private router:Router, private route:ActivatedRoute) { 
    this.route.parent.params.subscribe(params=>{
      this.projectId = params["projectId"];
    })
  }

  ngOnInit(): void {
    this.listTasks();
  }

  projectTasks:any=[];

  listTasks(){
    this.projectService.listFeatureTasks(this.projectId, this.featureId).subscribe(res=>{
      console.log(res);
      this.projectTasks = res;
    });
  }

  addTask(){
    let taskName = prompt("Enter task name");
    if(taskName && taskName.length>0){
      let task = { name: taskName , description:"", estimation:1, featureId : this.featureId};
      this.projectService.addTask(this.projectId, this.featureId, task).subscribe(res=>{
        this.toastr.success("Successfully Added Task");
        this.listTasks();
      });
    }
  }

  updateStatus(taskId,status){
    this.projectService.updateTaskStatus(this.projectId,taskId,status).subscribe(res=>{
      this.toastr.success("Task Status Updated");
      this.listTasks();
    })
  }

  
  
  openDialog(module){
    console.log(this.dialog);
    const dialogRef = this.dialog.open(AddFeatureTaskComponent, {data: { moduleObj :module} });
    console.log(dialogRef);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      this.listTasks();
    });
  }


  deleteTask(taskId,status){
    let cfm=confirm("Do you want to delete ?");
    if(cfm){
      this.projectService.deleteTask(this.projectId,taskId).subscribe(res=>{
        this.toastr.success("Task Deleted");
        this.listTasks();
      })
  }
  }
}

