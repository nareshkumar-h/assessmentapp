import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { AuthService } from 'projects/auth/src/public-api';
import { API_URL } from './config';


@Injectable({
  providedIn: 'root'
})
export class ProjectService {  
  
  
  constructor(private http:HttpClient, private authService: AuthService, @Inject(API_URL)private apiUrl: string) { 
    
  }

  
  getHeaders(){    
    let headers = new HttpHeaders();
    headers = headers.set('org', this.authService.getLoggedInOrg());
    return headers;
  }


  

  list(){
    let username = this.authService.getLoggedInUsername();
    let url = `${this.apiUrl}v1/projects?userId=${username}`;
    return this.http.get(url, {headers:this.getHeaders()});
  }

  findMyProjects(userId){
    let url = `${this.apiUrl}v1/userprojects/users/${userId}`;
    return this.http.get(url, {headers:this.getHeaders()});
  }

  findOne(id){
    let url = `${this.apiUrl}v1/projects/${id}`;
    return this.http.get(url, {headers:this.getHeaders()});
  }

  listFeatures(projectId){
    let url = `${this.apiUrl}v1/projects/${projectId}/features`;
    return this.http.get(url, {headers:this.getHeaders()});
  }
  
  listActivities(projectId){
    let url = `${this.apiUrl}v1/projects/${projectId}/activities`;
    return this.http.get(url, {headers:this.getHeaders()});
  }

  addActivity(projectId,activity){
    let url = `${this.apiUrl}v1/projects/${projectId}/activities`;
    return this.http.post(url,activity, {headers:this.getHeaders()});
  }
  deleteActivity(projectId,activityId){
    let url = `${this.apiUrl}v1/projects/${projectId}/activities/${activityId}`;
    return this.http.delete(url,{headers:this.getHeaders()});
  }

  deleteFeature(projectId,featureId){
    let url = `${this.apiUrl}v1/projects/${projectId}/features/${featureId}`;
    return this.http.delete(url,{headers:this.getHeaders()});
  }

  updateActivityStatus(projectId,activityId,status){
    let url = `${this.apiUrl}v1/projects/${projectId}/activities/${activityId}/updatestatus/${status}`;
    return this.http.patch(url,{headers:this.getHeaders()});
  }
  updateFeatureStatus(projectId,featureId,status){
    let url = `${this.apiUrl}v1/projects/${projectId}/features/${featureId}/updatestatus/${status}`;
    return this.http.patch(url,{headers:this.getHeaders()});
  }

  listTasks(projectId){
    let url = `${this.apiUrl}v1/projects/${projectId}/tasks`;
    return this.http.get(url, {headers:this.getHeaders()});
  }

  listFeatureTasks(projectId,featureId){
    let url = `${this.apiUrl}v1/projects/${projectId}/features/${featureId}/tasks`;
    return this.http.get(url, {headers:this.getHeaders()});
  }


  
  listSprints(projectId){
    let url = `${this.apiUrl}v1/projects/${projectId}/tasks?display=sprint`;
    return this.http.get(url, {headers:this.getHeaders()});
  }

  
  
  findByFeatureId(projectId,featureId){
    let url = `${this.apiUrl}v1/projects/${projectId}/features/${featureId}`;
    return this.http.get(url, {headers:this.getHeaders()});
  }

  updateFeature(projectId, feature){
    let url = `${this.apiUrl}v1/projects/${projectId}/features/${feature.id}`;
    return this.http.patch(url, feature, {headers:this.getHeaders()});
  }

  updateTaskStatus(projectId,taskId,status){
    let url = `${this.apiUrl}v1/projects/${projectId}/tasks/${taskId}/updatestatus/${status}`;
    return this.http.post(url, null, {headers:this.getHeaders()});
  }

  deleteTask(projectId,taskId){
    let url = `${this.apiUrl}v1/projects/${projectId}/tasks/${taskId}`;
    return this.http.delete(url, {headers:this.getHeaders()});
  }
  
  listModules(projectId){
    let url = `${this.apiUrl}v1/projects/${projectId}/modules`;
    return this.http.get(url,  {headers:this.getHeaders()});
  }

  save(project){    
    let createdBy = this.authService.getLoggedInUsername();
    project["userId"] = createdBy;
    project["createdBy"] = createdBy;
    let url = `${this.apiUrl}v1/projects`;
    return this.http.post(url, project, {headers:this.getHeaders()});
  }

  addFeature(projectId, moduleId, feature){    
    let createdBy = this.authService.getLoggedInUsername();    
    feature["createdBy"] = createdBy;
    let url = `${this.apiUrl}v1/projects/${projectId}/modules/${moduleId}/features`;
    return this.http.post(url, feature, {headers:this.getHeaders()});
  }

  addTask(projectId, moduleId, task){    
    let createdBy = this.authService.getLoggedInUsername();    
    task["createdBy"] = createdBy;
    let url = `${this.apiUrl}v1/projects/${projectId}/modules/${moduleId}/tasks`;
    return this.http.post(url, task, {headers:this.getHeaders()});
  }

  addModule(projectId, module){    
    let createdBy = this.authService.getLoggedInUsername();    
    module["createdBy"] = createdBy;
    let url = `${this.apiUrl}v1/projects/${projectId}/modules`;
    return this.http.post(url, module, {headers:this.getHeaders()});
  }

  listRepositories(){
    let userId = this.authService.getLoggedInUsername();
    let url = `${this.apiUrl}v1/projectrepositories?created_by=${userId}`;
    return this.http.get(url,  {headers:this.getHeaders()});
  }
}
