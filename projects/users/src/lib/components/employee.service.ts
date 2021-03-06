import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { AuthService } from 'auth';
import { environment } from 'projects/frontend/src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
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
    let url = `${this.apiUrl}v1/employees`;
    return this.http.get(url, { headers: this.getHeaders() });
  }

  pendingUsers() {
    let url = `${this.apiUrl}v1/employees?status=PENDING`;
    return this.http.get(url, { headers: this.getHeaders() });
  }

  findOne(id) {
    let url = `${this.apiUrl}v1/employees/${id}`;
    return this.http.get(url, { headers: this.getHeaders() });
  }

  save(user) {
    let createdBy = this.authService.getLoggedInUsername();
    user['createdBy'] = createdBy;
    user['password'] = 'pass123';
    let url = `${this.apiUrl}v1/employees`;
    return this.http.post(url, user, { headers: this.getHeaders() });
  }

  delete(userId) {
    let url = `${this.apiUrl}v1/employees/${userId}`;
    return this.http.delete(url, { headers: this.getHeaders() });
  }

  importUsers(file) {
    let url = this.apiUrl + `v1/import/employees`;
    return this.http.post(url, file, { headers: this.getHeaders() });
  }

  activateAccount(user) {
    let url = this.apiUrl + `v1/employees/${user.id}/activateAccount`;
    return this.http.put(url, user, { headers: this.getHeaders() });
  }
}
