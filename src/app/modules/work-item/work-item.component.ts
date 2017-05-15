import { VersionService } from '../../services/version.service';
import { WorkItemModalService } from '../../services/work-item-modal.service';
import { WorkItemLink } from '../../models/work-item-link';
import { WorkItemService } from '../../services/work-item.service';
import {
  WorkItem
} from '../../models/work-item';
import { Component, Injector, Input } from '@angular/core';


@Component({
  moduleId: module.id,
  selector: 'work-item',
  templateUrl: 'work-item.component.html',
})
export class WorkItemComponent {
  public links : Array<WorkItemLink>;
  @Input() workItem: WorkItem;
  //@Input() wimService: WorkItemModalService;
  constructor(private injector: Injector, public wiService:WorkItemService,public vService: VersionService) {
    this.workItem = this.injector.get('workItem');
    this.wiService.getWorkItemLinksById(this.workItem.Id).subscribe(
      r => this.links = r
    )
  }
}
