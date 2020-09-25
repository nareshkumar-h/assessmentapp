import { Component, OnInit } from '@angular/core';
import { AuthService } from 'projects/auth/src/public-api';
import { Router } from '@angular/router';
import { GithubService } from '../../github.service';

@Component({
  selector: 'app-add-repository',
  templateUrl: './add-repository.component.html',
  styleUrls: ['./add-repository.component.css']
})
export class AddRepositoryComponent implements OnInit {

  breadcrumbItems:any;
  constructor(private authService:AuthService, private githubService:GithubService, private router:Router) {

  }

 ngOnInit(): void {
 }

 project:any = { name: null, projectType: 0, username: this.authService.getLoggedInUsername()};

 createRepo(){
   console.log(this.project);
   let projectRepoUrl = this.getProjectRepoUrl(this.project.name, this.project.projectType, this.project.username );
   alert("Create Repo" + projectRepoUrl);

   this.githubService.createRepo(projectRepoUrl).subscribe( res=>{
     console.log(res);
     alert("Repository Created Successfully");
   });


 }

 projectNames = [];

 getProjectNames(){
   this.projectNames =["carapp","bookapp"];
 }

 getProjectRepoUrl(projectName:string, projectType:string, username:string):string {

   let choice = parseInt(projectType);
   var projectUrl = null;
   console.log(choice);
   switch (choice) {
   case 1:
     projectUrl = projectName + "-sql-" + username;
     break;
   case 2:
     projectUrl = projectName + "-core-" + username;
     break;

   case 3:
     projectUrl = projectName + "-web-" + username;
     break;
   case 4:
     projectUrl = projectName + "-spring-" + username;
     break;
   case 5:
     projectUrl = projectName + "-js-" + username;
     break;
     
   default:
     console.log("No case matched");      
   }
   console.log(projectUrl);
   return projectUrl;
 }

}
