import { Component, OnInit, Input } from '@angular/core';

import * as _ from 'lodash';
import { GithubService } from '../../github.service';

@Component({
  selector: 'app-view-files-committed',
  templateUrl: './view-files-committed.component.html',
  styleUrls: ['./view-files-committed.component.css']
})
export class ViewFilesCommittedComponent implements OnInit {

  constructor(private githubService:GithubService) {
    
   }

  ngOnInit(): void {
    console.log('init' , this.url);
    console.log( 'constructor', this.message , this.createdAt, this.url);
    this.getFiles();
  }

  
  @Input()
  message: string;
  @Input()
  createdAt:any;

  @Input()
  url:any;

  files:any;
  getFiles(){
    console.log('getfiles' + this.url);
    this.files=[];
    this.githubService.getFiles(this.url).subscribe ( res=>{      
      
      let files = _.groupBy( res['files'], 'status');      
      this.files = files;
    });
  }



}
