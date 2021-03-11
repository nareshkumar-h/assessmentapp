import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrganizationComponent } from './organization/organization.component';
import { DomainComponent } from './domain/domain.component';
import { MailComponent } from './mail/mail.component';
import { SettingsComponent } from './settings.component';
import { SiteThemeComponent } from './site-theme/site-theme.component';
import { FeaturesComponent } from './features/features.component';
import { SlackComponent } from './slack/slack.component';
import { RolesComponent } from './roles/roles.component';

const routes: Routes = [
  {
    path: 'settings',
    component: SettingsComponent,
    data: { showSidebar: true },
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'account', pathMatch: 'full' },
      { path: '@nareshkumarh/kt-theme', component: SiteThemeComponent },
      { path: 'organization', component: OrganizationComponent },
      { path: 'account', component: DomainComponent },
      { path: 'mail', component: MailComponent },
      { path: 'features', component: FeaturesComponent },
      { path: 'slack', component: SlackComponent },
      { path: 'roles', component: RolesComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SettingsRoutingModule {}
