import { TeamMemberWaringType } from './team-member-waring-type';
export class TeamMemberWarning{
    TeamMemberName: string;
    Type: TeamMemberWaringType;
    constructor(name: string, type: TeamMemberWaringType)
    {
        this.TeamMemberName = name;
        this.Type = type;
    }
}