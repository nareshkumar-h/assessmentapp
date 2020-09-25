import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { UserService } from '../user.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css']
})
export class ListUsersComponent implements OnInit {

  breadcrumbItems  = [ {"icon":"home", "name":"Home","link":"/"},
   {"name":"Users"}];

  constructor(private userService:UserService) { }

  displayedColumns: string[] = ['username','name','email','dateOfJoining','active','action'];

  resultsLength:number ;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  
  dataSource:any;

  ngOnInit(): void {
    this.loadMenus();
    this.list();
  }

  ngAfterViewInit() {
    this.loadTableViewChild();
  }
  loadTableViewChild() {
    if(this.users){
      this.dataSource.paginator = this.paginator;  
    }
  }

  users:any ;

  list(){
    this.userService.list().subscribe (res=>{
      this.users = res;
      this.dataSource = new MatTableDataSource<any>(this.users);
      
      if (this.dataSource.paginator) {
        //this.dataSource.paginator.firstPage();
      }    
    });
  }

  menus:any = [];

  loadMenus(){
    this.menus = [];
    this.menus.push( {title: "Back",  path:["../"], icontype:"fas fa-arrow-left", access: true});
    this.menus.push( {title: "Users",  path:["../users"], icontype:"fas fa-users", access: true});
    this.menus.push( {title: "Employees",  path:["../employees"], icontype:"fas fa-users", access: true});
    // this.menus.push( {title: "Courses",  path:[ "courses"], icontype:"fas fa-book-open", access: true});
    
  }

}
