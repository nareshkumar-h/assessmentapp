import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../project.service';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { AddProjectFeatureComponent } from '../add-project-feature/add-project-feature.component';
import { AuthService } from 'projects/auth/src/public-api';


@Component({
  selector: 'app-project-feature-list',
  templateUrl: './project-feature-list.component.html',
  styleUrls: ['./project-feature-list.component.css']
})
export class ProjectFeatureListComponent implements OnInit {

  breadcrumbItems  = [ {"icon":"home", "name":"Home","link":"/"},
   {"name":"Projects"}];

  projectId: string;
  userId:string;
  isLoggedInUser:boolean;

  constructor(public dialog: MatDialog,private projectService: ProjectService, private authService:AuthService,private route: ActivatedRoute,
    private toastr: ToastrService) {
    this.route.parent.params.subscribe(params => {
      
      this.projectId = params['projectId'];
    });
  }

  ngOnInit(): void {
    this.findOne();
    this.listModules();
    this.listFeatures();
  }

  projectFeatures: any;
  modules:any;

  project: any;

  findOne(){
    this.projectService.findOne(this.projectId).subscribe (res=>{
      this.project = res;
      this.isLoggedInUser = this.authService.getLoggedInUsername() == this.project["createdBy"];
    });
  }

  listModules(){
    this.projectService.listModules(this.projectId).subscribe (res=>{
      this.modules = res;
    })
  }

  listFeatures() {
    this.projectService.listFeatures(this.projectId).subscribe(res => {
      this.projectFeatures = <{}>res;
      this.createReport(this.projectFeatures);
    });
  }

  getModuleId(moduleName){
    let tasks = this.projectFeatures[moduleName];
    
  }

  reportData: any = [];
  widgetColors = [ "green-haze", "blue-madison"];

  createReport(data) {
    this.reportData = [];

    let modules = Object.keys(data);
    console.log(modules);

    var count = 0;
    for (let moduleName in this.projectFeatures) {
      let features = this.projectFeatures[moduleName];      
      count += features.length;
    }
    this.reportData.push({"label":"Modules", "value":modules.length});
    this.reportData.push({"label":"Features", "value":count});
  }

  addModule(){
    let moduleName = prompt("Enter Module Name");
    if(moduleName.length>0){
      let module = { name: moduleName};
      this.projectService.addModule(this.projectId, module).subscribe(res=>{
        this.toastr.success("Successfully Added");
        this.refresh();
      });
      console.log(moduleName);
    }
  }

  refresh(){
    this.listModules();
    this.listFeatures();
  }

  addFeatureDialog(module){
    const dialogRef = this.dialog.open(AddProjectFeatureComponent,
      {width: '800px', height:'fit-content', data: {projectId: this.projectId, moduleObj: module}});
    
    dialogRef.afterClosed().subscribe(result => {
      this.refresh();
    });
  }

}
