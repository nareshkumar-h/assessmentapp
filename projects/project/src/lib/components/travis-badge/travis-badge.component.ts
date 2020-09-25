import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-travis-badge',
  templateUrl: './travis-badge.component.html',
  styleUrls: ['./travis-badge.component.css']
})
export class TravisBadgeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    console.log('travis badge' , this.repo);
    this.url = `https://travis-ci.com/${this.repo}.svg?branch=master`;
  }

  url:string;

  @Input()
  repo:string;


}
