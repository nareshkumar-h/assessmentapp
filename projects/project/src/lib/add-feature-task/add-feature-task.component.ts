import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from 'projects/course/src/lib/category.service';
import { CourseService } from 'projects/course/src/public-api';

@Component({
  selector: 'lib-add-feature-task',
  templateUrl: './add-feature-task.component.html',
  styleUrls: ['./add-feature-task.component.css']
})
export class AddFeatureTaskComponent implements OnInit {

  constructor(private _formBuilder: FormBuilder,public dialog: MatDialog,private courseService:CourseService,private categoryService:CategoryService, private router:Router,
    private toastr:ToastrService) { }


  ngOnInit(): void {
    
  }

}
