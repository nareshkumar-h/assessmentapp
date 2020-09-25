import { Component, OnInit } from '@angular/core';
import { BatchService } from '../batch.service';
import { Router } from '@angular/router';
import { AuthService } from 'projects/auth/src/public-api';
import { MatDialog } from '@angular/material/dialog';
import { AddBatchComponent } from '../add-batch/add-batch.component';
import { SecurityService } from 'projects/security/src/public-api';

@Component({
  selector: 'app-list-batches',
  templateUrl: './list-batches.component.html',
  styleUrls: ['./list-batches.component.css']
})
export class ListBatchesComponent implements OnInit {

  breadcrumbItems:any  = [ {"icon":"home ", "name":"Batches", "link":"/"}];

   userId:string;

  constructor(public dialog: MatDialog,private batchService: BatchService, private router:Router, private authService:AuthService, private securityService:SecurityService) {
    this.userId = this.authService.getLoggedInUsername();
  }

  ngOnInit(): void {
    this.loadMenus();
    this.list();
  }

  batches:any;

  list(){
    this.batchService.list().subscribe( res=>{
      let data:any = res;
      this.batches = data.filter(obj=>obj.active);
      this.createReport(this.batches);
    });
  }

  
  reportData:any = [];
  widgetColors= [ "purple-plum","blue-madison","green-haze","red-intense","blue-madison","red-intense"];

  createReport(data){
    
    this.reportData=[];
    let total = data.length;
    let completed = data.filter(b=>b.status=='COMPLETED').length;
    let inProgress = data.filter(b=>b.status=='IN_PROGRESS').length;
    let scheduled = data.filter(b=>b.status=='SCHEDULED').length;
    let users = data.reduce ( function(sum,obj){  return sum+obj.noOfParticipants},0);
    
    this.reportData.push({"label": "Batches", "value": total  });
    this.reportData.push({"label": "Users", "value": users  });    
    this.reportData.push({"label": "Completed", "value": completed  });
    this.reportData.push({"label": "In Progress", "value": inProgress  });
    this.reportData.push({"label": "Scheduled", "value": scheduled  });
    

  }

  navigate(routeLink, sidebarPath) {
    console.log(routeLink, sidebarPath);
    this.router.navigate([{ outlets: { primary: routeLink, sidebar: sidebarPath } }]);
  }


  menus:any = [];

  loadMenus(){
    this.menus = [];
    this.menus.push( {title: "Home",  path:["../"], icontype:"fas fa-home", access: this.securityService.hasRole(['T','HR'])});
    this.menus.push( {title: "Training",  path:["../training",this.userId], icontype:"fa-chalkboard-teacher fas", access: this.securityService.hasRole(['T','HR'])});
    this.menus.push( {title: "Courses",  path:["../courses"], icontype:"fas fa-book-open", access: this.securityService.hasRole(['T','HR'])});
    this.menus.push( {title: "Batches",  path:[ "../batches"], icontype:"fa-suitcase fas", access: this.securityService.hasRole(['T','HR'])});
    this.menus.push( {title: "Users",  path:["../users"], icontype:"fa-users fas", access: this.securityService.hasRole(['HR'])});
    
  }

  
  openDialog(){
    
    const dialogRef = this.dialog.open(AddBatchComponent,{width: '800px'});
    
    dialogRef.afterClosed().subscribe(result => {
      this.list();
    });
  }

}
