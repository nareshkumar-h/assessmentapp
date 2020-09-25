import { Component, OnInit } from '@angular/core';
import { SecurityService } from 'projects/security/src/public-api';
import { SiteService } from '../site.service';


@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  constructor(private securityService:SecurityService, private siteService:SiteService) { }

  ngOnInit(): void {
    this.loadMenus();
    this.loadSite();
  }

  siteInfo:any;

  loadSite(){
    this.siteService.getSiteInfo().subscribe(res=>{
      this.siteInfo = res;
    });
  }

  menus:any = [];

  loadMenus(){
    this.menus = [];
    this.menus.push( {title: "Back",  path:["../"], icontype:"fas fa-arrow-left", access: this.securityService.hasRole(['T','HR'])});
    
    // this.menus.push( {title: "Organization",  path:["../settings/organization"], icontype:"fa-sitemap fas", access: this.securityService.hasRole(['HR'])});
    this.menus.push( {title: "Account",  path:["../settings/account"], icontype:"fa-database fas", access: this.securityService.hasRole(['HR'])});
    this.menus.push( {title: "Features",  path:["../settings/features"], icontype:"fa-flag fas", access: this.securityService.hasRole(['HR'])});
    this.menus.push( {title: "Roles",  path:["../settings/roles"], icontype:"fa-user-times fas", access: this.securityService.hasRole(['HR'])});
    this.menus.push( {title: "Mail",  path:["../settings/mail"], icontype:"fa-envelope fas", access: this.securityService.hasRole(['HR'])});    
    this.menus.push( {title: "Slack",  path:["../settings/slack"], icontype:"fa-slack fab", access: this.securityService.hasRole(['HR'])});    
    this.menus.push( {title: "Theme",  path:["../settings/theme"], icontype:"fa-leaf fas", access: this.securityService.hasRole(['HR'])});
  }

  update(){

  }

  cancel(){
    window.history.back();
  }

}
