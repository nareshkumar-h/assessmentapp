import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../project.service';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AddProjectActivityComponent } from '../add-project-activity/add-project-activity.component';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'projects/auth/src/public-api';

@Component({
  selector: 'app-project-activity-list',
  templateUrl: './project-activity-list.component.html',
  styleUrls: ['./project-activity-list.component.css']
})
export class ProjectActivityListComponent implements OnInit {

  projectId: string;
  breadcrumbItems  = [ {"icon":"home", "name":"Home","link":"/"},
   {"name":"Projects"}];

   isLoggedInUser:boolean;
  constructor(public dialog: MatDialog,private projectService: ProjectService, private authService:AuthService, private route: ActivatedRoute,
    private toastr:ToastrService) {
    this.route.parent.params.subscribe(params => {
      this.projectId = params['projectId'];
    });
  }

  ngOnInit(): void {
    this.findOne();
    this.list();
  }

  projectActivities: any;

  project: any;

  findOne(){
    this.projectService.findOne(this.projectId).subscribe (res=>{
      this.project = res;
      this.isLoggedInUser = this.authService.getLoggedInUsername()==this.project["createdBy"];
    });
  }

  list() {
    this.projectService.listActivities(this.projectId).subscribe(res => {
      this.projectActivities = <{}>res;
      this.createReport(this.projectActivities);
    });
  }


  reportData: any = [];
  widgetColors = [ "green-haze", "blue-madison"];

  createReport(data) {
    this.reportData = [];

    this.reportData.push({"label":"Activities", "value":data.length});
    // this.reportData.push({"label":"Completed", "value":count});
  }

  addActivity(){
    let activityNames= [];
    for(let obj of this.projectActivities){
      activityNames.push(obj.category);
    }
    const dialogRef = this.dialog.open(AddProjectActivityComponent,
      {width: '800px', height:'fit-content', data: {projectId: this.projectId, activities: activityNames}});
    
    dialogRef.afterClosed().subscribe(result => {
      this.list();
    });
  }

  deleteActivity(activity){
    let cfm = confirm ("Do you want to delete activity - " + activity.activityName + "?");
    if(cfm){
      this.projectService.deleteActivity(this.projectId, activity.id).subscribe(res=>{
        this.toastr.success("Successfully deleted");
        this.list();
      });
    }

  }

  startActivity(activity){
    let cfm = confirm ("Do you want to start activity - " + activity.activityName + "?");
    if(cfm){
      let status = "STARTED";
      this.projectService.updateActivityStatus(this.projectId, activity.id, status).subscribe(res=>{
        this.toastr.success("Successfully updated");
        this.list();
      });
    }
  }

}
