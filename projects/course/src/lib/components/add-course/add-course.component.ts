import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';
import { CourseService } from '../../course.service';
import { CategoryService } from '../../category.service';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.css']
})
export class AddCourseComponent implements OnInit {

  isLinear = false;
  courseFormGroup: FormGroup;
  categoryFormGroup: FormGroup;
  
  breadcrumbItems  = [ {"icon":"home", "name":"Home","link":"/"},
   {"name":"Courses"}];
   
  constructor(private _formBuilder: FormBuilder,public dialog: MatDialog,private courseService:CourseService,private categoryService:CategoryService, private router:Router,
    private toastr:ToastrService) { }

  ngOnInit(): void {
    this.courseFormGroup = this._formBuilder.group({
      code: ['', Validators.required],
      title: ['', Validators.required]
    });
    this.categoryFormGroup = this._formBuilder.group({
      categoryId: ['', Validators.required]
    });
    
    this.loadMenus();
    this.listCategories();
  }

  course = { code: null, title: null, category: null};

  categories:any;

  listCategories(){
    this.categoryService.list().subscribe(res=>{
      this.categories = res;
    });
  }

  finish(){
    let course = {
      ... this.courseFormGroup.value,
      ... this.categoryFormGroup.value
    }
    console.log(course);
    this.save(course);
  }

  save(course){
    this.courseService.save(course).subscribe( res=>{
      console.log(res);
      this.toastr.success("Success");
      this.dialog.closeAll();
      this.router.navigate(['courses/'+ course.code]);
    },err=>{
      console.log(err);
      this.toastr.error("Error", err.error.errorMessage);
    });
  }

  cancel(){
    //window.history.back();
    this.dialog.closeAll();
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
    this.courseService.importCourses(formData).subscribe(res=>{
      console.log(res);
      this.file = null;
      this.toastr.success("Successfully Courses Imported");
      this.router.navigate(['courses']);
    },err=>{
            //this.toastr.error('Error',err.error.errorMessage ,  {positionClass:'toast-top-center',tapToDismiss:true});
            this.toastr.error('Error',err.error.errorMessage);
    });
  }

  add(){
    alert("Added");
    this.dialog.closeAll();
  }

  close(){
    this.dialog.closeAll();
  }

  menus:any;

  loadMenus(){
    this.menus = [];
    this.menus.push( {title: "Back",  path:["../"], icontype:"fas fa-arrow-left",  access: true});
    this.menus.push( {title: "Courses",  path:["/courses"], icontype:"fas fa-graduation-cap",  access: true});
    this.menus.push( {title: "Categories",  path:["/categories"], icontype:"fas fa-book",  access: true});
    this.menus.push( {title: "Add Course",  path:["/addcourse"], icontype:"fas fa-book",  access: true});
  }  


}
