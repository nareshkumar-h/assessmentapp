import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'projects/auth/src/public-api';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-course-settings',
  templateUrl: './course-settings.component.html',
  styleUrls: ['./course-settings.component.css']
})
export class CourseSettingsComponent implements OnInit {

  userId:string;

  breadcrumbItems:any  = [ {"icon":"home", "name":"Home","link":"/"},
  {"name":"Courses", "link":"../../courses"}];
  
  courseId:any;
  
  constructor( private authService:AuthService, private route:ActivatedRoute, private toastr:ToastrService) {
    this.userId  = this.authService.getLoggedInUsername();
    this.route.parent.params.subscribe(params => {
      
      this.courseId = params["courseId"];
      this.breadcrumbItems.push({ name: this.courseId , link: this.courseId });
    });
   }

  ngOnInit(): void {

    this.findOne();
  }

  findOne(){

    let key = "COURSE_SETTINGS";
    let val = localStorage.getItem(key);
    if (!val){
      localStorage.setItem(key,"A");
    }
    else{
      this.setting["COURSE_TOPICS"] = val;
    }
  }


  setting:any = { COURSE_TOPICS:null}

  save(setting){
    console.log(setting);
    localStorage.setItem("COURSE_SETTINGS", setting.COURSE_TOPICS);
    this.toastr.success("Successfully Updated");
    window.history.back();
  }


  cancel(){
    window.history.back();
  }

  



  

}
