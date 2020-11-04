import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.css']
})
export class ViewUserComponent implements OnInit {

  userId:string;

  constructor(private route:ActivatedRoute, private userService:UserService) { 
    this.route.params.subscribe (params=>{
      this.userId = params["id"];
    })
  }

  ngOnInit(): void {
    this.loadMenus();
    this.findOne();
  }


  user:any;
  findOne(){
    this.userService.findOne(this.userId).subscribe(res=>{
      this.user = res;
    });
  }

  menus:any =[];

  loadMenus(){
    this.menus = [];
    this.menus.push( {title: "Back",  path:["../../"], icontype:"fas fa-arrow-left", access: true});
    this.menus.push( {title: "Profile",  path:["../" + this.userId+"/profile"], icontype:"fas fa-home", access: true});
    this.menus.push( {title: "Academics",  path:[ "../"+ this.userId + "/academics"], icontype:"fas fa-graduation-cap", access: true});
    this.menus.push( {title: "Features",  path:[ "../"+ this.userId + "/features"], icontype:"fas fa-flag", access: true});
    this.menus.push( {title: "Mentors",  path:[ "../"+ this.userId + "/mentors"], icontype:"fas fa-user", access: true});
    // this.menus.push( {title: "Change Password",  path:[ "../"+ this.userId + "/changePassword"], icontype:"fas fa-key", access: true});
    
  }

}
