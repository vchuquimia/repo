import {
    Component,
    AfterViewChecked,
    Input
} from '@angular/core';
import {
    SpreadsheetModel
} from './spread-sheet.model';
import {
    KeyMap
} from './key-map';
import {
    HeaderRowService
} from './header-row.service';

@Component({
    moduleId: module.id,
    selector: 'spreadsheet',
    templateUrl: './spread-sheet.component.html',
    styles: [`
    .spreadsheet td{
    border: 1px solid gray;
}

.spreadsheet input{
    border:0;
}

.spreadsheet .columnHeader{
    background-color: #eeeeee;
    text-transform: uppercase;
    text-align: center;
}
    `]

})

export class SpreadsheetComponent implements AfterViewChecked {

    model: SpreadsheetModel;
    @Input() rows: Number;
    @Input() columns: Number;
    header = [];
    visibleRows = [];

    constructor() {
        this.model = new SpreadsheetModel(10, 4);
        this.header = HeaderRowService.createHeader(this.model.rows[0].columns.length);
        this.visibleRows = this.getVisibleRows();
    }

    getHeader() {
        return HeaderRowService.createHeader(this.model.rows[0].columns.length);
    }

    navigate($event) {
        this.model.navigate($event.keyCode);
        this.visibleRows = this.getVisibleRows();
    }

    ngAfterViewChecked() {
        //let cell = document.getElementById(this.model.current.rowIndex + '-' + this.model.current.columnIndex);
        //cell.focus();
    }

    getVisibleRows() {
        return this.model.rows.filter((row) => row.rowIndex >= this.model.start && row.rowIndex < this.model.end);
    }

    getActive(col) {
        if (col === this.model.current) {
            return 'active-cell';
        }
    }
}
