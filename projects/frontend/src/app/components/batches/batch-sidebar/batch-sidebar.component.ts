import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-batch-sidebar',
  templateUrl: './batch-sidebar.component.html',
  styleUrls: ['./batch-sidebar.component.css']
})
export class BatchSidebarComponent implements OnInit {

  batchId:string;
  constructor(private router:Router, private route:ActivatedRoute) {
    this.route.params.subscribe (params=>{
      this.batchId = params["id"];
    });
   }

  ngOnInit(): void {
  }

  navigate(routeLink, sidebarPath) {
    console.log(routeLink, sidebarPath);
    this.router.navigate([{ outlets: { primary: routeLink, sidebar: sidebarPath } }]);
  }

}
