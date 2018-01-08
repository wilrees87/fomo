//custom pipe to sort by distance for displaying events - help from https://stackoverflow.com/questions/46306725/angular2-numeric-orderby-pipe

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'distance',
  pure: false
})
export class DistancePipe implements PipeTransform {
  transform(array: any[], field: string): any[] {
    array.sort((a: any, b: any) => {
      if (a[field] === undefined && b[field] === undefined) { return 0; }
      if (a[field] === undefined && b[field] !== undefined) { return -1; }
      if (a[field] !== undefined && b[field] === undefined) { return 1; }
      if (a[field] === b[field]) { return 0; }
      if (a[field] > b[field]) { return 1; }
      if (b[field] > a[field]) { return -1; }
    });
    return array;
  }
}
