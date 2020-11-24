import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'kt-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css']
})
export class PageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    
    this.showSidebar = this.showSidebar;
    
  }

  @Input()
  title:string;

  @Input()
  showSidebar:boolean;

  @Input()
  breadcrumbItems:any;

  @Input()
  menus:any;
}
