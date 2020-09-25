import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ContentService {

  constructor() { }

  contentTypes = [
    {key:"T", desc: "Text", icon:"fas fa-file-text"},
    {key:"V", desc:"Video", icon:"fas fa-video-camera"},
    {key:"L",desc: "Link", icon:"fas fa-link"},
    {key:"C", desc:"Code", icon:"fas fa-code"},
    {key:"I", desc:"Image", icon:"fas fa-image"},
    {key:"P", desc:"PDF", icon:"fas fa-file-pdf"},
    {key:"A", desc:"Audio", icon:"fas fa-file-audio"}     
  ];

  getContentTypes() {  
    return this.contentTypes;
  }

  content:any;

  setContent(content){
    this.content = content;
  }

  getContent(){
    return this.content;
  }

}
