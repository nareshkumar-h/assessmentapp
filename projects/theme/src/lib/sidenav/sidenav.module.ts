import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from './sidebar/sidebar.component';
import {MetismenuAngularModule} from '@metismenu/angular';

@NgModule({
  declarations: [SidebarComponent],
  imports: [
    CommonModule,RouterModule,MetismenuAngularModule
  ],
  exports:[
    SidebarComponent
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ]
})
export class SidenavModule { }
