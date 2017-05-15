import {
  WorkItemModalService
} from '../../services/work-item-modal.service';
import {
  TeamMember
} from '../../models/team-member';
import {
  Observable
} from 'rxjs/Rx';
import {
  TeamMemberService
} from '../../services/core/team-member.service';
import {
  ActivatedRoute
} from '@angular/router';
import {
  Version
} from '../../models/version';
import {
  VersionService
} from '../../services/version.service';
import {
  VersionPlanService
} from '../../services/version-plan.service';
import {
  List
} from '../../lib/linq';
import {
  WorkItem
} from '../../models/work-item';
import {
  WorkItemService
} from '../../services/work-item.service';
import {
  Component,
  OnInit
} from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'version-plan',
  templateUrl: 'version-plan.component.html'
})
export class VersionPlanComponent implements OnInit {
  private versionTotalHours: number;
  private teamWorkingHours: number;
  private dailyHours: number = 7.5;
  private estimatedWorkingDays: number;
  private estimatedEndDate = new Date();
  private estimatedDeployDate = new Date();
  public items: Array < WorkItem > ;
  public version: Version;
  public newFeatures: number;
  public bugFixes: number;
  public hotFixes: number;

  constructor(public vService: VersionService, public vpService: VersionPlanService,
    private routerActive: ActivatedRoute, private teamService: TeamMemberService, public wimService: WorkItemModalService) {}

  ngOnInit() {
    this.routerActive.params.subscribe(params => {
      let vId = params['VersionId'] as number;
      this.vService.GetVersionById(vId)
        .subscribe(r => this.version = r)
    });


  }


  public GetTFSItems() {
    let versionPlanItem$ = this.vpService.GetVersionPlanItems(this.version.ProjectName, this.version.Iteration);
    let member$ = this.teamService.GetAllTeamMembers();
    Observable.combineLatest(versionPlanItem$, member$).subscribe((data: any[]): void => {
      this.items = data[0];
      let temp = new List(this.items);
      this.versionTotalHours = temp.Sum(i => i.Effort * 4); // 1 cicle = 4 hrs, considering analysis,development, build, test, deploy
      this.teamWorkingHours = this.versionTotalHours / new List < TeamMember > (data[1])
        .Where(i => i.Active && i.WorkingRegion === 'NAD').Count();
      this.estimatedWorkingDays = Number((this.teamWorkingHours / this.dailyHours).toFixed(0));
      this.estimatedEndDate = this.addWeekdays(this.version.StartedOn, this.estimatedWorkingDays,[]);//[new Date(2017, 2, 15 ) , new Date(2017, 2, 16 )]);
      this.estimatedDeployDate = this.addWeekdays(this.version.StartedOn, this.estimatedWorkingDays + 2, []);
      this.newFeatures = temp.Where(i => this.isPBI(i)).Count();
      this.bugFixes = temp.Where(i => this.isBug(i)).Count();
      this.hotFixes = temp.Where(i => this.isHotFix(i)).Count();
    });
  }

  public create() {
    this.vpService.CreateVersionPlan(this.version.Id, this.items.length).subscribe(r => console.log(r));
  }

  addWeekdays(d, days, holidays: Array<Date>) {
    var date = new Date(d);
    date.setDate(date.getDate());
    var counter = 0;
    if (days > 0) {
      while (counter < days) {
        date.setDate(date.getDate() + 1); // Add a day to get the date tomorrow
        var check = date.getDay(); // turns the date into a number (0 to 6)
        if (check == 0 || check == 6) {
          // Do nothing it's the weekend (0=Sun & 6=Sat)
        } else if(holidays.map(Number).indexOf(+date) === -1){
          counter++; // It's a weekday so increase the counter
        } else{
            // do nothing holidays
        }
      }
    }
    return date;
  }



  public isPBI(wi: WorkItem): boolean {
    return wi.Type === 'Product Backlog Item';
  }

  public isBug(wi: WorkItem): boolean {
    return wi.DeployType === 'Version Update';
  }

  public isHotFix(wi: WorkItem): boolean {
    return wi.DeployType === 'Hot Fix';
  }

  public isVersionUpdate(wi: WorkItem): boolean {
    if (wi.DeployType === 'Version Update') {
      return true;
    } else {
      if (wi.DeployType === '') {
        return true;

      } else return false;
    }
  }
}
