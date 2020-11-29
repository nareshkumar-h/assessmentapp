import { Component, Input, OnInit } from '@angular/core';
import { buildRelativePath } from 'schematics-utilities';

@Component({
  selector: 'lib-task-status',
  templateUrl: './task-status.component.html',
  styleUrls: ['./task-status.component.css']
})
export class TaskStatusComponent implements OnInit {


  @Input()
  feature:any;

  @Input()
  status:string;
  constructor() { }

  ngOnInit(): void {
    
  }

  getColor(){
    let color = "primary";
    switch(this.status){
      case "PENDING" : 
      case "ASSIGNED": 
        color = "danger";break;
      case "COMPLETED" : 
      case "ACCEPTED" : 
        color="success"; break;
      case "INPROGRESS": 
        color="warning"; break;
      default: 
        color = "danger";
      break;


    }
    return color;
  }

}
