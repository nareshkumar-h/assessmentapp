import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'projects/auth/src/public-api';import { GithubService } from '../../github.service';
;

@Component({
  selector: 'app-repo-events',
  templateUrl: './repo-events.component.html',
  styleUrls: ['./repo-events.component.css']
})
export class RepoEventsComponent implements OnInit {

  breadcrumbItems:any=[];

  @Input()
  githubUrl:string;
  @Input()
  repoName:string;
  projectRepoUrl:string;
  isLoggedIn:boolean;

  branch:string = "main";
  panelOpenState = false;

  
  
  constructor(private router:Router, private route:ActivatedRoute, private githubService:GithubService) {
    this.route.parent.params.subscribe(params=>{
      this.account = params["account"];
      this.repoName = params["repoName"]

    })
   }

  account:string;


 
   ngOnInit(): void {
     this.list();
    
  }

  events:any;

  eventTypes= ["PublicEvent"];
  list(){
    this.githubService.getRepoEvents(this.account, this.repoName).subscribe ( res=>{
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
