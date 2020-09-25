import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-batch-course-dashboard',
  templateUrl: './batch-course-dashboard.component.html',
  styleUrls: ['./batch-course-dashboard.component.css']
})
export class BatchCourseDashboardComponent implements OnInit {

  constructor() {


   }

  ngOnInit(): void {
  }
  widgetColors= [ "purple-plum","green-haze","green-haze","blue-madison","red-intense", "red-intense"];

  reportData: any = [];

  createReport(repositories){
    // this.reportData=[];
    // let i =0;
    // let total = 0;
    // for(let r of this.ratings){
    //   let value = 0;
    //   if ( repositories[r]) {
    //     value = repositories[r].length;
    //     total+=value;
    //   }
    //   let obj= {"label":this.ratingLabel[i++], "value": value};
    //   this.reportData.push(obj);
    // }
    // this.reportData.unshift({"label":"Total", "value":total});
  }
  

}
