import { WorkItemModalService } from '../../services/work-item-modal.service';
import { DataGrid } from '../../lib/controls/data-grid';
import { TeamMemberWaringType } from '../../models/team-member-waring-type';
import {
  TeamMemberWarning
} from '../../models/team-member-warnig';
import {
  NgbPopoverConfig
} from '@ng-bootstrap/ng-bootstrap';
import {
  Observable,
  Subscription
} from 'rxjs/Rx';
import {
  TeamMemberService
} from '../../services/core/team-member.service';
import {
  List
} from '../../lib/linq';
import {
  TeamMember
} from '../../models/team-member';
import {
  WorkItem
} from '../../models/work-item';
import {
  DashboardService
} from '../../services/core/dashboard.service';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';

import {
  asEnumerable
} from 'linq-es2015';
import {
  TeamMemberWorkSummary
} from '../../models/team-member-work-summary';



/**
 * This class represents the lazy loaded HomeComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'dashboard',
  templateUrl: 'dashboard.component.html',
})
export class DashboardComponent implements OnInit, OnDestroy {
  constructor(public service: DashboardService, private memberService: TeamMemberService, public wimService: WorkItemModalService) {}
  public items: Array < WorkItem > ;
  public selectedTeamMemberItems: Array < WorkItem > ;
  public workSummary: Array < TeamMemberWorkSummary > ;
  public selectedTeamMember: string;



  public teamMembers: Array < TeamMember > ;
  timerSubscription: Subscription;

  private watchMode: boolean = false;
  private lastUpdate: Date;
  private todoCount: number;
  private inProgressCount: number;

  set WatchMode(value) {
    this.watchMode = value;
    if (this.watchMode) {
      this.InitWatchMode();
    } else {
      this.StopWatchMode();
    }
  }

  get WatchMode(): boolean {
    return this.watchMode;
  }

  ngOnInit() {

  }
  ngOnDestroy(): void {
    if (this.timerSubscription !== undefined) {
      this.timerSubscription.unsubscribe();

    }
  }



  public InitWatchMode(): void {
    var timer = Observable.timer(2000, 60 * 1000);
    this.timerSubscription = timer.subscribe(t => this.LoadItems());
  }

  public StopWatchMode(): void {
    this.timerSubscription.unsubscribe();
  }

  public LoadItems() {
    var workingItem$ = this.service.GetWorkInProgress();
    var member$ = this.memberService.GetAllTeamMembers();

    Observable.combineLatest(workingItem$, member$).subscribe((data: any[]): void => {
      this.items = data[0];
      this.teamMembers = data[1];
      this.GetWorkSummary();
      this.getTeamMemberWithWarnings();
      this.lastUpdate = new Date();
    });
  }

  public GetWorkSummary() {

    this.workSummary = asEnumerable(this.items).GroupBy(i => i.AssignedTo, i => i.AssignedTo, (assignedTo, workItems) => {
      return {
        TeamMember: assignedTo,
        ItemsCount: Array.from(workItems).length
      }
    }).ToArray();

    this.todoCount = asEnumerable(this.items).Where(i => i.State === 'To Do').Count();
    this.inProgressCount = asEnumerable(this.items).Where(i => i.State === 'In Progress').Count();

  }

  public GetAllTeamMembers() {
    this.memberService.GetAllTeamMembers().subscribe(r => {
      this.teamMembers = r;
      this.GetTeamMembersWithoutAssigments();
    });
  }

  public memberWithoutTaks: Array < string > ;

  public GetTeamMembersWithoutAssigments() {
    this.warnings = asEnumerable(this.teamMembers).
    Select(i => i.TeamMemberName)
      .Except(asEnumerable(this.workSummary)
        .Select(i => i.TeamMember))
      .Select(j => new TeamMemberWarning(j, TeamMemberWaringType.WithoutTasks)).ToArray();

  }

  public getWorkInProgressSummary(teamMember: string): void {
    this.selectedTeamMember = teamMember;
    let result = asEnumerable(this.items).Where(i => i.AssignedTo === teamMember).ToArray();
    this.selectedTeamMemberItems = result;
  }
  /**
   * Yelow = WithCriticalTaskWorkingInOtherTask = 3,
   * red = with critical tasks but none inprogress 2
   * gray = with tasks but none inprogress 1
   * blue = without tasks 0
   */

  public warnings = Array < TeamMemberWarning > ();

  public getTeamMemberWithWarnings() {
    let warningsList = new List<TeamMemberWarning>();

    this.teamMembers.forEach(member => {
      let memberItems = new List(this.items).Where(i => i.AssignedTo === member.TeamMemberName);

      if (memberItems.Count() === 0) {
        warningsList.Add(new TeamMemberWarning(member.TeamMemberName, TeamMemberWaringType.WithoutTasks));
      }

      if (memberItems.Count() > 0 && memberItems.Where(i => i.State === 'In Progress').Count() === 0) {
        warningsList.Add(new TeamMemberWarning(member.TeamMemberName, TeamMemberWaringType.WithTaskNoneInProgress))
      }

      if (memberItems.Count() > 0 && memberItems.Where(i => i.BacklogPriority > 8999).Count() > 0 &&
        memberItems.Where(i => i.State !== 'In Progress').Count() === memberItems.Count()) {
        warningsList.Add(new TeamMemberWarning(member.TeamMemberName, TeamMemberWaringType.WithCriticalTaskNoneInProgress))
      }

       if (memberItems.Count() > 0 && memberItems.Where(i => i.BacklogPriority > 8999 && i.State !== 'In Progress').Count() > 0 &&
        memberItems.Where(i => i.State === 'In Progress').Count() > 0) {
        warningsList.Add(new TeamMemberWarning(member.TeamMemberName, TeamMemberWaringType.WithCriticalTaskWorkingInOtherTask))
      }
    });

      this.warnings = warningsList.ToArray();
  }
}
