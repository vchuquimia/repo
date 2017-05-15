import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

//About pending list service and models
import { PendingListService } from '../../services/pending-list.service';
import { PendingListItemService } from '../../services/pending-list-item.service';
import { PendingList } from '../../models/pending-list';
import { PendingListItem } from '../../models/pending-list-item';

@Component({
    moduleId: module.id,
    selector: 'pending-list',
    templateUrl: 'pending-list.component.html'
})
export class PendingListComponent implements OnInit {

    public pendingList_list: Array<PendingList>;

    constructor(
        private plService: PendingListService, private pliService: PendingListItemService, private router: Router, private routerActive: ActivatedRoute
    ) { }

    ngOnInit() 
    {
        this.GetPendingList_list();
    }

    public GetPendingList_list()
    {
        this.plService.GetPendingLists().subscribe(p => { this.pendingList_list = p as Array<PendingList>; })
    }

    
}