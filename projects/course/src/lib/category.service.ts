import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Config, COURSE_CONFIG } from './config';
import { AuthService } from 'auth';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private apiUrl: string;
  constructor(
    private http: HttpClient,
    private authService: AuthService,
    @Inject(COURSE_CONFIG) private config: Config
  ) {
    this.apiUrl = this.config.API_ENDPOINT;
  }

  getHeaders() {
    let headers = new HttpHeaders();
    headers = headers.set('org', this.authService.getLoggedInOrg());
    return headers;
  }

  list() {
    let url = `${this.apiUrl}v1/categories`;
    return this.http.get(url, { headers: this.getHeaders() });
  }

  findOne(id) {
    let url = `${this.apiUrl}v1/categories/${id}`;
    return this.http.get(url, { headers: this.getHeaders() });
  }

  delete(id) {
    let url = `${this.apiUrl}v1/categories/${id}`;
    return this.http.delete(url, { headers: this.getHeaders() });
  }

  save(category) {
    let url = `${this.apiUrl}v1/categories`;
    return this.http.post(url, category, { headers: this.getHeaders() });
  }

  update(category) {
    let url = `${this.apiUrl}v1/categories/` + category.id;
    return this.http.put(url, category, { headers: this.getHeaders() });
  }
}
