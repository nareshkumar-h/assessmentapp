import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProjectService } from '../../project.service';

@Component({
  selector: 'app-view-project',
  templateUrl: './view-project.component.html',
  styleUrls: ['./view-project.component.css']
})
export class ViewProjectComponent implements OnInit {

  breadcrumbItems:any = [];
  projectId:number;
  constructor(private router:Router, private route:ActivatedRoute, private projectService:ProjectService) {
    this.route.params.subscribe (params=>{
      this.projectId = params["projectId"];
    });
   }


  ngOnInit(): void {
    this.loadMenus();
    this.findOne();

  }

  project:any;

  findOne(){
    this.projectService.findOne(this.projectId).subscribe (res=>{
      this.project = res;
    });
  }

  navigate(routeLink, sidebarPath) {
    console.log(routeLink, sidebarPath);
    let routerLinks = ["projects", this.projectId , routeLink];
    this.router.navigate([{ outlets: { primary: routeLink, sidebar: [sidebarPath] } }]);
  }

  showSidebar = true;

  menus = [];
  loadMenus(){
    this.menus = [];
    this.menus.push( {title: "Back",  path:["../"], icontype:"fas fa-arrow-left",  access: true});
    this.menus.push( {title: "Overview",  path:["../"+ this.projectId ] , icontype:"fas fa-home",  access: true});
    this.menus.push( {title: "Features",  path:["../"+ this.projectId + "/features"] , icontype:"fas fa-lightbulb",  access: true});
    //this.menus.push( {title: "Plan",  path:["../"+ this.projectId + "/plan"], icontype:"fas fa-clipboard",  access: true});
    this.menus.push( {title: "Tasks",  path:["../"+ this.projectId + "/tasks"], icontype:"fas fa-tasks",  access: true});
    this.menus.push( {title: "Sprint",  path:["../"+ this.projectId + "/sprints"], icontype:"fas fa-clock",  access: true});
    //this.menus.push( {title: "Reviews",  path:["../"+ this.projectId + "/reviews"], icontype:"fas fa-gear",  access: true});
    //this.menus.push( {title: "Repositories",  path:["../"+ this.projectId + "/repositories"], icontype:"fas fa-code-branch",  access: true});
  }  


}
