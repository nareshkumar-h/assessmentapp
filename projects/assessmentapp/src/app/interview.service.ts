import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from 'auth';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class InterviewService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  getHeaders() {
    let headers = new HttpHeaders();
    let org = this.authService.getLoggedInOrg();
    if (org) {
      headers = headers
        .set('org', org)
        .set('Authorization', 'Bearer ' + this.authService.getToken());
    }
    return headers;
  }

  list() {
    let url = `${environment.API_URL}v1/interviews`;
    return this.http.get(url, { headers: this.getHeaders() });
  }

  getMyInterviews(userId) {
    let url = environment.API_URL + `v1/userinterviews/users/${userId}`;
    return this.http.get(url, { headers: this.getHeaders() });
  }

  getInterviews(userId) {
    let url = environment.API_URL + `v1/interviews`;
    return this.http.get(url, { headers: this.getHeaders() });
  }

  getInterview(id) {
    console.log('Interview Id', id);
    let url = environment.API_URL + `v1/interviews/${id}`;
    return this.http.get(url, { headers: this.getHeaders() });
  }

  getUserInterviewByInterviewId(interviewId) {
    console.log('Interview Id', interviewId);
    let url =
      environment.API_URL + `v1/userinterviews/interviews/${interviewId}`;
    return this.http.get(url, { headers: this.getHeaders() });
  }

  updateRating(id, interview) {
    let data = {
      id: interview.id,
      rating: interview.rating,
      status: interview.status,
      comments: interview.comments,
    };
    let url = environment.API_URL + `v1/userinterviews/updateStatus/${id}`;
    return this.http.patch(url, data, { headers: this.getHeaders() });
  }
}
