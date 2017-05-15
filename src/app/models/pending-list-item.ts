export class PendingListItem
{
    public Id: number;
    public IssueTrackId: number;
    public Priority: string;
    public Description: string;
    public ReportedOn: Date;
    public IssueStatus: string;
    public PendingListId: number;

    constructor(pli: any)
    {
        this.Id = pli.Id;
        this.IssueTrackId = pli.IssueTrackId;
        this.Priority = pli.Priority;
        this.Description = pli.Description;
        this.ReportedOn = pli.ReportedOn;
        this.IssueStatus = pli.IssueStatus;
        this.PendingListId = pli.PendingListId;
    }

}