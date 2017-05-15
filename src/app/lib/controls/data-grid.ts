import { PrimeTemplate } from './shared/prime-template';
import {
  ISearchService
} from './ISearchService';
import {
  List
} from '../linq';
import {
  Title
} from '@angular/platform-browser';
import {
  Subscription
} from 'rxjs/Subscription';
import {
  Column
} from './shared/column';
import {
  AfterContentInit,
  animate,
  ChangeDetectorRef,
  Component,
  ContentChild,
  ContentChildren,
  DoCheck,
  forwardRef,
  Input,
  IterableDiffers,
  QueryList,
  state,
  style,
  TemplateRef,
  transition,
  trigger
} from '@angular/core';
import {
  FilterMetadata
} from "./shared/filter-metadata";

@Component({
  moduleId: module.id,
  selector: 'data-grid',
  templateUrl: 'data-grid.html',
  animations: [
    trigger('overlayState', [
      state('hidden', style({
        opacity: 0
      })),
      state('visible', style({
        opacity: 1
      })),
      transition('visible => hidden', animate('400ms ease-in')),
      transition('hidden => visible', animate('400ms ease-out'))
    ]),
    trigger('focus', [
      state('inactive', style({
        transform: 'scale(1)'

      })),
      state('active', style({
        transform: 'scale(1.1)',
      })),
      transition('inactive => active', animate('100ms ease-in')),
      transition('active => inactive', animate('100ms ease-out'))
    ]),
  ]
})

//*ngIf="col.bodyTemplate" 
export class DataGrid implements AfterContentInit, DoCheck {
  filteredItemsSource: any[];
  @Input() itemsSource: any[];
  coreItemsSource: any[];
  @Input() title: string;
  //@ContentChild(TemplateRef) rowExpansionTemplate: TemplateRef < any > ; 
  rowExpansionTemplate: TemplateRef < any > ; //manually initialized because of other templates
  @ContentChildren(PrimeTemplate) templates: QueryList<any>;

  @ContentChildren(Column) cols: QueryList < Column > ;
  @Input() searchService: ISearchService < any,
  any > ;
  @Input() searchParam: any;
  inSelectionMode: boolean;
  @Input() inExpandMode: boolean = false;
  @Input() showToolBar: boolean = true;
  inFilterMode: boolean;
  columnsSubscription: Subscription;
  public selectedRows = new List < any > ();
  allItemsSelected: boolean = false;
  differ: any;

  protected filters: {
    [s: string]: FilterMetadata;
  } = {};

  protected columns: Column[];
  constructor(private changeDetector: ChangeDetectorRef, differs: IterableDiffers, ) {
    this.differ = differs.find([]).create(null);
  }

  ngAfterContentInit() {
            this.templates.forEach((item) => {
            switch(item.type) {
                case 'expander':
                    this.rowExpansionTemplate = item.template;
                break;
                
                
                default:
                    this.rowExpansionTemplate = item.template;
                break;
            }
        });

    this.initColumns();
    this.columnsSubscription = this.cols.changes.subscribe(_ => {
      this.initColumns();
      this.changeDetector.markForCheck();
    });

    this.coreItemsSource = this.itemsSource;
  }

  ngDoCheck() {
    let changes = this.differ.diff(this.itemsSource);
    if (changes) {

      this.updateDataToRender(this.filteredItemsSource || this.itemsSource);
    }
  }


  initColumns(): void {
    this.columns = this.cols.toArray();
  }

  getColumnsCount(): number {
    let colCount = this.columns.length + 1;
    if (this.inSelectionMode) {
      colCount++;
    }

    if (this.inExpandMode) {
      colCount++;
    }

    return colCount;
  }

  resolveFieldData(data: any, field: string): any {
    if (data && field) {
      if (field.indexOf('.') == -1) {
        return data[field];
      } else {
        let fields: string[] = field.split('.');
        let value = data;
        for (var i = 0, len = fields.length; i < len; ++i) {
          value = value[fields[i]];
        }
        return value;
      }
    } else {
      return null;
    }
  }

  public reset() {
    this.filteredItemsSource = null;
    this.filters = {};

    this.updateDataToRender(this.itemsSource);
  }

  //this can be a setter
  public toggleSelectionMode() {
    this.inSelectionMode = !this.inSelectionMode;
    if (!this.inSelectionMode) {
      this.selectedRows = new List < any > ();
    }
  }

  public toggleFilterMode() {
    this.inFilterMode = !this.inFilterMode;
    if (!this.inFilterMode) {
      this.reset();
    }
  }

  public setSelectedRow(index) {
    if (!this.inSelectionMode) {
      return;
    }
    if (this.selectedRows.Any(i => i === index)) {
      this.allItemsSelected = false;
      this.selectedRows.Remove(index);
    } else {
      this.selectedRows.Add(index);
    }
  }

