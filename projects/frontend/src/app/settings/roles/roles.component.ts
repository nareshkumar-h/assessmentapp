import { Component, OnInit } from '@angular/core';

import { MatTableDataSource } from '@angular/material/table';
import { SiteService } from 'projects/users/src/lib/site.service';


@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent implements OnInit {

  constructor(private siteService:SiteService) { }

  ngOnInit(): void {
    this.loadRoles();
  }

  displayedColumns:string[]=['code','name'];

  dataSource:any;

  loadRoles(){
    this.siteService.getRoles().subscribe(res=>{
      let roles:any = res;
      this.dataSource = new MatTableDataSource<any>(roles);
    });
  }



}
