import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'projects/auth/src/public-api';
import { ProjectService } from '../../project.service';

@Component({
  selector: 'lib-edit-feature-task',
  templateUrl: './edit-feature-task.component.html',
  styleUrls: ['./edit-feature-task.component.css']
})
export class EditFeatureTaskComponent implements OnInit {

 
  
  projectId;
  feature;
  loggedInUsername;
  constructor(private projectService:ProjectService, private route:ActivatedRoute, private router:Router, private authService:AuthService,
    @Inject(MAT_DIALOG_DATA) public data: any, private dialog:MatDialog,
    private toastr:ToastrService) { 
    console.log(data);
      this.feature = data['feature'];
      this.projectId = data['projectId'];
      this.task = data['task'];
      //this.loggedInUser = this.authService.getLoggedInUsername();
  }

  categories = [{id:"HTML", name:"HTML"},
  {id:"JS", name:"JS"},
  {id:"CSS", name:"CSS"},
  {id:"VALIDATION", name:"VALIDATION"},
  {id:"LOGIC",name:"LOGIC"},
  {id:"API",name:"API"},
  {id:"INTEGRATION", name:"INTEGRATION"},
  {id:"BUG" ,name:"BUG"}];

  today:string = new Date().toJSON().substr(0,10);
  
  task = { featureId : null, sprintNo: null, name: null, category:null, estimation:1, assignedTo: this.authService.getSelectedUser()};

  ngOnInit(): void {
    
  }

 
  save(){
    this.task["featureId"] = this.feature.id;
    console.log(this.task);

    this.projectService.updateTask(this.projectId
      ,this.feature.id,this.task).subscribe (res=>{
      console.log(res);
      this.toastr.success("Success");
      this.dialog.closeAll();
    //  this.router.navigate(['projects/' + this.projectId + "/features/" + this.authService.getLoggedInUsername()])
    });
  }

  
  cancel(){
    this.dialog.closeAll();
  }


}
