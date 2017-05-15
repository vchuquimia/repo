export class PendingList
{
    public Id: number;
    public FileName: string;
    public ReceivedOn: Date;
    public CreatedOn: Date;
    public CreatedBy: string;

    constructor(pl: any)
    {
        this.Id = pl.Id;
        this.FileName = pl.FileName;
        this.ReceivedOn = pl.ReceivedOn;
        this.CreatedOn = pl.CreatedOn;
        this.CreatedBy = pl.CreatedBy;
    }

}