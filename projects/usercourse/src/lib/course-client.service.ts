import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from 'projects/auth/src/public-api';
import { API_URL } from './config';

@Injectable({
  providedIn: 'root'
})
export class CourseClientService {

  
  constructor(private http:HttpClient, private authService: AuthService,@Inject(API_URL)private apiUrl: string) { 
    
  }

  
  getHeaders(){    
    let headers = new HttpHeaders();
    headers = headers.set('org', this.authService.getLoggedInOrg());
    return headers;
  }

  findOne(courseId){
    let url = `${this.apiUrl}v1/courses/${courseId}`;
    return this.http.get(url,  {headers:this.getHeaders()});
  }

  listTopics(courseId){
    let url = `${this.apiUrl}v1/courses/${courseId}/content`;
    return this.http.get(url,  {headers:this.getHeaders()});
  }

  getCourseContents(courseId){
    let url = `${this.apiUrl}v1/courses/${courseId}/contents`;
    return this.http.get(url,{headers:this.getHeaders()});
  }

  getCourseSections(courseId){
    let url = `${this.apiUrl}v1/courses/${courseId}/sections`;
    return this.http.get(url,{headers:this.getHeaders()});
  }

  getUserCourseContents(userId,courseId){
    let url = `${this.apiUrl}v1/courses/${courseId}/users/${userId}/contents`;
    return this.http.get(url,{headers:this.getHeaders()});
  }

  getUserCourseLectures(userId,courseId){
    let url = `${this.apiUrl}v1/courses/${courseId}/users/${userId}/contents`;
    return this.http.get(url,{headers:this.getHeaders()});
  }
  
  getCourseModuleContents(courseId,moduleId){
    let url = `${this.apiUrl}v1/courses/${courseId}/sections/${moduleId}`;
    return this.http.get(url,{headers:this.getHeaders()});
  }
  
  getCourseContent(courseId,lectureId){
    let url = `${this.apiUrl}v1/courses/${courseId}/lectures/${lectureId}`;
    return this.http.get(url,{headers:this.getHeaders()});
  }

  updateActivity(userId,courseId,lectureId,status){
    let url = `${this.apiUrl}v1/courses/${courseId}/lectures/${lectureId}/${status}?userId=${userId}`;
    return this.http.post(url,{headers:this.getHeaders()});
  }
}
