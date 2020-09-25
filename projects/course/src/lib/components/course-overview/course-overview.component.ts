import { Component, OnInit, Input } from '@angular/core';
import { CourseService } from '../../course.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { EditCourseComponent } from '../edit-course/edit-course.component';

@Component({
  selector: 'ct-course-overview',
  templateUrl: './course-overview.component.html',
  styleUrls: ['./course-overview.component.css']
})
export class CourseOverviewComponent implements OnInit {

  @Input()
  course:any;

  @Input()

  showSidebar=true;

  breadcrumbItems:any  = [ {"icon":"home", "name":"Home","link":"/"},
   {"name":"Courses", "link":"../"}];


  constructor(private courseService:CourseService, private router:Router, private route:ActivatedRoute,
    private toastr: ToastrService, public dialog: MatDialog) { 

    this.route.params.subscribe ( params=>{
      let courseCode = params["id"];
      
      //this.breadcrumbItems.push({"name": this.course.id});  
    });
    

  }

  courseId:any;
  ngOnInit(): void {
    
    this.course = this.courseService.getCourse();
    console.log('course', this.course);
    this.courseId = this.course.code;
    this.breadcrumbItems.push({"name": this.course.title});  
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
    this.courseService.uploadCourseImage(this.course.id,formData).subscribe(res=>{
      console.log(res);
      this.file = null;
      this.toastr.success("Successfully Courses Image Updated");
      
    },err=>{
            //this.toastr.error('Error',err.error.errorMessage ,  {positionClass:'toast-top-center',tapToDismiss:true});
            this.toastr.error('Error',err.error.errorMessage);
    });
  }

  
  editCourse(course){
    console.log(this.dialog);
    const dialogRef = this.dialog.open(EditCourseComponent, {data: { courseObj :course} });
    console.log(dialogRef);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
     // this.findCourse();
    });
  }

  
  download(){
    console.log("Download" + this.courseId);
    this.courseService.download(this.courseId).subscribe (data=>{
      console.log(data);
      var downloadURL = window.URL.createObjectURL(data);
      var link = document.createElement('a');
      link.href = downloadURL;
      link.download = this.course.code +".json";
      link.click();
    });
  }


  publish(){
    this.courseService.publish(this.courseId).subscribe (res=>{
      console.log(res);
      this.toastr.success("Published Successfully");
      
    });
  }

}
