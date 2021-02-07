import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'projects/users/src/lib/components/user.service';
import { GithubService } from '../../github.service';

@Component({
  selector: 'lib-github-report',
  templateUrl: './github-report.component.html',
  styleUrls: ['./github-report.component.css']
})
export class GithubReportComponent implements OnInit {


  githubUsername;
  @Input()
  userId;
  constructor(private githubService:GithubService, private userService:UserService, private route:ActivatedRoute) { 
    this.route.parent.params.subscribe(params=>{
      this.userId = params["userId"];
        
    })
  }

  ngOnInit(): void {
    this.loadUsers();
  }

  users;
  loadUsers(){
      this.userService.listUsers().subscribe(res=>{
        this.users = res;
    })
  }

  getUsername(){
    this.userService.findOne(this.userId).subscribe(res=>{
      let user:any = res;
      this.githubUsername = user.githubUsername;
      this.loadStats();
    })
  }

  loadStats(){


    
  }

  embedUrl:string;

  


  stats;


}
