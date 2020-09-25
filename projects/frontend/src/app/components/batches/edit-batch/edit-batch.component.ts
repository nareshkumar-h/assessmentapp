import { Component, OnInit, Optional, Inject } from '@angular/core';
import { BatchService } from '../batch.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-batch',
  templateUrl: './edit-batch.component.html',
  styleUrls: ['./edit-batch.component.css']
})
export class EditBatchComponent implements OnInit {

  
  batchId:string;
  batch:any;
  oldBatch:any;

  constructor(private batchService:BatchService, private toastr:ToastrService, private router:Router, private route:ActivatedRoute,
    private dialog:MatDialog, @Optional() @Inject(MAT_DIALOG_DATA) public data: any) { 

      
    this.batch = JSON.parse(JSON.stringify(data.batch));
    this.batchId = this.batch.code;
    
    this.oldBatch = data.batch;
    

    // this.route.parent.params.subscribe ( params=>{
    //   this.batchId = params["id"];
    //   this.breadcrumbItems.push({name:this.batchId});
    // });

  }

  ngOnInit(): void {
    
  }


  save(batch){    
    this.batchService.update(batch.id, batch).subscribe( res=>{
      //this.router.navigate(["batches"]);
      this.toastr.success("Successfully Updated");
      this.dialog.closeAll();
    });
  }

  delete(batchId){    
    let cfm=confirm("Do you want to delete the batch ?");
    if (cfm){
     this.batchService.delete(batchId).subscribe( res=>{
       this.toastr.success("Successfully Batch Deleted");
       this.dialog.closeAll();
        this.router.navigate(["batches"]);
      });
    }
  }

  cancel(){
    //this.router.navigate(["batches/"+this.batchId]);
    this.data.batch = this.oldBatch;
    this.dialog.closeAll();
  }


}
