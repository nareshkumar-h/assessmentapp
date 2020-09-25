import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-sidebar',
  templateUrl: './profile-sidebar.component.html',
  styleUrls: ['./profile-sidebar.component.css']
})
export class ProfileSidebarComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  navigate(routeLink, sidebarPath) {
    console.log(routeLink);
    console.log(routeLink, sidebarPath);
    if(sidebarPath){
      this.router.navigate([{ outlets: { primary: routeLink, sidebar: [sidebarPath] } }]);
    }
    else{
      this.router.navigate([{ outlets: { primary: routeLink, sidebar: null } }]);
    }
    
  }

}
