import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { AuthService } from 'projects/auth/src/public-api';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CourseContentService {

  apiUrl:string;

  constructor(private http:HttpClient, private authService: AuthService) { 
    this.apiUrl = environment.API_URL;
  }

  getHeaders(){    
    let headers = new HttpHeaders();
  //  headers = headers.set('org', this.authService.getLoggedInOrg());
    return headers;
  }

  getUserCourseLectures(userId,courseId){
    let url = `${this.apiUrl}v1/courses/${courseId}/users/${userId}/contents`;
    return this.http.get(url);
  }
  
}