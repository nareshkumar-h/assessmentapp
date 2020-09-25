import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CourseService } from '../../course.service';
import { CategoryService } from '../../category.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'ct-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {

  
  
  breadcrumbItems  = [ {"icon":"home", "name":"Home","link":"/"},
  { "name": "Categories" }];
   
  constructor(public dialog: MatDialog,private categoryService:CategoryService, private router:Router,
    private toastr:ToastrService) { }

  ngOnInit(): void {
   
  }

  category = { name: null};

  categories:any;


  save(category){
    this.categoryService.save(category).subscribe( res=>{
      console.log(res);
      this.toastr.success("Success");
      this.dialog.closeAll();
      this.router.navigate(['categories']);
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
  add(){
    alert("Added");
    this.dialog.closeAll();
  }

  close(){
    this.dialog.closeAll();
  }


}
