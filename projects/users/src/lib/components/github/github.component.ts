import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../user.service';
import { AuthService } from 'auth';

@Component({
  selector: 'app-github',
  templateUrl: './github.component.html',
  styleUrls: ['./github.component.css'],
})
export class GithubComponent implements OnInit {
  breadcrumbItems: any = [];
  userId: string;
  constructor(
    private userService: UserService,
    private toastr: ToastrService,
    private authService: AuthService
  ) {
    this.userId = this.authService.getLoggedInUsername();
  }

  ngOnInit(): void {
    this.findOne();
  }

  user: any;

  findOne() {
    this.userService.findOne(this.userId).subscribe((res) => {
      this.user = res;
    });
  }

  submit() {
    this.userService.updateProfile(this.user).subscribe(
      (res) => {
        this.toastr.success('Success');
      },
      (err) => {
        this.toastr.error(err.error.errorMessage);
      }
    );
  }
}
