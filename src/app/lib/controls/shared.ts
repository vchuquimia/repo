import { PrimeTemplate } from './shared/prime-template';
import { Column } from './shared/column';
import {NgModule,EventEmitter,Directive,ViewContainerRef,Input,Output,ContentChildren,ContentChild,TemplateRef,OnInit,AfterContentInit,QueryList} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Component} from '@angular/core';

@Component({
    selector: 'header',
    template: '<ng-content></ng-content>'
})
export class Header {}

@Component({
    selector: 'footer',
    template: '<ng-content></ng-content>'
})
export class Footer {}



@Directive({
    selector: '[pTemplateWrapper]'
})
export class TemplateWrapper implements OnInit {
    
    @Input() item: any;
    
    @Input('pTemplateWrapper') templateRef: TemplateRef<any>;
    
    constructor(protected viewContainer: ViewContainerRef) {}
    
    ngOnInit() {
        let view = this.viewContainer.createEmbeddedView(this.templateRef, {
            '\$implicit': this.item
        });
    }
}


@Component({
    selector: 'p-columnBodyTemplateLoader',
    template: ``
})
export class ColumnBodyTemplateLoader {
        
    @Input() column: any;
        
    @Input() rowData: any;
    
    @Input() rowIndex: number;
    
    constructor(protected viewContainer: ViewContainerRef) {}
    
    ngOnInit() {
        let view = this.viewContainer.createEmbeddedView(this.column.bodyTemplate, {
            '\$implicit': this.column,
            'rowData': this.rowData,
            'rowIndex': this.rowIndex
        });
    }
}

@Component({
    selector: 'p-columnHeaderTemplateLoader',
    template: ``
})
export class ColumnHeaderTemplateLoader {
        
    @Input() column: any;
            
    constructor(protected viewContainer: ViewContainerRef) {}
    
    ngOnInit() {
        let view = this.viewContainer.createEmbeddedView(this.column.headerTemplate, {
            '\$implicit': this.column
        });
    }
}

@Component({
    selector: 'p-columnFooterTemplateLoader',
    template: ``
})
export class ColumnFooterTemplateLoader {
        
    @Input() column: any;
            
    constructor(protected viewContainer: ViewContainerRef) {}
    
    ngOnInit() {
        let view = this.viewContainer.createEmbeddedView(this.column.footerTemplate, {
            '\$implicit': this.column
        });
    }
}

@Component({
    selector: 'p-templateLoader',
    template: ``
})
export class TemplateLoader {
        
    @Input() template: TemplateRef<any>;
            
    constructor(protected viewContainer: ViewContainerRef) {}
    
    ngOnInit() {
        if(this.template) {
            this.viewContainer.createEmbeddedView(this.template, {});
        }
    }
}

@Component({
  selector: 'p-rowExpansionLoader',
  template: ``
})
export class RowExpansionLoader {

  @Input() template: TemplateRef < any > ;

  @Input() rowData: any;

  constructor(protected viewContainer: ViewContainerRef) {}

  ngOnInit() {
    let view = this.viewContainer.createEmbeddedView(this.template, {
      '\$implicit': this.rowData
    });
  }
}

@NgModule({
    imports: [CommonModule],
    exports: [Header,Footer,Column,TemplateWrapper,ColumnHeaderTemplateLoader,ColumnBodyTemplateLoader,ColumnFooterTemplateLoader,PrimeTemplate,TemplateLoader, RowExpansionLoader],
    declarations: [Header,Footer,Column,TemplateWrapper,ColumnHeaderTemplateLoader,ColumnBodyTemplateLoader,ColumnFooterTemplateLoader,PrimeTemplate,TemplateLoader, RowExpansionLoader]
})
export class SharedModule { }