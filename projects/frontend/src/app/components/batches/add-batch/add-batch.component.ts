import { Component, OnInit } from '@angular/core';
import { BatchService } from '../batch.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { BatchClient } from '@ks-sdk-client/rest';
import { AuthService } from 'auth';
import { KtClientService } from '../../../kt-client.service';

@Component({
  selector: 'app-add-batch',
  templateUrl: './add-batch.component.html',
  styleUrls: ['./add-batch.component.css'],
})
export class AddBatchComponent implements OnInit {
  breadcrumbItems: any = [
    { icon: 'home', name: 'Home', link: '/' },
    { name: 'Batches', link: 'batches' },
  ];

  today: string = new Date().toJSON().substr(0, 10);

  batchClient: BatchClient;
  constructor(
    private batchService: BatchService,
    private ktClientService: KtClientService,
    private authService: AuthService,
    private toastr: ToastrService,
    private router: Router,
    public dialog: MatDialog
  ) {
    let headers = {
      org: this.authService.getLoggedInOrg(),
      createdBy: this.authService.getLoggedInUsername(),
    };
    this.batchClient = new BatchClient({ headers: headers });
  }

  ngOnInit(): void {}

  batch = {
    code: null,
    name: null,
    startDate: this.today,
    endDate: this.today,
    org:null
  };

  save(batch) {
    let createdBy = this.authService.getLoggedInUsername();
    batch['createdBy'] = createdBy;
    //this.batchService.save(this.batch).subscribe((res) => {
    this.ktClientService
      .getBatchClient()
      .addBatch(this.batch)
      .then((res) => {
        console.log(res);
        this.toastr.success('Successfully Batch Created');
        this.dialog.closeAll();
        this.router.navigate(['/batches/' + this.batch.code]);
      });
  }

  cancel() {
    this.dialog.closeAll();
  }
}
