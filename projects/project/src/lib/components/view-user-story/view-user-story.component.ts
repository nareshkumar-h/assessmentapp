import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'auth';
import { ProjectService } from '../../project.service';

@Component({
  selector: 'app-view-user-story',
  templateUrl: './view-user-story.component.html',
  styleUrls: ['./view-user-story.component.css'],
})
export class ViewUserStoryComponent implements OnInit {
  @Input()
  projectName;

  project: any;
  isMentor: boolean;

  constructor(
    private authService: AuthService,
    private projectService: ProjectService,
    private toastr: ToastrService
  ) {
    console.log('ViewUserStory');
    this.isMentor = this.authService.hasRoleAccess('T');
  }

  description;

  mode = 'view';

  ngOnInit(): void {
    this.findOne();
  }

  findOne() {
    this.projectService.findOne(this.feature.project.id).subscribe((res) => {
      this.project = res;
    });
  }

  @Input()
  feature: any;

  updateDescription() {
    console.log(this.feature.description);
    this.projectService.updateFeature(this.feature).subscribe((res) => {
      this.toastr.success('Successfully Updated');
      this.mode = 'view';
    });
  }
}
