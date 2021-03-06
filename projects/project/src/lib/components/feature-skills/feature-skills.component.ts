import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'auth';
import { ProjectService } from '../../project.service';
import { AddSkillComponent } from '../add-skill/add-skill.component';

@Component({
  selector: 'lib-feature-skills',
  templateUrl: './feature-skills.component.html',
  styleUrls: ['./feature-skills.component.css'],
})
export class FeatureSkillsComponent implements OnInit {
  isLoggedInUser;
  isMentor;

  isEditable = false;

  constructor(
    private dialog: MatDialog,
    private toastr: ToastrService,
    private projectService: ProjectService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.isLoggedInUser = this.authService.isLoggedIn();
    this.isMentor = this.authService.hasRoleAccess('T');
  }

  @Input()
  featureId;

  @Input()
  feature: any;

  addSkillModal(feature) {
    const dialogRef = this.dialog.open(AddSkillComponent, {
      width: '100%',
      height: 'fit-content',
      data: { featureId: feature.id, tags: feature.tags },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
      }

      //this.features.tags.push(result);
    });
  }
}
