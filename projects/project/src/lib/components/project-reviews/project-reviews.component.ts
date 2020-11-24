import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'projects/auth/src/public-api';
import { ProjectService } from '../../project.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-project-reviews',
  templateUrl: './project-reviews.component.html',
  styleUrls: ['./project-reviews.component.css']
})
export class ProjectReviewsComponent implements OnInit {

  
  userId:any;
  breadcrumbItems  = [ {"icon":"home", "name":"Home","link":"/"},
   {"name":"Projects"}];


  constructor(private projectService:ProjectService, private authService:AuthService, private route:ActivatedRoute) { 
    this.userId = this.authService.getLoggedInUsername();
  }

  ngOnInit(): void {
    this.loadMenus();
    this.list();
  }

  reviews:any;

  reportData:any=[];
  widgetColors= [ "red-intense","purple-plum","blue-madison","green-haze"];

  list(){
    let status= "TESTING";
    this.projectService.listReviews(status).subscribe (res=>{      
      this.reviews = res;
      this.dataSource = new MatTableDataSource<any>(this.reviews);
      this.dataSource.sort = this.sort;  
      //this.createReport(this.reviews);
    });
  }

  displayedColumns: string[] = ['id','projectName','featureName', 'createdBy','priority','status','requestedDate','action'];

  resultsLength:number ;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  
  dataSource:any;


  ngAfterViewInit() {
    this.loadTableViewChild();
  }
  loadTableViewChild() {
    if(this.reviews){
      this.dataSource.paginator = this.paginator;  
      this.dataSource.sort = this.sort;  
    }
  }
  
  menus:any;

  loadMenus(){
    this.menus = [];
    this.menus.push( {title: "Home",  path:["../"], icontype:"fas fa-home", access: true});
    
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

  public doFilter = (value: string) => {
    console.log(value);
    this.dataSource.filter = value.trim().toLocaleLowerCase();
    this.reviews = this.reviews.filter(obj => obj.project.createdBy.indexOf(value) !=-1);
    console.log(this.reviews);
    this.dataSource = new MatTableDataSource<any>(this.reviews);
    this.dataSource.sort = this.sort;  
  }

  sortData(event){
    console.log("Sorting", event);
    let field = event.active;
    let direction = event.direction !=""? event.direction:"desc";
    this.reviews = _.orderBy(this.reviews, [field], [direction]);
    console.log(this.reviews);
    this.dataSource = new MatTableDataSource<any>(this.reviews);
    this.dataSource.sort = this.sort;  
  }

  onRatingChanged(event){
    console.log(event);
  }

}
