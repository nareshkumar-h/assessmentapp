import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'projects/auth/src/public-api';
import { ProjectService } from '../../project.service';
import { AddRepositoryComponent } from '../add-repository/add-repository.component';

@Component({
  selector: 'pt-view-project-detail',
  templateUrl: './view-project-detail.component.html',
  styleUrls: ['./view-project-detail.component.css']
})
export class ViewProjectDetailComponent implements OnInit {

  
  breadcrumbItems:any = [];
  projectId:number;
  userId:number;
  isMentor:boolean;
  constructor(public authService:AuthService,private dialog:MatDialog, private router:Router, private route:ActivatedRoute, private projectService:ProjectService, private toastr:ToastrService) {
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

  
  addFeatureDialog(project){
    const dialogRef = this.dialog.open(AddRepositoryComponent,
      {width: '800px', height:'fit-content', data: {project: project}});
    
    dialogRef.afterClosed().subscribe(result => {
      
    });
  }

  
  createRepo(p){
    this.projectService.createProjectRepo(p.id).subscribe(res=>{
      this.toastr.success("Project Repository Created");
    });
    //this.router.navigateByUrl("/repositories/addrepository?projectId="+ p.id+"&name="+p.name);
  }
}
