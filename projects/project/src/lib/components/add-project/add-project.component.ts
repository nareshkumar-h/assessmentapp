import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'projects/auth/src/public-api';
import { ProjectService } from '../../project.service';
;

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css']
})
export class AddProjectComponent implements OnInit {

  breadcrumbItems:any= [];
  showSidebar =true;

  userId:any;
  constructor(private projectService:ProjectService, private router:Router, 
    private authService:AuthService) { 
    this.userId = this.authService.getLoggedInUsername();
  }

  today:string = new Date().toJSON().substr(0,10);
  ngOnInit(): void {
    this.loadMenus();
  }

  project:any = { projectPrefix: null, name: null, startDate:this.today, completionDate:this.today}

  save(project){
    this.projectService.save(project).subscribe (res=>{
      console.log(res);
      this.router.navigate([ this.userId +"/myprojects"]);
    });
  }

  cancel(){
    window.history.back();
  }

  
  menus:any;

  loadMenus(){
    this.menus = [];
    this.menus.push( {title: "Back",  path:["../dashboard"], icontype:"fas fa-arrow-left", access: true});
    
    this.menus.push( {title: "My Projects",  path:["../" + this.userId + "/myprojects"], icontype:"fas fa-user", access: true});
    this.menus.push( {title: "All Projects",  path:[ "../projects"], icontype:"fas fa-tools", access: true});    
      
  }

}
