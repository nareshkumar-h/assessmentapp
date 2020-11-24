import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../user.service';
import { AuthService } from 'projects/auth/src/public-api';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  breadcrumbItems  = [ {"icon":"home", "name":"Home","link":"/"},
  {"name":"Users"}];
  userId:string;
  constructor(private route:ActivatedRoute, private userService:UserService, private toastr:ToastrService) {     

    this.route.parent.params.subscribe(params=>{
      this.userId = params["id"];
    });
  }

  ngOnInit(): void {
    this.findOne();
  }

  user:any;

  findOne(){
    this.userService.findOne(this.userId).subscribe(res=>{
      this.user =res;
      console.log(this.user);
    });
  }

  submit(){
    this.userService.updateProfile(this.user).subscribe( res=>{
      this.toastr.success("Success");
    },err=>{
      this.toastr.error(err.error.errorMessage);
    });
  }

  cancel(){
    window.history.back();
  }

  delete(id){
    let cfm= confirm("Do you want to delete account ?");
    if(cfm){
      this.userService.delete(id).subscribe(res=>{
        this.toastr.success("Success");
      },err=>{
        this.toastr.error(err.error.errorMessage);
      });
    }
  }

}
