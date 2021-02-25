import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'projects/auth/src/public-api';

@Component({
  selector: 'lib-switch-user',
  templateUrl: './switch-user.component.html',
  styleUrls: ['./switch-user.component.css'],
})
export class SwitchUserComponent implements OnInit {
  constructor(
    private authService: AuthService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialog: MatDialog,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {}

  userId: string;

  switchUser() {
    console.log('Switch UserId:', this.userId);
    localStorage.setItem('SELECTED_USER', this.userId);
    this.dialog.closeAll();
    this.toastr.success('Switched to ' + this.userId);
  }

  clear() {
    let username = this.authService.getSelectedUser();
    this.toastr.success('Switched to ' + username);
    this.dialog.closeAll();
  }
}
