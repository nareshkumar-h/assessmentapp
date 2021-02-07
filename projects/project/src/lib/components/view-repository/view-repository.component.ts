import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GithubService } from '../../github.service';


@Component({
  selector: 'lib-view-repository',
  templateUrl: './view-repository.component.html',
  styleUrls: ['./view-repository.component.css']
})
export class ViewRepositoryComponent implements OnInit {

  constructor(private router:Router, private route:ActivatedRoute, private github:GithubService) {
    this.route.params.subscribe(params=>{
      this.account = params["account"];
      this.repoName = params["repoName"]

    })
   }

  account:string;
  repoName:string;

  ngOnInit(): void {
    this.findOne();
  }

  repo;

  findOne(){
    this.github.getRepository(this.account,this.repoName).subscribe(res=>{
      this.repo = res;
      localStorage.setItem("SELECTED_REPO", JSON.stringify(res));
    })
  }
  navigate(path){
    if(path ==''){
      this.router.navigateByUrl(`repositories/${this.account}/${this.repoName}`);
    }
    else{
      this.router.navigateByUrl(path);
    }
    
  }

}
