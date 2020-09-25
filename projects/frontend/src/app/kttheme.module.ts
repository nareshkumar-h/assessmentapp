import { NgModule } from '@angular/core';

import { ThemeModule, NavbarModule, SidenavModule, CardModule } from 'projects/theme/src/public-api';

@NgModule({
  imports: [
    ThemeModule,
    NavbarModule,
    SidenavModule,
    CardModule
  ],
  exports: [
    ThemeModule,
    NavbarModule,
    SidenavModule,
    CardModule
  ]
})
export class KTThemeModule {}