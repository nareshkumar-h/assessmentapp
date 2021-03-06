import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BatchService } from '../batch.service';
import { AuthService } from 'auth';
import { KtClientService } from '../../../kt-client.service';

@Component({
  selector: 'app-batch-activity',
  templateUrl: './batch-activity.component.html',
  styleUrls: ['./batch-activity.component.css'],
})
export class BatchActivityComponent implements OnInit {
  batchId: string;
  user: any;
  breadcrumbItems = [
    { icon: 'home', name: 'Home', link: '/' },
    { name: 'Activities' },
  ];

  constructor(
    private authService: AuthService,
    private ktClient: KtClientService,
    private route: ActivatedRoute
  ) {
    this.route.params.subscribe((params) => {
      this.batchId = params['id'];
    });
  }

  ngOnInit(): void {
    this.list();
  }

  activities: any;

  list() {
    this.ktClient
      .getBatchClient()
      .getBatchActivities(this.batchId)
      .then((res) => {
        this.activities = res['activities'];
        let batch = res['batch'];

        this.createReport(this.activities, batch);
        this.createChart(this.activities);
      });
  }

  reportData: any = [];
  widgetColors = [
    'purple-plum',
    'blue-madison',
    'green-haze',
    'red-intense',
    'blue-madison',
    'red-intense',
  ];

  createReport(data, batch) {
    this.ktClient
      .getBatchClient()
      .getBatchActivitiesReport(data, batch)
      .then((res) => {
        this.activityReport = res;
      });
  }

  activityReport: any = [];

  reportMap: any;

  createChart(data) {
    let dates = [];
    let points = [];
    for (let r of data) {
      dates.push(r.DATE);
      points.push(r.cnt);
    }
    this.reportMap = {
      labels: dates,
      dataSets: [{ data: points, label: 'Points (' + dates.length + ' days)' }],
    };
  }
}
