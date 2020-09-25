import { Component, OnInit, Optional, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CategoryService } from '../../category.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { add } from 'lodash';

@Component({
  selector: 'ct-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css']
})
export class EditCategoryComponent implements OnInit {


  breadcrumbItems = [{ "icon": "home", "name": "Home", "link": "/" },
  { "name": "Categories" }];

  oldCategory:any;
  constructor(private categoryService: CategoryService, private router: Router, private route: ActivatedRoute, @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
    private toastr: ToastrService, public dialog: MatDialog, private dialogRef: MatDialogRef<EditCategoryComponent>) {
    this.category = data["categoryObj"];
    this.category = JSON.parse(JSON.stringify(data.categoryObj));
    this.oldCategory = data.categoryObj;
  }

  ngOnInit(): void {

  }

  category: any;

  update(category) {
    this.categoryService.update(category).subscribe(res => {
      console.log(res);
      this.toastr.success("Success");
      this.dialog.closeAll();
      this.router.navigate(['categories']);
    }, err => {
      console.log(err);
      this.toastr.error("Error", err.error.errorMessage);
    });
  }

  cancel() {
    //window.history.back();
    this.dialog.closeAll();
  }


  add() {
    alert("Added");
    this.dialog.closeAll();
  }

  close() {
    this.data.category = this.oldCategory;
    this.dialog.closeAll();
  }


}
