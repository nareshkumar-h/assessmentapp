import { Component, OnInit } from '@angular/core';
import { CourseService } from '../../course.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'ct-add-lecture',
  templateUrl: './add-lecture.component.html',
  styleUrls: ['./add-lecture.component.css']
})
export class AddLectureComponent implements OnInit {

 
  courseId:string;
  sectionId:number;

  showSidebar = true;

  breadcrumbItems  = [ {"icon":"home", "name":"Home","link":"/"},
   {"name":"Courses"}];
   
  constructor(private courseService:CourseService, private router:Router,
    private route:ActivatedRoute) {
      this.route.parent.params.subscribe ( params=>{
        this.courseId = params["id"];
      });
      this.route.params.subscribe ( params=>{
        this.sectionId = params["sectionId"];
      });
   }

  ngOnInit(): void {
    this.findOne();
  }

  lecture = { title: null,  status:"DRAFT"};

  categories:any;

  course:any;
  findOne(){
    
    this.courseService.findOne(this.courseId).subscribe(res=>{
      this.course = res;
    });
  }

  save(lecture){
    console.log(lecture);
    this.lecture["sectionId"] = this.sectionId;
    this.courseService.addLecture(this.course.id,lecture).subscribe( res=>{
      console.log(res);
      this.router.navigate(["courses/"+ this.courseId + "/curriculum" ]);
    });
  }

  cancel(){
    window.history.back();
  }



}
