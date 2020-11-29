import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'projects/auth/src/public-api';
import { GithubService } from '../../github.service';
import { ProjectService } from '../../project.service';

@Component({
  selector: 'app-project-repository-list',
  templateUrl: './project-repository-list.component.html',
  styleUrls: ['./project-repository-list.component.css']
})
export class ProjectRepositoryListComponent implements OnInit {

  breadcrumbItems:any;
  projectId;
  isMentor:boolean;
  githubUsername:string;
  constructor(private projectService:ProjectService,private route:ActivatedRoute, private githubService:GithubService,private toastr:ToastrService, private authService:AuthService) { 

    this.route.parent.params.subscribe (params=>{
      this.projectId = params["projectId"];
    });
    this.githubUsername = this.authService.getLoggedInGithubUsername();
    this.isMentor = this.authService.hasRoleAccess("T");
  }

  ngOnInit(): void {

    if(this.projectId != null){
      this.list();
    }
    else{
      this.listMyRepositories();
    }
    
  }

  repositories:any;

  list(){
    this.projectService.listProjectRepositories(this.projectId).subscribe(res=>{
      this.repositories = res;
      if(this.repositories !=null && this.repositories.length >0){
        this.selectedRepository = this.repositories[0];
        this.view = "PR";        
      }
    });
  }

  listMyRepositories(){
    let username = this.authService.getSelectedUser();
    this.projectService.listMyRepositories(username).subscribe(res=>{
      this.repositories = res;
      if(this.repositories !=null && this.repositories.length >0){
        this.selectedRepository = this.repositories[0];
        this.view = "PR";        
      }
    });
  }



  addAccess(id){

    let username = this.authService.getLoggedInUsername();
    this.projectService.addRepoAccess(id,username).subscribe(res=>{
      this.toastr.success("Successfully Repo Linked");
    },err=>{
      if (err.errors.length>0){
        this.toastr.error(err.errors[0].message);
      }
      else{
        this.toastr.error("Error", "Unable to create repository");
      }
      
    })
  }

  selectedRepository:any;
  
  addRepoAccess(repo){

    let repoUrl = repo.account + "/" +  repo.repoName;
    
    
    this.githubService.addAccess(repoUrl,this.githubUsername).subscribe(res=>{
      this.toastr.success("Successfully Added Git Access");
      this.addAccess(repo.id);
    })
  }

  deleteRepo(id){
    let username = this.authService.getLoggedInUsername();
    this.projectService.deleteRepo(id).subscribe(res=>{
      this.toastr.success("Successfully Deleted");
      this.list();
    })
  }

  showEvents(repository){
    this.view='events';
    this.selectedRepository = repository;
  }

  view = "events";


}
