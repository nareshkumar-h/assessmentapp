import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'kt-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {

  constructor(private router:Router) { 
    //console.log('HeaderComponent constructor', this.user);
  
  }

  ngOnInit(): void {

    //console.log("Menus:" , this.menus);
    //console.log("BgColor", this.bgColor);
    this.bgColor = this.bgColor || "#2b3643";
  }

  @Input()
  navbrand:string;

  @Input()
  user:any;

  logout(){
    console.log('logout')
    localStorage.clear();
    sessionStorage.clear();
    window.location.href="/";
    //this.router.navigate(['auth/login']);
  }

  @Input()
  menus:any;

  @Input()
  rightMenus:any;

  @Input()
  bgColor:any;
}
