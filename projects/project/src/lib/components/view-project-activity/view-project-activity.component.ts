import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'pt-view-project-activity',
  templateUrl: './view-project-activity.component.html',
  styleUrls: ['./view-project-activity.component.css']
})
export class ViewProjectActivityComponent implements OnInit {

  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.loadDocuments();
  }

  url:SafeUrl;

  loadDocuments(){
    this.url = "https://app.lucidchart.com/documents/embeddedchart/3df1d7e7-0f4d-4149-b2f0-e01f2930adac";
  }

  cleanURL(oldURL ): SafeUrl {
    return   this.sanitizer.bypassSecurityTrustResourceUrl(oldURL);
  }

}
