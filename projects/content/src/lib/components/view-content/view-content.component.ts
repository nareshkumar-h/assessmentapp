import { Component, OnInit, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'ct-view-content',
  templateUrl: './view-content.component.html',
  styleUrls: ['./view-content.component.css']
})
export class ViewContentComponent implements OnInit {

  constructor( public sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    console.log('View Content:', this.content);
  }

  @Input()
  content:any;

}
