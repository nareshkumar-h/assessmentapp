import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ThemeComponent } from './theme.component';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DeviceDetectorModule } from 'ngx-device-detector';
import { AuthLayoutComponent } from './components/auth-layout/auth-layout.component';
import { HomeLayoutComponent } from './components/home-layout/home-layout.component';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';
import { PageBarComponent } from './components/page-bar/page-bar.component';
import { DashboardWidgetComponent } from './components/dashboard-widget/dashboard-widget.component';
import { MomentPipe } from './pipes/moment.pipe';
import { MyChartComponent } from './components/my-chart/my-chart.component';
import { ChartsModule, MDBBootstrapModule } from 'angular-bootstrap-md';
import { PageComponent } from './components/page/page.component';
import { CardModule } from './card/card.module';
import { TableModule } from './table/table.module';
import { SidenavModule } from './sidenav/sidenav.module';
import { ProgressBarComponent } from './components/progress-bar/progress-bar.component';
import { MaterialModule } from './material.module';
import { NavbarModule } from './navbar/navbar.module';
import { LoadingBarComponent } from './components/loading-bar/loading-bar.component';
import { ProgressSpinnerComponent } from './components/progress-spinner/progress-spinner.component';
import { BrowserModule } from '@angular/platform-browser';
import { SwitchUserComponent } from './components/switch-user/switch-user.component';



@NgModule({
  declarations: [ThemeComponent,  AuthLayoutComponent,
     HomeLayoutComponent, PageBarComponent, DashboardWidgetComponent, MomentPipe, MyChartComponent, 
     PageComponent, ProgressBarComponent,LoadingBarComponent,ProgressSpinnerComponent],
  imports: [
    MDBBootstrapModule.forRoot(),
    ChartsModule,
    NavbarModule,
    CardModule,
    TableModule,
    SidenavModule,
    CommonModule,FormsModule,RouterModule,HttpClientModule, 
    ToastrModule.forRoot(),
    DeviceDetectorModule,
    MaterialModule,    
    BrowserModule    
  ],
  entryComponents: [SwitchUserComponent],
  exports: [ThemeComponent, AuthLayoutComponent,HomeLayoutComponent, PageBarComponent,
    DashboardWidgetComponent,MomentPipe,MyChartComponent,  ProgressSpinnerComponent,
  PageComponent  , ProgressBarComponent,LoadingBarComponent, NavbarModule, SidenavModule,ChartsModule,MaterialModule,CardModule,
  CommonModule, FormsModule
],
schemas: [
  CUSTOM_ELEMENTS_SCHEMA,
  NO_ERRORS_SCHEMA
]
})
export class  ThemeModule { }
