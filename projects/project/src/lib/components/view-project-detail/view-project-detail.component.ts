import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProjectService } from '../../project.service';

@Component({
  selector: 'pt-view-project-detail',
  templateUrl: './view-project-detail.component.html',
  styleUrls: ['./view-project-detail.component.css']
})
export class ViewProjectDetailComponent implements OnInit {

  
  breadcrumbItems:any = [];
  projectId:number;
  userId:number;

  constructor(private router:Router, private route:ActivatedRoute, private projectService:ProjectService) {
    this.route.parent.params.subscribe (params=>{
      this.projectId = params["projectId"];
      this.userId = params["userId"];
    });
   }


  ngOnInit(): void {
    if(this.projectId != null){
      this.findOne();
    }
    
      

  }

  project:any;

  findOne(){
    this.projectService.findOne(this.projectId).subscribe (res=>{
      this.project = res;
    });
  }

  navigate(routeLink) {
    console.log(routeLink);
    let routerLinks = ["projects", this.projectId , routeLink];
    this.router.navigate(routerLinks);
  }

  showSidebar = false;

}
