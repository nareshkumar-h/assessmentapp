import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserCourseService } from '../../usercourse.service';

@Component({
  selector: 'app-user-course-questions',
  templateUrl: './user-course-questions.component.html',
  styleUrls: ['./user-course-questions.component.css']
})
export class UserCourseQuestionsComponent implements OnInit {

 
  courseId:string;
  breadcrumbItems:any  = [ {"icon":"home", "name":"Home","link":"/"},
  {"name":"Courses","link":"../"}];

  selectedCourse:any;

  constructor(private userCourseService:UserCourseService, private router:Router, private route:ActivatedRoute,
    private toastr:ToastrService) {
    this.route.parent.params.subscribe(params=>{
      this.courseId = params["courseId"];
      this.breadcrumbItems.push({"name":this.courseId ,"link": this.courseId});
    });
    this.selectedCourse = this.userCourseService.getCourse();
   }

  ngOnInit(): void {
    this.list();
  }

  questions:any;

  list(){
    this.userCourseService.getCourseQuestions(this.courseId).subscribe(res=>{
      this.questions = res;
    });
  }

  updateStatus(question,status){
    console.log(question );
    console.log(status);

  }


}
