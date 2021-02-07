import { Component, OnInit } from '@angular/core';
import { AuthService } from 'projects/auth/src/public-api';
import { GithubService } from '../../../github.service';

@Component({
  selector: 'lib-repository-list',
  templateUrl: './repository-list.component.html',
  styleUrls: ['./repository-list.component.css']
})
export class RepositoryListComponent implements OnInit {

  githubUsername:string;
  constructor(private github: GithubService, private authService:AuthService) {
    
   }

  ngOnInit(): void {
    this.list();
  }
  

  
repositories;
  list(){
    let account = "sf-fresher-batch-2020";
    this.github.getRepositories(account).subscribe(res=>{
      this.repositories = res;
    })
  }

}
