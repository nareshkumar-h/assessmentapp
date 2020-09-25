import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from 'projects/auth/src/public-api';
import { environment } from 'projects/frontend/src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  
  apiUrl:string;
  constructor(private http:HttpClient, private authService: AuthService) { 
    this.apiUrl = environment.API_URL;
  }

  
  getHeaders(){    
    let headers = new HttpHeaders();
    headers = headers.set('org', this.authService.getLoggedInOrg());
    return headers;
  }

  
  list(){
    let url = `${this.apiUrl}v1/users`;
    return this.http.get(url, {headers:this.getHeaders()});
  }

  findOne(id){
    let url = `${this.apiUrl}v1/users/${id}`;
    return this.http.get(url,{headers:this.getHeaders()});
  }

  getFeatures(id){
    let url = `${this.apiUrl}v1/users/${id}/features`;
    return this.http.get(url,{headers:this.getHeaders()});
  }

  save(user){    
    let createdBy = this.authService.getLoggedInUsername();
    user["createdBy"] = createdBy;
    user["password"] = "pass123";
    user["role"] = "U";
    let url = `${this.apiUrl}v1/users`;
    return this.http.post(url, user, {headers:this.getHeaders()});
  }

  
  changePassword(user){
    let userId = this.authService.getLoggedInUsername();
    let url = this.apiUrl + `v1/users/${userId}/updatePassword`;    
    return this.http.put(url, user, {headers:this.getHeaders()});    
  }

    
  updateProfile(user){
    
    let url = this.apiUrl + `v1/users/${user.username}`;    
    return this.http.put(url, user, {headers:this.getHeaders()});    
  }

  updateAcademics(user){    
    let url = this.apiUrl + `v1/users/${user.username}/academics`;    
    return this.http.put(url, user, {headers:this.getHeaders()});    
  }

  importUsers(file){
    let url = this.apiUrl + `v1/import/users`;    
    return this.http.post(url, file, {headers:this.getHeaders()});    
  }

  delete(id){
    let url = this.apiUrl + `v1/users/${id}`;    
    return this.http.delete(url, {headers:this.getHeaders()});  
  }


}
