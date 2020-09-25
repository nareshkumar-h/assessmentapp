import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../project.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'projects/auth/src/public-api';

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
    });
  }

  
  menus:any;

  loadMenus(){
    this.menus = [];
    this.menus.push( {title: "Back",  path:["../dashboard"], icontype:"fas fa-arrow-left", access: true});
    
    this.menus.push( {title: "My Projects",  path:["../" + this.userId + "/myprojects"], icontype:"fas fa-user", access: true});
    this.menus.push( {title: "All Projects",  path:[ "../projects"], icontype:"fas fa-tools", access: true});    
      
  }
}
