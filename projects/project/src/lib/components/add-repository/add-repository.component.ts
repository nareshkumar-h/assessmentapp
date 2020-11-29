import { Component, OnInit } from '@angular/core';
import { AuthService } from 'projects/auth/src/public-api';
import { ActivatedRoute, Router } from '@angular/router';
import { GithubService } from '../../github.service';
import { ProjectService } from '../../project.service';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-add-repository',
  templateUrl: './add-repository.component.html',
  styleUrls: ['./add-repository.component.css']
})
export class AddRepositoryComponent implements OnInit {

  projectId:number;
  breadcrumbItems:any;
  constructor(private authService:AuthService, private projectService:ProjectService, private route:ActivatedRoute, private githubService:GithubService, private router:Router, private toastr:ToastrService) {
    this.route.parent.params.subscribe (params=>{
      this.projectId = params["projectId"];
    });
  }

  projectDetail:any;

  findOne(){
    this.projectService.findOne(this.projectId).subscribe (res=>{
      this.projectDetail = res;
      this.project.name = this.projectDetail.name;
      this.project.username = this.projectDetail.createdBy;
    });
  }


 ngOnInit(): void {
   this.findOne();
 }

 onChange(){
   this.project.repositoryName = this.getProjectRepoUrl();
 }

 project:any = { name: null, projectType: 0, repositoryName:null, username: this.authService.getLoggedInUsername()};

 createRepo(f:NgForm){
   console.log(this.project);
  // let projectRepoUrl = this.getProjectRepoUrl();
   //alert("Create Repo" + projectRepoUrl);

   this.repositoryUrl = null;
   this.githubService.createRepo(this.project.repositoryName).subscribe( res=>{
     console.log(res);
     localStorage.setItem("RESPONSE", JSON.stringify(res));
     this.toastr.success("Repository Created Successfully");
     this.repositoryUrl = res["html_url"];
     let response:any = res;
     let repo = { projectId: this.projectDetail.id, account: response.owner.login, repoName:response.name,category:this.project.projectType,visibility:response.private?"PRIVATE":"PUBLIC", user:this.project.username};
     this.registerRepository(repo);
     f.reset();
   },err=>{
     console.log(err);
    if (err.error )
    {
      if( err.error.errors.length>0){
       let errors = err.error.errors;
       for(let e of errors){
        this.toastr.error("Error", e.message);
       }
      
      }else{
        this.toastr.error("Error", "Unable to create repository");
      }

    }
    else{
      this.toastr.error("Error", "Unable to create repository");
    }
   });


 }

 repositoryUrl:string;
 accountName:string = "sf-fresher-batch-2020";
 repoName:string;
 
 linkRepository(f:NgForm){
  
  let visibility = "PUBLIC";
  let repo = { projectId: this.projectDetail.id, account: this.accountName, repoName:this.project.repositoryName,category:this.project.projectType,visibility:visibility, user:this.project.username};
  this.registerRepository(repo);
  f.reset();
 }

 registerRepository(repo){
   
   this.projectService.createRepo(repo).subscribe(res=>{
     this.toastr.success("Successfully linked repository");
     this.router.navigate(["repositories"])
   })
 }

 projectNames = [];

 getProjectNames(){
   this.projectNames =["carapp","bookapp"];
 }

 getProjectRepoUrl():string {

   let choice = parseInt(this.project.projectType);
   let projectName = this.projectDetail.projectPrefix;
   var projectUrl = null;
   let username = this.project.username;
   
   switch (choice) {
   case 1:
     projectUrl = projectName + "-sql-" ;
     break;
   case 2:
     projectUrl = projectName + "-core";
     break;

   case 3:
     projectUrl = projectName + "-ui";
     break;
   case 4:
     projectUrl = projectName + "-spring" ;
     break;
   case 5:
     projectUrl = projectName + "-js";
     break;
  case 6:
      projectUrl = projectName + "-angular";
      break;
  case 7:
        projectUrl = projectName + "-api";
        break;
        
     
   default:
     console.log("No case matched");      
   }
   
   return projectUrl;
 }

}
