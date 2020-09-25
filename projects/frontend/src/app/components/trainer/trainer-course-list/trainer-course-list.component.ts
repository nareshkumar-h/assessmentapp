import { Component, OnInit } from '@angular/core';
import { TrainerService } from '../trainer.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-trainer-course-list',
  templateUrl: './trainer-course-list.component.html',
  styleUrls: ['./trainer-course-list.component.css']
})
export class TrainerCourseListComponent implements OnInit {

 
  userId:string;

  breadcrumbItems:any  = [ {"icon":"home", "name":"Home","link":"/"},
  {"name":"Trainer Dashboard"}];

  constructor(private trainerService:TrainerService, private route: ActivatedRoute) {

    this.route.params.subscribe (params=>{
      this.userId = params['userId'];
    });

   }

  ngOnInit(): void {
    this.loadMenus();
    this.listCourses();
    
  }

  trainerCourses:any;

  listCourses(){
    this.trainerService.listCourses(this.userId).subscribe (res=>{
      this.trainerCourses = res;
      this.createReport(this.trainerCourses);
    });
  }

  
  reportData:any = [];
  widgetColors= [ "purple-plum","green-haze","green-haze","red-intense","blue-madison"];

  createReport(data){
    this.reportData=[];
    let i =0;
    let total = 0;
    let completed = 0;
    let pending = 0;
    let totalCourses = 0;
    for(let b of Object.keys(data)){
      let courses = data[b];
      console.log(courses);
      totalCourses+=courses.length;
      for (let c of courses){
      completed += c.completed_topics;
      pending+=c.pending_topics;
      total+=c.pending_topics + c.completed_topics;
      }
    }
    let percentage = 0;
    if ( total >0 ) {
      percentage= Math.round ( 100*completed/total);
    }
    this.reportData.push({"label":"Courses", "value":totalCourses});
    this.reportData.push({"label": "Topics", "value": total});
    this.reportData.push({"label": "Completed", "value": completed });
    this.reportData.push({"label": "Pending", "value": pending});
    this.reportData.push({"label": "Percentage", "value": percentage + "%" });


    

  }


  menus:any = [];

  loadMenus(){
    this.menus = [];
    this.menus.push( {title: "Back",  path:["../../dashboard"], icontype:"fas fa-arrow-left", access: true});
    this.menus.push( {title: "Training",  path:["../",this.userId], icontype:"fa-chalkboard-teacher fas", access: true});
  }


}
