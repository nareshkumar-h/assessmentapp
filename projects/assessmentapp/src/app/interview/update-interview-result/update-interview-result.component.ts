import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'projects/auth/src/public-api';
import { InterviewService } from '../../interview.service';

@Component({
  selector: 'app-update-interview-result',
  templateUrl: './update-interview-result.component.html',
  styleUrls: ['./update-interview-result.component.css'],
})
export class UpdateInterviewResultComponent implements OnInit {
  batchId: string;
  batch: any;
  oldBatch: any;
  interview: any = { id: null, rating: null, comments: null, status: null };
  interviewId: any;
  interviewObj: any;

  constructor(
    private interviewService: InterviewService,
    private authService: AuthService,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    console.log(data);
    this.interviewId = data.id;
    this.interview['id'] = data.id;
    this.interviewObj = JSON.parse(JSON.stringify(data));

    // this.route.parent.params.subscribe ( params=>{
    //   this.batchId = params["id"];
    //   this.breadcrumbItems.push({name:this.batchId});
    // });
  }

  ratings = ['VGOOD', 'GOOD', 'AVERAGE', 'REJECTED'];

  ngOnInit(): void {}

  save(interview, rating = null) {
    let createdBy = this.authService.getLoggedInUsername();
    console.log('save', interview);
    console.log(rating);
    this.dialog.closeAll();
    this.toastr.success('Successfully Updated' + rating);
    //    interview['createdBy'] = createdBy;

    /* this.ktClient
      .getBatchClient()
      .updateBatch(batch.id, batch)
      .then((res) => {
        //this.router.navigate(["batches"]);
        this.toastr.success('Successfully Updated');
        this.dialog.closeAll();
      });*/
  }

  delete(batchId) {
    let cfm = confirm('Do you want to delete the batch ?');
    if (cfm) {
      /* this.ktClient
        .getBatchClient()
        .deleteBatch(batchId)
        .then((res) => {
          this.toastr.success('Successfully Batch Deleted');
          this.dialog.closeAll();
          this.router.navigate(['batches']);
        });
        */
    }
  }

  cancel() {
    //this.router.navigate(["batches/"+this.batchId]);
    this.data.batch = this.oldBatch;
    this.dialog.closeAll();
  }
}
