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
    selector: 'pending-list-item',
    templateUrl: 'pending-list-item.component.html'
})
export class PendingListItemComponent implements OnInit {
    
    public pendingListItem_list: Array<PendingListItem>;
    public plId: number;

    constructor(
        private plService: PendingListService, private pliService: PendingListItemService, private router: Router, private routerActive: ActivatedRoute
    ) { }

    ngOnInit() 
    {
        this.routerActive.params.subscribe(params => {
           let vId = params['PendingListId'] as number;
           if(vId > 0)
           {
               this.ShowPendingListDetails(vId);   
               this.plId = vId;            
           }
        });
     }

    public ShowPendingListDetails(idPl: number)
    {
        this.pliService.GetByPendingListId(idPl).subscribe(p => 
        { 
            this.pendingListItem_list = p as Array<PendingListItem>; 
        });
    }
}