  public isSelecteddRow(item): boolean {
    return this.selectedRows.Any(i => i === item);
  }

  public selectAll() {
    this.selectedRows = new List < any > ();
    if (!this.allItemsSelected) {
      this.selectedRows.AddRange(this.itemsSource);
    }

    this.allItemsSelected = !this.allItemsSelected;
  }

  public search() {
    this.searchService.search("filter", this.searchParam).subscribe(result => {
      this.itemsSource = result;
    });
  }


  onFilterKeyup(value, field, matchMode) {
    this.filters[field] = {
      value: value,
      matchMode: matchMode
    };
    this.filter();
  }

  filter() {
    //this.first = 0;

    this.filteredItemsSource = [];

    for (let i = 0; i < this.itemsSource.length; i++) {
      let localMatch = true;
      let globalMatch = false;

      for (let j = 0; j < this.columns.length; j++) {
        let col = this.columns[j],
          filterMeta = this.filters[col.field];

        //local
        if (filterMeta) {
          let filterValue = filterMeta.value,
            filterField = col.field,
            filterMatchMode = filterMeta.matchMode || 'startsWith',
            dataFieldValue = this.resolveFieldData(this.itemsSource[i], filterField);

          let filterConstraint = this.filterConstraints[filterMatchMode];

          if (!filterConstraint(dataFieldValue, filterValue)) {
            localMatch = false;
          }

          if (!localMatch) {
            break;
          }
        }


      }

      let matches = localMatch;
      //   if (this.globalFilter) {
      //     matches = localMatch && globalMatch;
      //   }

      if (matches) {
        this.filteredItemsSource.push(this.itemsSource[i]);
      }
    }

    if (this.filteredItemsSource.length === this.itemsSource.length) {
      this.filteredItemsSource = null;
    }

    this.updateDataToRender(this.filteredItemsSource || this.itemsSource);


    // this.onFilter.emit({
    //   filters: this.filters
    // });
  }

  /*
  Expand Mode 
  Begin
   */
  @Input() expandedRows = new List < any >() ;

  public expandAll() {
    this.expandedRows.AddRange(this.itemsSource);
  }

  collapseAll() {
    this.expandedRows = new List < any > ();
  }

  toggleRow(row: any) {
    if (!this.expandedRows) {
      this.expandedRows = new List < any > ();
    }

    let expandedRowIndex = this.findExpandedRowIndex(row);

    if (expandedRowIndex != -1) {
      this.expandedRows.RemoveAt(expandedRowIndex);
      //this.onRowCollapse.emit(row);
    } else {
      this.expandedRows.Add(row);
      //this.onRowExpand.emit(row);
    }
  }

  findExpandedRowIndex(row: any): number {
    let index = -1;
    let expanded = this.expandedRows.ToArray();
    if (this.expandedRows) {
      for (let i = 0; i < expanded.length; i++) {
        if (expanded[i] == row) {
          index = i;
          break;
        }
      }
    }
    return index;
  }

  isRowExpanded(row) {
    //return this.findExpandedRowIndex(row) != -1;
    return this.expandedRows.Any(i => i === row);
  }
  /*
  END Expand Mode
   */

  updateDataToRender(datasource) {
    // if(this.paginator && datasource) {
    //     this.dataToRender = [];
    //     let startIndex = this.lazy ? 0 : this.first;
    //     for(let i = startIndex; i < (startIndex+ this.rows); i++) {
    //         if(i >= datasource.length) {
    //             break;
    //         }

    //         this.dataToRender.push(datasource[i]);
    //     }
    // }
    // else {
    if (this.inSelectionMode) {
      this.selectedRows.ForEach(element => {
        if (!new List(datasource).Any(i => element === i)) {
          this.selectedRows.Remove(element);
        }
      });
    }
    this.coreItemsSource = datasource;
    //}
  }

  filterConstraints = {

    startsWith(value, filter): boolean {
      if (filter === undefined || filter === null || filter.trim() === '') {
        return true;
      }

      if (value === undefined || value === null) {
        return false;
      }

      let filterValue = filter.toLowerCase();
      return value.toString().toLowerCase().slice(0, filterValue.length) === filterValue;
    },

    contains(value, filter): boolean {
      if (filter === undefined || filter === null || filter.trim() === '') {
        return true;
      }

      if (value === undefined || value === null) {
        return false;
      }

      return value.toString().toLowerCase().indexOf(filter.toLowerCase()) !== -1;
    },

    endsWith(value, filter): boolean {
      if (filter === undefined || filter === null || filter.trim() === '') {
        return true;
      }

      if (value === undefined || value === null) {
        return false;
      }

      let filterValue = filter.toLowerCase();
      return value.indexOf(filterValue, value.length - filterValue.length) !== -1;
    }
  }


}
