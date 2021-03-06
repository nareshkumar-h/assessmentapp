import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'auth';

@Component({
  selector: 'lib-user-report-sidebar',
  templateUrl: './user-report-sidebar.component.html',
  styleUrls: ['./user-report-sidebar.component.css'],
})
export class UserReportSidebarComponent implements OnInit {
  userId: string;
  loggedInUser;
  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.loggedInUser = this.authService.getUser();

    this.route.params.subscribe((params) => {
      this.userId = params['userId'];
    });
  }
  ngOnInit(): void {}

  navigate(path) {
    this.router.navigateByUrl(path + '/' + this.userId);
  }

  navigatePath(path) {
    if (path == 'features') {
      //this.router.navigate(["../features"]
      this.router.navigate(['reports/' + this.userId + '/features'], {
        queryParams: { display: 'name,description' },
      });
    } else if (path == 'technologies') {
      this.router.navigate(['reports/' + this.userId + '/features'], {
        queryParams: { display: 'name,technologies' },
      });
    } else {
      alert(path);
    }
  }

  navigateToFeatures() {
    this.router.navigate([], { queryParams: {} });
  }

  home(path) {
    this.router.navigateByUrl(path);
  }
}
