import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { GithubService } from 'projects/project/src/public-api';


@Component({
  selector: 'lib-repo-issues',
  templateUrl: './repo-issues.component.html',
  styleUrls: ['./repo-issues.component.css']
})
export class RepoIssuesComponent implements OnInit {

  
  constructor(private router:Router, private route:ActivatedRoute, private githubService:GithubService) {
    this.route.parent.params.subscribe(params=>{
      this.account = params["account"];
      this.repoName = params["repoName"]

    })
   }

   @Input()
  repoName:string;
  @Input()
  account:string;


  ngOnInit(): void {
    this.list();
  }

  issues;
  list(){
    this.githubService.getIssues(this.account, this.repoName).subscribe(res=>{
      this.issues = res;
      this.createReport(res);
    })
  }

  
  
  reportData:any=[];
  widgetColors= [ "purple-plum","blue-madison","red-intense","green-haze","blue-madison","red-intense"];
  createReport(data){
    
    this.reportData=[];
    let total = data.length;
    let open = data.filter(b=>b.state=='open').length;
    let closed = data.filter(b=>b.state=='closed').length;
    
    this.reportData.push({"label": "Total", "value": total  }); 
    this.reportData.push({"label": "Open", "value": open  });    
    this.reportData.push({"label": "Closed", "value": closed  });
    
    

  }


}
