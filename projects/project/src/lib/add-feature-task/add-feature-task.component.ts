import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'projects/auth/src/public-api';
import { CategoryService } from 'projects/course/src/lib/category.service';
import { CourseService } from 'projects/course/src/public-api';
import { ProjectService } from '../project.service';

@Component({
  selector: 'lib-add-feature-task',
  templateUrl: './add-feature-task.component.html',
  styleUrls: ['./add-feature-task.component.css']
})
export class AddFeatureTaskComponent implements OnInit {

  projectId;
  feature;
  loggedInUsername;
  taskType:string;

  taskCategories = [];
  constructor(private projectService:ProjectService, private route:ActivatedRoute, private router:Router, private authService:AuthService,
    @Inject(MAT_DIALOG_DATA) public data: any, private dialog:MatDialog,
    private toastr:ToastrService) { 
    console.log(data);
      this.feature = data['feature'];
      this.projectId = data['projectId'];
      this.taskType = data['taskType'];
      //this.loggedInUser = this.authService.getLoggedInUsername();
  }

  

  today:string = new Date().toJSON().substr(0,10);
  
  task = { featureId : null, sprintNo: 5, name: null, category:null, estimation:1, assignedTo: this.authService.getSelectedUser()};

  ngOnInit(): void {
      console.log(this.taskType);
      if (this.taskType =="BUG"){
        this.taskCategories  = [{name:"BUG", description:"BUG"},
        {name:"IMPROVEMENT", description:"IMPROVEMENT"},
        {name:"TESTING", description:"TESTING"}];
        this.task.category = this.taskType;
      }
      else{
        this.taskCategories  = [{name:"DESIGN", description:"Design Webpage"},{name:"MOCKAPI", description:"Integrate Mock API"}, {name:"RESTAPI", description:"Develop REST API"}, {name:"TESTCASE", description:"Develop Test Cases"},
        {name:"ANGULAR", description:"Develop page in Angular"},
        {name:"CODEQUALITY", description:"Improve Code Quality"}];
      }
  }

  changeAssignTo(){
    this.task.name = this.taskCategories.find(obj=>obj.name==this.task.category).description;
    if(this.taskType == "BUG"){
      this.task["assignedTo"] = this.feature.assignedTo;
    }
    else {
      this.task["assignedTo"] = this.authService.getLoggedInUsername();
    }
    console.log(this.task.assignedTo);
  }

  save(){
    
    
      this.task["assignedTo"] = this.taskType == "BUG" ? this.feature.assignedTo : this.authService.getLoggedInUsername();
    
    this.task["featureId"] = this.feature.id;
    console.log(this.task);
    this.projectService.addTask(this.feature.id,this.task).subscribe (res=>{
      console.log(res);
      this.toastr.success("Success");
      if(this.task.category == "BUG"){
       // this.updateFeatureStatus(this.feature.id);
      }
      else{
        this.dialog.closeAll();
      }
      
    //  this.router.navigate(['projects/' + this.projectId + "/features/" + this.authService.getLoggedInUsername()])
    });
  }

  
  
  cancel(){
    this.dialog.closeAll();
  }

}
