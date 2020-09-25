import { Component, Inject, OnInit } from '@angular/core';
import { ProjectService } from '../../project.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'projects/auth/src/public-api';import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
;

@Component({
  selector: 'app-add-project-feature',
  templateUrl: './add-project-feature.component.html',
  styleUrls: ['./add-project-feature.component.css']
})
export class AddProjectFeatureComponent implements OnInit {

  projectId:number;
  module:any;
  moduleId:number;
  moduleName:string;
  breadcrumbItems  = [ {"icon":"home", "name":"Home","link":"/"},
   {"name":"Projects"}];
  
  constructor(private projectService:ProjectService, private route:ActivatedRoute, private router:Router, private authService:AuthService,
    @Inject(MAT_DIALOG_DATA) public data: any, private dialog:MatDialog,
    private toastr:ToastrService) { 
    console.log(data);
      this.module = data['moduleObj'];
      this.projectId = data['projectId'];
  }

  today:string = new Date().toJSON().substr(0,10);
  ngOnInit(): void {
  }

  modules:any;

  selectedModule:any;

  feature:any = { projectModule: { id : null }, name: null, startDate:this.today, completionDate:this.today}

  save(feature){
    this.feature["projectModule"]= this.module;
    this.projectService.addFeature(this.projectId
      ,this.module.id,feature).subscribe (res=>{
      console.log(res);
      this.toastr.success("Success");
      this.dialog.closeAll();
    //  this.router.navigate(['projects/' + this.projectId + "/features/" + this.authService.getLoggedInUsername()])
    });
  }

  
  cancel(){
    window.history.back();
  }

}
