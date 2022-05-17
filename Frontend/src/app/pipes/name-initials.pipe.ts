import { Pipe, PipeTransform } from '@angular/core';
import { start } from 'repl';

@Pipe({
  name: 'username'
})
export class NameInitialsPipe implements PipeTransform {

  transform(value: String): String {
  return value.slice(0,2).toUpperCase()
  }
  

}
