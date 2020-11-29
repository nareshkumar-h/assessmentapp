import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import * as _ from 'lodash';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'projects/auth/src/public-api';
import { ProjectService } from '../../project.service';
import { AddSkillComponent } from '../add-skill/add-skill.component';

@Component({
  selector: 'lib-review-feature',
  templateUrl: './review-feature.component.html',
  styleUrls: ['./review-feature.component.css']
})
export class ReviewFeatureComponent implements OnInit {

  userId:any;
  projectId:any;
  featureId:any;
  isMentor:any;

  breadcrumbItems  = [ {"icon":"home", "name":"Home","link":"/"},
   {"name":"Projects"}];


  constructor(private dialog:MatDialog, private projectService:ProjectService, private authService:AuthService, private route:ActivatedRoute, private toastr:ToastrService) { 
    this.userId = this.authService.getLoggedInUsername();

    this.isMentor =  this.authService.hasRoleAccess("T");
    this.route.parent.params.subscribe(params=>{
      this.projectId = params["projectId"];
      console.log("ProjectId:"+ this.projectId);
    });
    this.route.params.subscribe ( params=>{
      this.featureId  = params["featureId"];      
    });
  }

  ngOnInit(): void {
    
    this.loadMenus();
    this.list();
    this.findOne();
  }

  getUrl(url){
    
    let projectUrls = url!=null?url.split(","):[];
    
    
    return projectUrls;
  }

  project;
  features:any;

  feature:any;

  findProjectDetail(){
    this.projectService.findOne(this.feature.project.id).subscribe(res=>{
      this.project = res;
    });
  }
  reportData:any=[];
  widgetColors= [ "red-intense","purple-plum","blue-madison","green-haze"];

  list(){
    this.projectService.getFeatureReviewRating(this.featureId).subscribe (res=>{      
      this.features = res;

      //this.createReport(this.features);
    });
  }

  findOne(){
    this.projectService.findByFeatureId(this.featureId).subscribe(res=>{
      this.feature = res;
      this.findProjectDetail();
    })
  }

  displayedColumns: string[] = ['id','name','createdBy','functionality','design','bestPractices','timeline','complexity','action'];

  resultsLength:number ;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  
  dataSource:any;


  ngAfterViewInit() {
    this.loadTableViewChild();
  }
  loadTableViewChild() {
    if(this.features){
      this.dataSource.paginator = this.paginator;  
      this.dataSource.sort = this.sort;  
    }
  }
  
  menus:any;

  loadMenus(){
    this.menus = [];
    this.menus.push( {title: "Home",  path:["../../"], icontype:"fas fa-home", access: true});
    
    this.menus.push( {title: "My Projects",  path:["../"], icontype:"fas fa-user", access: true});
    this.menus.push( {title: "All Projects",  path:[ "../all"], icontype:"fas fa-tools", access:true});    
    this.menus.push( {title: "Add Project",  path:[ "../addproject"], icontype:"fas fa-plus", access: true});      
  }

  matches(obj, rating){
    let total = 0;
    if(obj.functionality == rating ) total++;
    if(obj.design == rating ) total++;
    if(obj.timeline == rating ) total++;
    if(obj.bestPractices == rating) total++;
    // if(obj.documentation == rating) total++;
    if(obj.complexity == rating) total++;
    console.log(rating +",total=" , total);
    return total;
  }

  getRatingSummary(data){
    let result = { "1": 0, "2": 0, "3": 0, "4":0, "5":0 };
    for(let obj of data){
      result["1"]= result["1"] + this.matches(obj,1);
      result["2"]= result["2"] + this.matches(obj,2);
      result["3"]= result["3"] + this.matches(obj,3);
      result["4"]= result["4"] + this.matches(obj,4);
      result["5"]= result["5"] + this.matches(obj,5);
    }
    
    return result;
  }

  createReport(data){
    
    this.reportData=[];
    let dataObj = this.getRatingSummary(data);
    
    let r1 = dataObj["1"];//this.data.filter(obj=>this.matches(obj,1)).length;
    let r2 = dataObj["2"];//data.filter(obj=>this.matches(obj,2)).length;
    let r3 = dataObj["3"];//data.filter(obj=>this.matches(obj,3)).length;
    let r4 = dataObj["4"];//data.filter(obj=>this.matches(obj,4)).length;
    let r5 = dataObj["5"];//data.filter(obj=>this.matches(obj,5)).length;
    
    this.reportData.push({"label": "Need to Improve", "value": r1+r2  }); 
    this.reportData.push({"label": "Average", "value": r3  });    
    this.reportData.push({"label": "Good", "value": r4  });
    this.reportData.push({"label": "Consistent", "value": r5  });
    
    

  }

  reviewRating = {featureId:null, status:null,functionality:null,reviewedBy:null};

  back(){
    window.history.back();
  }

  updateFeatureStatus(status){
    //this.toastr.success(status);
    this.projectService.updateFeatureStatus(this.feature.id,status).subscribe(res=>{
      this.toastr.success("Successfully Updated");
      this.feature.status = status;
      this.back();
    });
  }

  
  
  addSkillModal(module,feature){
    const dialogRef = this.dialog.open(AddSkillComponent,
      {width: '100%', height:'fit-content', data: {featureId: feature.id, tags: feature.tags}});
    
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        
      }
      
      //this.features.tags.push(result);
    });
  }


 
}
