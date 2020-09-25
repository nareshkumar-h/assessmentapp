import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'projects/auth/src/public-api';;

@Component({
  selector: 'app-project-sidebar',
  templateUrl: './project-sidebar.component.html',
  styleUrls: ['./project-sidebar.component.css']
})
export class ProjectSidebarComponent implements OnInit {

  projectId:number;
  userId:string;
  constructor(private router:Router, private route:ActivatedRoute,private authService:AuthService) {
    this.userId = authService.getLoggedInUsername();
    this.route.params.subscribe (params=>{
      this.projectId = params["projectId"];

      console.log(params);
    });
   }

  ngOnInit(): void {
  }

  navigate(routeLink) {
    console.log(routeLink);
    this.router.navigate([{ outlets: { primary: routeLink } }]);
  }

}
