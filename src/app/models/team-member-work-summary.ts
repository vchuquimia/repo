export class TeamMemberWorkSummary {
  TeamMember: string;
  ItemsCount: number;
   constructor(name: string, itemsCount:number)
    { 
      this.TeamMember = name;
      this.ItemsCount = itemsCount;
    }
}