import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { AuthClient } from '@ks-sdk-client/rest';
import { AUTH_CONFIG, Config } from 'projects/auth/src/lib/config';
import { SecurityService } from 'projects/security/src/public-api';

@Injectable({
  providedIn: 'root',
})
export class KtAuthClientService {
  loggedInUser: any;
  loggedInUsername: string;
  org: string;
  headers = {};

  constructor(
    private http: HttpClient,
    @Inject(AUTH_CONFIG) private config: Config,
    private securityService: SecurityService
  ) {}

  getAuthClient() {
    //this.headers['org'] = this.config.ORG_ID;

    return new AuthClient({
      headers: this.headers,
      environment: this.config.API_ENDPOINT,
    });
  }
}
