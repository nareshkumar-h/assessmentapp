import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from 'projects/auth/src/public-api';

import { of } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SiteService {

  
  apiUrl:string;
  constructor(private http:HttpClient, private authService: AuthService) { 
    this.apiUrl = environment.API_URL;
  }

  
  getHeaders(){    
    let headers = new HttpHeaders();
    return headers;
  }

  getDomain(){
    let orgId=this.authService.getLoggedInOrg();
    let url = `${this.apiUrl}v1/organizations/${orgId}/domain`;
    return this.http.get(url,{headers:this.getHeaders()});
  }

  getOrg(){
    let orgId=this.authService.getLoggedInOrg();
    let url = `${this.apiUrl}v1/organizations/${orgId}`;
    return this.http.get(url,{headers:this.getHeaders()});
  }

  getFeatures(){
    let orgId=this.authService.getLoggedInOrg();
    let url = `${this.apiUrl}v1/organizations/${orgId}/features`;
    return this.http.get(url,{headers:this.getHeaders()});
  }

  updateOrg(org){
    let url = `${this.apiUrl}v1/organizations/${org.code}`;
    return this.http.put(url,org,{headers:this.getHeaders()});
  }

  getRoles(){
    let orgId=this.authService.getLoggedInOrg();
    let url = `${this.apiUrl}v1/organizations/${orgId}/roles`;
    
    return this.http.get(url,{headers:this.getHeaders()});
  }

  getSiteDetail(){
    let orgId=this.authService.getLoggedInOrg();
    let url = `${this.apiUrl}v1/organizations/${orgId}/theme`;    
    return this.http.get(url,{headers:this.getHeaders()});
  }

  getSiteInfo(){
    let siteInfo = JSON.parse(sessionStorage.getItem("SITE_INFO"));
    if(siteInfo==null){
    let url = `${this.apiUrl}v1/sites`;
    console.log(url);
      this.http.get(url,{headers:this.getHeaders()}).subscribe(res=>{  
        if(res){
          localStorage.setItem("SITE_INFO",JSON.stringify(res));      
          return of(res);
        }
        else{ 

        }
      });
    }
    else{
      return of(siteInfo);
    }
  }
}
