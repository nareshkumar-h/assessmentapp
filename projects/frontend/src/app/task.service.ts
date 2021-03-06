import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { AuthService } from 'auth';
import { API_URL } from 'projects/project/src/lib/config';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  constructor(
    private http: HttpClient,
    private authService: AuthService,
    @Inject(API_URL) private apiUrl: string
  ) {}

  course: any;

  setCourse(course) {
    this.course = course;
  }

  getHeaders() {
    let headers = new HttpHeaders();
    //headers = headers.set('org', this.authService.getLoggedInOrg());
    return headers;
  }

  getPendingTaskCount(userId) {
    let url = `${this.apiUrl}v1/usercontents/${userId}`;
    return this.http.get(url, { headers: this.getHeaders() });
  }

  getPendingCourseContents(userId, courseId) {
    let url = `${this.apiUrl}v1/usercontents/pendingSections?courseId=${courseId}&userId=${userId}`;
    return this.http.get(url, { headers: this.getHeaders() });
  }
}
