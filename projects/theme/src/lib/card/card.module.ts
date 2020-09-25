import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { CardComponent } from './card/card.component';
import { CardHeaderComponent } from './card-header/card-header.component';
import { CardBodyComponent } from './card-body/card-body.component';
import { CardFooterComponent } from './card-footer/card-footer.component';
import { CardActionsComponent } from './card-actions/card-actions.component';
import { CardTitleComponent } from './card-title/card-title.component';

@NgModule({
  declarations: [CardComponent, CardHeaderComponent,CardBodyComponent,CardFooterComponent,CardActionsComponent,CardTitleComponent],
  imports: [
    CommonModule,FormsModule
  ],
  exports: [
    CardComponent, CardHeaderComponent,CardBodyComponent,CardFooterComponent,CardActionsComponent,CardTitleComponent
  ]
})
export class CardModule { }
