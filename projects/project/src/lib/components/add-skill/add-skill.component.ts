import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'projects/auth/src/public-api';
import { ProjectService } from '../../project.service';

@Component({
  selector: 'lib-add-skill',
  templateUrl: './add-skill.component.html',
  styleUrls: ['./add-skill.component.css']
})
export class AddSkillComponent implements OnInit {

  isLoggedInUser;
  
  breadcrumbItems  = [ {"icon":"home", "name":"Home","link":"/"},
   {"name":"Courses"}];
   

   tags:any;

   skills= [];

   isMentor:boolean;
  constructor(private projectService:ProjectService, private authService:AuthService,private toastr:ToastrService, private router:Router, private route:ActivatedRoute,
    @Inject(MAT_DIALOG_DATA) public data: any, private dialog:MatDialog) { 
      this.featureId = data["featureId"];
      this.tags = data["tags"];
      let loggedInUser = this.authService.getLoggedInUsername();
      this.isLoggedInUser = this.authService.isLoggedIn();
      this.isMentor = this.authService.hasRoleAccess("T");
  }

  technologies;
  ngOnInit(): void {
    this.technologies =  this.projectService.getTechnologies();
  }

  
  cancel(){
    window.history.back();
  }

  featureId;
  
  addTag(tag, checked){
    if(checked){
      this.skills.push(tag);
      this.tags.push(tag);
    }
    else{
      
    }
  }

  removeTag(tag,checked){
    this.skills.splice(this.skills.indexOf(tag),1);
    this.tags.splice(this.tags.indexOf(tag),1);
  }
  updateTags(){
    
    let tags  =  this.skills.join(",");
    let tagData = { featureId: this.featureId, tag: tags, enabled: true };
    
    this.projectService.updateTag(this.featureId, tagData).subscribe(res=>{
      
      this.toastr.success("Added ");

      this.dialog.closeAll();
    })
  }


}
