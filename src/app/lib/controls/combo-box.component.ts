import {
  ISearchService
} from './ISearchService';
import {
  Component,
  Input,
  Output,
  EventEmitter,
  TemplateRef,
  ContentChild
} from '@angular/core';
import {
  Http
} from '@angular/http';
import {
  NgZone,
  OnInit
} from '@angular/core';
import {
  Observable
} from 'rxjs/Rx';
@Component({
  selector: 'combo-box',
  template: ` <div ngbDropdown class="d-inline-block" style="width:100%;"> <button ngbDropdownToggle class="btn btn-default" type="button" id="dropdownMenu2" style="width:100%;"> {{errorMessage}} <span *ngIf="SelectedItem != null" > <template  [ngTemplateOutlet]="template" [ngOutletContext]="{item: SelectedItem}" ></template> </span> </button> <div class="dropdown-menu" aria-labelledby="dropdownMenu2"> <a href="javascript:void(0);" *ngFor="let suggestion of suggestions" class="dropdown-item" (click)="SelectResult(suggestion)">  <template [ngTemplateOutlet]="template" [ngOutletContext]="{item: suggestion}"></template>  </a> </div> </div> `,
  styles: [],
  providers: []
}) export class ComboBox implements OnInit {
  @ContentChild(TemplateRef) template: TemplateRef < any > ;
  @Input() searchService: ISearchService < any, any > ;
  @Input() itemsSource: Array < any > ;
  @Input() lazyLoad: boolean = false;
  @Output() OnSelectionChanged = new EventEmitter < any > ();
  public SelectedItem: any = null;
  private searchParam: any;
  public suggestions: Array < any > = new Array < any > ();
  public SelectResult(suggestion: any) {
    this.SelectedItem = suggestion;
    console.log('selected', suggestion);
    this.OnSelectionChanged.emit(suggestion);
  }
  constructor(private http: Http) {}
  public ngOnInit() {
    if (this.searchService != null && !this.lazyLoad) {
      this.populateSuggestions();
      this.LoadItems();
    }
  }
  public LoadItems() {
    this.SelectedItem = null;
    this.searchService.search('', this.searchParam).subscribe(r => this.suggestions = r);
  }
  public updateSearchParameter(param: any) {
    this.searchParam = param;
  } /** Fills the suggestions itemsSource with items matching the input pattern.*/
  public populateSuggestions() {
    console.log('populate solution called');
    this.suggestions = this.itemsSource;
  }
}
