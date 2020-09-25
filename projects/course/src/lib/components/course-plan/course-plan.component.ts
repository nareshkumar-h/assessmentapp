import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CourseService } from '../../course.service';

@Component({
  selector: 'app-course-plan',
  templateUrl: './course-plan.component.html',
  styleUrls: ['./course-plan.component.css']
})
export class CoursePlanComponent implements OnInit {

  showSidebar = true; 
  batchId:string;
  courseId:string;

  breadcrumbItems:any  = [ {"icon":"home", "name":"Home","link":"/"},
  {"name":"Courses", "link":"../../courses"}];

  constructor(private courseService:CourseService,private route:ActivatedRoute) { 
   this.route.parent.params.subscribe ( params=>{     
     this.courseId = params["id"];
     this.breadcrumbItems.push({name: this.courseId , link:"../"});
     this.breadcrumbItems.push({name: "Plan"});
   }) ;
  }

  ngOnInit(): void {
    this.loadMenus();
    this.listTopics();
    this.findCourse();
  }

  topicData:any;
  topics:any;  
  modules:any;

  course:any;
  moduleTopics:any = {};

  mode:string='view';
  selectedTopic:string;

  edit(topicId){
    console.log("Edit", topicId);
    this.mode = "edit";
    this.selectedTopic = topicId;
  }

  update(topic){
    console.log("Update " , topic);
    this.mode = 'view';
    this.selectedTopic = null;
  }

  findCourse(){
    this.courseService.findOne(this.courseId).subscribe (res=>{
      this.course = res;
    });
  }

  listTopics(){
    this.courseService.getTopics( this.courseId).subscribe (res=>{
      this.topicData = res;
      this.topics = res["topics"];
      this.modules = res["modules"];
      
      for(let m of this.modules){
        let mTopics = [];
        this.topics.filter(t=> { 
          if(t.module_id == m.code) { mTopics.push(t);}
        });
        this.moduleTopics[m.code] = mTopics;
      }
     // console.log(JSON.stringify(this.moduleTopics));
      //this.createReport(this.courseTopics);
    });
  }


  updateStatus(topic,checked){
    console.log("Update Status:", topic , checked);
    let status = checked ? "C" :"P";
    // this.batchService.updateTopicStatus(topic.id, status).subscribe (res=>{
    //   console.log(res);
    // });
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
    console.log(topic.plannedDate);
    if ( topic.status =='P' && new Date(topic.plannedDate) < this.today){
      color ='red';
    }
    
    return color;
  }

  cancel(){
    this.mode= 'view';
    this.selectedTopic = null;
  }


  menus:any = [];

  loadMenus(){
    this.menus = [];
    this.menus.push( {name: "Back",  link:["../"], icon:"fas fa-arrow-left",  access: true});
//    this.menus.push( {name: "Courses",  link:["/courses"], icon:"fas fa-graduation-cap",  access: true});
  }  

}
