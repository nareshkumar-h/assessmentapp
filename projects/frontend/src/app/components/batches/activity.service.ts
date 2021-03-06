import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { AuthService } from 'auth';

@Injectable({
  providedIn: 'root',
})
export class ActivityService {
  apiUrl: string;
  constructor(private http: HttpClient, private authService: AuthService) {
    this.apiUrl = environment.API_URL;
  }

  getHeaders() {
    let headers = new HttpHeaders();
    headers = headers.set('org', this.authService.getLoggedInOrg());
    return headers;
  }

  getCourseReport(userId) {
    let url = `${this.apiUrl}v1/reports/topics/daily?userId=${userId}`;
    return this.http.get(url, { headers: this.getHeaders() });
  }
}
