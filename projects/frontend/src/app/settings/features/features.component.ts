import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { SiteService } from 'projects/users/src/lib/site.service';


@Component({
  selector: 'app-features',
  templateUrl: './features.component.html',
  styleUrls: ['./features.component.css']
})
export class FeaturesComponent implements OnInit {

  constructor(private siteService:SiteService) { }

  ngOnInit(): void {
    this.loadFeatures();
  }

  displayedColumns: string[] = ['featureName','enabled'];

  dataSource:any;

  loadFeatures(){
    this.siteService.getFeatures().subscribe(res=>{
      let features:any = res;
      
      let activeFeatures = features.filter(f=>f.active);

      this.dataSource = new MatTableDataSource<any>(activeFeatures);
    });
  }

  update(){

  }
  cancel(){
    window.history.back();
  }

}
