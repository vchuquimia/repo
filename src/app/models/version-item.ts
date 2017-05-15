import { Version } from './version';
export class VersionItem
{
    public Id: number;
    public Version: Version;
    public IssueTrackId: string;
    public TfsId: number;
    public WorkItemType: number;
    public Planned: boolean;
    public Delivered: boolean;
    public DeployType: string;

    constructor(pli: any)
    {
        this.Id = pli.Id;
        this.IssueTrackId = pli.IssueTrackId;
        // this.Priority = pli.Priority;
        // this.Description = pli.Description;
        // this.ReportedOn = pli.ReportedOn;
        // this.IssueStatus = pli.IssueStatus;
        // this.PendingListId = pli.PendingListId;
    }

}