import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-event-type-badge',
  templateUrl: './event-type-badge.component.html',
  styleUrls: ['./event-type-badge.component.css']
})
export class EventTypeBadgeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  @Input()
  type:string;

}
