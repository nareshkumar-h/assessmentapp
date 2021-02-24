import { Component, Input, OnInit } from '@angular/core';
import { ProjectService } from '../../project.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'projects/auth/src/public-api';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-view-project-feature',
  templateUrl: './view-project-feature.component.html',
  styleUrls: ['./view-project-feature.component.css'],
})
export class ViewProjectFeatureComponent implements OnInit {
  @Input()
  featureId: number;

  @Input()
  projectId: number;
  @Input()
  showSidebar: boolean;

  @Input()
  embedded: boolean;

  breadcrumbItems: any = [];
  isLoggedInUser: boolean;
  isReviewer: boolean;

  constructor(
    private projectService: ProjectService,
    private authService: AuthService,
    private toastr: ToastrService,
    private route: ActivatedRoute
  ) {
    this.isReviewer = this.authService.hasRoleAccess('T');
    console.log('isReviewer:', this.isReviewer);
    this.route.parent.params.subscribe((params) => {
      this.projectId = params['projectId'];
      console.log('ProjectId:' + this.projectId);
    });
    this.route.params.subscribe((params) => {
      this.featureId = params['featureId'];
      this.showSidebar = true;
    });
  }

  ngOnInit(): void {
    this.findOne();
  }

  project: any;
  feature: any;

  mode: string = 'view';
  noOfTasks: number = 0;

  findOne() {
    this.projectService.findByFeatureId(this.featureId).subscribe((res) => {
      this.feature = res;
      this.isLoggedInUser =
        this.authService.getSelectedUser() == this.feature['assignedTo'] ||
        this.authService.getSelectedUser() == this.feature['createdBy'];
      this.project = this.feature.projectModule.project;
    });
  }

  updateFeatureStatus(featureId, status) {
    this.projectService
      .updateFeatureStatus(featureId, status)
      .subscribe((res) => {
        this.toastr.success('Successfully Updated');
        this.ngOnInit();
      });
  }

  update(feature) {
    console.log('Description:', feature.description);
    this.projectService.updateFeature(feature).subscribe((res) => {
      console.log(res);
      this.mode = null;
    });
  }

  deleteFeature(id) {
    let cfm = confirm('Do you want to delete the feature?');
    if (cfm) {
      this.mode = 'view';
      this.projectService.deleteFeature(id).subscribe((res) => {
        this.toastr.success('Successfully Deleted');
        history.back();
      });
    }
  }
}
