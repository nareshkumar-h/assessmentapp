import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SettingsComponent } from './settings.component';
import { SiteThemeComponent } from './site-theme/site-theme.component';
import { DomainComponent } from './domain/domain.component';
import { OrganizationComponent } from './organization/organization.component';
import { MailComponent } from './mail/mail.component';
import { ThemeModule } from 'projects/theme/src/public-api';
import { SettingsRoutingModule } from './settings-routing.module';
import { FeaturesComponent } from './features/features.component';
import { SlackComponent } from './slack/slack.component';
import { RolesComponent } from './roles/roles.component';



@NgModule({
  declarations: [
    SettingsComponent,
    SiteThemeComponent,
    OrganizationComponent,
    DomainComponent,
    MailComponent,
    FeaturesComponent,
    SlackComponent,
    RolesComponent],
  imports: [
    CommonModule,FormsModule,RouterModule,ThemeModule, SettingsRoutingModule
  ]
})
export class SettingsModule { }
