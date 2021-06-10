import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'dating'
})
export class DatingPipe implements PipeTransform {

  transform(value: string): string[] {
    const splitBy = ' ';
    return value.split(splitBy);
  }

}
