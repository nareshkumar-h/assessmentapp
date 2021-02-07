import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'projects/auth/src/public-api';
import { ProjectService } from '../../project.service';

@Component({
  selector: 'lib-review-rating-form',
  templateUrl: './review-rating-form.component.html',
  styleUrls: ['./review-rating-form.component.css'],
})
export class ReviewRatingFormComponent implements OnInit {
  isMentor: boolean;
  constructor(
    private authService: AuthService,
    private projectService: ProjectService,
    private toastr: ToastrService
  ) {
    this.isMentor = this.authService.hasRoleAccess('T');
    this.readonly = !this.isMentor;
  }

  ngOnInit(): void {
    console.log('FeatureId: ' + this.featureId);
    this.findOne();
  }

  @Input()
  featureId;

  readonly;

  reviewRating = {featureId:null, functionality:null, design:null, documentation:null, complexity:null,
  bestPractices:null, timeline:null, comments: null};

  findOne() {
    this.projectService
      .getFeatureReviewRating(this.featureId)
      .subscribe(res => {
        let data:any = res;
        if(res != null){
          this.reviewRating = data;
        }
       
      });
  }

  updateReview() {
    if(!this.readonly){
      this.reviewRating['featureId'] = this.featureId;
      console.log('Update Review', this.reviewRating);
      this.projectService
        .updateFeatureReviewRating(this.featureId, this.reviewRating)
        .subscribe((res) => {
          console.log(res);
          this.toastr.success('Successfully Updated');
        });
    }
  }
}
