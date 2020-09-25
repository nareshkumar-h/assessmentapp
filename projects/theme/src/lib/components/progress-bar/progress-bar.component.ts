import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'kt-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.css']
})
export class ProgressBarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  @Input()
  value:number;

}
