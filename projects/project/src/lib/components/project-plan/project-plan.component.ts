import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-project-plan',
  templateUrl: './project-plan.component.html',
  styleUrls: ['./project-plan.component.css']
})
export class ProjectPlanComponent implements OnInit {

  breadcrumbItems  = [ {"icon":"home", "name":"Home","link":"/"},
   {"name":"Projects"}];
   
  constructor() { }

  ngOnInit(): void {
  }

}
