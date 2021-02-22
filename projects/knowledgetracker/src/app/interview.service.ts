import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from 'projects/auth/src/public-api';
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
}
