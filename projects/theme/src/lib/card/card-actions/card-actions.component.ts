import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'kt-card-actions',
  templateUrl: './card-actions.component.html',
  styleUrls: ['./card-actions.component.css']
})
export class CardActionsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

    console.log('Actions', this.actions);
  }

  @Input()
  actions:any;

}
