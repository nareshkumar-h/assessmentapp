import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'projects/auth/src/public-api';
import { GithubService } from '../../../github.service';

@Component({
  selector: 'lib-view-collaborators',
  templateUrl: './view-collaborators.component.html',
  styleUrls: ['./view-collaborators.component.css']
})
export class ViewCollaboratorsComponent implements OnInit {

  constructor(private github:GithubService, private authService:AuthService, private toastr:ToastrService) { }

  ngOnInit(): void {
    this.loadData();
  }

  @Input()
  account:string;

  @Input()
  repoName:string;

  users;
  loadData(){
    this.github.getRepositoryUsers(this.account, this.repoName).subscribe(res=>{
      this.users = res;
    })
  }
  
  addUser(){

    let username = this.authService.getLoggedInGithubUsername();
    let cfm = confirm("Do you need github access - "  + username + "?");
    if(cfm){
      let repoUrl = this.account + "/" + this.repoName;
      this.github.addAccess(repoUrl, username).subscribe(res=>{
        this.toastr.success("Success");
      })
    } 
    
  }


}
