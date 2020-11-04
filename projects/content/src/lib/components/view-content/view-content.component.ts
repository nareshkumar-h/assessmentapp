import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
//import {hljs} from 'highlight.js';



@Component({
  selector: 'ct-view-content',
  templateUrl: './view-content.component.html',
  styleUrls: ['./view-content.component.css']
})
export class ViewContentComponent implements OnInit {

  constructor( public sanitizer: DomSanitizer, private cdRef:ChangeDetectorRef,private http:HttpClient) { }

  ngOnInit(): void {
    console.log('View Content:', this.content);
    if(this.content.url){
      if(this.content.url.indexOf("java") !=-1){
        //this.content.contentType="C";
      }
    }
    if(this.content.contentType=="C"){
      this.getContent(this.content.url);
    }
    
  }


  lineNumbers = true;
  
  @Input()
  content:any;

  getContent(url){
    console.log("Fetch content");
    return this.http.get(url,{responseType:'text'}).subscribe(res=>{
      this.content.content = res;
    });
  }

  onHighlight(e,x) {
    console.log(e);
    console.log(x);
    //console.log(hljs);
    //hljs.highlightBlock(x);
  }

}
