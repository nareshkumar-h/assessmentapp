import { Component, OnInit, Optional, Inject } from '@angular/core';
import { CourseService } from '../../course.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from '../../category.service';

@Component({
  selector: 'app-edit-course',
  templateUrl: './edit-course.component.html',
  styleUrls: ['./edit-course.component.css']
})
export class EditCourseComponent implements OnInit {

  breadcrumbItems:any  = [ {"icon":"home", "name":"Home","link":"/"},
  {"name":"Courses", "link":"../../courses"}];
  
  courseId:string;
  course:any;
  oldCourse:any;

  constructor(private courseService:CourseService, private categoryService: CategoryService, private router:Router, private route:ActivatedRoute,  @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
  private toastr:ToastrService, public dialog: MatDialog, private dialogRef: MatDialogRef<EditCourseComponent>) { 

    this.course = JSON.parse(JSON.stringify(data.courseObj));
    
    this.oldCourse = data.courseObj;
    
    console.log(this.course);
    this.route.params.subscribe ( params=>{
      this.courseId = params["id"];
    });

  }

  ngOnInit(): void {

    this.listCategories();
   // this.findCourse();
  }

  //course:any;
  categories:any;
  listCategories(){
    this.categoryService.list().subscribe(res=>{
      this.categories = res;
    });
  }

  findCourse(){
    this.courseService.findOne(this.courseId).subscribe (res=>{
      this.course = res;
    });
  }

  update(course){    
    
    this.courseService.update(course.id, course).subscribe( res=>{      
      this.toastr.success("Successfully Updated");
      this.dialog.closeAll();
    },err=>{
      this.toastr.error("Error", err.error.errorMessage );
    });
  }

  delete(){    
    let cfm = confirm("Do you want to delete the Course?");
    if(cfm){
      this.courseService.delete(this.course.code).subscribe( res=>{
        this.toastr.success("Successfully Deleted Course -" + this.course.title);
        this.dialog.closeAll();
        this.router.navigate(["courses"]);
      },
      err=>{
        console.log(err);
        this.toastr.error("Error", err.error.errorMessage);
      });
    }
  }

  cancel(){
    this.data.course = this.oldCourse;
    this.dialog.closeAll();
    //this.dialogRef.close();
  }


}
