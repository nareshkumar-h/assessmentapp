import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from 'projects/auth/src/public-api';
import { environment } from 'projects/frontend/src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class TrainerService {

  
  apiUrl:string;
  constructor(private http:HttpClient, private authService: AuthService ) { 
    this.apiUrl = environment.API_URL;
  }

  
  getHeaders(){    
    let headers = new HttpHeaders();
    headers = headers.set('org', this.authService.getLoggedInOrg());
    return headers;
  }

  
  listCourses(userId){
    let url = `${this.apiUrl}v1/batchcourses/trainers/${userId}`;
    return this.http.get(url, {headers:this.getHeaders()});
  }
}
