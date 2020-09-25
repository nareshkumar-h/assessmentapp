import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'ct-content-editor-toolbar',
  templateUrl: './content-editor-toolbar.component.html',
  styleUrls: ['./content-editor-toolbar.component.css']
})
export class ContentEditorToolbarComponent implements OnInit {

  @Output() valueChange = new EventEmitter();
  
  constructor() { }

  ngOnInit(): void {
  }

  htmlContent:any;

  link:any;
  triggerCommand(contentType){
    //var link = prompt("Insert Link");
    //this.link = link;    
    this.valueChange.emit(contentType);
  }
}
