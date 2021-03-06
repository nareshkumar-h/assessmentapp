import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../user.service';
import { AuthService } from 'auth';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css'],
})
export class ChangePasswordComponent implements OnInit {
  breadcrumbItems: any[];
  userId: string;
  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private authService: AuthService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {}

  account: any = { email: null, oldPassword: null, password: null };
  submit() {
    this.userService.changePassword(this.account).subscribe(
      (res) => {
        console.log(res);
        this.toastr.success('Success');
      },
      (err) => {
        console.log(err);
        this.toastr.error(err.error.errorMessage);
      }
    );
  }
}
