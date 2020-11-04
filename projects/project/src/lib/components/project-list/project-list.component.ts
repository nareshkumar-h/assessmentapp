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
  widgetColors:any=[];

  list(){
    this.projectService.list().subscribe (res=>{
      this.projects = res;
      this.dataSource = new MatTableDataSource<any>(this.projects);
    });
  }

  displayedColumns: string[] = ['id','name','createdBy','startDate','completionDate','status','action'];

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

  loadMenus(){
    this.menus = [];
    this.menus.push( {title: "Home",  path:["../"], icontype:"fas fa-home", access: true});
    
    this.menus.push( {title: "My Projects",  path:["../"], icontype:"fas fa-user", access: true});
    this.menus.push( {title: "All Projects",  path:[ "../all"], icontype:"fas fa-tools", access:true});    
    this.menus.push( {title: "Add Project",  path:[ "../addproject"], icontype:"fas fa-plus", access: true});      
  }
}
