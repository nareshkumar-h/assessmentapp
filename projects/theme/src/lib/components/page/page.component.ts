import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'kt-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css']
})
export class PageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    console.log(this.title  , this.showSidebar, this.breadcrumbItems);
    this.showSidebar = this.showSidebar;
    console.log(this.showSidebar);
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
