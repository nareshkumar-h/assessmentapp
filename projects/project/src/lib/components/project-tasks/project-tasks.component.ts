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

  breadcrumbItems  = [ {"icon":"home", "name":"Home","link":"/"},
   {"name":"Projects"}];

  constructor(private projectService: ProjectService, private route: ActivatedRoute) {
    this.route.parent.params.subscribe(params => {
      this.projectId = params['projectId'];
    });
  }

  ngOnInit(): void {
    this.findOne();
    this.list();
  }

  projectTasks: any;

  project: any;

  findOne(){
    this.projectService.findOne(this.projectId).subscribe (res=>{
      this.project = res;
    });
  }

  list() {
    this.projectService.listTasks(this.projectId).subscribe(res => {
      this.projectTasks = <{}>res;
      this.createReport(this.projectTasks);
    });
  }


  reportData: any = [];
  widgetColors = [ "blue-madison", "green-haze", "red-intense","purple-plum","green-haze", "purple-plum"];

  createReport(data) {
    this.reportData = [];

    let modules = Object.keys(data);
    console.log(modules);

    var count = 0;
    var hours = 0;

    //let tasks = Object.values(this.projectTasks).flat();
    let tasks:any = _.flatten(Object.values(this.projectTasks));
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


}
