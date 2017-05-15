export class WorkItem {
    Id: number;
    Title: string;
    Type: string;
    DeployType: string;
    Iteration: string;
    AssignedTo: string;
    State: string;
    IssueTrackId: string;
    Effort: number;
    BacklogPriority: number;
    ChangedDate: Date;
    CreatedDate: Date;
    Blocked: boolean;
    TaskPercentWorkComplete: number;
    Activity: string;
    Description: string;
    Solution: string;


    constructor(param: any) {
        this.Id = param.Id;
        this.Title = param.Title;
    }
}