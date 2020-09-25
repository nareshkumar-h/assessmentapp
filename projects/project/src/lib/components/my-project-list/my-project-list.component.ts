import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../project.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'projects/auth/src/public-api';

@Component({
  selector: 'app-my-project-list',
  templateUrl: './my-project-list.component.html',
  styleUrls: ['./my-project-list.component.css']
})
export class MyProjectListComponent implements OnInit {

  breadcrumbItems  = [ {"icon":"home", "name":"Home","link":"/"},
   {"name":"Projects"}];

  userId:string;
  private loggedInUserId:string;
  isLoggedInUser:boolean;

  constructor(private projectService:ProjectService, private authService:AuthService, private route:ActivatedRoute, private router:Router) { 
    this.loggedInUserId = this.authService.getLoggedInUsername();
     this.route.params.subscribe ( params=>{
       this.userId = params["userId"];
     });
  }

  ngOnInit(): void {
    this.loadMenus();
    this.list();
    this.isLoggedInUser = this.loggedInUserId == this.userId;
  }

  projects:any;


  list(){
    this.projectService.findMyProjects(this.userId).subscribe (res=>{
      this.projects = res;
      this.createReport(this.projects);
    })
  }

  
  reportData:any = [];
  widgetColors= [ "purple-plum","blue-madison","green-haze","red-intense","blue-madison","red-intense"];

  createReport(data){
    
    this.reportData=[];
    let total = data.length;
    let completed = data.filter(b=>b.status=='COMPLETED').length;
    let inProgress = data.filter(b=>b.status=='IN_PROGRESS').length;
    let scheduled = data.filter(b=>b.status=='SCHEDULED').length;
    let users = data.reduce ( function(sum,obj){  return sum+obj.noOfParticipants},0);
    
    this.reportData.push({"label": "Projects", "value": total  }); 
    this.reportData.push({"label": "Completed", "value": completed  });
    this.reportData.push({"label": "In Progress", "value": inProgress  });
    this.reportData.push({"label": "Assigned", "value": scheduled  });
    

  }

  navigate(routeLink, sidebarPath) {
    console.log(routeLink, sidebarPath);
    this.router.navigate([{ outlets: { primary: routeLink, sidebar: sidebarPath } }]);
  }


  menus:any=[];

  loadMenus(){
    this.menus = [];
    this.menus.push( {title: "Back",  path:["../../dashboard"], icontype:"fas fa-arrow-left", access: true});
    
    this.menus.push( {title: "My Projects",  path:["../myprojects"], icontype:"fas fa-user", access: true});
    this.menus.push( {title: "All Projects",  path:[ "../../projects"], icontype:"fas fa-tools", access: true});    
    
    
  }

}
