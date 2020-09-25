import { Component, OnInit } from '@angular/core';
import { SecurityService } from 'projects/security/src/public-api';
import { SiteService } from '../../site.service';

@Component({
  selector: 'app-site-theme',
  templateUrl: './site-theme.component.html',
  styleUrls: ['./site-theme.component.css']
})
export class SiteThemeComponent implements OnInit {

  constructor(private securityService:SecurityService, private siteService:SiteService) { }

  ngOnInit(): void {
    this.loadSite();
  }

  siteInfo:any;
  locked:boolean = false;

  loadSite(){
    this.siteService.getSiteDetail().subscribe(res=>{
      this.siteInfo = res;
      this.locked= this.siteInfo.locked;
    });
  }

  update(){

  }

  cancel(){
    window.history.back();
  }


}
