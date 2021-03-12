import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'status',
})
export class StatusPipe implements PipeTransform {
  transform(items: any[], status: string): any[] {
    //console.log(items, status);
    if (status == null || status == 'ALL') return items;
    if (status == 'P') {
      return items.filter((i) => !i.status || i.status == status);
    } else if (status == 'C') {
      return items.filter((i) => i.status == status);
    } else {
      return items;
    }
  }
}
