import { Component, OnInit } from '@angular/core';
import { BatchService } from '../batch.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-batch',
  templateUrl: './add-batch.component.html',
  styleUrls: ['./add-batch.component.css']
})
export class AddBatchComponent implements OnInit {

  breadcrumbItems:any  = [ {"icon":"home", "name":"Home","link":"/"},
  {"name":"Batches", "link": "batches"}];

  
  today:string = new Date().toJSON().substr(0,10);

  constructor(private batchService:BatchService, private toastr:ToastrService, private router: Router, public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  batch = { code : null, name: null, startDate: this.today, endDate:  this.today}

  save(batch){
    this.batchService.save(this.batch).subscribe( res=>{
      console.log(res);
      this.toastr.success("Successfully Batch Created");
      this.dialog.closeAll();      
      this.router.navigate(["/batches/"+ this.batch.code]);
    });
  }

  
  cancel(){
    this.dialog.closeAll();
  }

}
