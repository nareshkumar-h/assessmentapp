import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as _ from 'lodash';
import { ProjectService } from '../../project.service';

@Component({
  selector: 'lib-project-skills',
  templateUrl: './project-skills.component.html',
  styleUrls: ['./project-skills.component.css']
})
export class ProjectSkillsComponent implements OnInit {

 
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
      let tasks:any = res;

      let userStories = tasks.filter(obj=>obj.category=='USERSTORY' && obj.status=='COMPLETED');
      let issues = tasks.filter(obj=>obj.category=='BUG' );
      this.projectTasks = _.groupBy(userStories, obj=>obj.name);
      this.projectTasks["ISSUES"] = issues;

  //    this.createReport(this.projectTasks);
      this.createChart(this.projectTasks);
    });
  }

  reportMap ;
  
  createChart(data){

    let dates=[];
    let points = [];

    let taskCategories  = [{name:"HTML", description:"Design Webpage"},
    {name:"JavaScript", description:"Integrate Mock API"},
    {name:"ANGULAR", description:"Develop page in Angular"},
    {name:"REST API", description:"Develop REST API"},         
    {name:"DATABASE", description:"Design Database Tables and Queries"},
    {name:"ISSUES", description:"ISSUES"}];

    //{name:"TESTCASE", description:"Develop Test Cases"},
    //{name:"CODEQUALITY", description:"Improve Code Quality"},
    let categories= ["Design Webpage","BUGS","Develop Test Cases"]
    
    for(let category of taskCategories){
      
      let count = data[category.description] != null ? data[category.description].length : 0;
        dates.push(category.name);
        points.push(count);
        
        this.reportData.push({"label": category.name, "value":count});    
    }
    this.reportMap = { "labels" : dates, "dataSets":[ {"data": points ,"label":"Technologies" }]};
    console.log(this.reportMap);
  
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
