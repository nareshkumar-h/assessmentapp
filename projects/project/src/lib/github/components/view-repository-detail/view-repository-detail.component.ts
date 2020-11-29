import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { GithubService } from 'projects/course/src/lib/github.service';

@Component({
  selector: 'lib-view-repository-detail',
  templateUrl: './view-repository-detail.component.html',
  styleUrls: ['./view-repository-detail.component.css']
})
export class ViewRepositoryDetailComponent implements OnInit {

  
  constructor(private router:Router, private route:ActivatedRoute, private github:GithubService) {
    this.route.parent.params.subscribe(params=>{
      this.account = params["account"];
      this.repoName = params["repoName"]

    })
   }

  account:string;
  repoName:string;

  repo:any;
  ngOnInit(): void {
    this.repo= JSON.parse(localStorage.getItem("SELECTED_REPO"));
  }

  

}
