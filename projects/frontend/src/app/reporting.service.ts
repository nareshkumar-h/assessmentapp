import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { AuthService } from 'auth';
import { API_URL } from 'projects/project/src/lib/config';

@Injectable({
  providedIn: 'root',
})
export class ReportingService {
  constructor(
    private http: HttpClient,
    private authService: AuthService,
    @Inject(API_URL) private apiUrl: string
  ) {}

  getHeaders() {
    let headers = new HttpHeaders();
    //headers = headers.set('org', this.authService.getLoggedInOrg());
    return headers;
  }

  listUserRatings() {
    let url = `${this.apiUrl}v1/ratings/userratings`;
    return this.http.get(url);
  }

  listUserRatingsForUser(userId) {
    let url = `${this.apiUrl}v1/ratings/userratings/${userId}`;
    return this.http.get(url);
  }

  findMyProjects(userId) {
    let url = `${this.apiUrl}v1/projects?userId=${userId}`;
    return this.http.get(url);
  }
}
