import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'projects/users/src/lib/components/user.service';
import { GithubService } from '../../github.service';
import { ProjectService } from '../../project.service';

@Component({
  selector: 'lib-user-github-report',
  templateUrl: './user-github-report.component.html',
  styleUrls: ['./user-github-report.component.css']
})
export class UserGithubReportComponent implements OnInit {

 

  githubUsername;
  @Input()
  userId;
  constructor(private githubService:GithubService, private userService:UserService, private projectService:ProjectService, private route:ActivatedRoute) { 
    this.route.parent.params.subscribe(params=>{
      this.userId = params["userId"];
      this.getUsername();
      
        
    })
  }

  ngOnInit(): void {
    //this.loadRepositories();
  }

  repositories;
  selectedRepository;
  loadRepositories(){
      this.projectService.listMyRepositories(this.userId).subscribe(res=>{
        this.repositories = res;
        if(this.repositories && this.repositories.length>0){
          for(let rep of this.repositories){
            this.loadStats(rep);
          }
        }
        
    })
  }


  repositoryStats = {}


  loadStats(repo){

    this.githubService.getRepositoryStats(repo.account, repo.repoName, this.githubUsername).subscribe(res=>{
      let data= res;
      this.repositoryStats[repo.repoName] = res;
      this.createCommits(data);
    })
    
  }

  embedUrl:string;

  getUsername(){
    this.userService.findOne(this.userId).subscribe(res=>{
      let user:any = res;
      this.githubUsername = user.githubUsername;
    //  this.loadRepositories();
      //this.loadGitStats();
    })
  }
  
  loadGitStats(){

  }

  
  createCommits(data){
    
    
    let total = data.total;
    this.reportData.push({"label": "Commits", "value": total  }); 
    //this.reportData.push({"label": "Pending", "value": scheduled  });    
    //this.reportData.push({"label": "In Progress", "value": inProgress  });
    //this.reportData.push({"label": "Completed", "value": completed  });
    
    

  }
  
  reportData:any=[];
  widgetColors= [ "purple-plum","blue-madison","red-intense","green-haze","blue-madison","red-intense"];



  stats;

}
