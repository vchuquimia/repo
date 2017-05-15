import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { TeamMember } from '../../models/team-member';
import { TeamMemberService } from '../../services/core/team-member.service';
import { CommonModule } from '@angular/common';
@Component({
    moduleId: module.id,
    selector: 'search-team-member',
    templateUrl: 'search-team-member.component.html',
    styles: ['.content-right { float: right; margin: 5px 15px;}'],
})
export class SearchTeamMemberComponent implements OnInit {
    
    public teamMember_list: Array<TeamMember>;
    public selected_teamMember: TeamMember;
    constructor(
        private tmService: TeamMemberService, 
        private router: Router,
    ) { 
        this.selected_teamMember = new TeamMember({});
    }

    ngOnInit() 
    {
        this.GetTeamMembers();
     }

    public GetTeamMembers(): void
    {
        this.tmService.GetAllTeamMembers()
        .subscribe(p => { this.teamMember_list = p as Array<TeamMember>; });
    }

    public DeleteTeamMember(VersionId: number)
    {
        this.tmService.DeleteTeamMember(VersionId).subscribe(
            p => { this.GetTeamMembers(); }
        );
    }
}