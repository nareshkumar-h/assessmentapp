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

  isMentor = false;
  selectedUser: any;
  ngOnInit(): void {

    //console.log("Menus:" , this.menus);
    //console.log("BgColor", this.bgColor);
    this.bgColor = this.bgColor || "#2b3643";
    this.selectedUser = localStorage.getItem("SELECTED_USER");
    console.log(this.user);
    this.isMentor = this.user ? this.user.roles.indexOf("T") != -1: false;
    
  }

  

  switchUser(selectedUser){
    console.log(selectedUser);
    this.selectedUser = selectedUser;
    
    let cfm = confirm("Do you want to switch user - " + this.selectedUser + " ?");
    if(cfm){
      localStorage.setItem("SELECTED_USER", this.selectedUser);
      window.location.reload();
    } 
  }

  clearSwitchUser(){
    var selectedUsername = prompt("Enter username");
    
      
      if(selectedUsername && selectedUsername.length>0){
        this.selectedUser = selectedUsername;
        localStorage.setItem("SELECTED_USER", selectedUsername);
        window.location.reload();
      }
    
  }

  @Input()
  navbrand:string;

  @Input()
  user:any;

  logout(){
    console.log('logout')
    localStorage.clear();
    sessionStorage.clear();
    window.location.href="/auth/login";
    //this.router.navigate(['auth/login']);
  }

  @Input()
  menus:any;

  @Input()
  rightMenus:any;

  @Input()
  bgColor:any;
}
