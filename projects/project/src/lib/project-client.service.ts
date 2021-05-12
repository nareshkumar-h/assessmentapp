import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'projects/projecttracker/src/environments/environment';
import { Apollo, gql } from 'apollo-angular';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class ProjectClientService {
  apiUrl: string;
  constructor(private http: HttpClient, private apollo: Apollo) {
    this.apiUrl = environment.API_URL;
  }

  getProjects() {
    const GET_PROJECTS = gql`
      {
        projects {
          id
          name
          project_prefix
          no_of_features
          created_by
          days
          flag
          status
        }
      }
    `;
    return this.apollo
      .watchQuery({
        query: GET_PROJECTS,
      })
      .valueChanges.pipe(map((result) => result.data['projects']));
  }

  getMyProjects(userId:any) {
    const GET_PROJECTS = gql`
      {
        myprojects(userId:"${userId}") {
          id
          name
          project_prefix
          no_of_features
          created_by
          days
          flag
          status
        }
      }
    `;
    return this.apollo
      .watchQuery({
        query: GET_PROJECTS,
      })
      .valueChanges.pipe(map((result) => result.data['myprojects']));
  }

  getProject(id:any) {
    const GET_PROJECTS = gql`
    {
      project(projectId:${id}){
          id,name, project_prefix,no_of_features,created_by,status,modules{
          id,name
      },
      features {
          id,name,module_id,module_name,status
      }}
  }
    `;
    return this.apollo
      .watchQuery({
        query: GET_PROJECTS,
      })
      .valueChanges.pipe(map((result) => result.data['project']));
  }
}
