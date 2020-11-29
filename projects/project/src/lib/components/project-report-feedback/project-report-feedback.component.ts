import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'lib-project-report-feedback',
  templateUrl: './project-report-feedback.component.html',
  styleUrls: ['./project-report-feedback.component.css']
})
export class ProjectReportFeedbackComponent implements OnInit {

  userId:string;
  data:any;
  constructor(private http:HttpClient, private route:ActivatedRoute, private toastr:ToastrService) { 
    this.route.parent.params.subscribe(params=>{
      this.userId = params["userId"];
    })
  }

  ngOnInit(): void {
    if(this.userId!=null){
      this.getData();
    }
  }

  getData(){
    
    let url  = `https://sfy-fresher-batch-2020.s3.ap-south-1.amazonaws.com/${this.userId}.json`
    this.http.get(url).subscribe(res=>{
      console.log(res);
      this.data = res;
    },err=>{
      console.log(err);
     // this.toastr.error("No Data found");
    })
  }
}
