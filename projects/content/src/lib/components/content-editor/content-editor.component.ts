import { Component, OnInit, Output, EventEmitter, Renderer2, Inject, ChangeDetectorRef, Input, ViewChild, ElementRef, AfterContentInit, OnChanges, SimpleChanges } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'ct-content-editor',
  templateUrl: './content-editor.component.html',
  styleUrls: ['./content-editor.component.css']
})
export class ContentEditorComponent implements OnInit,AfterContentInit,OnChanges {

  constructor( private r: Renderer2,@Inject(DOCUMENT) private doc: any,
  private sanitizer: DomSanitizer,
  private cdRef: ChangeDetectorRef) { }
  ngOnChanges(changes: SimpleChanges): void {
    console.log("onchanges");
  }
  ngAfterContentInit(): void {
    console.log("After init")
  }

  ngOnInit(): void {
  }

  @Input()
  content:any;

  @ViewChild('editor', {static: true}) textArea: ElementRef;
  @ViewChild('editorWrapper', {static: true}) editorWrapper: ElementRef;
  
  @Output() valueChange = new EventEmitter();

  showPlaceholder:boolean = true;

  saveDraft(){
    //this.content = this.textArea.nativeElement.innerHTML;    
    console.log("content", this.content);
    this.valueChange.emit({content: this.content, contentType:this.contentType});
  }

  @Input()
  toolbar:boolean = true;

  setContentType(contentType){
    console.log(contentType);
    this.contentType = contentType;
    this.valueChange.emit({content: this.content, contentType:this.contentType});
  }

  /**
   * toggles placeholder based on input string
   *
   * @param value A HTML string from the editor
   */
  togglePlaceholder(value: boolean): void {
    if (!value) {
      this.r.addClass(this.editorWrapper.nativeElement, 'show-placeholder');
      this.showPlaceholder = true;

    } else {
      this.r.removeClass(this.editorWrapper.nativeElement, 'show-placeholder');
      this.showPlaceholder = false;
    }
  }

  onTextAreaFocus(event){
    console.log("text area focus", event);
  }

  onTextAreaBlur(event){
    console.log("text area blur", event);
  }
  onContentChange(){    
   // this.togglePlaceholder(true);
  }

  contentType:any;

}
