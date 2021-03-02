import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { AuthService } from 'projects/auth/src/public-api';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  apiUrl: string;
  constructor(private http: HttpClient, private authService: AuthService) {
    this.apiUrl = environment.PROJECT_API_URL;
  }

  getHeaders() {
    let headers = new HttpHeaders();
    //headers = headers.set('org', this.authService.getLoggedInOrg());
    return headers;
  }

  list() {
    let url = `${this.apiUrl}v1/projects`;
    return this.http.get(url, { headers: this.getHeaders() });
  }

  listUserFeatureRatingsForUser(userId) {
    let url = `${this.apiUrl}v1/ratings/userratings/users/${userId}`;
    return this.http.get(url);
  }

  listReviewRatings() {
    let url = `${this.apiUrl}v1/projectreviews`;
    return this.http.get(url, { headers: this.getHeaders() });
  }

  getFeatureReviewRating(featureId) {
    let url = `${this.apiUrl}v1/projectfeatures/${featureId}/rating`;
    return this.http.get(url, { headers: this.getHeaders() });
  }

  updateFeatureReviewRating(featureId, ratingData) {
    ratingData['reviewedBy'] = this.authService.getLoggedInUsername();
    let url = `${this.apiUrl}v1/projectfeatures/${featureId}/review`;
    return this.http.patch(url, ratingData, { headers: this.getHeaders() });
  }

  findMyProjects(userId) {
    let url = `${this.apiUrl}v1/projects?userId=${userId}`;
    return this.http.get(url);
  }

  findOne(id) {
    let url = `${this.apiUrl}v1/projects/${id}`;
    return this.http.get(url, { headers: this.getHeaders() });
  }

  listFeatures(projectId) {
    let url = `${this.apiUrl}v1/projects/${projectId}/features`;
    return this.http.get(url, { headers: this.getHeaders() });
  }

  listUserFeatures(userId) {
    let url = `${this.apiUrl}v1/projectfeatures/search?userId=${userId}`;
    return this.http.get(url);
  }

  listActivities(projectId) {
    let url = `${this.apiUrl}v1/projects/${projectId}/activities`;
    return this.http.get(url, { headers: this.getHeaders() });
  }

  createProjectRepo(projectId) {
    let url = `${this.apiUrl}v1/projects/${projectId}/repositories`;
    return this.http.post(url, null, { headers: this.getHeaders() });
  }

  createRepo(repo) {
    let url = `${this.apiUrl}v1/projectrepositories`;
    return this.http.post(url, repo, { headers: this.getHeaders() });
  }

  deleteRepo(id) {
    let url = `${this.apiUrl}v1/projectrepositories/${id}?status=false`;
    return this.http.patch(url, null, { headers: this.getHeaders() });
  }

  addRepoAccess(repoId, username) {
    let url = `${this.apiUrl}v1/projectrepositories/${repoId}/users?username=${username}`;
    return this.http.put(url, null, { headers: this.getHeaders() });
  }

  addActivity(projectId, activity) {
    let url = `${this.apiUrl}v1/projects/${projectId}/activities`;
    return this.http.post(url, activity, { headers: this.getHeaders() });
  }
  deleteActivity(projectId, activityId) {
    let url = `${this.apiUrl}v1/projects/${projectId}/activities/${activityId}`;
    return this.http.delete(url, { headers: this.getHeaders() });
  }

  deleteFeature(featureId) {
    let url = `${this.apiUrl}v1/projectsfeatures/${featureId}`;
    return this.http.delete(url, { headers: this.getHeaders() });
  }

  updateActivityStatus(projectId, activityId, status) {
    let url = `${this.apiUrl}v1/projects/${projectId}/activities/${activityId}/updatestatus/${status}`;
    return this.http.patch(url, { headers: this.getHeaders() });
  }
  updateFeatureStatus(featureId, status) {
    let url = `${this.apiUrl}v1/projectfeatures/${featureId}/updatestatus/${status}`;
    return this.http.patch(url, { headers: this.getHeaders() });
  }

  updateTask(projectId, featureId, task) {
    let url = `${this.apiUrl}v1/projects/${projectId}/tasks/${task.id}`;
    return this.http.put(url, task, { headers: this.getHeaders() });
  }

  listTasks(projectId) {
    let url = `${this.apiUrl}v1/projects/${projectId}/tasks`;
    return this.http.get(url, { headers: this.getHeaders() });
  }

  listTasksByStatus(projectId) {
    let url = `${this.apiUrl}v1/projects/${projectId}/tasks?display=STATUS`;
    return this.http.get(url, { headers: this.getHeaders() });
  }

  listTasksByUserId(userId) {
    let url = `${this.apiUrl}v1/projecttasks/search?userId=${userId}`;
    return this.http.get(url, { headers: this.getHeaders() });
  }

  listFeatureTasks(featureId) {
    let url = `${this.apiUrl}v1/projectfeatures/${featureId}/tasks`;
    return this.http.get(url, { headers: this.getHeaders() });
  }

  listSprints(projectId) {
    let url = `${this.apiUrl}v1/projects/${projectId}/sprints`;
    return this.http.get(url, { headers: this.getHeaders() });
  }

  listSprintTasks(projectId) {
    let url = `${this.apiUrl}v1/projects/${projectId}/tasks?display=sprint`;
    return this.http.get(url, { headers: this.getHeaders() });
  }

  findByFeatureId(featureId) {
    let url = `${this.apiUrl}v1/projectfeatures/${featureId}`;
    return this.http.get(url, { headers: this.getHeaders() });
  }

  updateFeature(feature) {
    let url = `${this.apiUrl}v1/projectfeatures/${feature.id}`;
    return this.http.patch(url, feature, { headers: this.getHeaders() });
  }

  updateTaskStatus(featureId, taskId, status) {
    let url = `${this.apiUrl}v1/projectfeatures/${featureId}/tasks/${taskId}/updatestatus/${status}`;
    return this.http.post(url, null, { headers: this.getHeaders() });
  }

  deleteTask(featureId, taskId) {
    let url = `${this.apiUrl}v1/projectfeatures/${featureId}/tasks/${taskId}`;
    return this.http.delete(url, { headers: this.getHeaders() });
  }

  listModules(projectId) {
    let url = `${this.apiUrl}v1/projects/${projectId}/modules`;
    return this.http.get(url, { headers: this.getHeaders() });
  }

  save(project) {
    let createdBy = this.authService.getLoggedInUsername();
    project['userId'] = createdBy;
    project['createdBy'] = createdBy;
    let url = `${this.apiUrl}v1/projects`;
    return this.http.post(url, project, { headers: this.getHeaders() });
  }

  addFeature(projectId, moduleId, feature) {
    let createdBy = this.authService.getLoggedInUsername();
    feature['createdBy'] = createdBy;
    let url = `${this.apiUrl}v1/projects/${projectId}/modules/${moduleId}/features`;
    return this.http.post(url, feature, { headers: this.getHeaders() });
  }

  addTask(featureId, task) {
    let createdBy = this.authService.getLoggedInUsername();
    task['createdBy'] = createdBy;
    let url = `${this.apiUrl}v1/projectfeatures/${featureId}/tasks`;
    return this.http.post(url, task, { headers: this.getHeaders() });
  }

  addModule(projectId, module) {
    let createdBy = this.authService.getLoggedInUsername();
    module['createdBy'] = createdBy;
    let url = `${this.apiUrl}v1/projects/${projectId}/modules`;
    return this.http.post(url, module, { headers: this.getHeaders() });
  }

  listRepositories() {
    let userId = this.authService.getLoggedInUsername();
    let url = `${this.apiUrl}v1/projectrepositories?created_by=${userId}`;
    return this.http.get(url, { headers: this.getHeaders() });
  }

  listMyRepositories(userId) {
    let url = `${this.apiUrl}v1/projectrepositories?created_by=${userId}`;
    return this.http.get(url, { headers: this.getHeaders() });
  }

  listProjectRepositories(projectId) {
    let url = `${this.apiUrl}v1/projectrepositories?projectId=${projectId}`;

    return this.http.get(url, { headers: this.getHeaders() });
  }

  listReviews(status) {
    let userId = this.authService.getLoggedInUsername();
    let url = `${this.apiUrl}v1/projectfeatures/search?status=${status}`;
    return this.http.get(url, { headers: this.getHeaders() });
  }

  listCourses() {
    let url = `${this.apiUrl}v1/courses`;
    return this.http.get(url);
  }

  updateTag(featureId, tag) {
    let url = `${this.apiUrl}v1/projectfeatures/${featureId}/tags`;
    return this.http.patch(url, tag);
  }

  getTechnologies() {
    let technologies = [
      {
        id: 1,
        name: 'HTML',
        icon: 'fab fa-html5',
        skills: ['Form'],
        badgeFileName: 'html5.svg',
        badgeUrl:
          'https://img.shields.io/badge/-HTML5-E34F26?style=flat-square&logo=html5&logoColor=white',
      },
      { id: 2, name: 'JavaScript', icon: 'fab fa-js', skills: ['DOM'] },
      { id: 3, name: 'CSS', icon: 'fab fa-css', skills: ['Form'] },
      { id: 4, name: 'Bootstrap', icon: 'fab fa-bootstrap', skills: ['Form'] },
      { id: 5, name: 'Angular', icon: 'fab fa-angular', skills: ['Form'] },
      {
        id: 6,
        name: 'Node JS',
        icon: 'fab fa-node-js',
        category: 'backend',
        skills: ['Form'],
      },
      { id: 7, name: 'REST API', category: 'backend', skills: ['Form'] },
      {
        id: 8,
        name: 'SQL',
        icon: 'fab fa-sql',
        category: 'backend',
        skills: ['Form'],
      },
      { id: 9, name: 'Agile/Scrum', skills: ['Form'] },
      { id: 10, name: 'Cloud', icon: 'fab fa-cloud', skills: ['Form'] },
      { id: 11, name: 'Mock API', skills: ['Form'] },
    ];
    return technologies;
  }
}
