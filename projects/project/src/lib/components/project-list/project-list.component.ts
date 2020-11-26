import { Component, OnInit, ViewChild } from '@angular/core';
import { ProjectService } from '../../project.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'projects/auth/src/public-api';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit {

  userId:any;
  breadcrumbItems  = [ {"icon":"home", "name":"Home","link":"/"},
   {"name":"Projects"}];


  constructor(private projectService:ProjectService, private authService:AuthService, private route:ActivatedRoute) { 
    this.userId = this.authService.getLoggedInUsername();
  }

  ngOnInit(): void {
    this.loadMenus();
    this.list();
  }

  projects:any;

  reportData:any=[];
  widgetColors= [ "purple-plum","blue-madison","red-intense","green-haze","blue-madison","red-intense"];

  list(){
    this.projectService.list().subscribe (res=>{
      this.projects = res;
      this.dataSource = new MatTableDataSource<any>(this.projects);
      this.createReport(this.projects);
    });
  }

  displayedColumns: string[] = ['id','name','createdBy','days','noOfFeatures','action'];

  resultsLength:number ;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  
  dataSource:any;


  ngAfterViewInit() {
    this.loadTableViewChild();
  }
  loadTableViewChild() {
    if(this.projects){
      this.dataSource.paginator = this.paginator;  
    }
  }
  
  menus:any;

  getUrl(url){
    let projectUrls = url!=null?url.split(","):[];
    
    
    return projectUrls;
  }

  loadMenus(){
    this.menus = [];
    this.menus.push( {title: "Home",  path:["../"], icontype:"fas fa-home", access: true});
    
    this.menus.push( {title: "My Projects",  path:["../"], icontype:"fas fa-user", access: true});
    this.menus.push( {title: "All Projects",  path:[ "../all"], icontype:"fas fa-tools", access:true});    
    this.menus.push( {title: "Add Project",  path:[ "../addproject"], icontype:"fas fa-plus", access: true});      
    //this.menus.push( {title: "Ratings",  path:[ "../ratings"], icontype:"fas fa-plus", access: true});      
    this.menus.push( {title: "Reviews",  path:[ "../reviews"], icontype:"fas fa-search", access: true});      
  }

  
  createReport(data){
    
    this.reportData=[];
    let total = data.length;
    let completed = data.filter(b=>b.status=='COMPLETED').length;
    let inProgress = data.filter(b=>b.status=='IN_PROGRESS').length;
    let scheduled = data.filter(b=>b.status=='SCHEDULED').length;
    let users = data.reduce ( function(sum,obj){  return sum+obj.noOfParticipants},0);
    
    this.reportData.push({"label": "Projects", "value": total  }); 
    this.reportData.push({"label": "Pending", "value": scheduled  });    
    this.reportData.push({"label": "In Progress", "value": inProgress  });
    this.reportData.push({"label": "Completed", "value": completed  });
    
    

  }
}