import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HighlightModule, HIGHLIGHT_OPTIONS } from 'ngx-highlightjs';
import { HighlightPlusModule } from 'ngx-highlightjs/plus/public_api';

/**
 * Import specific languages to avoid importing everything
 * The following will lazy load highlight.js core script (~9.6KB) + the selected languages bundle (each lang. ~1kb)
 */
function getHighlightLanguages() {
  let a = {
    typescript: () => import('highlight.js/lib/languages/typescript'),    
    css: () => import('highlight.js/lib/languages/css'),
    sql: () => import('highlight.js/lib/languages/sql'),
    xml: () => import('highlight.js/lib/languages/xml'),
    java: () => import('highlight.js/lib/languages/java')
    
  };
  return a;
}

@NgModule({
  declarations: [
    ],
  imports: [
    CommonModule,HighlightModule,
    HighlightPlusModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ],
    providers: [{
      provide: HIGHLIGHT_OPTIONS,
      useValue:{
        languages: getHighlightLanguages(),
        lineNumbers: true
      }
    }]
})
export class KTHighlightModule { }
