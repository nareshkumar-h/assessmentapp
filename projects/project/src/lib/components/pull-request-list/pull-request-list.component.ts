import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { GithubService } from '../../github.service';


@Component({
  selector: 'lib-pull-request-list',
  templateUrl: './pull-request-list.component.html',
  styleUrls: ['./pull-request-list.component.css']
})
export class PullRequestListComponent implements OnInit {

  
  
  constructor(private router:Router, private route:ActivatedRoute, private githubService:GithubService) {
    this.route.parent.params.subscribe(params=>{
      this.account = params["account"];
      this.repoName = params["repoName"]

    })
   }

  account:string;
  repoName:string;

  ngOnInit(): void {
    this.showPRs();
    
  }

  @Input()
  repository;

  prList;

  states = ["all","open","closed"]

  @Input()
  state = 'all';
  showPRs(status='all'){    
    this.githubService.getPRs(this.account,this.repoName,status).subscribe(res=>{
      this.prList = res;
      this.createReport(this.prList);
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
