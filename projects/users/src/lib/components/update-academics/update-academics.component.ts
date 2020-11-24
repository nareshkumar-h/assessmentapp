import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../user.service';
import { AuthService } from 'projects/auth/src/public-api';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-update-academics',
  templateUrl: './update-academics.component.html',
  styleUrls: ['./update-academics.component.css']
})
export class UpdateAcademicsComponent implements OnInit {

  
  breadcrumbItems  = [ {"icon":"home", "name":"Home","link":"/"},
  {"name":"Users"}];
  userId:string;
  constructor(private route:ActivatedRoute, private userService:UserService, private toastr:ToastrService, private authService:AuthService) { 
    
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
    });
  }

  submit(){
    this.userService.updateAcademics(this.user).subscribe( res=>{
      this.toastr.success("Success");
    },err=>{
      this.toastr.error(err.error.errorMessage);
    });
  }

}
