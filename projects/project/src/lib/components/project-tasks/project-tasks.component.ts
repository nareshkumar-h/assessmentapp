import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../project.service';
import { ActivatedRoute } from '@angular/router';

import * as _ from 'lodash';

@Component({
  selector: 'app-project-tasks',
  templateUrl: './project-tasks.component.html',
  styleUrls: ['./project-tasks.component.css']
})
export class ProjectTasksComponent implements OnInit {

  projectId: string;

  showSidebar = true;
  taskType:string;

  categoryTitle:string;

  taskStatusData;

  breadcrumbItems  = [ {"icon":"home", "name":"Home","link":"/"},
   {"name":"Projects"}];

  constructor(private projectService: ProjectService, private route: ActivatedRoute) {

    this.route.parent.params.subscribe(params => {
      this.projectId = params['projectId'];
    });
    this.route.params.subscribe(params => {
      this.taskType = params['category'];
      this.categoryTitle = this.taskType =='ISSUES' ? "Status" : 'Status';
      this.list();
  });
  }

  ngOnInit(): void {
    this.findOne();
   
  }

  projectTasks: any;

  project: any;

  findOne(){
    this.projectService.findOne(this.projectId).subscribe (res=>{
      this.project = res;
    });
  }

  list() {
    this.projectService.listTasksByStatus(this.projectId).subscribe(res => {
      this.taskStatusData = res;

      if(this.taskType =='ISSUES'){        
        this.taskStatusData = this.taskStatusData.filter(obj=>obj.category=="BUG");
        this.projectTasks = _.groupBy(this.taskStatusData, obj=>obj.status);
        
      }
      else{
        this.taskStatusData = this.taskStatusData.filter(obj=>obj.category!="BUG");
        this.projectTasks = _.groupBy(this.taskStatusData, obj=>obj.status);
      }   
      
      
      console.log(this.projectTasks);
      
      this.createReport(this.projectTasks);
    });
  }

  getTasks(tasks){
     
  }

  reportData: any = [];
  widgetColors = [ "blue-madison", "green-haze", "red-intense","purple-plum","green-haze", "purple-plum"];

  createReport(data) {
    this.reportData = [];

    let modules = Object.keys(data);

    var count = 0;
    var hours = 0;

    //let tasks = Object.values(this.projectTasks).flat();
    let alltasks:any = _.flatten(Object.values(this.projectTasks));
    let tasks = [];
    if(this.taskType == 'ISSUES'){
      tasks = alltasks.filter(obj => obj.category == 'BUG');
    }
    else{
      tasks = alltasks.filter(obj => obj.category != 'BUG');
    }
    let totalHours = tasks.reduce( function(sum, obj){  return sum+obj.estimation;},0);
    let completedTasks = tasks.filter( t => t.status =='COMPLETED');
    let pendingTasks = tasks.length - completedTasks.length;
    let completedHours = completedTasks.reduce( function(sum, obj){  return sum+obj.estimation},0);
    let percentage = 0;
    if ( totalHours > 0) {
      percentage=Math.round( 100* completedHours/totalHours);
    }
    for (let moduleName in this.projectTasks) {
      let features = this.projectTasks[moduleName];      
      count += features.length;
    }
    let pendingHours = totalHours - completedHours;
    this.reportData.push({"label":"Tasks", "value":count});    
    this.reportData.push({"label":"Completed", "value":completedTasks.length  });
    this.reportData.push({"label":"Pending", "value":pendingTasks });
    //this.reportData.push({"label":"Bugs", "value":0});
    this.reportData.push({"label":"Required Hours", "value": pendingHours});
    this.reportData.push({"label":"Percentage(%)", "value": percentage});
  }


}
