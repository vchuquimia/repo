export class Version
{
    public Id: number;
    public VersionName: string;
    public Iteration: string;
    public PlannedOn: Date;
    public ScheduledTo: Date;
    public StartedOn: Date;
    public FinishedOn: Date;
    public DeployedOn: Date;
    public ProjectName: string;

    constructor(version: any)
    {
        this.Id = version.Id;
        this.VersionName = version.VersionName;
        this.Iteration = version.Iteration;
        this.PlannedOn = version.PlannedOn;
        this.ScheduledTo = version.ScheduledTo;
        this.StartedOn = version.StartedOn;
        this.FinishedOn = version.FinishedOn;
        this.DeployedOn = version.DeployedOn;
        this.ProjectName = version.ProjectName;
    }
}