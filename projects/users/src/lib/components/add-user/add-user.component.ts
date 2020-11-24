import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../user.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  breadcrumbItems:any  = [ {"icon":"home", "name":"Home","link":"/"},
   {"name":"Users", "link": "users"}];

  constructor(private userService: UserService, private router:Router,private toastr:ToastrService) { }

  ngOnInit(): void {
    this.loadMenus();
  }
  

  user = { username:null, name:null, email:null, password:null, role:null};

  save(user){
    this.userService.save(user).subscribe (res=>{
      console.log(res);
      this.toastr.success("Success");
      this.router.navigate(['users']);
    },
    err=>{
      this.toastr.error(err.error.errorMessage);
    });
  }

  file:any;

  onFileSelect(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.file = file;
    }
  }

  uploadFile(){
    console.log("Upload file");
    const formData = new FormData();
    formData.append('file', this.file);
    console.log(this.file);
    this.userService.importUsers(formData).subscribe(res=>{
      console.log(res);
      this.file = null;
      this.toastr.success("Successfully Users Imported");
      this.router.navigate(['users']);
    },err=>{
            //this.toastr.error('Error',err.error.errorMessage ,  {positionClass:'toast-top-center',tapToDismiss:true});
            this.toastr.error('Error',err.error.errorMessage);
    });
  }

  menus:any = [];

  loadMenus(){
    this.menus = [];
    this.menus.push( {title: "Back",  path:["../"], icontype:"fas fa-arrow-left", access: true});
    this.menus.push( {title: "Users",  path:["../"], icontype:"fas fa-users", access: true});
    //this.menus.push( {title: "Employees",  path:["../../employees/ACTIVE"], icontype:"fas fa-users", access: true});
    // this.menus.push( {title: "Courses",  path:[ "courses"], icontype:"fas fa-book-open", access: true});
    
  }


}
