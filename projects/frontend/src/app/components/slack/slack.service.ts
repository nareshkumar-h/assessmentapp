import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { AuthService } from 'auth';
import { environment } from 'projects/frontend/src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SlackService {
  apiUrl: string;
  constructor(private http: HttpClient, private authService: AuthService) {
    this.apiUrl = environment.API_URL;
  }

  getHeaders() {
    let headers = new HttpHeaders();
    headers = headers.set('org', this.authService.getLoggedInOrg());
    return headers;
  }

  list() {
    let url = `${this.apiUrl}v1/slack`;
    return this.http.get(url, { headers: this.getHeaders() });
  }

  findOne(id) {
    let url = `${this.apiUrl}v1/slack/${id}`;
    return this.http.get(url);
  }

  getOrgSlack() {
    let org = this.authService.getLoggedInOrg();
    let url = `${this.apiUrl}v1/slack`;
    return this.http.get(url, { headers: this.getHeaders() });
  }

  save(slack) {
    let url = `${this.apiUrl}v1/slack`;
    return this.http.post(url, slack, { headers: this.getHeaders() });
  }

  delete(id) {
    let url = `${this.apiUrl}v1/slack/${id}`;
    return this.http.delete(url, { headers: this.getHeaders() });
  }
}
