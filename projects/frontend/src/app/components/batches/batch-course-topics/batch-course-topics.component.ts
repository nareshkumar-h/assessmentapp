import { Component, OnInit } from '@angular/core';
import { BatchService } from '../batch.service';
import { CourseService } from 'projects/course/src/public-api';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-batch-course-topics',
  templateUrl: './batch-course-topics.component.html',
  styleUrls: ['./batch-course-topics.component.css']
})
export class BatchCourseTopicsComponent implements OnInit {

  
  batchId:string;
  courseId:string;

  breadcrumbItems:any  = [ {"icon":"home", "name":"Home","link":"/"},
  {"name":"Batches", "link":"../../batches"}];

  constructor(private batchService:BatchService, private courseService:CourseService,private route:ActivatedRoute) { 

    this.route.parent.params.subscribe ( params=>{
      this.batchId = params["id"];
      this.breadcrumbItems.push({name:this.batchId, link:"../"});

      
     this.courseId = params["courseId"];
    
     this.breadcrumbItems.push({name:"Courses" , link:"../"});
     this.breadcrumbItems.push({name: this.courseId});
    });

   this.route.params.subscribe ( params=>{
     
   }) ;
  }

  ngOnInit(): void {
    this.listTopics();
    this.findCourse();
  }

  topicData:any;
  courseTopics:any;  

  course:any;

  findCourse(){
    this.courseService.findOne(this.courseId).subscribe (res=>{
      this.course = res;
    });
  }

  listTopics(){
    this.batchService.listCourseTopics(this.batchId, this.courseId).subscribe (res=>{
      this.topicData = res;
      this.courseTopics = this.topicData ["topics"];
      this.createReport(this.courseTopics);
    });
  }


  updateStatus(topic,checked){
    console.log("Update Status:", topic , checked);
    let status = checked ? "C" :"P";
    topic.completionDate=checked ? new Date().toJSON().substr(0,10): null;
    this.batchService.updateTopicStatus(topic.id, status).subscribe (res=>{
      console.log(res);
      this.createReport(this.courseTopics);
    });
  }

  
  reportData:any = [];
  widgetColors= [ "green-haze","purple-plum","green-haze","red-intense","blue-madison","red-intense"];

  createReport(data){
    
    this.reportData=[];
    let i =0;
    let total = 0;
    let completed = 0;
    let pending = 0;
    let totalDuration = 0;
    let topicDelayed = 0;
    let modules = Object.keys(data);
    for(let m of modules){
      let topics = data[m];
      for (let c of topics){
      completed += (c.status == 'C'? 1:0);
      pending+=(c.status == 'P'? 1:0);
      totalDuration+=c.duration;
      topicDelayed+= ((c.status == 'P' && new Date(c.plannedDate) < this.today)? 1:0);
      total+=1;
      }
    }
    let hours = Math.ceil(totalDuration/60);
    let percentage = Math.round ( 100*completed/total);
    this.reportData.push({"label": "Duration(Hrs)", "value": hours  });
    this.reportData.push({"label": "Topics", "value": total});
    this.reportData.push({"label": "Completed", "value": completed });
    this.reportData.push({"label": "Pending", "value": pending});
    this.reportData.push({"label": "Percentage", "value": percentage + "%" });    
    this.reportData.push({"label": "Topics Due", "value": topicDelayed  });
  

  }

  today = new Date();

  getColor(topic) {
    let color = "";
    if ( topic.status =='P' && new Date(topic.plannedDate) < this.today){
      color ='red';
    }
    
    return color;
  }



}
