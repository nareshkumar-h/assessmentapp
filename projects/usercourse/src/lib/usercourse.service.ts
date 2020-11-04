import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from 'projects/auth/src/public-api';
import { API_URL } from './config';

@Injectable({
  providedIn: 'root'
})
export class UserCourseService {

  constructor(private http:HttpClient, private authService:AuthService, @Inject(API_URL)private apiUrl: string) { 
    
  }

  course:any;

  setCourse(course){
    this.course = course;
  }

  getCourse(){
    return this.course;
  }

  
  getHeaders(){    
    let headers = new HttpHeaders();
    headers = headers.set('org', this.authService.getLoggedInOrg());
    return headers;
  }

  
  listCourses(userId){
    let url = `${this.apiUrl}v1/usercourses/users/${userId}`;
    return this.http.get(url, {headers:this.getHeaders()});
  }
  listCoursesByCategory(category,userId){
    let url = `${this.apiUrl}v1/usercourses/users/${userId}`;
    return this.http.get(url, {headers:this.getHeaders()});
  }

  listCourseTopics(userId,courseId){
    let url = `${this.apiUrl}v1/usercoursetopics/${courseId}/topics/${userId}`;
    return this.http.get(url, {headers:this.getHeaders()});
  }

  updateTopicStatus(topicId,status){
    let url = `${this.apiUrl}v1/usercoursetopics/topics/${topicId}/status/${status}`;
    return this.http.post(url, {headers:this.getHeaders()});
  }

  assignTopic(usertopic){
    let url = `${this.apiUrl}v1/usercoursetopics/assignTopic`;
    return this.http.post(url, usertopic,{headers:this.getHeaders()});
  }



  updateTopicReviewStatus(topicId,status){
    let url = `${this.apiUrl}v1/usercoursetopics/topics/${topicId}/review/${status}`;
    return this.http.post(url, {headers:this.getHeaders()});
  }

  updateCourseTopicStatus(courseId,topicId,status){
    let username = this.authService.getLoggedInUsername();
    let url = `${this.apiUrl}v1/usercoursetopics/${courseId}/topics/${topicId}/${status}/${username}`;
    return this.http.post(url, {headers:this.getHeaders()});
  }

  getCourseQuestions(courseId){
    let url = `${this.apiUrl}v1/courses/${courseId}/questions`;
    return this.http.get(url,{headers:this.getHeaders()});
  }

  listAvailableCourses(userId){
    let url = `${this.apiUrl}v1/usercourses/availablecourses/${userId}`;
    return this.http.get(url, {headers:this.getHeaders()});
  }

  enrollCourse(userId,courseId){
    let formData = { userId :userId , courseId : courseId};
    let url = `${this.apiUrl}v1/usercourses`;
    return this.http.post(url, formData, {headers:this.getHeaders()});
  }

  
}
