import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserCourseService } from 'src/app/core/services/user-course.service';
import { AuthService } from 'src/app/core/services/auth.service';


@Component({
  selector: 'app-user-course-list',
  templateUrl: './user-course-list.component.html',
  styleUrls: ['./user-course-list.component.css']
})
export class UserCourseListComponent implements OnInit {

  
  userId:string;
  category:string;

  breadcrumbItems:any  = [ {"icon":"home", "name":"Home","link":"/"},
  {"name":"Course Dashboard"}];

  constructor(private userCourseService:UserCourseService, private authService:AuthService, private route: ActivatedRoute, private router:Router) {

    this.userId = this.authService.getLoggedInUsername();
    
    this.route.params.subscribe (params=>{
    
      //this.userId = params['userId'];
      this.category = params['category'];
      console.log("category-" + this.category);
      this.listCourses();
      
    });

   }

  ngOnInit(): void {
    this.listCourses();
  }

  userCourses:any;
  courses:any = {};

  listCoursesByCategory(){
    let categories =  this.category.split(",");  
    this.userCourseService.listCoursesByCategory(this.category,this.userId).subscribe (res=>{      
      this.display(categories, res);
    });
  }
  listCourses(){
    let categories= [];
    if(this.category){
      categories = this.category.split(",");
    }
    else{
      categories = this.categories;
    }
    this.courses = {};      
    this.userCourseService.listCourses(this.userId).subscribe (res=>{      
      
        this.display(categories, res);
    });
 
  }

  display(categories, usercourses:any){
    console.log(categories);
    this.userCourses = [];
    for(let category of categories){
      let data= usercourses.filter(c=> c.category == category);
      if(data.length >0){
        this.courses[category] = data;
        this.userCourses.push(...data);  
      }
    }
    this.createReport(this.userCourses);
  }

  
  reportData:any = [];
  widgetColors= [ "purple-plum","green-haze","green-haze","red-intense","blue-madison"];

  createReport(data){
    console.log(JSON.stringify(data));
    this.reportData=[];
    let i =0;
    let total = 0;
    let completed = 0;
    let pending = 0;
    let totalCourses = 0;
    
    
    
      totalCourses=data.length;
      for (let c of data){
      completed += c.completed_topics;
      pending+=(c.no_of_topics - c.completed_topics);
      total+=c.no_of_topics;
      
    }
    let percentage = total>0?Math.round ( 100*completed/total):0;
    this.reportData.push({"label":"Courses", "value":totalCourses});
    this.reportData.push({"label": "Topics", "value": total});
    this.reportData.push({"label": "Completed", "value": completed });
    this.reportData.push({"label": "Pending", "value": pending});
    this.reportData.push({"label": "Percentage", "value": percentage + "%" });


    

  }

  categories = ["Java","Database","Web","JEE","Testing","Cloud","Project Management","Tools","DevOps","Quality","Best Practices"];


  getPercentage = function (obj) {        
    var percentage = 0;
    if (obj.completed_topics > 0) {
        percentage = Math.round(100 * obj.completed_topics / (obj.no_of_topics));
    }
    return percentage;

  };

  
  navigate(routeLink, sidebarPath) {
    console.log(routeLink, sidebarPath);
    this.router.navigate([{ outlets: { primary: routeLink, sidebar: sidebarPath } }]);
  }

}
