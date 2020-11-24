import { Component, OnInit } from '@angular/core';

import { ToastrService } from 'ngx-toastr';
import { SecurityService } from 'projects/security/src/public-api';
import { SiteService } from 'projects/users/src/lib/site.service';


@Component({
  selector: 'app-domain',
  templateUrl: './domain.component.html',
  styleUrls: ['./domain.component.css']
})
export class DomainComponent implements OnInit {

  
  constructor(private securityService:SecurityService, private siteService:SiteService, private toastr:ToastrService) { }

  ngOnInit(): void {
    this.loadDomain();
  }

  domain:any;

  loadDomain(){
    this.siteService.getDomain().subscribe(res=>{
      this.domain = res;
    });
  }


  update(){
    let org={code:this.domain.orgId, name:this.domain.orgName , logo: this.domain.logo};
    this.siteService.updateOrg(org).subscribe(res=>{
      console.log(res);
      this.toastr.success("Successfully Updated");
    });

  }

  cancel(){
    window.history.back();
  }

}
