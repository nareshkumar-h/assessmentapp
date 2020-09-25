import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'projects/auth/src/public-api';
import { ToastrService } from 'ngx-toastr';
import { ProjectService } from '../../project.service';

@Component({
  selector: 'pt-add-project-activity',
  templateUrl: './add-project-activity.component.html',
  styleUrls: ['./add-project-activity.component.css']
})
export class AddProjectActivityComponent implements OnInit {

  projectId:any;
  activities:any;

  constructor(private projectService:ProjectService, private route:ActivatedRoute, private router:Router, private authService:AuthService,
    @Inject(MAT_DIALOG_DATA) public data: any, private dialog:MatDialog,
    private toastr:ToastrService) { 
    console.log(data);
      
      this.projectId = data['projectId'];
      this.activities =  data['activities'];
  }

  today:string = new Date().toJSON().substr(0,10);

  ngOnInit(): void {
    this.categories = this.allCategories.filter(obj=> this.activities.indexOf(obj.name) ==-1);
    
  }

  allCategories = [{ id: 1, name:"SQL"},{id:2,name:"Java"},{id:3,name:"Web"},{id:4,name:"Spring"}];

  categories = [];

  activity= { projectId:null, activityName:null,category:null,startDate:this.today, createdBy:null};

  save(activity){
    activity["projectId"] = this.projectId;
    activity["createdBy"] = this.authService.getLoggedInUsername();
    this.projectService.addActivity(this.projectId,activity).subscribe (res=>{
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
