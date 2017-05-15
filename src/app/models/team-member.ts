export class TeamMember
{
    public Id: number;
    public TeamMemberName: string;
    public TeamMemberEmail: string;
    public ProjectName: string;
    public Active: boolean;
    public WorkingRegion: string;

    constructor(team: any)
    {
        this.Id = team.Id;
        this.TeamMemberName = team.TeamMemberName;
        this.TeamMemberEmail = team.TeamMemberEmail;
        this.ProjectName = team.ProjectName;
        this.Active = team.Active;
        this.WorkingRegion = team.WorkingRegion;
        
    }
}