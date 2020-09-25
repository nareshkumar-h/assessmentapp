import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'uc-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.loadMenus();
  }

  
  menus:any;

  loadMenus(){
    this.menus = [];
    this.menus.push( {title: "Back",  path:["../../dashboard"], icontype:"fas fa-arrow-left", access: true});
    this.menus.push( {title: "Dashboard",  path:["../coursedashboard"], icontype:"fas fa-tachometer-alt", access: true});
    this.menus.push( {title: "My Courses",  path:["../courses"], icontype:"fas fa-graduation-cap", access: true});
    this.menus.push( {title: "Available Courses",  path:[ "../availablecourses"], icontype:"fas fa-book-open", access: true});    
    //this.menus.push( {title: "Calendar",  path:[ "../calendar"], icontype:"fas fa-calendar", access: true});    
    
  }

}
