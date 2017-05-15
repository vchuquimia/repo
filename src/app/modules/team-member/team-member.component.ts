import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { TeamMemberService } from '../../services/core/team-member.service';
import { TeamMember } from '../../models/team-member';
import { CommonModule } from '@angular/common';

@Component({
    moduleId: module.id,
    selector: 'team-member',
    templateUrl: 'team-member.component.html'
})
export class TeamMemberComponent implements OnInit {

    public TextSubmitButton: string;
    public version_id: 0;
    public teamMember_item: TeamMember;

    constructor(private service: TeamMemberService, private router: Router, private routerActive: ActivatedRoute ) 
    {
        this.teamMember_item = new TeamMember({});
    }

    ngOnInit() 
    {
        this.routerActive.params.subscribe(params => {
           let vId = params['TeamMemberId'] as number;
           this.GetTeamMember(vId);
        });
    }

    public onSubmit() 
    {
        this.service.SetTeamMember(this.teamMember_item) 
        .subscribe(p =>{ this.router.navigateByUrl("/search-team-member"); });
    }

    public GetTeamMember(teamId: number)
    {
        if(teamId > 0)
        {
            this.service.GetTeamMemberById(teamId).subscribe(p => {
                this.teamMember_item = p as TeamMember;
            });

            this.TextSubmitButton = "Save changes";
        }
        else
        {
            this.teamMember_item = new TeamMember({});
            this.teamMember_item.Active = false;
            this.TextSubmitButton = "Save";
        }
    }

    onActiveChange(event)
    {
        this.teamMember_item.Active = event.currentTarget.checked;
    }


}