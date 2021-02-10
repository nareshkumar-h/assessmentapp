import { Injectable } from '@angular/core';
import { AuthService } from 'projects/auth/src/public-api';
import {
  BatchClient,
  UserClient,
  AuthClient,
  CourseClient,
} from '@ks-sdk-client/rest';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class KtClientService {
  loggedInUser: any;
  loggedInUsername: string;
  org: string;
  headers = {};

  constructor(private authService: AuthService) {
    this.loggedInUser = this.authService.getLoggedInUsername();
    this.org = this.authService.getLoggedInOrg();
  }

  getBatchClient() {
    this.headers['org'] = this.org;
    this.headers['Authorization'] = `Bearer ${this.loggedInUser}`;
    return new BatchClient({
      headers: this.headers,
      environment: environment.ENV,
    });
  }
  getCourseClient() {
    this.headers['org'] = this.org;
    this.headers['Authorization'] = `Bearer ${this.loggedInUser}`;
    return new CourseClient({
      headers: this.headers,
      environment: environment.ENV,
    });
  }
  getUserClient() {
    this.headers['org'] = this.org;
    this.headers['Authorization'] = `Bearer ${this.loggedInUser}`;
    return new UserClient({
      headers: this.headers,
      environment: environment.ENV,
    });
  }
  getAuthClient() {
    this.headers['org'] = this.org;
    this.headers['Authorization'] = `Bearer ${this.loggedInUser}`;
    return new AuthClient({
      headers: this.headers,
      environment: environment.ENV,
    });
  }
}
