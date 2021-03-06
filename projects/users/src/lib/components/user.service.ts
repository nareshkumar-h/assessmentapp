import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from 'auth';
import { environment } from 'projects/frontend/src/environments/environment';
import { API_URL } from '../config';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(
    private http: HttpClient,
    private authService: AuthService,
    @Inject(API_URL) private apiUrl: string
  ) {}

  getHeaders() {
    let headers = new HttpHeaders();
    let org = this.authService.getLoggedInOrg();
    if (org != null) {
      headers = headers.set('org', this.authService.getLoggedInOrg());
    }
    return headers;
  }

  list() {
    let url = `${this.apiUrl}v1/users`;
    return this.http.get(url, { headers: this.getHeaders() });
  }

  listUsers() {
    let url = `${this.apiUrl}v1/users?role=U`;
    return this.http.get(url);
  }

  listEmployees() {
    let url = `${this.apiUrl}v1/users?role=E`;
    return this.http.get(url);
  }

  findOne(id) {
    let url = `${this.apiUrl}v1/users/${id}`;
    return this.http.get(url, { headers: this.getHeaders() });
  }

  getFeatures(id) {
    let url = `${this.apiUrl}v1/users/${id}/features`;
    return this.http.get(url, { headers: this.getHeaders() });
  }

  save(user) {
    let createdBy = this.authService.getLoggedInUsername();
    user['createdBy'] = createdBy;
    user['password'] = 'pass123';
    user['role'] = 'U';
    let url = `${this.apiUrl}v1/users`;
    return this.http.post(url, user, { headers: this.getHeaders() });
  }

  changePassword(user) {
    let userId = this.authService.getLoggedInUsername();
    let url = this.apiUrl + `v1/users/${userId}/updatePassword`;
    return this.http.put(url, user, { headers: this.getHeaders() });
  }

  updateProfile(user) {
    let url = this.apiUrl + `v1/users/${user.username}`;
    return this.http.put(url, user, { headers: this.getHeaders() });
  }

  updateAcademics(user) {
    let url = this.apiUrl + `v1/users/${user.username}/academics`;
    return this.http.put(url, user, { headers: this.getHeaders() });
  }

  importUsers(file) {
    let url = this.apiUrl + `v1/import/users`;
    return this.http.post(url, file, { headers: this.getHeaders() });
  }

  delete(id) {
    let url = this.apiUrl + `v1/users/${id}`;
    return this.http.delete(url, { headers: this.getHeaders() });
  }

  getMentors(userId) {
    let url = this.apiUrl + `v1/users/${userId}/mentors`;
    return this.http.get(url, { headers: this.getHeaders() });
  }
}
