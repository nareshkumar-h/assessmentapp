import { Component, OnInit, Optional, Inject } from '@angular/core';
import { CourseService } from '../../course.service';
import { CategoryService } from '../../category.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { EditCourseComponent } from '../edit-course/edit-course.component';
import { ContentService } from 'projects/content/src/public-api';


@Component({
  selector: 'ct-edit-course-content',
  templateUrl: './edit-course-content.component.html',
  styleUrls: ['./edit-course-content.component.css']
})
export class EditCourseContentComponent implements OnInit {

  courseId:any;
  contentTypes:any;
  constructor(private courseService:CourseService, private categoryService: CategoryService, private router:Router, private route:ActivatedRoute,  @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
  private toastr:ToastrService, public dialog: MatDialog, private dialogRef: MatDialogRef<EditCourseContentComponent>, private contentService:ContentService) { 

    this.courseId = data.courseId;
    this.content = JSON.parse(JSON.stringify(data.content));
    
    this.oldContent = data.content;
    this.mode = 'edit';
  }

  content:any;
  oldContent:any;

  ngOnInit(): void {
    this.contentTypes= this.contentService.getContentTypes();
    this.listModules();
  }

  mode:string;

  delete(content){
    
    let cfm= confirm("Do you want to delete - " + content.title + "?");
    if(cfm){
      this.courseService.deleteCourseContent(content.id).subscribe(res=>{
        this.toastr.success("Successfully Deleted");        
        this.dialog.closeAll();
        
      },err=>{
        this.toastr.error("Error", err.error.errorMessage);
      })
      
    }
    
  }

  modules:any;

  listModules(){
    this.courseService.listModules(this.courseId).subscribe(res=>{
      this.modules = res;
    });
  }

  cancel(){
    this.data.content = this.oldContent;
  //  this.dialog.closeAll();
    this.mode= null;
  }

  update(content){
    console.log(content);
    this.courseService.updateContent(content).subscribe(res=>{
      console.log(res);
      this.toastr.success("Successfully Updated");      
      this.dialog.closeAll();
      this.mode= null;
    });
    
  }




}
