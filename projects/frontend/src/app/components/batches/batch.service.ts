import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from 'projects/auth/src/public-api';
import { environment } from 'projects/frontend/src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BatchService {
  apiUrl: string;
  constructor(private http: HttpClient, private authService: AuthService) {
    this.apiUrl = environment.API_URL;
  }

  getHeaders() {
    let headers = new HttpHeaders();
    headers = headers.set('org', this.authService.getLoggedInOrg());
    return headers;
  }

  // list1() {
  //   let url = `${this.apiUrl}v1/batches`;
  //   return this.http.get(url, { headers: this.getHeaders() });
  // }

  // findOne1(id) {
  //   let url = `${this.apiUrl}v1/batches/${id}`;
  //   return this.http.get(url);
  // }

  // save1(batch) {
  //   let url = `${this.apiUrl}v1/batches`;
  //   return this.http.post(url, batch, { headers: this.getHeaders() });
  // }

  // update(id, batch) {
  //   let createdBy = this.authService.getLoggedInUsername();
  //   batch['createdBy'] = createdBy;
  //   let url = `${this.apiUrl}v1/batches/${id}`;
  //   return this.http.put(url, batch, { headers: this.getHeaders() });
  // }
  // delete(id) {
  //   let createdBy = this.authService.getLoggedInUsername();
  //   let url = `${this.apiUrl}v1/batches/${id}`;
  //   return this.http.delete(url, { headers: this.getHeaders() });
  // }

  // listUsers(id) {
  //   let url = `${this.apiUrl}v1/batches/${id}/users`;
  //   return this.http.get(url, { headers: this.getHeaders() });
  // }

  // findCourse(id, courseId) {
  //   let url = `${this.apiUrl}v1/batches/${id}/courses/${courseId}`;
  //   return this.http.get(url);
  // }

  // listCourses1(id) {
  //   let url = `${this.apiUrl}v1/batches/${id}/courses`;
  //   return this.http.get(url, { headers: this.getHeaders() });
  // }

  // listCourseTopics(batchId, courseId) {
  //   let url = `${this.apiUrl}v1/batchcoursetopics/${courseId}/batches/${batchId}`;
  //   return this.http.get(url, { headers: this.getHeaders() });
  // }

  // updateTopicStatus(topicId, status) {
  //   let url = `${this.apiUrl}v1/batchcoursetopics/batchtopics/${topicId}/status/${status}`;
  //   return this.http.patch(url, null, { headers: this.getHeaders() });
  // }

  // assignCourse(id, batchcourse) {
  //   batchcourse['trainerId'] = this.authService.getLoggedInUsername();
  //   let url = `${this.apiUrl}v1/batches/${id}/courses`;
  //   return this.http.post(url, batchcourse, { headers: this.getHeaders() });
  // }

  // updateCourse(id, batchcourse) {
  //   let url = `${this.apiUrl}v1/batches/${id}/courses/${batchcourse.courseId}`;
  //   return this.http.put(url, batchcourse, { headers: this.getHeaders() });
  // }

  // addUser(id, batchuser) {
  //   let url = `${this.apiUrl}v1/batches/${id}/users`;
  //   return this.http.post(url, batchuser, { headers: this.getHeaders() });
  // }

  // removeUser(id, userId) {
  //   let url = `${this.apiUrl}v1/batches/${id}/users/${userId}`;
  //   return this.http.delete(url, { headers: this.getHeaders() });
  // }

  // deleteCourse(id, courseId) {
  //   //batchcourse["trainerId"] = this.authService.getLoggedInUsername();
  //   let url = `${this.apiUrl}v1/batches/${id}/courses/${courseId}`;
  //   return this.http.delete(url, { headers: this.getHeaders() });
  // }

  // updateBatchCoursePlan(id, userTopicId, planDate) {
  //   //batchcourse["trainerId"] = this.authService.getLoggedInUsername();
  //   let url = `${this.apiUrl}v1/batchcoursetopics/batchtopics/${userTopicId}/plan/${planDate}`;
  //   return this.http.patch(url, { headers: this.getHeaders() });
  // }

  // getActivities(id) {
  //   let url = `${this.apiUrl}v1/batches/${id}/activity`;
  //   return this.http.get(url, { headers: this.getHeaders() });
  // }
}
