import { Component, OnInit } from '@angular/core';
import { AddCategoryComponent } from '../add-category/add-category.component';
import { MatDialog } from '@angular/material/dialog';
import { CourseService } from '../../course.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from '../../category.service';
import { EditCategoryComponent } from '../edit-category/edit-category.component';

@Component({
  selector: 'ct-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {

  
  breadcrumbItems = [{ "icon": "home", "name": "Home", "link": "/" },
  { "name": "Categories" }];

  showSidebar = true;
  constructor(public dialog: MatDialog, private categoryService: CategoryService, private toastr: ToastrService, private route: ActivatedRoute, private router: Router) {
    this.route.queryParams
      .subscribe(params => {
        this.selectedCategory = params['category'] ? params['category'] : "ALL";
        // console.log(this.selectedCategory);   

      });
  }

  ngOnInit(): void {
    this.loadMenus();
    this.list();
    
  }

  courses: any;

  selectedCategory: string;


  categories: any = [];

  list() {
    this.categoryService.list().subscribe(res => {
      this.categories = res;
      this.createReport(this.categories);
    });
  }

  reportData: any = [];
  widgetColors = ["purple-plum", "blue-madison", "green-haze", "red-intense", "blue-madison", "red-intense"];

  createReport( categories) {

    this.reportData = [];

    this.reportData.push({ "label": "Categories", "value": categories.length });


  }

  // menus = "Add Course";

  // @Output() menu = new EventEmitter();
  // public sendMenus() {
  //   console.log("Send Menus called from courselist");
  //   this.menu.emit(this.menus);
  // }

  menus:any;

  navigate(routeLink, sidebarPath) {
    console.log(routeLink, sidebarPath);
    //this.router.navigate([{ outlets: { primary: routeLink, sidebar: sidebarPath } }]);
    this.router.navigate(routeLink);
  }


  loadMenus(){
    this.menus = [];
    this.menus.push( {title: "Back",  path:["../"], icontype:"fas fa-arrow-left",  access: true});
    this.menus.push( {title: "Courses",  path:["/courses"], icontype:"fas fa-graduation-cap",  access: true});
    this.menus.push( {title: "Categories",  path:["/categories"], icontype:"fas fa-book",  access: true});
  }  

  openDialog(){
    
    const dialogRef = this.dialog.open(AddCategoryComponent,{ width:"800px"});
    
    dialogRef.afterClosed().subscribe(result => {    
      this.list();
    });
  }

  editDialog(category){
    
    const dialogRef = this.dialog.open(EditCategoryComponent, { width:"600px", data:{categoryObj:category}});
    
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      this.list();
    });
  }

  delete(categoryId){
    let cfm = confirm("Do you want to delete ?");
    if(cfm){
      this.categoryService.delete(categoryId).subscribe(res=>{      
        this.toastr.success("Successfully Deleted");
        this.list();
      },
      err=>{
        this.toastr.error("Error", err.error.errorMessage);
      });
    }
  }
}
