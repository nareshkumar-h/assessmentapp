import { Component, OnInit, ViewChild } from '@angular/core';
import { EmployeeService } from '../employee.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-list-employees',
  templateUrl: './list-employees.component.html',
  styleUrls: ['./list-employees.component.css']
})
export class ListEmployeesComponent implements OnInit {

  breadcrumbItems  = [ {"icon":"home", "name":"Home","link":"/"},
   {"name":"Employees"}];
  
  status:string = "true"; 
  constructor(private employeeService:EmployeeService, private toastr:ToastrService,private route:ActivatedRoute, private router:Router){
    this.route.params.subscribe(params=>{
      //this.status = params["status"];
      //this.router.routeReuseStrategy.shouldReuseRoute = () => false;

    })
  }

  filteredRecords:any;

  filter(){
    let status = this.status == "true";    
    this.filteredRecords = this.users.filter(obj=>obj.active==status);    
    this.dataSource = new MatTableDataSource<any>(this.filteredRecords);
  }

  ngOnInit(): void {
    this.loadMenus();
    //if(this.status=='PENDING'){
     // this.listPendingUsers();
    //}
    //else{
      this.list();
    //}
    
  }



  users:any ;

  pendingUsers:any;

  displayedColumns: string[] = ['username','name','email','role','active','action'];

  resultsLength:number ;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource:any;
  
  list(){
    this.employeeService.list().subscribe (res=>{
      
      this.users= res;
      this.filter();
    });
  }

  roles = { "Trainer": "T", "HR": "HR"};

  approve(user){
    let cfm = confirm("Do you want to Approve Account ?");
    if(cfm){
      this.employeeService.activateAccount(user).subscribe(res=>{
        console.log(res);
        this.toastr.success("Successfully Account Activated");
        this.list();
        this.status = "true";
      },err=>{
        console.error(err);
        this.toastr.error("Error" , err.error.errorMessage);
      });

    }
  }
  
  listPendingUsers(){
    this.employeeService.pendingUsers().subscribe (res=>{
      this.users = res;
    });
  }

  delete(userId){
    this.employeeService.delete(userId).subscribe (res=>{
      this.ngOnInit();
    });
  }

  menus:any = [];

  loadMenus(){
    this.menus = [];
    this.menus.push( {title: "Back",  path:["../"], icontype:"fas fa-arrow-left", access: true});
    this.menus.push( {title: "Users",  path:["../users"], icontype:"fas fa-users", access: true});
    this.menus.push( {title: "Employees",  path:["../employees"], icontype:"fas fa-users", access: true});

    // this.menus.push( {title: "Back",  path:["../../users"], icontype:"fas fa-arrow-left", access: true});
    // this.menus.push( {title: "Active",  path:["../ACTIVE"], icontype:"fas fa-users", access: true});
    // this.menus.push( {title: "Pending",  path:["../PENDING"], icontype:"fas fa-users", access: true});    
    // // this.menus.push( {title: "Courses",  path:[ "courses"], icontype:"fas fa-book-open", access: true});
    
  }


}
