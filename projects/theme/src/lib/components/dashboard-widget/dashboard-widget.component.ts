import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'kt-dashboard-widget',
  templateUrl: './dashboard-widget.component.html',
  styleUrls: ['./dashboard-widget.component.css']
})
export class DashboardWidgetComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  
  @Input('reportData')
  reportData:any;
  
  @Input('class')
  class:string;

  @Input('colSize')
  colSize:number;

}
