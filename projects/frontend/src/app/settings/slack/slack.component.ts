import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'auth';
import { MatTableDataSource } from '@angular/material/table';
import { SlackService } from '../../components/slack/slack.service';

@Component({
  selector: 'app-slack',
  templateUrl: './slack.component.html',
  styleUrls: ['./slack.component.css'],
})
export class SlackComponent implements OnInit {
  constructor(
    private slackService: SlackService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.findOne();
  }

  dataSource: any;

  displayedColumns: string[] = ['applicationName', 'url', 'hookUrl', 'active'];

  findOne() {
    this.slackService.list().subscribe((res) => {
      let slacks: any = res;
      this.dataSource = new MatTableDataSource<any>(slacks);
    });
  }
}
