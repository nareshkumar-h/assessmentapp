import { Component } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent {  
  
  showSidebar:boolean = true;
  breadcrumbItems = [{ "icon": "home", "name": "Home", "link": "/" },
  { "name": "Courses" }];

  
  constructor(){
    console.log('constructor');    
    this.loadMenus();
  }

  menus = [];
  loadMenus(){
    this.menus = [];    
    this.menus.push( {name: "Home",  link:["home"], icon:"fas fa-book-open",  access: true});
    this.menus.push( {name: "Courses",  link:["courses"], icon:"fas fa-book-open",  access: true});    
  }


}