import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-rating-icon',
  templateUrl: './rating-icon.component.html',
  styleUrls: ['./rating-icon.component.css']
})
export class RatingIconComponent implements OnInit {

  constructor() { 
    //console.log(this.rating);
  }

  ngOnInit(): void {
  }

  @Input()
  rating:number;

  

  getRatingColor(){
    
    let color ="";
    switch(this.rating){
      case 1: color = "red"; break;
      case 2: color = "red"; break;
      case 3: color = "orange"; break;
      case 4: color = "green"; break;
      case 5: color = "green"; break;
    }
    return color;
  }

  getRatingSmiley(){
    
    let smiley ="";
    switch(this.rating){
      case 1: smiley = "far fa-frown"; break;
      case 2: smiley = "far fa-frown"; break;      
      case 3: smiley = "far fa-smile"; break;
      case 4: smiley = "far fa-smile"; break;
      case 5: smiley = "fas fa-star"; break;
    }
    return smiley;
  }


}
