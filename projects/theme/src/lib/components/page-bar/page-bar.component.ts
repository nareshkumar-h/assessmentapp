import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'kt-page-bar',
  templateUrl: './page-bar.component.html'
})
export class PageBarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  @Input('items')
  items:any;

  @Input('menus')
  menus:any;


}
