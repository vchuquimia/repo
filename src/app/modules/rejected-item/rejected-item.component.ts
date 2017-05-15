import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { RejectedItemService } from '../../services/rejected-item.service';
import { VersionItemService } from '../../services/version-item.service';
import { RejectedItem } from '../../models/rejected-item';
import { VersionItem } from '../../models/version-item';
import { CommonModule } from '@angular/common';

@Component({
    moduleId: module.id,
    selector: 'rejected-item',
    templateUrl: 'rejected-item.component.html'
})
export class RejectedItemComponent implements OnInit {

    public TextSubmitButton: string;
    public versionItem_item: VersionItem;
    public version_id: number;
    public rejectedItem_item: RejectedItem;
    public HasRejectedItem: Boolean;

    public rejected_on: string;

    constructor(private service: RejectedItemService, private viService: VersionItemService, private router: Router, private routerActive: ActivatedRoute ) 
    {
        this.rejectedItem_item = new RejectedItem({});
        this.HasRejectedItem = false;
    }

    ngOnInit() 
    { 
        this.routerActive.params.subscribe(params => {
           let vId = params['VersionItemId'] as number;

           this.viService.GetByVersionItem(vId).subscribe(p => {
               this.versionItem_item = p;
               this.version_id = this.versionItem_item.Version.Id;
            });

           this.GetRejectedItem(vId);
        });
    }

    public onSubmit() 
    {
        this.rejectedItem_item.RejectedOn = this.ParseStringToDate(this.rejected_on);
        this.rejectedItem_item.VersionItem = this.versionItem_item;

        this.service.SetRejectedItem(this.rejectedItem_item) 
        .subscribe(p =>{ this.router.navigateByUrl("/versionitem/"+this.version_id); });
    }

    public GetRejectedItem(viId: number)
    {
        this.service.GetByVersionItemId(viId).subscribe(p => {
            if(p == null || p == undefined)
            {
                this.rejectedItem_item = new RejectedItem({});
                this.TextSubmitButton = "Save";
                this.HasRejectedItem = false;
            }
            else
            {
                this.rejectedItem_item = p as RejectedItem;
                this.rejected_on = this.SubStringDate(this.rejectedItem_item.RejectedOn);
                this.TextSubmitButton = "Save changes";
                this.HasRejectedItem = true;
            }
        });
    }

    public SubStringDate(value: Date): string
    {
        if(value == undefined)
        {
            return "";
        }
        else
        {
            return value.toString().substring(0, 10);
        }
    }

    public ParseStringToDate(stringDate: string): Date
    {
        var datepartials = stringDate.split("-");

        var datemodel = new Date(parseInt(datepartials[0]), parseInt(datepartials[1]) - 1, parseInt(datepartials[2]));

        return datemodel;
    }
}