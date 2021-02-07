import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { API_URL } from './config';

@Injectable({
  providedIn: 'root'
})
export class GithubService {

  constructor(private http:HttpClient, @Inject(API_URL)private apiUrl: string) { 
    
  }
  
  getRepoEvents(account,repoName){
    var url = `${this.apiUrl}v1/github/${account}/${repoName}/events`;    
    return this.http.get(url);
  }

  getFiles(url){
    return this.http.get(url);
  }

  getHeaders(){
    let token = "b2a531c63044f86b6d66308202bedc83e26ce090";//localStorage.getItem("ACCESS_TOKEN");
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', "Bearer " + token);
    return headers;
  }

  createRepo(repoUrl){
   
    let url ="https://api.github.com/user/repos";
    let formData = { "name" : repoUrl, "private": false, auto_init: true, has_issues:true,has_projects:true};
    return this.http.post(url, formData, {headers:this.getHeaders()});
  }

  getRepository(account,repoName){
   
    let url =`https://api.github.com/repos/${account}/${repoName}`;

    return this.http.get(url, {headers:this.getHeaders()});
  }

  getGitRepositories(account,pageNo=1){
   
    //    let url =`https://api.github.com/users/repos`;
       let url =`https://api.github.com/users/${account}/repos?page=${pageNo}`;
       
        return this.http.get(url, {headers:this.getHeaders()});
      }

  getRepositories(account){
   
//    let url =`https://api.github.com/users/repos`;
   // let url =`https://api.github.com/repos/${account}/repositories`;
   let url = this.apiUrl + "v1/projectrepositories";

    return this.http.get(url, {headers:this.getHeaders()});
  }

  getRepositoryStats(account, repoName,username){
    let url =`https://api.github.com/repos/${account}/${repoName}/stats/participation`;
    console.log(url);
    return this.http.get(url, {headers:this.getHeaders()});
  }


  
  getBranches(account,repoName){
   
    let url =`https://api.github.com/repos/${account}/${repoName}/branches`;

    return this.http.get(url, {headers:this.getHeaders()});

  }
   
  getIssues(account,repoName){
   
    let url =`https://api.github.com/repos/${account}/${repoName}/issues`;

    return this.http.get(url, {headers:this.getHeaders()});
  }
  getRepositoryUsers(account,repoName){
   
    let url =`https://api.github.com/repos/${account}/${repoName}/collaborators`;

    return this.http.get(url, {headers:this.getHeaders()});
  }

  addAccess(repoUrl,username){    
    // //repos/:owner/:repo/collaborators/:username
      let url =`https://api.github.com/repos/${repoUrl}/collaborators/${username}`;
      let formData = { };
  
      return this.http.put(url, formData, {headers:this.getHeaders()});
  }


  getFile(url){
    return this.http.get(url);
  }

  
  getGistFile(id){
    const headers = new HttpHeaders().set('Content-Type', 'text/plain; charset=utf-8');
   let url = `https://api.github.com/gists/${id}`;
   return this.http.get(url);
  }

  
  getPRs(owner,repoName,state){
    const headers = new HttpHeaders().set('Content-Type', 'text/plain; charset=utf-8');
   let url = `https://api.github.com/repos/${owner}/${repoName}/pulls?state=${state}`;
   return this.http.get(url);
  }


}
