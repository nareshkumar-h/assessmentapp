import { NgModule } from '@angular/core';
import { ContentComponent } from './content.component';
import { ViewContentComponent } from './components/view-content/view-content.component';
import { CommonModule } from '@angular/common';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { HighlightModule, HIGHLIGHT_OPTIONS } from 'ngx-highlightjs';
import { HttpClientModule } from '@angular/common/http';
import { ClipboardModule } from 'ngx-clipboard';
import { ContentEditorToolbarComponent } from './components/content-editor-toolbar/content-editor-toolbar.component';
import { ContentEditorComponent } from './components/content-editor/content-editor.component';
import { FormsModule } from '@angular/forms';
import { CodeEditorComponent } from './components/code-editor/code-editor.component';



@NgModule({
  declarations: [ContentComponent, ViewContentComponent, ContentEditorToolbarComponent, ContentEditorComponent, CodeEditorComponent],
  imports: [
    CommonModule, FormsModule, PdfViewerModule,HighlightModule, HttpClientModule,ClipboardModule
  ],
  exports: [ContentComponent,ViewContentComponent,ContentEditorComponent, ContentEditorToolbarComponent,CodeEditorComponent],
  providers: [
    {
      provide: HIGHLIGHT_OPTIONS,
      useValue: {
        lineNumbers:true,
        coreLibraryLoader: () => import('highlight.js/lib/core'),
        //coreLibraryLoader: () => import('highlight.js/lib/highlight'),
        lineNumbersLoader: () => import('highlightjs-line-numbers.js'),
        languages: {
          xml: () => import('highlight.js/lib/languages/xml'),
          java: () => import('highlight.js/lib/languages/java'),
          typescript: () => import('highlight.js/lib/languages/typescript'),
          scss: () => import('highlight.js/lib/languages/scss'),
        }
      }
    }
  ],
})
export class ContentModule { }
