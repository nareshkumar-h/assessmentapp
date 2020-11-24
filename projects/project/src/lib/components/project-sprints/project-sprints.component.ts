import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../project.service';
import { ActivatedRoute } from '@angular/router';

import * as _ from 'lodash';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-project-sprints',
  templateUrl: './project-sprints.component.html',
  styleUrls: ['./project-sprints.component.css']
})
export class ProjectSprintsComponent implements OnInit {

 
  projectId: string;

  breadcrumbItems  = [ {"icon":"home", "name":"Home","link":"/"},
   {"name":"Projects",link:""}];

  constructor(private toastr:ToastrService, private projectService: ProjectService, private route: ActivatedRoute) {
    this.route.parent.params.subscribe(params => {
      this.projectId = params['projectId'];
    });
  }

  ngOnInit(): void {
    this.findOne();
    this.list();
    this.loadSprintTasks();
  }

  projectTasks: any;

  project: any;

  findOne(){
    this.projectService.findOne(this.projectId).subscribe (res=>{
      this.project = res;
    });
  }

  projectSprints;
  list() {
    this.projectService.listSprints(this.projectId).subscribe(res => {
      this.projectSprints = res;
      //this.createReport(this.projectTasks);
    });
  }

  loadSprintTasks() {
    this.projectService.listSprintTasks(this.projectId).subscribe(res => {
      this.projectTasks = <{}>res;
      this.createReport(this.projectTasks);      
    });
  }

  getSprintTasks(sprintNo){
    let sprint =""+ sprintNo;
    return this.projectTasks[sprintNo];
  }

  today = new Date();

  getColor(topic) {
    let color = "";
    if ( topic.status =='PENDING' ){
      color ='red';
    }
    else if ( topic.status =='IN_PROGRESS' ){
      color ='lightorange';
    }
    
    return color;
  }

  updateStatus(task,checked){
    let status = checked ? "COMPLETED":"PENDING";
    console.log(status);
    this.projectService.updateTaskStatus(task.projectFeature.id,task.id,status).subscribe(res=>{
      this.toastr.success("Task Status Updated");
      task.status=status;
      
    })
  }


  reportData: any = [];
  widgetColors = [ "blue-madison", "green-haze", "red-intense","purple-plum","green-haze", "purple-plum"];

  createReport(data) {
    this.reportData = [];

    let modules = Object.keys(data);
    console.log(modules);

    var count = 0;
    var hours = 0;

    let tasks:any = _.flatten(Object.values(this.projectTasks));//.flat();
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
    this.reportData.push({"label":"Bugs", "value":0});
    this.reportData.push({"label":"Required Hours", "value": pendingHours});
    this.reportData.push({"label":"Percentage(%)", "value": percentage});
  }

  getFeatureStats(data){

    let resultData = _.groupBy(data, obj=>obj.projectFeature.name);
    let resultMap = {};
    for(let key of Object.keys(resultData)){
      let value = resultData[key];
      console.log(JSON.stringify(value));
      resultMap[key] = _.countBy(value, obj=>obj.status);
    }
    console.log(JSON.stringify(resultMap))
    return resultMap;
    
  }

}
