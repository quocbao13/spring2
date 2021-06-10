import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'n'
})
export class NPipe implements PipeTransform {

  transform(value: string): string[] {
    return value.split(' ');
  }

}
