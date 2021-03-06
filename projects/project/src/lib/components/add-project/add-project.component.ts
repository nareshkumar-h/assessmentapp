import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'auth';
import { ToastrService } from 'ngx-toastr';
import { ProjectService } from '../../project.service';
@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css'],
})
export class AddProjectComponent implements OnInit {
  breadcrumbItems: any = [];
  showSidebar = true;

  userId: any;
  constructor(
    private projectService: ProjectService,
    private router: Router,
    private authService: AuthService,
    private toastr: ToastrService
  ) {
    this.userId = this.authService.getLoggedInUsername();
  }

  today: string = new Date().toJSON().substr(0, 10);
  ngOnInit(): void {
    this.loadMenus();
  }

  project: any = {
    projectPrefix: null,
    name: null,
    startDate: this.today,
    completionDate: this.today,
    assignedTo: null
  };


  save(project) {
    this.projectService.save(project).subscribe((res) => {
      console.log(res);
      //this.router.navigate(['projects']);
      this.toastr.success("Added Project Successfully");
      this.project = {
        projectPrefix: null,
        name: null,
        startDate: this.today,
        completionDate: this.today,
        assignedTo: null
      };
    });
  }

  cancel() {
    window.history.back();
  }

  menus: any;

  loadMenus() {
    this.menus = [];
    this.menus.push({
      title: 'Home',
      path: ['../'],
      icontype: 'fas fa-home',
      access: true,
    });

    this.menus.push({
      title: 'My Projects',
      path: ['../'],
      icontype: 'fas fa-user',
      access: this.authService.hasRoleAccess(['U']),
    });
    this.menus.push({
      title: 'All Projects',
      path: ['../all'],
      icontype: 'fas fa-tools',
      access: this.authService.hasRoleAccess(['U', 'T', 'HR']),
    });
    this.menus.push({
      title: 'Add Project',
      path: ['../addproject'],
      icontype: 'fas fa-plus',
      access: this.authService.hasRoleAccess(['U']),
    });
  }
}
