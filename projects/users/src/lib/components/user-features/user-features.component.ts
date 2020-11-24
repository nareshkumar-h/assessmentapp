import { Component, OnInit } from '@angular/core';

import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'projects/auth/src/public-api';
import { UserService } from '../user.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-user-features',
  templateUrl: './user-features.component.html',
  styleUrls: ['./user-features.component.css']
})
export class UserFeaturesComponent implements OnInit {

 
  
  breadcrumbItems  = [ {"icon":"home", "name":"Home","link":"/"},
  {"name":"Users"}];
  userId:string;
  constructor(private route: ActivatedRoute, private userService:UserService, 
    
    private toastr:ToastrService, private authService:AuthService) { 
    this.route.parent.params.subscribe(params=>{
      this.userId = params["id"];
    });
  }

  ngOnInit(): void {
    this.findOne();
    this.listFeatures();
  }

  user:any;
  userFeatures:any;

  findOne(){
    this.userService.findOne(this.userId).subscribe(res=>{
      this.user =res;
    });
  }

  listFeatures(){
    this.userService.getFeatures(this.authService.getLoggedInUserId()).subscribe (res=>{
      this.userFeatures = res;
    });
  }

  submit(){
    this.userService.updateProfile(this.user).subscribe( res=>{
      this.toastr.success("Success");
    },err=>{
      this.toastr.error(err.error.errorMessage);
    });
  }

}
