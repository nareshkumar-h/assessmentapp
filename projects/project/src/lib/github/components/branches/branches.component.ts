import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { GithubService } from 'projects/project/src/public-api';


@Component({
  selector: 'lib-branches',
  templateUrl: './branches.component.html',
  styleUrls: ['./branches.component.css']
})
export class BranchesComponent implements OnInit {

  
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

  branches;
  list(){
    this.githubService.getBranches(this.account, this.repoName).subscribe(res=>{
      this.branches = res;
    })
  }

}
