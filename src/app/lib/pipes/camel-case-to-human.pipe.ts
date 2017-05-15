import {Pipe} from '@angular/core';
/*
 * camelCaseToHuman = Camel Case To Human
 
 * Usage:
 *   value | camelCaseToHuman
 * Example:
 *   {{ camelCaseToHuman |  camelCaseToHuman}}
 
*/
@Pipe({name: 'camelCaseToHuman'})
export class camelCaseToHumanPipe {
    transform(value:string, args:string[]) : any {
        if (typeof value !== "string") {
            return value;
        }

        var result = value.replace(/([a-z\d])([A-Z])/g, '$1' + ('_') + '$2');
        result = result.charAt(0).toUpperCase() + result.slice(1);

        return result;
    }
}