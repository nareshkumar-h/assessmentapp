import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SlackService } from '../slack.service';

@Component({
  selector: 'app-add-slack',
  templateUrl: './add-slack.component.html',
  styleUrls: ['./add-slack.component.css']
})
export class AddSlackComponent implements OnInit {

  breadcrumbItems:any  = [ {"icon":"home", "name":"Home","link":"/"},
  {"name":"Slack"}];
  
  batchId:string;

  constructor(private slackService: SlackService, private router:Router, private route:ActivatedRoute, private toastr:ToastrService) {
    this.route.parent.params.subscribe(params=>{
        this.batchId = params["id"];
        this.slack["applicationName"] = this.batchId;
    });
   }

  ngOnInit(): void {
  }

  slack = {org:null, applicationName:null, url:null, hookUrl:null, token:null};

  save(slack){
    console.log(slack);
    this.slackService.save(slack).subscribe (res=>{
      console.log(res);
      this.toastr.success("Success");
      this.router.navigate(["batches/"+ this.batchId+ "/slack"]);
    },err=>{
      this.toastr.error(err.error.errorMessage);
    });
  }

  cancel(){
    this.router.navigate(['batches/'+ this.batchId +"/slack"]);
  }

}
