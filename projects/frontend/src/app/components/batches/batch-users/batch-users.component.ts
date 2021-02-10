import { Component, OnInit } from '@angular/core';
// import { BatchService } from '../batch.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { AddBatchUserComponent } from '../add-batch-user/add-batch-user.component';
import { KtClientService } from '../../../kt-client.service';

@Component({
  selector: 'app-batch-users',
  templateUrl: './batch-users.component.html',
  styleUrls: ['./batch-users.component.css'],
})
export class BatchUsersComponent implements OnInit {
  batchId: string;

  breadcrumbItems: any = [
    { icon: 'home', name: 'Home', link: '/' },
    { name: 'Batches', link: '../../batches' },
  ];

  constructor(
    private dialog: MatDialog,
    private ktClient: KtClientService,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) {
    this.route.parent.params.subscribe((params) => {
      this.batchId = params['id'];
      this.breadcrumbItems.push({ name: this.batchId });
    });
  }

  ngOnInit(): void {
    this.list();
  }

  users: any;
  userIds: any = [];

  list() {
    this.ktClient
      .getBatchClient()
      .getBatchUsers(this.batchId)
      .then((res) => {
        this.users = res;
        this.userIds = [];
        for (let u of this.users) {
          this.userIds.push(u.userId);
        }
      });
  }

  delete(userId) {
    this.ktClient
      .getBatchClient()
      .removeUserFromBatch(this.batchId, userId)
      .then((res) => {
        this.toastr.success('Successfully removed user from batch');
        this.list();
      });
  }

  mode: string;

  updateMode(mode) {
    this.mode = mode;
  }

  openDialog() {
    const dialogRef = this.dialog.open(AddBatchUserComponent, {
      width: '800px',
      data: { batchId: this.batchId, users: this.userIds },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.list();
    });
  }
}
