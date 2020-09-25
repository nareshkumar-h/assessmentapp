import { Component, OnInit, ViewChild, Input } from '@angular/core';

@Component({
  selector: 'kt-chart',
  templateUrl: './my-chart.component.html',
  styleUrls: ['./my-chart.component.css']
})
export class MyChartComponent implements OnInit {

  
  position: number;

  @ViewChild('thisOne') child: MyChartComponent;

  constructor() { 
    console.log('MyChart Constructor');
  }

  ngOnInit(): void {
    console.log("chartType" , this.chartData);

    console.log("chartDataSets" + this.chartDatasets);
    console.log("chartLabels" + this.chartLabels);
    console.log("Height:" + this.height);
    this.height  = this.height || 100;
    console.log("Height:" + this.height);
    this.prepareChartData();
  }

  prepareChartData() {
    let labels = this.chartData["labels"];
    //console.log("Labels", labels + ",this.username=" + this.username);
    this.chartLabels = this.rank ? this.getLabelWithRank(labels) : labels;
    this.chartDatasets = this.chartData["dataSets"];
    if (this.username) {
      this.position = labels.indexOf(this.username) != -1 ? labels.indexOf(this.username) + 1 : null;
      this.setTitle();
    }
    this.setCardColor();


  }

  ngOnChanges() {
    // create header using child_id
    //console.log("mychart- onchanged" + this.chartTitle);
    this.prepareChartData();
  }

  getLabelWithRank(names) {
    let i = 0;
    let rank = [];
    for (let d of names) {
      rank.push(d + "-" + ++i);
    }
    return rank;
  }

  @Input('chartTitle')
  chartTitle: string;

  @Input('username')
  username: string;

  @Input()
  rank: boolean = false;

  @Input()
  chartData: any;

  @Input()
  height:number;


  @Input('chartType')
  public chartType: string;

  @Input('chartDatasets')
  public chartDatasets: Array<any>;

  @Input('chartLabels')
  public chartLabels: Array<any>;

  public chartColors: Array<any> = [
    {
      backgroundColor: 'rgba(63, 127, 191, .2)',
      borderColor: 'rgba(63, 127, 191, .7)',
      borderWidth: 1,
      fillColor: 'rgba(1, 100, 191, .7)',
      strokeColor: 'rgba(100, 100, 191, .7)',
      highlightFill: 'rgba(100, 100, 191, .7)',
      highlightStroke: 'rgba(100, 100, 191, .7)',
    },
    {
      backgroundColor: 'rgba(0, 250, 220, .2)',
      borderColor: 'rgba(0, 213, 132, .7)',
      borderWidth: 10,
    }
  ];

  @Input('cardColorEnabled')
  cardColorEnabled: boolean;

  public chartOptions: any = {
    responsive: true
  };

  public chartClicked(e: any): void {
    console.log(e);
    if (e.active && e.active.length >= 1) {
      let label = e.active[0]._model.label;
      console.log("selected Label:" + label);
    }

  }

  setTitle() {
    if (this.username) {
      if (this.rank && this.position) {
        this.titleText = " ( " + this.username + " - Current Rank : " + this.position + " out of " + this.chartLabels.length + " )";
      }
      else {
        this.titleText = " ( " + this.username + " )";
      }
    }
    else {
      this.titleText = "";
    }
  }

  titleText: string;

  cardColor: string;

  @Input()
  titleLink:string;

  setCardColor() {
    console.log("---" + this.chartTitle + "---" + this.position + "-" + this.chartLabels.length + ",cardColorEnabled:" + this.cardColorEnabled);
    let color = "";
    if (!this.cardColorEnabled || !this.rank) {
      color = "card-default";
    }
    else if (this.position == null) {
      color = "card-red";
    }
    else {
      let total = this.chartLabels.length;
      let percentage = 100 * this.position / total;
      //console.log(percentage);
      if (percentage <= 50) {
        color = 'card-green';
      }
      else if (percentage > 50 && percentage <= 75) {
        color = "card-orange";
      }
      else {
        color = 'card-red';
      }
    }

    //console.log(color);

    this.cardColor = color;

  }
}
