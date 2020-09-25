import { Component, OnInit, Optional, Inject } from '@angular/core';
import { BatchService } from '../batch.service';

import { ActivatedRoute, Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../users/user.service';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-add-batch-user',
  templateUrl: './add-batch-user.component.html',
  styleUrls: ['./add-batch-user.component.css']
})
export class AddBatchUserComponent implements OnInit {

  batchId:string;
  breadcrumbItems:any  = [ {"icon":"home", "name":"Home","link":"/"},
   {"name":"Batches", "link":"../../"}];

  constructor(private dialog:MatDialog,private batchService:BatchService,private userService:UserService, 
     private router:Router, private route:ActivatedRoute, private toastr:ToastrService,
     @Optional() @Inject(MAT_DIALOG_DATA) public data: any) { 

      this.batchId = data.batchId;
      this.batchUsers =  data.users;
      console.log("batch Users:", JSON.stringify(this.batchUsers));

    // this.route.parent.params.subscribe ( params=>{
    //   this.batchId = params["id"];
    //   this.breadcrumbItems.push({name:this.batchId , link: "../"});
    //   this.batchUser["batchId"] = this.batchId;
      
    // });
      this.breadcrumbItems.push({name:this.batchId , link: "../"});
       this.batchUser["batchId"] = this.batchId;

  }

  today:string = new Date().toJSON().substr(0,10);

  ngOnInit(): void {
    this.listUsers();
  }

  batch:any;


  batchUser = { batchId: null, userId:null};
  
  batchUsers:any;

  users:any;

  listUsers(){
    this.userService.list().subscribe (res=>{
      let data:any = res;
      console.log(JSON.stringify(this.batchUsers));
      this.users= data.filter( obj=> this.batchUsers.indexOf(obj.username) ==-1 );
    });
  }


  save(batchUser){
    console.log(batchUser);
    
    this.batchService.addUser(this.batchId, batchUser).subscribe(res=>{
      this.toastr.success("Succesfully added user to batch");
      //this.router.navigate(['batches/'+ this.batchId + "/users"]);
      this.dialog.closeAll();
    },err=>{
      console.error(err);
    });
  }

  cancel(){
    //this.router.navigate(['batches/'+ this.batchId +"/users"]);
    this.dialog.closeAll();
  }

}
