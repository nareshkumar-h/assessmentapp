import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BatchService } from '../batch.service';
import { AuthService } from 'projects/auth/src/public-api';

@Component({
  selector: 'app-batch-activity',
  templateUrl: './batch-activity.component.html',
  styleUrls: ['./batch-activity.component.css']
})
export class BatchActivityComponent implements OnInit {

  
  batchId:string;
  user:any;
  breadcrumbItems  = [ {"icon":"home", "name":"Home","link":"/"},
  {"name":"Activities"}];

  constructor(private authService:AuthService,  private batchService:BatchService, private route:ActivatedRoute) {

    this.route.params.subscribe( params=>{
      this.batchId = params["id"];
    });

   }

  ngOnInit(): void {
    this.list();
  }

  activities:any;

  list(){
    this.batchService.getActivities(this.batchId).subscribe (res=>{
      this.activities = res["activities"];
      let batch = res["batch"];
      
      this.createReport(this.activities, batch);
      this.createChart(this.activities);
    });
  }

  
  reportData:any = [];
  widgetColors= [ "purple-plum","blue-madison","green-haze","red-intense","blue-madison","red-intense"];

  createReport(data, batch){
    
    this.reportData=[];
    let total = data.length;
    let totalTopics = data.reduce(function(sum,obj){ return sum+obj.cnt},0);
    
    let date1:any = new Date();
    let date2:any = new Date(batch.endDate);
    const startDate:any = new Date(batch.startDate);    
    const totalDays = Math.ceil(Math.abs(date2 - startDate) / (1000 * 60 * 60 * 24)); 
    const daysCompleted = Math.ceil(Math.abs(date1 - startDate) / (1000 * 60 * 60 * 24)); 
    
    let topicsPerDay = Math.round(totalTopics/daysCompleted);
    //this.reportData.push({"label": "Total Days", "value": totalDays  });
    this.reportData.push({"label": "Completed Days", "value": daysCompleted  }); 
    this.reportData.push({"label": "Activity Days", "value": data.length  }); 
    this.reportData.push({"label": "Topics", "value": totalTopics  });     
    this.reportData.push({"label": "Topics per Day", "value": topicsPerDay  }); 
    

  }


  activityReport:any = [];

  reportMap :any ;

  createChart(data){

    let dates=[];
    let points = [];
    for(let r of data){
      
        dates.push(r.DATE);
        points.push(r.cnt);
        
    }
    this.reportMap = { "labels" : dates, "dataSets":[ {"data": points ,"label":"Points (" + dates.length + " days)" }]};
    
  
  }


}
