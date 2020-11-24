import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { API_URL } from './config';

@Injectable({
  providedIn: 'root'
})
export class GithubService {

  constructor(private http:HttpClient, @Inject(API_URL)private apiUrl: string) { 
    
  }


  getRepoEvents(repoName){
    var url = `${this.apiUrl}v1/github/${repoName}/events`;    
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
    let formData = { "name" : repoUrl, "private": false};
    

    return this.http.post(url, formData, {headers:this.getHeaders()});
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


}
