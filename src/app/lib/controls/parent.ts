import { forEach } from '@angular/router/src/utils/collection';
import { Child } from './child';
import { Component, ContentChildren, forwardRef, QueryList } from '@angular/core';
@Component({
    selector: 'parent',
    template: `<div><h1>Parent</h1>
                    <ng-content></ng-content> 
                    <div *ngFor="let col of columns" > {{col.Header}} </div>
                </div>`
})
export class Parent {
    @ContentChildren(forwardRef(() => Child)) children: QueryList<Child>; // <!- HERE
    columns: Array<Child>;

    ngAfterContentInit() {
        this.columns = this.children.toArray();

        console.log(this.children);
        console.log(this.children.length);
    }
}