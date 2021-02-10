import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SwitchUserComponent } from '../../components/switch-user/switch-user.component';

@Component({
  selector: 'kt-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {
  constructor(private router: Router, public dialog: MatDialog) {
    //console.log('HeaderComponent constructor', this.user);
  }

  @Input()
  users: any;

  isMentor = false;
  selectedUser: any;
  searchUser: string;
  loggedInUsername: any;
  ngOnInit(): void {
    //console.log("Menus:" , this.menus);
    //console.log("BgColor", this.bgColor);
    this.bgColor = this.bgColor || '#2b3643';
    this.loggedInUsername = JSON.parse(
      sessionStorage.getItem('LOGGED_IN_USER')
    ).username;
    this.selectedUser = sessionStorage.getItem('SELECTED_USER');
    this.isMentor = this.user ? this.user.roles.indexOf('T') != -1 : false;
  }

  switchUser(selectedUser) {
    console.log(selectedUser);
    console.log('search user', this.searchUser);
    this.selectedUser = selectedUser;
    if (selectedUser) {
      let cfm = confirm(
        'Do you want to switch user - ' + this.selectedUser + ' ?'
      );
      if (cfm) {
        sessionStorage.setItem('SELECTED_USER', this.selectedUser);
        //window.location.reload();
        this.router.navigate(['home']);
      }
    } else {
      this.clearUser();
    }
  }

  clearUser() {
    console.log(this.loggedInUsername);
    sessionStorage.setItem('SELECTED_USER', this.loggedInUsername);
    window.location.reload();
  }

  isExists(user) {
    console.log('user', user);
    return this.users.indexOf(user) != -1;
  }

  clearSwitchUser() {
    var selectedUsername = prompt('Enter username');

    if (selectedUsername && selectedUsername.length > 0) {
      this.selectedUser = selectedUsername;
      sessionStorage.setItem('SELECTED_USER', selectedUsername);
      window.location.reload();
    } else {
      sessionStorage.setItem('SELECTED_USER', this.loggedInUsername);
      window.location.reload();
    }
  }

  switchUserDialog(userId) {
    const dialogRef = this.dialog.open(SwitchUserComponent, {
      width: '800px',
      height: 'fit-content',
      data: { userId: userId },
    });

    dialogRef.afterClosed().subscribe((result) => {
      //this.refresh();
    });
  }

  @Input()
  navbrand: string;

  @Input()
  user: any;

  logout() {
    console.log('logout');
    sessionStorage.clear();
    sessionStorage.clear();
    window.location.href = '/auth/login';
    //this.router.navigate(['auth/login']);
  }

  @Input()
  menus: any;

  @Input()
  rightMenus: any;

  @Input()
  bgColor: any;
}
