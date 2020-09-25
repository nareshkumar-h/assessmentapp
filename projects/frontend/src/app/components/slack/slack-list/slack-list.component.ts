import { Component, OnInit } from '@angular/core';
import { SlackService } from '../slack.service';

@Component({
  selector: 'app-slack-list',
  templateUrl: './slack-list.component.html',
  styleUrls: ['./slack-list.component.css']
})
export class SlackListComponent implements OnInit {

  
  breadcrumbItems:any  = [ {"icon":"home", "name":"Home","link":"/"},
  {"name":"Batches", link:"../../"}];
  
  constructor(private slackService:SlackService) { }

  ngOnInit(): void {
    this.list();
  }

  slackList:any;

  list(){
    this.slackService.list().subscribe (res=>{
      this.slackList = res;
    });
  }

}
