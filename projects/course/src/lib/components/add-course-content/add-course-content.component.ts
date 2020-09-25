import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ContentService } from 'projects/content/src/public-api';
import { CourseService } from '../../course.service';




@Component({
  selector: 'app-add-course-content',
  templateUrl: './add-course-content.component.html',
  styleUrls: ['./add-course-content.component.css']
})
export class AddCourseContentComponent implements OnInit,OnChanges {

  courseId:string;
  
  breadcrumbItems:any  = [ {"icon":"home", "name":"Home","link":"/"},
   {"name":"Courses", "link": "../../../"}];

   lectureName:string;
   lectureId:string;
  constructor(private courseService: CourseService, private router:Router, private route:ActivatedRoute, private toastr:ToastrService,
    private contentService:ContentService) { 
    this.route.parent.params.subscribe( params=>{
      this.courseId = params["id"];
      this.breadcrumbItems.push({"name":this.courseId, "link":"../../"});
      this.breadcrumbItems.push({"name":"Contents", "link":"../"});
    })

    this.route.params.subscribe( params=>{
      this.lectureName = params["lectureName"];
      this.lectureId = params["lectureId"];
    });
  }
  ngOnChanges(changes: SimpleChanges): void {
    console.log('ngOnChanges');
  }

  ngOnInit(): void {
    this.contentTypes = this.contentService.getContentTypes();
  }

  content = { title:null, contentType:"T", duration:10, content:null, tag:null, tags:null, fileName:null, url:null};

  contentTypes:any;

  save(content){
    let cTags= content.tag? content.tag.split(","):null;
    content.tags= cTags;
    content.lectureId = this.lectureId;
    this.courseService.addCourseContent(content).subscribe (res=>{
      console.log(res);
      this.toastr.success("Success");
      this.router.navigate(['courses', this.courseId ,"lectures", this.lectureId, this.lectureName]);
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
    this.courseService.importCourseContent(this.courseId, formData).subscribe(res=>{
      console.log(res);
      this.file = null;
      this.toastr.success("Successfully Course Content Imported");
      this.router.navigate(['courses', this.courseId ,"coursecontents"]);
    },err=>{
            //this.toastr.error('Error',err.error.errorMessage ,  {positionClass:'toast-top-center',tapToDismiss:true});
            this.toastr.error('Error',err.error.errorMessage);
    });
  }

  htmlContent:any;

  cancel(){
    window.history.back();
  }

  saveDraft(content){
    console.log(content);
    this.content.content = content;
    
  }



}
