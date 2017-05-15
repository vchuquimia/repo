import { VersionItem } from '../models/version-item';
export class RejectedItem
{
    public Id: number;
    public VersionItem: VersionItem;
    public Description: string;
    public RejectedOn: Date;
    public AssignedTo: string;
    public Cause: string;
    public Solution: string;

    constructor(item: any)
    {
        this.Id = item.Id;
        this.VersionItem = item.VersionItem;
        this.Description = item.Description;
        this.RejectedOn = item.RejecterOn;
        this.AssignedTo = item.AssignedTo;
        this.Cause = item.Cause;
        this.Description = item.Description;
    }
}