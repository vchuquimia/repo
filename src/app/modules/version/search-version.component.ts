import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Version } from '../../models/version';
import { VersionService } from '../../services/version.service';
import { CommonModule } from '@angular/common';

@Component({
    moduleId: module.id,
    selector: 'search-version',
    templateUrl: 'search-version.component.html',
    styles: ['.content-right { float: right; margin: 5px 15px;}'],
})
export class SearchVersionComponent implements OnInit {
    
    public version_list: Array<Version>;
    public selectedVersion: Version;

    constructor(
        private vService: VersionService, 
        private router: Router,
    ) { 
        this.selectedVersion = new Version({});
    }

    ngOnInit() 
    {
        this.GetVersions();
     }

    public GetVersions(): void
    {
        this.vService.GetAllVersions()
        .subscribe(p => { this.version_list = p as Array<Version>; });
    }

    public DeleteVersion(VersionId: number)
    {
        this.vService.DeleteVersion(VersionId).subscribe(
            p => { this.GetVersions(); }
        );
    }
}