import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SlackService } from '../slack.service';

@Component({
  selector: 'app-view-slack',
  templateUrl: './view-slack.component.html',
  styleUrls: ['./view-slack.component.css']
})
export class ViewSlackComponent implements OnInit {

  breadcrumbItems:any  = [ {"icon":"home","name":"Batches", link:"../../"}];

  id:string;
  
  constructor(private slackService: SlackService, private router:Router,private route:ActivatedRoute, private toastr:ToastrService) {
    this.route.parent.params.subscribe (params=>{
      this.id = params["id"];
      this.breadcrumbItems.push({name:this.id , link:"../"});
    });
   }

  ngOnInit(): void {
    this.findOne();
  }

  slack:any;

  findOne(){
    this.slackService.findOne(this.id).subscribe (res=>{      
     this.slack = res;
    });
  }

  
  delete(id){
    this.slackService.delete(id).subscribe (res=>{
      console.log(res);
      this.toastr.success("Succesfully Deleted");
      this.slack= null;      
    },
    err=>{
      this.toastr.error(err.error.errorMessage);
    });
  }
}
