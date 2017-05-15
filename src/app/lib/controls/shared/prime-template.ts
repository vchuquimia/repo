import { Directive, Input, TemplateRef } from '@angular/core';
@Directive({
    selector: '[pTemplate]',
    host: {
    }
})
export class PrimeTemplate {
    
    @Input() type: string;
    
    constructor(protected template: TemplateRef<any>) {}
}