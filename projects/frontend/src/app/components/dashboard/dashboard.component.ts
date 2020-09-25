import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'projects/auth/src/public-api';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  userId:string;
  user:any;

  breadcrumbItems:any;
  

  constructor(private router:Router, private authService:AuthService) {
    
   }

  ngOnInit(): void {

    this.user = this.authService.getUser();
    this.userId = this.authService.getLoggedInUsername();
    console.log(this.userId);
    this.loadMenus();
    this.checkLoggedIn();

  }

  checkLoggedIn(){
    let user = JSON.parse(localStorage.getItem("LOGGED_IN_USER"));    
    console.log(user);
    if(!user){
      console.log('redirect to login page');
      this.router.navigate(["auth/login"], {queryParams: {"redirectUrl":"dashboard"}});
    }
    else{
      console.log("Already loggedin");
    }
  }


  navigate(routeLink, sidebarPath) {
    console.log(routeLink, sidebarPath);
    this.router.navigate([{ outlets: { primary: routeLink, sidebar: sidebarPath } }]);
  }

  features =[];

  getFeatures(){
    
    let featureList = [
      {name:"Courses", link: "../" + this.userId + "/courses", image:"courses.jpg",active:this.hasRole(["U"])},
      {name:"Projects", link:"../"+ this.userId + "/projects", image:"project.png",active:this.hasRole(["U"])},
      {name:"Training", link:"../training/"+ this.userId, image:"training.jpg",active:this.hasRole(["T"])},
      {name:"Batches", link:"../batches/"+ this.userId, image:"training.jpg",active:this.hasRole(["T"])}
    ];
    this.features = featureList.filter(obj=>obj.active==true);
    return this.features;
  }

  hasRole(roles){
    let allowed = false;
    for(let role of roles){
      if(this.user.roles.indexOf(role) !=-1){
        allowed = true;
        break;
      }
    }
    return allowed;
  }

  menus:any;
  loadMenus(){
    this.menus = [];
    
    this.menus.push( {title: "Home",  path:[""], icontype:"fas fa-home",  access: true});
    this.menus.push( {title: "Courses",  path:["/learn/courses"], icontype:"fas fa-graduation-cap",  access: this.hasRole(["U"])});
    this.menus.push( {title: "Projects",  path:["/"+ this.userId + "/myprojects"], icontype:"fas fa-cubes",  access: this.hasRole(["U"])});
   
    this.menus.push( {title: "Trainings",  path:["/training/" +this.userId], icontype:"fas fa-cubes",  access: this.hasRole(["T"])});
    this.menus.push( {title: "Batches",  path:["/batches"], icontype:"fas fa-cubes",   access: this.hasRole(["T","HR"])});
    this.menus.push( {title: "Users",  path:["/users"], icontype:"fas fa-users",  access:  this.hasRole(["T","HR"])});

    this.menus.push( {title: "Courses",  path:["/courses"], icontype:"fas fa-cubes",  access: this.hasRole(["T"])});

    //this.menus.push( {title: "Assessments",  path:["/"+ this.userId + "/assessments"], icontype:"fas fa-cubes",  access: true});
    //this.menus.push( {title: "Interviews",  path:["/"+ this.userId + "/interviews"], icontype:"fas fa-cubes",  access: true});
  }  
}
