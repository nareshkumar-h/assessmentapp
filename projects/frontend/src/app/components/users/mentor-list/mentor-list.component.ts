import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from 'projects/auth/src/public-api';
import { UserService } from '../user.service';

@Component({
  selector: 'app-mentor-list',
  templateUrl: './mentor-list.component.html',
  styleUrls: ['./mentor-list.component.css']
})
export class MentorListComponent implements OnInit {

  constructor(private userService:UserService, private authService:AuthService) { }

  ngOnInit(): void {
    this.loadMentors();
  }

  
  displayedColumns: string[] = ['id','mentorEmail','status','active'];

  dataSource:any;

  loadMentors(){
    this.userService.getMentors(this.authService.getLoggedInUsername()).subscribe(res=>{
      let mentors:any = res;
      this.dataSource = new MatTableDataSource<any>(mentors);
    });
  }

  update(){

  }
  cancel(){
    window.history.back();
  }


}
