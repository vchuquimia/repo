import {
  Pipe
} from '@angular/core';
/*
 * camelCaseToHuman = Camel Case To Human
 
 * Usage:
 *   value | camelCaseToHuman
 * Example:
 *   {{ camelCaseToHuman |  camelCaseToHuman}}
 
*/
@Pipe({
  name: 'userAcronym'
})
export class UserAcronymPipe {
  transform(value: string, args: string[]): any {
    if (typeof value !== "string") {
      return value;
    }

    let names = value.split(' ');
    let result = '';
    let index = 0;

    names.forEach(element => {
      var a = element.substr(0, 1)
      if (names.length > 3 && index % 2 == 0) {
        result = result + a;
      }

      if (names.length <= 3 ) {
        result = result + a;
      }

      index++;
    });

    return result;
  }
}
