import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GithubService {

  
  apiUrl:string = "";
  constructor(private http:HttpClient) { 
    //this.apiUrl = environment.apiUrl;
  }


  getRepoEvents(repoName){
    var url = `${this.apiUrl}v1/github/${repoName}/events`;    
    return this.http.get(url);
  }

  getFiles(url){
    return this.http.get(url);
  }


  createRepo(repoUrl){
    let token = localStorage.getItem("ACCESS_TOKEN");
    let url ="https://api.github.com/user/repos";
    let formData = { "name" : repoUrl, "private": false};
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', "Bearer " + token);

    return this.http.post(url, formData, {headers:headers});
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
