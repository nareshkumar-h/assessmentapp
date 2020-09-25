import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SiteService } from '../../../site.service';
import { EmployeeService } from '../employee.service';


@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {

  
  breadcrumbItems:any  = [ {"icon":"home", "name":"Home","link":"/"},
   {"name":"Employees", "link": "employees"}];

  constructor(private employeeService: EmployeeService, private router:Router,
     private toastr:ToastrService, private siteService:SiteService) { }

  ngOnInit(): void {
    this.loadMenus();
  }

  user = { username:null, name:null, email:null, password:null, role:null};

  roles:any;
  
  save(user){
    console.log(user);
    this.employeeService.save(user).subscribe (res=>{
      console.log(res);
      this.toastr.success("Success");
      this.router.navigate(['employees']);
    }, err=>{
      this.toastr.error("Error", err.error.errorMessage);
    });

  }

  loadRoles(){
    this.siteService.getRoles().subscribe(res=>{
      this.roles = res;
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
    this.employeeService.importUsers(formData).subscribe(res=>{
      console.log(res);
      this.file = null;
      this.toastr.success("Successfully Users Imported");
      this.router.navigate(['employees']);
    },err=>{
            //this.toastr.error('Error',err.error.errorMessage ,  {positionClass:'toast-top-center',tapToDismiss:true});
            this.toastr.error('Error',err.error.errorMessage);
    });
  }

  
  menus:any = [];

  loadMenus(){
    this.menus = [];
    this.menus.push( {title: "Back",  path:["../"], icontype:"fas fa-arrow-left", access: true});
    this.menus.push( {title: "Users",  path:["../../users"], icontype:"fas fa-users", access: true});
    this.menus.push( {title: "Employees",  path:["../"], icontype:"fas fa-users", access: true});
    // this.menus.push( {title: "Courses",  path:[ "courses"], icontype:"fas fa-book-open", access: true});
    
  }

  cancel(){
    window.history.back();
  }

}
