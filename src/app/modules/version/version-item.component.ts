import {
  WorkItemModalService
} from '../../services/work-item-modal.service';
import {
  DataGrid
} from '../../lib/controls/data-grid';
import {
  WorkItemHierarchy
} from '../../models/work-item-hierarchy';
import {
  List
} from '../../lib/linq';
import {
  WorkItemService
} from '../../services/work-item.service';
import {
  VersionService
} from '../../services/version.service';
import {
  Version
} from '../../models/version';
import {
  WorkItem
} from '../../models/work-item';
import {
  ActivatedRoute
} from '@angular/router';
import {
  VersionItemService
} from '../../services/version-item.service';
import {
  HttpService
} from '../../core/http.service';
import {
  VersionItem
} from '../../models/version-item';
import {
  Component,
  OnInit,
  ViewChild
} from '@angular/core';
import {
  NgbModal,
  ModalDismissReasons,
  NgbModalRef
} from '@ng-bootstrap/ng-bootstrap';

@Component({
  moduleId: module.id,
  selector: 'version-item',
  templateUrl: 'version-item.component.html'
})
export class VersionItemComponent implements OnInit {
  constructor(public vService: VersionService, public viService: VersionItemService,
    private routerActive: ActivatedRoute, public wiService: WorkItemService,
    private modalService: NgbModal,
    private wimService: WorkItemModalService) {}

  public modalRef: NgbModalRef;
  public items: Array < VersionItem > ;
  public missingItems: Array < WorkItem > ;
  public tfsItems: Array < WorkItem > ;
  public tfsHierarchyItems: Array < WorkItemHierarchy > ;
  public newFeatures: number;
  public bugFixes: number;
  public hotFixes: number;
  public version: Version;
  public selectedWorItem: WorkItem;
  public includeFinishedItems: boolean = false;
  public regions: string = 'NAD|All Regions';
  public readyToTestCount: number;
  public beingTestedCount: number;
  public readyToMarkAsFinishedCount: number;
  public inProgressCount: number;


  public inEditMode: boolean;
  @ViewChild('hierarchyGrid') hierarchyGrid: DataGrid;

  ngOnInit() {
    this.routerActive.params.subscribe(params => {
      let vId = params['VersionId'] as number;
      this.vService.GetVersionById(vId)
        .subscribe(r => {

          this.version = r
          this.LoadVersionItems(this.version.Id);
        })
    });
  }

  public LoadVersionItems(versionId) {
    this.viService.GetByVersion(versionId)
      .subscribe(r => {
        this.items = r;
        let temp = new List(this.items);
        this.newFeatures = temp.Where(i => this.isPBI(i)).Count();
        this.bugFixes = temp.Where(i => this.isBug(i)).Count();
        this.hotFixes = temp.Where(i => this.isHotFix(i)).Count();
      });
  }

  public GetTFSItems() {
    this.wiService.GetVersionWorkItems(this.version.Id).subscribe(tfs => {
      let missing = tfs.filter(i => new List(this.items).Select(i => i.TfsId).ToArray().indexOf(i.Id) < 0);
      this.missingItems = missing;
      this.tfsItems = tfs;

    });

    this.wiService.getHirarchicalWorkItems(this.version.Id, this.includeFinishedItems, this.regions).subscribe(items => {
      this.tfsHierarchyItems = items;
      let temp = new List(items);
      this.readyToTestCount = temp.Where(i => this.readyToTest(i)).Count();
      this.beingTestedCount = temp.Where(i => this.beingTested(i)).Count();
      this.readyToMarkAsFinishedCount = temp.Where(i => this.workCompleted(i)).Count();
      this.inProgressCount = this.tfsHierarchyItems.length -this.readyToTestCount - this.beingTestedCount - this.readyToMarkAsFinishedCount;
    });

  }

  public create() {
    this.vService.CreateVersionPlan(this.version.Id, this.tfsItems.length).subscribe(r => {
      console.log(r);
      this.LoadVersionItems(this.version.Id);
      this.tfsItems = new Array < WorkItem > ();
      this.missingItems = new Array < WorkItem > ();
    });
  }

  public DeleteVersionItem(id: number) {
    this.viService.DeleteVersionItem(id).subscribe(
      p => {
        this.LoadVersionItems(this.version.Id);
      }
    );
  }

  public isPBI(wi: VersionItem): boolean {
    return wi.WorkItemType === 0;
  }

  public isBug(wi: VersionItem): boolean {
    return wi.WorkItemType === 1 && wi.DeployType === 'Version Update';
  }

  public isHotFix(wi: VersionItem): boolean {
    return wi.DeployType === 'Hot Fix';
  }

  public isVersionUpdate(wi: VersionItem): boolean {
    if (wi.DeployType === 'Version Update') {
      return true;
    } else {
      if (wi.DeployType === '') {
        return true;

      } else return false;
    }
  }

  public selectedRows = new List < number > ();


  public toggleEditMode() {
    this.inEditMode = !this.inEditMode;
    if (!this.inEditMode) {
      this.selectedRows = new List < number > ();
    }
  }
  public setClickedRow(index) {
    if (!this.inEditMode) {
      return;
    }
    if (this.selectedRows.Any(i => i === index)) {
      this.selectedRows.Remove(index);
    } else {
      this.selectedRows.Add(index);
    }
  }

  public isSelecteddRow(index): boolean {
    return this.selectedRows.Any(i => i === index);
  }

  public expandAll() {
    this.hierarchyGrid.expandAll();
  }

  public collapseAll() {
    this.hierarchyGrid.collapseAll();
  }

  readyToTest(workItem: WorkItemHierarchy): boolean {
    return new List(workItem.Children).Where(i => i.Activity == 'Development' && i.State == 'Done').Count() == workItem.Children.length;
  }

  beingTested(workItem: WorkItemHierarchy): boolean {
    return new List(workItem.Children).Any(i => i.Activity === 'Testing' && i.State !== 'Done' && i.State !== 'Removed');
  }

  workCompleted(workItem: WorkItemHierarchy): boolean {
    let children = new List(workItem.Children);
    let allDone = children.Where(i => i.State == 'Done' || i.State == 'Removed').Count() == workItem.Children.length;
    let testDone = children.Any(i => i.Activity == 'Testing' && i.State == 'Done');

    return allDone && testDone;
  }

  openTestWorkItem(wi: WorkItemHierarchy) {
    let children = new List(wi.Children);
    let res = children.FirstOrDefault(i => i.Activity === 'Testing' && i.State === 'Done');
    this.wimService.openWorkItem(res);
  }
}
