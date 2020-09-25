import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'projects/auth/src/public-api';import { GithubService } from '../../github.service';
;

@Component({
  selector: 'app-repo-events',
  templateUrl: './repo-events.component.html',
  styleUrls: ['./repo-events.component.css']
})
export class RepoEventsComponent implements OnInit {

  breadcrumbItems:any=[];

  githubUrl:string;
  repoName:string;
  projectRepoUrl:string;
  isLoggedIn:boolean;

  branch:string = "master";

  constructor(private githubService: GithubService,private route: ActivatedRoute, public authService:AuthService) {
    this.route.params.subscribe( (params)=>{
      
      this.githubUrl = params['account'];
      this.repoName = params['repoName'];
      this.projectRepoUrl = this.githubUrl + "/" + this.repoName;
     console.log('View Project:' + this.projectRepoUrl);
     this.isLoggedIn = authService.isLoggedIn();
    });
   }

 
   ngOnInit(): void {
    this.list();
  }

  events:any;

  eventTypes= ["PublicEvent"];
  list(){
    this.githubService.getRepoEvents(this.projectRepoUrl).subscribe ( res=>{
      let events = <[]>res;
     let pushEvents = events.filter(f=>this.eventTypes.indexOf(f["type"])==-1);
      this.events = pushEvents;
    });
  }

  
  message: string;
  createdAt:any;
  url:string;

  getFiles(url,message,createdAt){
    this.url = url;
    this.message = message;
    this.createdAt = createdAt;    
  }


}
