import { Component, OnInit, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Menu } from '../../models/menu';
import PerfectScrollbar from 'perfect-scrollbar';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'kt-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  isMobile:boolean ;
  constructor(private deviceService: DeviceDetectorService) { 
    this.isMobile = this.deviceService.isMobile();
  }

  ngOnInit(): void {
   // console.log("Sidebar:" + JSON.stringify(this.menus));
  }

  ps:any;
  
  @Input("menus")
  menus:Menu[];

  

  back(){
    window.history.back();
  }

  updatePS(): void  {
    if (window.matchMedia(`(min-width: 960px)`).matches && !this.isMac()) {
        this.ps.update();
    }
  }
  isMac(): boolean {
    let bool = false;
    if (navigator.platform.toUpperCase().indexOf('MAC') >= 0 || navigator.platform.toUpperCase().indexOf('IPAD') >= 0) {
        bool = true;
    }
    return bool;
  }
}
