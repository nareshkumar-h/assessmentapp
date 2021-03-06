import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from 'auth';
import { API_URL } from './config';

@Injectable({
  providedIn: 'root',
})
export class CourseClientService {
  constructor(
    private http: HttpClient,
    private authService: AuthService,
    @Inject(API_URL) private apiUrl: string
  ) {}

  getHeaders() {
    let headers = new HttpHeaders();
    headers = headers.set('org', this.authService.getLoggedInOrg());
    return headers;
  }

  findOne(courseId) {
    let url = `${this.apiUrl}v1/courses/${courseId}`;
    return this.http.get(url, { headers: this.getHeaders() });
  }

  listTopics(courseId) {
    let url = `${this.apiUrl}v1/courses/${courseId}/content`;
    return this.http.get(url, { headers: this.getHeaders() });
  }

  getCourseContents(courseId) {
    let url = `${this.apiUrl}v1/courses/${courseId}/contents`;
    return this.http.get(url, { headers: this.getHeaders() });
  }

  getCourseSections(courseId) {
    let url = `${this.apiUrl}v1/courses/${courseId}/sections`;
    return this.http.get(url, { headers: this.getHeaders() });
  }

  getCourseLectures(courseId, sectionId) {
    let url = `${this.apiUrl}v1/courses/${courseId}/sections/${sectionId}`;
    return this.http.get(url, { headers: this.getHeaders() });
  }

  getUserCourseContents(userId, courseId) {
    let url = `${this.apiUrl}v1/courses/${courseId}/users/${userId}/contents`;
    return this.http.get(url, { headers: this.getHeaders() });
  }

  getUserCourseLectures(userId, courseId) {
    let url = `${this.apiUrl}v1/courses/${courseId}/users/${userId}/contents`;
    return this.http.get(url, { headers: this.getHeaders() });
  }

  getCourseModuleContents(courseId, moduleId) {
    let url = `${this.apiUrl}v1/courses/${courseId}/sections/${moduleId}`;
    return this.http.get(url, { headers: this.getHeaders() });
  }

  getCourseSectionContents(courseId, moduleId) {
    let url = `${this.apiUrl}v1/courses/${courseId}/sections/${moduleId}/contents`;
    return this.http.get(url, { headers: this.getHeaders() });
  }

  getPendingContents(moduleId, userId) {
    let url = `${this.apiUrl}v1/usercontents/sections/${moduleId}/contents?userId=${userId}`;
    return this.http.get(url, { headers: this.getHeaders() });
  }

  getCourseContent(courseId, lectureId) {
    let url = `${this.apiUrl}v1/courses/${courseId}/lectures/${lectureId}`;
    return this.http.get(url, { headers: this.getHeaders() });
  }

  getContent(contentId) {
    let url = `${this.apiUrl}v1/contents/${contentId}`;
    return this.http.get(url, { headers: this.getHeaders() });
  }

  getPendingCourseSections(courseId, userId) {
    let url = `${this.apiUrl}v1/usercontents/pendingSections?userId=${userId}&courseId=${courseId}`;
    return this.http.get(url, { headers: this.getHeaders() });
  }

  updateActivity(userId, contentId, status) {
    let url = `${this.apiUrl}v1/usercontents/${contentId}/${status}?userId=${userId}`;
    return this.http.post(url, { headers: this.getHeaders() });
  }
}
