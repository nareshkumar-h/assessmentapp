import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../project.service';

@Component({
  selector: 'app-project-repository-list',
  templateUrl: './project-repository-list.component.html',
  styleUrls: ['./project-repository-list.component.css']
})
export class ProjectRepositoryListComponent implements OnInit {

  breadcrumbItems:any;

  constructor(private projectService:ProjectService) { }

  ngOnInit(): void {

    this.list();
  }

  repositories:any;

  list(){
    this.projectService.listRepositories().subscribe(res=>{
      this.repositories = res;
    });
  }



}
