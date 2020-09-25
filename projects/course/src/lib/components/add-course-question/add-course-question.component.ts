import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CourseService } from '../../course.service';

@Component({
  selector: 'app-add-course-question',
  templateUrl: './add-course-question.component.html',
  styleUrls: ['./add-course-question.component.css']
})
export class AddCourseQuestionComponent implements OnInit {

 
  courseId:string;
  
  breadcrumbItems:any  = [ {"icon":"home", "name":"Home","link":"/"},
   {"name":"Courses", "link": "courses"}];

  constructor(private courseService: CourseService, private router:Router, private route:ActivatedRoute, private toastr:ToastrService) { 
    this.route.parent.params.subscribe( params=>{
      this.courseId = params["id"];
      this.breadcrumbItems.push({name:this.courseId});
    })
  }

  ngOnInit(): void {
  }

  question = { title:null, tag:null, courseId:null};

  contentTypes = {"G":"Gist", "T":"Text", "I":"Image", "V":"Video"};

  save(question){
    let cTags= question.tag.split(",");
    question.tags= cTags;
    question.courseId = this.courseId;
    this.courseService.addCourseQuestion(this.courseId,question).subscribe (res=>{
      console.log(res);
      this.toastr.success("Success");
      this.router.navigate(['courses', this.courseId ,"questions"]);
    },
    err=>{
      this.toastr.error(err.error.errorMessage);
    });
  }

  file:any;

  onFileSelect(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.file = file;
    }
  }

  uploadFile(){
    console.log("Upload file");
    const formData = new FormData();
    formData.append('file', this.file);
    console.log(this.file);
    this.courseService.importCourseQuestion(this.courseId, formData).subscribe(res=>{
      console.log(res);
      this.file = null;
      this.toastr.success("Successfully Course Question Imported");
      this.router.navigate(['courses', this.courseId ,"questions"]);
    },err=>{
            //this.toastr.error('Error',err.error.errorMessage ,  {positionClass:'toast-top-center',tapToDismiss:true});
            this.toastr.error('Error',err.error.errorMessage);
    });
  }

  cancel(){
    window.history.back();
  }


}
