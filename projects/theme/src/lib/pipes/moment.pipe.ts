import { Pipe, PipeTransform } from '@angular/core';
import * as moment_ from 'moment';
const moment = moment_;
@Pipe({
  name: 'moment'
})
export class MomentPipe implements PipeTransform {


  transform(input:string): string {
    //console.log(input);
    if(!input) return null;
    let result = moment(input).fromNow();
    //console.log(result);
    return result;
    
  }
}
