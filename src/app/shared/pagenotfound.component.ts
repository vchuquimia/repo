import { Component, OnInit } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'not-found',
    template: '<b>Not found component. </b>'
})
export class NotFoundComponent implements OnInit {
    constructor() { }

    ngOnInit() { }
}