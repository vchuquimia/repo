import { Component, Input } from '@angular/core';
@Component({
    selector: 'child',
    template: '<div><h1>Child</h1></div>'
})
export class Child {
    @Input() header: string;
}