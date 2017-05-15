import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { VersionService } from '../../services/version.service';
import { Version } from '../../models/version';
import { CommonModule } from '@angular/common';

@Component({
    moduleId: module.id,
    selector: 'version',
    templateUrl: 'version.component.html'
})
export class VersionComponent implements OnInit {

    public TextSubmitButton: string;
    public version_id: 0;
    public version_item: Version;

    public planned_on: string;
    public scheduled_on: string;
    public started_on: string;
    public finished_on: string;
    public deployed_on: string;

    constructor(private vService: VersionService, private router: Router, private routerActive: ActivatedRoute ) 
    {
        this.version_item = new Version({});
     }

    ngOnInit() 
    {
        this.routerActive.params.subscribe(params => {
           let vId = params['VersionId'] as number;
           this.GetVersion(vId);
        });
    }

    public onSubmit() 
    {
        this.version_item.PlannedOn = this.planned_on != "" ? this.ParseStringToDate(this.planned_on) : null;
        this.version_item.ScheduledTo = this.scheduled_on != "" ? this.ParseStringToDate(this.scheduled_on) : null;
        this.version_item.StartedOn = this.started_on != "" ? this.ParseStringToDate(this.started_on) : null;
        this.version_item.FinishedOn = this.finished_on != "" ? this.ParseStringToDate(this.finished_on) : null;
        this.version_item.DeployedOn = this.deployed_on != "" ? this.ParseStringToDate(this.deployed_on) : null;

        this.vService.SetVersion(this.version_item) 
        .subscribe(p =>{ this.router.navigateByUrl("/search-version"); });
    }

    public GetVersion(versionId: number)
    {
        if(versionId > 0)
        {
            this.vService.GetVersionById(versionId).subscribe(p => {
                this.version_item = p as Version;

                this.planned_on = this.SubStringDate(this.version_item.PlannedOn);
                this.scheduled_on = this.SubStringDate(this.version_item.ScheduledTo);
                this.started_on = this.SubStringDate(this.version_item.StartedOn);
                this.finished_on = this.SubStringDate(this.version_item.FinishedOn);
                this.deployed_on = this.SubStringDate(this.version_item.DeployedOn);

            });

            this.TextSubmitButton = "Save changes";
        }
        else
        {
            this.version_item = new Version({});
            this.TextSubmitButton = "Save";
        }

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