import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from 'projects/auth/src/public-api';
import { Config, COURSE_CONFIG } from './config';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  private apiUrl: string;
  constructor(
    private http: HttpClient,
    private authService: AuthService,
    @Inject(COURSE_CONFIG) private config: Config
  ) {
    this.apiUrl = this.config.API_ENDPOINT;
  }

  course: any;

  setCourse(course) {
    this.course = course;
  }

  getCourse() {
    return this.course;
  }

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
    let url = `${this.apiUrl}v1/courses`;
    return this.http.get(url, { headers: this.getHeaders() });
  }

  findOne(id) {
    let url = `${this.apiUrl}v1/courses/${id}`;
    return this.http.get(url, { headers: this.getHeaders() });
  }

  listModules(courseId) {
    let url = `${this.apiUrl}v1/courses/${courseId}/modules`;
    return this.http.get(url, { headers: this.getHeaders() });
  }

  listSections(courseId) {
    let url = `${this.apiUrl}v1/courses/${courseId}/sections`;
    return this.http.get(url, { headers: this.getHeaders() });
  }

  save(course) {
    let createdBy = this.authService.getLoggedInUserId();
    course['createdBy'] = createdBy;
    let url = `${this.apiUrl}v1/courses`;
    return this.http.post(url, course, { headers: this.getHeaders() });
  }

  update(id, course) {
    let createdBy = this.authService.getLoggedInUserId();
    course['createdBy'] = createdBy;
    let url = `${this.apiUrl}v1/courses/${id}`;
    return this.http.put(url, course, { headers: this.getHeaders() });
  }
  delete(id) {
    let createdBy = this.authService.getLoggedInUserId();
    let url = `${this.apiUrl}v1/courses/${id}`;
    return this.http.delete(url, { headers: this.getHeaders() });
  }

  addModule(courseId, module) {
    module['createdBy'] = this.authService.getLoggedInUserId();
    let url = `${this.apiUrl}v1/courses/${courseId}/modules`;
    return this.http.post(url, module, { headers: this.getHeaders() });
  }

  addSection(courseId, section) {
    section['createdBy'] = this.authService.getLoggedInUserId();
    let url = `${this.apiUrl}v1/courses/${courseId}/sections`;
    return this.http.post(url, section, { headers: this.getHeaders() });
  }

  addLecture(courseId, lecture) {
    lecture['createdBy'] = this.authService.getLoggedInUserId();
    let url = `${this.apiUrl}v1/courses/${courseId}/sections/${lecture.sectionId}/lectures`;
    return this.http.post(url, lecture, { headers: this.getHeaders() });
  }

  deleteLecture(courseId, lectureId) {
    //lecture["createdBy"] = this.authService.getLoggedInUserId();
    let url = `${this.apiUrl}v1/courses/${courseId}/lectures/${lectureId}`;
    return this.http.delete(url, { headers: this.getHeaders() });
  }

  deleteModule(courseId, moduleId) {
    let url = `${this.apiUrl}v1/courses/${courseId}/modules/${moduleId}`;
    return this.http.delete(url, { headers: this.getHeaders() });
  }

  deleteSection(courseId, sectionId) {
    let url = `${this.apiUrl}v1/courses/${courseId}/sections/${sectionId}`;
    return this.http.delete(url, { headers: this.getHeaders() });
  }

  addTopic(courseId, moduleId, topic) {
    topic['createdBy'] = this.authService.getLoggedInUserId();
    let url = `${this.apiUrl}v1/courses/${courseId}/modules/${moduleId}/topics`;
    return this.http.post(url, topic, { headers: this.getHeaders() });
  }

  deleteTopic(courseId, moduleId, topicId) {
    let url = `${this.apiUrl}v1/courses/${courseId}/modules/${moduleId}/topics/${topicId}`;
    return this.http.delete(url, { headers: this.getHeaders() });
  }

  listTopics(courseId) {
    let url = `${this.apiUrl}v1/courses/${courseId}/topics`;
    return this.http.get(url, { headers: this.getHeaders() });
  }

  getTopics(courseId) {
    let url = `${this.apiUrl}v1/courses/${courseId}/content`;
    return this.http.get(url, { headers: this.getHeaders() });
  }

  download(courseId) {
    let url = `${this.apiUrl}v1/courseexport/${courseId}`;
    return this.http.get(url, {
      headers: this.getHeaders(),
      responseType: 'blob' as 'json',
    });
  }

  publish(courseId) {
    let url = `${this.apiUrl}v1/courses/${courseId}/publish`;
    return this.http.put(url, null, { headers: this.getHeaders() });
  }

  importCourses(file) {
    let userId = this.authService.getLoggedInUserId();
    let url = this.apiUrl + `v1/courses/import?createdBy=${userId}`;
    return this.http.post(url, file, { headers: this.getHeaders() });
  }

  uploadCourseImage(courseId, file) {
    let userId = this.authService.getLoggedInUserId();
    let url = this.apiUrl + `v1/courses/${courseId}/uploadImage`;
    return this.http.post(url, file, { headers: this.getHeaders() });
  }

  getCourseContents(courseId) {
    let url = `${this.apiUrl}v1/courses/${courseId}/contents`;
    return this.http.get(url, { headers: this.getHeaders() });
  }

  getCourseModuleContents(courseId, moduleId) {
    let url = `${this.apiUrl}v1/courses/${courseId}/lectures/${moduleId}`;
    return this.http.get(url, { headers: this.getHeaders() });
  }

  getCourseContent(courseId, contentId) {
    let url = `${this.apiUrl}v1/courses/${courseId}/contents/${contentId}`;
    return this.http.get(url, { headers: this.getHeaders() });
  }

  addCourseContent(content) {
    let url = `${this.apiUrl}v1/contents`;
    return this.http.post(url, content, { headers: this.getHeaders() });
  }

  updateContent(content) {
    let url = `${this.apiUrl}v1/contents/${content.id}`;
    return this.http.put(url, content, { headers: this.getHeaders() });
  }

  deleteCourseContent(contentId) {
    let url = `${this.apiUrl}v1/contents/${contentId}`;
    return this.http.delete(url, { headers: this.getHeaders() });
  }

  importCourseContent(id, content) {
    let userId = this.authService.getLoggedInUserId();
    let url =
      this.apiUrl + `v1/courses/${id}/import/content?createdBy=${userId}`;
    return this.http.post(url, content, { headers: this.getHeaders() });
  }

  getCourseQuestions(courseId) {
    let url = `${this.apiUrl}v1/courses/${courseId}/questions`;
    return this.http.get(url, { headers: this.getHeaders() });
  }

  getCourseQuestion(courseId, contentId) {
    let url = `${this.apiUrl}v1/courses/${courseId}/questions/${contentId}`;
    return this.http.get(url, { headers: this.getHeaders() });
  }

  addCourseQuestion(courseId, content) {
    let url = `${this.apiUrl}v1/courses/${courseId}/questions`;
    return this.http.post(url, content, { headers: this.getHeaders() });
  }

  deleteCourseQuestion(courseId, contentId) {
    let url = `${this.apiUrl}v1/courses/${courseId}/questions/${contentId}`;
    return this.http.delete(url, { headers: this.getHeaders() });
  }

  importCourseQuestion(id, content) {
    let userId = this.authService.getLoggedInUserId();
    let url =
      this.apiUrl + `v1/courses/${id}/import/questions?createdBy=${userId}`;
    return this.http.post(url, content, { headers: this.getHeaders() });
  }
}
